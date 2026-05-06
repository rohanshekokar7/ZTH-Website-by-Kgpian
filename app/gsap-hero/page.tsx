"use client";

/**
 * GSAPHeroPage — /gsap-hero
 *
 * "Stacked Pages" Effect
 * ─────────────────────
 * Sections are visually stacked like physical sheets of paper.
 * As the user scrolls:
 *   1. Hero "page" slides upward and slightly rotates in perspective
 *      (like lifting a sheet off a desk), revealing page 2 beneath.
 *   2. Page 2 concurrently scales up from 0.92 → 1 and brightens
 *      (like the top sheet was casting a shadow over it).
 *   3. Page 2 then becomes the new "top" and its own content animates in.
 *   4. Page 3 follows the same mechanics.
 *
 * Technical
 * ─────────
 * • useGSAP  — proper cleanup, avoids StrictMode double-fire.
 * • Lenis    — already running globally; grabbed via lenisStore.
 * • ScrollTrigger — one timeline per page transition, scrub: 1.5.
 */

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/* ── Design tokens ─────────────────────────────────────────────── */
const PAGES = [
  {
    id:      "page-1",
    bg:      "linear-gradient(145deg, #07080f 0%, #0d1225 100%)",
    accent:  "#38bdf8",
    rgb:     "56,189,248",
    orb1:    "rgba(56,189,248,0.12)",
    orb2:    "rgba(99,102,241,0.10)",
    eyebrow: "Step 01 — Prepare",
    words:   ["Raise.", "Capital.", "Fast."],
    sub:     "Build an investor-grade pitch deck powered by AI precision and institutional storytelling.",
    cta:     "Start your deck",
  },
  {
    id:      "page-2",
    bg:      "linear-gradient(145deg, #0d0418 0%, #160826 100%)",
    accent:  "#c084fc",
    rgb:     "192,132,252",
    orb1:    "rgba(192,132,252,0.12)",
    orb2:    "rgba(236,72,153,0.08)",
    eyebrow: "Step 02 — Practice",
    words:   ["Pitch.", "Refine.", "Win."],
    sub:     "Simulate real investor conversations inside our AI Mock Room and sharpen every answer.",
    cta:     "Enter Mock Room",
  },
  {
    id:      "page-3",
    bg:      "linear-gradient(145deg, #021008 0%, #041a10 100%)",
    accent:  "#4ade80",
    rgb:     "74,222,128",
    orb1:    "rgba(74,222,128,0.12)",
    orb2:    "rgba(14,165,233,0.08)",
    eyebrow: "Step 03 — Raise",
    words:   ["Fund.", "Grow.", "Close."],
    sub:     "Connect with 500+ active investors. Execute your round with confidence and speed.",
    cta:     "Find investors",
  },
];

export default function GSAPHeroPage() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  /* One ref per page card */
  const pageRefs   = useRef<(HTMLElement | null)[]>([]);
  /* Spacer divs that create the scroll distance for each transition */
  const spacerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      /* ── Entrance animation for page-1 content ───────────────── */
      const p1 = pageRefs.current[0];
      if (p1) {
        const words   = p1.querySelectorAll<HTMLElement>(".pg-word");
        const eyebrow = p1.querySelector<HTMLElement>(".pg-eyebrow");
        const body    = p1.querySelector<HTMLElement>(".pg-body");
        const cta     = p1.querySelector<HTMLElement>(".pg-cta");
        const hint    = p1.querySelector<HTMLElement>(".pg-hint");

        gsap.timeline({ defaults: { ease: "power4.out" } })
          .from(eyebrow, { opacity: 0, y: 20,  duration: 0.6, delay: 0.1 })
          .from(words,   { opacity: 0, y: 80, stagger: 0.1, duration: 1.0 }, "-=0.3")
          .from(body,    { opacity: 0, y: 24, duration: 0.7 }, "-=0.4")
          .from(cta,     { opacity: 0, y: 16, duration: 0.5 }, "-=0.3")
          .from(hint,    { opacity: 0,         duration: 0.4 }, "-=0.2");

        /* Bounce scroll arrow */
        gsap.to(".pg-arrow", { y: 7, repeat: -1, yoyo: true, ease: "sine.inOut", duration: 0.95 });
      }

      /* ── Page-lift transitions (one per page → next) ─────────── */
      PAGES.forEach((_, i) => {
        const currentPage = pageRefs.current[i];
        const nextPage    = pageRefs.current[i + 1];
        const spacer      = spacerRefs.current[i];
        if (!currentPage || !nextPage || !spacer) return;

        /* Each transition is driven by scrolling through the spacer */
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger:    spacer,
            start:      "top top",
            end:        "bottom top",
            scrub:      1.5,
            pin:        currentPage,   /* pin the leaving page while scrubbing */
            anticipatePin: 1,
          },
        });

        /* ── Leaving page (i) ── slides up + perspective tilt ── */
        tl.to(currentPage, {
          y:          "-105vh",
          rotateX:    8,           /* slight forward tilt as it lifts */
          scale:      0.94,
          opacity:    0.2,
          ease:       "none",
          transformOrigin: "50% 0%",
        }, 0);

        /* ── Arriving page (i+1) ── scales up from slightly beneath ── */
        tl.fromTo(
          nextPage,
          { scale: 0.88, y: "4vh", filter: "brightness(0.6)" },
          { scale: 1,    y: "0vh", filter: "brightness(1)",   ease: "none" },
          0
        );

        /* ── Stagger-reveal content on arriving page ── */
        const nextEyebrow = nextPage.querySelector<HTMLElement>(".pg-eyebrow");
        const nextWords   = nextPage.querySelectorAll<HTMLElement>(".pg-word");
        const nextBody    = nextPage.querySelector<HTMLElement>(".pg-body");
        const nextCta     = nextPage.querySelector<HTMLElement>(".pg-cta");

        tl.from(nextEyebrow, { opacity: 0, y: 16, duration: 0.25, ease: "none" }, 0.6)
          .from(nextWords,   { opacity: 0, y: 48, stagger: 0.08, duration: 0.35, ease: "none" }, 0.65)
          .from(nextBody,    { opacity: 0, y: 20, duration: 0.25, ease: "none" }, 0.8)
          .from(nextCta,     { opacity: 0, y: 12, duration: 0.2,  ease: "none" }, 0.88);
      });
    },
    { scope: wrapperRef }
  );

  return (
    /* Perspective container — gives the 3-D lift illusion */
    <div
      ref={wrapperRef}
      style={{ perspective: "1800px", perspectiveOrigin: "50% 0%" }}
    >
      {/*
       * Layout:
       *   page-stack  → position:sticky stack of all page cards
       *   spacers     → invisible full-viewport divs that create the
       *                 scroll distance ScrollTrigger scrubs against
       */}

      {/* ── Page stack (sticky viewport) ───────────────────────── */}
      <div style={{ position: "sticky", top: 0, height: "100vh", zIndex: 10 }}>
        {PAGES.map((pg, i) => (
          <section
            key={pg.id}
            ref={(el) => { pageRefs.current[i] = el; }}
            style={{
              position:      "absolute",
              inset:         0,
              height:        "100vh",
              width:         "100%",
              display:       "flex",
              alignItems:    "center",
              overflow:      "hidden",
              background:    pg.bg,
              /* Z-index: first page on top, last page at bottom */
              zIndex:        PAGES.length - i,
              willChange:    "transform, opacity, filter",
              /* Subtle card shadow that makes pages look elevated */
              boxShadow:     i > 0 ? "0 -20px 80px rgba(0,0,0,0.5)" : "none",
            }}
          >
            {/* ── Ambient orbs ─────────────────────────────────── */}
            <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
              <div style={{
                position: "absolute", top: "-15%", right: "-10%",
                width: "55vmax", height: "55vmax", borderRadius: "50%",
                background: `radial-gradient(circle, ${pg.orb1} 0%, transparent 65%)`,
                filter: "blur(50px)",
              }} />
              <div style={{
                position: "absolute", bottom: "-12%", left: "-8%",
                width: "45vmax", height: "45vmax", borderRadius: "50%",
                background: `radial-gradient(circle, ${pg.orb2} 0%, transparent 65%)`,
                filter: "blur(50px)",
              }} />
              {/* Fine grid */}
              <div style={{
                position: "absolute", inset: 0,
                backgroundImage:
                  `linear-gradient(rgba(${pg.rgb},0.04) 1px, transparent 1px),` +
                  `linear-gradient(90deg, rgba(${pg.rgb},0.04) 1px, transparent 1px)`,
                backgroundSize: "64px 64px",
                maskImage:
                  "radial-gradient(ellipse 85% 85% at 50% 50%, black 0%, transparent 80%)",
              }} />
              {/* Top edge accent bar */}
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: 2,
                background: `linear-gradient(90deg, transparent, rgba(${pg.rgb},0.5), transparent)`,
              }} />
            </div>

            {/* ── Main content ─────────────────────────────────── */}
            <div style={{
              position: "relative", zIndex: 2,
              maxWidth: 1100, width: "100%",
              margin: "0 auto", padding: "0 8vw",
            }}>

              {/* Eyebrow */}
              <div className="pg-eyebrow" style={{
                display: "inline-flex", alignItems: "center",
                gap: "0.75rem", marginBottom: "2.5rem",
              }}>
                <div style={{
                  width: 30, height: 1.5, borderRadius: 2,
                  background: pg.accent,
                  boxShadow: `0 0 8px ${pg.accent}`,
                }} />
                <span style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.68rem", fontWeight: 700,
                  letterSpacing: "0.32em", textTransform: "uppercase",
                  color: pg.accent,
                }}>
                  {pg.eyebrow}
                </span>
              </div>

              {/* Headline words (each individually animated) */}
              <h1 style={{
                fontFamily:     "'Inter', sans-serif",
                fontWeight:     900,
                lineHeight:     0.95,
                letterSpacing:  "-0.05em",
                fontSize:       "clamp(4rem, 12vw, 11.5rem)",
                marginBottom:   "2rem",
                willChange:     "transform, opacity",
              }}>
                {pg.words.map((word, wi) => (
                  <span
                    key={word}
                    className="pg-word"
                    style={{
                      display:    "block",
                      color:      wi === pg.words.length - 1 ? "transparent" : "#fff",
                      WebkitTextStroke:
                        wi === pg.words.length - 1 ? `2px ${pg.accent}` : "none",
                      textShadow:
                        wi === pg.words.length - 1
                          ? `0 0 80px rgba(${pg.rgb},0.35)`
                          : "none",
                    }}
                  >
                    {word}
                  </span>
                ))}
              </h1>

              {/* Divider */}
              <div style={{
                width: 64, height: 2, borderRadius: 2, marginBottom: "1.75rem",
                background: `linear-gradient(90deg, ${pg.accent}, transparent)`,
              }} />

              {/* Body */}
              <p className="pg-body" style={{
                fontFamily: "'Inter', sans-serif",
                fontSize:   "clamp(1rem, 1.8vw, 1.2rem)",
                fontWeight: 400, lineHeight: 1.7,
                color:      "rgba(255,255,255,0.45)",
                maxWidth:   520, marginBottom: "2.5rem",
              }}>
                {pg.sub}
              </p>

              {/* CTA */}
              <button
                className="pg-cta"
                style={{
                  display:        "inline-flex",
                  alignItems:     "center",
                  gap:            "0.75rem",
                  padding:        "0.9rem 2.25rem",
                  background:     `rgba(${pg.rgb},0.12)`,
                  border:         `1px solid rgba(${pg.rgb},0.35)`,
                  borderRadius:   100,
                  color:          pg.accent,
                  fontFamily:     "'Inter', sans-serif",
                  fontSize:       "0.88rem",
                  fontWeight:     600,
                  letterSpacing:  "0.02em",
                  cursor:         "pointer",
                  backdropFilter: "blur(10px)",
                  transition:     "all 0.3s ease",
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget;
                  el.style.background  = `rgba(${pg.rgb},0.22)`;
                  el.style.transform   = "translateY(-2px)";
                  el.style.boxShadow   = `0 10px 30px rgba(${pg.rgb},0.2)`;
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget;
                  el.style.background  = `rgba(${pg.rgb},0.12)`;
                  el.style.transform   = "translateY(0)";
                  el.style.boxShadow   = "none";
                }}
              >
                {pg.cta}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 7h12M7 1l6 6-6 6"
                    stroke="currentColor" strokeWidth="1.5"
                    strokeLinecap="round" strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            {/* Page index — bottom right */}
            <span style={{
              position:      "absolute",
              bottom:        "2rem",
              right:         "2.5rem",
              fontFamily:    "monospace",
              fontSize:      "0.65rem",
              letterSpacing: "0.25em",
              color:         "rgba(255,255,255,0.15)",
              userSelect:    "none",
            }}>
              {String(i + 1).padStart(2, "0")} / {String(PAGES.length).padStart(2, "0")}
            </span>

            {/* Scroll hint (first page only) */}
            {i === 0 && (
              <div className="pg-hint" style={{
                position:  "absolute",
                bottom:    "2.25rem",
                left:      "50%",
                transform: "translateX(-50%)",
                display:   "flex",
                flexDirection: "column",
                alignItems: "center",
                gap:        "0.4rem",
                color:      "rgba(255,255,255,0.22)",
                userSelect: "none",
              }}>
                <span style={{
                  fontFamily:    "'Inter', sans-serif",
                  fontSize:      "0.6rem",
                  letterSpacing: "0.35em",
                  textTransform: "uppercase",
                }}>
                  Scroll
                </span>
                <svg
                  className="pg-arrow"
                  width="18" height="18" viewBox="0 0 18 18" fill="none"
                >
                  <path
                    d="M9 2v14M2 9l7 7 7-7"
                    stroke="currentColor" strokeWidth="1.4"
                    strokeLinecap="round" strokeLinejoin="round"
                  />
                </svg>
              </div>
            )}
          </section>
        ))}
      </div>

      {/* ── Spacers — create scroll distance for each page transition ── */}
      {PAGES.slice(0, -1).map((pg, i) => (
        <div
          key={`spacer-${pg.id}`}
          ref={(el) => { spacerRefs.current[i] = el; }}
          style={{
            height:          "100vh",
            /* Each spacer sits right after its corresponding page in flow */
            position:        "relative",
            zIndex:          0,
            pointerEvents:   "none",
          }}
        />
      ))}

      {/* Trailing spacer so page-3 isn't cut off */}
      <div style={{ height: "100vh" }} />
    </div>
  );
}
