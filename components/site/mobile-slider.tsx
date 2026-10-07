"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const AUTO_SLIDE_MS = 4500;
const MOBILE_QUERY = "(max-width: 639px)";

/**
 * On phones, a swipeable row that auto-advances one card at a time; on larger screens it
 * renders `className` as-is (e.g. a grid). Children should carry their own phone width
 * and `snap-center`.
 */
export function MobileSlider({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const mobile = window.matchMedia(MOBILE_QUERY);

    let paused = false;
    let resumeTimer: ReturnType<typeof setTimeout>;
    const pause = () => {
      clearTimeout(resumeTimer);
      paused = true;
    };
    // Touch has no "leave" event, so pick auto-sliding back up a while after the finger lifts.
    const resumeSoon = () => {
      clearTimeout(resumeTimer);
      resumeTimer = setTimeout(() => (paused = false), AUTO_SLIDE_MS);
    };

    const timer = setInterval(() => {
      if (!mobile.matches || paused || document.hidden) return;
      const item = el.firstElementChild as HTMLElement | null;
      if (!item) return;
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
      if (atEnd) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
        el.scrollBy({ left: item.offsetWidth + gap, behavior: "smooth" });
      }
    }, AUTO_SLIDE_MS);

    el.addEventListener("touchstart", pause, { passive: true });
    el.addEventListener("touchend", resumeSoon);
    el.addEventListener("touchcancel", resumeSoon);
    return () => {
      clearInterval(timer);
      clearTimeout(resumeTimer);
      el.removeEventListener("touchstart", pause);
      el.removeEventListener("touchend", resumeSoon);
      el.removeEventListener("touchcancel", resumeSoon);
    };
  }, []);

  return (
    <div
      ref={ref}
      role="region"
      aria-label={label}
      className={cn(
        "flex snap-x snap-mandatory gap-4 overflow-x-auto pt-1 pb-4 [scrollbar-width:none] sm:overflow-visible sm:p-0 [&::-webkit-scrollbar]:hidden",
        className
      )}
    >
      {children}
    </div>
  );
}
