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

  const pause = () => (pausedRef.current = true);
  const resume = () => (pausedRef.current = false);

  return (
    <div
      className="flex items-center gap-2 sm:gap-4"
      onMouseEnter={pause}
      onMouseLeave={resume}
      onFocus={pause}
      onBlur={resume}
      onTouchStart={pause}
    >
      <CarouselButton label="Previous" disabled={!canPrev} onClick={() => step(-1)}>
        <ChevronLeft className="size-9" strokeWidth={2.5} />
      </CarouselButton>
      <ul
        ref={trackRef}
        aria-label={label}
        onScroll={updateEdges}
        className="flex min-w-0 flex-1 snap-x snap-mandatory gap-5 overflow-x-auto pt-2 pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </ul>
      <CarouselButton label="Next" disabled={!canNext} onClick={() => step(1)}>
        <ChevronRight className="size-9" strokeWidth={2.5} />
      </CarouselButton>
    </div>
  );
}

/** One slide: 1 per view on phones, 2 on tablets, 3 on desktop (widths account for the 1.25rem gap). */
export function CarouselItem({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <li
      className={cn(
        "w-full shrink-0 snap-start sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-2.5rem)/3)]",
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
  children,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="hidden size-11 shrink-0 place-items-center rounded-full text-ink transition-colors outline-none hover:text-brand focus-visible:ring-3 focus-visible:ring-brand/40 disabled:pointer-events-none disabled:opacity-20 sm:grid"
    >
      {children}
    </button>
  );
}
