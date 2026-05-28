"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";

interface HeroProps {
  onCTAClick: () => void;
}

import CardSwap, { Card } from './CardSwap';
import CurvedMarquee from './CurvedMarquee';

const AnimatedHeroCards = () => {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <CardSwap
        width={320}
        height={220}
        cardDistance={40}
        verticalDistance={50}
        delay={4000}
        pauseOnHover={true}
        skewAmount={5}
      >
        <Card style={{
          background: "#ffffff", borderRadius: "16px", boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
          padding: "20px", display: "flex", flexDirection: "column", gap: "10px",
          border: "1px solid rgba(0,0,0,0.05)"
        }}>
          <div style={{ width: "40%", height: "8px", background: "#f1f5f9", borderRadius: "4px" }} />
          <div style={{ flex: 1, background: "#f8fafc", borderRadius: "8px", border: "1px dashed #cbd5e1" }} />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ width: "20%", height: "6px", background: "#e2e8f0", borderRadius: "3px" }} />
            <div style={{ width: "20%", height: "6px", background: "#e2e8f0", borderRadius: "3px" }} />
          </div>
        </Card>

        <Card style={{
          background: "#ffffff", borderRadius: "20px", boxShadow: "0 30px 60px rgba(0,0,0,0.12)",
          padding: "24px", display: "flex", flexDirection: "column", gap: "16px",
          border: "1px solid rgba(0,0,0,0.05)"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "14px", fontWeight: 600, color: "#0f172a" }}>MRR Growth</span>
            <span style={{ fontSize: "12px", fontWeight: 700, color: "#10b981", background: "#d1fae5", padding: "4px 8px", borderRadius: "12px" }}>+22%</span>
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: "8px", flex: 1, paddingBottom: "10px" }}>
            {[30, 45, 35, 60, 55, 80, 100].map((h, i) => (
              <div key={i} style={{ flex: 1, height: `${h}%`, background: h === 100 ? "linear-gradient(to top, #3b82f6, #8b5cf6)" : "#e2e8f0", borderRadius: "4px 4px 0 0" }} />
            ))}
          </div>
        </Card>

        <Card style={{
          background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)", borderRadius: "16px", boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
          padding: "20px", display: "flex", flexDirection: "column", justifyContent: "center", gap: "12px",
          border: "1px solid rgba(255,255,255,0.8)", backdropFilter: "blur(10px)"
        }}>
          <div style={{ fontSize: "13px", fontWeight: 600, color: "#64748b" }}>Capital Raised</div>
          <div style={{ fontSize: "32px", fontWeight: 800, color: "#0f172a", letterSpacing: "-1px" }}>$2.4M</div>
          <div style={{ width: "100%", height: "6px", background: "#e2e8f0", borderRadius: "3px", overflow: "hidden" }}>
            <div style={{ width: "75%", height: "100%", background: "#3b82f6", borderRadius: "3px" }} />
          </div>
        </Card>
      </CardSwap>
    </div>
  );
};

export default function HeroSection({ onCTAClick: _onCTAClick }: HeroProps) {
  const scrollDown = () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };

  const { scrollY } = useScroll();

  // Decrease the blur effect slightly per user request
  const videoBlur = useTransform(scrollY, [0, 400], ["blur(2px)", "blur(12px)"]);

  // Add a white wash effect that fades in
  const whiteOverlayOpacity = useTransform(scrollY, [0, 400], [0, 0.25]);

  // Move the text downwards as the user scrolls
  const textY = useTransform(scrollY, [0, 800], [0, 300]);

  return (
    <section
      style={{
        position: "sticky",
        top: 0,
        zIndex: 0,
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        paddingTop: "6rem",
      }}
    >
      {/* Animated Background Image */}
      <motion.div
        style={{
          position: "absolute",
          width: "120%",
          height: "120%",
          left: "-10%",
          top: "-10%",
          backgroundImage: "url('/background.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: 0,
          animation: "wave-pan 20s infinite alternate ease-in-out"
        }}
      />




      {/* Content */}
      <motion.div
        className="container-xl"
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "2rem",
          position: "relative",
          zIndex: 3,
          y: textY,
          marginTop: "-3vh", // Base offset
          width: "100%",
          padding: "0 2rem",
        }}
      >
        {/* LEFT COLUMN: Text */}
        <div style={{ flex: "1 1 45%", textAlign: "left", maxWidth: "600px", marginTop: "-12vh", marginLeft: "8%" }}>
          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            style={{
              marginBottom: "1.5rem",
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(3rem, 6.5vw, 5.5rem)", fontWeight: 800,
              lineHeight: 1,
              letterSpacing: "-0.04em", color: "#ffffff",
              textShadow: "none",
            }}
          >
            Create.
            <br />
            Convert.
            <br />
            <span style={{
              background: "linear-gradient(90deg, #93c5fd 0%, #3b82f6 50%, #1e40af 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              color: "transparent"
            }}>
              Scale.
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            style={{
              fontSize: "clamp(1rem, 1.3vw, 1.15rem)",
              margin: "0 0 2.5rem", lineHeight: 1.6, fontWeight: 500,
              color: "rgba(255,255,255,0.85)",
              textShadow: "none",
              maxWidth: "500px"
            }}
          >
            Leading founders use ZTH to revolutionise their fundraising – from seed preparation into global markets to building scalable infrastructure.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          >
            <button
              onClick={_onCTAClick}
              style={{
                background: "#ffffff", color: "#0f172a",
                padding: "0.875rem 1.75rem", borderRadius: "100px",
                fontWeight: 700, fontSize: "1.1rem",
                border: "none", cursor: "pointer",
                display: "inline-flex", alignItems: "center", gap: "8px",
                transition: "all 0.2s ease",
                boxShadow: "0 4px 14px rgba(0,0,0,0.1)"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#f8fafc";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#ffffff";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 14px rgba(0,0,0,0.1)";
              }}
            >
              Book a call <ChevronDown size={20} strokeWidth={3} style={{ transform: 'rotate(-90deg)' }} />
            </button>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: Animated Cards */}
        <div style={{ flex: "1 1 50%", position: "relative", height: "700px", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <AnimatedHeroCards />
        </div>
      </motion.div>

      {/* Curved Marquee layered over the wavy background at the bottom of the Hero Section */}
      <div style={{ position: "absolute", bottom: "-3vh", width: "100%", zIndex: 10 }}>
        <CurvedMarquee />
      </div>



      <style jsx>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes wave-pan {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-3%, 2%) scale(1.05); }
          100% { transform: translate(2%, -3%) scale(1); }
        }
      `}</style>
    </section>
  );
}
