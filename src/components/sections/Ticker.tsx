"use client";

import { useTranslations } from "next-intl";

const rows = [
  { from: "USD", to: "EUR", rate: "0.9241", delta: "+0.12%" },
  { from: "EUR", to: "MXN", rate: "20.187", delta: "−0.04%" },
  { from: "USDC", to: "USD", rate: "1.0000", delta: "0.00%" },
  { from: "GBP", to: "USD", rate: "1.2706", delta: "+0.21%" },
  { from: "BRL", to: "USD", rate: "0.2024", delta: "−0.08%" },
  { from: "USD", to: "COP", rate: "3,910.4", delta: "+0.31%" },
  { from: "EUR", to: "ARS", rate: "1,034.55", delta: "−0.18%" },
  { from: "USDC", to: "EUR", rate: "0.9237", delta: "+0.09%" },
];

export function Ticker() {
  const t = useTranslations("marquee");
  const full = [...rows, ...rows];

  return (
    <section
      aria-label={t("label")}
      className="border-y border-foreground/[0.06] bg-foreground/[0.02] py-4 dark:border-white/[0.08] dark:bg-white/[0.02]"
    >
      <div className="relative overflow-hidden mask-marquee">
        <ul className="flex w-max animate-ticker items-center gap-10 px-6 text-[13px] font-medium tabular-nums text-muted">
          {full.map((row, i) => (
            <li key={`${row.from}-${i}`} className="flex items-center gap-3 whitespace-nowrap">
              <span className="text-foreground">
                {row.from} → {row.to}
              </span>
              <span>{row.rate}</span>
              <span
                className={
                  row.delta.startsWith("+")
                    ? "text-emerald-600 dark:text-emerald-400"
                    : row.delta.startsWith("−")
                      ? "text-rose-500"
                      : "text-subtle"
                }
              >
                {row.delta}
              </span>
              <span aria-hidden className="text-subtle">·</span>
            </li>
          ))}
        </ul>
      </div>

      <style>{`
        @keyframes ticker {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-ticker {
          animation: ticker 60s linear infinite;
        }
        .mask-marquee {
          -webkit-mask-image: linear-gradient(to right, transparent, black 6%, black 94%, transparent);
                  mask-image: linear-gradient(to right, transparent, black 6%, black 94%, transparent);
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-ticker { animation: none; }
        }
      `}</style>
    </section>
  );
}
