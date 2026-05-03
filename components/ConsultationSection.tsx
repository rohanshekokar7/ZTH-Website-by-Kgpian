"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Calendar, Clock, MessageCircle, ArrowRight } from "lucide-react";

const formats = [
  {
    icon: Clock, title: "Initial Strategic Consultation",
    desc: "A preliminary consultation to assess your current strategic positioning and our prospective operational alignment.",
    badge: "Complimentary", badgeColor: "rgba(34,197,94,0.08)", badgeBorder: "rgba(34,197,94,0.15)", badgeText: "#16a34a",
  },
  {
    icon: MessageCircle, title: "Comprehensive Strategy Session",
    desc: "An intensive analytical review of your documentation, funding methodology, and strategic deployment roadmap.",
    badge: "Featured", badgeColor: "rgba(0,119,194,0.08)", badgeBorder: "rgba(0,119,194,0.15)", badgeText: "#0077c2",
  },
  {
    icon: Calendar, title: "Continuous Advisory Service",
    desc: "Retained advisory services for executives seeking dedicated strategic oversight throughout the acquisition cycle.",
    badge: null, badgeColor: "", badgeBorder: "", badgeText: "",
  },
];

const testimonials = [
  { quote: "The advisory services significantly refined our corporate positioning and capital strategy, culminating in multiple institutional offers.", name: "Arjun Mehta", role: "CEO, Flowstack", raised: "Secured $2.1M Seed" },
  { quote: "Their rigorous simulation framework fortified our strategic delivery, ensuring comprehensive preparedness for institutional due diligence.", name: "Sarah Kim", role: "Founder, Verdant AI", raised: "Secured $8.5M Series A" },
  { quote: "Zth distilled complex operational data into an exceptionally compelling narrative, which was highly commended by our strategic partners.", name: "David Osei", role: "Co-Founder, Paymint", raised: "Secured $500K Pre-Seed" },
];

export default function ConsultationSection({ onCTAClick }: { onCTAClick: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="consultation" ref={containerRef} className="section-pad"
      style={{ background: "#f8fafc", position: "relative", overflow: "hidden" }}
    >
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 1,
        background: "linear-gradient(90deg, transparent, rgba(0,119,194,0.12), transparent)",
      }} />

      <div className="container-xl">
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <motion.p className="label-small"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            style={{ marginBottom: "1rem" }}
          >
            Consultation
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'Inter', sans-serif", fontWeight: 800,
              fontSize: "clamp(1.75rem, 3.5vw, 2.8rem)", color: "#111827",
              lineHeight: 1.15, letterSpacing: "-0.03em",
            }}
          >
            Expert Guidance,{" "}
            <span style={{
              background: "linear-gradient(135deg, #0077c2, #44a8ee)",
              WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent",
            }}>On Your Schedule</span>
          </motion.h2>
        </div>

        {/* Session formats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem", marginBottom: "5rem" }}>
          {formats.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              whileHover={{ y: -6, boxShadow: "0 20px 50px rgba(0,0,0,0.08)" }}
              style={{
                padding: "2rem", cursor: "pointer", position: "relative",
                borderRadius: "1.25rem", background: "#ffffff",
                border: "1px solid #e5e7eb", boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
              onClick={onCTAClick}
            >
              {f.badge && (
                <span style={{
                  position: "absolute", top: "1.25rem", right: "1.25rem",
                  padding: "0.2rem 0.6rem", background: f.badgeColor,
                  border: `1px solid ${f.badgeBorder}`, borderRadius: "100px",
                  fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", fontWeight: 700,
                  letterSpacing: "0.1em", color: f.badgeText,
                }}>
                  {f.badge}
                </span>
              )}

              <div style={{
                width: 48, height: 48, borderRadius: "0.75rem",
                background: "rgba(0,119,194,0.08)", border: "1px solid rgba(0,119,194,0.1)",
                display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem",
              }}>
                <f.icon size={22} color="#0077c2" />
              </div>

              <h3 style={{
                fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "1.05rem",
                color: "#111827", marginBottom: "0.75rem",
              }}>
                {f.title}
              </h3>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#6b7280", lineHeight: 1.65 }}>
                {f.desc}
              </p>

              <div style={{
                marginTop: "1.5rem", display: "flex", alignItems: "center", gap: "0.4rem",
                fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", fontWeight: 600, color: "#0077c2",
              }}>
                Book now <ArrowRight size={13} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <div>
          <motion.p style={{ textAlign: "center", marginBottom: "2.5rem" }}
            className="label-small"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          >
            What Founders Say
          </motion.p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem" }}>
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                whileHover={{ y: -4, boxShadow: "0 16px 40px rgba(0,0,0,0.06)" }}
                style={{
                  padding: "2rem", borderRadius: "1.25rem",
                  background: "#ffffff", border: "1px solid #e5e7eb",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                <div style={{
                  fontFamily: "'Inter', sans-serif", fontSize: "2.5rem", lineHeight: 1,
                  color: "rgba(0,119,194,0.15)", marginBottom: "0.75rem",
                }}>
                  &ldquo;
                </div>
                <p style={{
                  fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", lineHeight: 1.7,
                  color: "#6b7280", marginBottom: "1.5rem", fontStyle: "italic",
                }}>
                  {t.quote}
                </p>
                <div style={{ borderTop: "1px solid #e5e7eb", paddingTop: "1.25rem" }}>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "0.9rem", color: "#111827" }}>
                    {t.name}
                  </div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", color: "#6b7280" }}>{t.role}</div>
                  <div style={{
                    marginTop: "0.5rem", fontSize: "0.75rem", fontWeight: 700,
                    fontFamily: "'Inter', sans-serif", color: "#0077c2",
                  }}>
                    {t.raised}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          div[style*="repeat(3, 1fr)"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
