"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronRight, X } from "lucide-react";
import { QuoteButton } from "./service-enquiry";

const DELAY_MS = 6000;
const SEEN_KEY = "bv-popup-seen";
const VISITED_KEY = "bv-visited";

function starburst(points: number, outer: number, inner: number) {
  return Array.from({ length: points * 2 }, (_, i) => {
    const r = i % 2 === 0 ? outer : inner;
    const a = (Math.PI * i) / points - Math.PI / 2;
    return `${(50 + r * Math.cos(a)).toFixed(2)},${(50 + r * Math.sin(a)).toFixed(2)}`;
  }).join(" ");
}

const BURST = starburst(14, 50, 38);

export function WelcomePopup() {
  const ref = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();
  const [returning, setReturning] = useState(false);

  useEffect(() => {
    if (pathname.startsWith("/contact")) return;
    if (sessionStorage.getItem(SEEN_KEY)) return;

    const timer = setTimeout(() => {
      setReturning(localStorage.getItem(VISITED_KEY) === "1");
      localStorage.setItem(VISITED_KEY, "1");
      sessionStorage.setItem(SEEN_KEY, "1");
      ref.current?.showModal();
    }, DELAY_MS);

    return () => clearTimeout(timer);
  }, [pathname]);

  const close = () => ref.current?.close();

  return (
    <dialog
      ref={ref}
      aria-labelledby="welcome-popup-title"
      onClick={(e) => e.target === e.currentTarget && close()}
      className="m-auto w-[calc(100%-2rem)] max-w-4xl overflow-hidden rounded-3xl bg-brand p-0 text-white opacity-100 transition-all duration-300 backdrop:bg-black/60 starting:open:scale-95 starting:open:opacity-0"
    >
      <div className="relative grid items-center gap-6 px-7 py-10 sm:px-12 md:grid-cols-[0.8fr_1.2fr] md:gap-10 md:py-14">
        <svg aria-hidden="true" viewBox="0 0 100 100" className="absolute -top-24 -left-24 size-72 fill-brand-strong">
          <polygon points={BURST} />
        </svg>
        <svg aria-hidden="true" viewBox="0 0 100 100" className="absolute -right-20 -bottom-28 size-80 fill-brand-strong">
          <polygon points={BURST} />
        </svg>

        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute top-4 right-4 z-10 grid size-10 place-items-center rounded-full text-white transition-colors hover:bg-white/15 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
        >
          <X className="size-6" strokeWidth={3} />
        </button>

        <Image
          src="/illustrations/popup/plane.png"
          alt=""
          width={520}
          height={454}
          sizes="(min-width: 768px) 300px, 180px"
          className="relative mx-auto w-44 md:w-full md:max-w-[18rem]"
        />

        <div className="relative text-center md:text-left">
          <h2 id="welcome-popup-title" className="text-3xl leading-tight font-extrabold sm:text-4xl">
            {returning ? "Ready to get started?" : "Ready to build something great?"}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-white/90">
            {returning
              ? "It's great to see you back! Tell us what you're building and get a written scope and a fixed quote within 5 working days."
              : "Book a free consultation with our team. You'll get a written scope and a fixed quote within 5 working days, with no obligation."}
          </p>
          <QuoteButton onClick={close} variant="dark" className="mt-7">
            Get a free quote
            <ChevronRight />
          </QuoteButton>
        </div>
      </div>
    </dialog>
  );
}
