import { cn } from "@/lib/cn";
import { Badge } from "./Badge";
import type { ReactNode } from "react";

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
  className?: string;
  children?: ReactNode;
}) {
  return (
    <header
      className={cn(
        "flex flex-col gap-5",
        align === "center" ? "items-center text-center" : "items-start",
        className,
      )}
    >
      {eyebrow && <Badge>{eyebrow}</Badge>}
      <h2
        className={cn(
          "max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight",
          "sm:text-5xl md:text-[3.5rem] lg:text-[4rem]",
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="max-w-2xl text-lg leading-relaxed text-muted">
          {subtitle}
        </p>
      )}
      {children}
    </header>
  );
}
