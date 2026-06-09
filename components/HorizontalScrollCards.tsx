"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ── Design tokens ────────────────────────────────────────────── */
const BG        = "#F8FAFD";
const CARD_W    = 320;           // px – every card identical width
const CARD_H    = 500;           // px – every card identical height
const CARD_PAD  = 28;            // px – uniform inner padding
const RADIUS    = "20px";
const CARD_BG   = "#ffffff";

/* ── Fixed row heights (guarantee cross-card alignment) ───────── */
const ROW = {
  accent:     3,   // top accent bar
  category:  18,   // category label
  gap1:      14,   // space: category → title
  title:     76,   // title zone (2 lines max, overflow hidden)
  gap2:      12,   // space above divider
  divider:    1,
  gap3:      14,   // space below divider
  desc:      68,   // description zone (3 lines max, overflow hidden)
  gap4:      16,   // space above bullets / image
  // remaining = CARD_H - CARD_PAD×2 - accent - category - gap1 - title - gap2 - divider - gap3 - desc - gap4
  // = 500 - 56 - 3 - 18 - 14 - 76 - 12 - 1 - 14 - 68 - 16 = 222 px  →  bullets / image zone
};

/* ── Card data (all cards: 1 label + 1 desc ≤ 3 lines + 4 bullets) */
const allCards = [
  {
    isLabel : true,
    category: "CAPITAL NETWORK",
    title   : "During Fundraising Support",
    desc    : "End-to-end support while you raise — from first investor meeting to signed term sheet.",
    accent  : "#1976D2",
    image   : "/fundraising_illustration.png",
    bullets : [] as string[],
  },
  {
    isLabel : false,
    category: "FUNDRAISING PREP",
    title   : "Investor Meeting Preparation",
    desc    : "Targeted coaching, deck reviews and strategic positioning for high-stakes investor conversations.",
    accent  : "#1976D2",
    image   : "",
    bullets : [
      "Pitch deck review & narrative refinement",
      "Mock investor Q&A and objection handling",
      "Meeting agenda & flow structuring",
      "Founder positioning and story alignment",
    ],
  },
  {
    isLabel : false,
    category: "DEMO & EVENTS",
    title   : "Pitch Day Support",
    desc    : "Real-time strategic support at pitch events, demo days and investor showcases.",
    accent  : "#1565C0",
    image   : "",
    bullets : [
      "Live event coordination & logistics",
      "On-site founder briefing and prep",
      "Warm investor introductions on the day",
      "Post-pitch debrief and follow-up strategy",
    ],
  },
  {
    isLabel : false,
    category: "STRUCTURING & DOCS",
    title   : "Deal Structuring Support",
    desc    : "Expert guidance through term sheet negotiations, documentation and financial discussions.",
    accent  : "#0D47A1",
    image   : "",
    bullets : [
      "Term sheet review and guidance",
      "Documentation workflow management",
      "Cap table analysis and modelling",
      "Strategic financial discussion support",
    ],
  },
  {
    isLabel : false,
    category: "DILIGENCE & READINESS",
    title   : "Due Diligence Coordination",
    desc    : "End-to-end support for investor data requests, document workflows and readiness checks.",
    accent  : "#1976D2",
    image   : "",
    bullets : [
      "Data room setup and management",
      "Investor questionnaire preparation",
      "Financial record and audit support",
      "Legal document coordination",
    ],
  },
  {
    isLabel : false,
    category: "ONGOING RELATIONS",
    title   : "Investor Communication Support",
    desc    : "Structured communication to maintain investor relationships throughout the fundraise.",
    accent  : "#1565C0",
    image   : "",
    bullets : [
      "Investor update templates and scheduling",
      "Follow-up strategy and timing guidance",
      "Fundraising status communications",
      "Relationship management tracking",
    ],
  },
];

/* ── Single unified Card component ────────────────────────────── */
function Card({ card }: { card: typeof allCards[0] }) {
  const { accent, isLabel } = card;

  /* inner height available after vertical padding */
  const innerH = CARD_H - CARD_PAD * 2;

  /* bullets/image zone height = inner − all fixed rows above it */
  const contentH =
    innerH -
    ROW.accent -
    ROW.category -
    ROW.gap1 -
    ROW.title -
    ROW.gap2 -
    ROW.divider -
    ROW.gap3 -
    ROW.desc -
    ROW.gap4;

  return (
    <div
      style={{
        width       : CARD_W,
        minWidth    : CARD_W,
        height      : CARD_H,
        flexShrink  : 0,
        background  : CARD_BG,
        borderRadius: RADIUS,
        border      : "1px solid rgba(0,0,0,0.07)",
        boxShadow   : "0 8px 32px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)",
        overflow    : "hidden",
        position    : "relative",
        display     : "flex",
        flexDirection: "column",
        padding     : `${CARD_PAD}px`,
        boxSizing   : "border-box",
      }}
    >
      {/* ── top accent bar ── */}
      <div style={{
        position  : "absolute",
        top       : 0,
        left      : CARD_PAD,
        right     : CARD_PAD,
        height    : ROW.accent,
        background: `linear-gradient(to right, ${accent}, transparent)`,
        flexShrink: 0,
      }} />

      {/* ── ZONE 1 · category label (18 px) ── */}
      <div style={{ height: ROW.category, flexShrink: 0, display: "flex", alignItems: "center" }}>
        <span style={{
          fontSize    : "0.58rem",
          fontWeight  : 800,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color       : accent,
          fontFamily  : "'Inter', sans-serif",
          lineHeight  : 1,
        }}>
          {card.category}
        </span>
      </div>

      {/* ── gap 1 (14 px) ── */}
      <div style={{ height: ROW.gap1, flexShrink: 0 }} />

      {/* ── ZONE 2 · title (76 px fixed, 2-line clamp) ── */}
      <div style={{ height: ROW.title, flexShrink: 0, overflow: "hidden" }}>
        <p style={{
          fontFamily  : "'Playfair Display', serif",
          fontSize    : "1.35rem",
          fontWeight  : 700,
          color       : "#0f172a",
          lineHeight  : 1.25,
          letterSpacing: "-0.02em",
          margin      : 0,
          display     : "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow    : "hidden",
        } as React.CSSProperties}>
          {card.title}
        </p>
      </div>

      {/* ── gap 2 + divider + gap 3 ── */}
      <div style={{ height: ROW.gap2, flexShrink: 0 }} />
      <div style={{ height: ROW.divider, background: "rgba(0,0,0,0.08)", flexShrink: 0 }} />
      <div style={{ height: ROW.gap3, flexShrink: 0 }} />

      {/* ── ZONE 3 · description (68 px fixed, 3-line clamp) ── */}
      <div style={{ height: ROW.desc, flexShrink: 0, overflow: "hidden" }}>
        <p style={{
          fontFamily  : "'Inter', sans-serif",
          fontSize    : "0.82rem",
          color       : "#475569",
          lineHeight  : 1.65,
          margin      : 0,
          display     : "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          overflow    : "hidden",
        } as React.CSSProperties}>
          {card.desc}
        </p>
      </div>

      {/* ── gap 4 (16 px) ── */}
      <div style={{ height: ROW.gap4, flexShrink: 0 }} />

      {/* ── ZONE 4 · bullets (data cards) or image (label card) ── */}
      <div style={{ height: contentH, flexShrink: 0, overflow: "hidden" }}>
        {isLabel ? (
          /* illustration fills bottom zone */
          <div style={{ position: "relative", height: "100%", borderRadius: "12px", overflow: "hidden" }}>
            <div style={{
              position: "absolute", inset: "0 0 auto 0", height: "3rem", zIndex: 1,
              background: "linear-gradient(to bottom, #fff, transparent)",
            }} />
            <img
              src={card.image}
              alt="Fundraising support"
              style={{
                width: "100%", height: "100%",
                objectFit: "cover", objectPosition: "center top",
                opacity: 0.85,
              }}
            />
          </div>
        ) : (
          /* bullet list */
          <ul style={{
            paddingLeft  : 0,
            listStyle    : "none",
            margin       : 0,
            display      : "flex",
            flexDirection: "column",
            gap          : "0.6rem",
          }}>
            {card.bullets.map((b, i) => (
              <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.55rem" }}>
                <span style={{
                  color     : accent,
                  fontSize  : "0.68rem",
                  marginTop : "0.2rem",
                  fontWeight: 700,
                  flexShrink: 0,
                  lineHeight: 1,
                }}>→</span>
                <span style={{
                  fontSize  : "0.82rem",
                  color     : "#64748b",
                  lineHeight: 1.5,
                  fontFamily: "'Inter', sans-serif",
                }}>{b}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

/* ── Main export ───────────────────────────────────────────────── */
export default function HorizontalScrollCards() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef   = useRef<HTMLDivElement>(null);
  const hintRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const wrapper = wrapperRef.current;
      const track   = trackRef.current;
      if (!wrapper || !track) return;

      const GAP     = 24; // px – matches gap in track
      const LPAD    = 80; // px – left padding of track
      const getDistance = () =>
        Math.max(0, track.scrollWidth - window.innerWidth + LPAD);

      const applyHeight = () => {
        wrapper.style.height = `calc(100vh + ${getDistance()}px)`;
      };
      applyHeight();

      const ctx = gsap.context(() => {
        const tween = gsap.to(track, {
          x   : () => -getDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: wrapper,
            start  : "top top",
            end    : () => `+=${getDistance()}`,
            scrub  : 1.2,
            invalidateOnRefresh: true,
            onUpdate(self) {
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
      {/* ── Desktop / Tablet ─────────────────────────────────────── */}
      <div ref={wrapperRef} className="hs-desktop" style={{ position: "relative" }}>
        <div
          style={{
            position  : "sticky",
            top       : 0,
            height    : "100vh",
            overflow  : "hidden",
            background: BG,
            display   : "flex",
            alignItems: "center",
          }}
        >
          {/* scroll hint */}
          <div
            ref={hintRef}
            style={{
              position    : "absolute",
              bottom      : "2rem",
              right       : "2rem",
              color       : "#94a3b8",
              fontSize    : "0.68rem",
              fontFamily  : "'Inter', sans-serif",
              fontWeight  : 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              zIndex      : 20,
            }}
          >
            Scroll to explore →
          </div>

          {/* cards track */}
          <div
            ref={trackRef}
            style={{
              display    : "flex",
              alignItems : "stretch",
              gap        : "24px",
              paddingLeft: "80px",
              paddingRight: "120px",
              willChange : "transform",
              flexShrink : 0,
            }}
          >
            {allCards.map((card) => (
              <Card key={card.title} card={card} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Mobile — native swipe ────────────────────────────────── */}
      <div
        className="hs-mobile"
        style={{ display: "none", background: BG, padding: "2rem 0" }}
      >
        <div
          className="hs-mobile-track"
          style={{
            display   : "flex",
            overflowX : "auto",
            gap       : "1rem",
            paddingLeft : "1.25rem",
            paddingRight: "1.25rem",
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
          } as React.CSSProperties}
        >
          {allCards.map((card) => (
            <div
              key={card.title}
              style={{ minWidth: "82vw", flexShrink: 0, scrollSnapAlign: "start" }}
            >
              <Card card={card} />
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
