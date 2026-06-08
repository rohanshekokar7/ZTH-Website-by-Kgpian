"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import CurvedMarquee from "@/components/CurvedMarquee";

const BLUE = "#1976D2";
const BLUE_DARK = "#0D47A1";

const leftItems = [
  { title: "Pitch Deck Advisory", desc: "Strategic investor-focused storytelling designed to communicate vision, traction, and scalability with clarity." },
  { title: "Financial Modeling", desc: "Structured financial projections, forecasting, and fundraising-oriented financial planning." },
  { title: "Valuation Support", desc: "Fundraising-aligned valuation guidance built around market positioning, business maturity, and growth potential." },
  { title: "Fundraising Readiness", desc: "Preparation across investor communication, positioning, due diligence, and fundraising strategy." },
  { title: "Investor Targeting & Outreach", desc: "Identifying the right investors by stage, sector, and thesis, and building a structured outreach pipeline." },
];

const rightItems = [
  { title: "Company Incorporation", desc: "Registering your startup as a private limited company, LLP, or OPC with full MCA compliance." },
  { title: "GST Registration & Regulatory Support", desc: "GST onboarding, return filing, and guidance through regulatory requirements for your business." },
  { title: "Legal & Financial Documentation", desc: "Drafting and review of founder agreements, term sheets, NDAs, and key legal instruments." },
  { title: "Accounting & CA Support", desc: "Bookkeeping, financial reporting, and certified CA support to keep your accounts audit-ready." },
  { title: "Startup India / DPIIT Assistance", desc: "DPIIT recognition and Startup India registration to unlock tax benefits and government schemes." },
];

const marqueeItems = [
  "100+ Ventures Supported",
  "₹11–12 Cr+ Capital Facilitated",
  "Multi-Sector Founder Advisory",
  "Strategic Fundraising Preparation",
];

function Card({ title, items, delay }: { title: string; items: typeof leftItems; delay: number; fromX?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{
        background: "#ffffff",
        borderRadius: "28px",
        padding: "2.75rem",
        boxShadow: "0 8px 32px -8px rgba(0,0,0,0.08)",
        border: "1px solid rgba(25,118,210,0.08)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* top accent bar */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 4,
        background: `linear-gradient(90deg, ${BLUE}, ${BLUE_DARK})`,
        borderRadius: "28px 28px 0 0",
      }} />

      <h3 style={{
        fontSize: "1.4rem", fontWeight: 800, color: "#0f172a",
        marginBottom: "2rem", letterSpacing: "-0.02em",
        fontFamily: "'Inter', sans-serif",
      }}>
        {title}
      </h3>

      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "1.4rem" }}>
        {items.map((item, idx) => (
          <li
            key={idx}
            style={{ paddingLeft: "1rem", borderLeft: `3px solid ${BLUE}` }}
          >
            <strong style={{ display: "block", color: BLUE, fontSize: "0.98rem", marginBottom: "0.3rem", fontWeight: 700, fontFamily: "'Inter', sans-serif" }}>
              {item.title}
            </strong>
            <span style={{ color: "#4B5563", fontSize: "0.9rem", lineHeight: 1.65, display: "block", fontFamily: "'Inter', sans-serif" }}>
              {item.desc}
            </span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function ValuePropositionSection({ onCTAClick }: { onCTAClick: () => void }) {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-50px" });

  return (
    <>
      <div style={{ background: "#F0F5FF", paddingTop: "2rem" }}>
        <CurvedMarquee />
      </div>

      <section
        style={{
          position: "relative",
          padding: "clamp(3rem, 8vw, 6rem) 1.5rem clamp(5rem, 10vw, 8rem)",
          overflow: "hidden",
          background: "linear-gradient(160deg, #EEF4FF 0%, #F5F7FA 45%, #EDF2FF 100%)",
          marginTop: "-20px",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {/* Decorative blobs */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}>
          <div style={{ position: "absolute", top: "-8%", right: "-4%", width: "40vw", height: "40vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(25,118,210,0.07) 0%, transparent 70%)", filter: "blur(60px)" }} />
          <div style={{ position: "absolute", bottom: "5%", left: "-6%", width: "35vw", height: "35vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)", filter: "blur(50px)" }} />
          <div style={{ position: "absolute", top: "40%", left: "45%", width: "20vw", height: "20vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(25,118,210,0.04) 0%, transparent 70%)", filter: "blur(40px)" }} />
        </div>

        <div style={{ position: "relative", zIndex: 1, maxWidth: 1120, margin: "0 auto" }}>

          {/* Header */}
          <div ref={headerRef} style={{ textAlign: "center", marginBottom: "4.5rem" }}>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                padding: "0.35rem 1.1rem",
                background: "#DBEAFE", border: "1px solid rgba(25,118,210,0.2)",
                borderRadius: "100px", marginBottom: "1.5rem",
              }}
            >
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: BLUE }} />
              <span style={{ fontSize: "0.62rem", fontWeight: 800, letterSpacing: "0.22em", textTransform: "uppercase", color: BLUE }}>
                PRE-FUNDRAISING INFRASTRUCTURE
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "3rem", fontWeight: 700,
                color: "#0f172a", lineHeight: 1.2, letterSpacing: "-0.02em",
                maxWidth: 820, margin: "0 auto 1.5rem",
              }}
            >
              Built To Prepare Ventures Before{" "}
              <span style={{ color: BLUE }}>They Raise Capital.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{ fontSize: "1.05rem", color: "#4B5563", lineHeight: 1.75, maxWidth: 720, margin: "0 auto", fontWeight: 400 }}
            >
              From investor-ready pitch narratives and financial modeling to valuation strategy and operational readiness — Zth helps founders prepare for high-stakes fundraising conversations with clarity and confidence.
            </motion.p>
          </div>

          {/* Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "2.5rem", marginBottom: "4.5rem" }}>
            <Card title="Fundraising Support" items={leftItems} delay={0.1} />
            <Card title="Compliance & Operations" items={rightItems} delay={0.2} />
          </div>

        </div>

        {/* ── Full-width dark marquee band ── */}
        <div style={{ overflow: "hidden", background: "#0f172a", padding: "1.5rem 0", margin: "0 0 4rem" }}>
          <style>{`
            @keyframes vp-marquee {
              from { transform: translateX(0); }
              to   { transform: translateX(-50%); }
            }
            .vp-marquee-track {
              display: flex;
              width: max-content;
              animation: vp-marquee 20s linear infinite;
            }
            .vp-marquee-track:hover { animation-play-state: paused; }
            .vp-marquee-item {
              display: flex;
              align-items: center;
              gap: 2rem;
              padding: 0 3rem;
              white-space: nowrap;
            }
          `}</style>
          <div className="vp-marquee-track">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <div key={i} className="vp-marquee-item">
                <span style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                  fontWeight: 700,
                  color: "#ffffff",
                  letterSpacing: "-0.01em",
                }}>
                  {item}
                </span>
                <span style={{
                  display: "inline-block",
                  width: 8, height: 8, borderRadius: "50%",
                  background: BLUE, flexShrink: 0,
                }} />
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 1.5rem 2rem", textAlign: "center" }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <motion.button
              onClick={onCTAClick}
              whileHover={{ scale: 1.03, boxShadow: "0 12px 28px rgba(25,118,210,0.28)" }}
              whileTap={{ scale: 0.97 }}
              style={{
                fontSize: "1rem", padding: "1.15rem 2.75rem",
                display: "inline-flex", alignItems: "center", gap: "0.75rem",
                fontFamily: "'Inter', sans-serif", fontWeight: 600,
                background: `linear-gradient(135deg, ${BLUE}, ${BLUE_DARK})`, color: "#fff",
                border: "none", borderRadius: "100px", cursor: "pointer",
                boxShadow: "0 4px 18px rgba(25,118,210,0.22)",
                transition: "all 0.3s ease",
              }}
            >
              Apply For Fundraising Preparation <ArrowRight size={18} />
            </motion.button>
          </motion.div>
        </div>

      </section>
    </>
  );
}
