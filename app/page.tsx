"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";

import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import TestimonialsAndLogos from "@/components/TestimonialsAndLogos";
import Footer from "@/components/Footer";
import CapitalSection from "@/components/CapitalSection";
import CapitalNetworkSection from "@/components/CapitalNetworkSection";
import ValuePropositionSection from "@/components/ValuePropositionSection";

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
          <HeroSection />

          {/* Wrapper for remaining sections so they slide over the sticky Hero */}
          <div style={{ position: "relative", zIndex: 10, background: "#FFFFFF", boxShadow: "0 -20px 40px rgba(0, 0, 0, 0.05)" }}>

            <div id="pre-fundraising">
              <ValuePropositionSection onCTAClick={goToBook} />
            </div>

            <div id="capital-network">
              <CapitalNetworkSection />
            </div>
            <div id="growth-strategic-partnership">
              <CapitalSection />
            </div>
            <div id="mock-room">
              <MockRoomSection />
            </div>

            <TestimonialsAndLogos />
            <div id="zth-insider">
              <ZthInsiderSection />
            </div>

          </div>
        </main>

        <Footer onCTAClick={goToBook} />
      </div>
    </>
  );
}
