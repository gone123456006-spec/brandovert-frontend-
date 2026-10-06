import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CircleCheck } from "lucide-react";
import { caseStudies, getCaseStudy } from "@/lib/content/case-studies";
import { testimonials } from "@/lib/content/company";
import { Section } from "@/components/site/section";
import { CaseStudyCard, CtaBand, PageHero } from "@/components/site/blocks";

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  return { title: `${study.client} case study`, description: study.summary };
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const testimonial = testimonials.find((t) => t.company.startsWith(study.client.split(" ")[0]));
  const more = caseStudies.filter((c) => c.slug !== study.slug).slice(0, 2);

  return (
    <>
      <PageHero eyebrow={`${study.client} · ${study.industry}`} title={study.title} description={study.summary} />

      <section className="border-b border-border">
        <div className="container-page grid grid-cols-2 gap-6 py-10 md:grid-cols-4">
          {study.results.map((r) => (
            <div key={r.label}>
              <p className="text-3xl font-bold text-brand sm:text-4xl">{r.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{r.label}</p>
            </div>
          ))}
          <div>
            <p className="text-lg font-bold text-ink">{study.duration}</p>
            <p className="mt-1 text-sm text-muted-foreground">project duration</p>
          </div>
        </div>
      </section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="space-y-12">
            <div>
              <h2 className="text-2xl font-bold text-ink sm:text-3xl">The challenge</h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{study.challenge}</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-ink sm:text-3xl">What we built</h2>
              <ul className="mt-6 space-y-3">
                {study.solution.map((s) => (
                  <li key={s} className="flex gap-3 text-lg text-ink">
                    <CircleCheck className="mt-1 size-5 shrink-0 text-brand" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            {testimonial && (
              <figure className="rounded-2xl bg-surface p-8">
                <blockquote className="text-xl leading-relaxed font-medium text-ink">“{testimonial.quote}”</blockquote>
                <figcaption className="mt-5 text-sm text-muted-foreground">
                  <span className="font-semibold text-ink">{testimonial.name}</span>, {testimonial.role},{" "}
                  {testimonial.company}
                </figcaption>
              </figure>
            )}
          </div>

          <aside className="h-fit space-y-8 rounded-2xl border border-border p-7 lg:sticky lg:top-24">
            <div>
              <h3 className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">Services</h3>
              <ul className="mt-3 space-y-1.5 font-medium text-ink">
                {study.services.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">Tech stack</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {study.stack.map((t) => (
                  <li key={t} className="rounded-full bg-surface px-3 py-1 text-sm font-medium text-ink">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </Section>

      <Section tone="surface">
        <div className="flex items-center justify-between gap-6">
          <h2 className="text-2xl font-bold text-ink sm:text-3xl">More case studies</h2>
          <Link href="/work" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline">
            <ArrowLeft className="size-4" />
            All work
          </Link>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {more.map((c) => (
            <CaseStudyCard key={c.slug} study={c} />
          ))}
        </div>
      </Section>

      <CtaBand title="Have a similar challenge?" />
    </>
  );
}
