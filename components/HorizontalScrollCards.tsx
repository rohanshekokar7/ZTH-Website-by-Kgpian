"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ── Design tokens ────────────────────────────────────────────── */
const BG      = "#F8FAFD";
const CARD_W  = 300;   // px — 6% tighter than 320
const CARD_H  = 552;   // px — 10% taller than 500
const PAD     = 26;    // px — uniform inner padding
const RADIUS  = "24px";

/* ── Fixed row heights inside the flex column ─────────────────── */
/* Accent bar is position:absolute and does NOT occupy flex space. */
/* All measurements below are flex children heights.               */
const ROW = {
  category: 20,   // 0.65rem label
  gap1:      8,   // category → title  (was 14)
  title:    68,   // 2-line zone at 1.55rem × 1.22  (was 80)
  gap2:      8,   // title → divider   (was 12)
  divider:   1,
  gap3:     10,   // divider → desc    (was 14)
  desc:     70,   // 3-line zone at 0.875rem × 1.65 (was 68)
  gap4:     14,   // desc → bullets    (was 20)
  // bullet zone = flex:1 → each <li> gets flex:1 for equal rows
  // innerH = CARD_H - 2×PAD = 552-52 = 500px
  // fixed flex sum = 20+8+68+8+1+10+70+14 = 199px
  // bullet zone = 500-199 = 301px  →  4 × ~75px per bullet row ✓
};

/* ── Card data type ──────────────────────────────────────────── */
export type CardData = {
  isLabel : boolean;
  category: string;
  title   : string;
  desc    : string;
  accent  : string;
  image   : string;
  bullets : string[];
};

/* ── Default fundraising card data ───────────────────────────── */
const allCards: CardData[] = [
  {
    isLabel : true,
    category: "CAPITAL NETWORK",
    title   : "During Fundraising Support",
    desc    : "Full support from your first investor meeting to signed term sheet and final close.",
    accent  : "#1565C0",
    image   : "/fundraising_illustration.png",
    bullets : [] as string[],
  },
  {
    isLabel : false,
    category: "FUNDRAISING PREP",
    title   : "Investor Meeting Preparation",
    desc    : "Coaching, deck reviews and strategic positioning for high-stakes investor meetings.",
    accent  : "#1565C0",
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
    desc    : "Live strategic support at pitch events, demo days and investor showcases.",
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
    desc    : "Guidance through term sheet negotiations, documentation and financial structure.",
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
    desc    : "Data room management, investor questionnaires and diligence readiness checks.",
    accent  : "#1565C0",
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
    desc    : "Structured updates and follow-up management to keep investors engaged.",
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

/* ── Card component ───────────────────────────────────────────── */
function Card({ card }: { card: CardData }) {
  const { accent, isLabel } = card;

  return (
    <div
      className="hs-card"
      style={{
        width              : CARD_W,
        minWidth           : CARD_W,
        height             : CARD_H,
        flexShrink         : 0,
        background         : "rgba(255,255,255,0.92)",
        backdropFilter     : "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderRadius       : RADIUS,
        border             : "1px solid rgba(210,225,245,0.55)",
        boxShadow          : "0 10px 30px rgba(0,0,0,0.06), 0 2px 10px rgba(0,0,0,0.04)",
        overflow           : "hidden",
        position           : "relative",
        display            : "flex",
        flexDirection      : "column",
        padding            : `${PAD}px`,
        boxSizing          : "border-box",
      } as React.CSSProperties}
    >
      {/* full-width top accent line */}
      <div style={{
        position  : "absolute",
        top       : 0,
        left      : 0,
        right     : 0,
        height    : 4,
        background: accent,
        zIndex    : 1,
      }} />

      {/* ZONE 1 · category label */}
      <div style={{ height: ROW.category, flexShrink: 0, display: "flex", alignItems: "center" }}>
        <span style={{
          fontSize     : "0.65rem",
          fontWeight   : 600,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color        : accent,
          fontFamily   : "'Inter', sans-serif",
          lineHeight   : 1,
        }}>
          {card.category}
        </span>
      </div>

      {/* gap 1 */}
      <div style={{ height: ROW.gap1, flexShrink: 0 }} />

      {/* ZONE 2 · title — highest visual emphasis */}
      <div style={{ height: ROW.title, flexShrink: 0, overflow: "hidden" }}>
        <p style={{
          fontFamily     : "'Playfair Display', serif",
          fontSize       : "1.55rem",
          fontWeight     : 700,
          color          : "#0d1b2e",
          lineHeight     : 1.22,
          letterSpacing  : "-0.025em",
          margin         : 0,
          display        : "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow       : "hidden",
        } as React.CSSProperties}>
          {card.title}{isLabel && <span style={{ color: accent }}> →</span>}
        </p>
      </div>

      {/* gap 2 + divider + gap 3 */}
      <div style={{ height: ROW.gap2, flexShrink: 0 }} />
      <div style={{ height: ROW.divider, background: "rgba(15,27,46,0.1)", flexShrink: 0 }} />
      <div style={{ height: ROW.gap3, flexShrink: 0 }} />

      {/* ZONE 3 · description */}
      <div style={{ height: ROW.desc, flexShrink: 0, overflow: "hidden" }}>
        <p style={{
          fontFamily     : "'Inter', sans-serif",
          fontSize       : "0.875rem",
          fontWeight     : 400,
          color          : "#4a5568",
          lineHeight     : 1.65,
          margin         : 0,
          display        : "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          overflow       : "hidden",
        } as React.CSSProperties}>
          {card.desc}
        </p>
      </div>

      {/* gap 4 */}
      <div style={{ height: ROW.gap4, flexShrink: 0 }} />

      {/* ZONE 4 · bullets — flex:1, each li gets equal height, no dead space */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {isLabel ? (
          <div style={{ flex: 1, borderRadius: "12px", overflow: "hidden", position: "relative" }}>
            <div style={{
              position  : "absolute",
              inset     : "0 0 auto 0",
              height    : "3.5rem",
              zIndex    : 1,
              background: "linear-gradient(to bottom, rgba(255,255,255,0.92), transparent)",
            }} />
            <img
              src={card.image}
              alt="Fundraising support"
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", opacity: 0.82 }}
            />
          </div>
        ) : (
          /* 4 bullet rows, each flex:1 — fills zone perfectly, thin separator between rows */
          <ul style={{
            paddingLeft  : 0,
            listStyle    : "none",
            margin       : 0,
            flex         : 1,
            display      : "flex",
            flexDirection: "column",
          }}>
            {card.bullets.map((b, i) => (
              <li
                key={i}
                style={{
                  flex        : 1,
                  display     : "flex",
                  alignItems  : "center",
                  gap         : "0.65rem",
                  borderTop   : i > 0 ? "1px solid rgba(15,27,46,0.06)" : "none",
                }}
              >
                <span style={{
                  color     : accent,
                  fontSize  : "0.72rem",
                  fontWeight: 700,
                  flexShrink: 0,
                  lineHeight: 1,
                }}>→</span>
                <span style={{
                  fontSize  : "0.875rem",
                  fontWeight: 500,
                  color     : "#1e3a5f",
                  lineHeight: 1.4,
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
export default function HorizontalScrollCards({ cards }: { cards?: CardData[] } = {}) {
  const cardList = cards ?? allCards;
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

      const getDistance = () =>
        Math.max(0, track.scrollWidth - window.innerWidth - 50);

      const applyHeight = () => {
        wrapper.style.height = `calc(100vh + ${getDistance()}px)`;
        ScrollTrigger.refresh();
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
              position     : "absolute",
              bottom       : "2rem",
              right        : "2.5rem",
              color        : "#7a9ab8",
              fontSize     : "0.7rem",
              fontFamily   : "'Inter', sans-serif",
              fontWeight   : 600,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              zIndex       : 20,
            }}
          >
            Scroll to explore →
          </div>

          {/* cards track */}
          <div
            ref={trackRef}
            style={{
              display     : "flex",
              alignItems  : "stretch",
              gap         : "22px",
              paddingLeft : "72px",
              paddingRight: "100px",
              willChange  : "transform",
              flexShrink  : 0,
            }}
          >
            {cardList.map((card) => (
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
            display    : "flex",
            overflowX  : "auto",
            gap        : "1rem",
            paddingLeft : "1.25rem",
            paddingRight: "1.25rem",
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
          } as React.CSSProperties}
        >
          {cardList.map((card) => (
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

        .hs-card {
          transition: transform 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94),
                      box-shadow 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .hs-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 24px 60px rgba(0,0,0,0.13), 0 8px 24px rgba(0,0,0,0.07) !important;
        }
      `}</style>
    </>
  );
}
