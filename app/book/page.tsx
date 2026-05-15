"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Mail, Phone, MapPin, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function BookPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<{
    name: string;
    email: string;
    company: string;
    services: string[];
    message: string;
  }>({
    name: "",
    email: "",
    company: "",
    services: [],
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const serviceParam = params.get("service");
      if (serviceParam) {
        setForm((f) => ({ ...f, services: [serviceParam] }));
      }
    }
  }, []);

  const update = (field: string, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: "" }));
  };

  const toggleService = (value: string) => {
    setForm((f) => {
      const isSelected = f.services.includes(value);
      const newServices = isSelected
        ? f.services.filter((s) => s !== value)
        : [...f.services, value];
      return { ...f, services: newServices };
    });
    setErrors((e) => ({ ...e, services: "" }));
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Required";
    if (!form.email.trim()) errs.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Invalid email";
    if (!form.company.trim()) errs.company = "Required";
    if (form.services.length === 0) errs.services = "Please select at least one service";
    if (!form.message.trim()) errs.message = "Required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1600));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      background: "#ffffff",
      fontFamily: "'Inter', sans-serif",
      position: "relative",
      overflow: "hidden",
    }}>

      {/* ── LEFT COLUMN — Pitch Deck Background ── */}
      <div style={{
        position: "relative",
        overflow: "hidden",
        minHeight: "100vh",
      }}>
        {/* Pitch deck image as background */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "url('/pitch-deck-manual-2.png')",
          backgroundSize: "cover",
          backgroundPosition: "center top",
          filter: "brightness(0.35)",
        }} />

        {/* Gradient overlay for readability */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(135deg, rgba(25,118,210,0.4) 0%, rgba(10,25,47,0.7) 60%, rgba(0,0,0,0.6) 100%)",
        }} />

        {/* Content on top of image */}
        <div style={{
          position: "relative", zIndex: 1,
          display: "flex", flexDirection: "column", justifyContent: "space-between",
          padding: "clamp(2.5rem, 5vw, 5rem)",
          height: "100%",
          minHeight: "100vh",
        }}>
          {/* Logo / Back */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" style={{
              display: "inline-flex", alignItems: "center", gap: "0.35rem",
              textDecoration: "none", color: "rgba(255,255,255,0.6)",
              fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.1em",
              textTransform: "uppercase", transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
            >
              ← Back to Zth
            </Link>
          </motion.div>

          {/* Main headline */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", paddingTop: "4rem", paddingBottom: "4rem" }}
          >
            <p style={{
              fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.3em",
              textTransform: "uppercase", color: "#90CAF9", marginBottom: "1.5rem",
            }}>
              / Pitch Deck Services
            </p>
            <h1 style={{
              fontSize: "clamp(2.4rem, 4.5vw, 4rem)",
              fontWeight: 900, lineHeight: 1.0,
              letterSpacing: "-0.04em",
              color: "#ffffff",
              marginBottom: "2rem",
            }}>
              Let&apos;s build<br />
              your{" "}
              <span style={{ color: "#90CAF9" }}>perfect</span><br />
              pitch together.
            </h1>
            <p style={{
              fontSize: "clamp(0.9rem, 1.4vw, 1rem)",
              color: "rgba(255,255,255,0.6)", lineHeight: 1.75,
              maxWidth: "400px",
            }}>
              We craft investor-ready pitch decks that combine compelling narrative, clean design, and strategic financial storytelling — built to raise real capital.
            </p>

            {/* Trust badges */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginTop: "2.5rem" }}>
              {[
                "✓  500+ pitch decks delivered globally",
                "✓  94% investor meeting conversion rate",
                "✓  72 hr average first-draft turnaround",
              ].map((item) => (
                <div key={item} style={{
                  fontSize: "0.82rem", color: "rgba(255,255,255,0.55)",
                  fontWeight: 500, letterSpacing: "0.01em",
                }}>
                  {item}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
          >
            <div style={{ width: "100%", height: "1px", background: "rgba(255,255,255,0.12)", marginBottom: "1.5rem" }} />
            {[
              { icon: Mail, text: "admin@zth.co.in" },
              { icon: Phone, text: "+91 721 942 2299" },
              { icon: MapPin, text: "Mumbai, India" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <Icon size={14} color="rgba(255,255,255,0.4)" />
                <span style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.5)", letterSpacing: "0.01em" }}>
                  {text}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── RIGHT COLUMN — Light Form ── */}
      <div style={{
        background: "#ffffff",
        display: "flex", flexDirection: "column", justifyContent: "center",
        padding: "clamp(2.5rem, 5vw, 5rem)",
        overflowY: "auto",
        borderLeft: "1px solid #f0f0f0",
      }}>
        <AnimatePresence mode="wait">
          {submitted ? (
            /* ── SUCCESS STATE ── */
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
            >
              <motion.div
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              >
                <CheckCircle size={52} color="#1976D2" />
              </motion.div>
              <p style={{
                fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.3em",
                textTransform: "uppercase", color: "#1976D2",
              }}>
                / Inquiry Received
              </p>
              <h2 style={{
                fontSize: "clamp(2rem, 3.5vw, 3rem)",
                fontWeight: 900, lineHeight: 1.05, letterSpacing: "-0.04em",
                color: "#1A1A1A",
              }}>
                <span style={{ color: "#1976D2" }}>Thank you</span> for<br />contacting us!
              </h2>
              <p style={{ fontSize: "1rem", color: "#666666", lineHeight: 1.7, maxWidth: "380px" }}>
                We have received your message and will contact you shortly to follow up. If you would like to speak to someone immediately, feel free to call.
              </p>
              <div style={{ marginTop: "0.5rem" }}>
                <Link href="/" style={{
                  display: "inline-flex", alignItems: "center", gap: "0.5rem",
                  padding: "0.85rem 2rem",
                  border: "1.5px solid #1A1A1A",
                  borderRadius: "100px", textDecoration: "none",
                  color: "#1A1A1A", fontSize: "0.85rem", fontWeight: 700,
                  transition: "all 0.2s ease", letterSpacing: "0.02em",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#1976D2"; e.currentTarget.style.color = "#1976D2"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#1A1A1A"; e.currentTarget.style.color = "#1A1A1A"; }}
                >
                  Back to home
                </Link>
              </div>
            </motion.div>
          ) : (
            /* ── FORM STATE ── */
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <p style={{
                fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.3em",
                textTransform: "uppercase", color: "#1976D2", marginBottom: "0.75rem",
              }}>
                / Send Inquiry
              </p>
              <p style={{
                fontSize: "clamp(0.88rem, 1.4vw, 1rem)",
                color: "#888888", lineHeight: 1.7,
                marginBottom: "2.75rem", maxWidth: "400px",
              }}>
                We&apos;re here to bring your concept to life, craft your investor story, or build your pitch deck from the ground up.
              </p>

              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>

                <UnderlineInput label="Name*" type="text" value={form.name} onChange={(v) => update("name", v)} error={errors.name} />
                <UnderlineInput label="Email*" type="email" value={form.email} onChange={(v) => update("email", v)} error={errors.email} />
                <UnderlineInput label="Company / Startup Name*" type="text" value={form.company} onChange={(v) => update("company", v)} error={errors.company} />

                {/* Service Selector */}
                <div style={{ position: "relative", marginBottom: "2.75rem" }}>
                  <label style={{
                    display: "block", fontSize: "0.78rem", fontWeight: 600,
                    letterSpacing: "0.05em", color: "#888888", marginBottom: "1rem",
                    textTransform: "uppercase",
                  }}>
                    I&apos;m looking for*
                  </label>
                  <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                    {[
                      { value: "pre-fundraising", label: "Pre-Fundraising", sub: "Pitch decks, models & strategy" },
                      { value: "capital-network", label: "Capital Network", sub: "Investor prep & ecosystem" },
                      { value: "post-fundraise", label: "Post-Fundraise", sub: "Growth, hiring & execution" },
                    ].map((opt) => {
                      const isSelected = form.services.includes(opt.value);
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => toggleService(opt.value)}
                          style={{
                            flex: "1 1 30%", padding: "1rem 1.25rem", minWidth: "140px",
                            background: isSelected ? "rgba(25,118,210,0.06)" : "#F8FAFC",
                            border: isSelected ? "1.5px solid #1976D2" : "1.5px solid #e5e7eb",
                            borderRadius: "0.75rem", cursor: "pointer",
                            textAlign: "left", transition: "all 0.2s ease",
                          }}
                        >
                          <div style={{
                            fontSize: "0.88rem", fontWeight: 700,
                            color: isSelected ? "#1976D2" : "#333333",
                            marginBottom: "0.25rem", fontFamily: "'Inter', sans-serif",
                          }}>
                            {opt.label}
                          </div>
                          <div style={{
                            fontSize: "0.72rem",
                            color: isSelected ? "#1976D2" : "#999999",
                            fontFamily: "'Inter', sans-serif",
                          }}>
                            {opt.sub}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  {errors.services && <span style={{ color: "#ef4444", fontSize: "0.72rem", display: "block", marginTop: "0.5rem" }}>{errors.services}</span>}
                </div>

                {/* Message */}
                <div style={{ position: "relative", marginBottom: "3rem" }}>
                  <label style={{
                    display: "block", fontSize: "0.78rem", fontWeight: 600,
                    letterSpacing: "0.05em", textTransform: "uppercase",
                    color: "#888888", marginBottom: "0.75rem",
                  }}>
                    Project Information*
                  </label>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    placeholder="Tell us about your startup, fundraising stage, and what you need..."
                    style={{
                      width: "100%", background: "transparent", border: "none",
                      borderBottom: errors.message ? "1px solid #ef4444" : "1px solid #d1d5db",
                      color: "#1A1A1A", outline: "none",
                      fontFamily: "'Inter', sans-serif", fontSize: "0.95rem",
                      resize: "none", padding: "0 0 0.75rem 0", lineHeight: 1.6,
                      transition: "border-color 0.2s ease",
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderBottomColor = "#1976D2")}
                    onBlur={(e) => (e.currentTarget.style.borderBottomColor = errors.message ? "#ef4444" : "#d1d5db")}
                  />
                  {errors.message && <span style={{ color: "#ef4444", fontSize: "0.72rem", position: "absolute", bottom: "-1.2rem" }}>{errors.message}</span>}
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.03, boxShadow: "0 12px 30px rgba(25,118,210,0.2)" }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "0.6rem",
                    padding: "0.9rem 2.5rem",
                    background: loading ? "#aaa" : "#1A1A1A",
                    border: "none", borderRadius: "100px",
                    color: "#ffffff", fontSize: "0.9rem", fontWeight: 700,
                    cursor: loading ? "not-allowed" : "pointer",
                    alignSelf: "flex-start",
                    letterSpacing: "0.02em",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
                    transition: "background 0.2s ease",
                  }}
                >
                  {loading ? (
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                      <span style={{ animation: "spin 1s linear infinite", display: "inline-block" }}>⟳</span>
                      Sending...
                    </span>
                  ) : (
                    <>Send Inquiry <ArrowUpRight size={16} /></>
                  )}
                </motion.button>

              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style jsx>{`
        * { box-sizing: border-box; }
        input::placeholder, textarea::placeholder { color: #c0c0c0; }
        input:-webkit-autofill {
          -webkit-box-shadow: 0 0 0 1000px #ffffff inset !important;
          -webkit-text-fill-color: #1A1A1A !important;
        }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @media (max-width: 768px) {
          div[style*="gridTemplateColumns"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

function UnderlineInput({
  label, type, value, onChange, error,
}: {
  label: string; type: string; value: string; onChange: (v: string) => void; error?: string;
}) {
  return (
    <div style={{ position: "relative", marginBottom: "2.75rem" }}>
      <label style={{
        display: "block", fontSize: "0.78rem", fontWeight: 600,
        letterSpacing: "0.05em", textTransform: "uppercase",
        color: "#888888", marginBottom: "0.75rem",
      }}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: "100%", background: "transparent", border: "none",
          borderBottom: error ? "1px solid #ef4444" : "1px solid #d1d5db",
          color: "#1A1A1A", outline: "none", padding: "0 0 0.75rem 0",
          fontFamily: "'Inter', sans-serif", fontSize: "1rem",
          transition: "border-color 0.2s ease",
        }}
        onFocus={(e) => (e.currentTarget.style.borderBottomColor = "#1976D2")}
        onBlur={(e) => (e.currentTarget.style.borderBottomColor = error ? "#ef4444" : "#d1d5db")}
      />
      {error && <span style={{ color: "#ef4444", fontSize: "0.72rem", position: "absolute", bottom: "-1.2rem", left: 0 }}>{error}</span>}
    </div>
  );
}
