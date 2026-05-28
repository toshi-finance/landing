"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { gsap, useGSAP } from "@/lib/gsap";

const navItems = [
  { id: "charge", href: "#charge" },
  { id: "pay", href: "#pay" },
  { id: "howItWorks", href: "#how-it-works" },
  { id: "security", href: "#security" },
] as const;

export function Navbar() {
  const t = useTranslations("navbar");
  const headerRef = useRef<HTMLElement>(null);
  const menuPanelRef = useRef<HTMLDivElement>(null);
  const menuCtaRef = useRef<HTMLAnchorElement>(null);
  const menuFooterRef = useRef<HTMLDivElement>(null);
  const menuTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [overDarkSection, setOverDarkSection] = useState(true);
  const [open, setOpen] = useState(false);

  useGSAP(
    () => {
      const panel = menuPanelRef.current;
      if (!panel) return;

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const links = gsap.utils.toArray<HTMLElement>("[data-mobile-menu-link]");
      const extras = [menuCtaRef.current, menuFooterRef.current].filter(
        Boolean,
      );

      gsap.set(panel, {
        autoAlpha: 0,
        filter: reduceMotion ? "none" : "blur(8px)",
        pointerEvents: "none",
        yPercent: reduceMotion ? 0 : -1.5,
      });
      gsap.set([...links, ...extras], {
        autoAlpha: 0,
        y: reduceMotion ? 0 : 18,
      });

      const timeline = gsap.timeline({
        paused: true,
        defaults: {
          duration: reduceMotion ? 0.01 : 0.42,
          ease: "power3.out",
        },
      });

      timeline
        .to(panel, {
          autoAlpha: 1,
          filter: "blur(0px)",
          pointerEvents: "auto",
          yPercent: 0,
        })
        .to(
          links,
          {
            autoAlpha: 1,
            duration: reduceMotion ? 0.01 : 0.36,
            stagger: reduceMotion ? 0 : 0.055,
            y: 0,
          },
          reduceMotion ? 0 : 0.08,
        )
        .to(
          extras,
          {
            autoAlpha: 1,
            duration: reduceMotion ? 0.01 : 0.32,
            stagger: reduceMotion ? 0 : 0.045,
            y: 0,
          },
          reduceMotion ? 0 : 0.2,
        );

      menuTimelineRef.current = timeline;
      return () => {
        timeline.kill();
        menuTimelineRef.current = null;
      };
    },
    { scope: headerRef },
  );

  useEffect(() => {
    let frame = 0;

    function syncHeaderState() {
      setScrolled(window.scrollY > window.innerHeight * 1.65);

      const sampleY = window.innerWidth >= 768 ? 36 : 32;
      const sampleXs = [
        Math.round(window.innerWidth * 0.18),
        Math.round(window.innerWidth * 0.5),
        Math.round(window.innerWidth * 0.82),
      ];
      const isOverDark = sampleXs.some((x) =>
        document
          .elementsFromPoint(x, sampleY)
          .some((element) =>
            element instanceof HTMLElement
              ? element.dataset.headerTheme === "dark" ||
                Boolean(element.closest('[data-header-theme="dark"]'))
              : false,
          ),
      );

      setOverDarkSection(isOverDark);
    }

    function requestSync() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(syncHeaderState);
    }

    syncHeaderState();
    window.addEventListener("scroll", requestSync, { passive: true });
    window.addEventListener("resize", requestSync);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestSync);
      window.removeEventListener("resize", requestSync);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    if (open) {
      window.addEventListener("keydown", onKeyDown);
    }

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    const timeline = menuTimelineRef.current;
    if (!timeline) return;

    if (open) {
      timeline.play();
    } else {
      timeline.reverse();
    }
  }, [open]);

  return (
    <header
      ref={headerRef}
      className={cn(
        "fixed inset-x-0 top-0 z-50 w-full transition-[backdrop-filter,border-color] duration-300",
        overDarkSection &&
          "[--accent-foreground:#0a0a0a] [--accent:#f2f0ea] [--background:#0a0a0a] [--foreground:#f2f0ea] [--muted:#f2f0ea] [--surface:#121212]",
        scrolled ? "border-b backdrop-blur-md" : "border-b border-transparent",
        scrolled && overDarkSection
          ? "border-white/[0.08]"
          : scrolled
            ? "border-foreground/[0.08] dark:border-white/[0.08]"
            : "",
      )}
    >
      <div className="container-screen relative z-10 flex h-16 items-center justify-between gap-6 md:h-[72px]">
        <Link href="/" aria-label="Toshi home" className="focus-ring rounded-md">
          <Logo tone={overDarkSection ? "light" : "auto"} />
        </Link>

        <nav
          className={cn(
            "hidden items-center gap-8 text-sm lg:flex",
            overDarkSection
              ? "text-white/72 [text-shadow:0_1px_18px_rgba(0,0,0,0.38)]"
              : "text-muted",
          )}
        >
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={cn(
                "transition-colors",
                overDarkSection ? "hover:text-white" : "hover:text-foreground",
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
            aria-controls="mobile-menu"
            onClick={() => setOpen((s) => !s)}
            className={cn(
              "relative inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors focus-ring lg:hidden",
              overDarkSection
                ? "border-white/16 bg-white/[0.06] text-white hover:border-white/32 hover:bg-white/[0.1]"
                : "border-foreground/12 bg-background/60 text-foreground hover:border-foreground/30 hover:bg-foreground/[0.04]",
            )}
          >
            <span className="relative h-4 w-4" aria-hidden="true">
              {["top", "middle", "bottom"].map((line) => (
                <span
                  key={line}
                  className={cn(
                    "absolute left-0 h-px w-4 rounded-full bg-current transition-[opacity,transform] duration-300 ease-out",
                    line === "top" &&
                      (open ? "top-1/2 rotate-45" : "top-[3px]"),
                    line === "middle" &&
                      (open ? "top-1/2 opacity-0" : "top-1/2 opacity-100"),
                    line === "bottom" &&
                      (open ? "top-1/2 -rotate-45" : "bottom-[3px]"),
                  )}
                />
              ))}
            </span>
          </button>
        </div>
      </div>

      <div
        ref={menuPanelRef}
        id="mobile-menu"
        className={cn(
          "invisible fixed inset-0 z-0 bg-background/96 text-foreground opacity-0 backdrop-blur-xl lg:hidden",
          "supports-[height:100svh]:h-[100svh]",
          overDarkSection &&
            "[--accent-foreground:#0a0a0a] [--accent:#f2f0ea] [--background:#0a0a0a] [--foreground:#f2f0ea] [--muted:#b7b5ad] [--surface:#121212]",
        )}
        aria-hidden={!open}
      >
        <div className="container-screen flex min-h-screen flex-col pb-8 pt-24 supports-[height:100svh]:min-h-[100svh] md:pt-28">
          <div className="border-t border-foreground/[0.1]" />
          <nav
            aria-label="Mobile navigation"
            className="flex flex-1 flex-col justify-center py-10"
          >
            {navItems.map((item, index) => (
              <a
                key={item.id}
                href={item.href}
                data-mobile-menu-link
                onClick={() => setOpen(false)}
                className="group flex items-center justify-between border-b border-foreground/[0.1] py-5 text-left font-display text-[clamp(2.2rem,12vw,4.7rem)] font-semibold leading-[0.95] tracking-[-0.04em] text-foreground transition-colors hover:text-foreground/72"
              >
                <span>{t(item.id)}</span>
                <span className="font-mono text-xs font-medium tracking-[0.18em] text-muted transition-transform duration-300 group-hover:translate-x-1">
                  0{index + 1}
                </span>
              </a>
            ))}
          </nav>

          <div className="space-y-5">
            <a
              ref={menuCtaRef}
              href="#cta"
              onClick={() => setOpen(false)}
              className="block"
            >
              <Button className="h-14 w-full text-base" size="lg">
                {t("joinWaitlist")}
              </Button>
            </a>
            <div
              ref={menuFooterRef}
              className="flex items-center justify-between border-t border-foreground/[0.1] pt-5 text-xs text-muted"
            >
              <span className="font-mono uppercase tracking-[0.18em]">
                v0.1 · waitlist
              </span>
              <span>Toshi</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
