import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  asChild?: never;
  children?: ReactNode;
};

const variantClass: Record<Variant, string> = {
  primary:
    "bg-foreground text-background hover:bg-foreground/90 active:bg-foreground/80",
  secondary:
    "bg-foreground/5 text-foreground hover:bg-foreground/10 active:bg-foreground/15 dark:bg-white/5 dark:hover:bg-white/10",
  ghost:
    "bg-transparent text-foreground hover:bg-foreground/5 dark:hover:bg-white/5",
  outline:
    "bg-transparent text-foreground border border-foreground/15 hover:border-foreground/40 hover:bg-foreground/[0.03] dark:border-white/15 dark:hover:border-white/35",
};

const sizeClass: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-[15px]",
  lg: "h-12 px-6 text-base",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    { className, variant = "primary", size = "md", children, ...props },
    ref,
  ) {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-[-0.005em] transition-colors focus-ring will-change-transform",
          variantClass[variant],
          sizeClass[size],
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);
