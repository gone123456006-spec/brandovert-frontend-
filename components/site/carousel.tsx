"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const AUTO_SLIDE_MS = 4000;

export function Carousel({ label, children }: { label: string; children: React.ReactNode }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const pausedRef = useRef(false);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateEdges = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  const step = useCallback((direction: 1 | -1) => {
    const el = trackRef.current;
    const item = el?.firstElementChild as HTMLElement | null;
    if (!el || !item) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    el.scrollBy({ left: direction * (item.offsetWidth + gap), behavior: "smooth" });
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateEdges();
    const observer = new ResizeObserver(updateEdges);
    observer.observe(el);
    return () => observer.disconnect();
  }, [updateEdges]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = setInterval(() => {
      const el = trackRef.current;
      if (!el || pausedRef.current || document.hidden) return;
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
      if (atEnd) el.scrollTo({ left: 0, behavior: "smooth" });
      else step(1);
    }, AUTO_SLIDE_MS);

    return () => clearInterval(timer);
  }, [step]);

  const resumeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(resumeTimer.current), []);

  const pause = () => {
    clearTimeout(resumeTimer.current);
    pausedRef.current = true;
  };
  const resume = () => (pausedRef.current = false);
  // Touch has no "leave" event, so pick auto-sliding back up shortly after the finger lifts.
  const resumeSoon = () => {
    clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(resume, AUTO_SLIDE_MS);
  };

  return (
    <div
      className="relative flex items-center gap-2 sm:gap-4"
      onMouseEnter={pause}
      onMouseLeave={resume}
      // Only keyboard focus pauses; a clicked arrow keeps focus and would otherwise stop the slider.
      onFocus={(e) => e.target.matches(":focus-visible") && pause()}
      onBlur={resume}
      onTouchStart={pause}
      onTouchEnd={resumeSoon}
      onTouchCancel={resumeSoon}
    >
      <CarouselButton label="Previous" disabled={!canPrev} onClick={() => step(-1)} className="left-1">
        <ChevronLeft className="size-5 sm:size-7" strokeWidth={2.5} />
      </CarouselButton>
      <ul
        ref={trackRef}
        aria-label={label}
        onScroll={updateEdges}
        className="flex min-w-0 flex-1 snap-x snap-mandatory gap-5 overflow-x-auto pt-2 pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </ul>
      <CarouselButton label="Next" disabled={!canNext} onClick={() => step(1)} className="right-1">
        <ChevronRight className="size-5 sm:size-7" strokeWidth={2.5} />
      </CarouselButton>
    </div>
  );
}

/** One slide: a centred card with the next one peeking on phones, 2 on tablets, 3 on desktop (widths account for the 1.25rem gap). */
export function CarouselItem({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <li
      className={cn(
        "w-[82%] shrink-0 snap-center sm:w-[calc((100%-1.25rem)/2)] sm:snap-start lg:w-[calc((100%-2.5rem)/3)]",
        className
      )}
    >
      {children}
    </li>
  );
}

function CarouselButton({
  label,
  disabled,
  onClick,
  className,
  children,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        // Phones: floats over the card edge so the slide keeps its full width.
        "absolute top-1/2 z-10 grid size-8 shrink-0 -translate-y-1/2 place-items-center rounded-full bg-white text-ink shadow-[0_4px_14px_-4px_rgb(0_0_0/0.35)] transition outline-none hover:text-brand focus-visible:ring-3 focus-visible:ring-brand/40 disabled:pointer-events-none disabled:opacity-0",
        "sm:static sm:size-9 sm:translate-y-0 sm:bg-transparent sm:shadow-none sm:disabled:opacity-20",
        className
      )}
    >
      {children}
    </button>
  );
}
