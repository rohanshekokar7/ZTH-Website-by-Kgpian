"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

import Loader from "@/components/Loader";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ValuePropositionSection from "@/components/ValuePropositionSection";
import PitchDeckSection from "@/components/PitchDeckSection";
import MockRoomSection from "@/components/MockRoomSection";
import TractionSection from "@/components/TractionSection";
import TestimonialsAndLogos from "@/components/TestimonialsAndLogos";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import PitchDeckServices from "@/components/PitchDeckServices";

export default function HomePage() {
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();

  const handleLoaderComplete = useCallback(() => setLoaded(true), []);
  const goToBook = useCallback(() => router.push("/book"), [router]);

  return (
    <>
      {/* Loader */}
      {!loaded && <Loader onComplete={handleLoaderComplete} />}

      {/* Main app  */}
      <div
        style={{
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.6s ease",
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
            <PitchDeckServices />
            <MockRoomSection onCTAClick={goToBook} />
            <TractionSection />
            <TestimonialsAndLogos />
            <CTASection onCTAClick={goToBook} />
          </div>
        </main>

        <Footer onCTAClick={goToBook} />
      </div>
    </>
  );
}
