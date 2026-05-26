"use client";

import { useTranslations } from "next-intl";
import { useReveal } from "@/components/animations/useReveal";

export function Security() {
  const t = useTranslations("security");
  const items = t.raw("items") as { title: string; body: string }[];
  const ref = useReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      id="security"
      data-header-theme="dark"
      className="always-dark relative isolate py-28 md:py-36"
    >
      <div className="container-screen">
        <div data-reveal className="grid gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <div className="text-[12px] font-semibold uppercase tracking-[0.18em] text-foreground/60">
              {t("eyebrow")}
            </div>
            <h2 className="mt-5 max-w-2xl font-display text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-[3.5rem]">
              {t("title")}
            </h2>
          </div>
          <p className="md:col-span-5 text-lg leading-relaxed text-foreground/70">
            {t("body")}
          </p>
        </div>

        <ul
          data-reveal
          className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/10 sm:grid-cols-2 lg:grid-cols-4"
        >
          {items.map((item, i) => (
            <li
              key={item.title}
              data-reveal-child
              className="flex flex-col gap-3 bg-background p-7"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/40">
                / {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-lg font-semibold tracking-tight text-foreground">
                {item.title}
              </h3>
              <p className="text-[14.5px] leading-relaxed text-foreground/70">
                {item.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
