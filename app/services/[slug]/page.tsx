import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CircleCheck, Clock } from "lucide-react";
import { getService, services } from "@/lib/content/services";
import { caseStudies } from "@/lib/content/case-studies";
import { CtaLink } from "@/components/site/cta";
import { Section, SectionHeading } from "@/components/site/section";
import { CaseStudyCard, CtaBand, PageHero, ServiceCard } from "@/components/site/blocks";
import { TechIcon } from "@/components/site/tech-icon";

function TechChip({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-white py-1.5 pr-3.5 pl-2.5 text-sm font-medium text-ink">
      <TechIcon name={name} className="size-4" />
      {name}
    </span>
  );
}

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return { title: service.title, description: service.summary };
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const relatedWork = caseStudies.filter((c) => c.services.includes(service.title)).slice(0, 2);
  const otherServices = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      <PageHero eyebrow="Services" title={service.title} description={service.description}>
        <CtaLink href={`/contact?service=${service.slug}`}>
          Get a quote for {service.title.toLowerCase()}
          <ArrowRight />
        </CtaLink>
      </PageHero>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.3fr_0.7fr]">
          <div>
            <h2 className="text-2xl font-bold text-ink sm:text-3xl">What&apos;s included</h2>
            <ul className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {service.deliverables.map((d) => (
                <li key={d} className="flex gap-3 font-medium text-ink">
                  <CircleCheck className="mt-0.5 size-5 shrink-0 text-brand" />
                  {d}
                </li>
              ))}
            </ul>

            <h2 className="mt-14 text-2xl font-bold text-ink sm:text-3xl">Technologies we use</h2>
            {service.techStack ? (
              <dl className="mt-6 divide-y divide-border border-y border-border">
                {service.techStack.map((group) => (
                  <div
                    key={group.label}
                    className="grid grid-cols-[5.5rem_1fr] items-center gap-3 py-3 sm:grid-cols-[8rem_1fr]"
                  >
                    <dt className="text-xs font-semibold tracking-wide text-ink/55 uppercase">
                      {group.label}
                    </dt>
                    <dd className="flex flex-wrap gap-2">
                      {group.tools.map((t) => (
                        <TechChip key={t} name={t} />
                      ))}
                    </dd>
                  </div>
                ))}
              </dl>
            ) : (
              <ul className="mt-6 flex flex-wrap gap-2">
                {service.stack.map((t) => (
                  <li key={t}>
                    <TechChip name={t} />
                  </li>
                ))}
              </ul>
            )}
          </div>

          <aside className="h-fit rounded-2xl bg-ink p-7 text-white lg:sticky lg:top-36">
            <p className="flex items-center gap-2 text-sm text-white/70">
              <Clock className="size-4" />
              Typical timeline
            </p>
            <p className="mt-1 text-2xl font-bold">{service.timeline}</p>
            <h3 className="mt-8 text-sm font-semibold tracking-wider text-highlight uppercase">What you can expect</h3>
            <ul className="mt-4 space-y-3">
              {service.outcomes.map((o) => (
                <li key={o} className="flex gap-3">
                  <CircleCheck className="mt-0.5 size-5 shrink-0 text-brand" />
                  {o}
                </li>
              ))}
            </ul>
            <CtaLink href={`/contact?service=${service.slug}`} className="mt-8 w-full">
              Start a project
            </CtaLink>
          </aside>
        </div>
      </Section>

      {relatedWork.length > 0 && (
        <Section tone="surface">
          <SectionHeading align="left" eyebrow="Related work" title={`${service.title} in practice`} />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {relatedWork.map((c) => (
              <CaseStudyCard key={c.slug} study={c} />
            ))}
          </div>
        </Section>
      )}

      <Section>
        <div className="flex items-end justify-between gap-6">
          <SectionHeading align="left" title="Other services" />
          <Link href="/services" className="text-sm font-semibold text-brand hover:underline">
            View all
          </Link>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {otherServices.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
