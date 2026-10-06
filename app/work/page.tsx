import type { Metadata } from "next";
import { caseStudies } from "@/lib/content/case-studies";
import { Section } from "@/components/site/section";
import { CaseStudyCard, CtaBand, PageHero, StatsRow } from "@/components/site/blocks";

export const metadata: Metadata = {
  title: "Case Studies",
  description: "Selected projects from Brandovert and the business results they delivered.",
};

export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Our work"
        title="Case studies"
        description="Real projects, real numbers. Here is what we built, why, and what changed for the business afterwards."
      />
      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          {caseStudies.map((c) => (
            <CaseStudyCard key={c.slug} study={c} />
          ))}
        </div>
      </Section>
      <Section tone="surface">
        <StatsRow />
      </Section>
      <CtaBand title="Want results like these?" />
    </>
  );
}
