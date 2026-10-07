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
import { QuoteButton } from "./service-enquiry";
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
  const [servicesOpen, setServicesOpen] = useState(false);
  const drawerButton = useRef<HTMLButtonElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);

  const closeDrawer = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        drawerButton.current?.focus();
      }
    };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onResize = () => desktop.matches && setOpen(false);
    document.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onResize);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onResize);
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
    <>
    <header className="sticky top-10 z-40 sm:top-11 border-b border-border/70 bg-white/90 backdrop-blur">
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
                    "rounded-lg py-2 pl-2.5 text-[0.95rem] font-medium whitespace-nowrap text-ink/75 xl:pl-3 transition-colors hover:text-ink",
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
                  "rounded-lg px-2.5 py-2 text-[0.95rem] font-medium whitespace-nowrap text-ink/75 transition-colors hover:text-ink xl:px-3",
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
            className="hidden items-center gap-2 text-sm font-semibold whitespace-nowrap text-ink hover:text-brand xl:inline-flex"
          >
            <Phone className="size-4" />
            {site.contact.phoneDisplay}
          </a>
          <QuoteButton size="md" className="whitespace-nowrap">Get a free quote</QuoteButton>
        </div>

        <button
          ref={drawerButton}
          type="button"
          className="grid size-10 place-items-center rounded-lg text-ink hover:bg-surface lg:hidden"
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen(true)}
        >
          <Menu className="size-6" />
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

    </header>

    {/* Kept outside <header>: its backdrop-blur would make the fixed drawer size to the header. */}
    <div
      className={cn(
        "fixed inset-0 z-50 overflow-hidden lg:hidden",
        open
          ? "visible"
          : "pointer-events-none invisible transition-[visibility] duration-500"
      )}
    >
      <div
        aria-hidden
        onClick={closeDrawer}
        className={cn(
          "absolute inset-0 bg-black/50 backdrop-blur-[2px] transition-opacity duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none",
          open ? "opacity-100" : "opacity-0"
        )}
      />
      <nav
        id="mobile-nav"
        aria-label="Mobile"
        inert={!open}
        className={cn(
          "absolute inset-y-0 left-0 flex w-[min(22rem,88vw)] flex-col bg-white shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] will-change-transform motion-reduce:transition-none",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-border px-5">
          <Logo className="text-base" />
          <button
            ref={closeButton}
            type="button"
            aria-label="Close menu"
            onClick={closeDrawer}
            className="grid size-10 place-items-center rounded-lg text-ink hover:bg-surface"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-4">
          <ul className="flex flex-col gap-1">
            {mainNav.map((item) => (
              <li key={item.href}>
                {item.href === "/services" ? (
                  <>
                    <div className="flex items-center">
                      <Link
                        href={item.href}
                        aria-current={isActive(pathname, item.href) ? "page" : undefined}
                        onClick={closeDrawer}
                        className={cn(
                          "flex-1 rounded-lg px-3 py-3 text-base font-medium text-ink hover:bg-surface",
                          isActive(pathname, item.href) && "text-brand"
                        )}
                      >
                        {item.label}
                      </Link>
                      <button
                        type="button"
                        aria-label={servicesOpen ? "Hide services" : "Show services"}
                        aria-expanded={servicesOpen}
                        aria-controls="mobile-services"
                        onClick={() => setServicesOpen((v) => !v)}
                        className="grid size-11 place-items-center rounded-lg text-ink hover:bg-surface"
                      >
                        <ChevronDown
                          className={cn("size-5 transition-transform", servicesOpen && "rotate-180")}
                        />
                      </button>
                    </div>
                    <div
                      className={cn(
                        "grid transition-[grid-template-rows] duration-300",
                        servicesOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      )}
                    >
                      <ul
                        id="mobile-services"
                        inert={!servicesOpen}
                        className="ml-3 flex flex-col gap-0.5 overflow-hidden border-l border-border pl-2"
                      >
                        {services.map((s) => (
                          <li key={s.slug}>
                            <Link
                              href={`/services/${s.slug}`}
                              onClick={closeDrawer}
                              aria-current={pathname === `/services/${s.slug}` ? "page" : undefined}
                              className={cn(
                                "flex items-center gap-2.5 rounded-lg px-2 py-2 text-[0.95rem] text-ink/80 hover:bg-surface hover:text-brand",
                                pathname === `/services/${s.slug}` && "text-brand"
                              )}
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
                        ))}
                      </ul>
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    aria-current={isActive(pathname, item.href) ? "page" : undefined}
                    onClick={closeDrawer}
                    className={cn(
                      "block rounded-lg px-3 py-3 text-base font-medium text-ink hover:bg-surface",
                      isActive(pathname, item.href) && "bg-surface text-brand"
                    )}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="shrink-0 space-y-3 border-t border-border p-5">
          <a
            href={site.contact.phoneHref}
            className="flex items-center justify-center gap-2 text-sm font-semibold text-ink hover:text-brand"
          >
            <Phone className="size-4" />
            {site.contact.phoneDisplay}
          </a>
          <QuoteButton className="w-full" onClick={closeDrawer}>
            Get a free quote
          </QuoteButton>
        </div>
      </nav>
    </div>
    </>
  );
}
