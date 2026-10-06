import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const ctaVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-xl font-semibold whitespace-nowrap transition-colors outline-none focus-visible:ring-3 focus-visible:ring-brand/40 disabled:pointer-events-none disabled:opacity-60 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-brand text-white hover:bg-brand-strong",
        light: "bg-white text-ink hover:bg-surface",
        dark: "bg-ink text-white hover:bg-ink-soft focus-visible:ring-white/50",
        outline: "border border-ink/15 bg-white text-ink hover:border-ink/30 hover:bg-surface",
        ghostDark: "border border-white/25 text-white hover:bg-white/10",
      },
      size: {
        md: "h-10 px-4 text-sm",
        lg: "h-12 px-6 text-[0.95rem]",
      },
    },
    defaultVariants: { variant: "primary", size: "lg" },
  }
);

type CtaLinkProps = React.ComponentProps<typeof Link> & VariantProps<typeof ctaVariants>;

export function CtaLink({ className, variant, size, ...props }: CtaLinkProps) {
  return <Link className={cn(ctaVariants({ variant, size }), className)} {...props} />;
}

type CtaAnchorProps = React.ComponentProps<"a"> & VariantProps<typeof ctaVariants>;

export function CtaAnchor({ className, variant, size, ...props }: CtaAnchorProps) {
  return <a className={cn(ctaVariants({ variant, size }), className)} {...props} />;
}
