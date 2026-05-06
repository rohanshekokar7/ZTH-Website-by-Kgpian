"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function ValuePropositionSection({ onCTAClick }: { onCTAClick: () => void }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8 } },
  };

  return (
    <section
      style={{
        position: "relative",
        padding: "clamp(6rem, 12vw, 10rem) 1rem",
        overflow: "hidden",
        background: "#F5F7FA",
      }}
    >
      {/* Top accent */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 1,
        background: "linear-gradient(90deg, transparent, rgba(25,118,210,0.12), transparent)",
      }} />

      {/* Background glow */}
      <motion.div
        animate={{ y: [0, 30, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
          width: "80vw", height: "80vw", maxWidth: 1000, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(25,118,210,0.04) 0%, transparent 70%)",
          filter: "blur(80px)", pointerEvents: "none",
        }}
      />

      <motion.div
        className="container-xl"
        style={{ position: "relative", zIndex: 1, maxWidth: 900 }}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
          <motion.div variants={itemVariants} style={{ width: "100%", textAlign: "center" }}>
            <h2 style={{
              fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 800,
              fontFamily: "'Inter', sans-serif", lineHeight: 1.1,
              marginBottom: "0.5rem", color: "#1A1A1A", letterSpacing: "-0.03em",
            }}>
              Join Waitlist
            </h2>
            <h2 style={{
              fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 800,
              fontFamily: "'Inter', sans-serif", lineHeight: 1.1,
              color: "#1976D2",
              letterSpacing: "-0.03em", marginBottom: "2rem",
            }}>
              Instead of Raise Capital
            </h2>
          </motion.div>

          <motion.p variants={itemVariants} style={{
            fontSize: "clamp(1rem, 2vw, 1.15rem)", color: "#1976D2",
            fontWeight: 600, marginBottom: "1.5rem", fontFamily: "'Inter', sans-serif",
            letterSpacing: "0.08em", textTransform: "uppercase",
          }}>
            Without the Guesswork
          </motion.p>

          <motion.p variants={itemVariants} style={{
            fontSize: "clamp(1rem, 1.8vw, 1.15rem)", color: "#555555",
            lineHeight: 1.7, marginBottom: "3rem", maxWidth: 650, fontWeight: 400,
            textAlign: "center",
          }}>
            Zth is the complete fundraising infrastructure for founders — from
            <br />
            investor-ready pitch decks to live mock pitch sessions and deal-flow networks.
          </motion.p>

          <motion.div variants={itemVariants}>
            <motion.button
              onClick={onCTAClick}
              whileHover={{ scale: 1.05, boxShadow: "0 12px 40px rgba(25,118,210,0.25)" }}
              whileTap={{ scale: 0.95 }}
              style={{
                fontSize: "1rem", padding: "1.1rem 2.75rem",
                display: "flex", alignItems: "center", gap: "0.75rem",
                fontFamily: "'Inter', sans-serif", fontWeight: 600,
                background: "#1976D2", color: "#fff",
                border: "none", borderRadius: "100px", cursor: "pointer",
                boxShadow: "0 4px 20px rgba(25,118,210,0.2)",
                transition: "all 0.3s ease",
              }}
            >
              Get Started <ArrowRight size={18} />
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom accent */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 1,
        background: "linear-gradient(90deg, transparent, rgba(25,118,210,0.08), transparent)",
      }} />
    </section>
  );
}
