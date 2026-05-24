import { cn } from "@/lib/cn";

const txs = [
  { name: "Lucia M.", note: "Mesa de centro", amount: "+ $428.50", time: "Just now" },
  { name: "Andrés P.", note: "Suscripción · Junio", amount: "+ $24.00", time: "2h" },
  { name: "Camila R.", note: "Producto digital", amount: "+ $189.00", time: "Yesterday" },
];

export function WalletCard({ className }: { className?: string }) {
  return (
    <div
      data-mockup="wallet"
      className={cn(
        "relative w-full max-w-[420px] overflow-hidden rounded-[28px] border border-black/5 bg-white p-6 text-neutral-900 shadow-[0_30px_80px_-30px_rgba(10,10,10,0.4),0_8px_24px_-12px_rgba(10,10,10,0.2)]",
        "dark:border-white/10 dark:bg-[#1a1a1a] dark:text-neutral-100",
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-[0.16em] text-neutral-400">
            Total balance
          </p>
          <p className="mt-1 font-display text-[40px] font-semibold leading-none tracking-tight">
            $12,840<span className="text-neutral-400">.32</span>
          </p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-900">
          <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden>
            <path d="M12 5v14M5 12h14" />
          </svg>
        </div>
      </div>

      <div className="mt-5 flex items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[12px] font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
          +18.4% · 30d
        </span>
        <span className="text-[12px] text-neutral-400">vs last month</span>
      </div>

      <div className="mt-6 space-y-3">
        <p className="text-[11px] uppercase tracking-[0.16em] text-neutral-400">
          Recent activity
        </p>
        <ul className="space-y-2">
          {txs.map((tx) => (
            <li
              key={tx.name}
              className="flex items-center justify-between rounded-2xl border border-black/[0.05] bg-neutral-50 p-3 dark:border-white/10 dark:bg-white/[0.04]"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[12px] font-semibold uppercase tracking-wide text-neutral-700 ring-1 ring-black/5 dark:bg-white/10 dark:text-neutral-100 dark:ring-white/10">
                  {tx.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium leading-tight">{tx.name}</p>
                  <p className="text-[12px] text-neutral-400">{tx.note}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold tabular-nums">{tx.amount}</p>
                <p className="text-[11px] text-neutral-400">{tx.time}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
