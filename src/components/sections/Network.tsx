"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { gsap, useGSAP } from "@/lib/gsap";
import { SectionHeader } from "@/components/ui/SectionHeader";

type Step = { label: string; title: string; body: string };

export function Network() {
  const t = useTranslations("network");
  const steps = t.raw("steps") as Step[];
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          reduced: "(prefers-reduced-motion: reduce)",
        },
        (ctx) => {
          if (!ctx.conditions?.motion) {
            gsap.set("[data-node]", { opacity: 1, y: 0 });
            return;
          }

          gsap.from("[data-node]", {
            opacity: 0,
            y: 28,
            duration: 0.9,
            ease: "expo.out",
            stagger: 0.18,
            scrollTrigger: { trigger: "[data-flow]", start: "top 78%", once: true },
          });

          gsap.fromTo(
            "[data-connector]",
            { scaleX: 0 },
            {
              scaleX: 1,
              transformOrigin: "left center",
              ease: "none",
              scrollTrigger: {
                trigger: "[data-flow]",
                start: "top 72%",
                end: "bottom 65%",
                scrub: 0.6,
              },
            },
          );

          gsap.to("[data-pulse]", {
            xPercent: 100,
            repeat: -1,
            duration: 2.4,
            ease: "power1.inOut",
            opacity: 0,
            keyframes: {
              opacity: [0, 1, 1, 0],
            },
          });
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
      className="always-dark relative isolate overflow-hidden py-28 md:py-36"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-70"
      >
        <div className="absolute left-1/2 top-1/2 h-[520px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-mint/12 blur-[160px]" />
      </div>

      <div className="container-screen">
        <SectionHeader
          align="center"
          eyebrow={t("eyebrow")}
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <div
          data-flow
          className="relative mx-auto mt-20 grid max-w-5xl gap-6 md:grid-cols-3 md:gap-4"
        >
          {/* Connector line behind the nodes (desktop) */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-[16.66%] right-[16.66%] top-[42px] hidden md:block"
          >
            <div className="relative h-px w-full overflow-hidden bg-foreground/15">
              <div
                data-connector
                className="absolute inset-0 origin-left bg-gradient-to-r from-mint/60 via-mint to-mint/60"
              />
              <div
                data-pulse
                className="absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-mint shadow-[0_0_12px_2px] shadow-mint/60"
              />
            </div>
          </div>

          {steps.map((step, i) => (
            <div
              key={step.label}
              data-node
              className="relative flex flex-col items-center text-center"
            >
              <span className="relative z-10 flex h-[88px] w-[88px] items-center justify-center rounded-full border border-foreground/15 bg-surface text-foreground">
                <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground/60">
                  {step.label}
                </span>
                <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full border border-foreground/15 bg-background font-mono text-[10px] text-foreground/70">
                  {i + 1}
                </span>
              </span>
              <h3 className="mt-6 text-xl font-semibold tracking-tight text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 max-w-[24ch] text-[15px] leading-relaxed text-foreground/65">
                {step.body}
              </p>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-16 max-w-md text-center font-mono text-[12px] uppercase tracking-[0.16em] text-foreground/45">
          {t("footnote")}
        </p>
      </div>
    </section>
  );
}
