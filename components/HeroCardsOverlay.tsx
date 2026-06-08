"use client";

import { useEffect, useState, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  FundraisingSupportCard,
  ComplianceCard,
  TractionCard,
} from "./HeroCards";

/**
 * Scroll-synced hero card choreography.
 *
 * The three cards live in a FIXED overlay above the next section's stacking
 * context (z:30 > the content wrapper's z:10). They greet users as a stacked
 * 3D deck pinned on the right of the hero and STAY stacked while the white
 * CardShowcaseSection scrolls up from below. Only once the white panel has
 * risen behind the deck (late in the hero scroll) do the cards flatten and
 * disperse into a horizontal row that lands ON the white section — so they're
 * never left as a flat row hanging over the dark hero. A spring trails the
 * disperse so the quick, late flatten settles gracefully rather than snapping.
 *
 * After landing they glue to the `#hero-cards-row` anchor's document position
 * and scroll away with the page.
 *
 *   scroll 0 → Sdisp     Stacked deck on the right, pinned in the hero.
 *   scroll Sdisp → Sglue Disperse + flatten onto the (now risen) white panel.
 *   scroll > Sglue       Glued to the row; scrolls with the page.
 */

// ── Card geometry (full size — matches the section's original cards) ──
const CARD_W = 370;
const CARD_H = 600; // must match the #hero-cards-row reserved height in CardShowcaseSection

// Stacked-deck offsets (mirrors the old CardSwap look)
const STACK_DX = 52;
const STACK_DY = 46;
const STACK_SKEW = 3;

// How long (in viewport heights of scroll) the disperse takes. The white panel
// only backs the tall cards late in the hero, so this window is intentionally
// short and finishes as the row aligns — the spring below smooths it out.
const DISPERSE_SPAN = 0.22;

// Spring on the group transforms — rounds the glue phase.
const SPRING = { stiffness: 90, damping: 22, mass: 0.5 } as const;
// Per-card disperse spring, tuned UNDERDAMPED (damping ratio ζ ≈ 0.61) so each
// card overshoots its landing slot and bounces back into place once — the
// "fall, bounce a little, settle intact" feel. Lower `damping` = bouncier.
const CARD_SPRING = { stiffness: 90, damping: 9, mass: 0.6 } as const;

interface Anchor {
  centerX: number; // viewport x of the row center
  slotSpacing: number; // horizontal distance between card centers in the row
  docY: number; // document y of the row's vertical center
}

export default function HeroCardsOverlay() {
  const { scrollY } = useScroll();
  const [vw, setVw] = useState(1440);
  const [vh, setVh] = useState(900);
  const [landed, setLanded] = useState(false);

  // Sensible defaults until we've measured the real landing row.
  const [anchor, setAnchor] = useState<Anchor>({
    centerX: 720,
    slotSpacing: 410,
    docY: 1700,
  });

  // Measure the landing row in CardShowcaseSection.
  useEffect(() => {
    const measure = () => {
      setVw(window.innerWidth);
      setVh(window.innerHeight);
      const el = document.getElementById("hero-cards-row");
      if (el) {
        const r = el.getBoundingClientRect();
        setAnchor({
          centerX: r.left + r.width / 2,
          slotSpacing: r.width / 3,
          docY: r.top + window.scrollY + CARD_H / 2,
        });
      }
    };
    // measure after layout settles
    const id = requestAnimationFrame(measure);
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("resize", measure);
    };
  }, []);

  // Resting (stacked) deck placement, as offsets from the viewport center.
  const restX = vw * 0.24; // deck sits on the right, like the hero
  const restY = vh * 0.02 + vh * 0.1; // nudge the hero deck down by 10% of viewport height

  // Landed resting spot: card top ~28% from the top of the viewport so the row
  // sits in the white section (tall cards nearly fill the viewport).
  const landedCenter = vh * 0.28 + CARD_H / 2;
  const pinnedY = landedCenter - vh / 2; // groupY offset when the row first lands
  const dispX = anchor.centerX - vw / 2; // group X offset that centers the row

  // Scroll where the document row reaches the landed spot (white fully behind).
  const Sglue = anchor.docY - landedCenter;
  // Hold the deck stacked until just before that, then disperse onto the risen
  // white panel over the (short, spring-smoothed) DISPERSE_SPAN window.
  const Sdisp = Math.max(Sglue - vh * DISPERSE_SPAN, 0);

  // ── Disperse / landing progress (scroll-driven, 0 → 1) ───────
  const progress = useTransform(scrollY, [Sdisp, Sglue], [0, 1]);

  // Toggle pointer events so the landed cards' CTAs are clickable.
  useEffect(() => {
    const unsub = progress.on("change", (p) => setLanded(p >= 0.95));
    return () => unsub();
  }, [progress]);

  // ── Group-level transforms ───────────────────────────────────
  const rotateX = useTransform(progress, [0, 1], [-10, 0]);
  const rotateY = useTransform(progress, [0, 1], [14, 0]);
  const groupX = useTransform(progress, [0, 1], [restX, dispX]);

  // Group Y: deck rest → land at the pin as the row aligns → then glue so the
  // row scrolls away with the page. Continuous at Sglue (pin === glued(Sglue)).
  const groupY = useTransform(scrollY, (s) => {
    if (s <= Sdisp) return restY; // stacked deck in the hero
    if (s >= Sglue) return anchor.docY - s - vh / 2; // glued → scrolls with content
    const p = (s - Sdisp) / (Sglue - Sdisp);
    return restY + (pinnedY - restY) * p; // disperse-phase drop
  });

  // Enlarge / reveal progress: the longer description appears over the back
  // portion of the disperse, finishing as the cards settle.
  const reveal = useTransform(progress, [0.4, 1], [0, 1]);

  // Spring the group values for a fluid, premium feel.
  const sRotateX = useSpring(rotateX, SPRING);
  const sRotateY = useSpring(rotateY, SPRING);
  const sGroupX = useSpring(groupX, SPRING);
  const sGroupY = useSpring(groupY, SPRING);

  const cards = [
    <FundraisingSupportCard key="fundraising" />,
    <ComplianceCard key="compliance" />,
    <TractionCard key="traction" />,
  ];

  return (
    <motion.div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 30,
        pointerEvents: "none", // pass-through; only the cards themselves opt in
        perspective: 1600,
      }}
    >
      <motion.div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          x: sGroupX,
          y: sGroupY,
          rotateX: sRotateX,
          rotateY: sRotateY,
          transformStyle: "preserve-3d",
        }}
      >
        {cards.map((card, i) => (
          <DispersingCard
            key={i}
            index={i}
            progress={progress}
            slotSpacing={anchor.slotSpacing}
            interactive={landed}
          >
            {card}
          </DispersingCard>
        ))}
      </motion.div>
    </motion.div>
  );
}

/* Single card: interpolates from its stacked-deck slot to its row slot, driven
   by the scroll-based disperse `progress` and trailed by a soft spring. */
function DispersingCard({
  index,
  progress,
  slotSpacing,
  interactive,
  children,
}: {
  index: number;
  progress: MotionValue<number>;
  slotSpacing: number;
  interactive: boolean;
  children: ReactNode;
}) {
  const x = useSpring(useTransform(progress, [0, 1], [index * STACK_DX, (index - 1) * slotSpacing]), CARD_SPRING);
  const y = useSpring(useTransform(progress, [0, 1], [-index * STACK_DY, 0]), CARD_SPRING);
  const z = useSpring(useTransform(progress, [0, 1], [-index * STACK_DX * 1.5, 0]), CARD_SPRING);
  const rotateZ = useSpring(useTransform(progress, [0, 1], [index * STACK_SKEW, 0]), CARD_SPRING);

  return (
    <motion.div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: CARD_W,
        height: CARD_H,
        marginLeft: -CARD_W / 2, // center the card on the group origin
        marginTop: -CARD_H / 2,
        x,
        y,
        z,
        rotateZ,
        zIndex: 10 - index, // front card (index 0) on top in the deck
        pointerEvents: interactive ? "auto" : "none",
      }}
    >
      {children}
    </motion.div>
  );
}
