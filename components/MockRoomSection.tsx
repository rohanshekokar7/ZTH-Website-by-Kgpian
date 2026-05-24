"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Video, Users, Mic, ArrowRight, Play } from "lucide-react";

const steps = [
  { icon: Mic, title: "Practice Your Pitch", desc: "Walk through your deck with real pressure, hard questions, and investor-style scrutiny." },
  { icon: Users, title: "Live Investor Simulation", desc: "Face a panel who thinks like a VC — tough but fair, focused on your weaknesses." },
  { icon: Video, title: "Full Record & Review", desc: "Get recorded, scored, and debriefed with actionable feedback to sharpen your delivery." },
];

export default function MockRoomSection({ onCTAClick }: { onCTAClick: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });

  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.88, 1, 1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0.4]);
  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-4, 0, 3]);

  return (
    <section id="mock-room" ref={containerRef} className="section-pad" style={{ background: "#FFFFFF", position: "relative", overflow: "hidden" }}>
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 1,
        background: "linear-gradient(90deg, transparent, rgba(25,118,210,0.12), transparent)",
      }} />

      <div className="container-xl">
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <motion.p className="label-small"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ marginBottom: "1rem" }}
          >
            Investor Mock Room
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'Inter', sans-serif", fontWeight: 800,
              fontSize: "clamp(1.75rem, 3.5vw, 2.8rem)", color: "#1A1A1A",
              lineHeight: 1.15, letterSpacing: "-0.03em",
            }}
          >
            Pitch Before You{" "}
            <span style={{
              color: "#1976D2",
            }}>Pitch for Real</span>
          </motion.h2>
        </div>

        {/* Video Card */}
        <div style={{ perspective: 1400, perspectiveOrigin: "50% 40%", marginBottom: "4rem" }}>
          <motion.div style={{ scale, opacity, rotateY, transformStyle: "preserve-3d" }}>
            <div style={{
              background: "linear-gradient(145deg, rgba(25,118,210,0.06), rgba(25,118,210,0.01))",
              border: "1px solid rgba(25,118,210,0.1)",
              borderRadius: "1.5rem", padding: "3px",
              boxShadow: "0 30px 80px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)",
              maxWidth: 860, margin: "0 auto",
            }}>
              <div style={{
                background: "#1A1A1A", borderRadius: "1.35rem",
                aspectRatio: "16/9", display: "flex", alignItems: "center",
                justifyContent: "center", position: "relative", overflow: "hidden",
              }}>
                <div style={{
                  position: "absolute", inset: 0,
                  background: "radial-gradient(ellipse 70% 70% at 50% 50%, rgba(25,118,210,0.08) 0%, transparent 70%)",
                }} />

                {[1, 2, 3].map(i => (
                  <div key={i} style={{
                    position: "absolute", left: `${i * 25}%`, top: 0, bottom: 0,
                    width: 1, background: "rgba(255,255,255,0.04)",
                  }} />
                ))}

                <div style={{ display: "flex", gap: "1rem", position: "absolute", top: "1rem", right: "1rem" }}>
                  {[1, 2].map(i => (
                    <div key={i} style={{
                      width: 110, height: 72, borderRadius: "0.6rem",
                      background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(25,118,210,0.3)" }} />
                    </div>
                  ))}
                </div>

                <motion.div
                  whileHover={{ scale: 1.1 }}
                  style={{
                    width: 72, height: 72, borderRadius: "50%",
                    background: "linear-gradient(135deg, #1976D2, #90CAF9)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    cursor: "pointer", boxShadow: "0 0 40px rgba(25,118,210,0.4)", zIndex: 1,
                  }}
                >
                  <Play size={26} color="#fff" fill="#fff" />
                </motion.div>

                <div style={{
                  position: "absolute", bottom: 0, left: 0, right: 0,
                  padding: "1rem 1.5rem",
                  background: "linear-gradient(0deg, rgba(0,0,0,0.6) 0%, transparent 100%)",
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#ef4444" }} className="animate-pulse-gold" />
                    <span style={{ fontFamily: "'Inter'", fontSize: "0.75rem", color: "rgba(255,255,255,0.7)" }}>Live Session</span>
                  </div>
                  <span style={{ fontFamily: "'Inter'", fontSize: "0.75rem", color: "#90CAF9" }}>12:34</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          div[style*="repeat(3, 1fr)"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
