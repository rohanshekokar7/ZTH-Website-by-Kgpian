'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SpotlightCard from './SpotlightCard';

const BLUE = '#1976D2';
const BLUE_LIGHT = '#E3F0FF';
const BG = '#F8FAFD';
const TEXT_MAIN = '#0f172a';
const TEXT_MUTED = '#64748b';

const cat1 = [
  { n: '01', title: 'Investor Meeting Preparation', desc: 'Preparation support for investor conversations, presentations, and fundraising discussions.' },
  { n: '02', title: 'Pitch Day Support', desc: 'Strategic support during pitch events, demo days, and investor-facing opportunities.' },
  { n: '03', title: 'Deal Structuring Support', desc: 'Assistance across fundraising structuring, documentation coordination, and strategic financial discussions.' },
  { n: '04', title: 'Due Diligence Coordination', desc: 'Support for investor data preparation, documentation workflows, and fundraising readiness processes.' },
  { n: '05', title: 'Investor Communication Support', desc: 'Ongoing support across investor follow-ups, fundraising updates, and strategic communication.' },
];

const cat2 = [
  { n: '01', title: 'Founder Onboarding', desc: 'Access fundraising preparation, strategic support, and ecosystem connectivity through ZTH.' },
  { n: '02', title: 'Investor Network', desc: 'Connect with curated ventures, strategic opportunities, and founder ecosystems.' },
  { n: '03', title: 'Strategic Partnerships', desc: 'Collaborate across execution, advisory, operational support, and ecosystem growth initiatives.' },
];

const traction = [
  'Founder & Investor Ecosystem',
  'Strategic Fundraising Coordination',
  'Curated Venture Support',
  'Multi-Stage Capital Preparation',
];

/* ── 3-D Card ───────────────────────────────────────────────────── */
function Card3D({
  title, desc, delay, color = BLUE,
}: {
  n: string; title: string; desc: string; delay: number; color?: string;
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
        className="spotlight-card-net"
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
        {/* Top accent line */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 3,
          background: `linear-gradient(90deg, ${color}, #90CAF9, transparent)`,
          borderRadius: '1.25rem 1.25rem 0 0',
        }} />

        {/* Bottom underline — appears on hover via CSS */}
        <div className="card-underline-net" style={{
          position: 'absolute', bottom: 0, left: '10%', right: '10%', height: 2,
          background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
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

/* ── Section heading ────────────────────────────────────────────── */
function SectionLabel({ title, delay }: { title: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: delay ?? 0, ease: [0.16, 1, 0.3, 1] }}
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

/* ── Main ───────────────────────────────────────────────────────── */
export default function CapitalNetworkSection({ className }: { className?: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      ref={sectionRef}
      id="capital-network"
      className={`${className || ''} section-pad`}
      style={{ background: BG, position: 'relative', overflow: 'hidden' }}
    >
      {/* ── Decorative background ────────────────────────────────── */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
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
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(2.35rem, 3.8vw, 3.75rem)',
              fontWeight: 700, color: TEXT_MAIN,
              letterSpacing: '-0.02em', lineHeight: 1.15,
              margin: '0 auto 1.5rem', maxWidth: 900, display: 'block',
              textAlign: 'center',
            }}
          >
            Strategic Capital Support Beyond{' '}
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

        {/* ── During Fundraising Support ──────────────────────────── */}
        <SectionLabel title="During Fundraising Support" delay={0.15} />
        <div className="cards-grid-net">
          {cat1.map((item, i) => (
            <Card3D key={item.title} {...item} delay={0.1 + i * 0.07} />
          ))}
        </div>

        {/* ── Capital Network ─────────────────────────────────────── */}
        <SectionLabel title="Capital Network" delay={0.2} />
        <div className="exec-grid-net">
          {cat2.map((item, i) => (
            <Card3D key={item.title} {...item} delay={0.1 + i * 0.09} color="#0D47A1" />
          ))}
        </div>

        {/* ── Ecosystem Highlights ────────────────────────────────── */}
        <SectionLabel title="Ecosystem Highlights" delay={0.25} />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: '#ffffff',
            border: '1px solid rgba(25,118,210,0.1)',
            borderRadius: '1.5rem',
            padding: '2.5rem 3rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem',
            boxShadow: '0 8px 32px rgba(25,118,210,0.05)',
          }}
        >
          {traction.map((label, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.07 }}
              style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}
            >
              <div style={{
                width: 36, height: 36, borderRadius: '10px',
                background: BLUE_LIGHT, display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: BLUE }} />
              </div>
              <span style={{
                color: TEXT_MAIN, fontSize: '0.95rem', fontWeight: 700,
                fontFamily: "'Inter', sans-serif", letterSpacing: '-0.01em',
              }}>
                {label}
              </span>
            </motion.div>
          ))}
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
              background: `linear-gradient(135deg, ${BLUE}, #0D47A1)`,
              color: '#fff', border: 'none', borderRadius: '9999px',
              padding: '1rem 2.5rem', fontSize: '1rem', fontWeight: 700,
              cursor: 'pointer', fontFamily: "'Inter', sans-serif",
              boxShadow: '0 8px 24px rgba(25,118,210,0.25)', letterSpacing: '-0.01em',
              transition: 'all 0.3s ease',
            }}
          >
            Apply For Capital Support →
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
            Join The Network
          </motion.button>
        </motion.div>
      </div>

      <style jsx>{`
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
