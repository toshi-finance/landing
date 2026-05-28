"use client";

import Image from "next/image";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { gsap, useGSAP } from "@/lib/gsap";
import { Button } from "@/components/ui/Button";

export function Hero() {
  const t = useTranslations("hero");
  const ref = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const bridgeRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const centerSlotRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        {
          desktop: "(min-width: 768px)",
          motion: "(prefers-reduced-motion: no-preference)",
          reduced: "(prefers-reduced-motion: reduce)",
        },
        (ctx) => {
          if (!ctx.conditions?.motion) return;
          const isDesktop = ctx.conditions.desktop;

          const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

          tl.from("[data-hero-image]", {
            opacity: 0,
            scale: 1.06,
            duration: 1.4,
          });

          tl.from(
            "[data-hero-line]",
            { opacity: 0, y: 36, duration: 1, stagger: 0.08 },
            "-=0.7",
          );

          tl.from(
            "[data-hero-sub]",
            { opacity: 0, y: 18, duration: 0.8 },
            "-=0.6",
          );
          tl.from(
            "[data-hero-cta]",
            { opacity: 0, y: 14, duration: 0.6, stagger: 0.08 },
            "-=0.55",
          );

          if (
            isDesktop &&
            contentRef.current &&
            bridgeRef.current &&
            imgRef.current &&
            cardsRef.current &&
            centerSlotRef.current
          ) {
            const img = imgRef.current;
            const cards = cardsRef.current;
            const slot = centerSlotRef.current;
            const container = img.parentElement as HTMLElement;

            const fullW = () => container.offsetWidth;
            const fullH = () => container.offsetHeight;
            const slotLeft = () => cards.offsetLeft + slot.offsetLeft;
            const slotTop = () => cards.offsetTop + slot.offsetTop;
            const slotW = () => slot.offsetWidth;
            const slotH = () => slot.offsetHeight;

            gsap.set(bridgeRef.current, { yPercent: 70, autoAlpha: 0 });
            gsap.set(cards, { autoAlpha: 0 });
            gsap.set("[data-hero-card]", { autoAlpha: 0, y: 80, scale: 0.82 });
            gsap.set("[data-hero-card='left']", { xPercent: 55, rotation: -3 });
            gsap.set("[data-hero-card='right']", { xPercent: -55, rotation: 3 });

            const transition = gsap.timeline({
              scrollTrigger: {
                trigger: ref.current,
                start: "top top",
                end: "+=78%",
                scrub: 0.75,
                invalidateOnRefresh: true,
              },
            });

            transition
              .to(contentRef.current, {
                y: -150,
                scale: 0.9,
                autoAlpha: 0,
                ease: "none",
              }, 0)
              .fromTo(
                img,
                {
                  top: 0,
                  left: 0,
                  right: "auto",
                  bottom: "auto",
                  width: fullW,
                  height: fullH,
                  borderRadius: 0,
                },
                {
                  top: slotTop,
                  left: slotLeft,
                  width: slotW,
                  height: slotH,
                  borderRadius: 26,
                  ease: "none",
                },
                0,
              )
              .to(bridgeRef.current, { yPercent: 0, autoAlpha: 1, ease: "none" }, 0.06)
              .to(cards, { autoAlpha: 1, ease: "none" }, 0.2)
              .to(
                "[data-hero-card]",
                {
                  autoAlpha: 1,
                  y: 0,
                  scale: 1,
                  xPercent: 0,
                  rotation: 0,
                  stagger: 0.04,
                  ease: "none",
                },
                0.24,
              );
          }
        },
      );
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      data-header-theme="dark"
      className="relative isolate h-[100svh] overflow-clip text-white [--accent-foreground:#0a0a0a] [--accent:#f2f0ea] [--background:#0a0a0a] [--foreground:#f2f0ea] [--muted:#d8d6cc] md:h-[185svh]"
      aria-label="Toshi"
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden pt-16 md:pt-[72px]">
        <div
          ref={imgRef}
          data-hero-image
          className="absolute inset-0 z-[2] overflow-hidden shadow-[0_32px_80px_-42px_rgba(0,0,0,0.7)] will-change-[width,height,top,left]"
        >
          <Image
            src="/images/hero-cinematic.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_18%]"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-black/42 via-black/10 to-transparent"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-r from-black/16 via-transparent to-black/10"
          />
        </div>

        <div
          ref={bridgeRef}
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-[-1px] z-[1] hidden h-[64svh] bg-gradient-to-t from-[#faf9f5] via-[#faf9f5]/96 to-transparent opacity-0 will-change-transform md:block"
        />

        <div
          ref={contentRef}
          className="container-screen relative z-10 flex min-h-[calc(100svh-72px)] flex-col items-center justify-center pb-12 pt-20 text-center will-change-transform sm:pt-24 md:pb-16"
        >
          <h1
            className="mx-auto max-w-[18ch] font-display text-[2.5rem] font-semibold leading-[0.98] tracking-tight text-foreground sm:text-[3.4rem] md:max-w-[20ch] md:text-[4.2rem] lg:text-[5rem]"
          >
            <span
              data-hero-line
              className="block pb-[0.06em]"
            >
              {t("headlineLine1")}
            </span>
            <span
              data-hero-line
              className="block pb-[0.06em]"
            >
              {t("headlineLine2")}
            </span>
          </h1>

          <p
            data-hero-sub
            className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-foreground/82 sm:text-lg md:text-xl"
          >
            {t("subhead")}
          </p>
          <div className="mt-7 flex w-full max-w-sm flex-col items-stretch justify-center gap-3 sm:max-w-none sm:flex-row sm:items-center">
            <a href="#charge" data-hero-cta>
              <Button size="lg" className="w-full sm:w-auto">
                {t("ctaPrimary")}
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                  <path d="M5 12h14" />
                  <path d="M13 5l7 7-7 7" />
                </svg>
              </Button>
            </a>
            <a href="#pay" data-hero-cta>
              <Button variant="outline" size="lg" className="w-full border-white/25 text-white hover:border-white/50 hover:bg-white/[0.06] sm:w-auto">
                {t("ctaCharge")}
              </Button>
            </a>
          </div>
          <a href="#how-it-works" data-hero-cta className="mt-5 inline-flex items-center justify-center text-sm font-medium text-foreground/72 underline-offset-4 hover:text-foreground hover:underline">
            {t("ctaSecondary")}
          </a>
        </div>

        <div
          ref={cardsRef}
          className="container-screen pointer-events-none absolute inset-x-0 bottom-[7svh] z-20 hidden text-neutral-950 opacity-0 will-change-transform md:block"
        >
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="font-display text-3xl font-semibold leading-tight tracking-normal md:text-5xl">
              {t("transitionTitle")}
            </h2>
            <p className="mx-auto mt-3 max-w-[20rem] text-sm leading-relaxed text-neutral-600 md:max-w-xl md:text-base">
              {t("transitionSubtitle")}
            </p>
          </div>

          <div className="mx-auto mt-6 grid max-w-[22rem] grid-cols-1 gap-3 md:mt-8 md:max-w-4xl md:grid-cols-3 md:gap-4">
            <HeroCard
              tone="dark"
              image="/images/creator-lifestyle.png"
              title={t("stat1Label")}
              value={t("stat1Value")}
              footnote={t("transitionLink")}
              side="left"
            />
            <div
              ref={centerSlotRef}
              className="relative min-h-[150px] overflow-hidden rounded-[1.25rem] md:min-h-[320px] md:rounded-[1.6rem]"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 text-center text-white md:p-5">
                <p className="text-[11px] font-medium text-white/72 md:text-[12px]">
                  {t("stat2Label")}
                </p>
                <p className="mt-1 font-display text-3xl font-semibold leading-none md:text-4xl">
                  {`$${t("mockupAmount")}`}
                </p>
                <span className="mt-3 inline-flex rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-neutral-950 md:mt-4 md:px-4 md:py-2 md:text-sm">
                  {t("mockupConfirm")}
                </span>
              </div>
            </div>
            <HeroCard
              tone="dark"
              image="/images/merchant-shop.png"
              title={t("stat3Label")}
              value={t("stat3Value")}
              footnote={t("transitionCheckout")}
              side="right"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroCard({
  image,
  title,
  value,
  footnote,
  side,
  tone = "light",
}: {
  image: string;
  title: string;
  value: string;
  footnote: string;
  side: "left" | "center" | "right";
  tone?: "light" | "dark";
}) {
  return (
    <div
      data-hero-card={side}
      className="relative min-h-[150px] overflow-hidden rounded-[1.25rem] bg-neutral-900 shadow-[0_24px_60px_-34px_rgba(0,0,0,0.6)] will-change-transform md:min-h-[320px] md:rounded-[1.6rem] md:shadow-[0_32px_80px_-42px_rgba(0,0,0,0.7)]"
    >
      <Image
        src={image}
        alt=""
        fill
        sizes="(min-width: 768px) 280px, 80vw"
        className="object-cover"
      />
      <div
        className={
          tone === "dark"
            ? "absolute inset-0 bg-gradient-to-t from-black/72 via-black/20 to-transparent"
            : "absolute inset-0 bg-gradient-to-t from-black/42 via-transparent to-transparent"
        }
      />
      <div className="absolute inset-x-0 bottom-0 p-4 text-center text-white md:p-5">
        <p className="text-[11px] font-medium text-white/72 md:text-[12px]">{title}</p>
        <p className="mt-1 font-display text-3xl font-semibold leading-none md:text-4xl">{value}</p>
        <span className="mt-3 inline-flex rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-neutral-950 md:mt-4 md:px-4 md:py-2 md:text-sm">
          {footnote}
        </span>
      </div>
    </div>
  );
}
