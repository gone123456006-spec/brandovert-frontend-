import Image from "next/image";
import { cn } from "@/lib/utils";
import type { CaseStudy } from "@/lib/content/case-studies";

/** Screenshots of a project on its own brand colour: fanned phones for apps, a browser window for websites. */
export function ProjectVisual({
  study,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  className,
}: {
  study: CaseStudy;
  sizes?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative aspect-[3/2] overflow-hidden",
        study.kind === "app" ? "px-[8%] pt-[7%]" : "flex items-center px-[7%]",
        className
      )}
      style={{ backgroundColor: study.tint }}
    >
      {study.kind === "app" ? (
        <div className="flex h-full items-start justify-center gap-[4%]">
          {study.screens.slice(0, 3).map((src, i) => (
            <Image
              key={src}
              src={src}
              alt={`${study.client} app screen ${i + 1}`}
              width={720}
              height={1280}
              sizes={sizes}
              className={cn(
                "w-[30%] rounded-[0.6rem] shadow-[0_12px_30px_-10px_rgb(0_0_0/0.45)] transition-transform duration-500",
                i === 1 ? "group-hover:-translate-y-1.5" : "mt-[6%] group-hover:-translate-y-0.5"
              )}
            />
          ))}
        </div>
      ) : (
        <div className="w-full overflow-hidden rounded-lg bg-white shadow-[0_12px_30px_-10px_rgb(0_0_0/0.35)] transition-transform duration-500 group-hover:-translate-y-1">
          <div aria-hidden className="flex h-4 items-center gap-1 border-b border-border px-2">
            <span className="size-1.5 rounded-full bg-[#ff5f57]" />
            <span className="size-1.5 rounded-full bg-[#febc2e]" />
            <span className="size-1.5 rounded-full bg-[#28c840]" />
          </div>
          <Image
            src={study.screens[0]}
            alt={`${study.client} website homepage`}
            width={1440}
            height={770}
            sizes={sizes}
            className="w-full"
          />
        </div>
      )}
    </div>
  );
}
