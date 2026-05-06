"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { BookOpen, Clock, ArrowRight, TrendingUp } from "lucide-react";

const articles = [
  {
    category: "Fundraising", title: "Why 90% of Pitch Decks Fail in the First 30 Seconds",
    excerpt: "Most founders think their deck fails because of bad financials. The truth is far simpler — and more fixable.",
    readTime: "6 min", gradient: "linear-gradient(135deg, rgba(25,118,210,0.06), rgba(25,118,210,0.01))",
  },
  {
    category: "Investor Relations", title: "The 5 Questions Every VC Asks That Most Founders Can't Answer",
    excerpt: "Investors have a mental checklist. We decoded it so you can walk in prepared for every room.",
    readTime: "8 min", gradient: "linear-gradient(135deg, rgba(59,130,246,0.05), rgba(59,130,246,0.01))",
  },
  {
    category: "Strategy", title: "How to Build a $10M ARR Story at a $500K Revenue Stage",
    excerpt: "Investors aren't funding your present — they're betting on your future. Here's how to tell that story.",
    readTime: "10 min", gradient: "linear-gradient(135deg, rgba(168,85,247,0.05), rgba(168,85,247,0.01))",
  },
  {
    category: "Tools", title: "SAFE Notes vs Convertible Notes: A Founder's Plain-English Guide",
    excerpt: "Before you sign anything, understand exactly what you're agreeing to and how it affects your cap table.",
    readTime: "7 min", gradient: "linear-gradient(135deg, rgba(34,197,94,0.04), rgba(34,197,94,0.01))",
  },
];

export default function InsiderSection({ onCTAClick }: { onCTAClick: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="insider" ref={containerRef} className="section-pad"
      style={{ position: "relative", overflow: "hidden", background: "#ffffff" }}
    >
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 1,
        background: "linear-gradient(90deg, transparent, rgba(25,118,210,0.12), transparent)",
      }} />

      <div className="container-xl">
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "2rem", marginBottom: "3rem" }}>
          <div>
            <motion.p className="label-small"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              style={{ marginBottom: "1rem" }}
            >
              Zth Insider
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
              Knowledge That{" "}
              <span style={{
                color: "#1976D2",
              }}>Gets You Funded</span>
            </motion.h2>
          </div>
          <motion.button
            className="btn-secondary" onClick={onCTAClick}
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          >
            View All Articles <ArrowRight size={16} />
          </motion.button>
        </div>

        {/* Featured */}
        <motion.div
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          whileHover={{ y: -4, boxShadow: "0 20px 60px rgba(0,0,0,0.08)" }}
          style={{
            padding: 0, marginBottom: "1.5rem", overflow: "hidden",
            cursor: "pointer", background: articles[0].gradient,
            borderRadius: "1.25rem", border: "1px solid #e5e7eb",
            boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
          onClick={onCTAClick}
        >
          <div className="insider-featured-grid" style={{ padding: "2.5rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.5rem", alignItems: "center" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
                <span style={{
                  padding: "0.25rem 0.75rem", background: "rgba(25,118,210,0.08)",
                  border: "1px solid rgba(25,118,210,0.12)", borderRadius: "100px",
                  fontFamily: "'Inter', sans-serif", fontSize: "0.7rem", fontWeight: 700,
                  letterSpacing: "0.1em", color: "#1976D2",
                }}>
                  {articles[0].category}
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "#9ca3af" }}>
                  <Clock size={12} /> {articles[0].readTime} read
                </span>
              </div>
              <h3 style={{
                fontFamily: "'Inter', sans-serif", fontWeight: 700,
                fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)",
                color: "#1A1A1A", lineHeight: 1.25, marginBottom: "1rem",
              }}>
                {articles[0].title}
              </h3>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", color: "#555555", lineHeight: 1.65, marginBottom: "2rem" }}>
                {articles[0].excerpt}
              </p>
              <div style={{
                display: "flex", alignItems: "center", gap: "0.4rem",
                fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", fontWeight: 700, color: "#1976D2",
              }}>
                Read Article <ArrowRight size={14} />
              </div>
            </div>

            <div style={{
              background: "rgba(25,118,210,0.04)", border: "1px solid rgba(25,118,210,0.08)",
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
                    flex: 1, height: h, borderRadius: "4px 4px 0 0",
                    background: i === 4 ? "linear-gradient(135deg, #1976D2, #90CAF9)" : "rgba(0,0,0,0.04)",
                    alignSelf: "flex-end",
                  }} />
                ))}
              </div>
              <TrendingUp size={20} color="#1976D2" style={{ marginTop: "0.25rem" }} />
            </div>
          </div>
        </motion.div>

        {/* 3 smaller cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem" }}>
          {articles.slice(1).map((article, i) => (
            <motion.div
              key={article.title}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              whileHover={{ y: -5, boxShadow: "0 16px 40px rgba(0,0,0,0.06)" }}
              style={{
                padding: "2rem", cursor: "pointer", background: article.gradient,
                borderRadius: "1.25rem", border: "1px solid #e5e7eb",
                boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
              onClick={onCTAClick}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.25rem" }}>
                <span style={{
                  padding: "0.2rem 0.6rem", background: "rgba(0,0,0,0.03)",
                  border: "1px solid rgba(0,0,0,0.06)", borderRadius: "100px",
                  fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", fontWeight: 700,
                  letterSpacing: "0.1em", color: "#555555",
                }}>
                  {article.category}
                </span>
              </div>
              <h3 style={{
                fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "1rem",
                color: "#1A1A1A", lineHeight: 1.35, marginBottom: "0.75rem",
              }}>
                {article.title}
              </h3>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", color: "#555555", lineHeight: 1.65, marginBottom: "1.5rem" }}>
                {article.excerpt}
              </p>
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                borderTop: "1px solid #e5e7eb", paddingTop: "1rem",
              }}>
                <span style={{
                  display: "flex", alignItems: "center", gap: "0.3rem",
                  fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "#9ca3af",
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
