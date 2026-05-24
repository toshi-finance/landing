"use client";

import { useRef, useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/cn";

export function FinalCta() {
  const t = useTranslations("finalCta");
  const ref = useRef<HTMLElement>(null);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const lines = gsap.utils.toArray<HTMLElement>("[data-final-line]");
        gsap.from(lines, {
          yPercent: 110,
          duration: 1.1,
          ease: "expo.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 75%",
            once: true,
          },
        });
        gsap.from("[data-final-cta]", {
          opacity: 0,
          y: 24,
          duration: 0.9,
          ease: "expo.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 55%",
            once: true,
          },
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  }

  return (
    <section
      ref={ref}
      id="cta"
      className="always-dark relative isolate overflow-hidden py-32 md:py-44"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-80"
      >
        <div className="absolute left-1/2 top-1/2 h-[640px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-mint/25 blur-[160px]" />
        <div className="absolute left-[15%] top-[20%] h-[280px] w-[280px] rounded-full bg-foreground/[0.06] blur-[120px]" />
      </div>

      <div className="container-screen text-center">
        <p className="font-mono text-[12px] font-medium uppercase tracking-[0.22em] text-foreground/60">
          / {t("eyebrow")}
        </p>

        <h2
          className="mt-8 font-display font-semibold leading-[0.92] tracking-[-0.04em] text-foreground"
          style={{ fontSize: "clamp(3rem, 12vw, 11rem)" }}
        >
          <span className="block overflow-hidden pb-[0.04em]">
            <span data-final-line className="inline-block">
              {t("title")}
            </span>
          </span>
        </h2>

        <p
          data-final-cta
          className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-foreground/70"
        >
          {t("body")}
        </p>

        <form
          data-final-cta
          onSubmit={onSubmit}
          className="mx-auto mt-10 flex w-full max-w-md flex-col gap-2 sm:flex-row"
        >
          <label className="sr-only" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("placeholder")}
            className={cn(
              "h-12 flex-1 rounded-full border border-foreground/20 bg-foreground/[0.06] px-5 text-[15px] text-foreground placeholder:text-foreground/40 focus-ring",
            )}
          />
          <button
            type="submit"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-foreground px-6 text-[15px] font-medium text-background transition-colors hover:bg-foreground/90 focus-ring"
          >
            {submitted ? "✓ Listo" : t("submit")}
          </button>
        </form>
        {submitted && (
          <p
            data-final-cta
            className="mt-4 text-sm text-foreground/70"
          >
            ¡Listo! Te avisamos en cuanto Toshi esté disponible.
          </p>
        )}

        <div
          data-final-cta
          className="mt-8 flex flex-col items-center justify-center gap-2 text-sm text-foreground/60 sm:flex-row"
        >
          <span>{t("ctaSecondary")}:</span>
          <a
            href="mailto:hello@toshi.app"
            className="text-foreground underline-offset-4 hover:underline"
          >
            hello@toshi.app
          </a>
        </div>
      </div>
    </section>
  );
}
