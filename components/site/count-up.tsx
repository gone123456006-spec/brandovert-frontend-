"use client";

import { useEffect, useRef, useState } from "react";
import { listenForAudioUnlock, playDone, playTick } from "./tick-sound";

const DURATION_MS = 1600;

// Mounted site-wide so a tap on any page unlocks audio for the counters.
export function AudioUnlock() {
  useEffect(listenForAudioUnlock, []);
  return null;
}

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

    listenForAudioUnlock();
    let frame = 0;
    let armed = true;
    // Replays each time the numbers come back after fully leaving the screen,
    // so a visitor who tapped the page after the first run (unlocking audio) hears it.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          cancelAnimationFrame(frame);
          setCurrent(0);
          armed = true;
          return;
        }
        if (!armed || entry.intersectionRatio < 0.4) return;
        armed = false;

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          setCurrent(target);
          return;
        }

        const start = performance.now();
        let shown = 0;
        const tick = (now: number) => {
          const t = Math.min((now - start) / DURATION_MS, 1);
          const eased = 1 - Math.pow(1 - t, 3);
          const next = Math.round(eased * target);
          if (next !== shown) {
            shown = next;
            setCurrent(next);
            playTick();
          }
          if (t < 1) frame = requestAnimationFrame(tick);
          else playDone();
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: [0, 0.4] }
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
