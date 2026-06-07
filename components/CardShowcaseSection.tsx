'use client';

import { FundraisingSupportCard, ComplianceCard, TractionCard } from "./HeroCards";

import { GlobalSpotlight } from "./MagicBento";
import { useRef } from "react";

/* ── Main section ─────────────────────────────────────────────── */
export default function CardShowcaseSection() {
  const gridRef = useRef(null);

  return (
    <section id="pre-fundraising" style={{ background: '#ffffff', padding: '4rem 2rem 4rem', position: 'relative', overflow: 'clip' }}>
      <GlobalSpotlight gridRef={gridRef} spotlightRadius={400} glowColor="25, 118, 210" />

      {/* Radial glow */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 40% at 50% 0%, rgba(59,130,246,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

      {/* Section Header */}
      <div style={{
        maxWidth: "800px",
        margin: "0 auto 4rem auto",
        textAlign: "center",
        position: "relative",
        zIndex: 1,
      }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
          padding: '0.35rem 1rem',
          background: '#E3F0FF', border: `1px solid rgba(25,118,210,0.18)`,
          borderRadius: '100px', marginBottom: '1.5rem',
        }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#1976D2' }} />
          <span style={{
            fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.2em',
            textTransform: 'uppercase', color: '#1976D2', fontFamily: "'Inter', sans-serif",
          }}>
            PRE-FUNDRAISING INFRASTRUCTURE
          </span>
        </div>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "3rem",
          fontWeight: 700,
          color: "#0f172a",
          lineHeight: 1.2,
          marginBottom: "1.5rem",
          letterSpacing: "-0.02em"
        }}>
          Built To Prepare Ventures Before <span style={{ color: "#1976D2" }}>They Raise Capital.</span>
        </h2>
        <p style={{
          color: "#475569",
          fontSize: "1.125rem",
          lineHeight: 1.6,
          maxWidth: "700px",
          margin: "0 auto",
          fontFamily: "'Inter', sans-serif"
        }}>
          From investor-ready pitch narratives and financial modeling to valuation strategy and operational readiness Zth helps founders and growing businesses prepare for high-stakes fundraising conversations with greater clarity and confidence.
        </p>
      </div>

      <style>{`
        .showcase-grid {
          display: grid;
          gap: 2rem;
          grid-template-columns: repeat(3, 1fr);
        }
        @media (max-width: 900px) {
          .showcase-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
      <div
        id="hero-cards-row"
        ref={gridRef}
        className="bento-section showcase-grid"
        style={{
          maxWidth: '1260px', margin: '0 auto',
          position: 'relative', zIndex: 1,
        }}
      >
        <FundraisingSupportCard />
        <ComplianceCard />
        <TractionCard />
      </div>
    </section>
  );
}
