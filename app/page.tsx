"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

import Loader from "@/components/Loader";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";

/* ── Below-the-fold sections: code-split via dynamic imports ────────
   These components are NOT in the initial JS bundle. They load in the
   background once the hero is visible, eliminating ~200KB+ of
   parse-blocking JavaScript from the critical path. ──────────────── */
const ValuePropositionSection = dynamic(() => import("@/components/ValuePropositionSection"), { ssr: false });
const PitchDeckSection        = dynamic(() => import("@/components/PitchDeckSection"),        { ssr: false });
const PitchDeckServices       = dynamic(() => import("@/components/PitchDeckServices"),       { ssr: false });
const TractionSection         = dynamic(() => import("@/components/TractionSection"),         { ssr: false });
const MockRoomSection         = dynamic(() => import("@/components/MockRoomSection"),         { ssr: false });
const ServicesSection         = dynamic(() => import("@/components/ServicesSection"),          { ssr: false });
const FundingSection          = dynamic(() => import("@/components/FundingSection"),           { ssr: false });
const ConsultationSection     = dynamic(() => import("@/components/ConsultationSection"),     { ssr: false });
const InsiderSection          = dynamic(() => import("@/components/InsiderSection"),           { ssr: false });
const CTASection              = dynamic(() => import("@/components/CTASection"),               { ssr: false });
const Footer                  = dynamic(() => import("@/components/Footer"),                   { ssr: false });

export default function HomePage() {
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();

  const handleLoaderComplete = useCallback(() => setLoaded(true), []);
  const goToBook = useCallback(() => router.push("/book"), [router]);

  return (
    <>
      {/* Smart Page Loader */}
      {!loaded && <Loader onComplete={handleLoaderComplete} />}

      {/* Main app  */}
      <div
        style={{
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Header onBookNow={goToBook} />

        <main>
          <HeroSection onCTAClick={goToBook} />
          
          {/* Wrapper for remaining sections so they slide over the sticky Hero */}
          <div style={{ position: "relative", zIndex: 10, background: "#ffffff", boxShadow: "0 -20px 40px rgba(0, 0, 0, 0.05)" }}>
            <ValuePropositionSection onCTAClick={goToBook} />
            <PitchDeckSection onCTAClick={goToBook} />
            <TractionSection />
            <MockRoomSection onCTAClick={goToBook} />
            <ServicesSection onCTAClick={goToBook} />
            <FundingSection onCTAClick={goToBook} />
            <ConsultationSection onCTAClick={goToBook} />
            <InsiderSection onCTAClick={goToBook} />
            <CTASection onCTAClick={goToBook} />
          </div>
        </main>

        <Footer onCTAClick={goToBook} />
      </div>
    </>
  );
}
