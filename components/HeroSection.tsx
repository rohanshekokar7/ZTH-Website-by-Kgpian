"use client";

import { motion } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";
import dynamic from "next/dynamic";
import { TextScramble } from "@/components/ui/text-scramble";

const ZTHCoin3D = dynamic(() => import("./ZTHCoin3D"), { ssr: false });

interface HeroProps {
  onCTAClick: () => void;
}

export default function HeroSection({ onCTAClick }: HeroProps) {
  const scrollDown = () => {
    const el = document.querySelector("#pitch-deck");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="hero-section">
      {/* Background Video */}
      <video
        autoPlay loop muted playsInline preload="none"
        className="hero-video"
      >
        <source src="/background.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="hero-overlay" />

      {/* Floating ambient orbs (commented out for performance) */}
      {/* <motion.div
        animate={{ y: [0, -22, 0], x: [0, 12, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="hero-orb hero-orb--tr"
      />
      <motion.div
        animate={{ y: [0, 16, 0], x: [0, -10, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="hero-orb hero-orb--bl"
      /> */}

      {/* ── Two-column layout ──────────────────────────────────────────────── */}
      <div className="container-xl hero-inner">

        {/* LEFT — text content */}
        <div className="hero-text">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="hero-badge"
          >
            <motion.div
              animate={{ rotate: [0, 180, 360] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Sparkles size={14} color="#0077c2" />
            </motion.div>
            <span className="label-small">Comprehensive Capital Advisory</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="hero-headline"
          >
            Create.
            <br />
            Convert.
            <br />
            <span className="text-gold" style={{ backgroundSize: "200% 200%", animation: "gradient-shift 4s ease infinite" }}>
              Scale.
            </span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
            className="hero-sub"
          >
            Accelerate your capital acquisition strategy with sophisticated,
            AI-driven presentation development designed to engage institutional
            investors and facilitate scalable growth.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="hero-ctas"
          >
            <button className="btn-primary" onClick={onCTAClick}>
              Get Started
            </button>
            <button className="btn-secondary flex items-center justify-center p-0 overflow-hidden" onClick={scrollDown} style={{ padding: "0.5rem 1.5rem" }}>
              <TextScramble text="See Our Work" />
            </button>
          </motion.div>
        </div>

        {/* RIGHT — 3D coin */}
        <div className="hero-coin-wrap">
          <ZTHCoin3D />
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollDown}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="hero-scroll-btn"
        whileHover={{ color: "#374151" }}
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
