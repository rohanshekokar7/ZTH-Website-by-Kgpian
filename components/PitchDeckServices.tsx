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
    bgColor: '#ffffff',
  },
  {
    number: '0 2 / 0 4',
    category: 'Brand Architecture',
    titleFirst: 'Brand',
    titleSecond: 'Identities',
    tags: ['Logo', 'Typography', 'Color Palette', 'Voice & Tone', 'Guidelines'],
    body: "Our team will assist in developing a consistent brand voice, ensuring that all messages align with the brand's tone, values, objectives and goals.",
    bgColor: '#f8fafc',
  },
  {
    number: '0 3 / 0 4',
    category: 'Digital Expansion',
    titleFirst: 'Growth',
    titleSecond: 'Marketing',
    tags: ['SEO', 'Paid Ads', 'Email Campaigns', 'Analytics', 'Funnels'],
    body: "We build data-driven marketing systems that attract, convert, and retain your ideal customers at every stage of the funnel.",
    bgColor: '#ffffff',
  },
  {
    number: '0 4 / 0 4',
    category: 'Engagement',
    titleFirst: 'Content',
    titleSecond: 'Strategy',
    tags: ['Copywriting', 'Visual Storytelling', 'Social Media', 'Brand Voice', 'Publishing'],
    body: "From ideation to execution, we craft content that resonates with your audience and drives measurable business outcomes.",
    bgColor: '#f8fafc',
  },
];

const Card = ({ card, i, progress, range, targetScale }: any) => {
  const containerRef = useRef(null);
  
  const scale = useTransform(progress, range, [1, targetScale]);

  const styleBase: React.CSSProperties = {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'sticky',
    top: 0,
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: card.bgColor,
    padding: '4rem',
    borderRadius: '40px', // More rounded
    borderTop: '6px solid #bce1f8',
    borderLeft: '1px solid rgba(0, 0, 0, 0.04)',
    borderRight: '1px solid rgba(0, 0, 0, 0.04)',
    borderBottom: '1px solid rgba(0, 0, 0, 0.04)',
    boxShadow: '0 -20px 40px rgba(0, 0, 0, 0.04)', // Upwards shadow like requested previously
    width: '100%',
    maxWidth: '1000px',
    minHeight: '600px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    fontFamily: 'Inter, system-ui, sans-serif',
    willChange: 'transform',
    position: 'relative',
    top: `calc(-10vh + ${i * 25}px)`
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
              color: '#0077c2', 
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
            backgroundColor: '#0077c2',
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
            <span style={{ color: '#0a1629', display: 'block' }}>{card.titleFirst}</span>
            <span style={{ color: '#bce1f8', display: 'block' }}>{card.titleSecond}</span>
          </h2>

          <p style={{ color: '#6b7280', maxWidth: '70ch', lineHeight: 1.6, fontSize: '1.15rem', margin: '1rem 0 2rem 0' }}>
            {card.body}
          </p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: 'auto' }}>
          {card.tags.map((tag: string, index: number) => (
            <span key={index} style={{
               padding: '0.35rem 1.25rem', 
               borderRadius: '9999px', 
               border: '1px solid #e2e8f0', 
               backgroundColor: 'transparent',
               color: '#64748b', 
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
    <div className={className} style={{ backgroundColor: '#ffffff', minHeight: '100vh', padding: '4rem 0' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', marginBottom: '4rem', padding: '0 2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <div style={{ width: '40px', height: '2px', backgroundColor: '#0077c2' }}></div>
          <h1 style={{ color: '#0077c2', fontSize: '1rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', margin: 0 }}>
            Pitch Deck Services
          </h1>
        </div>
        <p style={{ color: '#8a9ab0', fontSize: '1.5rem', margin: 0, fontFamily: 'Inter, system-ui, sans-serif' }}>Scroll through four flagship offerings.</p>
      </div>

      <div ref={containerRef} style={{ position: 'relative' }}>
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
