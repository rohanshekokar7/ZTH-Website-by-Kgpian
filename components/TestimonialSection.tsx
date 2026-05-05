"use client";

import { motion } from "framer-motion";

const testimonials = [
  { quote: "The advisory services significantly refined our corporate positioning and capital strategy, culminating in multiple institutional offers.", name: "Arjun Mehta", role: "CEO, Flowstack", raised: "Secured $2.1M Seed" },
  { quote: "Their rigorous simulation framework fortified our strategic delivery, ensuring comprehensive preparedness for institutional due diligence.", name: "Sarah Kim", role: "Founder, Verdant AI", raised: "Secured $8.5M Series A" },
  { quote: "Zth distilled complex operational data into an exceptionally compelling narrative, which was highly commended by our strategic partners.", name: "David Osei", role: "Co-Founder, Paymint", raised: "Secured $500K Pre-Seed" },
];

export default function TestimonialSection() {
  return (
    <section id="testimonials" className="section-pad"
      style={{ background: "#F5F7FA", position: "relative", overflow: "hidden" }}
    >
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 1,
        background: "linear-gradient(90deg, transparent, rgba(25,118,210,0.12), transparent)",
      }} />

      <div className="container-xl">
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
                color: "rgba(25,118,210,0.15)", marginBottom: "0.75rem",
              }}>
                &ldquo;
              </div>
              <p style={{
                fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", lineHeight: 1.7,
                color: "#555555", marginBottom: "1.5rem", fontStyle: "italic",
              }}>
                {t.quote}
              </p>
              <div style={{ borderTop: "1px solid #e5e7eb", paddingTop: "1.25rem" }}>
                <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "0.9rem", color: "#1A1A1A" }}>
                  {t.name}
                </div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", color: "#555555" }}>{t.role}</div>
                <div style={{
                  marginTop: "0.5rem", fontSize: "0.75rem", fontWeight: 700,
                  fontFamily: "'Inter', sans-serif", color: "#1976D2",
                }}>
                  {t.raised}
                </div>
              </div>
            </motion.div>
          ))}
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
