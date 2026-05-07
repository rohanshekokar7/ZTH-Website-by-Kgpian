"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CTASection({ onCTAClick }: { onCTAClick: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.4, 1], [0.9, 1, 0.96]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.5]);

  return (
    <section ref={containerRef} className="section-pad"
      style={{ background: "#FFFFFF", position: "relative", overflow: "hidden" }}
    >
      {/* Top separator */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 1,
        background: "linear-gradient(90deg, transparent, rgba(25,118,210,0.3), transparent)",
      }} />

      {/* Radial glow */}
      <div style={{
        position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
        width: "70vw", height: "70vw", maxWidth: 800, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(25,118,210,0.12) 0%, transparent 60%)",
        filter: "blur(80px)", pointerEvents: "none",
      }} />

      <div className="container-xl" style={{ perspective: 1200 }}>
        <motion.div style={{ scale, opacity, transformStyle: "preserve-3d" }}>
          <div style={{
            background: "linear-gradient(145deg, #0A192F 0%, #112240 100%)",
            border: "1px solid rgba(25,118,210,0.3)",
            borderRadius: "2rem", padding: "clamp(3rem, 8vw, 5rem)",
            textAlign: "center", position: "relative", overflow: "hidden",
            boxShadow: "0 30px 80px rgba(25,118,210,0.15)",
          }}>
            {/* Corner accents */}
            {["top-left", "top-right", "bottom-left", "bottom-right"].map((pos) => (
              <div key={pos} style={{
                position: "absolute",
                ...(pos.includes("top") ? { top: "1.5rem" } : { bottom: "1.5rem" }),
                ...(pos.includes("left") ? { left: "1.5rem" } : { right: "1.5rem" }),
                width: 30, height: 30,
                borderTop: pos.includes("top") ? "1px solid rgba(25,118,210,0.3)" : "none",
                borderBottom: pos.includes("bottom") ? "1px solid rgba(25,118,210,0.3)" : "none",
                borderLeft: pos.includes("left") ? "1px solid rgba(25,118,210,0.3)" : "none",
                borderRight: pos.includes("right") ? "1px solid rgba(25,118,210,0.3)" : "none",
              }} />
            ))}

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                padding: "0.45rem 1.1rem", background: "rgba(25,118,210,0.15)",
                border: "1px solid rgba(25,118,210,0.3)", borderRadius: "100px", marginBottom: "2rem",
              }}
            >
              <Sparkles size={14} color="#90CAF9" />
              <span style={{
                fontFamily: "'Inter', sans-serif", fontSize: "0.7rem", fontWeight: 600,
                letterSpacing: "0.2em", textTransform: "uppercase", color: "#90CAF9",
              }}>
                Start Your Journey
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "'Inter', sans-serif", fontWeight: 800,
                fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "#FFFFFF",
                lineHeight: 1.1, letterSpacing: "-0.03em", marginBottom: "1.5rem",
              }}
            >
              Ready to Raise{" "}
              <span style={{ color: "#90CAF9" }}>Your Round?</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              style={{
                fontFamily: "'Inter', sans-serif", fontSize: "1.1rem", color: "#A1A1AA",
                lineHeight: 1.6, maxWidth: 560, margin: "0 auto 3rem",
              }}
            >
              Join over 500 executives who have leveraged our advisory services to refine their strategic narrative and engage investors with absolute confidence.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}
            >
              <motion.button
                onClick={onCTAClick}
                whileHover={{ scale: 1.05, boxShadow: "0 12px 48px rgba(25,118,210,0.4)" }}
                whileTap={{ scale: 0.95 }}
                style={{
                  fontSize: "1.05rem", padding: "1.1rem 2.75rem",
                  background: "#1976D2", color: "#fff", border: "none",
                  borderRadius: "100px", fontFamily: "'Inter', sans-serif",
                  fontWeight: 600, cursor: "pointer", display: "inline-flex",
                  alignItems: "center", gap: "0.5rem",
                  boxShadow: "0 4px 20px rgba(25,118,210,0.35)",
                }}
              >
                Schedule Initial Consultation <ArrowRight size={17} />
              </motion.button>
              <motion.button
                onClick={() => document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" })}
                whileHover={{ scale: 1.05, borderColor: "#90CAF9", color: "#90CAF9" }}
                whileTap={{ scale: 0.95 }}
                style={{
                  fontSize: "1.05rem", padding: "1.1rem 2.75rem",
                  background: "transparent", color: "#FFFFFF",
                  border: "1.5px solid rgba(255,255,255,0.2)", borderRadius: "100px",
                  fontFamily: "'Inter', sans-serif", fontWeight: 600,
                  cursor: "pointer", transition: "all 0.3s ease",
                }}
              >
                Browse Professional Services
              </motion.button>
            </motion.div>

            {/* Trust marks */}
            <motion.div
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              style={{ display: "flex", gap: "2rem", justifyContent: "center", flexWrap: "wrap", marginTop: "3rem" }}
            >
              {["No long-term contract", "Free 30-min discovery", "Money-back guarantee"].map((text) => (
                <div key={text} style={{
                  display: "flex", alignItems: "center", gap: "0.5rem",
                  fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", color: "#71717A",
                }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#1976D2" }} />
                  {text}
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
