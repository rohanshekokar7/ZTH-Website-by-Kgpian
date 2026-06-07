"use client";

import { TrendingUp, ShieldCheck, Trophy, ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
// @ts-ignore
import { ParticleCard } from "./MagicBento";

const ACCENT = "#1976D2";

function SimpleFeatureCard({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon: any;
}) {
  return (
    <ParticleCard
      className="magic-bento-card magic-bento-card--border-glow"
      enableTilt={false}
      enableMagnetism={false}
      clickEffect={true}
      glowColor="25, 118, 210"
      style={{
        width: "100%",
        background: "#ffffff",
        borderRadius: 20,
        border: "1px solid #e2e8f0",
        boxShadow: "0 10px 40px rgba(0,0,0,0.04)",
        display: "flex",
        flexDirection: "column",
        padding: "32px",
        height: "100%",
        cursor: "pointer",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
      }}
    >
      <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", height: "100%" }}>
        <div style={{ 
          width: 56, 
          height: 56, 
          borderRadius: 16, 
          background: "#f0f7ff", 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center",
          marginBottom: 24,
        }}>
          <Icon size={28} color={ACCENT} />
        </div>
        <h3 style={{ fontSize: 22, fontWeight: 700, color: "#0f172a", letterSpacing: "-0.01em", margin: 0, lineHeight: 1.2 }}>
          {title}
        </h3>
        <p style={{ margin: "16px 0 0", fontSize: 15, lineHeight: 1.6, color: "#475569", flex: 1 }}>
          {description}
        </p>

        {/* Explore */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 32 }}>
          <span style={{ fontSize: 15, fontWeight: 600, color: ACCENT }}>Explore</span>
          <div style={{ width: 30, height: 30, borderRadius: "50%", background: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <ArrowRight size={14} color={ACCENT} />
          </div>
        </div>
      </div>
    </ParticleCard>
  );
}

/* ── Exported cards ──────────────── */

export const FundraisingSupportCard = () => (
  <SimpleFeatureCard
    title="Fundraising Support"
    description="Investor-ready pitch decks, financial models, valuation frameworks, and information memorandums — everything you need to walk into the room prepared and raise with confidence."
    icon={TrendingUp}
  />
);

export const ComplianceCard = () => (
  <SimpleFeatureCard
    title="Compliance & Operations"
    description="Company incorporation, GST and regulatory filings, founder and legal documentation, accounting, and DPIIT assistance — your back office, audit-ready from day one."
    icon={ShieldCheck}
  />
);

export const TractionCard = () => (
  <SimpleFeatureCard
    title="Proven Traction"
    description="100+ ventures supported and ₹11–12 Cr+ facilitated across sectors, with bespoke founder advisory that de-risks your venture and optimizes your data room for conversion."
    icon={Trophy}
  />
);
