"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useReveal } from "@/components/animations/useReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";

type Side = {
  tag: string;
  title: string;
  body: string;
  points: string[];
  cta: string;
};

export function TwoSides() {
  const t = useTranslations("twoSides");
  const pay = t.raw("pay") as Side;
  const charge = t.raw("charge") as Side;
  const ref = useReveal<HTMLElement>();

  return (
    <section ref={ref} id="pay" className="py-28 md:py-36">
      <div className="container-screen">
        <div data-reveal>
          <SectionHeader
            align="center"
            eyebrow={t("eyebrow")}
            title={t("title")}
            subtitle={t("subtitle")}
          />
        </div>

        <div data-reveal className="mt-16 grid gap-5 lg:grid-cols-2 lg:gap-6">
          <SidePanel
            side={pay}
            image="/images/creator-lifestyle.png"
            ctaHref="#cta"
            index="01"
          />
          <SidePanel
            side={charge}
            image="/images/merchant-shop.png"
            ctaHref="#cta"
            index="02"
            id="charge"
          />
        </div>
      </div>
    </section>
  );
}

function SidePanel({
  side,
  image,
  ctaHref,
  index,
  id,
}: {
  side: Side;
  image: string;
  ctaHref: string;
  index: string;
  id?: string;
}) {
  return (
    <div
      id={id}
      data-reveal-child
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-foreground/[0.08] bg-background transition-colors hover:border-foreground/20 dark:border-white/[0.08] dark:hover:border-white/20"
    >
      <div className="relative h-56 w-full overflow-hidden md:h-64">
        <Image
          src={image}
          alt=""
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6">
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80">
            {side.tag}
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/55">
            / {index}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-7 md:p-9">
        <h3 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          {side.title}
        </h3>
        <p className="mt-3 max-w-md text-[15px] leading-relaxed text-muted md:text-base">
          {side.body}
        </p>

        <ul className="mt-7 space-y-3 text-[15px]">
          {side.points.map((point) => (
            <li key={point} className="flex items-start gap-3">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-mint/15 text-mint">
                <svg
                  viewBox="0 0 24 24"
                  className="h-3 w-3"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M4 12l5 5L20 6" />
                </svg>
              </span>
              <span className="text-foreground/85">{point}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-8">
          <a href={ctaHref} className="inline-block">
            <Button size="lg">
              {side.cta}
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden
              >
                <path d="M5 12h14" />
                <path d="M13 5l7 7-7 7" />
              </svg>
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
