import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, ChevronDown, Quote, X } from "lucide-react";
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
import { CtaAnchor } from "./cta";
import { GoogleIcon, WhatsAppIcon } from "./brand-icons";
import { CountUp } from "./count-up";
import { Pendulum } from "./pendulum";
import { SwipeHintScroller } from "./swipe-hint-scroller";
import { MobileSlider } from "./mobile-slider";
import { QuoteButton } from "./service-enquiry";
import { ProjectVisual } from "./project-visual";
import { StarRating } from "./star-rating";

export function PageHero({
  eyebrow,
  title,
  description,
  hashtag,
  prompt,
  image,
  children,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description: React.ReactNode;
  hashtag?: string;
  /** A wide white bar styled like an input that links somewhere, e.g. the contact form. */
  prompt?: { href: string; label: string };
  image?: { src: string; width: number; height: number };
  children?: React.ReactNode;
}) {
  return (
    <section className="overflow-hidden bg-sand">
      <div
        className={cn(
          "container-page grid items-center gap-3 py-8 sm:gap-10 sm:py-14 lg:py-16",
          image &&
            "grid-cols-[minmax(0,1fr)_6.5rem] sm:grid-cols-[minmax(0,1fr)_14rem] lg:grid-cols-[1.4fr_0.6fr]"
        )}
      >
        <div className="min-w-0">
          {eyebrow && (
            <p className="mb-3 inline-block rounded-md bg-badge px-2.5 py-1 text-xs font-bold text-ink sm:text-sm">
              {eyebrow}
            </p>
          )}
          <h1
            className={cn(
              "max-w-3xl leading-tight font-bold text-balance text-brand-strong",
              // With an image beside it, the heading scales with the viewport so it stays on one line.
              image
                ? "text-[min(2.25rem,calc(8.6vw_-_14px))] whitespace-nowrap sm:text-[min(3rem,calc(8.6vw_-_29px))] lg:text-5xl"
                : "text-[2rem] sm:text-5xl"
            )}
          >
            {title}
          </h1>
          <p
            className={cn(
              "mt-2 max-w-2xl leading-relaxed text-ink sm:mt-3 sm:text-lg",
              image ? "text-[0.8rem]" : "text-base"
            )}
          >
            {description}
          </p>
          {hashtag && (
            <p className="mt-1.5 text-sm font-bold text-neutral-400 sm:mt-2 sm:text-xl">{hashtag}</p>
          )}
          {prompt && (
            <Link
              href={prompt.href}
              className="group mt-4 flex h-10 w-full max-w-xl items-center justify-between gap-2 rounded-md bg-white px-3 text-xs text-neutral-400 shadow-[0_1px_2px_rgb(0_0_0/0.04)] transition hover:text-neutral-600 hover:shadow-md sm:mt-7 sm:h-14 sm:gap-3 sm:px-4 sm:text-base"
            >
              <span className="truncate">{prompt.label}</span>
              <ArrowRight className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5 sm:size-5" />
            </Link>
          )}
          {children && <div className="mt-6 flex flex-wrap gap-3 sm:mt-7">{children}</div>}
        </div>
        {image && (
          <Image
            src={image.src}
            alt=""
            width={image.width}
            height={image.height}
            priority
            sizes="(min-width: 1024px) 320px, (min-width: 640px) 224px, 120px"
            className="mx-auto w-full lg:max-w-xs"
          />
        )}
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

export const serviceCardClass =
  "group flex h-full w-full flex-col items-center rounded-[1.75rem] bg-tint px-4 pt-5 pb-6 text-center sm:px-6 sm:pt-6 sm:pb-7 transition-all hover:-translate-y-1 hover:shadow-[0_20px_40px_-20px_rgb(0_0_0/0.25)]";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link href={`/services/${service.slug}`} className={serviceCardClass}>
      <ServiceCardBody service={service} />
    </Link>
  );
}

export function ServiceCardBody({ service }: { service: Service }) {
  return (
    <>
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
        className="mt-3 size-32 mix-blend-multiply sm:mt-4 sm:size-44 transition-transform duration-300 group-hover:scale-105"
      />
      <h3 className="mt-3 text-base leading-snug font-bold text-ink sm:mt-4 sm:text-lg">{service.title}</h3>
      <p className="mt-1.5 max-w-[17rem] text-[0.8rem] leading-relaxed text-muted-foreground sm:text-sm">
        {service.summary}
      </p>
      <ul className="mt-auto grid grid-cols-[repeat(2,minmax(0,6.5rem))] justify-center gap-2 pt-4 sm:pt-5">
        {service.stack.slice(0, 4).map((t) => (
          <li
            key={t}
            className="truncate rounded-full border-[1.5px] border-ink px-1.5 py-[3px] text-[0.7rem] font-medium text-ink"
          >
            {t}
          </li>
        ))}
      </ul>
    </>
  );
}

function ProjectName({ study, className }: { study: CaseStudy; className?: string }) {
  return (
    <h3 className={cn("flex items-center gap-2.5 font-bold", className)}>
      {study.icon && (
        <Image src={study.icon} alt="" width={64} height={64} className="size-9 shrink-0 rounded-[0.6rem] bg-white" />
      )}
      {study.client}
    </h3>
  );
}

// A centred wrap rather than a grid, so a short last row sits in the middle.
export const projectGridClass = "flex flex-wrap justify-center gap-6";
export const projectGridItemClass =
  "flex w-full sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)] [&>*]:w-full";

export function PortfolioCard({ study }: { study: CaseStudy }) {
  return (
    <Link
      href={`/work/${study.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_10px_30px_-12px_rgb(0_0_0/0.18)] transition-all duration-300 hover:-translate-y-1 hover:bg-brand hover:shadow-[0_20px_40px_-16px_rgb(225_6_0/0.5)]"
    >
      <ProjectVisual study={study} />
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-semibold tracking-wider text-brand uppercase transition-colors group-hover:text-white/80">
          {study.kind === "app" ? "Mobile app" : "Website"} · {study.industry}
        </p>
        <ProjectName
          study={study}
          className="mt-2 text-2xl text-ink transition-colors group-hover:text-white"
        />
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
      <div className="relative">
        <ProjectVisual study={study} sizes="(min-width: 768px) 50vw, 100vw" />
        <ArrowUpRight className="absolute top-4 right-4 size-8 rounded-full bg-white p-1.5 text-ink shadow transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-semibold tracking-wider text-brand uppercase">
          {study.kind === "app" ? "Mobile app" : "Website"} · {study.industry}
        </p>
        <ProjectName study={study} className="mt-2 text-xl text-ink" />
        <p className="mt-3 mb-6 leading-snug font-semibold text-ink">{study.title}</p>
        {/* Pinned to the bottom so stats and tags line up across cards in the same row. */}
        <dl className="mt-auto grid grid-cols-3 gap-x-3 border-t border-border pt-5">
          {study.results.map((r) => (
            <div key={r.label} className="flex min-w-0 flex-col-reverse justify-end">
              <dt className="mt-0.5 min-h-[2lh] text-xs lg:min-h-[3lh] xl:min-h-[2lh] leading-snug text-muted-foreground">{r.label}</dt>
              <dd className="text-lg leading-tight font-bold whitespace-nowrap text-brand sm:text-xl lg:text-lg xl:text-xl">
                {r.value}
              </dd>
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
    // Phones: one card at a time in a swipeable row, with the next card peeking in.
    <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pt-1 pb-4 [scrollbar-width:none] sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:p-0 lg:grid-cols-3 [&::-webkit-scrollbar]:hidden">
      {reasons.map((r) => (
        <div
          key={r.title}
          className="group flex w-[85%] shrink-0 snap-center flex-col rounded-[2.5rem] bg-tint-mid px-6 pt-6 pb-8 transition-transform duration-300 hover:-translate-y-1 sm:w-auto sm:px-10 sm:pb-10"
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
          <p className="mt-3 text-base leading-[1.7] text-neutral-600 sm:text-lg sm:leading-[1.75]">{r.body}</p>
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

            <Pendulum
              index={i}
              className="relative mt-6 w-full flex-1 rounded-[2rem] bg-tint-strong px-6 pt-7 pb-6 shadow-[0_18px_30px_-18px_rgb(0_0_0/0.3)]"
            >
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
            </Pendulum>
          </li>
        );
      })}
    </ol>
  );
}

export function Testimonials() {
  return (
    <MobileSlider label="Client testimonials" className="sm:grid sm:gap-6 md:grid-cols-2">
      {testimonials.map((t) => (
        <figure
          key={t.name}
          className="flex w-[85%] shrink-0 snap-center flex-col rounded-[2.5rem] px-6 py-8 transition-transform duration-200 hover:-translate-y-1 sm:w-auto sm:px-10 sm:py-10"
        >
          <div className="flex items-center justify-between">
            <StarRating className="text-highlight" />
            <Quote className="size-9 fill-tint-strong text-tint-strong" />
          </div>
          <blockquote className="mt-5 flex-1 text-base leading-relaxed text-neutral-600 sm:text-lg">
            “{t.quote}”
          </blockquote>
          <figcaption className="mt-8 flex items-center gap-3 border-t border-ink/10 pt-6">
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-white shadow-[0_2px_8px_-2px_rgb(0_0_0/0.25)] ring-1 ring-ink/5">
              <GoogleIcon className="size-6" />
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
    </MobileSlider>
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
    <SwipeHintScroller className="overflow-x-auto rounded-[2rem]">
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
    </SwipeHintScroller>
  );
}

const ctaMobileClass =
  "max-sm:h-14 max-sm:gap-1.5 max-sm:px-2 max-sm:text-[0.95rem] max-sm:leading-tight max-sm:whitespace-normal max-sm:[&_svg]:size-5";

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
        <div className="relative rounded-3xl bg-brand px-5 py-14 sm:px-14">
          <div aria-hidden="true" className="bg-grid absolute inset-0 rounded-3xl opacity-70" />
          <div className="relative px-3 sm:px-0 md:max-w-[55%]">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">{title}</h2>
            <p className="mt-3 text-lg text-white/85">{description}</p>
            <div className="mt-8 grid grid-cols-2 gap-2.5 max-sm:-mx-3 sm:flex sm:flex-wrap sm:gap-3">
              <QuoteButton variant="light" className={ctaMobileClass}>
                Get a free quote
                <ArrowRight />
              </QuoteButton>
              <CtaAnchor
                href={whatsappHref()}
                target="_blank"
                rel="noopener noreferrer"
                variant="ghostDark"
                className={ctaMobileClass}
              >
                <WhatsAppIcon />
                Chat on WhatsApp
              </CtaAnchor>
            </div>
          </div>
          <Image
            src="/illustrations/cta/person-phone.png"
            alt=""
            width={640}
            height={725}
            sizes="(min-width: 768px) 288px, 208px"
            className="pointer-events-none relative mx-auto mt-8 -mb-20 w-52 md:absolute md:right-10 md:-bottom-6 md:m-0 md:w-72 xl:right-24"
          />
        </div>
      </div>
    </section>
  );
}
