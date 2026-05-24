"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { gsap, useGSAP } from "@/lib/gsap";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function HowItWorks() {
  const t = useTranslations("howItWorks");
  const steps = t.raw("steps") as {
    number: string;
    title: string;
    body: string;
  }[];
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
            gsap.set("[data-step]", { opacity: 1, y: 0 });
            return;
          }
          gsap.from("[data-step]", {
            opacity: 0,
            y: 28,
            duration: 0.9,
            ease: "expo.out",
            stagger: 0.12,
            scrollTrigger: {
              trigger: "[data-steps]",
              start: "top 78%",
              once: true,
            },
          });
          gsap.fromTo(
            "[data-line]",
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: "none",
              transformOrigin: "top",
              scrollTrigger: {
                trigger: "[data-steps]",
                start: "top 70%",
                end: "bottom 60%",
                scrub: 0.6,
              },
            },
          );
        },
      );
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="how-it-works" className="py-28 md:py-36">
      <div className="container-screen">
        <SectionHeader
          align="center"
          eyebrow={t("eyebrow")}
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <div data-steps className="relative mx-auto mt-20 max-w-3xl">
          <span
            aria-hidden
            data-line
            className="absolute left-[14px] top-2 hidden h-[calc(100%-1rem)] w-px bg-foreground/15 md:block dark:bg-white/15"
          />

          <ol className="space-y-12 md:space-y-16">
            {steps.map((step) => (
              <li key={step.number} data-step className="relative grid grid-cols-[36px_1fr] gap-6 md:grid-cols-[60px_1fr]">
                <div className="relative">
                  <span className="relative z-10 flex h-7 w-7 items-center justify-center rounded-full border border-foreground/15 bg-background font-mono text-[11px] font-semibold text-foreground dark:border-white/20">
                    {step.number}
                  </span>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-xl text-base leading-relaxed text-muted md:text-lg">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
