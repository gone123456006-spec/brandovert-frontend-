import { ArrowRight, CircleCheck } from "lucide-react";
import { services } from "@/lib/content/services";
import { caseStudies } from "@/lib/content/case-studies";
import { clientLogos } from "@/lib/content/company";
import { homeFaqs } from "@/lib/content/faqs";
import { CtaLink } from "@/components/site/cta";
import { Carousel, CarouselItem } from "@/components/site/carousel";
import { Highlight, Section, SectionHeading } from "@/components/site/section";
import {
  ComparisonTable,
  CtaBand,
  FaqList,
  PortfolioCard,
  ProcessSteps,
  ServiceCard,
  StatsRow,
  Testimonials,
  WhyChooseUs,
} from "@/components/site/blocks";

const heroPoints = [
  "Fixed scope and fixed price",
  "Weekly demos of working software",
  "You own the code from day one",
];

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-surface">
        <div className="container-page grid items-center gap-14 py-16 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
          <div>
            <h1 className="text-4xl leading-[1.1] font-extrabold text-ink sm:text-5xl lg:text-6xl">
              Build like the <Highlight>top 1%</Highlight> of tech companies.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Brandovert designs, builds, markets and maintains software for growing businesses: web
              and mobile apps, SaaS products and custom tools, delivered by one senior team.
            </p>
            <ul className="mt-7 space-y-2.5">
              {heroPoints.map((p) => (
                <li key={p} className="flex items-center gap-2.5 font-medium text-ink">
                  <CircleCheck className="size-5 text-brand" />
                  {p}
                </li>
              ))}
            </ul>
            <div className="mt-9 flex flex-wrap gap-3">
              <CtaLink href="/contact">
                Book a free consultation
                <ArrowRight />
              </CtaLink>
              <CtaLink href="/work" variant="outline">
                See our work
              </CtaLink>
            </div>
          </div>

          <HeroPanel />
        </div>
      </section>

      <section aria-label="Clients" className="border-b border-border py-10">
        <div className="container-page">
          <p className="text-center text-sm font-medium text-muted-foreground">
            Trusted by startups and established businesses across India
          </p>
          <ul className="mt-6 grid grid-cols-2 gap-x-8 gap-y-4 text-center sm:grid-cols-4 lg:grid-cols-8">
            {clientLogos.map((name) => (
              <li key={name} className="text-lg font-bold text-ink/35">
                {name}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Section id="services">
        <SectionHeading
          eyebrow="What we do"
          title={
            <>
              Everything you need to <Highlight>launch and grow</Highlight>
            </>
          }
          description="Twelve services, one accountable team. Hire us for a single project or let us run your technology end to end."
        />
        <div className="mt-12">
          <Carousel label="Services">
            {services.map((s) => (
              <CarouselItem key={s.slug}>
                <ServiceCard service={s} />
              </CarouselItem>
            ))}
          </Carousel>
        </div>
      </Section>

      <Section tone="surface" curveFrom="white">
        <div className="grid items-end gap-6 lg:grid-cols-2">
          <SectionHeading
            align="left"
            eyebrow="How we work"
            title="A clear process, from first call to launch day"
          />
          <p className="text-lg leading-relaxed text-muted-foreground lg:pb-2">
            No vague estimates or disappearing developers. You get a written plan, a fixed price and
            a working demo every week.
          </p>
        </div>
        <div className="mt-12">
          <ProcessSteps />
        </div>
      </Section>

      <Section tone="ink" className="relative overflow-hidden">
        <SectionHeading
          tone="light"
          title="A tech partner that behaves like part of your team"
          description="We are measured by what your software does for your business, not by how many hours we bill."
        />
        <div className="mt-14">
          <WhyChooseUs />
        </div>
        <div className="mt-14">
          <StatsRow tone="dark" />
        </div>
      </Section>

      <Section>
        <SectionHeading
          title={
            <>
              Why businesses <Highlight>switch to us</Highlight>
            </>
          }
          description="Freelancers are affordable but stretched thin. Agencies have the people but bill for hours. We combine the best of both, with none of the surprises."
        />
        <div className="mx-auto mt-12 max-w-4xl">
          <ComparisonTable />
        </div>
        <p className="mx-auto mt-10 max-w-5xl text-center text-[0.95rem] leading-8 text-muted-foreground">
          Growing businesses need more than code. They need a partner who quotes a fixed price,
          shows working software every week and stays accountable after launch. At Brandovert, one
          senior team designs, builds, markets and supports your product, and everything we create
          is in your name from day one.
        </p>
      </Section>

      <Section className="pt-0 sm:pt-0">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            align="left"
            title={
              <>
                Products we&apos;ve <Highlight>designed and built</Highlight>
              </>
            }
            description="Apps, platforms and websites now used by thousands of customers every day."
          />
          <CtaLink href="/work" variant="outline" size="md" className="self-start sm:self-auto">
            View full portfolio
            <ArrowRight />
          </CtaLink>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {caseStudies.map((c) => (
            <PortfolioCard key={c.slug} study={c} />
          ))}
        </div>
      </Section>

      <Section className="pt-0 sm:pt-0">
        <SectionHeading
          title="Long-term partners, not one-off projects"
          description="Most of our clients have worked with us for more than two years."
        />
        <div className="mt-14">
          <Testimonials />
        </div>
      </Section>

      <Section className="pt-0 sm:pt-0">
        <h2 className="mb-6 text-3xl font-bold text-ink sm:text-4xl">FAQs</h2>
        <FaqList items={homeFaqs} openFirst />
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <CtaLink href="/faq" variant="outline" size="md">
            View all FAQs
          </CtaLink>
          <CtaLink href="/contact" size="md">
            Ask a question
          </CtaLink>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}

function HeroPanel() {
  const rows = [
    { label: "Discovery call", status: "Done", tone: "bg-ink text-white" },
    { label: "Scope & fixed quote", status: "Done", tone: "bg-ink text-white" },
    { label: "Sprint 3 of 6: Payments", status: "In progress", tone: "bg-brand/10 text-brand" },
    { label: "App Store submission", status: "Week 10", tone: "bg-muted text-muted-foreground" },
  ];

  return (
    <div className="relative" aria-hidden="true">
      <div className="absolute -inset-4 -z-0 rounded-[2rem] bg-brand/10 blur-2xl" />
      <div className="relative rounded-3xl border border-border bg-white p-6 shadow-[0_24px_60px_-24px_rgb(0_0_0/0.35)] sm:p-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">Project</p>
            <p className="text-lg font-bold text-ink">Customer mobile app</p>
          </div>
          <span className="rounded-full bg-brand px-3 py-1 text-xs font-semibold text-white">On track</span>
        </div>

        <div className="mt-6">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-semibold text-ink">58%</span>
          </div>
          <div className="mt-2 h-2 rounded-full bg-muted">
            <div className="h-2 w-[58%] rounded-full bg-brand" />
          </div>
        </div>

        <ul className="mt-6 space-y-3">
          {rows.map((r) => (
            <li key={r.label} className="flex items-center justify-between rounded-xl border border-border px-4 py-3">
              <span className="text-sm font-medium text-ink">{r.label}</span>
              <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${r.tone}`}>{r.status}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 grid grid-cols-3 gap-3 rounded-2xl bg-ink p-4 text-center text-white">
          <div>
            <p className="text-xl font-bold">6</p>
            <p className="text-xs text-white/60">weekly demos</p>
          </div>
          <div>
            <p className="text-xl font-bold">0</p>
            <p className="text-xs text-white/60">surprise invoices</p>
          </div>
          <div>
            <p className="text-xl font-bold">100%</p>
            <p className="text-xs text-white/60">code ownership</p>
          </div>
        </div>
      </div>
    </div>
  );
}
