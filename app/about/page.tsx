import type { Metadata } from "next";
import { leadership, values } from "@/lib/content/company";
import { site } from "@/lib/site";
import { Carousel, CarouselItem } from "@/components/site/carousel";
import { Highlight, Section, SectionHeading } from "@/components/site/section";
import { CtaBand, PageHero, StatsRow, Testimonials, WhyChooseUs } from "@/components/site/blocks";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn about ${site.name}, the team of engineers, designers and marketers behind the products we build.`,
};

const milestones = [
  { year: "2018", text: "Founded in Bengaluru as a three-person web development studio." },
  { year: "2020", text: "Added mobile app development and shipped our first 50 projects." },
  { year: "2022", text: "Launched marketing and social media services for existing clients." },
  { year: "2024", text: "Grew to 40+ people and started offering fractional CTO services." },
  { year: "2026", text: "150+ projects delivered for clients across India, the UK and the UAE." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="Introducing Brandovert"
        description={`${site.name} is a team of engineers, designers and marketers who help businesses turn ideas into products customers actually use.`}
        hashtag="#BuildItRight"
        prompt={{ href: "/contact", label: "Share your project idea…" }}
        image={{ src: "/illustrations/hero/about.png", width: 720, height: 601 }}
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Our story"
              title={
                <>
                  Started by engineers, <Highlight>built on trust</Highlight>
                </>
              }
            />
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted-foreground">
              <p>
                We started {site.name} after years of watching good businesses get burned by agencies
                that over-promised, under-delivered and disappeared after launch.
              </p>
              <p>
                So we built the company we wished we could hire: senior people on every project,
                fixed prices, weekly demos and support that continues long after go-live. Most of our
                work now comes from referrals and clients who return for their next project.
              </p>
            </div>
          </div>
          <ol className="relative space-y-6 border-l-2 border-surface pl-8">
            {milestones.map((m) => (
              <li key={m.year} className="relative">
                <span className="absolute top-1 -left-[41px] size-4 rounded-full border-4 border-white bg-brand ring-2 ring-surface" />
                <p className="font-bold text-brand">{m.year}</p>
                <p className="mt-1 text-ink">{m.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section tone="surface">
        <StatsRow />
      </Section>

      <Section>
        <SectionHeading eyebrow="Our values" title="What we believe in" />
        <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2">
          {values.map((v) => (
            <div
              key={v.title}
              className="rounded-[2.5rem] bg-tint-mid px-8 py-12 transition-transform duration-300 hover:-translate-y-1 sm:px-12"
            >
              <h3 className="text-xl leading-snug font-medium text-ink sm:text-[1.6rem]">{v.title}</h3>
              <p className="mt-3 text-lg leading-[1.75] text-neutral-600 sm:text-xl">{v.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="ink">
        <SectionHeading tone="light" title="What working with us looks like" />
        <div className="mt-12">
          <WhyChooseUs />
        </div>
      </Section>

      <Section>
        <SectionHeading wide eyebrow="Leadership" title="The people accountable for your project" />
        <div className="mt-14">
          <Carousel label="Leadership team">
            {leadership.map((p) => (
              <CarouselItem key={p.name}>
                <figure className="flex h-full flex-col items-center text-center">
                  <div className="relative flex w-full flex-1 items-center rounded-[2.5rem] bg-tint-strong px-7 py-10">
                    <blockquote className="text-base leading-relaxed text-ink">
                      &ldquo;{p.quote}&rdquo;
                    </blockquote>
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-3 left-1/2 size-7 -translate-x-1/2 rotate-45 rounded-sm bg-tint-strong"
                    />
                  </div>
                  <figcaption className="mt-8 flex flex-col items-center">
                    <span className="grid size-20 place-items-center rounded-2xl border-[5px] border-tint-strong bg-ink text-xl font-bold text-white">
                      {p.initials}
                    </span>
                    <span className="mt-4 text-lg font-bold text-ink">{p.name}</span>
                    <span className="mt-1 text-base text-muted-foreground">{p.role}</span>
                  </figcaption>
                </figure>
              </CarouselItem>
            ))}
          </Carousel>
        </div>
      </Section>

      <Section tone="surface">
        <SectionHeading title="In our clients' words" />
        <div className="mt-12">
          <Testimonials />
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
