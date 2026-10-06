export const stats = [
  { value: "150+", label: "projects delivered" },
  { value: "8+", label: "years in business" },
  { value: "95%", label: "client retention" },
  { value: "40+", label: "engineers, designers and marketers" },
] as const;

export type Reason = { illustration: string; title: string; body: string };

export const reasons: Reason[] = [
  {
    illustration: "/illustrations/why/one-team.jpg",
    title: "One team for build and growth",
    body: "Design, development, marketing and support sit together, so nothing gets lost between vendors.",
  },
  {
    illustration: "/illustrations/why/fixed-price.jpg",
    title: "Fixed scope, fixed price",
    body: "You get a written scope and a fixed quote before work starts. Changes are priced up front, never billed as a surprise.",
  },
  {
    illustration: "/illustrations/why/senior-team.jpg",
    title: "Senior people on your project",
    body: "Your project is led by engineers with 5+ years of experience. Juniors work with them, never instead of them.",
  },
  {
    illustration: "/illustrations/why/weekly-demos.jpg",
    title: "Weekly demos, not monthly reports",
    body: "You see working software every week and can change direction early, while it is still cheap to do so.",
  },
  {
    illustration: "/illustrations/why/ownership.jpg",
    title: "You own everything",
    body: "Source code, designs, accounts and infrastructure are in your name from day one, with documentation to match.",
  },
  {
    illustration: "/illustrations/why/support.jpg",
    title: "Support after launch",
    body: "Every project includes 60 days of free support, with monthly plans after that if you want them.",
  },
];

export const comparisonColumns = ["Freelancers", "Typical agencies", "Brandovert"] as const;

export const comparison: { feature: string; values: [boolean, boolean, boolean] }[] = [
  { feature: "Fixed scope and fixed price", values: [false, true, true] },
  { feature: "Senior engineer leading every project", values: [true, false, true] },
  { feature: "Weekly demos of working software", values: [false, false, true] },
  { feature: "Design, development and marketing in one team", values: [false, true, true] },
  { feature: "Dedicated project manager", values: [false, true, true] },
  { feature: "Code, designs and accounts in your name from day one", values: [false, false, true] },
  { feature: "60 days of free support after launch", values: [false, false, true] },
  { feature: "Ongoing maintenance and growth plans", values: [false, true, true] },
];

export const process = [
  {
    step: "01",
    title: "Discover",
    body: "A free 45-minute call to understand your goals, users and constraints.",
  },
  {
    step: "02",
    title: "Plan",
    body: "A written scope, timeline and fixed quote within 5 working days.",
  },
  {
    step: "03",
    title: "Build",
    body: "Two-week sprints, with a live demo of working software at the end of every week.",
  },
  {
    step: "04",
    title: "Launch & grow",
    body: "Go live, then improve with support, analytics and marketing.",
  },
] as const;

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "They built our customer app, rider app and dashboard in under four months. More importantly, they told us what not to build in version one, which saved us a lot of money.",
    name: "Rahul Mehta",
    role: "Founder",
    company: "FreshKart",
  },
  {
    quote:
      "We went from a slide deck to paying customers in eleven weeks. The architecture decisions they made early on are why we could onboard forty institutes without a rewrite.",
    name: "Ananya Rao",
    role: "Co-founder & CEO",
    company: "Learnly",
  },
  {
    quote:
      "Our previous agency reported on likes and impressions. Brandovert reports on leads and cost per lead, and both have moved in the right direction every quarter.",
    name: "Vikram Shah",
    role: "Managing Director",
    company: "Aurum Interiors",
  },
  {
    quote:
      "Nine branches, one system, and support that actually picks up the phone. Their 4-hour response time has never been missed in two years.",
    name: "Dr. Priya Nair",
    role: "Director of Operations",
    company: "MediLink Clinics",
  },
];

export const values = [
  {
    title: "Clarity over jargon",
    body: "We explain trade-offs in plain language so you can make informed decisions.",
  },
  {
    title: "Ship, then improve",
    body: "Real users teach more than long specifications. We launch early and iterate.",
  },
  {
    title: "Own the outcome",
    body: "We measure success by your results, not by hours logged or tickets closed.",
  },
  {
    title: "Long-term thinking",
    body: "We write code and make decisions your future team will thank us for.",
  },
];

export const leadership = [
  {
    name: "Arjun Kapoor",
    role: "Founder & CEO",
    initials: "AK",
    quote:
      "We built Brandovert to be the partner we always wanted to hire: honest about trade-offs, clear on price and still around long after launch.",
  },
  {
    name: "Sneha Iyer",
    role: "Head of Engineering",
    initials: "SI",
    quote:
      "Every project is led by a senior engineer. We write code your future team can read, test and extend without calling us.",
  },
  {
    name: "Karan Malhotra",
    role: "Head of Design",
    initials: "KM",
    quote:
      "Good design is measured in fewer support tickets and more sign-ups. We test with real users before a single screen is built.",
  },
  {
    name: "Meera Joshi",
    role: "Head of Growth",
    initials: "MJ",
    quote:
      "Launch is the starting line. We track what your customers actually do and keep improving until the numbers move.",
  },
];

export const clientLogos = [
  "FreshKart",
  "Learnly",
  "Aurum Interiors",
  "MediLink",
  "UrbanNest",
  "PayRoute",
  "GreenLeaf",
  "Nimbus Labs",
];
