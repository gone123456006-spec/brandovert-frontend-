export const site = {
  name: "Brandovert",
  legalName: "Brandovert Technologies Pvt. Ltd.",
  tagline: "Software, growth and support under one roof.",
  description:
    "Brandovert is a Patna technology partner for growing businesses. We design, build, market and maintain web apps, mobile apps, SaaS products and custom software across India and beyond.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.NODE_ENV === "production" ? "https://brandovert.com" : "http://localhost:3000"),
  locale: "en_IN",
  keywords: [
    "web development company Patna",
    "app development company Bihar",
    "SaaS development India",
    "custom software development",
    "UI UX design agency",
    "digital marketing company Boring Road Patna",
    "SEO services Patna",
    "Brandovert",
  ],
  /** Approximate office coordinates — Verma Centre, Boring Road, Patna. */
  geo: {
    latitude: 25.617,
    longitude: 85.1376,
  },
  contact: {
    phoneDisplay: "+91 98750 73267",
    phoneHref: "tel:+919875073267",
    whatsappNumber: "919875073267",
    whatsappMessage: "Hi Brandovert, I'd like to discuss a project.",
    email: "brandovertofc@gmail.com",
    hours: "Mon to Sat, 10:00 AM to 7:00 PM IST",
    address: {
      line1: "Verma Centre",
      line2: "Boring Road",
      city: "Patna",
      region: "Bihar",
      postalCode: "800001",
      country: "India",
    },
    mapQuery: "Verma Centre, Boring Road, Patna, Bihar, India",
  },
  social: {
    linkedin: "https://www.linkedin.com/company/brandovert",
    instagram: "https://www.instagram.com/brandovert",
  },
} as const;

export function whatsappHref(message: string = site.contact.whatsappMessage) {
  return `https://wa.me/${site.contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function formattedAddress() {
  const a = site.contact.address;
  return `${a.line1}, ${a.line2}, ${a.city}, ${a.region} ${a.postalCode}, ${a.country}`;
}

export const mainNav = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/work", label: "Case Studies" },
  { href: "/about", label: "About Us" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact Us" },
] as const;
