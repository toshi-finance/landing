"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { gsap, useGSAP } from "@/lib/gsap";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PaymentSheet } from "@/components/mockups/PaymentSheet";
import { MerchantDashboard } from "@/components/mockups/MerchantDashboard";
import { PasskeyPrompt } from "@/components/mockups/PasskeyPrompt";
import { cn } from "@/lib/cn";

type TabKey = "checkout" | "dashboard" | "passkey";

export function Product() {
  const t = useTranslations("product");
  const ref = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [tab, setTab] = useState<TabKey>("checkout");

  const tabs: { key: TabKey; label: string; title: string; body: string }[] = [
    { key: "checkout", label: t("tab1"), title: t("panel1Title"), body: t("panel1Body") },
    { key: "dashboard", label: t("tab2"), title: t("panel2Title"), body: t("panel2Body") },
    { key: "passkey", label: t("tab3"), title: t("panel3Title"), body: t("panel3Body") },
  ];
  const bullets = t.raw("bullets") as string[];

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          reduced: "(prefers-reduced-motion: reduce)",
        },
        (ctx) => {
          if (!ctx.conditions?.motion) return;
          gsap.from("[data-product-reveal]", {
            opacity: 0,
            y: 28,
            duration: 0.9,
            ease: "expo.out",
            stagger: 0.08,
            scrollTrigger: {
              trigger: ref.current,
              start: "top 70%",
              once: true,
            },
          });
          if (stageRef.current) {
            gsap.to(stageRef.current, {
              y: -16,
              ease: "none",
              scrollTrigger: {
                trigger: ref.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.8,
              },
            });
          }
        },
      );
      return () => mm.revert();
    },
    { scope: ref, dependencies: [] },
  );

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          "[data-active-mockup]",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.55, ease: "expo.out" },
        );
      });
      return () => mm.revert();
    },
    { scope: ref, dependencies: [tab] },
  );

  const active = tabs.find((tt) => tt.key === tab)!;

  return (
    <section ref={ref} id="product" className="bg-foreground/[0.025] py-24 dark:bg-white/[0.02] md:py-32">
      <div className="container-screen">
        <div data-product-reveal>
          <SectionHeader
            align="center"
            eyebrow={t("eyebrow")}
            title={t("title")}
            subtitle={t("subtitle")}
          />
        </div>

        <div data-product-reveal className="mt-10 flex justify-center">
          <div className="inline-flex flex-wrap items-center gap-1 rounded-full border border-foreground/10 bg-background p-1 text-sm dark:border-white/10">
            {tabs.map((tt) => (
              <button
                key={tt.key}
                type="button"
                onClick={() => setTab(tt.key)}
                className={cn(
                  "rounded-full px-4 py-2 font-medium transition-colors focus-ring",
                  tt.key === tab
                    ? "bg-foreground text-background"
                    : "text-muted hover:text-foreground",
                )}
              >
                {tt.label}
              </button>
            ))}
          </div>
        </div>

        <div
          ref={stageRef}
          data-product-reveal
          className="mt-12 grid items-center gap-10 md:grid-cols-12"
        >
          <div className="md:col-span-5">
            <h3 className="font-display text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
              {active.title}
            </h3>
            <p className="mt-4 text-lg leading-relaxed text-muted">{active.body}</p>
            <ul className="mt-6 space-y-2 text-[15px] text-muted">
              {bullets.map((bullet) => (
                <Li key={bullet}>{bullet}</Li>
              ))}
            </ul>
          </div>
          <div className="relative flex min-h-[420px] items-center justify-center md:min-h-[520px] md:col-span-7">
            <div key={tab} data-active-mockup className="w-full flex justify-center">
              {tab === "checkout" && <PaymentSheet />}
              {tab === "dashboard" && <MerchantDashboard />}
              {tab === "passkey" && <PasskeyPrompt />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Li({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-[0.7em] h-px w-4 shrink-0 bg-foreground/25" aria-hidden />
      <span>{children}</span>
    </li>
  );
}
