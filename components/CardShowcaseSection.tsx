'use client';

import { motion } from 'framer-motion';

/* ── Animation variant: cards drop from above ─────────────────── */
const riseVariants = {
  hidden: { y: -280, rotateX: -30, opacity: 0, scale: 0.82 },
  visible: (i: number) => ({
    y: 0, rotateX: 0, opacity: 1, scale: 1,
    transition: { duration: 1.2, delay: i * 0.22, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
};

/* ── Shared card footer ───────────────────────────────────────── */
function CardFooter({ label }: { label: string }) {
  return (
    <div style={{ padding: '18px 22px 22px', background: 'linear-gradient(to bottom, #f8fafc, #ffffff)', borderTop: '1px solid #f1f5f9' }}>
      <p style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a', letterSpacing: '-0.03em', marginBottom: '12px', lineHeight: 1.1, margin: '0 0 12px' }}>{label}</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ fontSize: '13px', fontWeight: 600, color: '#3b82f6' }}>Explore</span>
        <div style={{ width: '26px', height: '26px', borderRadius: '50%', background: '#eff6ff', border: '1px solid #bfdbfe', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M6 2v8M2 8l4 4 4-4" stroke="#3b82f6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
      </div>
    </div>
  );
}

/* ── Service row used in Card 1 & 2 ──────────────────────────── */
function ServiceRow({ title, desc, last = false }: { title: string; desc: string; last?: boolean }) {
  return (
    <div style={{ padding: '13px 16px', background: '#ffffff', borderBottom: last ? 'none' : '1px solid #f1f5f9' }}>
      <p style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', margin: '0 0 4px', letterSpacing: '-0.01em' }}>{title}</p>
      <p style={{ fontSize: '11.5px', color: '#64748b', margin: 0, lineHeight: 1.55 }}>{desc}</p>
    </div>
  );
}

/* ── Card 1: Fundraising Support ─────────────────────────────── */
function FundraisingSupportCard() {
  return (
    <div style={{ background: '#ffffff', borderRadius: '20px', boxShadow: '0 32px 80px rgba(0,0,0,0.14), 0 4px 20px rgba(0,0,0,0.06)', border: '1px solid #e2e8f0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '22px 22px 0', flex: 1 }}>
        {/* Card title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
          <div style={{ width: '34px', height: '34px', borderRadius: '10px', background: '#eff6ff', border: '1px solid #bfdbfe', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', flexShrink: 0 }}>📋</div>
          <div>
            <p style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase', margin: 0 }}>Services</p>
            <p style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', margin: 0, letterSpacing: '-0.02em' }}>Fundraising Support</p>
          </div>
        </div>

        {/* Service rows */}
        <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
          <ServiceRow
            title="Pitch Decks"
            desc="We craft compelling narratives backed by hard data to capture investor interest immediately."
          />
          <ServiceRow
            title="Financial Models"
            desc="Robust, investor-grade financial projections and unit economics that stand up to rigorous due diligence."
          />
          <ServiceRow
            title="Valuation Models"
            desc="Data-driven valuation frameworks to help you negotiate terms from a position of strength and clarity."
          />
          <ServiceRow
            title="Information Memorandums"
            desc="Comprehensive dossiers detailing operations, market sizing, and strategy for serious institutional players."
            last
          />
        </div>
      </div>
      <CardFooter label="Fundraising Support" />
    </div>
  );
}

/* ── Card 2: Compliance & Operations ─────────────────────────── */
function ComplianceCard() {
  return (
    <div style={{ background: '#ffffff', borderRadius: '20px', boxShadow: '0 32px 80px rgba(0,0,0,0.14), 0 4px 20px rgba(0,0,0,0.06)', border: '1px solid #e2e8f0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '22px 22px 0', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
          <div style={{ width: '34px', height: '34px', borderRadius: '10px', background: '#f0fdf4', border: '1px solid #bbf7d0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', flexShrink: 0 }}>⚖️</div>
          <div>
            <p style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase', margin: 0 }}>Services</p>
            <p style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', margin: 0, letterSpacing: '-0.02em' }}>Compliance & Operations</p>
          </div>
        </div>

        <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
          <ServiceRow
            title="Company Incorporation"
            desc="End-to-end entity registration and structural advisory tailored for venture-backed startups."
          />
          <ServiceRow
            title="GST Registration & Regulatory Support"
            desc="Seamless management of mandatory filings to ensure your venture remains audit-ready."
          />
          <ServiceRow
            title="Legal & Financial Documentation"
            desc="Secure your equity with robust founder agreements, term sheet reviews, and cap table management."
          />
          <ServiceRow
            title="Accounting & CA Support"
            desc="Dedicated bookkeeping and transparent financial reporting built for rigorous due diligence."
          />
          <ServiceRow
            title="Startup India / DPIIT Assistance"
            desc="Unlock government incentives and angel tax exemptions with our guided official support."
            last
          />
        </div>
      </div>
      <CardFooter label="Compliance & Operations" />
    </div>
  );
}

/* ── Card 3: Traction Strip ───────────────────────────────────── */
function TractionCard() {
  const stats = [
    { value: '100+', label: 'Ventures Supported', desc: 'Empowering early-stage startups with the core infrastructure needed to scale efficiently.' },
    { value: '₹11–12 Cr+', label: 'Capital Facilitated', desc: 'Preparing founders to successfully close seed and pre-Series A rounds with top-tier investors.' },
    { value: 'Multi-Sector', label: 'Founder Advisory', desc: 'Bespoke mentorship ensuring your strategy aligns with sector-specific investor expectations.' },
    { value: 'Strategic', label: 'Fundraising Prep', desc: 'Systematically de-risking your venture and optimizing your data room for maximum conversion.' },
  ];

  return (
    <div style={{ background: '#ffffff', borderRadius: '20px', boxShadow: '0 32px 80px rgba(0,0,0,0.14), 0 4px 20px rgba(0,0,0,0.06)', border: '1px solid #e2e8f0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '22px 22px 18px', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
          <div style={{ width: '34px', height: '34px', borderRadius: '10px', background: '#fff7ed', border: '1px solid #fed7aa', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', flexShrink: 0 }}>📈</div>
          <div>
            <p style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase', margin: 0 }}>Results</p>
            <p style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', margin: 0, letterSpacing: '-0.02em' }}>Traction Strip</p>
          </div>
        </div>

        {/* 2×2 stats grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '18px' }}>
          {stats.map((s) => (
            <div key={s.label} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '14px 14px 12px' }}>
              <p style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', margin: '0 0 2px', letterSpacing: '-0.03em', lineHeight: 1 }}>{s.value}</p>
              <p style={{ fontSize: '11px', fontWeight: 700, color: '#3b82f6', margin: '0 0 6px', letterSpacing: '-0.01em' }}>{s.label}</p>
              <p style={{ fontSize: '10.5px', color: '#64748b', margin: 0, lineHeight: 1.5 }}>{s.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={() => window.location.href = '/book'}
          style={{
            width: '100%', padding: '12px 16px',
            background: 'linear-gradient(135deg, #1e40af, #3b82f6)',
            color: '#ffffff', border: 'none', borderRadius: '10px',
            fontSize: '13px', fontWeight: 700, cursor: 'pointer',
            letterSpacing: '-0.01em', display: 'flex', alignItems: 'center',
            justifyContent: 'center', gap: '8px',
            boxShadow: '0 8px 24px rgba(59,130,246,0.3)',
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Apply For Fundraising Preparation
          <span style={{ fontSize: '16px', lineHeight: 1 }}>→</span>
        </button>
      </div>
    </div>
  );
}

/* ── Main section ─────────────────────────────────────────────── */
export default function CardShowcaseSection() {
  return (
    <section style={{ background: '#ffffff', padding: '8rem 2rem 9rem', position: 'relative', overflow: 'clip' }}>

      {/* Radial glow */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 40% at 50% 0%, rgba(59,130,246,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

      {/* ── Section heading ── */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{ textAlign: 'center', marginBottom: '5rem', position: 'relative', zIndex: 1 }}
      >
        {/* Small label */}
        <span style={{
          display: 'inline-block', fontSize: '0.62rem', fontWeight: 800,
          letterSpacing: '0.22em', textTransform: 'uppercase', color: '#3b82f6',
          background: '#eff6ff', border: '1px solid #bfdbfe',
          padding: '0.35rem 1rem', borderRadius: '100px', marginBottom: '1.5rem',
          fontFamily: "'Inter', sans-serif",
        }}>
          Pre-Fundraising Infrastructure
        </span>

        {/* Main heading */}
        <h2 style={{
          fontSize: 'clamp(2.2rem, 4vw, 3.75rem)',
          fontWeight: 700, color: '#0f172a',
          letterSpacing: '-0.035em', lineHeight: 1.08,
          margin: '0 auto 1.5rem', maxWidth: 780,
          fontFamily: "'Inter', sans-serif",
        }}>
          Built To Prepare Ventures{' '}
          <span style={{ color: '#3b82f6' }}>Before They Raise Capital.</span>
        </h2>

        {/* Supporting text */}
        <p style={{
          fontSize: '1.05rem', color: '#64748b',
          maxWidth: 640, margin: '0 auto',
          lineHeight: 1.7, fontFamily: "'Inter', sans-serif",
        }}>
          From investor-ready pitch narratives and financial modeling to valuation strategy and operational readiness, ZTH helps founders and growing businesses prepare for high-stakes fundraising conversations with greater clarity and confidence.
        </p>
      </motion.div>

      {/* ── Cards ── */}
      <div style={{
        display: 'flex', gap: '2rem',
        justifyContent: 'center', alignItems: 'flex-start',
        maxWidth: '1260px', margin: '0 auto',
        perspective: '1200px', perspectiveOrigin: '50% -10%',
        position: 'relative', zIndex: 1, flexWrap: 'wrap',
      }}>

        {/* Card 1 */}
        <motion.div
          custom={0} variants={riseVariants} initial="hidden"
          whileInView="visible" viewport={{ once: true, amount: 0.15 }}
          style={{ flex: '0 0 370px', minWidth: 0, transformStyle: 'preserve-3d' }}
        >
          <FundraisingSupportCard />
        </motion.div>

        {/* Card 2 */}
        <motion.div
          custom={1} variants={riseVariants} initial="hidden"
          whileInView="visible" viewport={{ once: true, amount: 0.15 }}
          style={{ flex: '0 0 370px', minWidth: 0, marginTop: '3rem', transformStyle: 'preserve-3d' }}
        >
          <ComplianceCard />
        </motion.div>

        {/* Card 3 */}
        <motion.div
          custom={2} variants={riseVariants} initial="hidden"
          whileInView="visible" viewport={{ once: true, amount: 0.15 }}
          style={{ flex: '0 0 370px', minWidth: 0, marginTop: '6rem', transformStyle: 'preserve-3d' }}
        >
          <TractionCard />
        </motion.div>

      </div>
    </section>
  );
}
