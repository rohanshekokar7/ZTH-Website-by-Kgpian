"use client";

import { useState } from "react";
import { X, CheckCircle, Loader2 } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  source?: string;
}

const stages = [
  { value: "idea", label: "Idea Stage" },
  { value: "pre_seed", label: "Pre-Seed" },
  { value: "seed", label: "Seed" },
  { value: "series_a", label: "Series A" },
  { value: "series_b", label: "Series B+" },
];

const sourcesList = [
  { value: "pitch_deck", label: "Pitch Deck" },
  { value: "ai_waitlist", label: "AI Waitlist" },
  { value: "consultation", label: "Consultation" },
  { value: "funding", label: "Funding" },
  { value: "services", label: "Services" },
];

export default function LeadFormModal({ isOpen, onClose, source = "website" }: Props) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    startup: "",
    stage: "",
    source: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const update = (field: string, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: "" }));
  };

  const validateStep1 = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Enter a valid email";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleStep1 = () => {
    if (validateStep1()) setStep(2);
  };

  const handleSubmit = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1800));
    setLoading(false);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setStep(1);
      setForm({ name: "", email: "", startup: "", stage: "", source: "", message: "" });
      onClose();
    }, 2500);
  };

  if (!isOpen) return null;

  return (
    <div className={`modal-overlay ${isOpen ? "open" : ""}`} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-box">
        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "2rem" }}>
          <div>
            <div style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 800, fontSize: "1.5rem",
              color: "#1976D2",
              marginBottom: "0.25rem",
            }}>
              {success ? "You're in! 🎉" : step === 1 ? "Get Started with Zth" : "Tell Us More"}
            </div>
            {!success && (
              <p className="text-body" style={{ fontSize: "0.85rem" }}>
                {step === 1 ? "Join 500+ founders raising smarter." : "Help us personalise your experience."}
              </p>
            )}
          </div>
          <button onClick={onClose} style={{
            background: "none", border: "none", cursor: "pointer",
            color: "var(--zth-muted)", padding: "0.25rem",
          }}>
            <X size={20} />
          </button>
        </div>

        {/* Progress */}
        {!success && (
          <div style={{ display: "flex", gap: "0.4rem", marginBottom: "2rem" }}>
            {[1, 2].map((s) => (
              <div key={s} style={{
                flex: 1, height: 3, borderRadius: 2,
                background: s <= step ? "var(--gradient-gold)" : "rgba(255,255,255,0.08)",
                transition: "background 0.4s ease",
              }} />
            ))}
          </div>
        )}

        {/* Success state */}
        {success ? (
          <div style={{ textAlign: "center", padding: "1.5rem 0" }}>
            <CheckCircle size={56} color="var(--zth-gold)" style={{ margin: "0 auto 1.25rem" }} />
            <h3 style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700, fontSize: "1.1rem",
              color: "var(--zth-white)", marginBottom: "0.75rem",
            }}>
              We&apos;ll be in touch shortly!
            </h3>
            <p className="text-body" style={{ fontSize: "0.875rem" }}>
              A member of our team will reach out to <strong style={{ color: "var(--zth-white)" }}>{form.email}</strong> within 24 hours.
            </p>
          </div>
        ) : step === 1 ? (
          /* Step 1 */
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div>
              <label className="form-label">Your Name *</label>
              <input
                className="form-input"
                placeholder="Jane Smith"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
              />
              {errors.name && <div style={{ color: "#f87171", fontSize: "0.75rem", marginTop: "0.4rem", fontFamily: "'Inter'" }}>{errors.name}</div>}
            </div>
            <div>
              <label className="form-label">Email Address *</label>
              <input
                type="email"
                className="form-input"
                placeholder="jane@startup.com"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
              />
              {errors.email && <div style={{ color: "#f87171", fontSize: "0.75rem", marginTop: "0.4rem", fontFamily: "'Inter'" }}>{errors.email}</div>}
            </div>
            <div>
              <label className="form-label">Startup Name</label>
              <input
                className="form-input"
                placeholder="Your startup name (optional)"
                value={form.startup}
                onChange={(e) => update("startup", e.target.value)}
              />
            </div>
            <button className="btn-primary" onClick={handleStep1} style={{ width: "100%", justifyContent: "center", marginTop: "0.5rem" }}>
              Continue →
            </button>
          </div>
        ) : (
          /* Step 2 */
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div>
              <label className="form-label">Startup Stage</label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {stages.map((s) => (
                  <button key={s.value} onClick={() => update("stage", s.value)} style={{
                    padding: "0.4rem 0.9rem",
                    borderRadius: "100px",
                    background: form.stage === s.value ? "var(--zth-gold-dim)" : "rgba(255,255,255,0.04)",
                    border: `1px solid ${form.stage === s.value ? "rgba(25,118,210,0.3)" : "var(--zth-border)"}`,
                    color: form.stage === s.value ? "var(--zth-gold)" : "var(--zth-muted)",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.8rem", fontWeight: 600, cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}>
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="form-label">Source</label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {sourcesList.map((s) => (
                  <button key={s.value} onClick={() => update("source", s.value)} style={{
                    padding: "0.4rem 0.9rem",
                    borderRadius: "100px",
                    background: form.source === s.value ? "var(--zth-gold-dim)" : "rgba(255,255,255,0.04)",
                    border: `1px solid ${form.source === s.value ? "rgba(25,118,210,0.3)" : "var(--zth-border)"}`,
                    color: form.source === s.value ? "var(--zth-gold)" : "var(--zth-muted)",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.8rem", fontWeight: 600, cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}>
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="form-label">Anything else? (optional)</label>
              <textarea
                className="form-input"
                placeholder="Tell us about your startup or what you're trying to achieve..."
                rows={3}
                value={form.message}
                onChange={(e) => update("message", e.target.value)}
                style={{ resize: "none" }}
              />
            </div>

            <div style={{ display: "flex", gap: "0.75rem" }}>
              <button className="btn-secondary" onClick={() => setStep(1)} style={{ flex: 1, justifyContent: "center" }}>
                ← Back
              </button>
              <button className="btn-primary" onClick={handleSubmit} disabled={loading} style={{ flex: 2, justifyContent: "center" }}>
                {loading ? (
                  <><Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} /> Submitting...</>
                ) : (
                  "Book My Discovery Call 🚀"
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
