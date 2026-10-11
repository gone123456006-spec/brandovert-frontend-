import { ArrowRight, CircleCheck } from "lucide-react";
import { services } from "@/lib/content/services";
import { caseStudies } from "@/lib/content/case-studies";
import { ClientLogos } from "@/components/site/client-logos";
import { HeroIllustration } from "@/components/site/hero-illustration";
import { homeFaqs } from "@/lib/content/faqs";
import { CtaLink } from "@/components/site/cta";
import { Carousel, CarouselItem } from "@/components/site/carousel";
import { ServiceEnquiryButton } from "@/components/site/service-enquiry";
import { Highlight, Section, SectionHeading } from "@/components/site/section";
import {
  ComparisonTable,
  CtaBand,
  FaqList,
  PortfolioCard,
  ProcessSteps,
  ServiceCardBody,
  serviceCardClass,
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
      <section className="relative isolate overflow-hidden bg-gradient-to-b from-white via-surface to-white">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle,rgb(0_0_0/0.13)_1px,transparent_1.5px)] bg-[size:22px_22px] [mask-image:radial-gradient(ellipse_75%_70%_at_60%_45%,black_30%,transparent_80%)]" />
          <div className="absolute -top-32 -left-32 size-[520px] rounded-full bg-white blur-[90px]" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-white" />
        </div>
        <div className="container-page grid items-center gap-6 py-16 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:pt-14 lg:pb-20">
          <div className="lg:-mt-4">
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

          <HeroIllustration className="h-[290px] sm:h-[390px] lg:h-[440px] lg:translate-y-12 max-sm:[&>div]:scale-[0.43] sm:max-lg:[&>div]:scale-[0.6] lg:max-xl:[&>div]:scale-[0.62] xl:[&>div]:scale-[0.68]" />
        </div>
      </section>

      <section aria-label="Clients" className="py-10">
        <div className="container-page">
          <p className="text-center text-sm font-medium text-muted-foreground">
            Trusted by startups and established businesses across India
          </p>
        </div>
        <div className="mt-6">
          <ClientLogos />
        </div>
      </section>

      <Section id="services">
        <SectionHeading
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
                <ServiceEnquiryButton
                  service={{ slug: s.slug, title: s.title }}
                  className={serviceCardClass}
                >
                  <ServiceCardBody service={s} />
                </ServiceEnquiryButton>
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
            description="Mobile apps live on Google Play and websites live on the web, built for real businesses."
          />
          <CtaLink href="/work" variant="outline" size="md" className="self-start sm:self-auto">
            View full portfolio
            <ArrowRight />
          </CtaLink>
        </div>
        <div className="mt-12">
          <Carousel label="Portfolio">
            {caseStudies.map((c) => (
              <CarouselItem key={c.slug} className="flex [&>*]:w-full">
                <PortfolioCard study={c} />
              </CarouselItem>
            ))}
          </Carousel>
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
