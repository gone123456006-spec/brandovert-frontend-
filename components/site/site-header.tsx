"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { mainNav, site } from "@/lib/site";
import { services } from "@/lib/content/services";
import { Logo } from "./logo";
import { CtaLink } from "./cta";
import { ServicesMenuPanel, serviceMenuIcon } from "./services-menu";

const CLOSE_DELAY_MS = 150;

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  const openMenu = () => {
    clearTimeout(closeTimer.current);
    setMenuOpen(true);
  };
  const closeMenuSoon = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMenuOpen(false), CLOSE_DELAY_MS);
  };
  const closeMenu = () => {
    clearTimeout(closeTimer.current);
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-white/90 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-6 lg:h-[72px]">
        <Logo />

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {mainNav.map((item) =>
            item.href === "/services" ? (
              <div
                key={item.href}
                className="flex items-center"
                onMouseEnter={openMenu}
                onMouseLeave={closeMenuSoon}
              >
                <Link
                  href={item.href}
                  onClick={closeMenu}
                  aria-current={isActive(pathname, item.href) ? "page" : undefined}
                  className={cn(
                    "rounded-lg py-2 pl-3 text-[0.95rem] font-medium text-ink/75 transition-colors hover:text-ink",
                    (menuOpen || isActive(pathname, item.href)) && "text-brand hover:text-brand"
                  )}
                >
                  {item.label}
                </Link>
                <button
                  ref={menuButton}
                  type="button"
                  aria-label="Show services menu"
                  aria-expanded={menuOpen}
                  aria-controls="services-menu"
                  onClick={() => (menuOpen ? closeMenu() : openMenu())}
                  className={cn(
                    "grid size-8 place-items-center rounded-lg text-ink/75 hover:text-ink",
                    (menuOpen || isActive(pathname, item.href)) && "text-brand hover:text-brand"
                  )}
                >
                  <ChevronDown
                    className={cn("size-4 transition-transform", menuOpen && "rotate-180")}
                  />
                </button>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(pathname, item.href) ? "page" : undefined}
                className={cn(
                  "rounded-lg px-3 py-2 text-[0.95rem] font-medium text-ink/75 transition-colors hover:text-ink",
                  isActive(pathname, item.href) && "text-brand hover:text-brand"
                )}
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={site.contact.phoneHref}
            className="inline-flex items-center gap-2 text-sm font-semibold text-ink hover:text-brand"
          >
            <Phone className="size-4" />
            {site.contact.phoneDisplay}
          </a>
          <CtaLink href="/contact" size="md">
            Get a free quote
          </CtaLink>
        </div>

        <button
          type="button"
          className="grid size-10 place-items-center rounded-lg text-ink hover:bg-surface lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <div
        id="services-menu"
        onMouseEnter={openMenu}
        onMouseLeave={closeMenuSoon}
        className={cn(
          "absolute inset-x-0 top-full hidden transition duration-200 lg:block",
          menuOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-2 opacity-0 pointer-events-none"
        )}
      >
        <ServicesMenuPanel onNavigate={closeMenu} />
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="fixed inset-x-0 top-16 bottom-0 overflow-y-auto border-t border-border bg-white lg:hidden"
        >
          <div className="container-page flex flex-col gap-1 py-6">
            {[...mainNav, { href: "/contact", label: "Contact Us" }].map((item) => (
              <div key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(pathname, item.href) ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block rounded-lg px-3 py-3 text-lg font-medium text-ink hover:bg-surface",
                    isActive(pathname, item.href) && "bg-surface text-brand"
                  )}
                >
                  {item.label}
                </Link>
                {item.href === "/services" && (
                  <ul className="mb-2 ml-3 grid grid-cols-1 gap-0.5 border-l border-border pl-3 sm:grid-cols-2">
                    {services.map((s) => {
                      return (
                        <li key={s.slug}>
                          <Link
                            href={`/services/${s.slug}`}
                            onClick={() => setOpen(false)}
                            className="flex items-center gap-2.5 rounded-lg px-2 py-2 text-[0.95rem] text-ink/80 hover:bg-surface hover:text-brand"
                          >
                            <Image
                              src={serviceMenuIcon(s.slug)}
                              alt=""
                              width={128}
                              height={128}
                              className="size-7 shrink-0 object-contain"
                            />
                            {s.title}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            ))}
            <CtaLink href="/contact" className="mt-4" onClick={() => setOpen(false)}>
              Get a free quote
            </CtaLink>
          </div>
        </nav>
      )}
    </header>
  );
}
