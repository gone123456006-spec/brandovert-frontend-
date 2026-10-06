import { z } from "zod";
import { services } from "@/lib/content/services";

export const contactSchema = z.object({
  name: z.string().trim().min(2, { error: "Please enter your name." }).max(100),
  email: z.email({ error: "Please enter a valid email address." }),
  phone: z
    .string()
    .trim()
    .regex(/^[+\d][\d\s-]{7,16}$/, { error: "Please enter a valid phone number." }),
  service: z.enum(["other", ...services.map((s) => s.slug)], {
    error: "Please choose a service.",
  }),
  message: z.string().trim().max(4000).optional(),
  consent: z.literal("on", { error: "Please agree so we can contact you." }),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ContactField = keyof ContactInput;

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<ContactField, string[]>>;
  values?: Partial<Record<ContactField, string>>;
};
