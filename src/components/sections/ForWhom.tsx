"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useReveal } from "@/components/animations/useReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function ForWhom() {
  const t = useTranslations("forWhom");
  const items = t.raw("items") as { tag: string; title: string; body: string }[];
  const ref = useReveal<HTMLElement>();

  return (
    <section ref={ref} id="for-whom" className="py-28 md:py-36">
      <div className="container-screen">
        <div data-reveal>
          <SectionHeader align="left" eyebrow={t("eyebrow")} title={t("title")} />
        </div>

        <div data-reveal className="mt-16 grid gap-6 lg:grid-cols-12">
          <div
            data-reveal-child
            className="relative overflow-hidden rounded-2xl border border-foreground/[0.06] lg:col-span-5 dark:border-white/[0.06]"
          >
            <div className="relative h-full min-h-[420px] w-full">
              <Image
                src="/images/merchant-shop.png"
                alt=""
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/65 to-transparent" />
              <div className="absolute bottom-7 left-7 right-7">
                <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-white/75">
                  {t("imageLabel")}
                </span>
                <p className="mt-3 font-display text-2xl font-semibold leading-tight text-white">
                  {t("imageCaption")}
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {items.map((item) => (
              <div
                key={item.tag}
                data-reveal-child
                className="group relative flex flex-col gap-3 rounded-2xl border border-foreground/[0.06] bg-background p-6 transition-colors hover:border-foreground/20 md:p-7 dark:border-white/[0.06] dark:hover:border-white/20"
              >
                <span className="w-fit text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
                  {item.tag}
                </span>
                <h3 className="text-xl font-semibold tracking-tight">
                  {item.title}
                </h3>
                <p className="text-[15px] leading-relaxed text-muted">{item.body}</p>
                <span className="mt-auto inline-flex items-center gap-1 text-sm text-foreground/70 transition-colors group-hover:text-foreground">
                  {t("caseCta")}
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden>
                    <path d="M5 12h14" />
                    <path d="M13 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
