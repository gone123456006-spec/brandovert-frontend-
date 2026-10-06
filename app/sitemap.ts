import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { services } from "@/lib/content/services";
import { caseStudies } from "@/lib/content/case-studies";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/services", "/work", "/about", "/faq", "/contact"];
  return [
    ...staticRoutes.map((path) => ({ url: `${site.url}${path}` })),
    ...services.map((s) => ({ url: `${site.url}/services/${s.slug}` })),
    ...caseStudies.map((c) => ({ url: `${site.url}/work/${c.slug}` })),
  ];
}
