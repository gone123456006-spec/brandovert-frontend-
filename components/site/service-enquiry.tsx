"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import type { VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { ContactForm } from "@/app/contact/contact-form";
import { ctaVariants } from "./cta";

type Selected = { slug: string; title: string };

const OpenEnquiry = createContext<(service?: Selected) => void>(() => {});

/** Opens the site-wide "Send us a message" popup, optionally with a service pre-selected. */
export const useEnquiry = () => useContext(OpenEnquiry);

export function ServiceEnquiryProvider({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [selected, setSelected] = useState<Selected | null>(null);
  // Bumped on every open so the form starts fresh, even after a successful send.
  const [session, setSession] = useState(0);

  const open = (service?: Selected) => {
    setSelected(service ?? null);
    setSession((n) => n + 1);
    ref.current?.showModal();
  };
  const close = () => ref.current?.close();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    // Locks <html> rather than <body>, which the mobile menu locks and unlocks on its own.
    const observer = new MutationObserver(() => {
      document.documentElement.style.overflow = dialog.open ? "hidden" : "";
    });
    observer.observe(dialog, { attributes: true, attributeFilter: ["open"] });
    return () => {
      observer.disconnect();
      document.documentElement.style.overflow = "";
    };
  }, []);

  return (
    <OpenEnquiry.Provider value={open}>
      {children}
      <dialog
        ref={ref}
        aria-labelledby="enquiry-title"
        onClick={(e) => e.target === e.currentTarget && close()}
        className="m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-lg overflow-y-auto overscroll-contain rounded-[2rem] bg-tint-strong p-0 text-ink opacity-100 transition-all duration-300 backdrop:bg-black/60 starting:open:scale-95 starting:open:opacity-0"
      >
        <div className="relative p-6 sm:p-8">
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute top-4 right-4 grid size-10 place-items-center rounded-full text-ink transition-colors hover:bg-white/70"
          >
            <X className="size-5" strokeWidth={2.5} />
          </button>

          <h2 id="enquiry-title" className="pr-10 text-2xl font-bold sm:text-3xl">
            Send us a message
          </h2>
          <p className="mt-2 mb-6 text-muted-foreground">
            {selected ? (
              <>
                Tell us about your <span className="font-semibold text-ink">{selected.title}</span>{" "}
                project.{" "}
                <Link
                  href={`/services/${selected.slug}`}
                  onClick={close}
                  className="font-semibold text-brand hover:underline"
                >
                  Learn more
                </Link>
              </>
            ) : (
              "Get a written scope and a fixed quote within 5 working days."
            )}
          </p>
          {session > 0 && (
            <ContactForm key={session} defaultService={selected?.slug} />
          )}
        </div>
      </dialog>
    </OpenEnquiry.Provider>
  );
}

export function ServiceEnquiryButton({
  service,
  className,
  children,
}: {
  service: Selected;
  className?: string;
  children: React.ReactNode;
}) {
  const open = useEnquiry();
  return (
    <button
      type="button"
      onClick={() => open(service)}
      aria-haspopup="dialog"
      aria-label={`Enquire about ${service.title}`}
      className={className}
    >
      {children}
    </button>
  );
}

/** A "Get a free quote" style button that opens the enquiry popup instead of navigating. */
export function QuoteButton({
  variant,
  size,
  plain,
  className,
  onClick,
  children,
}: VariantProps<typeof ctaVariants> & {
  /** Skip the button styling, e.g. for a footer text link. */
  plain?: boolean;
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  const open = useEnquiry();
  return (
    <button
      type="button"
      aria-haspopup="dialog"
      onClick={() => {
        onClick?.();
        open();
      }}
      className={plain ? className : cn(ctaVariants({ variant, size }), "cursor-pointer", className)}
    >
      {children}
    </button>
  );
}
