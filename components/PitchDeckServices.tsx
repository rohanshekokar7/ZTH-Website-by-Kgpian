'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';

const cardsData = [
  {
    number: '0 1 / 0 4',
    category: 'Overview',
    titleFirst: 'Built To Prepare Ventures',
    titleSecond: 'Before They Raise Capital.',
    tags: [],
    body: (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', height: '100%', maxWidth: '95%' }}>
        <p style={{ color: 'rgba(224, 242, 254, 0.85)', fontSize: 'clamp(1rem, 1.5vw, 1.25rem)', lineHeight: 1.5, margin: 0 }}>From investor-ready pitch narratives and financial modeling to valuation strategy and operational readiness Zth helps founders and growing businesses prepare for high-stakes fundraising conversations with greater clarity and confidence.</p>
        <p style={{ color: 'rgba(224, 242, 254, 0.85)', fontSize: 'clamp(1rem, 1.5vw, 1.25rem)', lineHeight: 1.5, margin: 0 }}>We bridge the gap between building a product and closing a round, handling the rigorous demands of institutional preparation so you can focus on scaling.</p>
      </div>
    ),
    bgColor: '#0E0F13',  /* Near black — band 1 */
    textLight: true,
  },
  {
    number: '0 2 / 0 4',
    category: 'CATEGORY 1',
    titleFirst: 'Fundraising',
    titleSecond: 'Support',
    tags: [],
    body: (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', maxWidth: '100%', alignContent: 'space-evenly', height: '100%' }}>
        <div>
          <h4 style={{ color: '#E0F2FE', fontSize: 'clamp(1.1rem, 1.8vw, 1.4rem)', marginBottom: '0.5rem', fontWeight: 800 }}>Pitch Decks</h4>
          <p style={{ color: 'rgba(224, 242, 254, 0.75)', fontSize: 'clamp(0.95rem, 1.2vw, 1.1rem)', lineHeight: 1.5, margin: 0 }}>We craft compelling narratives backed by hard data to capture investor interest immediately.</p>
        </div>
        <div style={{ borderLeft: '1px solid rgba(255, 255, 255, 0.15)', paddingLeft: '1.5rem' }}>
          <h4 style={{ color: '#E0F2FE', fontSize: 'clamp(1.1rem, 1.8vw, 1.4rem)', marginBottom: '0.5rem', fontWeight: 800 }}>Financial Models</h4>
          <p style={{ color: 'rgba(224, 242, 254, 0.75)', fontSize: 'clamp(0.95rem, 1.2vw, 1.1rem)', lineHeight: 1.5, margin: 0 }}>Robust, investor-grade financial projections and unit economics that stand up to rigorous due diligence.</p>
        </div>
        <div style={{ borderLeft: '1px solid rgba(255, 255, 255, 0.15)', paddingLeft: '1.5rem' }}>
          <h4 style={{ color: '#E0F2FE', fontSize: 'clamp(1.1rem, 1.8vw, 1.4rem)', marginBottom: '0.5rem', fontWeight: 800 }}>Valuation Models</h4>
          <p style={{ color: 'rgba(224, 242, 254, 0.75)', fontSize: 'clamp(0.95rem, 1.2vw, 1.1rem)', lineHeight: 1.5, margin: 0 }}>Data-driven valuation frameworks to help you negotiate terms from a position of strength and clarity.</p>
        </div>
        <div style={{ borderLeft: '1px solid rgba(255, 255, 255, 0.15)', paddingLeft: '1.5rem' }}>
          <h4 style={{ color: '#E0F2FE', fontSize: 'clamp(1.1rem, 1.8vw, 1.4rem)', marginBottom: '0.5rem', fontWeight: 800 }}>Information Memorandums</h4>
          <p style={{ color: 'rgba(224, 242, 254, 0.75)', fontSize: 'clamp(0.95rem, 1.2vw, 1.1rem)', lineHeight: 1.5, margin: 0 }}>Comprehensive dossiers detailing operations, market sizing, and strategy for serious institutional players.</p>
        </div>
      </div>
    ),
    bgColor: '#252830',  /* Dark charcoal — band 2 */
    textLight: true,
  },
  {
    number: '0 3 / 0 4',
    category: 'CATEGORY 2',
    titleFirst: 'Compliance &',
    titleSecond: 'Operations',
    tags: [],
    body: (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', maxWidth: '100%', alignContent: 'space-evenly', height: '100%' }}>
        <div>
          <h4 style={{ color: '#E0F2FE', fontSize: 'clamp(1.1rem, 1.8vw, 1.4rem)', marginBottom: '0.5rem', fontWeight: 800 }}>Company Incorporation</h4>
          <p style={{ color: 'rgba(224, 242, 254, 0.75)', fontSize: 'clamp(0.95rem, 1.2vw, 1.1rem)', lineHeight: 1.5, margin: 0 }}>End-to-end entity registration and structural advisory tailored for venture-backed startups.</p>
        </div>
        <div style={{ borderLeft: '1px solid rgba(255, 255, 255, 0.15)', paddingLeft: '1.5rem' }}>
          <h4 style={{ color: '#E0F2FE', fontSize: 'clamp(1.1rem, 1.8vw, 1.4rem)', marginBottom: '0.5rem', fontWeight: 800 }}>GST Registration & Regulatory Support</h4>
          <p style={{ color: 'rgba(224, 242, 254, 0.75)', fontSize: 'clamp(0.95rem, 1.2vw, 1.1rem)', lineHeight: 1.5, margin: 0 }}>Seamless management of mandatory filings to ensure your venture remains audit-ready.</p>
        </div>
        <div style={{ borderLeft: '1px solid rgba(255, 255, 255, 0.15)', paddingLeft: '1.5rem' }}>
          <h4 style={{ color: '#E0F2FE', fontSize: 'clamp(1.1rem, 1.8vw, 1.4rem)', marginBottom: '0.5rem', fontWeight: 800 }}>Legal & Financial Documentation</h4>
          <p style={{ color: 'rgba(224, 242, 254, 0.75)', fontSize: 'clamp(0.95rem, 1.2vw, 1.1rem)', lineHeight: 1.5, margin: 0 }}>Secure your equity with robust founder agreements, term sheet reviews, and cap table management.</p>
        </div>
        <div style={{ borderLeft: '1px solid rgba(255, 255, 255, 0.15)', paddingLeft: '1.5rem' }}>
          <h4 style={{ color: '#E0F2FE', fontSize: 'clamp(1.1rem, 1.8vw, 1.4rem)', marginBottom: '0.5rem', fontWeight: 800 }}>Accounting & CA Support</h4>
          <p style={{ color: 'rgba(224, 242, 254, 0.75)', fontSize: 'clamp(0.95rem, 1.2vw, 1.1rem)', lineHeight: 1.5, margin: 0 }}>Dedicated bookkeeping and transparent financial reporting built for rigorous due diligence.</p>
        </div>
        <div style={{ borderLeft: '1px solid rgba(255, 255, 255, 0.15)', paddingLeft: '1.5rem' }}>
          <h4 style={{ color: '#E0F2FE', fontSize: 'clamp(1.1rem, 1.8vw, 1.4rem)', marginBottom: '0.5rem', fontWeight: 800 }}>Startup India / DPIIT Assistance</h4>
          <p style={{ color: 'rgba(224, 242, 254, 0.75)', fontSize: 'clamp(0.95rem, 1.2vw, 1.1rem)', lineHeight: 1.5, margin: 0 }}>Unlock government incentives and angel tax exemptions with our guided official support.</p>
        </div>
      </div>
    ),
    bgColor: '#3D404A',  /* Medium dark grey — band 3 */
    textLight: true,
  },
  {
    number: '0 4 / 0 4',
    category: 'TRACTION',
    titleFirst: 'Traction',
    titleSecond: 'Strip',
    tags: [],
    body: (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', height: '100%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', maxWidth: '100%', alignContent: 'space-evenly', height: '100%' }}>
          <div>
            <div style={{ color: '#E0F2FE', fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 800, lineHeight: 1.1 }}>100+</div>
            <div style={{ color: 'rgba(224, 242, 254, 0.9)', fontSize: 'clamp(1.05rem, 1.5vw, 1.3rem)', fontWeight: 700, marginTop: '0.25rem' }}>Ventures Supported</div>
            <p style={{ color: 'rgba(224, 242, 254, 0.75)', fontSize: 'clamp(0.95rem, 1.2vw, 1.1rem)', lineHeight: 1.5, margin: '0.5rem 0 0 0' }}>Empowering early-stage startups with the core infrastructure needed to scale efficiently.</p>
          </div>
          <div style={{ borderLeft: '1px solid rgba(255, 255, 255, 0.15)', paddingLeft: '1.5rem' }}>
            <div style={{ color: '#E0F2FE', fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 800, lineHeight: 1.1 }}>₹11–12 Cr+</div>
            <div style={{ color: 'rgba(224, 242, 254, 0.9)', fontSize: 'clamp(1.05rem, 1.5vw, 1.3rem)', fontWeight: 700, marginTop: '0.25rem' }}>Capital Facilitated</div>
            <p style={{ color: 'rgba(224, 242, 254, 0.75)', fontSize: 'clamp(0.95rem, 1.2vw, 1.1rem)', lineHeight: 1.5, margin: '0.5rem 0 0 0' }}>Preparing founders to successfully close seed and pre-Series A rounds with top-tier investors.</p>
          </div>
          <div style={{ borderLeft: '1px solid rgba(255, 255, 255, 0.15)', paddingLeft: '1.5rem' }}>
            <div style={{ color: '#E0F2FE', fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, lineHeight: 1.2 }}>Multi-Sector</div>
            <div style={{ color: 'rgba(224, 242, 254, 0.9)', fontSize: 'clamp(1.05rem, 1.5vw, 1.3rem)', fontWeight: 700, marginTop: '0.25rem' }}>Founder Advisory</div>
            <p style={{ color: 'rgba(224, 242, 254, 0.75)', fontSize: 'clamp(0.95rem, 1.2vw, 1.1rem)', lineHeight: 1.5, margin: '0.5rem 0 0 0' }}>Bespoke mentorship ensuring your strategy aligns with sector-specific investor expectations.</p>
          </div>
          <div style={{ borderLeft: '1px solid rgba(255, 255, 255, 0.15)', paddingLeft: '1.5rem' }}>
            <div style={{ color: '#E0F2FE', fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, lineHeight: 1.2 }}>Strategic</div>
            <div style={{ color: 'rgba(224, 242, 254, 0.9)', fontSize: 'clamp(1.05rem, 1.5vw, 1.3rem)', fontWeight: 700, marginTop: '0.25rem' }}>Fundraising Prep</div>
            <p style={{ color: 'rgba(224, 242, 254, 0.75)', fontSize: 'clamp(0.95rem, 1.2vw, 1.1rem)', lineHeight: 1.5, margin: '0.5rem 0 0 0' }}>Systematically de-risking your venture and optimizing your data room for maximum conversion.</p>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '2rem' }}>
          <Link
            href="/book"
            style={{
              textDecoration: 'none',
              backgroundColor: '#1976D2',
              color: '#ffffff',
              border: 'none',
              borderRadius: '9999px',
              padding: '1rem 2.5rem',
              fontSize: '1.1rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              boxShadow: '0 8px 20px rgba(25,118,210,0.3)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 12px 25px rgba(25,118,210,0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(25,118,210,0.3)';
            }}
          >
            Apply For Fundraising Preparation <span style={{ fontSize: '1.2em', lineHeight: 1 }}>→</span>
          </Link>
        </div>
      </div>
    ),
    bgColor: '#52555F',  /* Lighter dark grey — band 4 */
    textLight: true,
    hideTopCTA: true
  },
];

const Card = ({ card, progress, range, targetScale, i, headerHeight }: any) => {
  const containerRef = useRef(null);

  const scale = useTransform(progress, range, [1, targetScale]);

  const styleBase: React.CSSProperties = {
    height: `calc(100vh - ${headerHeight}px)`,
    width: '100%',
    display: 'flex',
    alignItems: 'flex-start',
    paddingTop: '0.5rem',
    justifyContent: 'center',
    position: 'sticky',
    top: `${headerHeight}px`,
  };

  const cardStyle: React.CSSProperties = {
    margin: '0 auto',
    background: card.bgColor,
    padding: 'clamp(1.5rem, 4vw, 3rem)',
    borderRadius: 'clamp(20px, 3vw, 40px)',
    borderTop: `6px solid ${card.bgColor}`,
    borderLeft: `1px solid ${card.bgColor}`,
    borderRight: `1px solid ${card.bgColor}`,
    borderBottom: `1px solid ${card.bgColor}`,
    boxShadow: '0 -20px 40px rgba(0, 0, 0, 0.08)',
    width: '100%',
    maxWidth: '1200px',
    height: 'clamp(475px, 65vh, 580px)', // Increased card length by 5%
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    fontFamily: 'Inter, system-ui, sans-serif',
    transformOrigin: 'top center',
    overflow: 'hidden',
    willChange: 'transform',
    position: 'relative',
    top: `calc(${i * 12}px)`
  };

  return (
    <div ref={containerRef} style={{ ...styleBase, minHeight: `calc(100vh - ${headerHeight}px)` }}>
      <motion.div style={{ ...cardStyle, scale }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flexShrink: 0 }}>
          <h2 style={{ fontSize: card.titleFontSize || 'clamp(1.8rem, 3.5vw, 3.5rem)', fontWeight: 900, lineHeight: 0.9, letterSpacing: '-0.04em', margin: 0 }}>
            <span style={{ color: card.textLight ? '#FFFFFF' : '#18181B', display: 'block' }}>{card.titleFirst}</span>
            <span style={{ color: card.textLight ? '#1976D2' : 'rgba(24,24,27,0.38)', display: 'block' }}>{card.titleSecond}</span>
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, paddingTop: '2rem' }}>
          {typeof card.body === 'string' ? (
            <p style={{ color: card.textLight ? 'rgba(255,255,255,0.75)' : '#52525B', maxWidth: '70ch', lineHeight: 1.6, fontSize: '1.15rem', margin: '1rem 0 2rem 0' }}>
              {card.body}
            </p>
          ) : (
            <div style={{ margin: '1rem 0 2rem 0', flexGrow: 1 }}>
              {card.body}
            </div>
          )}
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: 'auto' }}>
          {card.tags.map((tag: string, index: number) => (
            <span key={index} style={{
              padding: '0.35rem 1.25rem',
              borderRadius: '9999px',
              border: card.textLight ? '1px solid rgba(255,255,255,0.2)' : '1px solid rgba(25,118,210,0.25)',
              backgroundColor: card.textLight ? 'rgba(255,255,255,0.1)' : 'rgba(25,118,210,0.1)',
              color: card.textLight ? 'rgba(255,255,255,0.85)' : '#1976D2',
              fontSize: '0.875rem',
              fontWeight: 500
            }}>
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default function PitchDeckServices({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState(160);

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
    const handleResize = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div className={className} style={{ position: 'relative', backgroundColor: '#FFFFFF', minHeight: '100vh', paddingTop: '2rem' }}>

      {/* Section Header Wrapper */}
      <div style={{
        position: 'absolute',
        top: '2rem',
        bottom: `calc(clamp(475px, 65vh, 580px) + ${headerHeight}px)`,
        left: 0,
        right: 0,
        pointerEvents: 'none',
        zIndex: 50
      }}>
        <div
          ref={headerRef}
          style={{
            position: "sticky",
            top: 0,
            backgroundColor: "#FFFFFF",
            paddingTop: "2rem",
            paddingBottom: "0.5rem",
            marginBottom: "0",
            pointerEvents: 'auto'
          }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: "center", padding: "0 2rem" }}
        >
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.85rem",
            fontWeight: 700,
            letterSpacing: "0.25em",
            color: "#1976D2",
            textTransform: "uppercase",
            marginBottom: "1rem"
          }}>
            PRE-FUNDRAISING
          </p>
          <motion.h2
            initial={{ filter: "blur(14px)", opacity: 0 }}
            whileInView={{ filter: "blur(0px)", opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            style={{
            fontSize: "clamp(2.75rem, 5vw, 4.25rem)",
            fontWeight: 800,
            color: "#1A1A1A",
            letterSpacing: "-0.025em",
            lineHeight: 1.1,
            margin: "0 auto 1.5rem",
            maxWidth: "850px"
          }}>
            Pre-Fundraising <span style={{ color: "#1976D2" }}>Infrastructure.</span>
          </motion.h2>
        </motion.div>
        </div>
      </div>

      {/* Spacer to replace header in document flow */}
      <div style={{ height: headerHeight }} />

      {/* Stacking Cards */}
      <div ref={containerRef} style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {cardsData.map((card, i) => {
          const targetScale = 1; // Fixed scale to prevent shrinking on scroll
          return (
            <Card
              key={i}
              i={i}
              card={card}
              progress={scrollYProgress}
              range={[i * 0.25, 1]}
              targetScale={targetScale}
              headerHeight={headerHeight}
            />
          );
        })}
      </div>

      <style jsx>{`
        @media (max-width: 640px) {
          /* Force the sticky cards to not use full vh on mobile */
          div[style*="minHeight: '100vh'"] {
            min-height: 80vh !important;
          }
          /* Tighten up stacking offset on mobile */
          div[style*="top: calc"] {
        
          top: 0 !important;
          }
        }
      `}</style>
    </div>
  );
}
