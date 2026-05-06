"use client";

import { motion } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";

interface HeroProps {
  onCTAClick: () => void;
}

export default function HeroSection({ onCTAClick }: HeroProps) {
  const scrollDown = () => {
    const el = document.querySelector("#pitch-deck");
    if (el) el.scrollIntoView({ behavior: "smooth" });
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
          background: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.25) 100%)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* Floating orbs */}
      <motion.div
        animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute", top: "15%", right: "8%",
          width: 350, height: 350, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(25,118,210,0.06) 0%, transparent 65%)",
          filter: "blur(50px)", pointerEvents: "none",
          zIndex: 2,
        }}
      />
      <motion.div
        animate={{ y: [0, 15, 0], x: [0, -8, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        style={{
          position: "absolute", bottom: "20%", left: "5%",
          width: 280, height: 280, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(25,118,210,0.05) 0%, transparent 65%)",
          filter: "blur(50px)", pointerEvents: "none",
          zIndex: 2,
        }}
      />

      {/* Content */}
      <div className="container-xl" style={{ textAlign: "center", position: "relative", zIndex: 3 }}>
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.05, boxShadow: "0 6px 20px rgba(25,118,210,0.12)" }}
          style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            padding: "0.5rem 1.25rem",
            background: "rgba(255,255,255,0.12)",
            border: "1px solid rgba(255,255,255,0.25)",
            borderRadius: "100px", marginBottom: "2.5rem",
            cursor: "default", transition: "all 0.3s ease",
            backdropFilter: "blur(8px)",
          }}
        >
          <motion.div animate={{ rotate: [0, 180, 360] }} transition={{ duration: 3, repeat: Infinity }}>
            <Sparkles size={14} color="#1976D2" />
          </motion.div>
          <span style={{
            fontFamily: "'Inter', sans-serif", fontSize: "0.7rem", fontWeight: 600,
            letterSpacing: "0.2em", textTransform: "uppercase", color: "#ffffff",
          }}>
            Comprehensive Capital Advisory
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          style={{
            marginBottom: "1.5rem", maxWidth: 900, margin: "0 auto 1.5rem",
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 800,
            fontFamily: "'Inter', sans-serif", lineHeight: 1.08,
            letterSpacing: "-0.03em", color: "#ffffff",
            textShadow: "0 2px 20px rgba(0,0,0,0.4)",
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
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
          style={{
            fontSize: "clamp(1rem, 2.2vw, 1.25rem)", maxWidth: 650,
            margin: "0 auto 3rem", lineHeight: 1.6, fontWeight: 400,
            color: "rgba(255,255,255,0.85)", fontFamily: "'Inter', sans-serif",
            textShadow: "0 1px 8px rgba(0,0,0,0.3)",
          }}
        >
          Accelerate your capital acquisition strategy with sophisticated, AI-driven presentation development designed to engage institutional investors and facilitate scalable growth.
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
          alignItems: "center", gap: "0.5rem", color: "rgba(255,255,255,0.7)",
        }}
        whileHover={{ color: "#ffffff" }}
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
