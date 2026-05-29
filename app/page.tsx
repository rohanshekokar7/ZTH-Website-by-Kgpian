"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";

import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import TestimonialsAndLogos from "@/components/TestimonialsAndLogos";
import Footer from "@/components/Footer";
import CapitalSection from "@/components/CapitalSection";
import CapitalNetworkSection from "@/components/CapitalNetworkSection";
import CardShowcaseSection from "@/components/CardShowcaseSection";
import MockRoomSection from "@/components/MockRoomSection";
import ZthInsiderSection from "@/components/ZthInsiderSection";

export default function HomePage() {
  const router = useRouter();

  const goToBook = useCallback(() => router.push("/book"), [router]);

  return (
    <>
      {/* Main app  */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
        }}
      >
        <Header onBookNow={goToBook} />

        <main>
          <HeroSection onCTAClick={goToBook} />

          {/* Wrapper for remaining sections so they slide over the sticky Hero */}
          <div style={{ position: "relative", zIndex: 10, background: "#FFFFFF", boxShadow: "0 -20px 40px rgba(0, 0, 0, 0.05)" }}>
            <CardShowcaseSection />
            <div id="strategic-partnership">
              <CapitalNetworkSection />
            </div>
            <div id="post-fundraise">
              <CapitalSection />
            </div>
            <div id="mock-room">
              <MockRoomSection />
            </div>

            <TestimonialsAndLogos />
            <ZthInsiderSection />

          </div>
        </main>

        <Footer onCTAClick={goToBook} />
      </div>
    </>
  );
}
