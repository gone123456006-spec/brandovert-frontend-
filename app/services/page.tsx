import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { services } from "@/lib/content/services";
import { CtaLink } from "@/components/site/cta";
import { Section, SectionHeading } from "@/components/site/section";
import { CtaBand, PageHero, ProcessSteps, ServiceCard } from "@/components/site/blocks";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Web development, app development, SaaS, custom software, UI/UX design, digital marketing, social media, website management, tech management and support.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our services"
        title="From first wireframe to millionth user"
        description="Pick a single service or combine them. Every engagement has one project lead, a written scope and a fixed price."
      >
        <CtaLink href="/contact" variant="light">
          Discuss your project
          <ArrowRight />
        </CtaLink>
      </PageHero>

      <Section>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
      </Section>

      <Section tone="surface" curveFrom="white">
        <SectionHeading eyebrow="How we work" title="The same proven process for every service" />
        <div className="mt-12">
          <ProcessSteps />
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
