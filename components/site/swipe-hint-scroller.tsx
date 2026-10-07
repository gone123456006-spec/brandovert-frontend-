"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const SEEN_KEY = "bv-swipe-hint-seen";
const SHOW_MS = 5000;

/**
 * A horizontal scroller that, on phones and only for first-time visitors, overlays a
 * "Swipe right for more" hint once it scrolls into view. The hint hides after a few
 * seconds or as soon as the visitor scrolls it.
 */
export function SwipeHintScroller({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || localStorage.getItem(SEEN_KEY)) return;
    if (!window.matchMedia("(max-width: 639px)").matches) return;

    let timer: ReturnType<typeof setTimeout>;
    const hide = () => {
      clearTimeout(timer);
      setShow(false);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || el.scrollWidth <= el.clientWidth) return;
        observer.disconnect();
        localStorage.setItem(SEEN_KEY, "1");
        setShow(true);
        timer = setTimeout(hide, SHOW_MS);
      },
      { threshold: 0.6 }
    );
    observer.observe(el);
    el.addEventListener("scroll", hide, { passive: true, once: true });

    return () => {
      observer.disconnect();
      clearTimeout(timer);
      el.removeEventListener("scroll", hide);
    };
  }, []);

  return (
    <div className="relative">
      <div ref={ref} className={className}>
        {children}
      </div>
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-x-0 top-20 flex justify-center transition-opacity duration-500 sm:hidden",
          show ? "opacity-100" : "opacity-0"
        )}
      >
        <span className="flex items-center gap-1.5 rounded-full bg-ink px-3.5 py-1.5 text-xs font-semibold text-white shadow-lg">
          Swipe right for more
          <ArrowRight className="size-3.5 animate-nudge text-highlight" strokeWidth={2.5} />
        </span>
      </div>
    </div>
  );
}
