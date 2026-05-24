import { useTranslations } from "next-intl";
import { cn } from "@/lib/cn";

export function PasskeyPrompt({ className }: { className?: string }) {
  const t = useTranslations("mockups.passkey");

  return (
    <div
      data-mockup="passkey"
      className={cn(
        "relative w-full max-w-[380px] overflow-hidden rounded-2xl border border-black/5 bg-white/95 p-6 text-neutral-900 shadow-[0_30px_80px_-30px_rgba(10,10,10,0.4)] backdrop-blur",
        "dark:border-white/10 dark:bg-[#1a1a1a]/95 dark:text-neutral-100",
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-400">
          {t("eyebrow")}
        </p>
        <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
          {t("status")}
        </span>
      </div>

      <h3 className="mt-4 text-[20px] font-semibold tracking-tight">
        {t("title")}
      </h3>
      <p className="mt-1 text-sm text-neutral-500">
        {t("body")}
      </p>

      <div className="mt-7 flex justify-center">
        <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-neutral-100 dark:bg-white/[0.06]">
          <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-emerald-400/40" />
          <span className="absolute inset-2 animate-pulse rounded-full ring-1 ring-emerald-400/30" />
          <svg
            viewBox="0 0 64 64"
            className="h-16 w-16 text-neutral-700 dark:text-neutral-100"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M32 14c-7.5 0-13.5 5.4-13.5 12v3" />
            <path d="M45.5 29v-3c0-2.6-.9-5-2.5-7" />
            <path d="M22.5 32c0 7.5 2 14.5 6 19.5" />
            <path d="M28 30c0-2.2 1.8-4 4-4s4 1.8 4 4v5c0 6-1.5 10.5-4 14" />
            <path d="M37 36c0 5-1 9-3 12.5" />
            <path d="M42 32c0 4-.5 7-1.5 10" />
          </svg>
        </div>
      </div>

      <div className="mt-7 flex items-center justify-between rounded-2xl border border-black/[0.06] bg-neutral-50 p-3 text-[13px] dark:border-white/10 dark:bg-white/[0.04]">
        <span className="text-neutral-500">{t("amount")}</span>
        <span className="font-semibold tabular-nums">{t("total")}</span>
      </div>
    </div>
  );
}
