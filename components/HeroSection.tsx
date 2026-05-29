"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";

interface HeroProps {
  onCTAClick: () => void;
}

import CardSwapBase, { Card as CardBase } from './CardSwap';
import type { ComponentType } from 'react';
const CardSwap = CardSwapBase as ComponentType<any>;
const Card = CardBase as ComponentType<any>;
import CurvedMarquee from './CurvedMarquee';

const CardRow = ({ icon, title, subtitle, badge }: { icon: string; title: string; subtitle: string; badge: string }) => (
  <div style={{ padding: "14px 16px", display: "flex", alignItems: "center", gap: "14px", borderBottom: "1px solid #f1f5f9" }}>
    <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "#f8fafc", border: "1px solid #e2e8f0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", flexShrink: 0 }}>{icon}</div>
    <div style={{ flex: 1 }}>
      <div style={{ fontSize: "13px", fontWeight: 600, color: "#1e293b", marginBottom: "2px" }}>{title}</div>
      <div style={{ fontSize: "11px", color: "#94a3b8" }}>{subtitle}</div>
    </div>
    <span style={{ fontSize: "10px", fontWeight: 600, color: "#64748b", background: "#f1f5f9", padding: "3px 9px", borderRadius: "20px", whiteSpace: "nowrap" }}>{badge}</span>
  </div>
);

const CardFooter = ({ label }: { label: string }) => (
  <div style={{ padding: "18px 22px 22px", background: "linear-gradient(to bottom, #f8fafc 0%, #ffffff 100%)", borderTop: "1px solid #f1f5f9" }}>
    <div style={{ fontSize: "24px", fontWeight: 700, color: "#0f172a", letterSpacing: "-0.03em", marginBottom: "14px", lineHeight: 1.1 }}>{label}</div>
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <span style={{ fontSize: "14px", fontWeight: 600, color: "#3b82f6" }}>Explore</span>
      <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "#eff6ff", border: "1px solid #bfdbfe", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 2v8M2 8l4 4 4-4" stroke="#3b82f6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </div>
    </div>
  </div>
);

const AnimatedHeroCards = () => {
  const barHeights = [38, 55, 48, 72, 62, 85, 70];

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "flex-end", paddingBottom: "60px" }}>
      {/* 3D tilt — viewing the stack from slightly above-left, like the Stripe Enterprise page */}
      <div style={{ transform: "perspective(1600px) rotateX(-10deg) rotateY(14deg)", transformStyle: "preserve-3d" }}>
        <CardSwap
          width={390}
          height={490}
          cardDistance={52}
          verticalDistance={46}
          delay={5000}
          pauseOnHover={false}
          skewAmount={3}
        >
          {/* Card 1: Investor Outreach (front) */}
          <Card style={{
            background: "#ffffff", borderRadius: "20px",
            boxShadow: "0 32px 80px rgba(0,0,0,0.18), 0 4px 24px rgba(0,0,0,0.07)",
            border: "1px solid #e2e8f0", overflow: "hidden",
            display: "flex", flexDirection: "column"
          }}>
            <div style={{ padding: "22px 22px 0", flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
                <span style={{ fontSize: "15px", fontWeight: 600, color: "#1e293b" }}>Investor Outreach</span>
                {/* India flag */}
                <div style={{ width: "26px", height: "17px", borderRadius: "3px", overflow: "hidden", flexShrink: 0 }}>
                  <div style={{ height: "33.3%", background: "#FF9933" }} />
                  <div style={{ height: "33.3%", background: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ width: "5px", height: "5px", borderRadius: "50%", border: "1px solid #000080" }} />
                  </div>
                  <div style={{ height: "33.3%", background: "#138808" }} />
                </div>
              </div>
              <div style={{ borderRadius: "12px", overflow: "hidden", border: "1px solid #e2e8f0" }}>
                <CardRow icon="🎯" title="Angel Investors" subtitle="₹50L – ₹2Cr ticket size" badge="42 matches" />
                <CardRow icon="💼" title="Series A VCs" subtitle="Strategic growth capital" badge="18 active" />
                <CardRow icon="🤝" title="Strategic Partners" subtitle="Corporate & family offices" badge="12 lined up" />
              </div>
            </div>
            <CardFooter label="AI-Powered Fundraising" />
          </Card>

          {/* Card 2: Funding Pipeline */}
          <Card style={{
            background: "#ffffff", borderRadius: "20px",
            boxShadow: "0 32px 80px rgba(0,0,0,0.18), 0 4px 24px rgba(0,0,0,0.07)",
            border: "1px solid #e2e8f0", overflow: "hidden",
            display: "flex", flexDirection: "column"
          }}>
            <div style={{ padding: "22px 22px 0", flex: 1 }}>
              <div style={{ marginBottom: "16px" }}>
                <div style={{ fontSize: "11px", color: "#94a3b8", fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: "4px" }}>Total Raised</div>
                <div style={{ fontSize: "32px", fontWeight: 700, color: "#0f172a", lineHeight: 1, marginBottom: "4px" }}>₹4.2 Cr</div>
                <span style={{ fontSize: "12px", color: "#22c55e", fontWeight: 600 }}>+34% this quarter</span>
              </div>
              <div style={{ borderRadius: "12px", overflow: "hidden", border: "1px solid #e2e8f0" }}>
                {[
                  { amount: "₹85L", label: "Angel Round", color: "#3b82f6" },
                  { amount: "₹1.4 Cr", label: "Pre-Seed VC", color: "#22c55e" },
                  { amount: "₹2.7 Cr", label: "Seed Round", color: "#8b5cf6" },
                ].map((t, i) => (
                  <div key={i} style={{ padding: "13px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: i < 2 ? "1px solid #f1f5f9" : "none", background: "#ffffff" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: t.color, flexShrink: 0 }} />
                      <span style={{ fontSize: "12px", color: "#64748b" }}>{t.label}</span>
                    </div>
                    <span style={{ fontSize: "14px", fontWeight: 700, color: "#0f172a" }}>{t.amount}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: "14px", padding: "10px 14px", background: "#1e40af", borderRadius: "8px", textAlign: "center" }}>
                <span style={{ fontSize: "11px", fontWeight: 700, color: "#ffffff", letterSpacing: "0.06em" }}>VIEW FULL PIPELINE</span>
              </div>
            </div>
            <CardFooter label="Funding Pipeline" />
          </Card>

          {/* Card 3: Pitch Intelligence (back) */}
          <Card style={{
            background: "#ffffff", borderRadius: "20px",
            boxShadow: "0 32px 80px rgba(0,0,0,0.18), 0 4px 24px rgba(0,0,0,0.07)",
            border: "1px solid #e2e8f0", overflow: "hidden",
            display: "flex", flexDirection: "column"
          }}>
            <div style={{ padding: "22px 22px 0", flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                <div>
                  <div style={{ fontSize: "11px", color: "#94a3b8", fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: "4px" }}>Pitch Score</div>
                  <div style={{ fontSize: "32px", fontWeight: 700, color: "#0f172a", lineHeight: 1, marginBottom: "4px" }}>87<span style={{ fontSize: "16px", color: "#94a3b8", fontWeight: 500 }}>/100</span></div>
                  <span style={{ fontSize: "12px", color: "#3b82f6", fontWeight: 600 }}>Investor Ready</span>
                </div>
                <div style={{ background: "#eff6ff", borderRadius: "8px", padding: "6px 10px" }}>
                  <span style={{ fontSize: "11px", color: "#1d4ed8", fontWeight: 600 }}>Data as of today</span>
                </div>
              </div>
              {/* Bar chart */}
              <div style={{ display: "flex", alignItems: "flex-end", gap: "6px", height: "80px", marginBottom: "16px" }}>
                {barHeights.map((h, i) => (
                  <div key={i} style={{ flex: 1, height: "100%", display: "flex", alignItems: "flex-end" }}>
                    <div style={{ width: "100%", height: `${h}%`, background: i === barHeights.length - 1 ? "#3b82f6" : `rgba(59,130,246,${0.2 + i * 0.09})`, borderRadius: "3px 3px 0 0" }} />
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderTop: "1px solid #f1f5f9" }}>
                <div>
                  <div style={{ fontSize: "10px", color: "#94a3b8", marginBottom: "3px" }}>Meetings Set</div>
                  <div style={{ fontSize: "18px", fontWeight: 700, color: "#0f172a" }}>24</div>
                </div>
                <div>
                  <div style={{ fontSize: "10px", color: "#94a3b8", marginBottom: "3px" }}>Close Rate</div>
                  <div style={{ fontSize: "18px", fontWeight: 700, color: "#22c55e" }}>73%</div>
                </div>
                <div>
                  <div style={{ fontSize: "10px", color: "#94a3b8", marginBottom: "3px" }}>New Intros</div>
                  <div style={{ fontSize: "18px", fontWeight: 700, color: "#0f172a" }}>12</div>
                </div>
              </div>
            </div>
            <CardFooter label="Pitch Intelligence" />
          </Card>
        </CardSwap>
      </div>
    </div>
  );
};

export default function HeroSection({ onCTAClick: _onCTAClick }: HeroProps) {
  const { scrollY } = useScroll();
  const textY = useTransform(scrollY, [0, 800], [0, 300]);

  return (
    <section
      style={{
        position: "sticky",
        top: 0,
        zIndex: 0,
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        paddingTop: "6rem",
      }}
    >
      {/* Animated Background Image */}
      <motion.div
        style={{
          position: "absolute",
          width: "120%",
          height: "120%",
          left: "-10%",
          top: "-10%",
          backgroundImage: "url('/background.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 1,
          zIndex: -2,
          willChange: "transform",
        }}
        animate={{
          y: scrollY.get() * 0.5,
        }}
        transition={{ type: "tween", ease: "linear", duration: 0 }}
      />

      {/* Dark overlay for better text readability */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to right, rgba(15, 23, 42, 0.2) 0%, rgba(15, 23, 42, 0.05) 100%)",
          zIndex: -1,
        }}
      />

      {/* Content */}
      <motion.div
        className="container-xl"
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "2rem",
          position: "relative",
          zIndex: 3,
          y: textY,
          marginTop: "-3vh", // Base offset
          width: "100%",
          padding: "0 2rem",
        }}
      >
        {/* LEFT COLUMN: Text */}
        <div style={{ flex: "1 1 50%", textAlign: "left", maxWidth: "550px", marginTop: "-8vh", marginLeft: "12%" }}>
          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            style={{
              marginBottom: "1.5rem",
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
              fontSize: "70px", 
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.04em", 
              color: "#ffffff",
              textShadow: "none",
            }}
          >
            Create.<br />
            Convert.<br />
            <span style={{
              backgroundImage: "linear-gradient(90deg, #93c5fd 0%, #3b82f6 50%, #1e40af 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              color: "transparent",
              display: "inline-block"
            }}>
              Scale.
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            style={{
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
              fontSize: "1.125rem",
              margin: "0 0 2rem", 
              lineHeight: 1.6, 
              fontWeight: 400,
              color: "#ffffff", 
              maxWidth: "480px"
            }}
          >
            End-to-end startup fundraising infrastructure combining AI tools, strategic advisory, and execution support for founders building scalable companies.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          >
            <button
              className="cta-btn"
              onClick={_onCTAClick}
              style={{
                background: "#ffffff", 
                color: "#0f172a",
                padding: "0.5rem 1.25rem", /* Smaller, more elegant padding like Stripe */
                borderRadius: "9999px",
                fontWeight: 600, /* Medium-bold */
                fontSize: "0.95rem",
                border: "none", 
                cursor: "pointer",
                display: "inline-flex", 
                alignItems: "center", 
                gap: "6px",
                transition: "all 0.2s ease",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#f8fafc";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#ffffff";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Book a call 
              <span className="icon-default" style={{ display: "inline-flex", alignItems: "center" }}><ChevronDown size={16} strokeWidth={3} style={{ transform: 'rotate(-90deg)' }} /></span>
              <span className="icon-hover" style={{ display: "none", alignItems: "center" }}><ArrowRight size={16} strokeWidth={3} /></span>
            </button>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: 3D Cards */}
        <div style={{ flex: "1 1 50%", position: "relative", height: "700px", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <AnimatedHeroCards />
        </div>
      </motion.div>

      {/* Curved Marquee layered over the wavy background at the bottom of the Hero Section */}
      <div style={{ position: "absolute", bottom: "-3vh", width: "100%", zIndex: 10 }}>
        <CurvedMarquee />
      </div>



      <style jsx>{`
        .cta-btn .icon-default { display: inline-flex !important; }
        .cta-btn .icon-hover { display: none !important; }
        .cta-btn:hover .icon-default { display: none !important; }
        .cta-btn:hover .icon-hover { display: inline-flex !important; }

        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes wave-pan {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-3%, 2%) scale(1.05); }
          100% { transform: translate(2%, -3%) scale(1); }
        }
      `}</style>
    </section>
  );
}
