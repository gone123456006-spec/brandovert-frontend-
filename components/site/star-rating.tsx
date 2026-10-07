"use client";

import { useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

const STAGGER_MS = 110;

/** Five stars that pop in one after another the first time they scroll into view. */
export function StarRating({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShown(true);
        observer.disconnect();
      },
      { threshold: 0.9 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} role="img" aria-label="Rated 5 out of 5" className={cn("flex gap-0.5", className)}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          aria-hidden
          style={{ animationDelay: `${i * STAGGER_MS}ms` }}
          className={cn(
            "size-4 fill-current",
            shown ? "motion-safe:animate-star-pop" : "motion-safe:scale-0 motion-safe:opacity-0"
          )}
        />
      ))}
    </div>
  );
}
