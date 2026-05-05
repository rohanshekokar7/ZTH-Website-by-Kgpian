'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const cardsData = [
  {
    number: '0 1 / 0 4',
    category: 'Strategy & Storytelling',
    titleFirst: 'Custom',
    titleSecond: 'Pitch Deck',
    tags: ['Strategy', 'Narrative Design', 'Slide Design', 'Financial Summary', 'Visual Identity'],
    body: "Hand-crafted, investor-grade presentations built by senior strategists — blending narrative logic, market research, and investor psychology into a story that closes rooms.",
    bgColor: '#0E0F13',  /* Near black — band 1 */
    textLight: true,
  },
  {
    number: '0 2 / 0 4',
    category: 'Brand Architecture',
    titleFirst: 'Brand',
    titleSecond: 'Identities',
    tags: ['Logo', 'Typography', 'Color Palette', 'Voice & Tone', 'Guidelines'],
    body: "Our team will assist in developing a consistent brand voice, ensuring that all messages align with the brand's tone, values, objectives and goals.",
    bgColor: '#252830',  /* Dark charcoal — band 2 */
    textLight: true,
  },
  {
    number: '0 3 / 0 4',
    category: 'Digital Expansion',
    titleFirst: 'Growth',
    titleSecond: 'Marketing',
    tags: ['SEO', 'Paid Ads', 'Email Campaigns', 'Analytics', 'Funnels'],
    body: "We build data-driven marketing systems that attract, convert, and retain your ideal customers at every stage of the funnel.",
    bgColor: '#3D404A',  /* Medium dark grey — band 3 */
    textLight: true,
  },
  {
    number: '0 4 / 0 4',
    category: 'Engagement',
    titleFirst: 'Content',
    titleSecond: 'Strategy',
    tags: ['Copywriting', 'Visual Storytelling', 'Social Media', 'Brand Voice', 'Publishing'],
    body: "From ideation to execution, we craft content that resonates with your audience and drives measurable business outcomes.",
    bgColor: '#52555F',  /* Lighter dark grey — band 4 */
    textLight: true,
  },
];

const Card = ({ card, i, progress, range, targetScale }: any) => {
  const containerRef = useRef(null);

  const scale = useTransform(progress, range, [1, targetScale]);

  const styleBase: React.CSSProperties = {
    height: '100vh',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'sticky',
    top: 0,
  };

  const cardStyle: React.CSSProperties = {
    margin: '0 auto',
    background: card.bgColor,
    padding: '4rem',
    borderRadius: '40px',
    borderTop: `6px solid ${card.bgColor}`,
    borderLeft: `1px solid ${card.bgColor}`,
    borderRight: `1px solid ${card.bgColor}`,
    borderBottom: `1px solid ${card.bgColor}`,
    boxShadow: '0 -20px 40px rgba(0, 0, 0, 0.08)',
    width: '100%',
    maxWidth: '1200px',
    minHeight: '600px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    fontFamily: 'Inter, system-ui, sans-serif',
    willChange: 'transform',
    position: 'relative',
    top: `calc(${i * 25}px)`
  };

  return (
    <div ref={containerRef} style={styleBase}>
      <motion.div style={{ ...cardStyle, scale }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '3rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-start' }}>
            <span style={{
              display: 'inline-block',
              padding: '0.25rem 0.75rem',
              backgroundColor: '#eaf4fd',
              color: '#1976D2',
              borderRadius: '9999px',
              fontSize: '0.875rem',
              fontWeight: 700,
              letterSpacing: '0.1em'
            }}>
              {card.number}
            </span>
            <span style={{ color: '#8a9ab0', fontSize: '1rem', fontWeight: 500 }}>
              {card.category}
            </span>
          </div>

          <button style={{
            backgroundColor: '#1976D2',
            color: '#ffffff',
            border: 'none',
            borderRadius: '9999px',
            padding: '0.5rem 1.25rem',
            fontSize: '1rem',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem'
          }}>
            Get Started <span style={{ fontSize: '1.2em', lineHeight: 1 }}>→</span>
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', flexGrow: 1 }}>
          <h2 style={{ fontSize: '6rem', fontWeight: 900, lineHeight: 0.85, letterSpacing: '-0.04em', margin: 0 }}>
            <span style={{ color: card.textLight ? '#FFFFFF' : '#18181B', display: 'block' }}>{card.titleFirst}</span>
            <span style={{ color: card.textLight ? 'rgba(255,255,255,0.38)' : 'rgba(24,24,27,0.38)', display: 'block' }}>{card.titleSecond}</span>
          </h2>

          <p style={{ color: card.textLight ? 'rgba(255,255,255,0.75)' : '#52525B', maxWidth: '70ch', lineHeight: 1.6, fontSize: '1.15rem', margin: '1rem 0 2rem 0' }}>
            {card.body}
          </p>
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

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div className={className} style={{ backgroundColor: '#F0F2F6', minHeight: '100vh', paddingTop: '5rem' }}>

      {/* Header — full width, left-aligned, matching reference */}
      <div style={{ padding: '0 5vw', marginBottom: '3rem', overflow: 'hidden' }}>

        {/* "Services" label */}
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            display: 'block',
            fontSize: '0.85rem',
            fontWeight: 400,
            color: '#6B7280',
            marginBottom: '1.2rem',
            fontFamily: 'Inter, system-ui, sans-serif',
          }}
        >
          Services
        </motion.span>

        {/* Big bold heading — exactly 3 lines */}
        <div style={{
          fontSize: 'clamp(2.4rem, 4.1vw, 4.4rem)',
          fontWeight: 800,
          lineHeight: 1.0,
          letterSpacing: '-0.05em',
          fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
          color: '#18181B',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.04em',
        }}>
          {/* Line 1 */}
          <div style={{ display: 'block', whiteSpace: 'nowrap' }}>
            {[
              { word: 'We', accent: false },
              { word: 'are', accent: false },
              { word: 'an', accent: false },
              { word: 'innovative', accent: true },
              { word: 'response', accent: false },
              { word: 'team', accent: false },
              { word: 'focusing', accent: false },
            ].map(({ word, accent }, idx) => (
              <motion.span key={idx}
                initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
                style={{ display: 'inline-block', marginRight: '0.28em', color: accent ? '#9CA3AF' : '#18181B' }}
              >{word}</motion.span>
            ))}
          </div>
          {/* Line 2 */}
          <div style={{ display: 'block', whiteSpace: 'nowrap' }}>
            {[
              { word: 'on', accent: false },
              { word: 'translating', accent: false },
              { word: 'your', accent: false },
              { word: 'daily', accent: false },
              { word: 'business', accent: false },
              { word: 'hurdles', accent: false },
            ].map(({ word, accent }, idx) => (
              <motion.span key={idx}
                initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55, delay: 0.42 + idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
                style={{ display: 'inline-block', marginRight: '0.28em', color: '#18181B' }}
              >{word}</motion.span>
            ))}
          </div>
          {/* Line 3 */}
          <div style={{ display: 'block', whiteSpace: 'nowrap' }}>
            {[
              { word: 'into', accent: false },
              { word: 'dynamic', accent: false },
              { word: 'and', accent: false },
              { word: 'personalized', accent: false },
              { word: 'digital', accent: false },
              { word: 'solutions.', accent: false },
            ].map(({ word, accent }, idx) => (
              <motion.span key={idx}
                initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55, delay: 0.78 + idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
                style={{ display: 'inline-block', marginRight: '0.28em', color: '#18181B' }}
              >{word}</motion.span>
            ))}
          </div>
        </div>
      </div>

      {/* Stacking Cards */}
      <div ref={containerRef} style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {cardsData.map((card, i) => {
          const targetScale = 1 - ((cardsData.length - 1 - i) * 0.05);
          return (
            <Card
              key={i}
              i={i}
              card={card}
              progress={scrollYProgress}
              range={[i * 0.25, 1]}
              targetScale={targetScale}
            />
          );
        })}
      </div>
    </div>
  );
}
