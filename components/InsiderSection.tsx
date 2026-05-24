"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { Clock, ArrowRight, TrendingUp } from "lucide-react";

const articles = [
  {
    category: "Fundraising",
    title: "Why 90% of Pitch Decks Fail in the First 30 Seconds",
    excerpt:
      "Most founders think their deck fails because of bad financials. The truth is far simpler — and more fixable.",
    readTime: "6 min",
    gradient: "linear-gradient(135deg, rgba(25,118,210,0.06), rgba(25,118,210,0.01))",
  },
  {
    category: "Investor Relations",
    title: "The 5 Questions Every VC Asks That Most Founders Can't Answer",
    excerpt:
      "Investors have a mental checklist. We decoded it so you can walk in prepared for every room.",
    readTime: "8 min",
    gradient: "linear-gradient(135deg, rgba(59,130,246,0.05), rgba(59,130,246,0.01))",
  },
  {
    category: "Strategy",
    title: "How to Build a $10M ARR Story at a $500K Revenue Stage",
    excerpt:
      "Investors aren't funding your present — they're betting on your future. Here's how to tell that story.",
    readTime: "10 min",
    gradient: "linear-gradient(135deg, rgba(168,85,247,0.05), rgba(168,85,247,0.01))",
  },
  {
    category: "Tools",
    title: "SAFE Notes vs Convertible Notes: A Founder's Plain-English Guide",
    excerpt:
      "Before you sign anything, understand exactly what you're agreeing to and how it affects your cap table.",
    readTime: "7 min",
    gradient: "linear-gradient(135deg, rgba(34,197,94,0.04), rgba(34,197,94,0.01))",
  },
];

export default function InsiderSection({ onCTAClick }: { onCTAClick: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="insider"
      ref={containerRef}
      className="section-pad"
      style={{ position: "relative", overflow: "hidden", background: "#ffffff" }}
    >
      {/* Top rule */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 1,
        background: "linear-gradient(90deg, transparent, rgba(25,118,210,0.12), transparent)",
      }} />

      <div className="container-xl">

        {/* ── Section header ──────────────────────────────────────── */}
        <div style={{
          display: "flex", alignItems: "flex-end", justifyContent: "space-between",
          flexWrap: "wrap", gap: "2rem", marginBottom: "3.5rem",
        }}>
          <div>
            {/* Eyebrow label — Inter uppercase via .label-small */}
            <motion.p
              className="label-small"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              style={{ marginBottom: "0.875rem" }}
            >
              ZTH Insider
            </motion.p>

            {/* Section h2 — Playfair Display via global h2 rule */}
            <motion.h2
              initial={{ opacity: 0, y: 30, filter: "blur(14px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontSize: "clamp(2.25rem, 4vw, 3.5rem)",
                fontWeight: 700,
                color: "#1A1A1A",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                marginBottom: "0.875rem",
              }}
            >
              Knowledge That{" "}
              <span style={{ color: "#1976D2" }}>Gets You Funded</span>
            </motion.h2>

            {/* Section subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              style={{
                fontSize: "1.275rem",
                color: "#555555",
                lineHeight: 1.65,
                maxWidth: "560px",
                margin: 0,
              }}
            >
              Exclusive insights, fundraising strategies, investor psychology, and pitch deck breakdowns curated for ambitious founders.
            </motion.p>
          </div>

          <motion.button
            className="btn-secondary"
            onClick={onCTAClick}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            View All Articles <ArrowRight size={16} />
          </motion.button>
        </div>

        {/* ── Featured article ─────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          whileHover={{ y: -4, boxShadow: "0 20px 60px rgba(0,0,0,0.08)" }}
          onClick={onCTAClick}
          style={{
            marginBottom: "1.5rem", overflow: "hidden", cursor: "pointer",
            background: articles[0].gradient,
            borderRadius: "1.25rem", border: "1px solid #e5e7eb",
            boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <div
            className="insider-featured-grid"
            style={{
              padding: "3rem", display: "grid",
              gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "center",
            }}
          >
            {/* Left — text */}
            <div>
              {/* Category + read time */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
                <span style={{
                  padding: "0.25rem 0.75rem",
                  background: "rgba(25,118,210,0.08)",
                  border: "1px solid rgba(25,118,210,0.12)",
                  borderRadius: "100px",
                  fontSize: "0.6875rem", fontWeight: 700,
                  letterSpacing: "0.12em", textTransform: "uppercase",
                  color: "#1976D2",
                }}>
                  {articles[0].category}
                </span>
                <span style={{
                  display: "flex", alignItems: "center", gap: "0.3rem",
                  fontSize: "0.8125rem", color: "#9ca3af",
                }}>
                  <Clock size={12} /> {articles[0].readTime} read
                </span>
              </div>

              {/* Article title — Playfair Display (h3 inherits Inter globally; override here for editorial weight) */}
              <h3 style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 700,
                fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)",
                color: "#1A1A1A",
                lineHeight: 1.2,
                letterSpacing: "-0.02em",
                marginBottom: "1rem",
              }}>
                {articles[0].title}
              </h3>

              {/* Excerpt — Inter body */}
              <p style={{
                fontSize: "1rem",
                color: "#555555",
                lineHeight: 1.7,
                marginBottom: "2rem",
              }}>
                {articles[0].excerpt}
              </p>

              <div style={{
                display: "flex", alignItems: "center", gap: "0.4rem",
                fontSize: "0.875rem", fontWeight: 700, color: "#1976D2",
              }}>
                Read Article <ArrowRight size={14} />
              </div>
            </div>

            {/* Right — decorative chart mock */}
            <div style={{
              background: "rgba(25,118,210,0.04)",
              border: "1px solid rgba(25,118,210,0.08)",
              borderRadius: "1rem", padding: "2rem",
              display: "flex", flexDirection: "column", gap: "0.75rem",
            }}>
              <div style={{ height: 6, width: "70%", background: "rgba(25,118,210,0.2)", borderRadius: 3 }} />
              <div style={{ height: 4, width: "90%", background: "rgba(0,0,0,0.04)", borderRadius: 3 }} />
              <div style={{ height: 4, width: "60%", background: "rgba(0,0,0,0.03)", borderRadius: 3 }} />
              <div style={{ height: 60, background: "rgba(25,118,210,0.03)", borderRadius: "0.75rem", marginTop: "0.5rem", border: "1px solid rgba(25,118,210,0.06)" }} />
              <div style={{ height: 4, width: "80%", background: "rgba(0,0,0,0.04)", borderRadius: 3 }} />
              <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
                {[65, 40, 75, 55, 90].map((h, i) => (
                  <div key={i} style={{
                    flex: 1, height: h, borderRadius: "4px 4px 0 0", alignSelf: "flex-end",
                    background: i === 4
                      ? "linear-gradient(135deg, #1976D2, #90CAF9)"
                      : "rgba(0,0,0,0.04)",
                  }} />
                ))}
              </div>
              <TrendingUp size={20} color="#1976D2" style={{ marginTop: "0.25rem" }} />
            </div>
          </div>
        </motion.div>

        {/* ── Three smaller cards ───────────────────────────────────── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem" }}>
          {articles.slice(1).map((article, i) => (
            <motion.div
              key={article.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
              whileHover={{ y: -5, boxShadow: "0 16px 40px rgba(0,0,0,0.06)" }}
              onClick={onCTAClick}
              style={{
                padding: "2rem", cursor: "pointer",
                background: article.gradient,
                borderRadius: "1.25rem", border: "1px solid #e5e7eb",
                boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              {/* Category badge */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.25rem" }}>
                <span style={{
                  padding: "0.2rem 0.6rem",
                  background: "rgba(0,0,0,0.03)", border: "1px solid rgba(0,0,0,0.06)",
                  borderRadius: "100px",
                  fontSize: "0.6875rem", fontWeight: 700,
                  letterSpacing: "0.1em", textTransform: "uppercase",
                  color: "#555555",
                }}>
                  {article.category}
                </span>
              </div>

              {/* Card title — Playfair Display for editorial consistency */}
              <h3 style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 600,
                fontSize: "clamp(1.05rem, 1.5vw, 1.25rem)",
                color: "#1A1A1A",
                lineHeight: 1.3,
                letterSpacing: "-0.01em",
                marginBottom: "0.75rem",
              }}>
                {article.title}
              </h3>

              {/* Excerpt */}
              <p style={{
                fontSize: "0.875rem",
                color: "#555555",
                lineHeight: 1.7,
                marginBottom: "1.5rem",
              }}>
                {article.excerpt}
              </p>

              {/* Footer */}
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                borderTop: "1px solid #e5e7eb", paddingTop: "1rem",
              }}>
                <span style={{
                  display: "flex", alignItems: "center", gap: "0.3rem",
                  fontSize: "0.8125rem", color: "#9ca3af",
                }}>
                  <Clock size={12} /> {article.readTime} read
                </span>
                <ArrowRight size={14} color="#1976D2" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .insider-featured-grid { grid-template-columns: 1fr !important; }
          div[style*="repeat(3, 1fr)"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
