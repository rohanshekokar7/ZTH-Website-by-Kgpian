'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SpotlightCard from './SpotlightCard';

const BLUE = '#1976D2';
const BLUE_DARK = '#0D47A1';
const BLUE_LIGHT = '#E3F0FF';
const BG = '#FFFFFF';
const TEXT_MAIN = '#0f172a';
const TEXT_MUTED = '#64748b';

const cat1 = [
  { n: '01', title: 'ZTH at Cap Table', desc: 'Long-term aligned partnerships with ventures across growth and strategic expansion journeys.' },
  { n: '02', title: 'Financial Advisory', desc: 'Ongoing financial guidance, strategic planning, and operational decision support.' },
  { n: '03', title: 'Growth & Governance', desc: 'Support across scaling strategy, investor communication, governance, and business structuring.' },
  { n: '04', title: 'Follow-On Fundraising Support', desc: 'Preparation and strategic guidance for future fundraising rounds and investor engagement.' },
];

const cat2 = [
  { n: '01', title: 'Product & Technology Support', desc: 'Strategic oversight for MVP development, technical architecture scaling, and engineering team building.' },
  { n: '02', title: 'Branding & GTM Execution', desc: 'Go-to-market strategies, brand positioning, and execution support for acquiring early customers.' },
  { n: '03', title: 'Legal & Compliance Coordination', desc: 'Guidance on venture structuring, IP protection, regulatory compliance, and term sheet structuring.' },
  { n: '04', title: 'Finance & Accounting Support', desc: 'Financial modeling, bookkeeping oversight, cap table management, and unit economics optimization.' },
  { n: '05', title: 'Operational Scaling Assistance', desc: 'Process optimization, talent acquisition strategies, and foundational business operations setup.' },
];

const traction = [
  'Long-Term Founder Partnerships',
  'Strategic Growth Support',
  'Cross-Functional Execution Network',
  'Venture Scaling Advisory',
];

/* ── 3-D Card ───────────────────────────────────────────────────── */
function Card3D({
  title, desc, delay, accent = BLUE,
}: {
  n: string; title: string; desc: string; delay: number; accent?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ height: '100%' }}
    >
      <SpotlightCard
        spotlightColor="rgba(25, 118, 210, 0.18)"
        className="spotlight-card-cap"
        style={{
          background: '#ffffff',
          borderRadius: '1.25rem',
          padding: '2rem 1.75rem',
          height: '100%',
          border: '1px solid rgba(0,0,0,0.06)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          cursor: 'default',
          position: 'relative',
        }}
      >
        {/* Top accent */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 3,
          background: `linear-gradient(90deg, ${accent}, #90CAF9, transparent)`,
          borderRadius: '1.25rem 1.25rem 0 0',
        }} />

        {/* Bottom underline — on hover via CSS */}
        <div className="card-underline-cap" style={{
          position: 'absolute', bottom: 0, left: '10%', right: '10%', height: 2,
          background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
          borderRadius: '0 0 4px 4px',
          opacity: 0,
          transition: 'opacity 0.35s ease, transform 0.35s ease',
          transform: 'scaleX(0.4)',
        }} />

        <h3 style={{
          color: TEXT_MAIN, fontSize: '1.05rem', fontWeight: 700,
          lineHeight: 1.3, letterSpacing: '-0.01em', margin: 0,
          fontFamily: "'Inter', sans-serif",
        }}>
          {title}
        </h3>

        <p style={{
          color: TEXT_MUTED, fontSize: '0.875rem', lineHeight: 1.65,
          margin: 0, fontFamily: "'Inter', sans-serif",
        }}>
          {desc}
        </p>
      </SpotlightCard>
    </motion.div>
  );
}

/* ── Section label ──────────────────────────────────────────────── */
function SectionLabel({ title, delay = 0 }: { title: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{
        display: 'flex', alignItems: 'center', gap: '1rem',
        marginBottom: '2rem', marginTop: '5rem',
      }}
    >
      <div style={{ width: 6, height: 6, borderRadius: '50%', background: BLUE, boxShadow: `0 0 8px ${BLUE}` }} />
      <h3 style={{
        fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.18em',
        textTransform: 'uppercase', color: BLUE, margin: 0,
        fontFamily: "'Inter', sans-serif",
      }}>
        {title}
      </h3>
      <div style={{ flex: 1, height: 1, background: 'linear-gradient(to right, rgba(25,118,210,0.2), transparent)' }} />
    </motion.div>
  );
}

/* ── Main component ─────────────────────────────────────────────── */
export default function CapitalSection({ className }: { className?: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      ref={sectionRef}
      id="post-fundraise"
      className={`${className || ''} section-pad`}
      style={{ background: BG, position: 'relative', overflow: 'hidden' }}
    >
      {/* ── Decorative background ────────────────────────────────── */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <svg width="100%" height="100%" style={{ opacity: 0.35 }}>
          <defs>
            <pattern id="cap-grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="rgba(25,118,210,0.06)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cap-grid)" />
        </svg>
        <div style={{
          position: 'absolute', top: '-8%', left: '-4%', width: '42vw', height: '42vw',
          borderRadius: '50%', background: 'radial-gradient(circle, rgba(25,118,210,0.06) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }} />
        <div style={{
          position: 'absolute', bottom: '-6%', right: '-4%', width: '38vw', height: '38vw',
          borderRadius: '50%', background: 'radial-gradient(circle, rgba(144,202,249,0.07) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }} />
      </div>

      <div className="container-lg" style={{ position: 'relative', zIndex: 10 }}>

        {/* ── Header ──────────────────────────────────────────────── */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.35rem 1rem',
              background: BLUE_LIGHT, border: '1px solid rgba(25,118,210,0.18)',
              borderRadius: '100px', marginBottom: '1.5rem',
            }}
          >
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: BLUE }} />
            <span style={{
              fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.2em',
              textTransform: 'uppercase', color: BLUE, fontFamily: "'Inter', sans-serif",
            }}>
              Post-Fundraising &amp; Strategic Partnership
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
              maxWidth: 850,
              display: "block",
              textAlign: "center",
            }}
          >
            Built For Long-Term Venture Alignment{' '}
            <span style={{ color: BLUE }}>Beyond Capital.</span>
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
            ZTH continues supporting ventures beyond fundraising through strategic advisory, operational execution, financial guidance, and long-term ecosystem partnerships designed for sustainable growth.
          </motion.p>
        </div>

        {/* ── Strategic Partnership ────────────────────────────────── */}
        <SectionLabel title="Strategic Partnership" delay={0.15} />
        <div className="cards-grid-cap">
          {cat1.map((item, i) => (
            <Card3D key={item.title} {...item} delay={0.1 + i * 0.08} accent={BLUE} />
          ))}
        </div>

        {/* ── Execution Network ────────────────────────────────────── */}
        <SectionLabel title="Execution Network" delay={0.2} />
        <div className="exec-grid-cap">
          {cat2.map((item, i) => (
            <Card3D key={item.title} {...item} delay={0.1 + i * 0.07} accent={BLUE_DARK} />
          ))}
        </div>

        {/* ── Traction strip ──────────────────────────────────────── */}
        <SectionLabel title="Traction Strip" delay={0.25} />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: '#ffffff',
            border: '1px solid rgba(25,118,210,0.1)',
            borderRadius: '1.5rem',
            padding: '1.75rem 0',
            boxShadow: '0 8px 32px rgba(25,118,210,0.05)',
            overflow: 'hidden',
            // Fade the strip in/out at the edges
            WebkitMaskImage: 'linear-gradient(to right, transparent, #000 7%, #000 93%, transparent)',
            maskImage: 'linear-gradient(to right, transparent, #000 7%, #000 93%, transparent)',
          }}
        >
          {/* Items are duplicated so the -50% loop wraps seamlessly */}
          <div className="traction-track">
            {[...traction, ...traction].map((label, i) => (
              <div key={i} className="traction-item">
                <div style={{
                  width: 36, height: 36, borderRadius: '10px',
                  background: BLUE_LIGHT,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: BLUE }} />
                </div>
                <span style={{
                  color: TEXT_MAIN, fontSize: '0.95rem', fontWeight: 700,
                  fontFamily: "'Inter', sans-serif", letterSpacing: '-0.01em',
                  whiteSpace: 'nowrap',
                }}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── CTAs ────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ display: 'flex', justifyContent: 'center', gap: '1.25rem', flexWrap: 'wrap', marginTop: '5rem' }}
        >
          <motion.button
            whileHover={{ scale: 1.04, boxShadow: '0 16px 36px rgba(25,118,210,0.3)' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => window.location.href = '/book'}
            style={{
              background: `linear-gradient(135deg, ${BLUE}, ${BLUE_DARK})`,
              color: '#fff', border: 'none', borderRadius: '9999px',
              padding: '1rem 2.5rem', fontSize: '1rem', fontWeight: 700,
              cursor: 'pointer', fontFamily: "'Inter', sans-serif",
              boxShadow: '0 8px 24px rgba(25,118,210,0.25)',
              letterSpacing: '-0.01em', transition: 'all 0.3s ease',
            }}
          >
            Explore Strategic Partnership →
          </motion.button>

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
            Partner With ZTH
          </motion.button>
        </motion.div>
      </div>

      <style jsx>{`
        .spotlight-card-cap:hover .card-underline-cap {
          opacity: 1 !important;
          transform: scaleX(1) !important;
        }
        /* ── Traction strip marquee ── */
        .traction-track {
          display: flex;
          width: max-content;
          animation: traction-marquee 22s linear infinite;
        }
        .traction-track:hover {
          animation-play-state: paused;
        }
        .traction-item {
          display: flex;
          align-items: center;
          gap: 0.875rem;
          margin-right: 4rem; /* uniform spacing incl. the wrap boundary → seamless loop */
        }
        @keyframes traction-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .traction-track { animation: none; }
        }
        .cards-grid-cap {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.25rem;
        }
        .exec-grid-cap {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 1.25rem;
        }
        @media (max-width: 1400px) { .exec-grid-cap { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 1024px) { .cards-grid-cap { grid-template-columns: repeat(2, 1fr); } .exec-grid-cap { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 640px)  { .cards-grid-cap { grid-template-columns: 1fr; } .exec-grid-cap { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  );
}
