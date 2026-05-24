"use client";

import { useTranslations } from "next-intl";
import { useReveal } from "@/components/animations/useReveal";

const icons = [Shield, Cancel, Globe, Spark, Globe2, Open];

export function Benefits() {
  const t = useTranslations("benefits");
  const items = t.raw("items") as { title: string; body: string }[];
  const ref = useReveal<HTMLElement>();

  return (
    <section ref={ref} className="border-t border-foreground/[0.06] py-28 md:py-36 dark:border-white/[0.06]">
      <div className="container-screen">
        <div data-reveal className="grid items-end gap-10 md:grid-cols-12">
          <div className="md:col-span-8">
            <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-muted">
              {t("eyebrow")}
            </span>
            <h2
              className="mt-6 max-w-3xl font-display font-semibold leading-[1.02] tracking-[-0.035em]"
              style={{ fontSize: "clamp(2.5rem, 5.6vw, 4.75rem)" }}
            >
              {t("title")}
            </h2>
          </div>
        </div>

        <ul data-reveal className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-foreground/[0.08] bg-foreground/[0.06] sm:grid-cols-2 lg:grid-cols-3 dark:border-white/[0.08] dark:bg-white/[0.06]">
          {items.map((item, i) => {
            const Icon = icons[i % icons.length];
            return (
              <li
                key={item.title}
                data-reveal-child
                className="group flex flex-col gap-5 bg-background p-8 transition-colors hover:bg-foreground/[0.02] md:p-10 dark:hover:bg-white/[0.03]"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-foreground/10 text-foreground transition-colors group-hover:border-foreground/30 group-hover:bg-foreground group-hover:text-background dark:border-white/10 dark:group-hover:border-white/30">
                    <Icon className="h-[18px] w-[18px]" />
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-subtle">
                    / {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="text-xl font-semibold tracking-tight md:text-2xl">
                  {item.title}
                </h3>
                <p className="text-[15px] leading-relaxed text-muted">{item.body}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

type IconProps = { className?: string };
function Shield({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 3l8 3v6c0 4.5-3.4 8.5-8 9-4.6-.5-8-4.5-8-9V6l8-3z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}
function Cancel({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M6 6l12 12" />
    </svg>
  );
}
function Globe({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 3 2.5 15 0 18M12 3c-2.5 3-2.5 15 0 18" />
    </svg>
  );
}
function Spark({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 3v6M12 15v6M3 12h6M15 12h6M5.6 5.6l4.2 4.2M14.2 14.2l4.2 4.2M5.6 18.4l4.2-4.2M14.2 9.8l4.2-4.2" />
    </svg>
  );
}
function Globe2({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 9h18M3 15h18" />
    </svg>
  );
}
function Open({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="4" y="4" width="16" height="16" rx="4" />
      <path d="M9 9h6v6" />
      <path d="M9 15l6-6" />
    </svg>
  );
}
