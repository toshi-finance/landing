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
      <img
        src="/images/toshi-icon-transparent.png"
        alt=""
        className="h-7 w-7 object-contain"
        aria-hidden="true"
      />
      {withWordmark && (
        <span
          className="font-display text-[1.35rem] font-semibold"
        >
          Toshi
        </span>
      )}
    </span>
  );
}
