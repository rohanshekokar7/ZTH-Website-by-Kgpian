"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

function AnimatedCounter({ value, suffix, delay }: { value: number; suffix: string; delay: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (inView) {
      let startTimestamp: number;
      const duration = 2000; // 2 seconds

      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        
        // easeOutExpo
        const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        
        setCount(Math.floor(easeProgress * value));

        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };

      // Add delay before starting animation
      const timeoutId = setTimeout(() => {
        window.requestAnimationFrame(step);
      }, delay * 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [inView, value, delay]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function TractionSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [60, 0, 0, -40]);

  return (
    <section
      ref={containerRef}
      style={{
        position: "relative",
        padding: "clamp(5rem, 10vw, 10rem) 0",
        overflow: "hidden",
        background: "#ffffff",
      }}
    >
      {/* Top decoration */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 1,
        background: "linear-gradient(90deg, transparent, rgba(25,118,210,0.12), transparent)",
      }} />

      <motion.div className="container-xl" style={{ opacity, y }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <motion.p
            className="label-small"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            style={{ marginBottom: "1rem" }}
          >
            Our Traction
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'Inter', sans-serif", fontWeight: 800,
              fontSize: "clamp(1.75rem, 3.5vw, 2.8rem)",
              color: "#1A1A1A", lineHeight: 1.15, letterSpacing: "-0.03em",
            }}
          >
            Numbers That{" "}
            <span style={{
              color: "#1976D2",
            }}>
              Speak For Us
            </span>
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "clamp(1.5rem, 3vw, 2rem)",
            width: "100%", maxWidth: "900px", margin: "0 auto",
          }}
        >
          {[
            { num: 73, suffix: "%", label: "Initial rejection rate in standard presentations; mitigated via our narrative strategies.", delay: 0.3 },
            { num: 5, suffix: "×", label: "Exponential Increase in Investor Responses", delay: 0.4 },
            { num: 80, suffix: "%", label: "Enhanced Probability of Successful Conversion", delay: 0.5 },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.3, delay: stat.delay * 0.5, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, boxShadow: "0 20px 50px rgba(0,0,0,0.08)" }}
              style={{
                padding: "2rem", display: "flex", flexDirection: "column",
                textAlign: "left", background: "#F5F7FA", borderRadius: "1.25rem",
                border: "1px solid #e5e7eb", cursor: "pointer",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
              }}
            >
              <div style={{
                fontSize: "clamp(2.5rem, 5vw, 3.5rem)", fontWeight: 800,
                fontFamily: "'Inter', sans-serif", marginBottom: "1rem", lineHeight: 1,
                color: "#1976D2",
              }}>
                <AnimatedCounter value={stat.num} suffix={stat.suffix} delay={stat.delay} />
              </div>
              <div style={{
                fontSize: "0.9rem", color: "#555555", lineHeight: 1.65,
                fontWeight: 400, fontFamily: "'Inter', sans-serif",
              }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
