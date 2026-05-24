"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";

import Loader from "@/components/Loader";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CurvedMarquee from "@/components/CurvedMarquee";
import PitchDeckSection from "@/components/PitchDeckSection";
import MockRoomSection from "@/components/MockRoomSection";
import TestimonialsAndLogos from "@/components/TestimonialsAndLogos";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import PitchDeckServices from "@/components/PitchDeckServices";
import CapitalSection from "@/components/CapitalSection";

export default function HomePage() {
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (sessionStorage.getItem("app_loaded") === "true") {
        setLoaded(true);
      }
    }
  }, []);

  const handleLoaderComplete = useCallback(() => {
    setLoaded(true);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("app_loaded", "true");
    }
  }, []);

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
          <div style={{ position: "relative", zIndex: 10, background: "#FFFFFF", boxShadow: "0 -20px 40px rgba(0, 0, 0, 0.05)" }}>
            <CurvedMarquee />
            <PitchDeckServices />
            <CapitalSection />
            <MockRoomSection />
            <TestimonialsAndLogos />
            <CTASection onCTAClick={goToBook} />
          </div>
        </main>

        <Footer onCTAClick={goToBook} />
      </div>
    </>
  );
}
