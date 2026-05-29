'use client';

/* ── Main section ─────────────────────────────────────────────── */
export default function CardShowcaseSection() {
  return (
    <section style={{ background: '#ffffff', padding: '4rem 2rem 4rem', position: 'relative', overflow: 'clip' }}>

      {/* Radial glow */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 40% at 50% 0%, rgba(59,130,246,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

      {/* ── Cards landing row ──
          The three cards are NOT rendered here — HeroCardsOverlay drops the hero
          deck and lands it onto this row as you scroll, so those cards become
          this section's content. This element only reserves the layout space and
          acts as the measurement anchor for the overlay.
          NOTE: the height (600) must match CARD_H in HeroCardsOverlay. */}
      <div
        id="hero-cards-row"
        style={{
          maxWidth: '1260px', height: 600, margin: '0 auto',
          position: 'relative', zIndex: 1,
        }}
      />
    </section>
  );
}
