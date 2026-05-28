"use client";

import { motion } from "framer-motion";
// @ts-ignore
import MagicBento from "./MagicBento";

const BLUE = "#1976D2";

const pitchDeckCards = [
  {
    color: '#ffffff',
    title: 'Compelling Narrative',
    description: 'Craft a story that captures investor attention from the first slide.',
    label: 'Storytelling',
    content: (
      <div style={{ padding: "0 1rem", color: "#475569", fontSize: "0.95rem", lineHeight: 1.6 }}>
        <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
          <li style={{ marginBottom: "0.5rem" }}>✓ The "Why Now" factor</li>
          <li style={{ marginBottom: "0.5rem" }}>✓ Problem formulation</li>
          <li>✓ Founder's vision & origin</li>
        </ul>
      </div>
    )
  },
  {
    color: '#ffffff',
    title: 'Financial Modeling',
    description: 'Showcase solid unit economics and a clear path to profitability.',
    label: 'Numbers',
    content: (
      <div style={{ padding: "0 1rem", color: "#475569", fontSize: "0.95rem", lineHeight: 1.6 }}>
        <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
          <li style={{ marginBottom: "0.5rem" }}>✓ 3-5 Year Projections</li>
          <li style={{ marginBottom: "0.5rem" }}>✓ Customer Acquisition Cost (CAC)</li>
          <li>✓ Lifetime Value (LTV)</li>
        </ul>
      </div>
    )
  },
  {
    color: '#ffffff',
    title: 'Market Analysis',
    description: 'Demonstrate deep understanding of market size and dynamics.',
    label: 'Opportunity',
    content: (
      <div style={{ padding: "0 1rem", color: "#475569", fontSize: "0.95rem", lineHeight: 1.6 }}>
        <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
          <li style={{ marginBottom: "0.5rem" }}>✓ Total Addressable Market (TAM)</li>
          <li style={{ marginBottom: "0.5rem" }}>✓ Ideal Customer Profile (ICP)</li>
          <li>✓ Emerging Growth Trends</li>
        </ul>
      </div>
    )
  },
  {
    color: '#ffffff',
    title: 'Competitive Edge',
    description: 'Highlight your unique value propositions and defensive moats.',
    label: 'Strategy',
    content: (
      <div style={{ padding: "0 1rem", color: "#475569", fontSize: "0.95rem", lineHeight: 1.6 }}>
        <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
          <li style={{ marginBottom: "0.5rem" }}>✓ Direct/Indirect Competitor Matrix</li>
          <li style={{ marginBottom: "0.5rem" }}>✓ Unique Selling Proposition (USP)</li>
          <li>✓ Long-term Defensive Moats</li>
        </ul>
      </div>
    )
  },
  {
    color: '#ffffff',
    title: 'Proven Traction',
    description: 'Provide hard evidence of growth and product-market fit.',
    label: 'Momentum',
    content: (
      <div style={{ padding: "0 1rem", color: "#475569", fontSize: "0.95rem", lineHeight: 1.6 }}>
        <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
          <li style={{ marginBottom: "0.5rem" }}>✓ Monthly Recurring Revenue (MRR)</li>
          <li style={{ marginBottom: "0.5rem" }}>✓ Active Users & Engagement</li>
          <li>✓ Key Strategic Partnerships</li>
        </ul>
      </div>
    )
  },
  {
    color: '#ffffff',
    title: 'The Ask',
    description: 'Clearly define capital requirements and exact use of funds.',
    label: 'Investment',
    content: (
      <div style={{ padding: "0 1rem", color: "#475569", fontSize: "0.95rem", lineHeight: 1.6 }}>
        <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
          <li style={{ marginBottom: "0.5rem" }}>✓ Total Capital Required</li>
          <li style={{ marginBottom: "0.5rem" }}>✓ Fund Allocation Breakdown</li>
          <li>✓ 18-24 Month Runway Milestones</li>
        </ul>
      </div>
    )
  }
];

export default function ZthInsiderSection() {
  return (
    <section style={{
      padding: "clamp(3.5rem, 5vw, 5rem) clamp(1.25rem, 6vw, 5rem)",
      background: "#f8fafc", // Light background
      position: "relative",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.35rem 1rem',
              background: '#E3F0FF', border: '1px solid rgba(25,118,210,0.18)',
              borderRadius: '100px', marginBottom: '1.5rem',
            }}
          >
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#1976D2' }} />
            <span style={{
              fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.2em',
              textTransform: 'uppercase', color: '#1976D2', fontFamily: "'Inter', sans-serif",
            }}>
              ZTH INSIDER
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontWeight: 700,
              fontSize: "clamp(2.25rem, 4vw, 3.75rem)", color: "#1A1A1A",
              lineHeight: 1.1, letterSpacing: "-0.02em", margin: "0 0 1.5rem 0"
            }}
          >
            Pitch Decks that <span style={{ color: "#1976D2" }}>convert.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "1.1rem",
              color: "#475569",
              maxWidth: "600px",
              margin: "0 auto"
            }}
          >
            Everything you need to secure your next round of funding, wrapped in an investor-first narrative.
          </motion.p>
        </div>

        {/* Magic Bento Integration */}
        <div style={{ position: "relative", zIndex: 10 }}>
          <MagicBento 
            cards={pitchDeckCards}
            textAutoHide={false}
            enableStars={false}
            enableSpotlight={false}
            enableBorderGlow={true}
            enableTilt={false}
            enableMagnetism={false}
            clickEffect={true}
            spotlightRadius={400}
            particleCount={15}
            glowColor="25, 118, 210"
          />
        </div>

      </div>
    </section>
  );
}
