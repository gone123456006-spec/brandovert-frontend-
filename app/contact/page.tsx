import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { formattedAddress, site, whatsappHref } from "@/lib/site";
import { services } from "@/lib/content/services";
import { WhatsAppIcon } from "@/components/site/brand-icons";
import { Section } from "@/components/site/section";
import { PageHero } from "@/components/site/blocks";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Get in touch with ${site.name}. Call, WhatsApp, email or visit our office in ${site.contact.address.city}.`,
};

const channels = [
  {
    icon: WhatsAppIcon,
    label: "WhatsApp",
    value: "Chat with our team",
    detail: "Fastest response, usually within minutes",
    href: whatsappHref(),
    external: true,
  },
  {
    icon: Phone,
    label: "Phone",
    value: site.contact.phoneDisplay,
    detail: site.contact.hours,
    href: site.contact.phoneHref,
  },
  {
    icon: Mail,
    label: "Email",
    value: site.contact.email,
    detail: "We reply within one working day",
    href: `mailto:${site.contact.email}`,
  },
];

export default async function ContactPage({
  searchParams,
}: PageProps<"/contact">) {
  const { service } = await searchParams;
  const defaultService =
    typeof service === "string" && services.some((s) => s.slug === service)
      ? service
      : undefined;

  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(site.contact.mapQuery)}&output=embed`;
  const directionsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(formattedAddress())}`;

  return (
    <>
      <PageHero
        eyebrow="Contact us"
        title="Let's talk about your project"
        description="Tell us what you need and we'll get back to you within one working day with next steps. Prefer to talk now? Call or WhatsApp us."
      />

      <section className="relative -mt-10 pb-4">
        <div className="container-page grid gap-4 md:grid-cols-3">
          {channels.map((c) => {
            const Icon = c.icon;
            return (
              <a
                key={c.label}
                href={c.href}
                {...(c.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="group flex items-center gap-4 rounded-[2.5rem] bg-tint-strong px-7 py-7 transition-transform duration-300 hover:-translate-y-1 sm:px-8"
              >
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-white text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                  <Icon className="size-6" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm text-neutral-600">
                    {c.label}
                  </span>
                  <span className="block truncate text-lg font-medium text-ink">
                    {c.value}
                  </span>
                  <span className="mt-1 block text-sm text-neutral-600">
                    {c.detail}
                  </span>
                </span>
              </a>
            );
          })}
        </div>
      </section>

      <Section className="pt-12 sm:pt-16">
        <div className="mx-auto w-full max-w-xl rounded-[2rem] bg-tint-strong p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-ink sm:text-3xl">
            Send us a message
          </h2>
          <p className="mt-2 mb-8 text-muted-foreground">
            The more you tell us, the more useful our first reply will be.
          </p>
          <ContactForm defaultService={defaultService} />
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-3xl bg-ink p-8 text-white">
            <h2 className="text-xl font-bold">Office location</h2>
            <div className="mt-5 flex gap-3">
              <MapPin className="mt-0.5 size-5 shrink-0 text-highlight" />
              <address className="leading-relaxed not-italic text-white/85">
                {site.legalName}
                <br />
                {site.contact.address.line1}
                <br />
                {site.contact.address.line2}, {site.contact.address.city}
                <br />
                {site.contact.address.region} {site.contact.address.postalCode},{" "}
                {site.contact.address.country}
              </address>
            </div>
            <div className="mt-4 flex gap-3">
              <Clock className="mt-0.5 size-5 shrink-0 text-highlight" />
              <p className="text-white/85">{site.contact.hours}</p>
            </div>
            <a
              href={directionsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex text-sm font-semibold text-highlight hover:underline"
            >
              Get directions
            </a>
          </div>

          <div className="min-h-72 overflow-hidden rounded-3xl border border-border">
            <iframe
              title={`Map showing the ${site.name} office`}
              src={mapSrc}
              className="block h-full min-h-72 w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </Section>
    </>
  );
}
