import { QuoteButton } from "./service-enquiry";

export function AnnouncementBar() {
  return (
    // Fixed height: the sticky header is offset by exactly this (top-10 sm:top-11).
    <div className="sticky top-0 z-40 bg-ink text-white">
      <p className="container-page flex h-10 items-center justify-center gap-2 text-center text-sm whitespace-nowrap sm:h-11 sm:text-base">
        <span className="hidden md:inline">Grow your business with Brandovert</span>
        <span aria-hidden className="hidden text-white/40 md:inline">
          |
        </span>
        <span className="sm:hidden">Free consultation</span>
        <span className="hidden sm:inline">Free consultation &amp; fixed quote</span>
        <span aria-hidden className="text-white/40">
          |
        </span>
        <QuoteButton
          plain
          className="cursor-pointer font-bold whitespace-nowrap underline decoration-highlight decoration-2 underline-offset-4 hover:text-highlight"
        >
          Get a Free Quote
        </QuoteButton>
      </p>
    </div>
  );
}
