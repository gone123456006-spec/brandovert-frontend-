import type { Metadata } from "next";
import { CtaLink } from "@/components/site/cta";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="container-page flex flex-col items-center py-32 text-center">
      <p className="text-sm font-semibold tracking-wider text-brand uppercase">404</p>
      <h1 className="mt-3 text-4xl font-bold text-ink">Page not found</h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <div className="mt-8 flex gap-3">
        <CtaLink href="/">Back to home</CtaLink>
        <CtaLink href="/contact" variant="outline">
          Contact us
        </CtaLink>
      </div>
    </section>
  );
}
