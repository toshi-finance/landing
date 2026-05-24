import { useTranslations } from "next-intl";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/cn";

export function PaymentSheet({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  const hero = useTranslations("hero");
  const t = useTranslations("mockups.paymentSheet");

  return (
    <div
      data-mockup="payment-sheet"
      className={cn(
        "relative w-full max-w-[420px] overflow-hidden rounded-2xl border border-black/5 bg-white text-neutral-900 shadow-[0_30px_80px_-30px_rgba(10,10,10,0.45),0_8px_24px_-12px_rgba(10,10,10,0.25)]",
        "dark:border-white/10 dark:bg-[#1a1a1a] dark:text-neutral-100",
        className,
      )}
    >
      <div className="flex items-center justify-between px-6 pt-5">
        <Logo />
        <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-neutral-500 dark:bg-white/[0.06] dark:text-neutral-400">
          {t("securePay")}
        </span>
      </div>

      <div className="px-6 pt-7">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-400">
          {hero("mockupMerchant")}
        </p>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="font-display text-[44px] font-semibold leading-none tracking-tight">
            ${hero("mockupAmount")}
          </span>
          <span className="text-xs font-medium uppercase tracking-wider text-neutral-400">
            {hero("mockupCurrency")}
          </span>
        </div>
        <p className="mt-2 text-sm text-neutral-500">{hero("mockupItem")}</p>
      </div>

      {!compact && (
        <div className="mt-6 grid grid-cols-3 gap-2 px-6">
          <SmallStat label={t("network")} value="Toshi" />
          <SmallStat label={t("fee")} value="0.4%" />
          <SmallStat label={t("settle")} value={t("instant")} />
        </div>
      )}

      <div className="mt-6 px-6">
        <div className="flex items-center justify-between rounded-2xl border border-black/[0.06] bg-neutral-50 p-3 dark:border-white/10 dark:bg-white/[0.04]">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-900">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <rect x="3" y="6" width="18" height="13" rx="2" />
                <path d="M3 10h18" />
              </svg>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.14em] text-neutral-400">
                {hero("mockupAccount")}
              </p>
              <p className="text-sm font-medium">{t("accountDigits")}</p>
            </div>
          </div>
          <svg viewBox="0 0 24 24" className="h-4 w-4 text-neutral-400" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
            <path d="M9 6l6 6-6 6" />
          </svg>
        </div>
      </div>

      <div className="mt-5 px-6 pb-6">
        <button
          type="button"
          className="group relative flex w-full items-center justify-center gap-3 rounded-2xl bg-neutral-900 px-4 py-4 text-[15px] font-medium text-white transition-colors hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100"
        >
          <Fingerprint className="h-5 w-5" />
          {hero("mockupConfirm")}
          <span
            className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/15 dark:ring-black/10"
            aria-hidden
          />
        </button>
      </div>
    </div>
  );
}

function SmallStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-neutral-50 px-3 py-3 dark:bg-white/[0.04]">
      <p className="text-[10px] uppercase tracking-[0.14em] text-neutral-400">
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold tabular-nums">{value}</p>
    </div>
  );
}

function Fingerprint({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 11v3" />
      <path d="M9 7.5c.83-.66 1.86-1 3-1 1.14 0 2.17.34 3 1" />
      <path d="M6.5 9.5C7.7 7.8 9.7 6.7 12 6.7s4.3 1.1 5.5 2.8" />
      <path d="M5 13c.4 2.2 1.3 4.4 2.7 6" />
      <path d="M9 14.5c.2 1.8.8 3.4 1.7 4.8" />
      <path d="M13 16c.3 1 .8 1.9 1.4 2.7" />
      <path d="M19.5 15.5c.3-1 .5-2.1.5-3.2" />
    </svg>
  );
}
