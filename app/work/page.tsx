import { caseStudies } from "@/lib/content/case-studies";
import { breadcrumbJsonLd, itemListJsonLd, pageMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { Section } from "@/components/site/section";
import {
  CaseStudyCard,
  CtaBand,
  PageHero,
  projectGridClass,
  projectGridItemClass,
  StatsRow,
} from "@/components/site/blocks";

export const metadata = pageMetadata({
  title: "Our Work",
  description:
    "Case studies of mobile apps and websites designed and built by Brandovert in Patna — live on Google Play and the web.",
  path: "/work",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Case Studies", path: "/work" },
];

export default function WorkPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd(crumbs),
          itemListJsonLd(
            "Brandovert case studies",
            caseStudies.map((c) => ({
              name: `${c.client} — ${c.title}`,
              path: `/work/${c.slug}`,
              description: c.summary,
            }))
          ),
        ]}
      />
      <Breadcrumbs items={crumbs} />
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
