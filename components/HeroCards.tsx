"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import type { ReactNode } from "react";

const ACCENT = "#3b82f6";

/* ────────────────────────────────────────────────────────────────
 * Chart / dashboard visuals (the top ~3/4 of each card)
 * ──────────────────────────────────────────────────────────────── */

// Card 1 — gradient bar chart
function BarChartVisual() {
  const bars = [42, 54, 49, 64, 58, 73, 82, 94];
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: "#1e293b" }}>Capital raised</span>
        <span style={{ fontSize: 11, fontWeight: 700, color: "#16a34a", background: "#dcfce7", padding: "2px 8px", borderRadius: 20 }}>+22%</span>
      </div>
      <div style={{ flex: 1, display: "flex", alignItems: "flex-end", gap: 7, minHeight: 0 }}>
        {bars.map((h, i) => (
          <div key={i} style={{ flex: 1, height: `${h}%`, borderRadius: "5px 5px 0 0", background: "linear-gradient(180deg,#93c5fd,#3b82f6)" }} />
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10, fontSize: 10, color: "#94a3b8" }}>
        <span>Start</span>
        <span>Now</span>
      </div>
    </div>
  );
}

// Card 2 — area / line chart
function AreaChartVisual() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: "#1e293b" }}>Readiness score</span>
        <span style={{ fontSize: 11, fontWeight: 700, color: "#4f46e5", background: "#eef2ff", padding: "2px 8px", borderRadius: 20 }}>98%</span>
      </div>
      <div style={{ flex: 1, minHeight: 0 }}>
        <svg viewBox="0 0 300 140" preserveAspectRatio="none" width="100%" height="100%" style={{ display: "block" }}>
          <defs>
            <linearGradient id="hc-area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#6366f1" stopOpacity="0.25" />
              <stop offset="1" stopColor="#6366f1" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0,112 C40,92 70,98 100,72 C140,40 170,62 210,36 C240,18 270,24 300,10 L300,140 L0,140 Z" fill="url(#hc-area)" />
          <path d="M0,112 C40,92 70,98 100,72 C140,40 170,62 210,36 C240,18 270,24 300,10" fill="none" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10, fontSize: 10, color: "#94a3b8" }}>
        <span>Day 1</span>
        <span>Audit-ready</span>
      </div>
    </div>
  );
}

// Card 3 — donut + mini stats
function DonutVisual() {
  const r = 46;
  const c = 2 * Math.PI * r;
  const pct = 0.78;
  const stats = [
    { v: "₹11–12 Cr+", l: "Capital facilitated" },
    { v: "Multi-sector", l: "Founder advisory" },
  ];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 18, height: "100%" }}>
      <div style={{ position: "relative", width: 120, height: 120, flexShrink: 0 }}>
        <svg width="120" height="120" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r={r} fill="none" stroke="#e2e8f0" strokeWidth="12" />
          <circle cx="60" cy="60" r={r} fill="none" stroke="#3b82f6" strokeWidth="12" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - pct)} transform="rotate(-90 60 60)" />
        </svg>
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: 22, fontWeight: 800, color: "#0f172a", lineHeight: 1 }}>100+</span>
          <span style={{ fontSize: 9, color: "#94a3b8", marginTop: 2 }}>ventures</span>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, flex: 1, minWidth: 0 }}>
        {stats.map((s) => (
          <div key={s.l} style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 10, padding: "10px 12px" }}>
            <div style={{ fontSize: 15, fontWeight: 800, color: "#0f172a", letterSpacing: "-0.02em" }}>{s.v}</div>
            <div style={{ fontSize: 10.5, color: "#64748b", marginTop: 1 }}>{s.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────
 * Card shell — compact (image + title + Explore) that reveals a
 * longer description as `reveal` goes 0 → 1.
 * ──────────────────────────────────────────────────────────────── */

function HeroFeatureCard({
  title,
  description,
  visual,
  reveal,
}: {
  title: string;
  description: string;
  visual: ReactNode;
  reveal: MotionValue<number>;
}) {
  // Description reveals over the back half of the enlarge progress.
  const descOpacity = useTransform(reveal, [0.35, 1], [0, 1]);
  const descMaxHeight = useTransform(reveal, [0, 1], [0, 150]);
  const descMarginTop = useTransform(reveal, [0, 1], [0, 14]);

  return (
    <div
      style={{
        width: "100%",
        background: "#ffffff",
        borderRadius: 20,
        border: "1px solid #e2e8f0",
        boxShadow: "0 32px 80px rgba(0,0,0,0.14), 0 4px 20px rgba(0,0,0,0.06)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Visual — the top ~3/4 */}
      <div
        style={{
          height: 300,
          padding: 20,
          background: "linear-gradient(180deg,#f8fafc,#ffffff)",
          borderBottom: "1px solid #f1f5f9",
        }}
      >
        {visual}
      </div>

      {/* Body */}
      <div style={{ padding: "20px 22px 22px", display: "flex", flexDirection: "column" }}>
        <h3 style={{ fontSize: 22, fontWeight: 800, color: "#0f172a", letterSpacing: "-0.02em", margin: 0, lineHeight: 1.1 }}>
          {title}
        </h3>

        <motion.p
          style={{
            margin: 0,
            marginTop: descMarginTop,
            opacity: descOpacity,
            maxHeight: descMaxHeight,
            overflow: "hidden",
            fontSize: 13.5,
            lineHeight: 1.6,
            color: "#64748b",
          }}
        >
          {description}
        </motion.p>

        {/* Explore */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 16 }}>
          <span style={{ fontSize: 15, fontWeight: 600, color: ACCENT }}>Explore</span>
          <div style={{ width: 30, height: 30, borderRadius: "50%", background: "#eff6ff", border: "1px solid #bfdbfe", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="13" height="13" viewBox="0 0 12 12" fill="none">
              <path d="M6 2v8M2 8l4 4 4-4" stroke={ACCENT} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Exported cards (consumed by HeroCardsOverlay) ──────────────── */

export const FundraisingSupportCard = ({ reveal }: { reveal: MotionValue<number> }) => (
  <HeroFeatureCard
    title="Fundraising Support"
    description="Investor-ready pitch decks, financial models, valuation frameworks, and information memorandums — everything you need to walk into the room prepared and raise with confidence."
    visual={<BarChartVisual />}
    reveal={reveal}
  />
);

export const ComplianceCard = ({ reveal }: { reveal: MotionValue<number> }) => (
  <HeroFeatureCard
    title="Compliance & Operations"
    description="Company incorporation, GST and regulatory filings, founder and legal documentation, accounting, and DPIIT assistance — your back office, audit-ready from day one."
    visual={<AreaChartVisual />}
    reveal={reveal}
  />
);

export const TractionCard = ({ reveal }: { reveal: MotionValue<number> }) => (
  <HeroFeatureCard
    title="Proven Traction"
    description="100+ ventures supported and ₹11–12 Cr+ facilitated across sectors, with bespoke founder advisory that de-risks your venture and optimizes your data room for conversion."
    visual={<DonutVisual />}
    reveal={reveal}
  />
);
