import Link from "next/link";
import { ChevronRight } from "lucide-react";

type Crumb = { name: string; path?: string };

/** Visible trail for users + crawlers. Pair with `breadcrumbJsonLd` in the page. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="container-page pt-4 sm:pt-6">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={`${item.name}-${i}`} className="inline-flex items-center gap-1">
              {i > 0 && <ChevronRight className="size-3.5 shrink-0 opacity-50" aria-hidden />}
              {last || !item.path ? (
                <span className={last ? "font-medium text-ink" : undefined} aria-current={last ? "page" : undefined}>
                  {item.name}
                </span>
              ) : (
                <Link href={item.path} className="hover:text-ink hover:underline">
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
