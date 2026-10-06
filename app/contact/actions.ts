"use server";

import { z } from "zod";
import { contactSchema, type ContactField, type ContactState } from "@/lib/contact-schema";

const fields: ContactField[] = ["name", "email", "phone", "service", "message", "consent"];

export async function submitContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  // Bots fill every input, including this visually hidden one.
  if (formData.get("website")) {
    return { status: "success", message: "Thanks! We'll be in touch shortly." };
  }

  const values = Object.fromEntries(
    fields.map((f) => [f, String(formData.get(f) ?? "")])
  ) as Record<ContactField, string>;

  const phone = values.phone.trim();
  const parsed = contactSchema.safeParse({
    ...values,
    phone: phone && !phone.startsWith("+") ? `+91 ${phone}` : phone,
    message: values.message || undefined,
  });
  if (!parsed.success) {
    return {
      status: "error",
      message: "Please fix the highlighted fields.",
      errors: z.flattenError(parsed.error).fieldErrors,
      values,
    };
  }

  try {
    await deliver(parsed.data);
  } catch (error) {
    console.error("Contact form delivery failed", error);
    return {
      status: "error",
      message: "Something went wrong sending your message. Please try WhatsApp or call us instead.",
      values,
    };
  }

  return {
    status: "success",
    message: `Thanks ${parsed.data.name.split(" ")[0]}! We've received your enquiry and will reply within one working day.`,
  };
}

async function deliver(data: z.infer<typeof contactSchema>) {
  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (!webhook) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("CONTACT_WEBHOOK_URL is not configured");
    }
    console.info("[contact] CONTACT_WEBHOOK_URL not set; enquiry logged locally:", data);
    return;
  }

  const res = await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...data, submittedAt: new Date().toISOString() }),
  });
  if (!res.ok) {
    throw new Error(`Webhook responded with ${res.status}`);
  }
}
