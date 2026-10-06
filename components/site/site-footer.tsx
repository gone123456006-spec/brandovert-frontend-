import Link from "next/link";
import { Headset, House, MessagesSquare } from "lucide-react";
import { formattedAddress, site, whatsappHref } from "@/lib/site";
import { services } from "@/lib/content/services";
import { Logo } from "./logo";
import { InstagramIcon, LinkedInIcon, WhatsAppIcon } from "./brand-icons";

const companyLinks = [
  { href: "/about", label: "About Us" },
  { href: "/services", label: "All Services" },
  { href: "/work", label: "Case Studies" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact Us" },
];

const buildServices = services.filter((s) => s.category === "Development" || s.category === "Design");
const growthServices = services.filter(
  (s) => s.category === "Growth" || s.category === "Management" || s.category === "Support"
);

const socials = [
  { href: site.social.linkedin, label: "LinkedIn", Icon: LinkedInIcon },
  { href: site.social.instagram, label: "Instagram", Icon: InstagramIcon },
  { href: whatsappHref(), label: "WhatsApp", Icon: WhatsAppIcon },
];

export function SiteFooter() {
  return (
    <footer className="relative -mt-12 bg-ink text-white">
      <div aria-hidden="true" className="h-24 rounded-b-[4rem] bg-white sm:h-32 sm:rounded-b-[8rem]" />

      <div className="container-page grid gap-10 pt-14 pb-10 sm:grid-cols-2 lg:grid-cols-[1.25fr_1fr_1fr_0.75fr]">
        <div className="space-y-6 text-sm">
          <Logo tone="light" className="text-2xl" />
          <div className="flex gap-3">
            <House className="mt-0.5 size-5 shrink-0 text-highlight" strokeWidth={1.75} />
            <address className="max-w-64 leading-relaxed not-italic">{formattedAddress()}</address>
          </div>
          <div className="flex gap-3">
            <MessagesSquare className="mt-0.5 size-5 shrink-0 text-highlight" strokeWidth={1.75} />
            <div>
              <p className="font-semibold">Project Enquiries</p>
              <a
                href={`mailto:${site.contact.email}`}
                className="mt-1 inline-block break-all underline underline-offset-2 hover:text-white/80"
              >
                {site.contact.email}
              </a>
            </div>
          </div>
          <div className="flex gap-3">
            <Headset className="mt-0.5 size-5 shrink-0 text-highlight" strokeWidth={1.75} />
            <div>
              <p className="font-semibold">Call or WhatsApp</p>
              <a
                href={site.contact.phoneHref}
                className="mt-1 inline-block underline underline-offset-2 hover:text-white/80"
              >
                Ph. {site.contact.phoneDisplay}
              </a>
              <p className="mt-1 text-white/70">{site.contact.hours}</p>
            </div>
          </div>
        </div>

        <FooterColumn title="Development & Design">
          {buildServices.map((s) => (
            <FooterLink key={s.slug} href={`/services/${s.slug}`}>
              {s.title}
            </FooterLink>
          ))}
        </FooterColumn>

        <div className="space-y-8">
          <FooterColumn title="Growth & Support">
            {growthServices.map((s) => (
              <FooterLink key={s.slug} href={`/services/${s.slug}`}>
                {s.title}
              </FooterLink>
            ))}
          </FooterColumn>
          <FooterColumn title="Get Started">
            <FooterLink href="/contact">Get a free quote</FooterLink>
            <li>
              <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="hover:underline">
                Chat on WhatsApp
              </a>
            </li>
          </FooterColumn>
        </div>

        <FooterColumn title={site.name}>
          {companyLinks.map((l) => (
            <FooterLink key={l.href} href={l.href}>
              {l.label}
            </FooterLink>
          ))}
        </FooterColumn>
      </div>

      <div className="container-page">
        <div className="flex flex-col gap-4 border-t border-white/15 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-white/70">
            Copyright © {new Date().getFullYear()} {site.legalName} All rights reserved.
          </p>
          <ul className="flex gap-2.5">
            {socials.map(({ href, label, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid size-8 place-items-center rounded-md bg-white/10 text-white transition-colors hover:bg-brand"
                >
                  <Icon className="size-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="container-page pt-2 pb-8 text-center text-sm text-white/80 sm:text-base">
        Feel free to reach out to us at{" "}
        <a
          href={site.contact.phoneHref}
          className="font-bold whitespace-nowrap text-white hover:underline"
        >
          {site.contact.phoneDisplay}
        </a>{" "}
        or simply{" "}
        <Link
          href="/contact"
          className="font-bold text-highlight underline underline-offset-2 hover:text-white"
        >
          Request a Callback
        </Link>
        , and we&apos;ll get in touch with you shortly.
      </p>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-3 text-sm font-semibold text-highlight uppercase">{title}</h3>
      <ul className="space-y-2 text-sm text-white/80">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        className="hover:text-white hover:underline hover:decoration-highlight hover:underline-offset-4"
      >
        {children}
      </Link>
    </li>
  );
}
