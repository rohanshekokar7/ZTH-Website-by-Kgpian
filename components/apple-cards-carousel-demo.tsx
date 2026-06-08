"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

const BLUE = "#1976D2";
const BLUE_DARK = "#0D47A1";

const labelCard = (
  <div
    style={{
      height: "30rem",
      width: "20rem",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      background: "linear-gradient(180deg, #ffffff 0%, #f1f5f9 100%)",
      borderRadius: "2rem",
      boxShadow: "0 8px 30px rgba(0,0,0,0.18)",
      overflow: "hidden",
      position: "relative",
      transition: "box-shadow 0.3s ease",
      cursor: "pointer",
      border: "1px solid #e2e8f0",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.boxShadow = "0 20px 50px rgba(0,0,0,0.18)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.18)";
    }}
  >
    {/* Text block */}
    <div style={{ padding: "2.5rem 2rem 0", position: "relative", zIndex: 2 }}>
      <p
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "2.25rem",
          fontWeight: 700,
          color: "#0f172a",
          lineHeight: 1.15,
          letterSpacing: "-0.02em",
        }}
      >
        During Fundraising Support →
      </p>
    </div>

    {/* Image */}
    <div style={{ position: "relative", flex: 1, marginTop: "1rem" }}>
      <div style={{
        position: "absolute", inset: "0 0 auto 0", height: "5rem", zIndex: 1,
        background: "linear-gradient(to bottom, #f1f5f9, transparent)",
      }} />
      <img
        src="/fundraising_illustration.png"
        alt="Fundraising"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center top",
          opacity: 0.8,
        }}
      />
    </div>
  </div>
);

type InfoCard = { title: string; desc: string };

function GridCard({ card, i }: { card: InfoCard; i: number }) {
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, visible: false });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setSpotlight({ x: e.clientX - rect.left, y: e.clientY - rect.top, visible: true });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setSpotlight(s => ({ ...s, visible: false }))}
      style={{
        background: "#ffffff",
        borderRadius: "8px",
        border: "1px solid rgba(0,0,0,0.07)",
        boxShadow: spotlight.visible
          ? "0 8px 24px rgba(100,116,139,0.12), 0 24px 48px rgba(100,116,139,0.2), 0 40px 80px -16px rgba(100,116,139,0.3)"
          : "0 10px 40px rgba(0,0,0,0.08)",
        padding: "2rem 2rem 2.25rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
        position: "relative",
        overflow: "hidden",
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        transform: spotlight.visible ? "translateY(-12px) scale(1.02)" : "translateY(0px) scale(1)",
        marginTop: spotlight.visible ? "-4px" : "0px",
        marginBottom: spotlight.visible ? "4px" : "0px",
      }}
    >
      {/* spotlight overlay */}
      <div style={{
        position: "absolute", inset: 0, borderRadius: "8px", pointerEvents: "none", zIndex: 0,
        background: spotlight.visible
          ? `radial-gradient(350px circle at ${spotlight.x}px ${spotlight.y}px, rgba(25,118,210,0.1) 0%, transparent 80%)`
          : "transparent",
        transition: spotlight.visible ? "none" : "background 0.5s ease",
      }} />

      <p style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: "1.15rem",
        fontWeight: 700,
        color: "#1976D2",
        lineHeight: 1.2,
        letterSpacing: "-0.02em",
        position: "relative",
        zIndex: 1,
      }}>
        {card.title}
      </p>
      <p style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: "0.875rem",
        color: "#64748b",
        lineHeight: 1.65,
        position: "relative",
        zIndex: 1,
      }}>
        {card.desc}
      </p>
    </motion.div>
  );
}

function CardGrid({ title, cards }: { title: string; cards: InfoCard[] }) {
  const parts = title.split(' ');
  const firstPart = parts[0];
  const restPart = parts.slice(1).join(' ');

  return (
    <div style={{ padding: "3rem 40px 0" }}>
      <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "3rem",
            fontWeight: 700,
            color: "#0f172a",
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
            margin: 0,
          }}
        >
          {firstPart} {restPart && <span style={{ color: "#1976D2" }}>{restPart}.</span>}
        </motion.p>
      </div>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "1.25rem",
      }}>
        {cards.map((card, i) => (
          <GridCard key={card.title} card={card} i={i} />
        ))}
      </div>
    </div>
  );
}

export default function AppleCardsCarouselDemo() {
  const cards = [
    labelCard,
    ...data.map((card, index) => (
      <Card key={card.title + index} card={card} index={index} />
    )),
  ];

  return (
    <div className="w-full h-full py-20" style={{ background: "#F8FAFD" }}>
      <Carousel items={cards} />
      <div style={{ paddingBottom: "4rem" }}>
        <CardGrid title="Capital Network" cards={capitalNetworkCards} />
      </div>
    </div>
  );
}

const CARD_COLOR = "linear-gradient(180deg, #ffffff 0%, #f1f5f9 100%)";

const capitalNetworkCards = [
  {
    title: "Founder Onboarding",
    desc: "Access fundraising preparation, strategic support, and ecosystem connectivity through ZTH.",
  },
  {
    title: "Investor Network",
    desc: "Connect with curated ventures, strategic opportunities, and founder ecosystems.",
  },
  {
    title: "Strategic Partnerships",
    desc: "Collaborate across execution, advisory, operational support, and ecosystem growth initiatives.",
  },
];


const data = [
  {
    title: "Investor Meeting Preparation",
    category: "FUNDRAISING PREP",
    desc: "We prepare founders for high-stakes investor conversations with targeted coaching, deck reviews, and strategic positioning.",
    bullets: [
      "Pitch deck review & narrative refinement",
      "Mock investor Q&A and objection handling",
      "Meeting agenda & flow structuring",
      "Founder positioning and story alignment",
    ],
    color: CARD_COLOR,
  },
  {
    title: "Pitch Day Support",
    category: "DEMO & EVENTS",
    desc: "Real-time strategic support during pitch events, demo days, and investor-facing showcases to maximise every opportunity.",
    bullets: [
      "Live event coordination & logistics",
      "On-site founder briefing and prep",
      "Warm investor introductions on the day",
      "Post-pitch debrief and follow-up strategy",
    ],
    color: CARD_COLOR,
  },
  {
    title: "Deal Structuring Support",
    category: "STRUCTURING & DOCS",
    desc: "Expert guidance through term sheet negotiations, documentation coordination, and strategic financial discussions.",
    bullets: [
      "Term sheet review and guidance",
      "Documentation workflow management",
      "Cap table analysis and modelling",
      "Strategic financial discussion support",
    ],
    color: CARD_COLOR,
  },
  {
    title: "Due Diligence Coordination",
    category: "DILIGENCE & READINESS",
    desc: "End-to-end support for investor data requests, documentation workflows, and full fundraising readiness.",
    bullets: [
      "Data room setup and management",
      "Investor questionnaire preparation",
      "Financial record and audit support",
      "Legal document coordination",
    ],
    color: CARD_COLOR,
  },
  {
    title: "Investor Communication Support",
    category: "ONGOING RELATIONS",
    desc: "Structured communication support to maintain investor relationships through every stage of the fundraise.",
    bullets: [
      "Investor update templates and scheduling",
      "Follow-up strategy and timing guidance",
      "Fundraising status communications",
      "Relationship management tracking",
    ],
    color: CARD_COLOR,
  },
];
