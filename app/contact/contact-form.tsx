"use client";

import { useActionState } from "react";
import {
  Briefcase,
  ChevronRight,
  CircleCheck,
  IdCard,
  Loader2,
  Mail,
  MessageSquareText,
  Phone,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";
import { services } from "@/lib/content/services";
import type { ContactField, ContactState } from "@/lib/contact-schema";
import { submitContact } from "./actions";

const initialState: ContactState = { status: "idle" };

const boxClass =
  "relative flex items-center gap-3 rounded-xl bg-white py-1 pr-1.5 pl-3.5 transition-shadow focus-within:ring-3 focus-within:ring-brand/25 has-[[aria-invalid=true]]:ring-2 has-[[aria-invalid=true]]:ring-destructive";

const inputClass =
  "min-w-0 flex-1 bg-transparent py-2 text-sm text-ink outline-none placeholder:text-neutral-500";

export function ContactForm({ defaultService }: { defaultService?: string }) {
  const [state, formAction, pending] = useActionState(submitContact, initialState);

  if (state.status === "success") {
    return (
      <div role="status" className="flex flex-col items-center rounded-3xl bg-white p-10 text-center">
        <CircleCheck className="size-12 text-brand" />
        <h3 className="mt-4 text-2xl font-bold text-ink">Message sent</h3>
        <p className="mt-2 max-w-md text-muted-foreground">{state.message}</p>
      </div>
    );
  }

  const v = state.values ?? {};
  const err = (f: ContactField) => state.errors?.[f]?.[0];
  const a11y = (f: ContactField) => ({
    "aria-invalid": !!err(f),
    "aria-describedby": err(f) ? `${f}-error` : undefined,
  });

  return (
    // React resets uncontrolled fields after an action; remounting re-applies the submitted values.
    <form key={JSON.stringify(v)} action={formAction} noValidate className="relative grid gap-2.5">
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <Field name="name" label="Name" icon={IdCard} error={err("name")}>
        <input
          id="name"
          name="name"
          autoComplete="name"
          required
          defaultValue={v.name}
          placeholder="Name"
          className={inputClass}
          {...a11y("name")}
        />
      </Field>

      <Field name="email" label="Email" icon={Mail} error={err("email")}>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          defaultValue={v.email}
          placeholder="Email"
          className={inputClass}
          {...a11y("email")}
        />
      </Field>

      <Field name="phone" label="Phone" showLabel icon={Phone} error={err("phone")}>
        <span className="flex shrink-0 items-center gap-2 pt-2.5 text-sm text-ink">
          <IndiaFlag />
          +91
        </span>
        <input
          id="phone"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          required
          defaultValue={v.phone}
          placeholder="98765 43210"
          className={cn(inputClass, "pt-3.5 pb-1")}
          {...a11y("phone")}
        />
      </Field>

      <Field name="service" label="Service you need" icon={Briefcase} error={err("service")}>
        <select
          id="service"
          name="service"
          required
          defaultValue={v.service ?? defaultService ?? ""}
          className={cn(inputClass, "cursor-pointer appearance-none invalid:text-neutral-500")}
          {...a11y("service")}
        >
          <option value="" disabled>
            Service you need
          </option>
          {services.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.title}
            </option>
          ))}
          <option value="other">Something else</option>
        </select>
      </Field>

      <Field name="message" label="Project details (optional)" icon={MessageSquareText} alignTop error={err("message")}>
        <textarea
          id="message"
          name="message"
          rows={4}
          defaultValue={v.message}
          placeholder="Project details (optional)"
          className={cn(inputClass, "resize-none")}
          {...a11y("message")}
        />
      </Field>

      <div>
        <label className="flex cursor-pointer items-start gap-3 px-2">
          <input
            type="checkbox"
            name="consent"
            required
            defaultChecked={"consent" in v ? v.consent === "on" : true}
            className="mt-0.5 size-4 shrink-0 cursor-pointer accent-brand"
            {...a11y("consent")}
          />
          <span className="text-xs leading-relaxed text-neutral-700 italic">
            I authorise {site.name} ({site.legalName}) and its representatives to contact me about my
            enquiry via email, SMS, WhatsApp or call, even if my number is registered on DND/NDNC.
          </span>
        </label>
        {err("consent") && (
          <p id="consent-error" className="mt-2 px-2 text-sm text-destructive">
            {err("consent")}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={pending}
        className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-brand text-sm font-bold text-white shadow-[0_10px_20px_-8px_rgb(225_6_0/0.6)] transition-colors outline-none hover:bg-brand-strong focus-visible:ring-3 focus-visible:ring-brand/40 disabled:opacity-60"
      >
        {pending ? <Loader2 className="size-5 animate-spin" /> : null}
        {pending ? "Sending..." : "Send enquiry"}
        {!pending && <ChevronRight className="size-4" strokeWidth={2.5} />}
      </button>

      <p className="-mt-1 text-center text-xs text-neutral-600">
        We reply within one working day. Your details are never shared.
      </p>

      {state.status === "error" && state.message && (
        <p role="alert" className="rounded-2xl bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive">
          {state.message}
        </p>
      )}
    </form>
  );
}

function Field({
  name,
  label,
  showLabel,
  icon: Icon,
  alignTop,
  error,
  children,
}: {
  name: string;
  label: string;
  showLabel?: boolean;
  icon: LucideIcon;
  alignTop?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className={cn(boxClass, alignTop && "items-start")}>
        <label
          htmlFor={name}
          className={showLabel ? "absolute top-1 left-3.5 text-[0.65rem] text-neutral-500" : "sr-only"}
        >
          {label}
        </label>
        {children}
        <span
          aria-hidden="true"
          className={cn(
            "grid size-8 shrink-0 place-items-center rounded-full bg-tint-icon text-white",
            alignTop && "mt-0.5"
          )}
        >
          <Icon className="size-3.5" strokeWidth={2.25} />
        </span>
      </div>
      {error && (
        <p id={`${name}-error`} className="mt-2 px-4 text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

function IndiaFlag() {
  return (
    <svg aria-hidden="true" viewBox="0 0 30 20" className="h-3.5 w-5 shrink-0">
      <rect width="30" height="20" fill="#fff" />
      <rect width="30" height="6.67" fill="#ff9933" />
      <rect y="13.33" width="30" height="6.67" fill="#138808" />
      <circle cx="15" cy="10" r="2.6" fill="none" stroke="#000080" strokeWidth="0.7" />
    </svg>
  );
}
