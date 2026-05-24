"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

const navItems = [
  { id: "product", href: "#product" },
  { id: "howItWorks", href: "#how-it-works" },
  { id: "security", href: "#security" },
  { id: "forWhom", href: "#for-whom" },
] as const;

export function Navbar() {
  const t = useTranslations("navbar");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > window.innerHeight * 1.65);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 w-full transition-[backdrop-filter,border-color] duration-300",
        scrolled
          ? "border-b border-foreground/[0.08] bg-transparent backdrop-blur-md dark:border-white/[0.08]"
          : "border-b border-transparent bg-transparent [--accent-foreground:#0a0a0a] [--accent:#f2f0ea] [--background:#0a0a0a] [--foreground:#f2f0ea] [--muted:#f2f0ea] [--surface:#121212]",
      )}
    >
      <div className="container-screen flex h-16 items-center justify-between gap-6 md:h-[72px]">
        <Link href="/" aria-label="Toshi home" className="focus-ring rounded-md">
          <Logo />
        </Link>

        <nav
          className={cn(
            "hidden items-center gap-8 text-sm lg:flex",
            scrolled
              ? "text-muted"
              : "text-white/88 [text-shadow:0_1px_18px_rgba(0,0,0,0.38)]",
          )}
        >
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={cn(
                "transition-colors",
                scrolled ? "hover:text-foreground" : "hover:text-white",
              )}
            >
              {t(item.id)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          <a
            href="#cta"
            className="hidden md:block"
          >
            <Button size="sm">{t("joinWaitlist")}</Button>
          </a>
          <button
            type="button"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((s) => !s)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-foreground/12 text-foreground transition-colors hover:border-foreground/30 focus-ring lg:hidden"
          >
            <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden>
              {open ? (
                <>
                  <path d="M6 6l12 12" />
                  <path d="M18 6L6 18" />
                </>
              ) : (
                <>
                  <path d="M4 8h16" />
                  <path d="M4 16h16" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden">
          <div className="border-t border-foreground/[0.08] bg-background/96 backdrop-blur-xl">
          <div className="container-screen pb-6 pt-2">
            <nav className="flex flex-col divide-y divide-foreground/[0.08]">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="py-4 text-lg font-medium text-foreground"
                >
                  {t(item.id)}
                </a>
              ))}
            </nav>
            <div className="mt-4 flex items-center justify-between gap-3">
              <a href="#cta" onClick={() => setOpen(false)} className="flex-1">
                <Button className="w-full" size="md">
                  {t("joinWaitlist")}
                </Button>
              </a>
            </div>
          </div>
          </div>
        </div>
      )}
    </header>
  );
}
