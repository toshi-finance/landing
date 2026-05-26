"use client";

import { useRef } from "react";
import { useLocale } from "next-intl";
import { gsap, useGSAP } from "@/lib/gsap";

export function Statement() {
  const locale = useLocale();
  const ref = useRef<HTMLElement>(null);

  const isEs = locale === "es";

  // 3 parts: prefix, accent word (mint), suffix
  const parts = isEs
    ? [
        ["Paga en", "segundos", "."],
        ["Cobra sin pedir", "permiso", "."],
        ["Conserva el", "control", " de tu dinero."],
      ]
    : [
        ["Pay in", "seconds", "."],
        ["Get paid without", "permission", "."],
        ["Keep", "control", " of your money."],
      ];

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const lines = gsap.utils.toArray<HTMLElement>("[data-statement-line]");
        gsap.from(lines, {
          opacity: 0,
          y: 36,
          duration: 1.1,
          ease: "expo.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 70%",
            once: true,
          },
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="py-32 md:py-48">
      <div className="container-screen">
        <p className="font-display font-semibold leading-[1.02] tracking-[-0.035em] text-foreground" style={{ fontSize: "clamp(2.5rem, 7.2vw, 6.5rem)" }}>
          {parts.map((line, i) => (
            <span
              key={i}
              data-statement-line
              className="block"
            >
              {line[0]}{" "}
              <span className="italic font-light text-mint">{line[1]}</span>
              {line[2]}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
