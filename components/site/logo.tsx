import Link from "next/link";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

export function Logo({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  return (
    <Link
      href="/"
      aria-label={`${site.name} home`}
      className={cn("inline-flex items-center font-logo text-lg font-normal", className)}
    >
      <span
        className={cn(
          "text-[1.25em] leading-none tracking-wider uppercase",
          tone === "light" ? "text-white" : "text-ink"
        )}
      >
        brandovert
      </span>
    </Link>
  );
}
