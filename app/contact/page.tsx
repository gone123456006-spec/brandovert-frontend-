import { ArrowUpRight, Clock, Mail, MapPin, Navigation, Phone } from "lucide-react";
import { formattedAddress, site, whatsappHref } from "@/lib/site";
import { services } from "@/lib/content/services";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { WhatsAppIcon } from "@/components/site/brand-icons";
import { Section } from "@/components/site/section";
import { PageHero } from "@/components/site/blocks";
import { ContactForm } from "./contact-form";

export const metadata = pageMetadata({
  title: "Contact Us",
  description: `Contact ${site.name} in ${site.contact.address.line2}, ${site.contact.address.city}. Call ${site.contact.phoneDisplay}, WhatsApp, email ${site.contact.email}, or visit our office.`,
  path: "/contact",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Contact Us", path: "/contact" },
];

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
    label: "Call us",
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

const nextSteps = [
  {
    title: "We read your brief",
    body: "A senior team member reviews your message and replies within one working day.",
  },
  {
    title: "A free 30-minute call",
    body: "We talk through your goals, users and timeline. No sales pitch, just questions.",
  },
  {
    title: "Scope and fixed quote",
    body: "You get a written scope and a fixed price within 5 working days, with no obligation.",
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
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <Breadcrumbs items={crumbs} />
      <PageHero
        eyebrow="Contact us"
        title="Let's talk about your project"
        description="Tell us what you need and we'll get back to you within one working day with next steps. Prefer to talk now? Call or WhatsApp us."
      />

      <Section className="pt-12 sm:pt-16">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
          <div className="min-w-0">
            <h2 className="text-2xl font-bold text-ink sm:text-3xl">
              Talk to a real person
            </h2>
            <p className="mt-2 text-muted-foreground">
              Pick whatever is easiest for you. Every message reaches the team
              that will build your project.
            </p>

            <ul className="mt-7 grid grid-cols-1 gap-3">
              {channels.map((c) => {
                const Icon = c.icon;
                return (
                  <li key={c.label}>
                    <a
                      href={c.href}
                      {...(c.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="group flex min-w-0 items-center gap-3 rounded-[1.75rem] bg-tint-mid px-4 py-4 transition duration-300 hover:-translate-y-0.5 hover:bg-tint-strong sm:gap-4 sm:px-6"
                    >
                      <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-white text-brand transition-colors group-hover:bg-brand group-hover:text-white sm:size-12">
                        <Icon className="size-5 sm:size-6" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-xs font-semibold tracking-wide text-neutral-500 uppercase">
                          {c.label}
                        </span>
                        <span className="block text-base font-semibold [overflow-wrap:anywhere] text-ink sm:text-lg">
                          {c.value}
                        </span>
                        <span className="block text-sm text-neutral-600">{c.detail}</span>
                      </span>
                      <ArrowUpRight className="hidden size-5 shrink-0 text-neutral-400 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand sm:block" />
                    </a>
                  </li>
                );
              })}
            </ul>

            <h3 className="mt-10 text-lg font-bold text-ink">What happens next</h3>
            <ol className="mt-5">
              {nextSteps.map((step, i) => (
                <li key={step.title} className="relative flex gap-4 pb-6 last:pb-0">
                  {i < nextSteps.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="absolute top-9 bottom-1 left-[1.0625rem] w-px bg-border"
                    />
                  )}
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-ink text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <div className="pt-1.5">
                    <p className="font-semibold text-ink">{step.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-neutral-600">
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="min-w-0 rounded-[2rem] bg-tint-strong p-6 sm:p-8 lg:sticky lg:top-36">
            <h2 className="text-2xl font-bold text-ink sm:text-3xl">
              Send us a message
            </h2>
            <p className="mt-2 mb-7 text-muted-foreground">
              The more you tell us, the more useful our first reply will be.
            </p>
            <ContactForm defaultService={defaultService} />
          </div>
        </div>
      </Section>

      <Section className="pt-0 sm:pt-0">
        <div className="relative overflow-hidden rounded-[2rem] bg-surface">
          <iframe
            title={`Map showing the ${site.name} office`}
            src={mapSrc}
            className="block h-72 w-full sm:h-[26rem]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="bg-ink p-6 text-white sm:p-8 md:absolute md:top-6 md:left-6 md:w-80 md:rounded-3xl md:shadow-2xl">
            <h2 className="text-xl font-bold">Visit our office</h2>
            <div className="mt-5 flex gap-3">
              <MapPin className="mt-0.5 size-5 shrink-0 text-highlight" />
              <address className="text-sm leading-relaxed not-italic text-white/85">
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
              <p className="text-sm text-white/85">{site.contact.hours}</p>
            </div>
            <a
              href={directionsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex h-10 items-center gap-2 rounded-full bg-white px-4 text-sm font-semibold text-ink transition-colors hover:bg-brand hover:text-white"
            >
              <Navigation className="size-4" />
              Get directions
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}
