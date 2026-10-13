"use client";

import { usePathname } from "next/navigation";

/** Hides public-site chrome (header, footer, popups) inside the Vertbook dashboard. */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return pathname.startsWith("/vertbook") ? null : children;
}
