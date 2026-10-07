export type CaseStudy = {
  slug: string;
  kind: "app" | "website";
  client: string;
  industry: string;
  title: string;
  summary: string;
  services: string[];
  challenge: string;
  solution: string[];
  results: { value: string; label: string }[];
  stack?: string[];
  link: { href: string; label: string };
  /** App icon from the store listing. */
  icon?: string;
  /** Apps: store screenshots (portrait). Websites: one homepage capture (landscape). */
  screens: string[];
  /** Background behind the screenshots, picked from the product's own colours. */
  tint: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "luvstor-app",
    kind: "app",
    client: "Luvstor",
    industry: "Social & Dating",
    title: "A social discovery app with chat, voice and video calls",
    summary:
      "We built Luvstor, an Android app for meeting people nearby, chatting and calling, with selfie verification and built-in safety tools.",
    services: ["App Development", "UI/UX Design"],
    challenge:
      "Luvstor needed a complete social app, from profile discovery to real-time chat and calling, with the verification and safety features users expect from a modern dating product.",
    solution: [
      "Discover feed with Nearby and For You tabs, filtered by gender, distance and recent activity",
      "Likes, connection requests and one-to-one chat with photos, voice notes, read receipts and typing indicators",
      "Voice and video calls, call history and a live matching mode in Explore",
      "Selfie photo verification with a verified badge, plus blocking, reporting and a Safety Center",
      "Tokens, referrals, a daily spin and in-app token packs",
    ],
    results: [
      { value: "Live", label: "on Google Play" },
      { value: "Video", label: "and voice calling" },
      { value: "Selfie", label: "profile verification" },
    ],
    link: { href: "https://play.google.com/store/apps/details?id=com.luvstor.app", label: "View on Google Play" },
    icon: "/work/luvstor/icon.webp",
    screens: ["/work/luvstor/1.webp", "/work/luvstor/2.webp", "/work/luvstor/3.webp"],
    tint: "#2b1163",
  },
  {
    slug: "finovert-app",
    kind: "app",
    client: "Finovert: Virtual CA",
    industry: "FinTech",
    title: "A virtual CFO app for founders and small businesses",
    summary:
      "We built Finovert's Android app so business owners can track cash flow, file GST and ITR, and get expert CA support from their phone.",
    services: ["App Development", "UI/UX Design"],
    challenge:
      "Founders and small businesses wanted CFO-level visibility into cash flow and compliance without hiring a full-time finance team or juggling spreadsheets.",
    solution: [
      "Dashboard with cash flow tracking, forecasting and financial health at a glance",
      "Company registration, GST, ITR and TDS filing, CFO services and invoice financing in one place",
      "Budgeting, expense insights and scenario planning for growth decisions",
      "Book a call with CA experts directly from the app",
      "Secure login with each user seeing only their own data and notifications",
    ],
    results: [
      { value: "Live", label: "on Google Play" },
      { value: "6", label: "finance services in one app" },
      { value: "CA-led", label: "expert support" },
    ],
    link: {
      href: "https://play.google.com/store/apps/details?id=com.brandovert.finovert",
      label: "View on Google Play",
    },
    icon: "/work/finovert-app/icon.webp",
    screens: ["/work/finovert-app/1.webp", "/work/finovert-app/2.webp", "/work/finovert-app/3.webp"],
    tint: "#e4ecfd",
  },
  {
    slug: "ohms-english-app",
    kind: "app",
    client: "Ohm's English",
    industry: "EdTech",
    title: "An English learning app with live practice, courses and games",
    summary:
      "We built Ohm's, where learners practise English with real people, follow video courses and stay motivated with games and daily rewards.",
    services: ["App Development", "UI/UX Design"],
    challenge:
      "Learners in India wanted to speak English with confidence, but most apps offered only solo drills with no real conversation practice.",
    solution: [
      "Live chat matching and group discussions with other learners",
      "Voice and video practice sessions for spoken English",
      "Video lessons and PDF notes with progress tracking in My Courses",
      "Quizzes, word scramble, fill-in-the-blanks and flashcards, plus a Word of the Day",
      "Leaderboard, daily points and a 100-day vocabulary journey",
      "Gmail sign-in with one-time code and an in-app help assistant",
    ],
    results: [
      { value: "Live", label: "on Google Play" },
      { value: "4", label: "learning game modes" },
      { value: "100-day", label: "vocabulary journey" },
    ],
    link: {
      href: "https://play.google.com/store/apps/details?id=com.ohms.english&hl=en_IN",
      label: "View on Google Play",
    },
    icon: "/work/ohms/icon.webp",
    screens: ["/work/ohms/1.webp", "/work/ohms/2.webp", "/work/ohms/3.webp"],
    tint: "#fbe4e4",
  },
  {
    slug: "finovert-website",
    kind: "website",
    client: "Finovert",
    industry: "FinTech",
    title: "A finance and compliance platform website for startups and SMEs",
    summary:
      "We built finovert.com, where businesses register companies, file GST and ITR, and get CA-led virtual CFO support.",
    services: ["Web Development", "UI/UX Design"],
    challenge:
      "Finovert offers dozens of registration, tax and compliance services. The website had to make that catalogue easy to browse and turn visitors into consultation requests.",
    solution: [
      "Service catalogue covering company registration, NGOs, licences, FSSAI, BIS and international setup",
      "Free consultation form on the homepage and every service page",
      "Blog and insights section for search traffic",
      "Promotion of the Finovert Android app, plus WhatsApp chat",
    ],
    results: [
      { value: "Live", label: "at finovert.com" },
      { value: "App", label: "linked Android app" },
      { value: "CA-led", label: "service delivery" },
    ],
    stack: ["React", "Vercel"],
    link: { href: "https://www.finovert.com/", label: "Visit website" },
    screens: ["/work/finovert-web/home.jpg"],
    tint: "#dbe7fb",
  },
  {
    slug: "bizvyapar-website",
    kind: "website",
    client: "BizVyapar",
    industry: "MSME Finance",
    title: "A webinar funnel that turns MSME owners into paid sign-ups",
    summary:
      "We built BizVyapar's landing page for a live workshop on turning invoices into cash through TReDS, with a countdown, paid booking and waiting list.",
    services: ["Web Development", "UI/UX Design"],
    challenge:
      "BizVyapar needed a single page that explains TReDS invoice discounting simply and gets small business owners to pay for a seat in a live workshop.",
    solution: [
      "Countdown banner and session details for the next live workshop",
      "Paid seat booking with confirmation and a waiting list",
      "Locked webinar preview, mentor profile and a visual TReDS explainer",
      "FAQs on invoice discounting and financing, plus WhatsApp support",
    ],
    results: [
      { value: "Live", label: "at bizvyapar.in" },
      { value: "1 page", label: "focused sign-up funnel" },
      { value: "Paid", label: "seat booking" },
    ],
    stack: ["Vercel"],
    link: { href: "https://www.bizvyapar.in/", label: "Visit website" },
    screens: ["/work/bizvyapar/home.jpg"],
    tint: "#e6f7d4",
  },
  {
    slug: "dhanvia-website",
    kind: "website",
    client: "Dhanvia",
    industry: "Financial Services",
    title: "A business services website for registrations, tax and investments",
    summary:
      "We built dhanvia.com, covering company registration, compliance, IPR and tax, plus mutual funds, loans and insurance.",
    services: ["Web Development", "UI/UX Design"],
    challenge:
      "Dhanvia sells everything from company registration to insurance. The site needed to present a wide range of services clearly and capture enquiries for each of them.",
    solution: [
      "Rotating hero banners for mutual funds, compliance, loans and insurance",
      "Consultation form with over 100 services to choose from",
      "Tabbed service catalogue for registrations, NGOs, licences, FSSAI and more",
      "Step-by-step registration process, client testimonials and FAQs",
    ],
    results: [
      { value: "Live", label: "at dhanvia.com" },
      { value: "100+", label: "services in the enquiry form" },
      { value: "4", label: "product lines" },
    ],
    stack: ["Vercel"],
    link: { href: "https://www.dhanvia.com/", label: "Visit website" },
    screens: ["/work/dhanvia/home.jpg"],
    tint: "#d9f3e2",
  },
  {
    slug: "impression-imaging-website",
    kind: "website",
    client: "Impression Imaging",
    industry: "Advertising & Events",
    title: "A showcase website for a brand activation agency running since 1999",
    summary:
      "We built impressionimaging.co.in for Impression Imaging Services, a 360° ATL, BTL and activation agency, with an event gallery, enquiry form and app download.",
    services: ["Web Development", "UI/UX Design"],
    challenge:
      "With 27 years of on-ground brand activations behind it, the agency needed a modern site that shows its work visually and turns visitors into enquiries.",
    solution: [
      "Full-width carousel of real events and brand activations",
      "Who we are, philosophy and a three-phase strategy section: planning, creative design and roll-out",
      "Raise Enquiry buttons throughout and a quick enquiry form in the footer",
      "Gallery page and an Android app download page",
    ],
    results: [
      { value: "Live", label: "at impressionimaging.co.in" },
      { value: "1999", label: "agency history showcased" },
      { value: "App", label: "Android download page" },
    ],
    stack: ["Next.js", "Tailwind CSS"],
    link: { href: "https://www.impressionimaging.co.in/", label: "Visit website" },
    screens: ["/work/impression-imaging/home.jpg"],
    tint: "#fde3e3",
  },
  {
    slug: "fintaxcoach-website",
    kind: "website",
    client: "FinTaxCoach",
    industry: "Stock Market Research",
    title: "A SEBI-registered research analyst's website with plan sign-ups",
    summary:
      "We built fintaxcoach.com for FinTaxCoach, presenting three stock research plans with an enquiry form and the regulatory disclosures a SEBI research analyst must show.",
    services: ["Web Development", "UI/UX Design"],
    challenge:
      "FinTaxCoach needed to explain its trading approach and plans clearly while meeting SEBI's disclosure requirements on every page.",
    solution: [
      "Hero slider, About Us and How We Trade sections with the founder's profile",
      "Three research plans: Beginners Champions, FTC Swing Trading and FTC Value Investing",
      "Enquiry form with plan selection",
      "Disclaimer popup plus disclosure, grievance redressal, code of conduct, privacy and refund pages",
    ],
    results: [
      { value: "Live", label: "at fintaxcoach.com" },
      { value: "3", label: "research plans" },
      { value: "SEBI", label: "disclosures built in" },
    ],
    stack: ["WordPress"],
    link: { href: "https://fintaxcoach.com/", label: "Visit website" },
    screens: ["/work/fintaxcoach/home.jpg"],
    tint: "#dfe4fb",
  },
  {
    slug: "finaspiration-website",
    kind: "website",
    client: "FinAspiration",
    industry: "Wealth Management",
    title: "A wealth advisory website for an AMFI-registered distributor",
    summary:
      "We built finaspiration.com for FinAspiration, a Bengaluru investment firm offering mutual funds, unlisted shares, AIFs, bonds and NCDs.",
    services: ["Web Development", "UI/UX Design"],
    challenge:
      "FinAspiration works with NRIs, HNIs, startups and family offices. The site needed to build trust quickly and route each visitor to the right service.",
    solution: [
      "Hero with a free consultation call to action and trust badges",
      "About, mission, vision and investment philosophy sections",
      "Animated achievement counters and four service cards",
      "Team profiles, contact form with service selection, and AMFI disclosures",
    ],
    results: [
      { value: "Live", label: "at finaspiration.com" },
      { value: "4", label: "investment services" },
      { value: "AMFI", label: "disclosures included" },
    ],
    stack: ["WordPress"],
    link: { href: "https://finaspiration.com/", label: "Visit website" },
    screens: ["/work/finaspiration/home.jpg"],
    tint: "#f5ebcf",
  },
  {
    slug: "mybalag-website",
    kind: "website",
    client: "MyBalag",
    industry: "E-commerce",
    title: "A multi-category online store with flash deals and wholesale buying",
    summary:
      "We built MyBalag, an online store for groceries, snacks, personal care, fashion and jewellery, including staples sourced from Tawang, Arunachal Pradesh.",
    services: ["E-commerce Development", "Web Development", "UI/UX Design"],
    challenge:
      "MyBalag sells everyday groceries alongside fashion and jewellery, to both households and shops. The store had to keep a very wide catalogue easy to browse.",
    solution: [
      "Product search and a banner carousel on the homepage",
      "25+ categories across snacks and drinks, grocery and kitchen, and beauty and personal care",
      "Flash deals with low-stock badges and one-tap Add to Cart",
      "Wholesaler section with bulk deals for shops and retailers",
      "Buying history, recently viewed items and personalised recommendations",
    ],
    results: [
      { value: "25+", label: "shopping categories" },
      { value: "Bulk", label: "wholesaler buying" },
      { value: "Live", label: "on Vercel" },
    ],
    stack: ["Vercel"],
    link: { href: "https://e-commercce-pi.vercel.app/", label: "Visit website" },
    screens: ["/work/mybalag/home.jpg"],
    tint: "#fdeed3",
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}
