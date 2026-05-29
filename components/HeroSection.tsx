"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";

interface HeroProps {
  onCTAClick: () => void;
}

import CurvedMarquee from './CurvedMarquee';

export default function HeroSection({ onCTAClick: _onCTAClick }: HeroProps) {
  const { scrollY } = useScroll();
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
          backgroundSize: "100% 100%",
          backgroundPosition: "center bottom",
          opacity: 1,
          zIndex: -2,
          willChange: "transform",
        }}
        animate={{
          y: scrollY.get() * 0.5,
        }}
        transition={{ type: "tween", ease: "linear", duration: 0 }}
      />

      {/* Dark overlay for better text readability */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to right, rgba(15, 23, 42, 0.2) 0%, rgba(15, 23, 42, 0.05) 100%)",
          zIndex: -1,
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
        <div style={{ flex: "1 1 50%", textAlign: "left", maxWidth: "550px", marginTop: "-8vh", marginLeft: "12%" }}>
          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            style={{
              marginBottom: "1.5rem",
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
              fontSize: "70px", 
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.04em", 
              color: "#ffffff",
              textShadow: "none",
            }}
          >
            Create.<br />
            Convert.<br />
            <span style={{
              backgroundImage: "linear-gradient(90deg, #93c5fd 0%, #3b82f6 50%, #1e40af 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              color: "transparent",
              display: "inline-block"
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
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
              fontSize: "1.125rem",
              margin: "0 0 2rem", 
              lineHeight: 1.6, 
              fontWeight: 400,
              color: "#ffffff", 
              maxWidth: "480px"
            }}
          >
            End-to-end startup fundraising infrastructure combining AI tools, strategic advisory, and execution support for founders building scalable companies.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          >
            <button
              className="cta-btn"
              onClick={_onCTAClick}
              style={{
                background: "#ffffff", 
                color: "#0f172a",
                padding: "0.5rem 1.25rem", /* Smaller, more elegant padding like Stripe */
                borderRadius: "9999px",
                fontWeight: 600, /* Medium-bold */
                fontSize: "0.95rem",
                border: "none", 
                cursor: "pointer",
                display: "inline-flex", 
                alignItems: "center", 
                gap: "6px",
                transition: "all 0.2s ease",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#f8fafc";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#ffffff";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Book a call 
              <span className="icon-default" style={{ display: "inline-flex", alignItems: "center" }}><ChevronDown size={16} strokeWidth={3} style={{ transform: 'rotate(-90deg)' }} /></span>
              <span className="icon-hover" style={{ display: "none", alignItems: "center" }}><ArrowRight size={16} strokeWidth={3} /></span>
            </button>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: spacer — the 3D cards are rendered in HeroCardsOverlay,
            lifted above the next section's stacking context so they stay on top while scrolling */}
        <div style={{ flex: "1 1 50%", position: "relative", height: "700px" }} aria-hidden />
      </motion.div>

      {/* Curved Marquee layered over the wavy background at the bottom of the Hero Section */}
      <div style={{ position: "absolute", bottom: "-3vh", width: "100%", zIndex: 10 }}>
        <CurvedMarquee />
      </div>



      <style jsx>{`
        .cta-btn .icon-default { display: inline-flex !important; }
        .cta-btn .icon-hover { display: none !important; }
        .cta-btn:hover .icon-default { display: none !important; }
        .cta-btn:hover .icon-hover { display: inline-flex !important; }

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
