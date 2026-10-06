export type CaseStudy = {
  slug: string;
  client: string;
  industry: string;
  title: string;
  summary: string;
  services: string[];
  challenge: string;
  solution: string[];
  results: { value: string; label: string }[];
  stack: string[];
  duration: string;
  accent: "red" | "black";
  image: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "freshkart-grocery-app",
    image: "/portfolio/freshkart.jpg",
    client: "FreshKart",
    industry: "Retail & Grocery",
    title: "A grocery delivery app that took orders from 0 to 12,000 a month",
    summary:
      "We designed and built FreshKart's customer app, rider app and store dashboard, replacing WhatsApp orders and phone calls.",
    services: ["App Development", "UI/UX Design", "Custom Software"],
    challenge:
      "FreshKart was taking orders over WhatsApp and phone. Orders were missed during peak hours, riders had no route planning and the owners had no view of daily sales.",
    solution: [
      "Customer app for iOS and Android with live order tracking and UPI payments",
      "Rider app with batched, route-optimised deliveries",
      "Store dashboard for inventory, order queue and daily sales reports",
      "Shared Node.js API and PostgreSQL database for all three apps",
    ],
    results: [
      { value: "12k+", label: "orders per month" },
      { value: "38%", label: "faster deliveries" },
      { value: "4.7", label: "Play Store rating" },
    ],
    stack: ["React Native", "Node.js", "PostgreSQL", "Razorpay", "Google Maps"],
    duration: "14 weeks",
    accent: "red",
  },
  {
    slug: "learnly-saas-platform",
    image: "/portfolio/learnly.jpg",
    client: "Learnly",
    industry: "EdTech",
    title: "A multi-tenant LMS that 40 coaching institutes now run on",
    summary:
      "We built Learnly's SaaS platform from MVP to a product with subscription billing, live classes and per-institute branding.",
    services: ["SaaS Development", "UI/UX Design", "Tech Management"],
    challenge:
      "Learnly had a validated idea and a pilot customer, but no product. They needed an MVP fast and an architecture that would not need rebuilding once more institutes signed up.",
    solution: [
      "Multi-tenant architecture with per-institute subdomains and branding",
      "Course builder, live class scheduling and student progress tracking",
      "Razorpay subscription billing with automated invoices",
      "AWS infrastructure with CI/CD and automated backups",
    ],
    results: [
      { value: "40+", label: "institutes onboarded" },
      { value: "25k", label: "active students" },
      { value: "11 wks", label: "to paid MVP" },
    ],
    stack: ["Next.js", "TypeScript", "PostgreSQL", "AWS", "Razorpay"],
    duration: "11 weeks MVP, ongoing",
    accent: "black",
  },
  {
    slug: "aurum-interiors-growth",
    image: "/portfolio/aurum.jpg",
    client: "Aurum Interiors",
    industry: "Interior Design",
    title: "A new website and ad strategy that tripled qualified leads",
    summary:
      "We rebuilt Aurum's website, rewrote their messaging and moved their ad budget to the channels that were actually converting.",
    services: ["Web Development", "Digital Marketing", "Social Media Management"],
    challenge:
      "Aurum was spending heavily on ads, but their slow template website converted poorly and most leads were outside their service area or budget.",
    solution: [
      "Rebuilt website with a project portfolio and a qualifying enquiry form",
      "Location and budget targeting across Google and Meta ads",
      "Weekly reels showing real project walkthroughs",
      "Conversion tracking connected to their CRM",
    ],
    results: [
      { value: "3.2x", label: "qualified leads" },
      { value: "-46%", label: "cost per lead" },
      { value: "1.4s", label: "average page load" },
    ],
    stack: ["Next.js", "Sanity CMS", "Google Ads", "Meta Ads", "GA4"],
    duration: "6 weeks build, ongoing marketing",
    accent: "red",
  },
  {
    slug: "medilink-clinic-software",
    image: "/portfolio/medilink.jpg",
    client: "MediLink Clinics",
    industry: "Healthcare",
    title: "Clinic management software for a 9-branch healthcare chain",
    summary:
      "We replaced three disconnected tools with one system for appointments, patient records and billing across every branch.",
    services: ["Custom Software", "Maintenance & Support", "Tech Management"],
    challenge:
      "Each MediLink branch used different tools for bookings and billing. Patient history could not move between branches and month-end reconciliation took days.",
    solution: [
      "Centralised appointment booking with SMS reminders",
      "Shared patient records with role-based access and audit logs",
      "Branch-level billing with consolidated reporting",
      "Ongoing support with a 4-hour critical response SLA",
    ],
    results: [
      { value: "9", label: "branches on one system" },
      { value: "-60%", label: "no-show rate" },
      { value: "3 days", label: "saved at month end" },
    ],
    stack: ["React", "Java", "Spring Boot", "PostgreSQL", "AWS"],
    duration: "18 weeks",
    accent: "black",
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}
