import { cn } from "@/lib/cn";

type LogoTone = "auto" | "dark" | "light";

export function Logo({
  className,
  tone = "auto",
  withWordmark = true,
}: {
  className?: string;
  tone?: LogoTone;
  withWordmark?: boolean;
}) {
  const isDarkMark = tone === "dark";
  const isLightMark = tone === "light";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-foreground",
        isLightMark && "text-white",
        isDarkMark && "text-neutral-950",
        className,
      )}
      aria-label="Toshi"
    >
      {tone === "auto" ? (
        <>
          <img
            src="/images/toshi-logo-black.png"
            alt=""
            className="h-7 w-7 object-contain dark:hidden"
            aria-hidden="true"
          />
          <img
            src="/images/toshi-logo-white.png"
            alt=""
            className="hidden h-7 w-7 object-contain dark:block"
            aria-hidden="true"
          />
        </>
      ) : (
        <img
          src={
            isLightMark
              ? "/images/toshi-logo-white.png"
              : "/images/toshi-logo-black.png"
          }
          alt=""
          className="h-7 w-7 object-contain"
          aria-hidden="true"
        />
      )}
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
