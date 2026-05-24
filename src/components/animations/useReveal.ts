"use client";

import { useRef, type RefObject } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";

/**
 * Scoped reveal. Elements are visible by default (no FOUC, SEO friendly).
 * When they enter the viewport we batch them and play a subtle entrance.
 * Uses ScrollTrigger.batch so items already past the viewport snap visible
 * and items below animate when scrolled into view.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(): RefObject<T | null> {
  const ref = useRef<T>(null);

  useGSAP(
    () => {
      if (!ref.current) return;

      const mm = gsap.matchMedia();
      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          reduced: "(prefers-reduced-motion: reduce)",
        },
        (ctx) => {
          if (!ctx.conditions?.motion) return;

          const root = ref.current!;
          const items = Array.from(
            root.querySelectorAll<HTMLElement>("[data-reveal]"),
          );

          items.forEach((el) => {
            const children = Array.from(
              el.querySelectorAll<HTMLElement>("[data-reveal-child]"),
            );
            const targets = children.length ? children : [el];

            ScrollTrigger.batch(targets, {
              start: "top 88%",
              once: true,
              onEnter: (batch) => {
                gsap.from(batch, {
                  opacity: 0,
                  y: 24,
                  duration: 0.85,
                  ease: "expo.out",
                  stagger: 0.07,
                  overwrite: "auto",
                });
              },
            });
          });
        },
      );

      return () => mm.revert();
    },
    { scope: ref },
  );

  return ref;
}
