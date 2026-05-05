"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ── Smart Loader ────────────────────────────────────────────────────
   Instead of faking progress with a random setInterval, this loader
   ties its progress bar to REAL browser readiness signals:
     • document.readyState → tracks HTML/CSS/sync-script parsing
     • window "load" event → tracks all sub-resources (images, video)
   The visual still feels smooth because we lerp toward the real
   target, but now the loader genuinely waits for the page to be
   ready before dismissing — no more "double load" stutter. ──────── */

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const rafRef = useRef<number>(0);
  const targetRef = useRef(0);
  const currentRef = useRef(0);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const finish = useCallback(() => {
    targetRef.current = 100;
    // Let the lerp animation catch up before dismissing
    setTimeout(() => {
      setDone(true);
      setTimeout(() => onCompleteRef.current(), 300);
    }, 200);
  }, []);

  useEffect(() => {
    // ── Track real browser readiness ──
    if (document.readyState === "complete") {
      targetRef.current = 100;
    } else {
      // interactive = DOM ready (~60%), complete = all sub-resources
      const onInteractive = () => { targetRef.current = Math.max(targetRef.current, 60); };
      const onLoad = () => { targetRef.current = 100; };

      if (document.readyState === "interactive") onInteractive();
      document.addEventListener("readystatechange", () => {
        if (document.readyState === "interactive") onInteractive();
        if (document.readyState === "complete") onLoad();
      });
      window.addEventListener("load", onLoad);

      // Safety net: never hold the loader beyond 5s even if resources stall
      const safetyTimeout = setTimeout(() => {
        targetRef.current = 100;
      }, 2500);

      return () => clearTimeout(safetyTimeout);
    }
  }, []);

  useEffect(() => {
    // ── Smooth lerp loop (runs at 60fps, but only setState when value changes) ──
    let lastRendered = 0;
    const tick = () => {
      // Lerp current toward target — snap when close to avoid asymptote stall
      const diff = targetRef.current - currentRef.current;
      if (diff < 1) {
        currentRef.current = targetRef.current;
      } else {
        currentRef.current += diff * 0.18;
      }

      // Only trigger React re-render when integer value changes
      const floored = Math.min(Math.floor(currentRef.current), 100);
      if (floored !== lastRendered) {
        lastRendered = floored;
        setProgress(floored);

        if (floored >= 100) {
          finish();
          return; // stop the loop
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [finish]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="loader-wrap"
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Corner decorations */}
          <div style={{ position: "absolute", top: "2rem", left: "2rem" }}>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              style={{
                width: 40,
                height: 40,
                borderLeft: "1px solid rgba(0,119,194,0.3)",
                borderTop: "1px solid rgba(0,119,194,0.3)",
              }}
            />
          </div>
          <div style={{ position: "absolute", top: "2rem", right: "2rem" }}>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              style={{
                width: 40,
                height: 40,
                borderRight: "1px solid rgba(0,119,194,0.3)",
                borderTop: "1px solid rgba(0,119,194,0.3)",
              }}
            />
          </div>
          <div style={{ position: "absolute", bottom: "2rem", left: "2rem" }}>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              style={{
                width: 40,
                height: 40,
                borderLeft: "1px solid rgba(0,119,194,0.3)",
                borderBottom: "1px solid rgba(0,119,194,0.3)",
              }}
            />
          </div>
          <div style={{ position: "absolute", bottom: "2rem", right: "2rem" }}>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              style={{
                width: 40,
                height: 40,
                borderRight: "1px solid rgba(0,119,194,0.3)",
                borderBottom: "1px solid rgba(0,119,194,0.3)",
              }}
            />
          </div>

          {/* Main logo */}
          <motion.div
            className="loader-logo"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            style={{ marginBottom: "1rem" }}
          >
            <div style={{
              width: "84px",
              height: "84px",
              borderRadius: "50%",
              backgroundColor: "#0077c2",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontFamily: "'Inter', sans-serif"
            }}>
              <span style={{
                fontSize: "3.2rem",
                fontWeight: 900,
                lineHeight: 1,
                letterSpacing: "-2px",
                position: "relative",
                left: "-6px"
              }}>
                Z
                <span style={{
                  fontSize: "1.4rem",
                  position: "absolute",
                  top: "4px",
                  right: "-24px",
                  fontWeight: 800
                }}>th</span>
              </span>
            </div>
          </motion.div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem", width: "100%" }}>
            {/* Label */}
            <motion.p
              className="loader-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Initializing Platform
            </motion.p>

            {/* Progress bar */}
            <div className="loader-bar">
              <div
                className="loader-bar-fill"
                style={{ width: `${progress}%`, transition: "width 0.15s ease-out" }}
              />
            </div>

            {/* Percent */}
            <motion.span
              className="loader-percent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {progress}%
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
