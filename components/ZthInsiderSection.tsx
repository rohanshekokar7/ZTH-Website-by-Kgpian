"use client";

import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

const BLUE = "#1976D2";

const ITEMS = [
  {
    title: "The Hook & Problem",
    desc: "Grab investor attention immediately. Clearly define a massive, painful problem that needs solving right now and show why current alternatives fall short. Use compelling data or a highly relatable narrative to make the problem feel urgent and undeniable.",
  },
  {
    title: "The Solution & Value Prop",
    desc: "Introduce your product as the ultimate fix. Highlight your unique value proposition and demonstrate why your approach is better, faster, or cheaper. Break down the core mechanics of how your solution shifts the paradigm and completely eliminates the pain points.",
  },
  {
    title: "The Product & Demo",
    desc: "Bring your solution to life. Showcase your core features, user experience, and architecture to prove that you have a tangible, scalable product. Highlight proprietary technology or unique UX choices that make your product sticky and indispensable to the end-user.",
  },
  {
    title: "Market Opportunity & Timing",
    desc: "Prove the market is big enough to build a venture-scale business. Answer the 'Why Now?' question to show urgency and market readiness. Support your claims with bottom-up TAM/SAM/SOM sizing and explain the macroeconomic tailwinds driving adoption.",
  },
  {
    title: "Business Model & Traction",
    desc: "Show exactly how you make money and prove that people want it. Highlight early adoption, revenue growth, or strong user engagement metrics. Provide concrete evidence of product-market fit through active pilots, MRR growth, or impressive waitlist numbers.",
  },
  {
    title: "Financials & Unit Economics",
    desc: "Detail your revenue projections, customer acquisition cost (CAC), and lifetime value (LTV). Show investors a clear, realistic path to profitability. Illustrate how capital efficiency scales over time and detail your expected burn rate versus projected growth.",
  },
  {
    title: "Competitive Moat",
    desc: "Identify your competitors and explain your unfair advantage. Defend your position and show how you'll build barriers to entry over time. Whether it's network effects, deep tech patents, or exclusive partnerships, clarify why you cannot be easily replicated.",
  },
  {
    title: "The Team & The Ask",
    desc: "Convince them you are the only team that can execute this vision. Clearly state how much capital you are raising and the specific milestones it will unlock. Detail the specific use of funds, the runway this capital provides, and the key hires you plan to make.",
  },
];

export default function ZthInsiderSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section id="zth-insider" style={{
      padding: "clamp(3.5rem, 5vw, 5rem) clamp(1.25rem, 6vw, 3rem)",
      background: "#f8fafc",
      position: "relative",
    }}>
      <style>{`
        .catty-wrapper {
          display: grid;
          width: 100%;
          max-width: 1100px;
          margin: 5rem auto 0;
          grid-template-columns: 1fr 100px 1fr;
          grid-row-gap: 0;
        }

        .catty-process-container {
          display: flex;
          min-height: 30vh;
          gap: 2rem;
          padding-bottom: 4rem;
        }

        .catty-process-line-container {
          position: relative;
          top: -2.5rem;
          display: block;
          width: 100%;
          height: 105%;
        }

        .catty-line-vertical {
          position: absolute;
          left: 0;
          right: 0;
          margin: 0 auto;
          z-index: 0;
          width: 4px;
          height: 100%;
          border-radius: 1rem;
          background-color: rgba(15,23,42,0.08);
        }

        .catty-process-circle {
          position: sticky;
          top: 35vh;
          left: 0;
          right: 0;
          margin: 0 auto;
          z-index: 10;
          width: 2.5rem;
          height: 2.5rem;
          border: 6px solid #f8fafc;
          border-radius: 50%;
          background-color: ${BLUE};
          box-shadow: 0 0 16px 0 rgba(25,118,210,0.4);
          box-sizing: border-box;
        }

        .catty-xomai-large {
          font-family: 'Playfair Display', serif;
          color: ${BLUE};
          font-size: clamp(3.5rem, 6vw, 5.5rem);
          line-height: 0.9;
          font-weight: 900;
          font-style: italic;
          flex-shrink: 0;
          margin: 0;
          letter-spacing: -0.04em;
          user-select: none;
        }

        @media screen and (max-width: 768px) {
          .catty-wrapper {
            grid-template-columns: 60px 1fr;
          }
          .catty-process-container {
            min-height: auto;
            margin-bottom: 3rem;
            gap: 1.25rem;
            padding-bottom: 2rem;
          }
          .catty-process-circle {
            width: 2rem;
            height: 2rem;
            border-width: 4px;
          }
        }
      `}</style>

      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        
        {/* ── Header ── */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              padding: "0.35rem 1rem",
              background: "#E3F0FF", border: "1px solid rgba(25,118,210,0.18)",
              borderRadius: "100px", marginBottom: "1.5rem",
            }}
          >
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: BLUE }} />
            <span style={{
              fontSize: "0.65rem", fontWeight: 800, letterSpacing: "0.2em",
              textTransform: "uppercase", color: BLUE, fontFamily: "'Inter', sans-serif",
            }}>
              ZTH INSIDER
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 700, color: "#0f172a",
              lineHeight: 1.2, letterSpacing: "-0.02em",
              marginBottom: "1rem", textAlign: "center",
            }}
          >
            Inside the <span style={{ color: BLUE }}>Investor Mindset.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(0.95rem, 1.4vw, 1.1rem)",
              color: "#475569", maxWidth: "580px", margin: "0 auto", lineHeight: 1.75,
            }}
          >
            Exclusive fundraising intelligence, winning pitch frameworks, and startup growth insights used by founders raising capital.
          </motion.p>
        </div>

        {/* ── Timeline ── */}
        <div className="catty-wrapper">
          {ITEMS.map((item, i) => {
            const isLeft = i % 2 === 0;
            const contentCol = isMobile ? 2 : (isLeft ? 1 : 3);
            const lineCol = isMobile ? 1 : 2;

            return (
              <React.Fragment key={i}>
                {/* Content */}
                <div 
                  style={{ 
                    gridRow: i + 1, 
                    gridColumn: contentCol,
                    paddingRight: !isMobile && isLeft ? "3rem" : "0",
                    paddingLeft: !isMobile && !isLeft ? "3rem" : "0",
                  }}
                >
                  <motion.div
                    className="catty-process-container"
                    initial={{ opacity: 0, x: isMobile ? 30 : (isLeft ? -50 : 50) }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <h2 className="catty-xomai-large">{i + 1}</h2>
                    <div style={{ display: "flex", flexDirection: "column", paddingTop: "0.5rem" }}>
                      <h3 style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "clamp(1.2rem, 2.2vw, 1.6rem)",
                        fontWeight: 800, color: "#0f172a",
                        marginBottom: "0.85rem", lineHeight: 1.2,
                        letterSpacing: "-0.02em",
                      }}>
                        {item.title}
                      </h3>
                      <p style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "clamp(0.95rem, 1.3vw, 1.05rem)",
                        color: "#475569", lineHeight: 1.75, margin: 0,
                      }}>
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                </div>

                {/* Line and Sticky Circle */}
                <div 
                  className="catty-process-line-container"
                  style={{ 
                    gridRow: i + 1, 
                    gridColumn: lineCol 
                  }}
                >
                  <div className="catty-line-vertical" />
                  <div className="catty-process-circle" />
                </div>
              </React.Fragment>
            );
          })}
        </div>

      </div>
    </section>
  );
}
