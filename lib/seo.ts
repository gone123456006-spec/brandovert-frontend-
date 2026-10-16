import type { Metadata } from "next";
import { site, formattedAddress } from "@/lib/site";
import { services } from "@/lib/content/services";

const defaultTitle = `${site.name} | Web, App, SaaS & Digital Marketing Company in Patna`;
const defaultOgImage = {
  url: "/brand/og.png",
  width: 1200,
  height: 630,
  alt: `${site.name} — ${site.tagline}`,
};

export function absoluteUrl(path = "/") {
  const clean = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  return `${site.url}${clean}`;
}

type PageSeoInput = {
  title: string;
  description: string;
  path: string;
  /** Absolute title — skip the "| Brandovert" template. */
  absoluteTitle?: boolean;
  image?: string;
  type?: "website" | "article";
  noIndex?: boolean;
};

/** Consistent titles, descriptions, canonicals and social cards for every page. */
export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle,
  image,
  type = "website",
  noIndex,
}: PageSeoInput): Metadata {
  const url = absoluteUrl(path);
  const ogImage = image
    ? [{ url: image, width: 1200, height: 630, alt: title }]
    : [defaultOgImage];
  const fullTitle = absoluteTitle ? title : undefined;

  return {
    title: fullTitle ? { absolute: fullTitle } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type,
      url,
      siteName: site.name,
      locale: site.locale,
      title: fullTitle ?? `${title} | ${site.name}`,
      description,
      images: ogImage,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle ?? `${title} | ${site.name}`,
      description,
      images: ogImage.map((i) => (typeof i.url === "string" ? i.url : String(i.url))),
    },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService", "LocalBusiness"],
    "@id": `${site.url}/#organization`,
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    logo: absoluteUrl("/brand/logo-512.png"),
    image: absoluteUrl("/brand/og.png"),
    description: site.description,
    email: site.contact.email,
    telephone: site.contact.phoneDisplay,
    foundingDate: "2018",
    slogan: site.tagline,
    sameAs: Object.values(site.social),
    areaServed: [
      { "@type": "Country", name: "India" },
      { "@type": "City", name: "Patna" },
      { "@type": "State", name: "Bihar" },
      { "@type": "Country", name: "United Arab Emirates" },
      { "@type": "Country", name: "United Kingdom" },
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: `${site.contact.address.line1}, ${site.contact.address.line2}`,
      addressLocality: site.contact.address.city,
      addressRegion: site.contact.address.region,
      postalCode: site.contact.address.postalCode,
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.latitude,
      longitude: site.geo.longitude,
    },
    hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(formattedAddress())}`,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "10:00",
        closes: "19:00",
      },
    ],
    priceRange: "$$",
    currenciesAccepted: "INR, USD, AED, GBP",
    paymentAccepted: "Bank Transfer, UPI, Card",
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: site.contact.phoneDisplay,
        contactType: "sales",
        areaServed: "IN",
        availableLanguage: ["English", "Hindi"],
      },
    ],
    knowsAbout: services.map((s) => s.title),
    makesOffer: services.map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: s.title,
        description: s.summary,
        url: absoluteUrl(`/services/${s.slug}`),
        provider: { "@id": `${site.url}/#organization` },
        areaServed: "IN",
      },
    })),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    description: site.description,
    publisher: { "@id": `${site.url}/#organization` },
    inLanguage: "en-IN",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${site.url}/services?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function serviceJsonLd(service: {
  title: string;
  summary: string;
  description: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    url: absoluteUrl(`/services/${service.slug}`),
    provider: { "@id": `${site.url}/#organization` },
    areaServed: [
      { "@type": "Country", name: "India" },
      { "@type": "City", name: "Patna" },
      { "@type": "State", name: "Bihar" },
    ],
    serviceType: service.title,
    category: "Information Technology",
  };
}

export function faqPageJsonLd(faqs: { question: string; answer: string; points?: string[] }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: [f.answer, ...(f.points ?? [])].join(" "),
      },
    })),
  };
}

export function caseStudyJsonLd(study: {
  client: string;
  title: string;
  summary: string;
  slug: string;
  industry: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: study.title,
    description: study.summary,
    about: study.client,
    articleSection: study.industry,
    url: absoluteUrl(`/work/${study.slug}`),
    image: study.image ? absoluteUrl(study.image) : absoluteUrl("/brand/og.png"),
    author: { "@id": `${site.url}/#organization` },
    publisher: { "@id": `${site.url}/#organization` },
    mainEntityOfPage: absoluteUrl(`/work/${study.slug}`),
  };
}

export function howToJsonLd(steps: { title: string; body: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to start a project with ${site.name}`,
    description: "From first call to launch with a fixed scope and fixed price.",
    totalTime: "P5D",
    step: steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.title,
      text: s.body,
    })),
  };
}

export function itemListJsonLd(
  name: string,
  items: { name: string; path: string; description?: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    numberOfItems: items.length,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: absoluteUrl(item.path),
      ...(item.description ? { description: item.description } : {}),
    })),
  };
}

export function personJsonLd(people: { name: string; role: string; quote?: string }[]) {
  return people.map((p) => ({
    "@context": "https://schema.org",
    "@type": "Person",
    name: p.name,
    jobTitle: p.role,
    worksFor: { "@id": `${site.url}/#organization` },
    ...(p.quote ? { description: p.quote } : {}),
  }));
}

export { defaultTitle };
