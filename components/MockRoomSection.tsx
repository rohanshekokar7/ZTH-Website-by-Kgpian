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
        </div>        {/* What's covered in this pitch deck overview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: "center", marginBottom: "2.5rem" }}
        >
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.72rem", fontWeight: 700,
            letterSpacing: "0.25em", textTransform: "uppercase",
            color: "#1976D2", marginBottom: "0.75rem",
          }}>
            What&apos;s Inside
          </p>
          <h3 style={{
            fontFamily: "'Inter', sans-serif", fontWeight: 800,
            fontSize: "clamp(1.4rem, 2.5vw, 2rem)", color: "#1A1A1A",
            letterSpacing: "-0.03em", lineHeight: 1.2,
          }}>
            Everything a fundable pitch deck needs — built for you.
          </h3>
        </motion.div>

        {/* Feature Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1.25rem",
          marginBottom: "3.5rem",
        }}>
          {[
            {
              number: "01",
              title: "Problem & Opportunity",
              desc: "We crystallise your market pain point and size the opportunity so investors immediately understand the 'why now'.",
            },
            {
              number: "02",
              title: "Solution & Product",
              desc: "Your product is presented with clarity — what it does, how it works, and why it's defensible against competition.",
            },
            {
              number: "03",
              title: "Business Model",
              desc: "Revenue streams, unit economics, and pricing logic explained in a language sophisticated investors respond to.",
            },
            {
              number: "04",
              title: "Traction & Metrics",
              desc: "Key milestones, MoM growth, and proof points structured to build conviction and de-risk the investment.",
            },
            {
              number: "05",
              title: "Go-to-Market Strategy",
              desc: "A credible, phased GTM plan showing exactly how you'll acquire customers and dominate your target segment.",
            },
            {
              number: "06",
              title: "Ask & Use of Funds",
              desc: "A clear funding ask with a detailed allocation roadmap — giving investors confidence in how their capital will be deployed.",
            },
          ].map((item, i) => (
            <motion.div
              key={item.number}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              whileHover={{ y: -5, boxShadow: "0 16px 40px rgba(0,0,0,0.08)" }}
              style={{
                padding: "1.75rem",
                borderRadius: "1rem",
                background: "#ffffff",
                border: "1px solid #e5e7eb",
                borderTop: "3px solid #1A1A1A",
                boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
                transition: "all 0.35s ease",
              }}
            >
              <span style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.65rem", fontWeight: 700,
                letterSpacing: "0.2em", color: "#1976D2",
                display: "block", marginBottom: "0.75rem",
              }}>
                {item.number}
              </span>
              <h4 style={{
                fontFamily: "'Inter', sans-serif", fontWeight: 700,
                fontSize: "0.95rem", color: "#1A1A1A",
                marginBottom: "0.6rem", letterSpacing: "-0.01em",
              }}>
                {item.title}
              </h4>
              <p style={{
                fontFamily: "'Inter', sans-serif", fontSize: "0.82rem",
                color: "#666666", lineHeight: 1.65,
              }}>
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "clamp(2rem, 6vw, 5rem)",
            flexWrap: "wrap",
            padding: "2rem 3rem",
            background: "#F8FAFC",
            borderRadius: "1rem",
            border: "1px solid #e5e7eb",
            marginBottom: "3rem",
          }}
        >
          {[
            { stat: "12–15", label: "Slides, crafted to perfection" },
            { stat: "94%", label: "Investor meeting conversion rate" },
            { stat: "72 hrs", label: "Average first-draft delivery" },
            { stat: "500+", label: "Decks delivered globally" },
          ].map(({ stat, label }) => (
            <div key={stat} style={{ textAlign: "center" }}>
              <div style={{
                fontFamily: "'Inter', sans-serif", fontWeight: 900,
                fontSize: "clamp(1.6rem, 3vw, 2.2rem)", color: "#1A1A1A",
                letterSpacing: "-0.04em", lineHeight: 1,
              }}>
                {stat}
              </div>
              <div style={{
                fontFamily: "'Inter', sans-serif", fontSize: "0.78rem",
                color: "#888888", marginTop: "0.4rem", fontWeight: 500,
              }}>
                {label}
              </div>
            </div>
          ))}
        </motion.div>


        <motion.div
          style={{ textAlign: "center", marginTop: "3rem" }}
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <motion.button
            onClick={onCTAClick}
            whileHover={{ scale: 1.05, boxShadow: "0 12px 40px rgba(25,118,210,0.25)" }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: "#1976D2", color: "#fff", border: "none", borderRadius: "100px",
              padding: "0.875rem 2rem", fontFamily: "'Inter', sans-serif", fontWeight: 600,
              fontSize: "0.95rem", cursor: "pointer", display: "inline-flex",
              alignItems: "center", gap: "0.5rem", boxShadow: "0 4px 20px rgba(25,118,210,0.2)",
            }}
          >
            Book a Mock Session <ArrowRight size={16} />
          </motion.button>
        </motion.div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          div[style*="repeat(3, 1fr)"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
