import Link from "next/link";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

export function Logo({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  return (
    <Link
      href="/"
      aria-label={`${site.name} home`}
      className={cn("inline-flex items-center gap-2 text-lg font-bold", className)}
    >
      <span className="grid size-[1.8em] place-items-center rounded-lg bg-brand text-[0.78em] font-extrabold text-white">
        B
      </span>
      <span className={tone === "light" ? "text-white" : "text-ink"}>
        brand<span className="text-brand">overt</span>
      </span>
    </Link>
  );
}
