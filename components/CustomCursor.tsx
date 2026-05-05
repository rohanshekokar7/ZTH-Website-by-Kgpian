"use client";

import { useEffect, useRef } from "react";

/* ── Optimized Custom Cursor ─────────────────────────────────────────
   Changes:
   1. Skips entirely on touch devices (no-op on mobile = no wasted rAF)
   2. Uses will-change: transform on both elements for GPU compositing
   3. Hover listeners cleaned up properly on unmount
   ─────────────────────────────────────────────────────────────────── */

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Skip on touch devices — no cursor needed
    if (typeof window !== "undefined" && "ontouchstart" in window) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let dotX = 0, dotY = 0, ringX = 0, ringY = 0;
    let animId: number;

    const onMove = (e: MouseEvent) => {
      dotX = e.clientX;
      dotY = e.clientY;
    };

    const animate = () => {
      ringX += (dotX - ringX) * 0.12;
      ringY += (dotY - ringY) * 0.12;

      dot.style.transform = `translate3d(${dotX - 4}px, ${dotY - 4}px, 0)`;
      ring.style.transform = `translate3d(${ringX - 18}px, ${ringY - 18}px, 0)`;

      animId = requestAnimationFrame(animate);
    };

    const onEnter = () => {
      dot.style.transform += " scale(2.5)";
      ring.style.width = "60px";
      ring.style.height = "60px";
    };

    const onLeave = () => {
      ring.style.width = "36px";
      ring.style.height = "36px";
    };

    // Use passive listener for mousemove
    window.addEventListener("mousemove", onMove, { passive: true });

    // Store cleanup handles so we can remove on unmount
    const interactiveEls = document.querySelectorAll("a, button");
    interactiveEls.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(animId);
      interactiveEls.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" style={{ willChange: "transform" }} />
      <div ref={ringRef} className="cursor-ring" style={{ willChange: "transform" }} />
    </>
  );
}
