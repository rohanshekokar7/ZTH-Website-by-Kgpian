"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BLUE = "#1976D2";
const BG = "#F8FAFD";

const cardData = [
  {
    category: "FUNDRAISING PREP",
    title: "Investor Meeting Preparation",
    desc: "We prepare founders for high-stakes investor conversations with targeted coaching, deck reviews, and strategic positioning.",
    bullets: [
      "Pitch deck review & narrative refinement",
      "Mock investor Q&A and objection handling",
      "Meeting agenda & flow structuring",
      "Founder positioning and story alignment",
    ],
    accent: "#1976D2",
  },
  {
    category: "DEMO & EVENTS",
    title: "Pitch Day Support",
    desc: "Real-time strategic support during pitch events, demo days, and investor-facing showcases to maximise every opportunity.",
    bullets: [
      "Live event coordination & logistics",
      "On-site founder briefing and prep",
      "Warm investor introductions on the day",
      "Post-pitch debrief and follow-up strategy",
    ],
    accent: "#1565C0",
  },
  {
    category: "STRUCTURING & DOCS",
    title: "Deal Structuring Support",
    desc: "Expert guidance through term sheet negotiations, documentation coordination, and strategic financial discussions.",
    bullets: [
      "Term sheet review and guidance",
      "Documentation workflow management",
      "Cap table analysis and modelling",
      "Strategic financial discussion support",
    ],
    accent: "#0D47A1",
  },
  {
    category: "DILIGENCE & READINESS",
    title: "Due Diligence Coordination",
    desc: "End-to-end support for investor data requests, documentation workflows, and full fundraising readiness.",
    bullets: [
      "Data room setup and management",
      "Investor questionnaire preparation",
      "Financial record and audit support",
      "Legal document coordination",
    ],
    accent: "#1976D2",
  },
  {
    category: "ONGOING RELATIONS",
    title: "Investor Communication Support",
    desc: "Structured communication support to maintain investor relationships through every stage of the fundraise.",
    bullets: [
      "Investor update templates and scheduling",
      "Follow-up strategy and timing guidance",
      "Fundraising status communications",
      "Relationship management tracking",
    ],
    accent: "#1565C0",
  },
];

type CardItem = (typeof cardData)[0];

function LabelCard() {
  return (
    <div
      style={{
        height: "clamp(340px, 68vh, 500px)",
        minWidth: "clamp(240px, 20vw, 300px)",
        width: "clamp(240px, 20vw, 300px)",
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "linear-gradient(180deg, #ffffff 0%, #f1f5f9 100%)",
        borderRadius: "2rem",
        boxShadow: "0 12px 48px rgba(0,0,0,0.12)",
        overflow: "hidden",
        border: "1px solid #e2e8f0",
      }}
    >
      <div style={{ padding: "2.5rem 2rem 0" }}>
        <p
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(1.5rem, 2.2vw, 1.9rem)",
            fontWeight: 700,
            color: "#0f172a",
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            margin: 0,
          }}
        >
          During<br />Fundraising<br />Support →
        </p>
      </div>
      <div style={{ position: "relative", flex: 1, marginTop: "1rem" }}>
        <div
          style={{
            position: "absolute", inset: "0 0 auto 0", height: "5rem", zIndex: 1,
            background: "linear-gradient(to bottom, #f1f5f9, transparent)",
          }}
        />
        <img
          src="/fundraising_illustration.png"
          alt="Fundraising support"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", opacity: 0.8 }}
        />
      </div>
    </div>
  );
}

function DataCard({ card }: { card: CardItem }) {
  return (
    <div
      style={{
        height: "clamp(340px, 68vh, 500px)",
        minWidth: "clamp(280px, 24vw, 360px)",
        width: "clamp(280px, 24vw, 360px)",
        flexShrink: 0,
        background: "linear-gradient(160deg, #ffffff 0%, #f8fafd 100%)",
        borderRadius: "2rem",
        border: "1px solid rgba(0,0,0,0.07)",
        boxShadow: "0 12px 48px rgba(0,0,0,0.08)",
        padding: "2.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.85rem",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* top accent line */}
      <div
        style={{
          position: "absolute", top: 0, left: "2.5rem", right: "2.5rem", height: "2px",
          background: `linear-gradient(to right, ${card.accent}, transparent)`,
        }}
      />

      <span
        style={{
          fontSize: "0.6rem", fontWeight: 800, letterSpacing: "0.22em",
          textTransform: "uppercase", color: card.accent,
          fontFamily: "'Inter', sans-serif", marginTop: "0.5rem",
        }}
      >
        {card.category}
      </span>

      <p
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(1.3rem, 1.9vw, 1.65rem)",
          fontWeight: 700, color: "#0f172a",
          lineHeight: 1.2, letterSpacing: "-0.02em", margin: 0,
        }}
      >
        {card.title}
      </p>

      <div style={{ height: 1, background: "rgba(0,0,0,0.06)" }} />

      <p
        style={{
          fontFamily: "'Inter', sans-serif", fontSize: "0.875rem",
          color: "#475569", lineHeight: 1.7, margin: 0,
        }}
      >
        {card.desc}
      </p>

      <ul style={{ paddingLeft: 0, listStyle: "none", margin: 0, display: "flex", flexDirection: "column", gap: "0.55rem" }}>
        {card.bullets.map((b, i) => (
          <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem" }}>
            <span style={{ color: card.accent, fontSize: "0.7rem", marginTop: "0.25rem", fontWeight: 700, flexShrink: 0 }}>→</span>
            <span style={{ fontSize: "0.82rem", color: "#64748b", lineHeight: 1.55, fontFamily: "'Inter', sans-serif" }}>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function HorizontalScrollCards() {
  const wrapperRef  = useRef<HTMLDivElement>(null);
  const trackRef    = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const hintRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const wrapper  = wrapperRef.current;
      const track    = trackRef.current;
      if (!wrapper || !track) return;

      const getPad     = () => (window.innerWidth >= 1024 ? 80 : 40);
      const getDistance = () =>
        Math.max(0, track.scrollWidth - window.innerWidth + getPad());

      const applyHeight = () => {
        wrapper.style.height = `calc(100vh + ${getDistance()}px)`;
      };
      applyHeight();

      const ctx = gsap.context(() => {
        const tween = gsap.to(track, {
          x: () => -getDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: wrapper,
            start: "top top",
            end: () => `+=${getDistance()}`,
            scrub: 1.2,
            invalidateOnRefresh: true,
            onUpdate(self) {
              if (progressRef.current) {
                gsap.set(progressRef.current, {
                  scaleX: self.progress,
                  transformOrigin: "left center",
                });
              }
              if (hintRef.current && self.progress > 0.04) {
                gsap.to(hintRef.current, { opacity: 0, duration: 0.4, overwrite: true });
              }
            },
          },
        });

        window.addEventListener("resize", applyHeight);
        return () => {
          tween.kill();
          window.removeEventListener("resize", applyHeight);
        };
      });

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <>
      {/* ── Desktop / Tablet ── */}
      <div ref={wrapperRef} className="hs-desktop" style={{ position: "relative" }}>
        {/* sticky viewport */}
        <div
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            overflow: "hidden",
            background: BG,
            display: "flex",
            alignItems: "center",
          }}
        >
          {/* progress bar */}
          <div
            style={{
              position: "absolute", bottom: 0, left: 0, right: 0,
              height: "3px", background: "rgba(25,118,210,0.1)", zIndex: 20,
            }}
          >
            <div
              ref={progressRef}
              style={{
                height: "100%",
                background: `linear-gradient(to right, ${BLUE}, #0D47A1)`,
                width: "100%",
                transform: "scaleX(0)",
                transformOrigin: "left center",
              }}
            />
          </div>

          {/* scroll hint */}
          <div
            ref={hintRef}
            style={{
              position: "absolute", bottom: "2.5rem", right: "2.5rem",
              display: "flex", alignItems: "center", gap: "0.4rem",
              color: "#94a3b8", fontSize: "0.68rem",
              fontFamily: "'Inter', sans-serif", fontWeight: 600,
              letterSpacing: "0.14em", textTransform: "uppercase", zIndex: 20,
            }}
          >
            Scroll to explore →
          </div>

          {/* cards track */}
          <div
            ref={trackRef}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1.5rem",
              paddingLeft: "clamp(40px, 5vw, 80px)",
              paddingRight: "clamp(80px, 8vw, 120px)",
              willChange: "transform",
              flexShrink: 0,
            }}
          >
            <LabelCard />
            {cardData.map((card) => (
              <DataCard key={card.title} card={card} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Mobile — native swipe ── */}
      <div
        className="hs-mobile"
        style={{ display: "none", background: BG, padding: "2rem 0" }}
      >
        <div
          className="hs-mobile-track"
          style={{
            display: "flex",
            overflowX: "auto",
            gap: "1rem",
            paddingLeft: "1.25rem",
            paddingRight: "1.25rem",
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
          } as React.CSSProperties}
        >
          {cardData.map((card) => (
            <div
              key={card.title}
              style={{ minWidth: "82vw", flexShrink: 0, scrollSnapAlign: "start" }}
            >
              <DataCard card={card} />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .hs-desktop { display: none !important; }
          .hs-mobile  { display: block !important; }
        }
        .hs-mobile-track::-webkit-scrollbar { display: none; }
        .hs-mobile-track { scrollbar-width: none; }
      `}</style>
    </>
  );
}
