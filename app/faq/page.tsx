import type { Metadata } from "next";
import { faqGroups } from "@/lib/content/faqs";
import { site, whatsappHref } from "@/lib/site";
import { CtaAnchor, CtaLink } from "@/components/site/cta";
import { WhatsAppIcon } from "@/components/site/brand-icons";
import { Section } from "@/components/site/section";
import { FaqList, PageHero } from "@/components/site/blocks";

export const metadata: Metadata = {
  title: "FAQ",
  description: `Answers to common questions about working with ${site.name}: pricing, timelines, ownership and support.`,
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqGroups.flatMap((g) =>
    g.items.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: [f.answer, ...(f.points ?? [])].join(" ") },
    }))
  ),
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }}
      />
      <PageHero
        eyebrow="FAQ"
        title="Frequently asked questions"
        description="Everything you need to know about how we price, plan, build and support your project."
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[220px_1fr]">
          <nav aria-label="FAQ categories" className="hidden lg:block">
            <ul className="sticky top-24 space-y-1">
              {faqGroups.map((g) => (
                <li key={g.title}>
                  <a
                    href={`#${slugify(g.title)}`}
                    className="block rounded-lg px-3 py-2 text-sm font-medium text-ink/75 hover:bg-surface hover:text-ink"
                  >
                    {g.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-12">
            {faqGroups.map((g) => (
              <div key={g.title} id={slugify(g.title)} className="scroll-mt-24">
                <h2 className="mb-5 text-2xl font-bold text-ink">{g.title}</h2>
                <FaqList items={g.items} />
              </div>
            ))}

            <div className="rounded-2xl bg-surface p-8">
              <h2 className="text-xl font-bold text-ink">Still have questions?</h2>
              <p className="mt-2 text-muted-foreground">
                Talk to a real person. We usually reply within a few hours during business hours.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <CtaLink href="/contact" size="md">
                  Contact us
                </CtaLink>
                <CtaAnchor href={whatsappHref()} target="_blank" rel="noopener noreferrer" variant="outline" size="md">
                  <WhatsAppIcon />
                  WhatsApp
                </CtaAnchor>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

function slugify(text: string) {
  return text.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
