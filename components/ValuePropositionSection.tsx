"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import CurvedMarquee from "@/components/CurvedMarquee";
import FlowingMenu from "@/components/FlowingMenu";

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


function Card({ title, items, delay }: { title: string; items: typeof leftItems; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, visible: false });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setSpotlight({ x: e.clientX - rect.left, y: e.clientY - rect.top, visible: true });
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setSpotlight(s => ({ ...s, visible: false }))}
      style={{
        background: "#ffffff",
        borderRadius: "6px",
        padding: "2.75rem",
        boxShadow: spotlight.visible
          ? "0 2px 4px rgba(100,116,139,0.1), 0 8px 16px rgba(100,116,139,0.14), 0 24px 56px -8px rgba(100,116,139,0.32)"
          : "0 2px 4px rgba(100,116,139,0.08), 0 6px 14px rgba(100,116,139,0.1), 0 16px 40px -8px rgba(100,116,139,0.18)",
        border: "1px solid rgba(100,116,139,0.12)",
        position: "relative",
        overflow: "hidden",
        transition: "box-shadow 0.35s ease",
      }}
    >
      {/* spotlight overlay */}
      <div style={{
        position: "absolute", inset: 0, borderRadius: "6px", pointerEvents: "none", zIndex: 0,
        background: spotlight.visible
          ? `radial-gradient(320px circle at ${spotlight.x}px ${spotlight.y}px, rgba(25,118,210,0.09) 0%, transparent 70%)`
          : "transparent",
        transition: spotlight.visible ? "none" : "background 0.5s ease",
      }} />

      {/* top accent bar */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 4,
        background: `linear-gradient(90deg, ${BLUE}, ${BLUE_DARK})`,
        borderRadius: "6px 6px 0 0", zIndex: 1,
      }} />

      <h3 style={{
        fontSize: "1.4rem", fontWeight: 800, color: "#0f172a",
        marginBottom: "2rem", letterSpacing: "-0.02em",
        fontFamily: "'Inter', sans-serif", position: "relative", zIndex: 1,
      }}>
        {title}
      </h3>

      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "1.4rem", position: "relative", zIndex: 1 }}>
        {items.map((item, idx) => (
          <li key={idx} style={{ paddingLeft: "1rem", borderLeft: `3px solid ${BLUE}` }}>
            <strong style={{
              display: "inline-block", fontSize: "0.98rem", marginBottom: "0.3rem", fontWeight: 700,
              fontFamily: "'Inter', sans-serif",
              background: `linear-gradient(120deg, ${BLUE} 0%, ${BLUE_DARK} 100%)`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>
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
          padding: "clamp(3rem, 8vw, 6rem) 1.5rem 0",
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
              Built To Prepare Ventures Before<br />
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

        {/* ── FlowingMenu 4-block strip ── */}
        <div style={{ height: "clamp(300px, 42vh, 480px)", width: "calc(100% + 3rem)", margin: "0 -1.5rem" }}>
          <FlowingMenu
            items={[
              { link: "#", text: "Multi-Stage Capital Preparation",    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop" },
              { link: "#", text: "Founder & Investor Ecosystem",       image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&h=400&fit=crop" },
              { link: "#", text: "Strategic Fundraising Coordination", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop" },
              { link: "#", text: "Curated Venture Support",            image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop" },
            ]}
            speed={20}
            bgColor="#0a0f1e"
            textColor="#e2e8f0"
            marqueeBgColor={BLUE}
            marqueeTextColor="#ffffff"
            borderColor="rgba(255,255,255,0.07)"
          />
        </div>

        {/* CTA */}
        <style>{`
          @property --btn-angle {
            syntax: '<angle>';
            initial-value: 0deg;
            inherits: false;
          }
          @keyframes btn-border-spin {
            to { --btn-angle: 360deg; }
          }
          .vp-btn-border {
            display: inline-block;
            padding: 2px;
            border-radius: 100px;
            background: conic-gradient(from var(--btn-angle), #1976D2, #63b3ed, #ffffff, #63b3ed, #1976D2);
            animation: btn-border-spin 3s linear infinite;
            box-shadow: 0 0 18px rgba(25,118,210,0.25), 0 0 40px rgba(25,118,210,0.12);
          }
          .vp-btn-inner {
            display: inline-flex;
            align-items: center;
            gap: 0.75rem;
            padding: 1.05rem 2.6rem;
            border-radius: 100px;
            background: linear-gradient(135deg, #0D47A1 0%, #1976D2 100%);
            color: #fff;
            font-family: 'Inter', sans-serif;
            font-weight: 700;
            font-size: 1rem;
            letter-spacing: 0.01em;
            cursor: pointer;
            border: none;
            white-space: nowrap;
            transition: background 0.3s ease, transform 0.15s ease;
          }
          .vp-btn-inner:hover {
            background: linear-gradient(135deg, #1565C0 0%, #1E88E5 100%);
            transform: scale(1.02);
          }
          .vp-btn-inner:active { transform: scale(0.97); }
        `}</style>
        <div style={{ padding: "4rem 1.5rem 5rem", textAlign: "center" }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="vp-btn-border">
              <button className="vp-btn-inner" onClick={onCTAClick}>
                Apply For Fundraising Preparation <ArrowRight size={18} />
              </button>
            </span>
          </motion.div>
        </div>

      </section>
    </>
  );
}
