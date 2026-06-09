'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import HorizontalScrollCards from '@/components/HorizontalScrollCards';

const BLUE = '#1976D2';
const BLUE_LIGHT = '#E3F0FF';
const BG = '#F8FAFD';
const TEXT_MAIN = '#0f172a';
const TEXT_MUTED = '#64748b';

const traction = [
  'Founder & Investor Ecosystem',
  'Strategic Fundraising Coordination',
  'Curated Venture Support',
  'Multi-Stage Capital Preparation',
];

const capitalNetworkCards = [
  {
    title: 'Founder Onboarding',
    desc: 'Access fundraising preparation, strategic support, and ecosystem connectivity through ZTH.',
  },
  {
    title: 'Investor Network',
    desc: 'Connect with curated ventures, strategic opportunities, and founder ecosystems.',
  },
  {
    title: 'Strategic Partnerships',
    desc: 'Collaborate across execution, advisory, operational support, and ecosystem growth initiatives.',
  },
];

function GridCard({ card, i }: { card: { title: string; desc: string }; i: number }) {
  const [spot, setSpot] = useState({ x: 0, y: 0, on: false });
  const move = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setSpot({ x: e.clientX - r.left, y: e.clientY - r.top, on: true });
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={move}
      onMouseLeave={() => setSpot(s => ({ ...s, on: false }))}
      style={{
        background: '#ffffff',
        borderRadius: '12px',
        border: '1px solid rgba(0,0,0,0.07)',
        boxShadow: spot.on
          ? '0 8px 24px rgba(100,116,139,0.12), 0 24px 48px rgba(100,116,139,0.18)'
          : '0 4px 24px rgba(0,0,0,0.06)',
        padding: '2.75rem 2.5rem 3rem',
        display: 'flex', flexDirection: 'column', gap: '1.1rem',
        position: 'relative', overflow: 'hidden',
        transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
        left: i === 0 ? -40 : i === 2 ? 20 : 0,
        transform: spot.on ? 'translateY(-8px) scale(1.015)' : undefined,
        cursor: 'default',
      }}
    >
      <div style={{
        position: 'absolute', inset: 0, borderRadius: '12px', pointerEvents: 'none', zIndex: 0,
        background: spot.on
          ? `radial-gradient(320px circle at ${spot.x}px ${spot.y}px, rgba(25,118,210,0.09) 0%, transparent 80%)`
          : 'transparent',
        transition: spot.on ? 'none' : 'background 0.5s ease',
      }} />
      <p style={{
        fontFamily: "'Inter', sans-serif", fontSize: '1.1rem', fontWeight: 700,
        color: BLUE, lineHeight: 1.2, letterSpacing: '-0.02em',
        position: 'relative', zIndex: 1, margin: 0,
      }}>{card.title}</p>
      <p style={{
        fontFamily: "'Inter', sans-serif", fontSize: '0.875rem',
        color: TEXT_MUTED, lineHeight: 1.65,
        position: 'relative', zIndex: 1, margin: 0,
      }}>{card.desc}</p>
    </motion.div>
  );
}

/* ── Main ───────────────────────────────────────────────────────── */
export default function CapitalNetworkSection({ className }: { className?: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      ref={sectionRef}
      id="capital-network"
      className={`${className || ''} section-pad`}
      style={{ background: BG, position: 'relative', paddingBottom: 0 }}
    >
      {/* ── Decorative background ────────────────────────────────── */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        {/* Grid */}
        <svg width="100%" height="100%" style={{ opacity: 0.4 }}>
          <defs>
            <pattern id="cn-grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="rgba(25,118,210,0.06)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cn-grid)" />
        </svg>
        {/* Glow blobs */}
        <div style={{
          position: 'absolute', top: '-10%', right: '-5%', width: '45vw', height: '45vw',
          borderRadius: '50%', background: 'radial-gradient(circle, rgba(25,118,210,0.07) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }} />
        <div style={{
          position: 'absolute', bottom: '-5%', left: '-5%', width: '35vw', height: '35vw',
          borderRadius: '50%', background: 'radial-gradient(circle, rgba(144,202,249,0.08) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }} />
      </div>

      <div className="container-lg" style={{ position: 'relative', zIndex: 10 }}>

        {/* ── Section header ──────────────────────────────────────── */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.35rem 1rem',
              background: BLUE_LIGHT, border: `1px solid rgba(25,118,210,0.18)`,
              borderRadius: '100px', marginBottom: '1.5rem',
            }}
          >
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: BLUE }} />
            <span style={{
              fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.2em',
              textTransform: 'uppercase', color: BLUE, fontFamily: "'Inter', sans-serif",
            }}>
              Capital Network &amp; Fundraising Support
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "3rem",
              fontWeight: 700,
              color: "#0f172a",
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
              marginBottom: "1.5rem",
              margin: "0 auto 1.5rem",
              maxWidth: 900,
              display: "block",
              textAlign: "center",
            }}
          >
            Strategic Capital Support Beyond<br />
            <span style={{ color: BLUE }}>Investor Introductions.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
            style={{
              fontSize: 'clamp(1rem, 1.4vw, 1.125rem)', color: TEXT_MUTED,
              lineHeight: 1.75, maxWidth: 680, margin: '0 auto',
              fontFamily: "'Inter', sans-serif",
            }}
          >
            ZTH supports ventures during active fundraising through strategic guidance, investor preparation, curated ecosystem access, and structured fundraising coordination.
          </motion.p>
        </div>

        {/* ── Horizontal scroll cards ─────────────────────────────── */}
      </div>
      <HorizontalScrollCards />
      <div className="container-lg" style={{ position: 'relative', zIndex: 10 }}>

        {/* ── Capital Network Grid ────────────────────────────────── */}
        <div style={{ padding: '4rem 0 0' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(2.2rem, 3.5vw, 3rem)',
                fontWeight: 700, color: '#0f172a',
                letterSpacing: '-0.02em', lineHeight: 1.2, margin: 0,
              }}
            >
              Capital <span style={{ color: BLUE }}>Network.</span>
            </motion.p>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '2rem',
            marginBottom: '4.5rem',
          }}
            className="cn-grid"
          >
            {capitalNetworkCards.map((card, i) => (
              <GridCard key={card.title} card={card} i={i} />
            ))}
          </div>
        </div>

        {/* ── Ecosystem Highlights ────────────────────────────────── */}
        <div style={{ width: '100vw', marginLeft: 'calc(50% - 50vw)' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background: 'linear-gradient(135deg, #0a0f1e 0%, #0d1a35 50%, #0a0f1e 100%)',
              borderTop: '1px solid rgba(99,179,237,0.12)',
              borderBottom: '1px solid rgba(99,179,237,0.12)',
              borderRadius: 0,
              padding: '1.6rem 0',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '10%', zIndex: 2, pointerEvents: 'none', background: 'linear-gradient(to right, #0a0f1e 0%, transparent 100%)' }} />
            <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '10%', zIndex: 2, pointerEvents: 'none', background: 'linear-gradient(to left, #0a0f1e 0%, transparent 100%)' }} />
            <div className="marquee-container" style={{ display: 'flex', width: 'max-content' }}>
              {[...traction, ...traction].map((label, i) => (
                <div
                  key={`${label}-${i}`}
                  style={{ display: 'flex', alignItems: 'center', gap: '2.5rem', padding: '0 2.5rem' }}
                >
                  <span style={{
                    color: '#e2e8f0',
                    fontSize: 'clamp(1.1rem, 1.8vw, 1.5rem)',
                    fontWeight: 800,
                    fontFamily: "'Inter', sans-serif",
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    whiteSpace: 'nowrap',
                  }}>
                    {label}
                  </span>
                  <span style={{
                    fontSize: 'clamp(1rem, 1.6vw, 1.4rem)',
                    color: 'rgba(99,179,237,0.7)',
                    flexShrink: 0,
                    filter: 'drop-shadow(0 0 6px rgba(99,179,237,0.5))',
                  }}>✦</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── CTAs ────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ display: 'flex', justifyContent: 'center', gap: '1.25rem', flexWrap: 'wrap', marginTop: '5rem' }}
        >
          <span className="vp-btn-border">
            <button className="vp-btn-inner" onClick={() => window.location.href = '/book'}>
              Apply For Capital Support →
            </button>
          </span>
          <motion.button
            whileHover={{ scale: 1.04, borderColor: BLUE, color: BLUE, background: BLUE_LIGHT }}
            whileTap={{ scale: 0.97 }}
            onClick={() => window.location.href = '/book'}
            style={{
              background: '#ffffff', color: TEXT_MAIN,
              border: '1.5px solid rgba(0,0,0,0.1)', borderRadius: '9999px',
              padding: '1rem 2.5rem', fontSize: '1rem', fontWeight: 600,
              cursor: 'pointer', fontFamily: "'Inter', sans-serif",
              letterSpacing: '-0.01em', transition: 'all 0.3s ease',
            }}
          >
            Join The Network
          </motion.button>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes scroll-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-container {
          animation: scroll-marquee 22s linear infinite;
        }
        .marquee-container:hover {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-container { animation: none; }
        }
        .cn-grid { grid-template-columns: repeat(3, 1fr); }
        @media (max-width: 768px) { .cn-grid { grid-template-columns: 1fr; } }
        @media (min-width: 769px) and (max-width: 1024px) { .cn-grid { grid-template-columns: repeat(2, 1fr); } }
        .spotlight-card-net:hover .card-underline-net {
          opacity: 1 !important;
          transform: scaleX(1) !important;
        }
        .cards-grid-net {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 1.25rem;
        }
        .exec-grid-net {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
        }
        @media (max-width: 1400px) { .cards-grid-net { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 1024px) { .cards-grid-net { grid-template-columns: repeat(2, 1fr); } .exec-grid-net { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 640px)  { .cards-grid-net { grid-template-columns: 1fr; } .exec-grid-net { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  );
}
