"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useReveal } from "@/components/animations/useReveal";

export function Solution() {
  const t = useTranslations("solution");
  const pillars = t.raw("pillars") as { title: string; body: string }[];
  const ref = useReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      className="always-dark relative isolate overflow-hidden"
    >
      <div className="grid lg:grid-cols-12">
        <div className="relative min-h-[420px] lg:col-span-5 lg:min-h-[760px]">
          <Image
            src="/images/creator-lifestyle.png"
            alt=""
            fill
            sizes="(min-width: 1024px) 42vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background via-background/40 to-transparent" />
          <div className="absolute bottom-10 left-8 right-8 lg:left-12 lg:right-auto lg:max-w-sm">
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/70">
              {t("eyebrow")}
            </span>
            <p className="mt-4 font-display text-2xl font-semibold leading-tight text-foreground sm:text-3xl">
              {t("imageCaption")}
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-center px-6 py-20 sm:px-10 md:px-16 lg:col-span-7 lg:py-32">
          <div data-reveal className="max-w-2xl">
            <h2
              className="font-display font-semibold leading-[1.02] tracking-[-0.035em] text-foreground"
              style={{ fontSize: "clamp(2.5rem, 5.8vw, 5rem)" }}
            >
              {t("title")}
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-foreground/70">
              {t("body")}
            </p>
          </div>

          <ul data-reveal className="mt-12 space-y-px overflow-hidden rounded-2xl border border-foreground/10">
            {pillars.map((pillar, i) => (
              <li
                key={pillar.title}
                data-reveal-child
                className="group relative grid grid-cols-[60px_1fr_28px] items-center gap-4 bg-background p-6 transition-colors hover:bg-foreground/[0.04] md:gap-6 md:p-8"
              >
                <span className="font-mono text-[12px] uppercase tracking-[0.18em] text-foreground/50">
                  / {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-xl font-semibold tracking-tight text-foreground md:text-2xl">
                    {pillar.title}
                  </h3>
                  <p className="mt-1 max-w-md text-[15px] leading-relaxed text-foreground/70">
                    {pillar.body}
                  </p>
                </div>
                <svg viewBox="0 0 24 24" className="h-4 w-4 text-foreground/40 transition-colors group-hover:text-mint" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden>
                  <path d="M5 12h14" />
                  <path d="M13 5l7 7-7 7" />
                </svg>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
