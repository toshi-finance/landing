"use client";

import { useTranslations } from "next-intl";
import { useReveal } from "@/components/animations/useReveal";
import { PasskeyPrompt } from "@/components/mockups/PasskeyPrompt";

export function Security() {
  const t = useTranslations("security");
  const items = t.raw("items") as { title: string; body: string }[];
  const ref = useReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      id="security"
      className="always-dark relative isolate py-28 md:py-36"
    >
      <div className="container-screen">
        <div data-reveal className="grid items-center gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <div className="text-[12px] font-semibold uppercase tracking-[0.18em] text-foreground/60">
              {t("eyebrow")}
            </div>
            <h2 className="mt-5 max-w-2xl font-display text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-[3.5rem]">
              {t("title")}
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-foreground/70">
              {t("body")}
            </p>

            <ul className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/10 sm:grid-cols-2">
              {items.map((item, i) => (
                <li
                  key={item.title}
                  data-reveal-child
                  className="flex flex-col gap-2 bg-background p-6"
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

          <div data-reveal-child className="relative flex justify-center md:col-span-5">
            <div className="relative">
              <div className="pointer-events-none absolute -inset-12 -z-10 rounded-full bg-mint/10 blur-3xl" />
              <PasskeyPrompt />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
