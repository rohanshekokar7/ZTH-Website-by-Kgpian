"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";

/* ─────────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────────── */
const featured = {
  category: "Fundraising",
  label: "Editor's Pick",
  title: "Why 90% of Pitch Decks Fail in the First 30 Seconds",
  excerpt:
    "Most founders think their deck fails because of bad financials or a weak team slide. The truth is far simpler — investors decide in seconds whether to lean in or lean back. Understanding that decision changes how you build everything.",
  readTime: "6 min read",
  insight:
    "The first slide isn't your product. It's your judgment. Investors read your deck like a first impression — and first impressions are made before the numbers.",
};

const articles = [
  {
    category: "Investor Relations",
    tag: "Deep Dive",
    title: "The 5 Questions Every VC Asks That Most Founders Can't Answer",
    excerpt:
      "Investors have a mental checklist. We decoded it so you can walk in prepared for every room.",
    readTime: "8 min read",
  },
  {
    category: "Strategy",
    tag: "Framework",
    title: "How to Build a $10M ARR Story at a $500K Revenue Stage",
    excerpt:
      "Investors aren't funding your present — they're betting on your future. Here's how to tell that story convincingly.",
    readTime: "10 min read",
  },
  {
    category: "Legal & Cap Table",
    tag: "Plain English",
    title: "SAFE Notes vs Convertible Notes: What You're Actually Agreeing To",
    excerpt:
      "Before you sign anything, understand exactly what you're agreeing to and how it affects your cap table long-term.",
    readTime: "7 min read",
  },
];

const founderQuote = {
  quote:
    "ZTH didn't just help us build a pitch deck. They helped us understand why investors say no — and precisely how to make them say yes.",
  name: "Arjun Mehta",
  role: "Co-founder & CEO",
  company: "Series A — ₹18Cr Raised",
  initials: "AM",
};

const investorPullQuote =
  "The founders who get funded aren't always the smartest in the room. They're the ones who speak the investor's language before they even walk in.";

/* ─────────────────────────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────────────────────────── */
const BLUE = "#1976D2";
const DARK = "#0A0A0F";
const MUTED = "#6B7280";
const RULE = "rgba(0,0,0,0.07)";

function CategoryPill({ label, blue = false }: { label: string; blue?: boolean }) {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "0.22rem 0.7rem",
        borderRadius: "100px",
        fontSize: "0.63rem",
        fontWeight: 700,
        letterSpacing: "0.13em",
        textTransform: "uppercase",
        fontFamily: "'Inter', sans-serif",
        background: blue ? "rgba(25,118,210,0.08)" : "rgba(0,0,0,0.04)",
        border: `1px solid ${blue ? "rgba(25,118,210,0.18)" : "rgba(0,0,0,0.07)"}`,
        color: blue ? BLUE : "#555",
      }}
    >
      {label}
    </span>
  );
}

/* ─────────────────────────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────────────────────────── */
export default function InsiderSection({ onCTAClick }: { onCTAClick: () => void }) {
  return (
    <section
      id="insider"
      className="section-pad"
      style={{ position: "relative", overflow: "hidden", background: "#FAFAFA" }}
    >
      {/* Top rule */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 1,
        background: `linear-gradient(90deg, transparent, ${BLUE}22, transparent)`,
      }} />

      <div className="container-xl">

        {/* ── Section header ──────────────────────────────────────────── */}
        <div style={{
          display: "flex", alignItems: "flex-end", justifyContent: "space-between",
          flexWrap: "wrap", gap: "1.5rem", marginBottom: "3.5rem",
          paddingBottom: "2.5rem",
          borderBottom: `1px solid ${RULE}`,
        }}>
          <div style={{ maxWidth: 680 }}>
            <motion.p
              className="label-small"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              style={{ marginBottom: "0.75rem" }}
            >
              ZTH Insider
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(2rem, 3.5vw, 3.25rem)",
                fontWeight: 700, color: DARK,
                lineHeight: 1.12, letterSpacing: "-0.02em",
                marginBottom: "0.75rem",
              }}
            >
              Intelligence That{" "}
              <span style={{ color: BLUE }}>Gets You Funded</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.15 }}
              style={{
                fontSize: "1.05rem", color: MUTED,
                lineHeight: 1.7, margin: 0,
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Investor psychology, fundraising frameworks, and cap table strategy —
              written for founders who want the unfiltered version.
            </motion.p>
          </div>

          <motion.button
            className="btn-secondary"
            onClick={onCTAClick}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{ flexShrink: 0 }}
          >
            View All Articles <ArrowRight size={15} />
          </motion.button>
        </div>

        {/* ── Featured + founder quote grid ───────────────────────────── */}
        <div className="insider-hero-grid" style={{ display: "grid", gap: "1.5rem", marginBottom: "1.5rem" }}>

          {/* Left — featured editorial card */}
          <motion.article
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            onClick={onCTAClick}
            style={{
              background: "#ffffff",
              border: `1px solid ${RULE}`,
              borderRadius: "1.25rem",
              padding: "2.5rem",
              cursor: "pointer",
              position: "relative",
              overflow: "hidden",
              transition: "box-shadow 0.3s ease, transform 0.3s ease",
            }}
            whileHover={{ y: -3, boxShadow: "0 20px 56px rgba(0,0,0,0.07)" }}
          >
            {/* Top accent */}
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0, height: 2,
              background: `linear-gradient(90deg, ${BLUE}, #90CAF9, transparent)`,
            }} />

            {/* Meta row */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.5rem" }}>
              <CategoryPill label={featured.category} blue />
              <span style={{
                padding: "0.22rem 0.7rem", borderRadius: "100px",
                background: "rgba(255,193,7,0.1)", border: "1px solid rgba(255,193,7,0.25)",
                fontSize: "0.63rem", fontWeight: 700, letterSpacing: "0.13em",
                textTransform: "uppercase", color: "#B45309",
                fontFamily: "'Inter', sans-serif",
              }}>
                {featured.label}
              </span>
              <span style={{
                marginLeft: "auto",
                fontSize: "0.8rem", color: MUTED,
                fontFamily: "'Inter', sans-serif",
              }}>
                {featured.readTime}
              </span>
            </div>

            {/* Title */}
            <h3 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 700,
              fontSize: "clamp(1.5rem, 2.2vw, 2rem)",
              color: DARK, lineHeight: 1.22,
              letterSpacing: "-0.02em",
              marginBottom: "1rem",
            }}>
              {featured.title}
            </h3>

            {/* Excerpt */}
            <p style={{
              fontSize: "0.975rem", color: MUTED,
              lineHeight: 1.75, marginBottom: "2rem",
              fontFamily: "'Inter', sans-serif",
            }}>
              {featured.excerpt}
            </p>

            {/* Pull quote */}
            <div style={{
              borderLeft: `3px solid ${BLUE}`,
              paddingLeft: "1.25rem",
              marginBottom: "2rem",
            }}>
              <p style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "1rem", fontStyle: "italic",
                color: "rgba(0,0,0,0.65)", lineHeight: 1.65,
                margin: 0,
              }}>
                &ldquo;{featured.insight}&rdquo;
              </p>
            </div>

            {/* Read link */}
            <div style={{
              display: "flex", alignItems: "center", gap: "0.35rem",
              fontSize: "0.875rem", fontWeight: 700, color: BLUE,
              fontFamily: "'Inter', sans-serif",
            }}>
              Read Full Article <ArrowUpRight size={14} />
            </div>
          </motion.article>

          {/* Right — founder quote panel (dark) */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background: DARK,
              borderRadius: "1.25rem",
              padding: "2.5rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Decorative quote mark */}
            <div style={{
              position: "absolute", top: "1.5rem", right: "2rem",
              fontSize: "7rem", lineHeight: 1, color: "rgba(255,255,255,0.04)",
              fontFamily: "Georgia, serif", userSelect: "none", pointerEvents: "none",
            }}>
              &ldquo;
            </div>

            {/* Label */}
            <div style={{ marginBottom: "2rem" }}>
              <span style={{
                fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.16em",
                textTransform: "uppercase", color: "rgba(255,255,255,0.35)",
                fontFamily: "'Inter', sans-serif",
              }}>
                Founder Story
              </span>
            </div>

            {/* Quote */}
            <blockquote style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(1.1rem, 1.6vw, 1.35rem)",
              fontWeight: 600,
              color: "rgba(255,255,255,0.92)",
              lineHeight: 1.6,
              letterSpacing: "-0.01em",
              margin: "0 0 2.5rem",
              flex: 1,
            }}>
              &ldquo;{founderQuote.quote}&rdquo;
            </blockquote>

            {/* Attribution */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.875rem" }}>
              {/* Avatar */}
              <div style={{
                width: 40, height: 40, borderRadius: "50%",
                background: `linear-gradient(135deg, ${BLUE}, #0D47A1)`,
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                <span style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.75rem", fontWeight: 800, color: "#fff",
                }}>
                  {founderQuote.initials}
                </span>
              </div>
              <div>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.875rem", fontWeight: 700,
                  color: "rgba(255,255,255,0.9)", margin: 0, lineHeight: 1.3,
                }}>
                  {founderQuote.name}
                </p>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.75rem", color: "rgba(255,255,255,0.4)",
                  margin: 0, lineHeight: 1.4,
                }}>
                  {founderQuote.role} · {founderQuote.company}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Secondary articles — editorial list ──────────────────────── */}
        <div style={{
          background: "#ffffff",
          border: `1px solid ${RULE}`,
          borderRadius: "1.25rem",
          overflow: "hidden",
          marginBottom: "1.5rem",
        }}>
          {articles.map((article, i) => (
            <motion.article
              key={article.title}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              onClick={onCTAClick}
              style={{
                display: "grid",
                padding: "1.75rem 2rem",
                borderBottom: i < articles.length - 1 ? `1px solid ${RULE}` : "none",
                cursor: "pointer",
                transition: "background 0.2s ease",
                position: "relative",
              }}
              className="insider-list-row"
              whileHover={{ backgroundColor: "rgba(25,118,210,0.015)" }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", gap: "1.5rem" }}>
                {/* Index number */}
                <span style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.7rem", fontWeight: 800,
                  color: "rgba(0,0,0,0.15)",
                  letterSpacing: "0.05em",
                  paddingTop: "0.2rem",
                  flexShrink: 0,
                  minWidth: "1.5rem",
                }}>
                  0{i + 2}
                </span>

                {/* Content */}
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem", flexWrap: "wrap" }}>
                    <CategoryPill label={article.category} />
                    <span style={{
                      fontSize: "0.63rem", fontWeight: 600, letterSpacing: "0.1em",
                      textTransform: "uppercase", color: "rgba(0,0,0,0.3)",
                      fontFamily: "'Inter', sans-serif",
                    }}>
                      {article.tag}
                    </span>
                  </div>

                  <h3 style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontWeight: 600, fontSize: "clamp(1rem, 1.4vw, 1.2rem)",
                    color: DARK, lineHeight: 1.3, letterSpacing: "-0.01em",
                    marginBottom: "0.4rem",
                  }}>
                    {article.title}
                  </h3>

                  <p style={{
                    fontSize: "0.875rem", color: MUTED,
                    lineHeight: 1.65, margin: 0,
                    fontFamily: "'Inter', sans-serif",
                  }}>
                    {article.excerpt}
                  </p>
                </div>

                {/* Right — read time + arrow */}
                <div style={{
                  display: "flex", flexDirection: "column",
                  alignItems: "flex-end", gap: "0.5rem",
                  flexShrink: 0, paddingTop: "0.2rem",
                }}>
                  <span style={{
                    fontSize: "0.775rem", color: "rgba(0,0,0,0.3)",
                    fontFamily: "'Inter', sans-serif", whiteSpace: "nowrap",
                  }}>
                    {article.readTime}
                  </span>
                  <ArrowUpRight size={15} color={BLUE} style={{ opacity: 0.6 }} />
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* ── Investor insight pull quote ───────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: `linear-gradient(135deg, rgba(25,118,210,0.05) 0%, rgba(13,71,161,0.04) 100%)`,
            border: `1px solid rgba(25,118,210,0.12)`,
            borderRadius: "1.25rem",
            padding: "2.75rem 3rem",
            display: "flex",
            alignItems: "center",
            gap: "2.5rem",
            flexWrap: "wrap",
          }}
        >
          {/* Left label */}
          <div style={{ flexShrink: 0 }}>
            <div style={{
              width: 48, height: 48, borderRadius: "12px",
              background: `linear-gradient(135deg, ${BLUE}, #0D47A1)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              marginBottom: "0.75rem",
            }}>
              <span style={{ color: "#fff", fontSize: "1.25rem", fontWeight: 900, fontFamily: "Georgia, serif", lineHeight: 1 }}>
                &ldquo;
              </span>
            </div>
            <p style={{
              fontSize: "0.63rem", fontWeight: 700, letterSpacing: "0.15em",
              textTransform: "uppercase", color: BLUE,
              fontFamily: "'Inter', sans-serif", margin: 0,
            }}>
              Investor<br />Insight
            </p>
          </div>

          {/* Divider */}
          <div style={{ width: 1, height: 64, background: `rgba(25,118,210,0.15)`, flexShrink: 0 }} />

          {/* Quote */}
          <blockquote style={{ flex: 1, margin: 0 }}>
            <p style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(1.1rem, 1.7vw, 1.4rem)",
              fontWeight: 600, fontStyle: "italic",
              color: DARK, lineHeight: 1.6,
              letterSpacing: "-0.01em", margin: 0,
            }}>
              &ldquo;{investorPullQuote}&rdquo;
            </p>
          </blockquote>

          {/* CTA */}
          <motion.button
            onClick={onCTAClick}
            whileHover={{ scale: 1.03, boxShadow: "0 10px 28px rgba(25,118,210,0.22)" }}
            whileTap={{ scale: 0.97 }}
            style={{
              background: `linear-gradient(135deg, ${BLUE}, #0D47A1)`,
              color: "#fff", border: "none", borderRadius: "100px",
              padding: "0.75rem 1.75rem",
              fontSize: "0.875rem", fontWeight: 700,
              cursor: "pointer", fontFamily: "'Inter', sans-serif",
              letterSpacing: "-0.01em", flexShrink: 0,
              boxShadow: "0 4px 16px rgba(25,118,210,0.2)",
              transition: "all 0.25s ease",
              display: "flex", alignItems: "center", gap: "0.4rem",
            }}
          >
            Access Insider <ArrowRight size={14} />
          </motion.button>
        </motion.div>

      </div>

      <style jsx>{`
        .insider-hero-grid {
          grid-template-columns: 3fr 2fr;
        }
        @media (max-width: 900px) {
          .insider-hero-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          .insider-list-row > div { flex-wrap: wrap; }
        }
      `}</style>
    </section>
  );
}
