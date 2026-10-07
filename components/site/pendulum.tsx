"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const MAX_ANGLE_DEG = 7;
/** Pixels of scrolling per radian of swing; smaller swings faster. */
const SCROLL_PER_RADIAN = 110;

/** Swings its content left and right from the top centre as the page scrolls. */
export function Pendulum({
  index = 0,
  className,
  children,
}: {
  index?: number;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      // Swing dies down as the card reaches the middle of the screen, so it settles where it's read.
      const fromCentre = (rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight;
      const damping = Math.min(1, Math.abs(fromCentre) * 1.6 + 0.25);
      // Wide cards swing less, so their outer edges move about as far as a narrow card's do.
      const maxAngle = Math.min(MAX_ANGLE_DEG, 1800 / rect.width);
      const angle = maxAngle * damping * Math.sin(window.scrollY / SCROLL_PER_RADIAN + index * 1.3);
      el.style.transform = `rotate(${angle.toFixed(2)}deg)`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [index]);

  return (
    <div
      ref={ref}
      className={cn(
        "origin-[50%_-0.5rem] transition-transform duration-500 ease-out will-change-transform",
        className
      )}
    >
      {children}
    </div>
  );
}
