import type { Metadata } from "next";
import { caseStudies } from "@/lib/content/case-studies";
import { Section } from "@/components/site/section";
import {
  CaseStudyCard,
  CtaBand,
  PageHero,
  projectGridClass,
  projectGridItemClass,
  StatsRow,
} from "@/components/site/blocks";

export const metadata: Metadata = {
  title: "Our Work",
  description: "Mobile apps and websites designed and built by Brandovert.",
};

export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Our work"
        title="Apps and websites we've built"
        description="Real products, live on Google Play and the web. See what we built for each client and why."
      />
      <Section>
        <div className={projectGridClass}>
          {caseStudies.map((c) => (
            <div key={c.slug} className={projectGridItemClass}>
              <CaseStudyCard study={c} />
            </div>
          ))}
        </div>
      </Section>
      <Section tone="surface">
        <StatsRow />
      </Section>
      <CtaBand title="Want an app or website like these?" />
    </>
  );
}
