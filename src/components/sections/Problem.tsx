"use client";

import { useTranslations } from "next-intl";
import { useReveal } from "@/components/animations/useReveal";

export function Problem() {
  const t = useTranslations("problem");
  const items = t.raw("items") as { title: string; body: string }[];
  const ref = useReveal<HTMLElement>();

  return (
    <section ref={ref} className="py-28 md:py-36">
      <div className="container-screen">
        <div data-reveal className="grid gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-muted">
              {t("eyebrow")}
            </span>
            <h2
              className="mt-6 font-display font-semibold leading-[1.02] tracking-[-0.035em]"
              style={{ fontSize: "clamp(2.5rem, 5.6vw, 4.75rem)" }}
            >
              {t("title")}
            </h2>
          </div>
          <p className="md:col-span-5 text-lg leading-relaxed text-muted">
            {t("intro")}
          </p>
        </div>

        <ul
          data-reveal
          className="mt-20 grid divide-x divide-y divide-foreground/[0.08] border-t border-foreground/[0.08] sm:grid-cols-2 lg:grid-cols-4 dark:divide-white/[0.08] dark:border-white/[0.08]"
        >
          {items.map((item, i) => (
            <li
              key={item.title}
              data-reveal-child
              className="group relative flex flex-col gap-5 px-2 py-10 first:pl-0 last:pr-0 sm:px-8 lg:px-8"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-subtle">
                  / {String(i + 1).padStart(2, "0")}
                </span>
                <CloseIcon className="h-4 w-4 text-subtle transition-colors group-hover:text-foreground" />
              </div>
              <h3
                className="font-display font-semibold leading-tight tracking-tight"
                style={{ fontSize: "clamp(1.4rem, 2vw, 1.75rem)" }}
              >
                {item.title}
              </h3>
              <p className="text-[15px] leading-relaxed text-muted">
                {item.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M8 8l8 8M16 8l-8 8" />
    </svg>
  );
}
