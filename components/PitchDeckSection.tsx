"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/* ── card data ─────────────────────────────────────────────────── */
/* Single brand colour throughout — matches the main website */
const ACCENT = "#1976D2";
const RGB = "25,118,210";

const CARDS = [
  {
    id: "deck",
    num: "01",
    title: "Custom Pitch Deck",
    sub: "Strategy & Storytelling",
    bg: "#ffffff",
    desc: "Hand-crafted, investor-grade presentations built by senior strategists — blending narrative logic, market research, and investor psychology into a story that closes rooms.",
    tags: ["Strategy", "Narrative Design", "Slide Design", "Financial Summary", "Visual Identity"],
  },
  {
    id: "ai",
    num: "02",
    title: "AI-Powered Deck",
    sub: "Technology & Speed",
    bg: "#f8fbff",
    desc: "Proprietary AI builds an institutional draft from your one-pager in under 4 hours. Senior strategists refine every slide to Series A+ standard before delivery.",
    tags: ["AI Generation", "Human Review", "24 h Delivery", "Rapid Iteration", "Quality Assured"],
  },
  {
    id: "model",
    num: "03",
    title: "Financial Modelling",
    sub: "Analytics & Precision",
    bg: "#f5faff",
    desc: "Three-statement models with bottom-up revenue drivers, sensitivity tables, unit economics, and monthly Year 1 granularity — built to survive institutional due diligence.",
    tags: ["P&L Model", "Balance Sheet", "Unit Economics", "5-Year Projection", "Sensitivity Analysis"],
  },
  {
    id: "coaching",
    num: "04",
    title: "Investor Coaching",
    sub: "Live Sessions & Feedback",
    bg: "#f2f8ff",
    desc: "1-on-1 live mock pitches with ex-VC partners. Real-time feedback on delivery, Q&A simulation with the 30 hardest investor questions, and term-sheet negotiation tactics.",
    tags: ["Mock Pitch", "Q&A Simulation", "VC Feedback", "Term Sheet", "Negotiation"],
  },
];

interface Props { onCTAClick: () => void; }

export default function PitchDeckSection({ onCTAClick }: Props) {
  const pinRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const overlayRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    const overlays = overlayRefs.current.filter(Boolean) as HTMLDivElement[];
    const N = cards.length;

    // All cards except the first start below the viewport
    gsap.set(cards.slice(1), { yPercent: 100 });
    gsap.set(overlays, { opacity: 0 });

    // One master timeline — pinned for (N-1) viewports of scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: pinRef.current,
        start: "top top",
        end: `+=${(N - 1) * 80}vh`,
        pin: true,
        scrub: 2.5,           // matches Lenis duration:1.5 for silky feel
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    // Each step: slide next card up, scale+darken all cards beneath it
    for (let i = 1; i < N; i++) {
      const step = i - 1;

      // Incoming card slides up
      tl.to(cards[i], { yPercent: 0, ease: "none", duration: 1 }, step);

      // Every card below the incoming one compresses + darkens
      for (let j = 0; j < i; j++) {
        const depth = i - j;
        tl.to(cards[j], { scale: 1 - depth * 0.035, ease: "none", duration: 1 }, step);
        tl.to(overlays[j], { opacity: Math.min(depth * 0.15, 0.45), ease: "none", duration: 1 }, step);
      }
    }
  }, { scope: pinRef });

  return (
    <section id="pitch-deck" className="bg-[#FFFFFF]">

      {/* Section label */}
      <div className="max-w-[1400px] mx-auto px-6 pt-[clamp(4rem,8vw,7rem)] pb-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-[2px] bg-[#1976D2] rounded" />
          <span className="text-[0.67rem] font-bold tracking-[0.32em] uppercase text-[#1976D2]">
            Pitch Deck Services
          </span>
        </div>
        <p className="text-[#888888] text-[0.95rem] max-w-xs">
          Scroll through four flagship offerings.
        </p>
      </div>

      {/* ── PINNED CONTAINER ─────────────────────────────────────── */}
      <div
        ref={pinRef}
        className="relative w-full overflow-hidden"
        style={{ height: "68vh" }}
      >
        {CARDS.map((card, i) => (
          <div
            key={card.id}
            className="absolute inset-x-0 top-0 flex justify-center px-4 pt-3"
            style={{ zIndex: i + 1 }}
          >
            {/* Card shell — ref + transformOrigin here so scale is card-centred */}
            <div
              ref={el => { cardRefs.current[i] = el; }}
              className="relative w-full rounded-[1.5rem] overflow-hidden flex flex-col"
              style={{
                maxWidth: 960,
                minHeight: "calc(68vh - 1.5rem)",
                background: card.bg,
                border: `1px solid rgba(${RGB},0.1)`,
                boxShadow: `0 20px 50px rgba(0,0,0,0.07), 0 0 0 1px rgba(${RGB},0.04)`,
                transformOrigin: "50% 0%",    // scale compresses from the top-centre of the card
              }}
            >
              {/* Accent top bar */}
              <div
                className="h-1 w-full flex-shrink-0"
                style={{ background: `linear-gradient(90deg, ${ACCENT}, transparent)` }}
              />

              {/* Body */}
              <div className="flex flex-col justify-between flex-1 p-8 md:p-12 gap-6">

                {/* Top row */}
                <div className="flex items-start justify-between gap-6 flex-wrap">
                  {/* Icon + meta */}
                  <div>
                    <span
                      className="inline-block text-[0.6rem] font-bold tracking-[0.28em] uppercase px-3 py-1 rounded-full mb-3"
                      style={{
                        background: `rgba(${RGB},0.08)`,
                        color: ACCENT,
                        border: `1px solid rgba(${RGB},0.18)`,
                      }}
                    >
                      {card.num} / 04
                    </span>
                    <p className="text-[0.75rem] font-semibold text-[#888888] tracking-wide">{card.sub}</p>
                  </div>

                  {/* CTA */}
                  <button
                    onClick={onCTAClick}
                    className="inline-flex items-center gap-2 text-[0.82rem] font-semibold text-white px-5 py-2.5 rounded-full transition-all duration-200 hover:-translate-y-0.5 flex-shrink-0"
                    style={{
                      background: ACCENT,
                      boxShadow: `0 4px 16px rgba(${RGB},0.3)`,
                    }}
                  >
                    Get Started
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                      <path d="M1 6.5h11M6.5 1l5.5 5.5L6.5 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>

                {/* Giant heading */}
                <div>
                  <h2
                    className="font-black leading-[0.9] tracking-[-0.05em]"
                    style={{ fontSize: "clamp(2.8rem,7vw,6.5rem)" }}
                  >
                    <span className="block text-[#1A1A1A]">{card.title.split(" ")[0]}</span>
                    <span style={{ color: `rgba(${RGB},0.25)` }}>
                      {card.title.split(" ").slice(1).join(" ")}
                    </span>
                  </h2>
                </div>

                {/* Desc + tags */}
                <div className="space-y-5">
                  <p className="text-[#555555] text-[0.95rem] leading-relaxed max-w-[55ch]">
                    {card.desc}
                  </p>
                  <div
                    className="flex flex-wrap gap-2 pt-4"
                    style={{ borderTop: `1px solid rgba(${RGB},0.08)` }}
                  >
                    {card.tags.map(t => (
                      <span
                        key={t}
                        className="text-[0.75rem] font-medium text-[#555555] px-3.5 py-1.5 rounded-full bg-[#F5F7FA] border border-[#E3F2FD]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* GSAP dark overlay */}
              <div
                ref={el => { overlayRefs.current[i] = el; }}
                className="absolute inset-0 rounded-[1.5rem] pointer-events-none"
                style={{ background: "rgba(10,15,30,0.8)", opacity: 0, zIndex: 10 }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="h-24" />
    </section>
  );
}
