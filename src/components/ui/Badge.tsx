import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

export function Badge({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex text-[12px] font-semibold uppercase tracking-[0.18em] text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}
