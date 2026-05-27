"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, TrendingUp, Users, Target, Rocket } from "lucide-react";
import CurvedMarquee from "@/components/CurvedMarquee";

export default function ValuePropositionSection({ onCTAClick }: { onCTAClick: () => void }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
  };

  return (
    <>
      <div style={{ position: "relative", zIndex: 10, width: "100%", background: "#F5F7FA", paddingTop: "2rem" }}>
        <CurvedMarquee />
      </div>

      <section
        style={{
          position: "relative",
          padding: "clamp(2rem, 8vw, 6rem) 1rem clamp(6rem, 12vw, 10rem)",
          overflow: "hidden",
          background: "#F5F7FA",
          marginTop: "-20px", // pull up slightly to blend with the marquee
          fontFamily: "'Inter', sans-serif"
        }}
      >
        <motion.div
          className="container-xl"
          style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto" }}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Header Section */}
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <motion.p variants={itemVariants} style={{
              color: "#1976D2", fontSize: "0.85rem", fontWeight: 700,
              letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "1.25rem",
              display: "inline-flex", alignItems: "center", padding: "0.4rem 1rem",
              background: "rgba(25,118,210,0.08)", borderRadius: "100px", border: "1px solid rgba(25,118,210,0.15)"
            }}>
              PRE-FUNDRAISING INFRASTRUCTURE
            </motion.p>
            <motion.h2 variants={itemVariants} style={{
              fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 800,
              color: "#111827", lineHeight: 1.15, letterSpacing: "-0.03em",
              maxWidth: 800, margin: "0 auto 1.5rem"
            }}>
              Built To Prepare Ventures Before They Raise Capital.
            </motion.h2>
            <motion.p variants={itemVariants} style={{
              fontSize: "1.1rem", color: "#4B5563", lineHeight: 1.7,
              maxWidth: 750, margin: "0 auto", fontWeight: 400
            }}>
              From investor-ready pitch narratives and financial modeling to valuation strategy and operational readiness Zth helps founders and growing businesses prepare for high-stakes fundraising conversations with greater clarity and confidence.
            </motion.p>
          </div>

          {/* Cards Grid */}
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
            gap: "2rem", marginBottom: "4rem"
          }}>
            {/* Category 1 */}
            <motion.div variants={itemVariants} style={{
              background: "#ffffff", borderRadius: "24px", padding: "2.5rem",
              boxShadow: "0 10px 40px -10px rgba(0,0,0,0.05)", border: "1px solid rgba(0,0,0,0.03)"
            }}>
              <h3 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#111827", marginBottom: "2rem", letterSpacing: "-0.02em" }}>
                Fundraising Support
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <li>
                  <strong style={{ display: "block", color: "#1976D2", fontSize: "1.05rem", marginBottom: "0.35rem", fontWeight: 700 }}>Pitch Deck Advisory</strong>
                  <span style={{ color: "#4B5563", fontSize: "0.95rem", lineHeight: 1.6, display: "block" }}>Strategic investor-focused storytelling designed to communicate vision, traction, and scalability with clarity.</span>
                </li>
                <li>
                  <strong style={{ display: "block", color: "#1976D2", fontSize: "1.05rem", marginBottom: "0.35rem", fontWeight: 700 }}>Financial Modeling</strong>
                  <span style={{ color: "#4B5563", fontSize: "0.95rem", lineHeight: 1.6, display: "block" }}>Structured financial projections, forecasting, and fundraising-oriented financial planning.</span>
                </li>
                <li>
                  <strong style={{ display: "block", color: "#1976D2", fontSize: "1.05rem", marginBottom: "0.35rem", fontWeight: 700 }}>Valuation Support</strong>
                  <span style={{ color: "#4B5563", fontSize: "0.95rem", lineHeight: 1.6, display: "block" }}>Fundraising-aligned valuation guidance built around market positioning, business maturity, and growth potential.</span>
                </li>
                <li>
                  <strong style={{ display: "block", color: "#1976D2", fontSize: "1.05rem", marginBottom: "0.35rem", fontWeight: 700 }}>Fundraising Readiness</strong>
                  <span style={{ color: "#4B5563", fontSize: "0.95rem", lineHeight: 1.6, display: "block" }}>Preparation across investor communication, positioning, due diligence, and fundraising strategy.</span>
                </li>
              </ul>
            </motion.div>

            {/* Category 2 */}
            <motion.div variants={itemVariants} style={{
              background: "#ffffff", borderRadius: "24px", padding: "2.5rem",
              boxShadow: "0 10px 40px -10px rgba(0,0,0,0.05)", border: "1px solid rgba(0,0,0,0.03)",
              display: "flex", flexDirection: "column"
            }}>
              <h3 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#111827", marginBottom: "2rem", letterSpacing: "-0.02em" }}>
                Compliance & Operations
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {[
                  "Company Incorporation",
                  "GST Registration & Regulatory Support",
                  "Legal & Financial Documentation",
                  "Accounting & CA Support",
                  "Startup India / DPIIT Assistance"
                ].map((item, idx) => (
                  <li key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "0.85rem", padding: "0.75rem", background: "#F9FAFB", borderRadius: "12px", border: "1px solid #F3F4F6" }}>
                    <CheckCircle2 size={22} color="#1976D2" style={{ flexShrink: 0 }} />
                    <span style={{ color: "#374151", fontSize: "1rem", fontWeight: 500, lineHeight: 1.4 }}>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Traction Strip */}
          <motion.div variants={itemVariants} style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "2rem", background: "#ffffff", borderRadius: "20px", padding: "2.5rem 2rem",
            boxShadow: "0 10px 40px -10px rgba(0,0,0,0.06)", border: "1px solid rgba(0,0,0,0.03)",
            marginBottom: "4rem", textAlign: "center"
          }}>
            <div>
              <div style={{ background: "rgba(25,118,210,0.08)", width: 56, height: 56, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem", color: "#1976D2" }}>
                <Users size={28} />
              </div>
              <div style={{ fontWeight: 800, fontSize: "1.75rem", color: "#111827", marginBottom: "0.25rem", letterSpacing: "-0.02em" }}>100+</div>
              <div style={{ fontSize: "0.95rem", color: "#6B7280", fontWeight: 500 }}>Ventures Supported</div>
            </div>
            <div>
              <div style={{ background: "rgba(25,118,210,0.08)", width: 56, height: 56, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem", color: "#1976D2" }}>
                <TrendingUp size={28} />
              </div>
              <div style={{ fontWeight: 800, fontSize: "1.75rem", color: "#111827", marginBottom: "0.25rem", letterSpacing: "-0.02em" }}>₹11–12 Cr+</div>
              <div style={{ fontSize: "0.95rem", color: "#6B7280", fontWeight: 500 }}>Capital Facilitated</div>
            </div>
            <div>
              <div style={{ background: "rgba(25,118,210,0.08)", width: 56, height: 56, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem", color: "#1976D2" }}>
                <Target size={28} />
              </div>
              <div style={{ fontWeight: 800, fontSize: "1.25rem", color: "#111827", marginBottom: "0.25rem", letterSpacing: "-0.02em", height: "1.75rem", display: "flex", alignItems: "center", justifyContent: "center" }}>Multi-Sector</div>
              <div style={{ fontSize: "0.95rem", color: "#6B7280", fontWeight: 500 }}>Founder Advisory</div>
            </div>
            <div>
              <div style={{ background: "rgba(25,118,210,0.08)", width: 56, height: 56, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem", color: "#1976D2" }}>
                <Rocket size={28} />
              </div>
              <div style={{ fontWeight: 800, fontSize: "1.25rem", color: "#111827", marginBottom: "0.25rem", letterSpacing: "-0.02em", height: "1.75rem", display: "flex", alignItems: "center", justifyContent: "center" }}>Strategic</div>
              <div style={{ fontSize: "0.95rem", color: "#6B7280", fontWeight: 500 }}>Fundraising Preparation</div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div variants={itemVariants} style={{ textAlign: "center" }}>
            <motion.button
              onClick={onCTAClick}
              whileHover={{ scale: 1.02, boxShadow: "0 10px 24px rgba(25,118,210,0.22)" }}
              whileTap={{ scale: 0.98 }}
              style={{
                fontSize: "1.05rem", padding: "1.2rem 2.75rem",
                display: "inline-flex", alignItems: "center", gap: "0.75rem",
                fontFamily: "'Inter', sans-serif", fontWeight: 600,
                background: "linear-gradient(135deg, #1976D2, #0D47A1)", color: "#fff",
                border: "none", borderRadius: "100px", cursor: "pointer",
                boxShadow: "0 4px 15px rgba(25,118,210,0.2)",
                transition: "all 0.3s ease",
              }}
            >
              Apply For Fundraising Preparation <ArrowRight size={20} />
            </motion.button>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
