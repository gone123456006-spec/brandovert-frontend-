import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.name,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#b91c1c",
    lang: "en-IN",
    categories: ["business", "productivity"],
    icons: [
      { src: "/brand/logo.png", sizes: "100x100", type: "image/png" },
      { src: "/brand/logo-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
    ],
  };
}
