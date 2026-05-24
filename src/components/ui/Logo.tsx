import { cn } from "@/lib/cn";

export function Logo({
  className,
  withWordmark = true,
}: {
  className?: string;
  withWordmark?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-foreground",
        className,
      )}
      aria-label="Toshi"
    >
      <svg
        viewBox="0 0 32 32"
        className="h-7 w-7"
        aria-hidden="true"
      >
        <rect
          x="0.75"
          y="0.75"
          width="30.5"
          height="30.5"
          rx="8"
          fill="currentColor"
        />
        <path
          d="M9 11.5h14M16 11.5v12"
          stroke="var(--background)"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
      </svg>
      {withWordmark && (
        <span
          className="font-display text-[1.35rem] font-semibold tracking-tight"
          style={{ letterSpacing: "-0.04em" }}
        >
          Toshi
        </span>
      )}
    </span>
  );
}
