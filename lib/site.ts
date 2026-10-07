export const site = {
  name: "Brandovert",
  legalName: "Brandovert Technologies Pvt. Ltd.",
  tagline: "Software, growth and support under one roof.",
  description:
    "Brandovert is a technology partner for growing businesses. We design, build, market and maintain web apps, mobile apps, SaaS products and custom software.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  contact: {
    phoneDisplay: "+91 98750 73267",
    phoneHref: "tel:+919875073267",
    whatsappNumber: "919875073267",
    whatsappMessage: "Hi Brandovert, I'd like to discuss a project.",
    email: "brandoverts@gmail.com",
    hours: "Mon to Sat, 10:00 AM to 7:00 PM IST",
    address: {
      line1: "3rd Floor, 20, 100 Feet Road",
      line2: "Koramangala",
      city: "Bengaluru",
      region: "Karnataka",
      postalCode: "560034",
      country: "India",
    },
    mapQuery: "Koramangala, Bengaluru, Karnataka 560034",
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
