"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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

      dot.style.transform = `translate(${dotX - 4}px, ${dotY - 4}px)`;
      ring.style.transform = `translate(${ringX - 18}px, ${ringY - 18}px)`;

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

    window.addEventListener("mousemove", onMove);
    document.querySelectorAll("a, button").forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
