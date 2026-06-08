"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Play, MessageSquare, Target, UserCheck, BarChart, ChevronRight, ChevronLeft } from "lucide-react";
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
      const duration = 800; // Faster animation
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
        padding: "1rem",
        cursor: "default",
      }}
    >
      <div style={{
        fontSize: "5rem",
        fontWeight: 900,
        color: "#FFFFFF",
        marginBottom: "1rem",
        textShadow: "0 4px 20px rgba(0,0,0,0.5)",
        fontFamily: "'Playfair Display', serif"
      }}>
        {count}{suffix}
      </div>
      <p style={{
        color: "rgba(255,255,255,0.9)",
        fontSize: "1.2rem",
        lineHeight: 1.6,
        fontWeight: 500,
        textShadow: "0 2px 10px rgba(0,0,0,0.5)"
      }}>
        {stat.label}
      </p>
    </motion.div>
  );
}

export default function MockRoomSection({ onCTAClick }: { onCTAClick?: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentStatIndex, setCurrentStatIndex] = useState(0);

  // Auto-cycle through the stats every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStatIndex((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleNextStat = () => {
    setCurrentStatIndex((prev) => (prev + 1) % stats.length);
  };

  const handlePrevStat = () => {
    setCurrentStatIndex((prev) => (prev - 1 + stats.length) % stats.length);
  };

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
              fontFamily: "'Playfair Display', serif",
              fontSize: "3rem",
              fontWeight: 700,
              color: "#0f172a",
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
              marginBottom: "1.5rem",
              textAlign: "center"
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
                    width: 84, height: 84, borderRadius: "1.2rem",
                    background: "linear-gradient(135deg, #1976D2, #90CAF9)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    cursor: "pointer", boxShadow: "0 0 40px rgba(25,118,210,0.4)", margin: "0 auto 2rem"
                  }}
                >
                  <Play size={36} color="#fff" fill="#fff" style={{ marginLeft: 0 }} />
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
      </div>

      {/* Stats Section - Full Width */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          background: "url('/numberanimation.png') center/cover no-repeat, #111111",
          borderRadius: "0", // Sharp rectangle corners
          padding: "4rem",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          minHeight: "740px",
          marginBottom: "6rem",
          boxShadow: "0 25px 60px rgba(0,0,0,0.2)",
          overflow: "hidden"
        }}
      >
        <div style={{ width: "100%", maxWidth: "600px", zIndex: 2, marginTop: "-10px" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStatIndex}
              initial={{ opacity: 0, y: 30, filter: "blur(12px)", scale: 0.95 }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
              exit={{ opacity: 0, y: -30, filter: "blur(12px)", scale: 0.95 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "250px"
              }}
            >
              <AnimatedStat stat={stats[currentStatIndex]} index={0} />
            </motion.div>
          </AnimatePresence>
        </div>

        <div style={{
          position: "absolute",
          bottom: "3rem",
          display: "flex",
          gap: "1.5rem",
          zIndex: 2
        }}>
          <button
            onClick={handlePrevStat}
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.1)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid rgba(255,255,255,0.2)",
              cursor: "pointer",
              color: "#FFFFFF",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.2)";
              e.currentTarget.style.transform = "scale(1.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.1)";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <ChevronLeft size={26} strokeWidth={2.5} />
          </button>

          <button
            onClick={handleNextStat}
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.1)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid rgba(255,255,255,0.2)",
              cursor: "pointer",
              color: "#FFFFFF",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.2)";
              e.currentTarget.style.transform = "scale(1.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.1)";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <ChevronRight size={26} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      <div className="container-lg">
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
            <span className="vp-btn-border">
              <Link href="/book" onClick={onCTAClick} className="vp-btn-inner" style={{ textDecoration: 'none' }}>
                Book Mock Session
              </Link>
            </span>
            <motion.button
              whileHover={{ scale: 1.04, borderColor: "#1976D2", color: "#1976D2", background: "#E3F0FF" }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                if (onCTAClick) onCTAClick();
                window.location.href = '/book';
              }}
              style={{
                background: '#ffffff', color: '#0f172a',
                border: '1.5px solid rgba(0,0,0,0.1)', borderRadius: '9999px',
                padding: '1rem 2.5rem', fontSize: '1.1rem', fontWeight: 600,
                cursor: 'pointer', fontFamily: "'Inter', sans-serif",
                letterSpacing: '-0.01em', transition: 'all 0.3s ease',
              }}
            >
              Start Preparing
            </motion.button>
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
