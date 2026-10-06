import { cn } from "@/lib/utils";

type Tone = "white" | "surface" | "ink";

type SectionProps = React.ComponentProps<"section"> & {
  tone?: Tone;
  /** Draws the previous section's background as an arc over this section's top edge. */
  curveFrom?: Tone;
};

const curveFill: Record<Tone, string> = {
  white: "fill-white",
  surface: "fill-surface",
  ink: "fill-ink",
};

export function Section({ tone = "white", curveFrom, className, children, ...props }: SectionProps) {
  return (
    <section
      className={cn(
        "relative py-20 sm:py-24",
        tone === "surface" && "bg-surface",
        tone === "ink" && "bg-ink text-white",
        curveFrom && "pt-28 sm:pt-36",
        className
      )}
      {...props}
    >
      {curveFrom && (
        <svg
          aria-hidden="true"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          className={cn("absolute inset-x-0 top-0 h-10 w-full sm:h-16 lg:h-20", curveFill[curveFrom])}
        >
          <path d="M0 0H1440Q720 200 0 0Z" />
        </svg>
      )}
      <div className="relative container-page">{children}</div>
    </section>
  );
}

type SectionHeadingProps = {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  wide?: boolean;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "dark",
  wide = false,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        wide ? "max-w-5xl" : "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "mb-3 text-sm font-semibold tracking-wider uppercase",
            tone === "light" ? "text-highlight" : "text-brand"
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "text-3xl leading-tight font-bold sm:text-4xl lg:text-[2.75rem]",
          tone === "light" ? "text-white" : "text-ink"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-lg leading-relaxed",
            tone === "light" ? "text-white/75" : "text-muted-foreground"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}

/** Wraps a word or phrase in the brand underline used across headings. */
export function Highlight({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative whitespace-nowrap text-brand">
      {children}
      <svg
        aria-hidden="true"
        viewBox="0 0 200 12"
        preserveAspectRatio="none"
        className="absolute -bottom-1.5 left-0 h-2.5 w-full text-ink"
      >
        <path d="M2 9c40-6 120-8 196-3" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
      </svg>
    </span>
  );
}
