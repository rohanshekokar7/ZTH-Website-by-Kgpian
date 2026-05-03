"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, CheckCircle, Loader2, Sparkles, Shield, Clock, Users } from "lucide-react";
import Link from "next/link";

const trustItems = [
  { icon: Clock, text: "30-Min Free Discovery" },
  { icon: Shield, text: "No Long-Term Contract" },
  { icon: Users, text: "500+ Founders Helped" },
];

export default function BookPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const update = (field: string, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: "" }));
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.firstName.trim()) errs.firstName = "First name is required";
    if (!form.lastName.trim()) errs.lastName = "Last name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Enter a valid email";
    if (!form.company.trim()) errs.company = "Company name is required";
    if (!form.message.trim()) errs.message = "Please tell us how we can help";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1800));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#ffffff", position: "relative", overflow: "hidden" }}>
      {/* Decorative background elements */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
        background: "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(0,119,194,0.06) 0%, transparent 60%), radial-gradient(ellipse 50% 50% at 100% 50%, rgba(0,119,194,0.04) 0%, transparent 50%), radial-gradient(ellipse 50% 50% at 0% 80%, rgba(0,119,194,0.03) 0%, transparent 50%)",
        pointerEvents: "none",
      }} />

      {/* Floating orbs */}
      <div className="animate-float" style={{
        position: "absolute", top: "10%", right: "5%", width: 300, height: 300, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(0,119,194,0.06) 0%, transparent 65%)", filter: "blur(40px)", pointerEvents: "none",
      }} />
      <div className="animate-float" style={{
        position: "absolute", bottom: "15%", left: "3%", width: 250, height: 250, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(0,119,194,0.04) 0%, transparent 65%)", filter: "blur(40px)", pointerEvents: "none", animationDelay: "2s",
      }} />

      {/* Grid pattern */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "linear-gradient(rgba(0,119,194,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,119,194,0.03) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
        maskImage: "radial-gradient(ellipse 70% 70% at 50% 30%, black 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 800, margin: "0 auto", padding: "clamp(2rem, 5vw, 4rem) clamp(1.5rem, 5vw, 4rem)" }}>
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: "2rem" }}
        >
          <Link href="/" style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            textDecoration: "none", color: "#6b7280", fontFamily: "'Inter', sans-serif",
            fontSize: "0.9rem", fontWeight: 500, transition: "color 0.2s",
          }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#0077c2")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#6b7280")}
          >
            <ArrowLeft size={16} /> Back to Home
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: "center", marginBottom: "3rem" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              padding: "0.5rem 1.25rem", background: "rgba(0,119,194,0.08)",
              border: "1px solid rgba(0,119,194,0.15)", borderRadius: "100px", marginBottom: "1.5rem",
            }}
          >
            <Sparkles size={14} color="#0077c2" />
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "#0077c2" }}>
              Free Consultation
            </span>
          </motion.div>

          <h1 style={{
            fontFamily: "'Inter', sans-serif", fontSize: "clamp(2rem, 5vw, 3rem)",
            fontWeight: 800, color: "#111827", lineHeight: 1.15, letterSpacing: "-0.03em", marginBottom: "1rem",
          }}>
            Book Your{" "}
            <span style={{
              background: "linear-gradient(135deg, #0077c2 0%, #44a8ee 50%, #0077c2 100%)",
              WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent",
            }}>
              Discovery Call
            </span>
          </h1>
          <p style={{
            fontFamily: "'Inter', sans-serif", fontSize: "1.05rem", color: "#6b7280",
            lineHeight: 1.6, maxWidth: 550, margin: "0 auto",
          }}>
            Tell us about your startup and we&apos;ll craft a tailored fundraising strategy — no commitment, maximum clarity.
          </p>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ display: "flex", justifyContent: "center", gap: "2rem", flexWrap: "wrap", marginBottom: "3rem" }}
        >
          {trustItems.map((item) => (
            <div key={item.text} style={{
              display: "flex", alignItems: "center", gap: "0.5rem",
              fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", color: "#6b7280",
            }}>
              <div style={{
                width: 32, height: 32, borderRadius: "0.5rem", background: "rgba(0,119,194,0.08)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <item.icon size={15} color="#0077c2" />
              </div>
              {item.text}
            </div>
          ))}
        </motion.div>

        {/* Form Card */}
        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            style={{
              background: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "1.5rem",
              padding: "clamp(2rem, 5vw, 4rem)", textAlign: "center",
              boxShadow: "0 20px 60px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)",
            }}
          >
            <motion.div
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
            >
              <CheckCircle size={64} color="#0077c2" style={{ margin: "0 auto 1.5rem" }} />
            </motion.div>
            <h2 style={{
              fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: "1.75rem",
              color: "#111827", marginBottom: "0.75rem",
            }}>
              You&apos;re In! 🎉
            </h2>
            <p style={{
              fontFamily: "'Inter', sans-serif", fontSize: "1rem", color: "#6b7280",
              lineHeight: 1.6, maxWidth: 400, margin: "0 auto 2rem",
            }}>
              A member of our team will reach out to <strong style={{ color: "#111827" }}>{form.email}</strong> within 24 hours.
            </p>
            <Link href="/" style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              padding: "0.875rem 2rem", background: "#0077c2", color: "#fff",
              borderRadius: "100px", textDecoration: "none",
              fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "0.9rem",
              transition: "all 0.3s ease",
            }}>
              <ArrowLeft size={16} /> Back to Home
            </Link>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{
              background: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "1.5rem",
              padding: "clamp(2rem, 5vw, 3rem)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)",
            }}
          >
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
              {/* Name Fields */}
              <div>
                <div style={{ marginBottom: "0.75rem" }}>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", fontWeight: 600, color: "#374151" }}>Name</span>
                </div>
                <div className="book-form-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.8rem", color: "#9ca3af", marginBottom: "0.4rem", fontFamily: "'Inter'" }}>First Name *</label>
                    <input
                      type="text" value={form.firstName} onChange={(e) => update("firstName", e.target.value)}
                      style={{
                        width: "100%", padding: "0.875rem 1rem", borderRadius: "0.75rem",
                        border: errors.firstName ? "1.5px solid #ef4444" : "1px solid #e5e7eb",
                        background: "#f9fafb", color: "#111827", outline: "none",
                        fontFamily: "'Inter', sans-serif", fontSize: "0.95rem",
                        transition: "border 0.2s ease, box-shadow 0.2s ease",
                      }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = "#0077c2"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(0,119,194,0.1)"; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = errors.firstName ? "#ef4444" : "#e5e7eb"; e.currentTarget.style.boxShadow = "none"; }}
                    />
                    {errors.firstName && <span style={{ color: "#ef4444", fontSize: "0.75rem", marginTop: "0.25rem", fontFamily: "'Inter'" }}>{errors.firstName}</span>}
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.8rem", color: "#9ca3af", marginBottom: "0.4rem", fontFamily: "'Inter'" }}>Last Name *</label>
                    <input
                      type="text" value={form.lastName} onChange={(e) => update("lastName", e.target.value)}
                      style={{
                        width: "100%", padding: "0.875rem 1rem", borderRadius: "0.75rem",
                        border: errors.lastName ? "1.5px solid #ef4444" : "1px solid #e5e7eb",
                        background: "#f9fafb", color: "#111827", outline: "none",
                        fontFamily: "'Inter', sans-serif", fontSize: "0.95rem",
                        transition: "border 0.2s ease, box-shadow 0.2s ease",
                      }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = "#0077c2"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(0,119,194,0.1)"; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = errors.lastName ? "#ef4444" : "#e5e7eb"; e.currentTarget.style.boxShadow = "none"; }}
                    />
                    {errors.lastName && <span style={{ color: "#ef4444", fontSize: "0.75rem", marginTop: "0.25rem", fontFamily: "'Inter'" }}>{errors.lastName}</span>}
                  </div>
                </div>
              </div>

              {/* Contact Details */}
              <div>
                <div style={{ marginBottom: "0.75rem" }}>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", fontWeight: 600, color: "#374151" }}>Contact Details</span>
                </div>
                <div className="book-form-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.8rem", color: "#9ca3af", marginBottom: "0.4rem", fontFamily: "'Inter'" }}>Email Address *</label>
                    <input
                      type="email" value={form.email} onChange={(e) => update("email", e.target.value)}
                      style={{
                        width: "100%", padding: "0.875rem 1rem", borderRadius: "0.75rem",
                        border: errors.email ? "1.5px solid #ef4444" : "1px solid #e5e7eb",
                        background: "#f9fafb", color: "#111827", outline: "none",
                        fontFamily: "'Inter', sans-serif", fontSize: "0.95rem",
                        transition: "border 0.2s ease, box-shadow 0.2s ease",
                      }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = "#0077c2"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(0,119,194,0.1)"; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = errors.email ? "#ef4444" : "#e5e7eb"; e.currentTarget.style.boxShadow = "none"; }}
                    />
                    {errors.email && <span style={{ color: "#ef4444", fontSize: "0.75rem", marginTop: "0.25rem", fontFamily: "'Inter'" }}>{errors.email}</span>}
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.8rem", color: "#9ca3af", marginBottom: "0.4rem", fontFamily: "'Inter'" }}>Phone Number</label>
                    <input
                      type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)}
                      style={{
                        width: "100%", padding: "0.875rem 1rem", borderRadius: "0.75rem",
                        border: "1px solid #e5e7eb", background: "#f9fafb", color: "#111827",
                        outline: "none", fontFamily: "'Inter', sans-serif", fontSize: "0.95rem",
                        transition: "border 0.2s ease, box-shadow 0.2s ease",
                      }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = "#0077c2"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(0,119,194,0.1)"; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = "#e5e7eb"; e.currentTarget.style.boxShadow = "none"; }}
                    />
                  </div>
                </div>
              </div>

              {/* Business Information */}
              <div>
                <div style={{ marginBottom: "0.75rem" }}>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", fontWeight: 600, color: "#374151" }}>Business Information</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.8rem", color: "#9ca3af", marginBottom: "0.4rem", fontFamily: "'Inter'" }}>Startup / Company Name *</label>
                    <input
                      type="text" value={form.company} onChange={(e) => update("company", e.target.value)}
                      style={{
                        width: "100%", padding: "0.875rem 1rem", borderRadius: "0.75rem",
                        border: errors.company ? "1.5px solid #ef4444" : "1px solid #e5e7eb",
                        background: "#f9fafb", color: "#111827", outline: "none",
                        fontFamily: "'Inter', sans-serif", fontSize: "0.95rem",
                        transition: "border 0.2s ease, box-shadow 0.2s ease",
                      }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = "#0077c2"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(0,119,194,0.1)"; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = errors.company ? "#ef4444" : "#e5e7eb"; e.currentTarget.style.boxShadow = "none"; }}
                    />
                    {errors.company && <span style={{ color: "#ef4444", fontSize: "0.75rem", marginTop: "0.25rem", fontFamily: "'Inter'" }}>{errors.company}</span>}
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.8rem", color: "#9ca3af", marginBottom: "0.4rem", fontFamily: "'Inter'" }}>How can we help you? *</label>
                    <textarea
                      rows={4} value={form.message} onChange={(e) => update("message", e.target.value)}
                      style={{
                        width: "100%", padding: "0.875rem 1rem", borderRadius: "0.75rem",
                        border: errors.message ? "1.5px solid #ef4444" : "1px solid #e5e7eb",
                        background: "#f9fafb", color: "#111827", outline: "none",
                        fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", resize: "vertical",
                        transition: "border 0.2s ease, box-shadow 0.2s ease",
                      }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = "#0077c2"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(0,119,194,0.1)"; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = errors.message ? "#ef4444" : "#e5e7eb"; e.currentTarget.style.boxShadow = "none"; }}
                    />
                    {errors.message && <span style={{ color: "#ef4444", fontSize: "0.75rem", marginTop: "0.25rem", fontFamily: "'Inter'" }}>{errors.message}</span>}
                  </div>
                </div>
              </div>

              {/* Submit */}
              <div style={{ textAlign: "center", marginTop: "0.5rem" }}>
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.03, boxShadow: "0 12px 40px rgba(0,119,194,0.25)" }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "0.5rem",
                    padding: "1rem 3rem", background: "linear-gradient(135deg, #0077c2 0%, #44a8ee 50%, #0077c2 100%)",
                    backgroundSize: "200% 200%", color: "#fff", border: "none", borderRadius: "100px",
                    fontFamily: "'Inter', sans-serif", fontSize: "1rem", fontWeight: 700,
                    cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1,
                    transition: "all 0.3s ease", boxShadow: "0 4px 20px rgba(0,119,194,0.2)",
                    animation: "gradient-shift 3s ease infinite",
                  }}
                >
                  {loading ? (
                    <><Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} /> Submitting...</>
                  ) : (
                    <>Submit Inquiry <ArrowRight size={18} /></>
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </div>

      <style jsx>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @media (max-width: 600px) {
          .book-form-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
