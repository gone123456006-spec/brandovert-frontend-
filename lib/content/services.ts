import type { LucideIcon } from "lucide-react";
import {
  Blocks,
  Cloud,
  CodeXml,
  LifeBuoy,
  MonitorCog,
  Megaphone,
  Palette,
  Search,
  ServerCog,
  Share2,
  ShoppingCart,
  Smartphone,
} from "lucide-react";

export type ServiceCategory = "Development" | "Design" | "Growth" | "Management" | "Support";

export type Service = {
  slug: string;
  title: string;
  category: ServiceCategory;
  icon: LucideIcon;
  summary: string;
  description: string;
  deliverables: string[];
  stack: string[];
  techStack?: TechGroup[];
  outcomes: string[];
  timeline: string;
};

export type TechGroup = { label: string; tools: string[] };

const webStack: TechGroup[] = [
  { label: "Frontend", tools: ["Next.js", "React", "TypeScript", "JavaScript"] },
  { label: "Styling", tools: ["Tailwind CSS"] },
  { label: "UI", tools: ["shadcn/ui"] },
  { label: "Icons", tools: ["Lucide"] },
  { label: "Animation", tools: ["Motion"] },
  { label: "Forms", tools: ["React Hook Form", "Zod"] },
  { label: "Database", tools: ["PostgreSQL", "MongoDB Atlas"] },
  { label: "ORM", tools: ["Prisma"] },
  { label: "Auth", tools: ["Auth.js"] },
  { label: "Storage", tools: ["Cloudinary", "Amazon S3"] },
  { label: "Payments", tools: ["Razorpay", "Stripe"] },
  { label: "Email", tools: ["Resend"] },
  { label: "Charts", tools: ["Recharts"] },
  { label: "Deployment", tools: ["Vercel"] },
  { label: "Git", tools: ["GitHub"] },
];

export const services: Service[] = [
  {
    slug: "web-development",
    title: "Web Development",
    category: "Development",
    icon: CodeXml,
    summary:
      "Fast, accessible websites and web apps built on modern frameworks and designed to rank and convert.",
    description:
      "From marketing sites to complex customer portals, we build web products that load quickly, are easy for your team to update, and stay maintainable as you grow.",
    deliverables: [
      "Marketing websites and landing pages",
      "Customer portals and dashboards",
      "E-commerce storefronts",
      "Headless CMS integration",
      "Technical SEO and Core Web Vitals tuning",
      "Fully responsive, mobile-first design",
      "Contact forms, WhatsApp and CRM integration",
      "Blog, multi-language and accessibility support",
      "Google Analytics and conversion tracking",
      "Domain, hosting, SSL and launch setup",
    ],
    stack: ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS"],
    techStack: webStack,
    outcomes: ["Sub-2s page loads", "90+ Lighthouse scores", "Editable by non-developers"],
    timeline: "4 to 10 weeks",
  },
  {
    slug: "app-development",
    title: "App Development",
    category: "Development",
    icon: Smartphone,
    summary:
      "Native-quality iOS and Android apps from a single codebase, shipped to both stores.",
    description:
      "We take your app from wireframe to App Store and Play Store, including backend APIs, push notifications, payments and analytics.",
    deliverables: [
      "iOS and Android apps",
      "Backend APIs and admin panel",
      "Payments, maps and push notifications",
      "App Store and Play Store submission",
      "Crash reporting and analytics",
      "UI/UX design and clickable prototypes",
      "Login with OTP, Google and Apple",
      "In-app chat, booking and subscriptions",
      "Offline mode and real-time sync",
      "Post-launch updates and OS upgrades",
    ],
    stack: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase", "Node.js"],
    techStack: [
      { label: "Mobile", tools: ["React Native", "Expo", "Flutter"] },
      { label: "Native", tools: ["Swift", "Kotlin"] },
      ...webStack,
    ],
    outcomes: ["One codebase, two platforms", "4.5+ store ratings", "Offline-ready flows"],
    timeline: "8 to 16 weeks",
  },
  {
    slug: "custom-software",
    title: "Custom Software",
    category: "Development",
    icon: Blocks,
    summary:
      "Internal tools, ERPs and workflow automation built around how your business actually runs.",
    description:
      "Off-the-shelf software forces you to change your process. We build software around yours: inventory, billing, CRM, field operations, or anything held together by spreadsheets today.",
    deliverables: [
      "ERP, CRM and inventory systems",
      "Workflow and approval automation",
      "Third-party and legacy system integration",
      "Role-based access and audit logs",
      "Reporting and data exports",
      "Process discovery and requirement mapping",
      "Billing, invoicing and GST support",
      "Mobile access for field teams",
      "Data migration from spreadsheets",
      "Staff training and documentation",
    ],
    stack: ["TypeScript", "Python", "Java", "PostgreSQL", "Redis", "AWS"],
    techStack: webStack,
    outcomes: ["Fewer manual hours", "Single source of truth", "Software you own outright"],
    timeline: "8 to 20 weeks",
  },
  {
    slug: "saas-development",
    title: "SaaS Development",
    category: "Development",
    icon: Cloud,
    summary:
      "Multi-tenant SaaS products with billing, onboarding and the infrastructure to scale.",
    description:
      "We help founders go from idea to paying customers: scoping an MVP, building it, and setting up the subscription, auth and infrastructure foundations that are expensive to retrofit later.",
    deliverables: [
      "MVP scoping and product roadmap",
      "Multi-tenant architecture",
      "Subscription billing (Stripe, Razorpay)",
      "Authentication, teams and roles",
      "Usage analytics and admin console",
      "User onboarding and email notifications",
      "Free trials, plans and upgrade flows",
      "Public APIs and webhooks",
      "Cloud hosting, backups and auto-scaling",
      "Security hardening and data privacy",
    ],
    stack: ["Next.js", "Node.js", "PostgreSQL", "Stripe", "Razorpay", "AWS", "Docker"],
    techStack: webStack,
    outcomes: ["MVP in 10 to 12 weeks", "Billing from day one", "Built to scale past 10k users"],
    timeline: "10 to 24 weeks",
  },
  {
    slug: "ecommerce-development",
    title: "E-commerce Development",
    category: "Development",
    icon: ShoppingCart,
    summary:
      "Online stores with secure payments, inventory and shipping, built to turn visitors into repeat buyers.",
    description:
      "Whether you are launching your first store or moving off a platform you have outgrown, we build e-commerce that is fast on mobile, easy to manage and connected to the payment, shipping and accounting tools you already use.",
    deliverables: [
      "Custom storefronts and product catalogues",
      "Razorpay, UPI and card payments",
      "Inventory, orders and shipping integration",
      "Discounts, coupons and loyalty",
      "Shopify and WooCommerce builds and migrations",
      "Cash on delivery and order tracking",
      "Product search, filters and reviews",
      "Abandoned cart and WhatsApp alerts",
      "GST invoices and accounting sync",
      "Sales dashboard and reports",
    ],
    stack: ["Next.js", "Shopify", "WooCommerce", "Razorpay", "Shiprocket", "PostgreSQL"],
    techStack: [{ label: "Platforms", tools: ["Shopify", "WooCommerce"] }, ...webStack],
    outcomes: ["Faster checkout", "Higher conversion on mobile", "Orders managed in one place"],
    timeline: "6 to 14 weeks",
  },
  {
    slug: "ui-ux-design",
    title: "UI/UX Design",
    category: "Design",
    icon: Palette,
    summary:
      "Research-backed product design, from user flows and wireframes to polished design systems.",
    description:
      "Good design is how a product works, not just how it looks. We run research, map user journeys and hand developers a design system they can build from without guesswork.",
    deliverables: [
      "User research and journey mapping",
      "Wireframes and clickable prototypes",
      "High-fidelity UI design",
      "Design systems and component libraries",
      "Usability testing",
      "Competitor and UX audits",
      "Mobile app and responsive web design",
      "Logo, colours and brand guidelines",
      "Icons, illustrations and micro-interactions",
      "Developer-ready handoff in Figma",
    ],
    stack: ["Figma", "FigJam", "Maze", "Framer"],
    outcomes: ["Clear developer handoff", "Consistent UI across products", "Validated before build"],
    timeline: "2 to 8 weeks",
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    category: "Growth",
    icon: Megaphone,
    summary:
      "Performance ads, content and email campaigns that bring in leads you can measure.",
    description:
      "We plan and run campaigns across search, social and email, and report on what matters: cost per lead, conversion rate and revenue, not vanity metrics.",
    deliverables: [
      "Campaign strategy and audience research",
      "Google and Meta ads management",
      "Content and email marketing",
      "Conversion rate optimisation",
      "Monthly performance reporting",
      "Landing pages built for campaigns",
      "Ad creatives and copywriting",
      "Retargeting and lookalike audiences",
      "WhatsApp and SMS marketing",
      "Lead tracking and CRM setup",
    ],
    stack: ["Google Ads", "Meta Ads", "GA4", "Search Console", "HubSpot", "Ahrefs"],
    outcomes: ["Lower cost per lead", "Attribution you can trust", "Clear monthly reports"],
    timeline: "Ongoing, monthly retainer",
  },
  {
    slug: "seo",
    title: "SEO Services",
    category: "Growth",
    icon: Search,
    summary:
      "Technical, on-page and local SEO that gets you found on Google by customers ready to buy.",
    description:
      "We fix what is holding your site back, target the searches your customers actually make and build authority over time, with monthly reports that tie rankings to traffic and enquiries.",
    deliverables: [
      "Technical SEO audit and fixes",
      "Keyword research and content plan",
      "On-page optimisation",
      "Google Business Profile and local SEO",
      "Link building and monthly ranking reports",
      "Competitor and backlink analysis",
      "SEO blog writing and content updates",
      "Site speed and mobile optimisation",
      "Schema markup and rich results",
      "E-commerce and product page SEO",
    ],
    stack: ["Search Console", "GA4", "Ahrefs", "Semrush", "Screaming Frog", "Google Business Profile"],
    outcomes: ["More organic enquiries", "Top-3 local rankings", "Traffic that compounds"],
    timeline: "Ongoing, 6-month minimum",
  },
  {
    slug: "social-media-management",
    title: "Social Media Management",
    category: "Growth",
    icon: Share2,
    summary:
      "Consistent, on-brand content and community management across the platforms your customers use.",
    description:
      "We plan your content calendar, create posts and reels, publish on schedule and respond to your community, so your brand stays active without eating your team's time.",
    deliverables: [
      "Content strategy and calendar",
      "Post, carousel and reel production",
      "Scheduling and publishing",
      "Community and DM management",
      "Monthly analytics review",
      "Profile setup and optimisation",
      "Captions, hashtags and trend research",
      "Graphic design and short video editing",
      "Influencer and collaboration outreach",
      "Paid boosts and ad campaigns",
    ],
    stack: ["Instagram", "LinkedIn", "Facebook", "YouTube", "X", "Meta Business Suite"],
    outcomes: ["Consistent posting", "Higher engagement", "A recognisable brand voice"],
    timeline: "Ongoing, monthly retainer",
  },
  {
    slug: "website-management",
    title: "Website Management",
    category: "Management",
    icon: MonitorCog,
    summary:
      "Content updates, hosting, backups and security for your website, handled by one team.",
    description:
      "Send us a message and the change is live, usually the same day. We also look after hosting, SSL, backups, uptime monitoring and security patches.",
    deliverables: [
      "Content and page updates",
      "Managed hosting and SSL",
      "Daily backups",
      "Uptime and security monitoring",
      "Plugin and dependency updates",
      "Domain and email management",
      "Speed and performance optimisation",
      "Malware scanning and removal",
      "New pages, banners and offers",
      "Monthly health report",
    ],
    stack: ["WordPress", "Webflow", "Next.js", "Cloudflare", "Vercel", "AWS"],
    outcomes: ["Same-day updates", "99.9% uptime", "No surprise breakages"],
    timeline: "Ongoing, monthly plan",
  },
  {
    slug: "tech-management",
    title: "Tech Management",
    category: "Management",
    icon: ServerCog,
    summary:
      "A fractional CTO and DevOps team for businesses without in-house technical leadership.",
    description:
      "We act as your technology team: choosing the right tools, managing vendors, setting up cloud infrastructure and CI/CD, and keeping costs and security under control.",
    deliverables: [
      "Fractional CTO and technical advisory",
      "Cloud setup and cost optimisation",
      "CI/CD pipelines and DevOps",
      "Vendor and tool evaluation",
      "Security and compliance reviews",
      "Technology roadmap and architecture",
      "Hiring and managing developers",
      "Code reviews and quality standards",
      "Backup and disaster recovery planning",
      "Monitoring, alerts and incident response",
    ],
    stack: ["AWS", "Google Cloud", "Azure", "Docker", "Kubernetes", "GitHub Actions"],
    outcomes: ["Lower cloud bills", "Faster, safer releases", "Decisions backed by expertise"],
    timeline: "Ongoing, monthly engagement",
  },
  {
    slug: "maintenance-and-support",
    title: "Maintenance & Support",
    category: "Support",
    icon: LifeBuoy,
    summary:
      "Bug fixes, monitoring and small improvements with response times written into the contract.",
    description:
      "Software needs care after launch. We fix issues, keep dependencies current, monitor performance and ship small improvements every month, including for apps we didn't build.",
    deliverables: [
      "Bug fixes with defined SLAs",
      "Performance and error monitoring",
      "Dependency and security updates",
      "Monthly improvement hours",
      "Takeover of existing codebases",
      "Uptime checks and server health",
      "Database backups and restores",
      "Browser and device compatibility fixes",
      "Small features and UI tweaks",
      "Monthly maintenance report",
    ],
    stack: ["Sentry", "Datadog", "GitHub", "Jira", "Slack"],
    outcomes: ["4-hour critical response", "Fewer production incidents", "A named point of contact"],
    timeline: "Ongoing, monthly plan",
  },
];

export function serviceIllustration(slug: string) {
  return `/illustrations/services/${slug}.jpg`;
}

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
