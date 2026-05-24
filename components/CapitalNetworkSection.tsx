'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import StarBorder from './StarBorder';

// --─ Design tokens ────────────────────────────────────────────────────────────
const BLUE = '#1976D2';
const BG = '#FAFAFA'; // Premium light background
const CARD_BG = 'rgba(255, 255, 255, 0.7)'; // Light glassmorphism
const CARD_BORDER = 'rgba(0, 0, 0, 0.06)';
const TEXT_MAIN = '#0f172a'; // Dark text
const TEXT_MUTED = '#475569'; // Muted dark text

// --─ Data ─────────────────────────────────────────────────────────────────────
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

// --─ Primitives ───────────────────────────────────────────────────────────────
function SectionHeading({ title, delay = 0, inView }: { title: string; delay?: number; inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1.25rem',
        marginBottom: '2.5rem',
        marginTop: '5.5rem'
      }}
    >
      <h3
        style={{
          fontSize: '1.4rem',
          fontWeight: 800,
          color: TEXT_MAIN,
          margin: 0,
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
        }}
      >
        {title}
      </h3>
      <div style={{ flex: 1, height: '1px', background: `linear-gradient(to right, ${CARD_BORDER}, transparent)` }} />
    </motion.div>
  );
}

// --─ Main Component ───────────────────────────────────────────────────────────
export default function CapitalNetworkSection({ className }: { className?: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      ref={sectionRef}
      id="capital-network"
      className={className}
      style={{
        background: BG,
        padding: '6rem 0 8rem',
        fontFamily: "'Inter', sans-serif",
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* ── Background Noise / Grid Overlay ───────────────────────── */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <svg width="100%" height="100%" style={{ opacity: 0.3 }}>
          <defs>
            <pattern id="premium-grid-network" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#premium-grid-network)" />
        </svg>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 50% 0%, rgba(25, 118, 210, 0.05), transparent 60%)'
        }} />
      </div>

      <div
        style={{
          maxWidth: 1400,
          margin: '0 auto',
          padding: '0 clamp(1.5rem, 5vw, 3rem)',
          position: 'relative',
          zIndex: 10
        }}
      >
        {/* -- HEADER ─────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <p
            style={{
              fontSize: '0.8rem',
              fontWeight: 700,
              letterSpacing: '0.25em',
              color: BLUE,
              textTransform: 'uppercase',
              marginBottom: '1rem',
            }}
          >
            CAPITAL NETWORK &amp; FUNDRAISING SUPPORT
          </p>
          <h2
            style={{
              fontSize: 'clamp(2.5rem, 4.5vw, 3.5rem)',
              fontWeight: 900,
              color: TEXT_MAIN,
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
              margin: '0 auto 1.5rem',
              maxWidth: 850,
            }}
          >
            Strategic Capital Support{' '}
            <span style={{ color: BLUE }}>
              Beyond Investor Introductions.
            </span>
          </h2>

          <p
            style={{
              fontSize: 'clamp(1.05rem, 1.4vw, 1.2rem)',
              color: TEXT_MUTED,
              lineHeight: 1.7,
              maxWidth: 750,
              margin: '0 auto',
              fontFamily: "'Times New Roman', Times, serif"
            }}
          >
            ZTH supports ventures during active fundraising through strategic guidance, investor preparation, curated ecosystem access, and structured fundraising coordination.
          </p>
        </motion.div>

        {/* -- SECTION 1: DURING FUNDRAISING SUPPORT ────────────────────── */}
        <SectionHeading title="During Fundraising Support" delay={0.2} inView={inView} />

        <div className="cards-grid-net">
          {cat1.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: 0.3 + (0.1 * i),
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{
                y: -6,
                scale: 1.02,
                boxShadow: `0 0 0 2px ${BLUE}, 0 20px 40px rgba(25, 118, 210, 0.25)`,
              }}
              style={{
                borderRadius: '1rem',
                boxShadow: '0 8px 32px rgba(0,0,0,0.04)',
                display: 'flex',
                height: '100%',
                position: 'relative',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              <StarBorder as="div" color={BLUE} speed="4s" thickness={2} className="w-full h-full" style={{ width: '100%', height: '100%' }}>
                <div style={{
                  padding: '1.5rem 1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                  height: '100%',
                  background: CARD_BG,
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  border: `1px solid ${CARD_BORDER}`,
                  borderRadius: '1rem'
                }}>
                  <div>
                    <h3
                      style={{
                        color: TEXT_MAIN,
                        fontSize: '1.15rem',
                        fontWeight: 800,
                        marginBottom: '0.5rem',
                        lineHeight: 1.3,
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {item.title}
                    </h3>
                    <p
                      style={{
                        color: TEXT_MUTED,
                        fontSize: '0.9rem',
                        lineHeight: 1.5,
                        margin: 0,
                      }}
                    >
                      {item.desc}
                    </p>
                  </div>
                </div>
              </StarBorder>
            </motion.div>
          ))}
        </div>

        {/* -- SECTION 2: CAPITAL NETWORK ───────────────────────── */}
        <SectionHeading title="Capital Network" delay={0.4} inView={inView} />

        <div className="execution-grid-net">
          {cat2.map((item, i) => (
            <motion.div
              key={item.title}
              className="execution-card"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: 0.5 + (0.08 * i),
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{
                y: -6,
                scale: 1.02,
                boxShadow: `0 0 0 2px ${BLUE}, 0 20px 40px rgba(25, 118, 210, 0.25)`,
              }}
              style={{
                borderRadius: '1rem',
                boxShadow: '0 8px 32px rgba(0,0,0,0.04)',
                display: 'flex',
                height: '100%',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              <StarBorder as="div" color={BLUE} speed="4s" thickness={2} className="w-full h-full" style={{ width: '100%', height: '100%' }}>
                <div style={{
                  padding: '2rem 1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  height: '100%',
                  background: CARD_BG,
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  border: `1px solid ${CARD_BORDER}`,
                  borderRadius: '1rem'
                }}>
                  <div>
                    <h4
                      style={{
                        color: TEXT_MAIN,
                        fontSize: '1.2rem',
                        fontWeight: 800,
                        margin: '0 0 0.75rem',
                        lineHeight: 1.3,
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {item.title}
                    </h4>
                    <p
                      style={{
                        color: TEXT_MUTED,
                        fontSize: '0.95rem',
                        lineHeight: 1.65,
                        margin: 0,
                      }}
                    >
                      {item.desc}
                    </p>
                  </div>
                </div>
              </StarBorder>
            </motion.div>
          ))}
        </div>

        {/* -- SECTION 3: TRACTION STRIP ──────────────────────────── */}
        <SectionHeading title="Ecosystem Highlights" delay={0.6} inView={inView} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            border: `1px solid ${CARD_BORDER}`,
            borderRadius: '1rem',
            background: CARD_BG,
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            padding: '2.5rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.5rem',
            boxShadow: '0 8px 32px rgba(0,0,0,0.04)',
          }}
        >
          {traction.map((label, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.8 + (i * 0.08), ease: 'easeOut' }}
              style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: BLUE,
                  boxShadow: `0 0 12px ${BLUE}`,
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  color: TEXT_MAIN,
                  fontSize: '1.05rem',
                  fontWeight: 700,
                  letterSpacing: '0em',
                }}
              >
                {label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* -- CTAs ───────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1.5rem',
            flexWrap: 'wrap',
            marginTop: '5.5rem'
          }}
        >
          {/* Primary */}
          <motion.button
            whileHover={{ scale: 1.04, boxShadow: `0 12px 30px rgba(25,118,210, 0.3)` }}
            whileTap={{ scale: 0.97 }}
            onClick={() => window.location.href = '/book'}
            style={{
              background: BLUE,
              color: '#fff',
              border: 'none',
              borderRadius: '9999px',
              padding: '1.1rem 2.75rem',
              fontSize: '1.1rem',
              fontWeight: 800,
              cursor: 'pointer',
              fontFamily: "'Inter', sans-serif",
              boxShadow: `0 8px 20px rgba(25,118,210, 0.15)`,
              letterSpacing: '-0.01em',
              transition: 'all 0.3s ease',
            }}
          >
            Apply For Capital Support →
          </motion.button>

          {/* Secondary */}
          <motion.button
            whileHover={{
              scale: 1.04,
              borderColor: BLUE,
              color: BLUE,
              backgroundColor: 'rgba(25, 118, 210, 0.05)'
            }}
            whileTap={{ scale: 0.97 }}
            onClick={() => window.location.href = '/book'}
            style={{
              background: 'transparent',
              color: TEXT_MAIN,
              border: `1.5px solid ${CARD_BORDER}`,
              borderRadius: '9999px',
              padding: '1.1rem 2.75rem',
              fontSize: '1.1rem',
              fontWeight: 700,
              cursor: 'pointer',
              fontFamily: "'Inter', sans-serif",
              letterSpacing: '-0.01em',
              transition: 'all 0.3s ease',
            }}
          >
            Join The Network
          </motion.button>
        </motion.div>
      </div>

      <style jsx>{`
        .cards-grid-net {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 1.5rem;
        }
        .execution-grid-net {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        @media (max-width: 1400px) {
          .cards-grid-net {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 1024px) {
          .cards-grid-net {
            grid-template-columns: repeat(2, 1fr);
          }
          .execution-grid-net {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 640px) {
          .cards-grid-net {
            grid-template-columns: 1fr;
          }
          .execution-grid-net {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
