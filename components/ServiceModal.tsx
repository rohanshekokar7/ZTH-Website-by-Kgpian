"use client";

import { useState, useEffect } from "react";
import { X, Check, ArrowRight } from "lucide-react";

export const serviceGroups = [
  {
    section: "Pre-Fundraising",
    color: "#1976D2",
    categories: [
      {
        title: "Fundraising Support Services",
        items: [
          "Pitch Deck Advisory",
          "Valuation Support",
          "Financial Modeling",
          "Fundraising Readiness",
          "Investor Narrative Structuring",
          "Market Research & Positioning",
          "Business Plan / GTM Structuring",
          "Pitch Simulation Prep",
          "Due Diligence Preparation",
          "Data Room Preparation",
          "Startup Strategy Advisory",
          "Company Profile",
        ],
      },
      {
        title: "Compliance and More",
        items: [
          "Company Incorporation",
          "GST Registration & Filing",
          "Startup India / DPIIT Registration",
          "ROC Compliance",
          "Legal Documentation",
          "Accounting & CA Support",
          "ESOP Structuring",
          "Founder Agreements",
          "Investment Documentation Support",
          "Financial Documentation",
        ],
      },
    ],
  },
  {
    section: "Strategic Partnership",
    color: "#0D47A1",
    categories: [
      {
        title: "Active Fundraising Assistance",
        items: [
          "Investor Meeting Preparation",
          "Pitch Day Support",
          "Investor Narrative Support",
          "Strategic Fundraising Advisory",
          "Due Diligence Coordination",
          "Investor Communication Support",
          "Negotiation & Structuring Support",
          "Fundraising Strategy Guidance",
          "Investor Follow-Up Support",
          "Fundraising Process Management",
        ],
      },
      {
        title: "Fund Ecosystem",
        items: [
          "Join as Business / Founder",
          "Join as Investor",
          "Join as Partner",
        ],
      },
    ],
  },
  {
    section: "Post-Fundraise",
    color: "#1565C0",
    categories: [
      {
        title: "Strategic Partnership",
        items: [
          "ZTH at Cap Table",
          "Long-Term Financial Advisory",
          "Growth Strategy Support",
          "Investor Reporting Support",
          "Governance & Structuring",
          "Strategic Decision Support",
          "Fund Utilization Planning",
          "Follow-On Round Preparation",
        ],
      },
      {
        title: "Execution Network",
        items: [
          "Product & Tech Execution",
          "Legal & Compliance Support",
          "Branding & GTM Support",
          "Finance & Accounting Support",
          "Hiring & Talent Support",
          "Operational Scaling Support",
        ],
      },
    ],
  },
];

interface ServiceModalProps {
  isOpen: boolean;
  initialService?: string;
  onClose: () => void;
  onBook: (services: string[]) => void;
}

export default function ServiceModal({ isOpen, initialService, onClose, onBook }: ServiceModalProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  // Pre-select the clicked service whenever modal opens
  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      setSelected(initialService ? [initialService] : []);
    } else {
      const t = setTimeout(() => setMounted(false), 300);
      return () => clearTimeout(t);
    }
  }, [isOpen, initialService]);

  const toggle = (service: string) => {
    setSelected((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
    );
  };

  if (!mounted) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 3000,
        background: "rgba(0,0,0,0.55)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "1.25rem",
        opacity: isOpen ? 1 : 0,
        transition: "opacity 0.25s ease",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#ffffff",
          borderRadius: "1.5rem",
          width: "100%", maxWidth: 740,
          maxHeight: "88vh",
          overflow: "hidden",
          display: "flex", flexDirection: "column",
          boxShadow: "0 32px 80px rgba(0,0,0,0.22), 0 0 0 1px rgba(0,0,0,0.05)",
          transform: isOpen ? "translateY(0) scale(1)" : "translateY(24px) scale(0.97)",
          transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1), opacity 0.25s ease",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {/* ── Modal header ───────────────────────────────────── */}
        <div style={{
          padding: "1.5rem 2rem 1.25rem",
          borderBottom: "1px solid #f0f0f0",
          display: "flex", alignItems: "flex-start", justifyContent: "space-between",
          gap: "1rem",
        }}>
          <div>
            <h2 style={{
              fontSize: "1.2rem", fontWeight: 700, color: "#1A1A1A",
              margin: 0, letterSpacing: "-0.02em",
            }}>
              Select Services
            </h2>
            <p style={{ fontSize: "0.85rem", color: "#6b7280", margin: "0.3rem 0 0", lineHeight: 1.5 }}>
              Pick one or more — we&apos;ll tailor our approach to your needs.
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "#f5f5f5", border: "none", borderRadius: "50%",
              width: 34, height: 34, cursor: "pointer", flexShrink: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "background 0.15s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#e8e8e8")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#f5f5f5")}
          >
            <X size={15} color="#555" />
          </button>
        </div>

        {/* ── Service list ───────────────────────────────────── */}
        <div style={{ overflowY: "auto", padding: "1.5rem 2rem", flex: 1 }}>
          {serviceGroups.map((group) => (
            <div key={group.section} style={{ marginBottom: "2.25rem" }}>
              {/* Section label */}
              <div style={{
                display: "flex", alignItems: "center", gap: "0.75rem",
                marginBottom: "1.25rem",
              }}>
                <span style={{
                  fontSize: "0.65rem", fontWeight: 800, letterSpacing: "0.18em",
                  textTransform: "uppercase", color: group.color,
                }}>
                  {group.section}
                </span>
                <div style={{ flex: 1, height: 1, background: "#f0f0f0" }} />
              </div>

              {group.categories.map((cat) => (
                <div key={cat.title} style={{ marginBottom: "1.25rem" }}>
                  <p style={{
                    fontSize: "0.775rem", fontWeight: 600, color: "#374151",
                    margin: "0 0 0.65rem", letterSpacing: "-0.01em",
                  }}>
                    {cat.title}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem" }}>
                    {cat.items.map((item) => {
                      const active = selected.includes(item);
                      return (
                        <button
                          key={item}
                          onClick={() => toggle(item)}
                          style={{
                            padding: "0.38rem 0.875rem",
                            borderRadius: "100px",
                            border: `1.5px solid ${active ? group.color : "#e5e7eb"}`,
                            background: active ? `rgba(${group.color === "#1976D2" ? "25,118,210" : group.color === "#0D47A1" ? "13,71,161" : "21,101,192"},0.07)` : "#fff",
                            color: active ? group.color : "#4B5563",
                            fontSize: "0.8rem",
                            fontWeight: active ? 600 : 400,
                            cursor: "pointer",
                            transition: "all 0.15s ease",
                            display: "flex", alignItems: "center", gap: "0.3rem",
                            fontFamily: "'Inter', sans-serif",
                            letterSpacing: "-0.01em",
                            whiteSpace: "nowrap",
                          }}
                          onMouseEnter={(e) => {
                            if (!active) {
                              e.currentTarget.style.borderColor = group.color;
                              e.currentTarget.style.color = group.color;
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!active) {
                              e.currentTarget.style.borderColor = "#e5e7eb";
                              e.currentTarget.style.color = "#4B5563";
                            }
                          }}
                        >
                          {active && (
                            <span style={{
                              width: 14, height: 14, borderRadius: "50%",
                              background: group.color,
                              display: "flex", alignItems: "center", justifyContent: "center",
                              flexShrink: 0,
                            }}>
                              <Check size={9} color="#fff" strokeWidth={3} />
                            </span>
                          )}
                          {item}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* ── Footer ─────────────────────────────────────────── */}
        <div style={{
          padding: "1.1rem 2rem",
          borderTop: "1px solid #f0f0f0",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          gap: "1rem",
          background: "#fafafa",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            {selected.length > 0 && (
              <span style={{ fontSize: "0.825rem", color: "#6b7280" }}>
                <strong style={{ color: "#1976D2" }}>{selected.length}</strong> service{selected.length > 1 ? "s" : ""} selected
              </span>
            )}
            {selected.length > 0 && (
              <button
                onClick={() => setSelected([])}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  fontSize: "0.8rem", color: "#9ca3af",
                  fontFamily: "'Inter', sans-serif",
                  padding: 0, textDecoration: "underline",
                }}
              >
                Clear all
              </button>
            )}
          </div>

          <button
            onClick={() => { onBook(selected); onClose(); }}
            disabled={selected.length === 0}
            style={{
              background: selected.length > 0
                ? "linear-gradient(135deg, #1976D2, #0D47A1)"
                : "#e5e7eb",
              color: selected.length > 0 ? "#fff" : "#9ca3af",
              border: "none", borderRadius: "100px",
              padding: "0.65rem 1.6rem",
              fontSize: "0.875rem", fontWeight: 700,
              cursor: selected.length > 0 ? "pointer" : "not-allowed",
              fontFamily: "'Inter', sans-serif",
              display: "flex", alignItems: "center", gap: "0.45rem",
              transition: "all 0.2s ease",
              boxShadow: selected.length > 0 ? "0 4px 16px rgba(25,118,210,0.3)" : "none",
              letterSpacing: "-0.01em",
            }}
          >
            Book Selected Services
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
