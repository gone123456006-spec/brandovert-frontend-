import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, ChevronDown, Quote, Star, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { whatsappHref } from "@/lib/site";
import { serviceIllustration, type Service } from "@/lib/content/services";
import type { CaseStudy } from "@/lib/content/case-studies";
import type { Faq } from "@/lib/content/faqs";
import {
  comparison,
  comparisonColumns,
  process,
  reasons,
  stats,
  testimonials,
} from "@/lib/content/company";
import { CtaAnchor, CtaLink } from "./cta";
import { WhatsAppIcon } from "./brand-icons";
import { CountUp } from "./count-up";

export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-ink text-white">
      <div aria-hidden="true" className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <div className="container-page relative py-20 sm:py-24">
        <p className="mb-4 text-sm font-semibold tracking-wider text-highlight uppercase">{eyebrow}</p>
        <h1 className="max-w-3xl text-4xl leading-tight font-bold sm:text-5xl">{title}</h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75">{description}</p>
        {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
      </div>
    </section>
  );
}

export function StatsRow({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <dl className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
      {stats.map((s) => (
        <div key={s.label} className="flex flex-col-reverse items-center text-center">
          <dt className={cn("mt-2 text-sm sm:text-base", tone === "dark" ? "text-white/70" : "text-muted-foreground")}>
            {s.label}
          </dt>
          <dd className={cn("text-5xl font-bold sm:text-6xl", tone === "dark" ? "text-white" : "text-ink")}>
            <CountUp value={s.value} suffixClassName={tone === "dark" ? "text-highlight" : "text-brand"} />
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex h-full flex-col items-center rounded-[1.75rem] bg-tint px-6 pt-6 pb-7 text-center transition-all hover:-translate-y-1 hover:shadow-[0_20px_40px_-20px_rgb(0_0_0/0.25)]"
    >
      <span className="rounded-full bg-ink px-3 py-1 text-xs font-bold text-white transition-colors group-hover:bg-brand">
        {service.category}
      </span>
      {/* Illustrations have white backgrounds; multiply blends them into the card colour. */}
      <Image
        src={serviceIllustration(service.slug)}
        alt=""
        width={640}
        height={640}
        sizes="200px"
        className="mt-4 size-44 mix-blend-multiply transition-transform duration-300 group-hover:scale-105"
      />
      <h3 className="mt-4 text-lg leading-snug font-bold text-ink">{service.title}</h3>
      <p className="mt-1.5 max-w-[17rem] text-sm leading-relaxed text-muted-foreground">
        {service.summary}
      </p>
      <ul className="mt-auto grid grid-cols-[repeat(2,6.5rem)] justify-center gap-2 pt-5">
        {service.stack.slice(0, 4).map((t) => (
          <li
            key={t}
            className="truncate rounded-full border-[1.5px] border-ink px-1.5 py-[3px] text-[0.7rem] font-medium text-ink"
          >
            {t}
          </li>
        ))}
      </ul>
    </Link>
  );
}

const accentStyles: Record<CaseStudy["accent"], string> = {
  red: "from-brand to-brand-strong",
  black: "from-ink-soft to-ink",
};

export function PortfolioCard({ study }: { study: CaseStudy }) {
  return (
    <Link
      href={`/work/${study.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_10px_30px_-12px_rgb(0_0_0/0.18)] transition-all duration-300 hover:-translate-y-1 hover:bg-brand hover:shadow-[0_20px_40px_-16px_rgb(225_6_0/0.5)]"
    >
      <div className="overflow-hidden">
        <Image
          src={study.image}
          alt={`${study.client} project screens`}
          width={1200}
          height={900}
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="aspect-[3/2] w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-semibold tracking-wider text-brand uppercase transition-colors group-hover:text-white/80">
          {study.industry}
        </p>
        <h3 className="mt-1.5 text-2xl font-bold text-ink transition-colors group-hover:text-white">
          {study.client}
        </h3>
        <p className="mt-4 leading-relaxed text-muted-foreground transition-colors group-hover:text-white/90">
          {study.summary}
        </p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-6 font-semibold text-brand transition-colors group-hover:text-white">
          Learn More
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

export function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <Link
      href={`/work/${study.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-white transition-shadow hover:shadow-[0_16px_40px_-16px_rgb(0_0_0/0.25)]"
    >
      <div className={cn("relative flex h-44 items-end bg-linear-to-br p-6", accentStyles[study.accent])}>
        <div aria-hidden="true" className="bg-grid absolute inset-0 opacity-60" />
        <div className="relative">
          <p className="text-xs font-semibold tracking-wider text-white/80 uppercase">{study.industry}</p>
          <p className="text-2xl font-bold text-white">{study.client}</p>
        </div>
        <ArrowUpRight className="absolute top-5 right-5 size-6 text-white/80 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg leading-snug font-bold text-ink">{study.title}</h3>
        <dl className="mt-6 grid grid-cols-3 gap-3 border-t border-border pt-5">
          {study.results.map((r) => (
            <div key={r.label} className="flex flex-col-reverse">
              <dt className="text-xs leading-snug text-muted-foreground">{r.label}</dt>
              <dd className="text-xl font-bold text-brand">{r.value}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-5 flex flex-wrap gap-2">
          {study.services.map((s) => (
            <span key={s} className="rounded-full bg-surface px-2.5 py-1 text-xs font-medium text-ink">
              {s}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

export function WhyChooseUs() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {reasons.map((r) => (
        <div
          key={r.title}
          className="group flex flex-col rounded-[2.5rem] bg-tint-mid px-8 pt-6 pb-10 transition-transform duration-300 hover:-translate-y-1 sm:px-10"
        >
          <Image
            src={r.illustration}
            alt=""
            width={720}
            height={540}
            sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
            className="mx-auto aspect-[4/3] w-full max-w-[16rem] object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-105"
          />
          <h3 className="mt-4 text-xl leading-snug font-medium text-ink sm:text-[1.4rem]">{r.title}</h3>
          <p className="mt-3 text-lg leading-[1.75] text-neutral-600">{r.body}</p>
        </div>
      ))}
    </div>
  );
}

export function ProcessSteps() {
  return (
    <ol className="grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-4">
      {process.map((p, i) => {
        const isLast = i === process.length - 1;
        return (
          <li key={p.step} className="flex flex-col items-center text-center">
            <span className="text-6xl leading-none font-extrabold tracking-tight text-brand sm:text-7xl">
              {p.step}
            </span>

            <div className="relative mt-5 flex w-full justify-center">
              {/* Timeline segments bridge the grid gap so the dots read as one connected line. */}
              <span
                aria-hidden="true"
                className={cn(
                  "absolute top-1/2 hidden h-0.5 -translate-y-1/2 bg-ink/15 lg:block",
                  i === 0 ? "left-1/2" : "-left-3",
                  isLast ? "right-1/2" : "-right-3"
                )}
              />
              <span className="relative size-4 rounded-full bg-ink ring-4 ring-tint-strong" />
            </div>

            <div className="relative mt-6 w-full flex-1 rounded-[2rem] bg-tint-strong px-6 pt-7 pb-6 shadow-[0_18px_30px_-18px_rgb(0_0_0/0.3)]">
              <span
                aria-hidden="true"
                className="absolute -top-2 left-1/2 size-5 -translate-x-1/2 rotate-45 rounded-[5px] bg-tint-strong"
              />
              <div className="flex items-center justify-center gap-3">
                <h3 className="text-xl font-bold text-ink">{p.title}</h3>
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-white text-ink">
                  {isLast ? <Check className="size-5 stroke-[2.75]" /> : <ArrowRight className="size-5 stroke-[2.75]" />}
                </span>
              </div>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-ink/70">{p.body}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

export function Testimonials() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {testimonials.map((t) => (
        <figure
          key={t.name}
          className="flex flex-col rounded-[2.5rem] bg-tint-mid px-8 py-10 transition-transform duration-200 hover:-translate-y-1 sm:px-10"
        >
          <div className="flex items-center justify-between">
            <div className="flex gap-0.5 text-highlight" aria-label="Rated 5 out of 5">
              {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} className="size-4 fill-current" />
              ))}
            </div>
            <Quote className="size-9 fill-tint-strong text-tint-strong" />
          </div>
          <blockquote className="mt-5 flex-1 text-lg leading-relaxed text-neutral-600">
            “{t.quote}”
          </blockquote>
          <figcaption className="mt-8 flex items-center gap-3 border-t border-ink/10 pt-6">
            <span className="grid size-11 place-items-center rounded-full bg-ink text-sm font-bold text-white">
              {t.name
                .replace("Dr. ", "")
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
            <span>
              <span className="block text-[1.05rem] font-medium text-ink">{t.name}</span>
              <span className="block text-sm text-neutral-500">
                {t.role}, {t.company}
              </span>
            </span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

export function FaqList({ items, openFirst = false }: { items: Faq[]; openFirst?: boolean }) {
  return (
    <div className="border-b border-ink/15">
      {items.map((f, i) => (
        <details key={f.question} open={openFirst && i === 0} className="group border-t border-ink/15 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-4 text-left text-[1.02rem] text-ink transition-colors hover:text-brand">
            {f.question}
            <ChevronDown className="size-5 shrink-0 stroke-[2.5] group-open:hidden" />
            <X className="hidden size-5 shrink-0 stroke-[2.5] group-open:block" />
          </summary>
          <div className="space-y-3 pb-5 text-[0.95rem] leading-relaxed text-ink/80">
            <p>{f.answer}</p>
            {f.points && (
              <ul className="list-disc space-y-1.5 pl-5 marker:text-ink">
                {f.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            )}
          </div>
        </details>
      ))}
    </div>
  );
}

export function ComparisonTable() {
  const ours = comparisonColumns.length - 1;

  return (
    <div className="overflow-x-auto rounded-[2rem]">
      <table className="w-full min-w-[640px] border-collapse text-left">
        <caption className="sr-only">How Brandovert compares with freelancers and typical agencies</caption>
        <thead>
          <tr className="bg-ink text-white">
            <td className="w-[42%] px-6 py-4 sm:px-9" />
            {comparisonColumns.map((col, i) => (
              <th
                key={col}
                scope="col"
                className={cn(
                  "px-4 py-4 text-center text-base font-semibold whitespace-nowrap",
                  i === ours && "bg-brand"
                )}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {comparison.map((row, r) => (
            <tr
              key={row.feature}
              className={cn(
                "relative transition-[translate,box-shadow,background-color] duration-200 hover:z-10 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_8px_20px_-10px_rgb(0_0_0/0.3)] motion-reduce:hover:translate-y-0",
                r % 2 === 0 ? "bg-tint" : "bg-tint-mid"
              )}
            >
              <th scope="row" className="px-6 py-4 text-base font-medium text-ink sm:px-9">
                {row.feature}
              </th>
              {row.values.map((yes, i) => (
                <td
                  key={comparisonColumns[i]}
                  className={cn(
                    "px-4 py-4 text-center",
                    i === ours && (r % 2 === 0 ? "bg-brand-soft" : "bg-brand-soft-strong")
                  )}
                >
                  {yes ? (
                    <Check className="mx-auto size-[1.1rem] text-green-500" strokeWidth={4} aria-hidden="true" />
                  ) : (
                    <X className="mx-auto size-[1.1rem] text-neutral-400" strokeWidth={4} aria-hidden="true" />
                  )}
                  <span className="sr-only">{yes ? "Yes" : "No"}</span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function CtaBand({
  title = "Have a project in mind?",
  description = "Tell us what you're building. You'll get a written scope and a fixed quote within 5 working days, with no obligation.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="py-20">
      <div className="container-page">
        <div className="relative rounded-3xl bg-brand px-8 py-14 sm:px-14">
          <div aria-hidden="true" className="bg-grid absolute inset-0 rounded-3xl opacity-70" />
          <Image
            src="/illustrations/cta/person-phone.png"
            alt=""
            width={640}
            height={725}
            sizes="288px"
            className="pointer-events-none absolute right-10 -bottom-6 hidden w-72 md:block xl:right-24"
          />
          <div className="relative md:max-w-[55%]">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">{title}</h2>
            <p className="mt-3 text-lg text-white/85">{description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <CtaLink href="/contact" variant="light">
                Get a free quote
                <ArrowRight />
              </CtaLink>
              <CtaAnchor href={whatsappHref()} target="_blank" rel="noopener noreferrer" variant="ghostDark">
                <WhatsAppIcon />
                Chat on WhatsApp
              </CtaAnchor>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
