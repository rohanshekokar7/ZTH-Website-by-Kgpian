"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Target, Lightbulb, TrendingUp } from "lucide-react";

const features = [
  {
    icon: Target,
    title: "Investor Targeting",
    desc: "We identify and map your ideal investor profiles — angels, VCs, and family offices matched to your stage and sector.",
  },
  {
    icon: Lightbulb,
    title: "Strategy & Positioning",
    desc: "From valuation framing to competitive narrative — we position your startup to command attention and urgency.",
  },
  {
    icon: TrendingUp,
    title: "Deal Flow Management",
    desc: "Track outreach, follow-ups, and term sheets with a system built for speed and conversion.",
  },
];

export default function FundingSection({ onCTAClick }: { onCTAClick?: () => void }) {
  return (
    <section id="funding" className="section-pad" style={{ position: "relative", overflow: "hidden", background: "#ffffff" }}>
      {/* Top accent */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 1,
        background: "linear-gradient(90deg, transparent, rgba(25,118,210,0.12), transparent)",
      }} />

      {/* Background glow */}
      <div style={{
        position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
        width: "70vw", height: "70vw", maxWidth: 800, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(25,118,210,0.04) 0%, transparent 70%)",
        filter: "blur(80px)", pointerEvents: "none",
      }} />

      <div className="container-xl" style={{ position: "relative" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              padding: "0.45rem 1.1rem", background: "rgba(25,118,210,0.08)",
              border: "1px solid rgba(25,118,210,0.12)", borderRadius: "100px", marginBottom: "1.5rem",
            }}
          >
            <Sparkles size={13} color="#1976D2" />
            <span style={{
              fontFamily: "'Inter', sans-serif", fontSize: "0.7rem", fontWeight: 600,
              letterSpacing: "0.2em", textTransform: "uppercase", color: "#1976D2",
            }}>
              Funding Strategy
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'Inter', sans-serif", fontWeight: 800,
              fontSize: "clamp(1.75rem, 3.5vw, 2.8rem)", color: "#1A1A1A",
              lineHeight: 1.15, letterSpacing: "-0.03em", marginBottom: "1rem",
            }}
          >
            Your Fundraise,{" "}
            <span style={{
              color: "#1976D2",
            }}>
              Systematized
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            style={{
              fontFamily: "'Inter', sans-serif", fontSize: "1.05rem", color: "#555555",
              lineHeight: 1.6, maxWidth: 560, margin: "0 auto",
            }}
          >
            We provide profound structural oversight for your entire fundraising lifecycle, bridging foundational corporate strategy with successful capital closure.
          </motion.p>
        </div>

        {/* Feature cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem", marginBottom: "3.5rem" }}>
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              whileHover={{ y: -6, boxShadow: "0 20px 50px rgba(0,0,0,0.08)" }}
              style={{
                padding: "2rem", borderRadius: "1.25rem",
                background: "#ffffff", border: "1px solid #e5e7eb",
                boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                cursor: "pointer",
              }}
              onClick={onCTAClick}
            >
              <div style={{
                width: 48, height: 48, borderRadius: "0.75rem",
                background: "rgba(25,118,210,0.08)", border: "1px solid rgba(25,118,210,0.1)",
                display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem",
              }}>
                <f.icon size={22} color="#1976D2" />
              </div>
              <h3 style={{
                fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "1.05rem",
                color: "#1A1A1A", marginBottom: "0.75rem",
              }}>
                {f.title}
              </h3>
              <p style={{
                fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#555555", lineHeight: 1.65,
              }}>
                {f.desc}
              </p>
              <div style={{
                marginTop: "1.5rem", display: "flex", alignItems: "center", gap: "0.4rem",
                fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", fontWeight: 600, color: "#1976D2",
              }}>
                Learn more <ArrowRight size={13} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          style={{ textAlign: "center" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <motion.button
            className="btn-primary"
            onClick={onCTAClick}
            whileHover={{ scale: 1.05, boxShadow: "0 12px 40px rgba(25,118,210,0.25)" }}
            whileTap={{ scale: 0.95 }}
            style={{
              fontSize: "1rem", padding: "1rem 2.5rem", background: "#1976D2",
              color: "#fff", border: "none", borderRadius: "100px",
              fontFamily: "'Inter', sans-serif", fontWeight: 600, cursor: "pointer",
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              boxShadow: "0 4px 20px rgba(25,118,210,0.2)",
            }}
          >
            Book Discovery Call <ArrowRight size={16} />
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
