import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { services, serviceIllustration } from "@/lib/content/services";
import { caseStudies } from "@/lib/content/case-studies";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: {
    path: string;
    priority: number;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  }[] = [
    { path: "", priority: 1, changeFrequency: "weekly" },
    { path: "/services", priority: 0.9, changeFrequency: "weekly" },
    { path: "/work", priority: 0.9, changeFrequency: "weekly" },
    { path: "/about", priority: 0.7, changeFrequency: "monthly" },
    { path: "/faq", priority: 0.8, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.9, changeFrequency: "monthly" },
  ];

  return [
    ...staticRoutes.map(({ path, priority, changeFrequency }) => ({
      url: `${site.url}${path}`,
      lastModified: now,
      changeFrequency,
      priority,
    })),
    ...services.map((s) => ({
      url: `${site.url}/services/${s.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.85,
      images: [`${site.url}${serviceIllustration(s.slug)}`],
    })),
    ...caseStudies.map((c) => ({
      url: `${site.url}/work/${c.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.75,
      images: c.screens.slice(0, 3).map((src) => `${site.url}${src}`),
    })),
  ];
}
