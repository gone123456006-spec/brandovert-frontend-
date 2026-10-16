import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/** Allow major search + AI answer crawlers; keep Vertbook private. */
export default function robots(): MetadataRoute.Robots {
  const disallow = ["/vertbook", "/vertbook/"];

  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      // Answer engines (AEO) — explicitly welcome so ChatGPT, Claude, Perplexity can cite us.
      { userAgent: "GPTBot", allow: "/", disallow },
      { userAgent: "ChatGPT-User", allow: "/", disallow },
      { userAgent: "Google-Extended", allow: "/", disallow },
      { userAgent: "Anthropic-AI", allow: "/", disallow },
      { userAgent: "ClaudeBot", allow: "/", disallow },
      { userAgent: "PerplexityBot", allow: "/", disallow },
      { userAgent: "Applebot-Extended", allow: "/", disallow },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
