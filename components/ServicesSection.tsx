"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Layers, Shield, TrendingUp, Users, Zap, Globe, ArrowRight } from "lucide-react";

const services = [
  { icon: Layers, title: "Pitch Deck Development", desc: "Bespoke, institutional-grade presentation materials incorporating rigorous strategic narrative and financial modeling.", tag: "Popular" },
  { icon: Users, title: "Investor Simulation Sessions", desc: "Participate in structured, interactive simulations with veteran investors to refine delivery and optimize investor relations.", tag: null },
  { icon: TrendingUp, title: "Capital Strategy Optimization", desc: "Strategic identification of target investor profiles, accompanied by systematic outreach sequencing to maximize engagement.", tag: null },
  { icon: Shield, title: "Due Diligence Preparation", desc: "Comprehensive assembly of data rooms, financial models, capitalization tables, and legal documentation proactively.", tag: "Essential" },
  { icon: Zap, title: "Algorithmic Analysis", desc: "AI-driven evaluation of your presentation against an extensive database of successful pitches, providing actionable analytics.", tag: "New" },
  { icon: Globe, title: "Institutional Network Access", desc: "Facilitated introductions to our exclusive network of over 200 accredited angel investors and venture capital funds globally.", tag: null },
];

export default function ServicesSection({ onCTAClick }: { onCTAClick: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="services" ref={containerRef} className="section-pad"
      style={{ background: "#ffffff", position: "relative", overflow: "hidden" }}
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
            Our Services
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
            Everything You Need{" "}
            <span style={{
              background: "linear-gradient(135deg, #0077c2, #44a8ee)",
              WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent",
            }}>To Get Funded</span>
          </motion.h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem", marginBottom: "3rem" }}>
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
              whileHover={{ y: -6, boxShadow: "0 20px 50px rgba(0,0,0,0.08)", borderColor: "rgba(0,119,194,0.2)" }}
              style={{
                padding: "2rem", position: "relative", cursor: "pointer",
                borderRadius: "1.25rem", background: "#ffffff",
                border: "1px solid #e5e7eb", boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
              onClick={onCTAClick}
            >
              {service.tag && (
                <span style={{
                  position: "absolute", top: "1.25rem", right: "1.25rem",
                  padding: "0.2rem 0.65rem",
                  background: service.tag === "New" ? "rgba(59,130,246,0.08)" : "rgba(0,119,194,0.08)",
                  border: `1px solid ${service.tag === "New" ? "rgba(59,130,246,0.15)" : "rgba(0,119,194,0.12)"}`,
                  borderRadius: "100px", fontFamily: "'Inter', sans-serif",
                  fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em",
                  color: service.tag === "New" ? "#3b82f6" : "#0077c2",
                }}>
                  {service.tag}
                </span>
              )}

              <div style={{
                width: 48, height: 48, borderRadius: "0.75rem",
                background: "rgba(0,119,194,0.08)", border: "1px solid rgba(0,119,194,0.1)",
                display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem",
              }}>
                <service.icon size={22} color="#0077c2" />
              </div>

              <h3 style={{
                fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "1.05rem",
                color: "#111827", marginBottom: "0.75rem",
              }}>
                {service.title}
              </h3>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#6b7280", lineHeight: 1.65 }}>
                {service.desc}
              </p>

              <div style={{
                marginTop: "1.5rem", display: "flex", alignItems: "center", gap: "0.4rem",
                fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", fontWeight: 600, color: "#0077c2",
              }}>
                Learn more <ArrowRight size={13} />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          style={{ textAlign: "center" }}
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <motion.button
            onClick={onCTAClick}
            whileHover={{ scale: 1.05, boxShadow: "0 12px 40px rgba(0,119,194,0.25)" }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: "#0077c2", color: "#fff", border: "none", borderRadius: "100px",
              padding: "0.875rem 2rem", fontFamily: "'Inter', sans-serif", fontWeight: 600,
              fontSize: "0.95rem", cursor: "pointer", display: "inline-flex",
              alignItems: "center", gap: "0.5rem", boxShadow: "0 4px 20px rgba(0,119,194,0.2)",
            }}
          >
            Review All Offerings <ArrowRight size={16} />
          </motion.button>
        </motion.div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          div[style*="repeat(3, 1fr)"] { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          div[style*="repeat(3, 1fr)"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
