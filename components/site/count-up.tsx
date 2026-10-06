"use client";

import { useEffect, useRef, useState } from "react";

const DURATION_MS = 1600;

export function CountUp({
  value,
  className,
  suffixClassName,
}: {
  value: string;
  className?: string;
  suffixClassName?: string;
}) {
  const match = value.match(/^(\d+)(.*)$/);
  const isNumeric = match !== null;
  const target = match ? Number(match[1]) : 0;
  const suffix = match ? match[2] : "";

  const ref = useRef<HTMLSpanElement>(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el || !isNumeric) return;

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          setCurrent(target);
          return;
        }

        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / DURATION_MS, 1);
          const eased = 1 - Math.pow(1 - t, 3);
          setCurrent(Math.round(eased * target));
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [isNumeric, target]);

  if (!isNumeric) return <span className={className}>{value}</span>;

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{value}</span>
      <span aria-hidden="true" className="tabular-nums">
        {current}
        <span className={suffixClassName}>{suffix}</span>
      </span>
    </span>
  );
}
