"use client";

import { motion, useScroll, useTransform } from "framer-motion";

interface HeroProps {}


export default function HeroSection({}: HeroProps = {}) {
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
      {/* Animated Background Video */}
      <motion.div
        style={{
          position: "absolute",
          width: "120%",
          height: "120%",
          left: "-10%",
          top: "-10%",
          opacity: 1,
          zIndex: -2,
          willChange: "transform",
        }}
        animate={{
          y: scrollY.get() * 0.5,
        }}
        transition={{ type: "tween", ease: "linear", duration: 0 }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          suppressHydrationWarning
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        >
          <source src="/background.mp4" type="video/mp4" />
        </video>
      </motion.div>

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
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          zIndex: 3,
          y: textY,
          marginTop: "0",
          width: "100%",
          padding: "0 2rem",
        }}
      >
        {/* CENTER COLUMN: Text */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", maxWidth: "800px", marginTop: "-5px" }}>
          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            style={{
              marginBottom: "1.5rem",
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(64px, 9vw, 96px)",
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
              color: "#3b82f6",
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
              fontSize: "clamp(1.2rem, 1.8vw, 1.45rem)",
              margin: "0 0 2rem",
              lineHeight: 1.7,
              fontWeight: 400,
              color: "#ffffff",
              maxWidth: "620px"
            }}
          >
            End-to-end startup fundraising infrastructure combining AI tools, strategic advisory, and execution support for founders building scalable companies.
          </motion.p>


        </div>
      </motion.div>




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
