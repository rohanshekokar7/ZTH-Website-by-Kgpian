"use client";

import React, { useEffect, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setLenis } from "@/lib/lenisStore";

gsap.registerPlugin(ScrollTrigger);

/* ── Deferred Smooth Scroll ─────────────────────────────────────────
   Lenis + GSAP ticker initialization is deferred by 100ms after mount.
   This prevents the smooth-scroll engine from competing with the
   Loader and Hero animations for main-thread time during the critical
   first paint. ──────────────────────────────────────────────────── */

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Small delay so the loader/hero paint first without contention
    const timer = setTimeout(() => setReady(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!ready) return;

    const lenis = new Lenis({
      duration: 1.2,                    // Snappier than 1.5 — less perceived lag
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    setLenis(lenis);

    lenis.on("scroll", ScrollTrigger.update);

    const tickerFn = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tickerFn);
    gsap.ticker.lagSmoothing(0);

    return () => {
      setLenis(null);
      lenis.destroy();
      gsap.ticker.remove(tickerFn);
    };
  }, [ready]);

  return <>{children}</>;
}
