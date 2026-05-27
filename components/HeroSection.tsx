"use client";

import { motion } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";

interface HeroProps {
  onCTAClick: () => void;
}

export default function HeroSection({ onCTAClick: _onCTAClick }: HeroProps) {
  const scrollDown = () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };

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
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          left: 0,
          top: 0,
          objectFit: "cover",
          zIndex: 0,
          filter: "blur(2px)",
        }}
      >
        <source src="/background.mp4" type="video/mp4" />
      </video>

      {/* Very subtle bottom fade so scroll indicator stays legible */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "180px",
          background: "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.3) 100%)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />


      {/* Content */}
      <div className="container-xl" style={{ textAlign: "center", position: "relative", zIndex: 3, transform: "translateY(-1.5vh)" }}>
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}
          style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            padding: "0.5rem 1.25rem",
            background: "rgba(0,0,0,0.05)",
            border: "1px solid rgba(0,0,0,0.15)",
            borderRadius: "100px", marginBottom: "2.5rem",
            cursor: "default", transition: "all 0.3s ease",
            backdropFilter: "blur(8px)",
          }}
        >
          <Sparkles size={14} color="#1976D2" />
          <span style={{
            fontFamily: "'Inter', sans-serif", fontSize: "0.7rem", fontWeight: 600,
            letterSpacing: "0.2em", textTransform: "uppercase", color: "#000000",
          }}>
            Comprehensive Capital Advisory
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          style={{
            marginBottom: "1.5rem", maxWidth: 900, margin: "0 auto 1.5rem",
            fontSize: "clamp(3rem, 6.5vw, 5.5rem)", fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-0.025em", color: "#000000",
            textShadow: "none",
          }}
        >
          Create.
          <br />
          Convert.
          <br />
          <span style={{ color: "#1976D2" }}>
            Scale.
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          style={{
            fontSize: "clamp(1.05rem, 1.4vw, 1.2rem)", maxWidth: 650,
            margin: "0 auto 3rem", lineHeight: 1.7, fontWeight: 400,
            color: "rgba(0,0,0,0.85)",
            textShadow: "none",
          }}
        >
          End-to-end startup fundraising infrastructure combining AI tools, strategic advisory, and execution support for founders building scalable companies.
        </motion.p>

        {/* CTAs */}
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollDown}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        style={{
          position: "absolute", bottom: "2.5rem", left: "50%",
          transform: "translateX(-50%)", background: "none", border: "none",
          cursor: "pointer", display: "flex", flexDirection: "column",
          alignItems: "center", gap: "0.5rem", color: "rgba(0,0,0,0.7)",
        }}
        whileHover={{ color: "#000000" }}
      >
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.7rem", letterSpacing: "0.2em" }}>
          SCROLL
        </span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
          <ChevronDown size={18} />
        </motion.div>
      </motion.button>

      <style jsx>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </section>
  );
}
