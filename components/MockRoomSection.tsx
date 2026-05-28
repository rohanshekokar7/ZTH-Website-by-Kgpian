"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Play, MessageSquare, Target, UserCheck, BarChart } from "lucide-react";
import Link from "next/link";

const features = [
  { icon: MessageSquare, title: "Strategic Pitch Feedback", desc: "Receive detailed feedback on storytelling, structure, communication clarity, and investor appeal." },
  { icon: Target, title: "High-Pressure Q&A Practice", desc: "Prepare for difficult investor questions around traction, scalability, valuation, competition, and financials." },
  { icon: UserCheck, title: "Founder Communication Training", desc: "Improve confidence, delivery, pacing, presentation flow, and executive presence during pitches." },
  { icon: BarChart, title: "Fundraising Readiness Analysis", desc: "Understand how investor-ready your startup is before entering real fundraising conversations." },
];

const stats = [
  { value: "73%", label: "Of decks fail early, we fix that with investor-first narratives." },
  { value: "5×", label: "Higher Response Rate" },
  { value: "80%", label: "Higher Conversion Chances" },
];

function AnimatedStat({ stat, index }: { stat: { value: string, label: string }, index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  const targetStr = stat.value;
  const targetNum = parseInt(targetStr.replace(/\D/g, ""));
  const suffix = targetStr.replace(/[0-9]/g, "");

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const increment = targetNum / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= targetNum) {
          setCount(targetNum);
          clearInterval(timer);
        } else {
          setCount(Math.ceil(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, targetNum]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      viewport={{ once: true }}
      whileHover={{ y: -8, scale: 1.03 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      style={{ 
        textAlign: "center", 
        padding: "2.5rem 1.5rem", 
        borderRadius: "1.25rem", 
        cursor: "default",
        background: "linear-gradient(145deg, #ffffff 0%, #f4f9ff 100%)",
        border: "1px solid rgba(25, 118, 210, 0.1)",
        boxShadow: "0 10px 30px rgba(25, 118, 210, 0.05)"
      }}
    >
      <div style={{ fontSize: "2.5rem", fontWeight: 900, color: "#1976D2", marginBottom: "0.75rem" }}>
        {count}{suffix}
      </div>
      <p style={{ color: "#4A4A4A", fontSize: "0.95rem", lineHeight: 1.6, fontWeight: 500 }}>
        {stat.label}
      </p>
    </motion.div>
  );
}

export default function MockRoomSection({ onCTAClick }: { onCTAClick?: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="mock-room" ref={containerRef} className="section-pad" style={{ background: "#FAFAFA", position: "relative", overflow: "hidden" }}>
      <div className="container-lg">

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.35rem 1rem',
              background: '#E3F0FF', border: '1px solid rgba(25,118,210,0.18)',
              borderRadius: '100px', marginBottom: '1.5rem',
            }}
          >
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#1976D2' }} />
            <span style={{
              fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.2em',
              textTransform: 'uppercase', color: '#1976D2', fontFamily: "'Inter', sans-serif",
            }}>
              INVESTOR MOCK ROOM
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontWeight: 700,
              fontSize: "clamp(2.25rem, 4vw, 3.75rem)", color: "#1A1A1A",
              lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "1.5rem"
            }}
          >
            Practice The Pitch Before<br />
            <span style={{ color: "#1976D2" }}>You Enter The Real Room.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              fontSize: "1.1rem", color: "#4A4A4A", maxWidth: 800, margin: "0 auto", lineHeight: 1.6
            }}
          >
            ZTH’s Investor Mock Room simulates real fundraising conversations before actual investor meetings. Founders practice pitch delivery, handle tough investor questions, and receive live feedback to build confidence and raise capital more effectively.
          </motion.p>
        </div>

        {/* Content Layout */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(450px, 1fr))", gap: "4rem", alignItems: "start", marginBottom: "6rem" }}>

          {/* Left Side: Features */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start" }}
              >
                <div style={{
                  width: 48, height: 48, borderRadius: "50%", background: "rgba(25,118,210,0.1)",
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
                }}>
                  <feature.icon size={22} color="#1976D2" />
                </div>
                <div>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#1A1A1A", marginBottom: "0.5rem" }}>
                    {feature.title}
                  </h3>
                  <p style={{ fontSize: "1rem", color: "#5A5A5A", lineHeight: 1.6 }}>
                    {feature.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Side: Video Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div style={{
              background: "#1A1A1A", borderRadius: "1.5rem", overflow: "hidden",
              boxShadow: "0 25px 60px rgba(0,0,0,0.1)", position: "relative",
              display: "flex", flexDirection: "column", justifyContent: "center", padding: "4rem 3rem"
            }}>
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(25,118,210,0.15) 0%, transparent 100%)" }} />

              <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  style={{
                    width: 80, height: 80, borderRadius: "50%",
                    background: "linear-gradient(135deg, #1976D2, #90CAF9)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    cursor: "pointer", boxShadow: "0 0 40px rgba(25,118,210,0.4)", margin: "0 auto 2.5rem"
                  }}
                >
                  <Play size={32} color="#fff" fill="#fff" style={{ marginLeft: 4 }} />
                </motion.div>

                <h3 style={{ fontSize: "2rem", fontWeight: 800, color: "#FFFFFF", marginBottom: "1rem", lineHeight: 1.2 }}>
                  Real Investor Pressure.<br />Simulated Before The Raise.
                </h3>
                <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1.1rem", lineHeight: 1.5 }}>
                  Mock sessions designed to sharpen founder confidence and fundraising performance.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div 
          initial="rest"
          whileHover="hover"
          animate="rest"
          style={{ position: "relative", borderRadius: "1.5rem", marginBottom: "6rem" }}
        >
          {/* Animated Gradient Border Layer */}
          <motion.div
            variants={{
              rest: { opacity: 0, scale: 0.98 },
              hover: { opacity: 1, scale: 1 }
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            style={{
              position: "absolute", inset: "-2px", borderRadius: "calc(1.5rem + 2px)",
              background: "linear-gradient(135deg, #1976D2 0%, #90CAF9 100%)",
              zIndex: 0, pointerEvents: "none"
            }}
          />
          
          {/* Main White Content Card */}
          <motion.div
            variants={{
              rest: { boxShadow: "0 10px 40px rgba(0,0,0,0.03)" },
              hover: { boxShadow: "0 25px 60px rgba(25,118,210,0.12)" }
            }}
            transition={{ duration: 0.4 }}
            style={{
              position: "relative", zIndex: 1,
              background: "#FFFFFF", borderRadius: "1.5rem", padding: "4rem",
              display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "3rem",
              height: "100%"
            }}
          >
          {stats.map((stat, index) => (
            <AnimatedStat key={index} stat={stat} index={index} />
          ))}
          </motion.div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{
            background: "linear-gradient(135deg, #1A1A1A, #2A2A2A)", borderRadius: "1.5rem",
            padding: "5rem 3rem", textAlign: "center", color: "#FFFFFF",
            boxShadow: "0 20px 50px rgba(0,0,0,0.1)"
          }}
        >
          <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 800, marginBottom: "1.5rem", lineHeight: 1.1 }}>
            Prepare Before The Real Investor<br />Meeting Happens.
          </h2>
          <p style={{ fontSize: "1.15rem", color: "rgba(255,255,255,0.8)", maxWidth: 700, margin: "0 auto 3rem", lineHeight: 1.6 }}>
            Practice your pitch, strengthen your narrative, and improve investor confidence before entering high-stakes fundraising conversations.
          </p>

          <div style={{ display: "flex", gap: "1.5rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "3rem" }}>
            <Link href="/book" onClick={onCTAClick} style={{
              background: "#1976D2", color: "#FFFFFF", padding: "1rem 2.5rem", borderRadius: "99px",
              fontWeight: 700, fontSize: "1.1rem", textDecoration: "none",
              boxShadow: "0 8px 20px rgba(25,118,210,0.3)", transition: "all 0.2s ease"
            }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
              Book Mock Session
            </Link>
            <Link href="/book" onClick={onCTAClick} style={{
              background: "rgba(255,255,255,0.1)", color: "#FFFFFF", padding: "1rem 2.5rem", borderRadius: "99px",
              fontWeight: 700, fontSize: "1.1rem", textDecoration: "none", border: "1px solid rgba(255,255,255,0.2)",
              transition: "all 0.2s ease"
            }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.15)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}>
              Start Preparing
            </Link>
          </div>

          <div style={{
            display: "inline-block", background: "rgba(255,255,255,0.05)", padding: "1rem 2rem", borderRadius: "99px",
            border: "1px solid rgba(255,255,255,0.1)"
          }}>
            <p style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.9)", margin: 0, fontWeight: 500 }}>
              <span style={{ color: "#90CAF9", marginRight: 8 }}>✦</span>
              The strongest fundraising pitches are refined long before investors hear them.
            </p>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          div[style*="grid-template-columns: repeat(auto-fit, minmax(450px, 1fr))"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
