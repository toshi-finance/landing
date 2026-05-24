import { useTranslations } from "next-intl";
import { cn } from "@/lib/cn";

const rowIds = ["PMT-9821", "PMT-9820", "PMT-9819", "PMT-9818"];

export function MerchantDashboard({ className }: { className?: string }) {
  const t = useTranslations("mockups.dashboard");
  const rows = t.raw("rows") as { customer: string; item: string; amount: string }[];

  return (
    <div
      data-mockup="dashboard"
      className={cn(
        "relative w-full max-w-[640px] overflow-hidden rounded-2xl border border-black/5 bg-white text-neutral-900 shadow-[0_30px_80px_-30px_rgba(10,10,10,0.4),0_8px_24px_-12px_rgba(10,10,10,0.2)]",
        "dark:border-white/10 dark:bg-[#1a1a1a] dark:text-neutral-100",
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-black/[0.05] px-6 py-4 dark:border-white/10">
        <div className="flex items-center gap-3">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-neutral-900">
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
              <path d="M3 12h4l3-8 4 16 3-8h4" />
            </svg>
          </span>
          <p className="text-sm font-semibold">{t("title")}</p>
        </div>
        <div className="flex items-center gap-3 text-xs text-neutral-400">
          <span className="hidden sm:inline">{t("live")}</span>
          <span className="relative inline-flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-px bg-black/[0.05] dark:bg-white/10">
        <KpiCell label={t("kpiToday")} value="$1,294" delta="+12%" />
        <KpiCell label={t("kpiPayments")} value="36" delta="+8" />
        <KpiCell label={t("kpiAverage")} value="$42.10" delta="+3%" />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-[11px] uppercase tracking-[0.14em] text-neutral-400">
              <th className="px-6 py-3 font-medium">{t("customer")}</th>
              <th className="px-2 py-3 font-medium">{t("concept")}</th>
              <th className="px-2 py-3 text-right font-medium">{t("amount")}</th>
              <th className="px-6 py-3 text-right font-medium">{t("status")}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/[0.04] dark:divide-white/[0.06]">
            {rows.map((row, index) => (
              <tr key={rowIds[index]} className="text-[13.5px]">
                <td className="px-6 py-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-100 text-[11px] font-semibold uppercase text-neutral-600 dark:bg-white/10 dark:text-neutral-200">
                      {row.customer.charAt(0)}
                    </span>
                    <div>
                      <p className="font-medium leading-tight">{row.customer}</p>
                      <p className="text-[11px] text-neutral-400">{rowIds[index]}</p>
                    </div>
                  </div>
                </td>
                <td className="px-2 py-3 text-neutral-500 dark:text-neutral-400">
                  {row.item}
                </td>
                <td className="px-2 py-3 text-right font-semibold tabular-nums">
                  {row.amount}
                </td>
                <td className="px-6 py-3 text-right">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                    <span className="h-1 w-1 rounded-full bg-emerald-500" />
                    {t("settled")}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function KpiCell({
  label,
  value,
  delta,
}: {
  label: string;
  value: string;
  delta: string;
}) {
  return (
    <div className="bg-white px-6 py-5 dark:bg-[#1a1a1a]">
      <p className="text-[11px] uppercase tracking-[0.14em] text-neutral-400">
        {label}
      </p>
      <p className="mt-1 font-display text-[22px] font-semibold tracking-tight tabular-nums">
        {value}
      </p>
      <p className="mt-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
        {delta}
      </p>
    </div>
  );
}
