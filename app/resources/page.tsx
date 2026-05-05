"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";

import Header from "@/components/Header";
import FundingSection from "@/components/FundingSection";
import ConsultationSection from "@/components/ConsultationSection";
import InsiderSection from "@/components/InsiderSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function ResourcesPage() {
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();

  const goToBook = useCallback(() => router.push("/book"), [router]);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      <div
        style={{
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.6s ease",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Header onBookNow={goToBook} />

        <main style={{ paddingTop: "80px" }}>
          {/* Header section for the new page to avoid sudden jump into components */}
          <section className="section-pad" style={{ background: "#F5F7FA", textAlign: "center" }}>
            <div className="container-xl">
              <h1 className="heading-lg" style={{ color: "#1A1A1A", marginBottom: "1rem" }}>
                Resources & Insights
              </h1>
              <p className="text-body" style={{ maxWidth: 600, margin: "0 auto", fontSize: "1.1rem" }}>
                Explore our funding strategies, client success stories, and latest insights on capital acquisition.
              </p>
            </div>
          </section>

          <FundingSection onCTAClick={goToBook} />
          <InsiderSection onCTAClick={goToBook} />
          <ConsultationSection onCTAClick={goToBook} />
          <CTASection onCTAClick={goToBook} />
        </main>

        <Footer onCTAClick={goToBook} />
      </div>
    </>
  );
}
