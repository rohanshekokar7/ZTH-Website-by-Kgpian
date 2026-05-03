"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let current = 0;
    intervalRef.current = setInterval(() => {
      const increment = current < 70 ? Math.random() * 4 + 1 : Math.random() * 1.5 + 0.5;
      current = Math.min(current + increment, 100);
      setProgress(Math.floor(current));

      if (current >= 100) {
        clearInterval(intervalRef.current!);
        setTimeout(() => {
          setDone(true);
          setTimeout(onComplete, 600);
        }, 400);
      }
    }, 50);

    return () => clearInterval(intervalRef.current!);
  }, [onComplete]);

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
                style={{ width: `${progress}%`, transition: "width 0.05s linear" }}
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
