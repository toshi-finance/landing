import { setRequestLocale } from "next-intl/server";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Ticker } from "@/components/sections/Ticker";
import { Problem } from "@/components/sections/Problem";
import { Solution } from "@/components/sections/Solution";
import { TwoSides } from "@/components/sections/TwoSides";
import { Network } from "@/components/sections/Network";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Statement } from "@/components/sections/Statement";
import { Benefits } from "@/components/sections/Benefits";
import { ForWhom } from "@/components/sections/ForWhom";
import { Security } from "@/components/sections/Security";
import { FinalCta } from "@/components/sections/FinalCta";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Navbar />
      <main className="relative">
        <Hero />
        <Ticker />
        <Problem />
        <Solution />
        <TwoSides />
        <Network />
        <HowItWorks />
        <Statement />
        <Benefits />
        <ForWhom />
        <Security />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
