"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { label: "Home", href: "/" },
  {
    label: "Pre-Fundraising",
    href: "/#pre-fundraising",
    dropdown: [
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
    label: "Strategic Partnership",
    href: "/#strategic-partnership",
    dropdown: [
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
    label: "Post-Fundraise",
    href: "/#post-fundraise",
    dropdown: [
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
  { label: "Mock Room", href: "/#mock-room" },
  {
    label: "ZTH Insider",
    href: "/resources#insider",
    info: {
      description: "Exclusive insights, fundraising strategies, investor psychology, and pitch deck breakdowns curated for ambitious founders.",
      cta: "View All Articles",
    },
  },
];

export default function Header({ onBookNow }: { onBookNow: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");

  useEffect(() => {
    const handler = () => {
      const y = window.scrollY;
      if (y < 10) setIsHidden(false);
      else if (y > lastScrollY.current) setIsHidden(true);
      else setIsHidden(false);
      lastScrollY.current = y;
      setScrolled(y > 10);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleNavClick = (href: string, label: string) => {
    setMenuOpen(false);
    setActiveLink(label);
    const [path, hash] = href.split("#");
    const targetHash = hash ? "#" + hash : "";
    if (window.location.pathname === path || path === "/") {
      if (targetHash) {
        const el = document.querySelector(targetHash);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      window.location.href = href;
    }
  };

  return (
    <>
      <header className="site-header" style={{
        position: "fixed", top: 0, left: 0,
        width: "100%", zIndex: 1000,
        transform: `translateY(${isHidden ? "-100%" : "0"})`,
        transition: "transform 0.45s cubic-bezier(0.4, 0, 0.2, 1)",
        fontFamily: "'Inter', sans-serif",
      }}>

        {/* ── Top accent line ─────────────────────────────────── */}
        <div style={{
          height: 1,
          background: "linear-gradient(90deg, transparent 0%, rgba(25,118,210,0.7) 25%, rgba(144,202,249,0.5) 50%, rgba(25,118,210,0.7) 75%, transparent 100%)",
        }} />

        {/* ── Main bar ────────────────────────────────────────── */}
        <div style={{
          background: scrolled ? "rgba(5, 5, 12, 0.94)" : "rgba(5, 5, 12, 0.5)",
          backdropFilter: "blur(28px)",
          WebkitBackdropFilter: "blur(28px)",
          borderBottom: `1px solid ${scrolled ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.04)"}`,
          boxShadow: scrolled
            ? "0 8px 40px rgba(0,0,0,0.55), 0 1px 0 rgba(255,255,255,0.04)"
            : "none",
          transition: "background 0.5s ease, box-shadow 0.5s ease, border-color 0.5s ease",
          padding: "0 2.5rem",
          height: 66,
          display: "flex", alignItems: "center",
          justifyContent: "space-between",
          gap: "1.5rem",
        }}>

          {/* ── Logo ──────────────────────────────────────────── */}
          <a
            href="/"
            onClick={(e) => { e.preventDefault(); handleNavClick("/", "Home"); }}
            className="mobile-logo-wrap"
            style={{ textDecoration: "none", display: "flex", alignItems: "center", flexShrink: 0 }}
          >
            <div style={{
              width: "40px", height: "40px", borderRadius: "50%",
              background: "linear-gradient(135deg, #1976D2, #0D47A1)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "white", fontFamily: "'Inter', sans-serif",
              boxShadow: "0 2px 10px rgba(25,118,210,0.2)",
              transition: "box-shadow 0.3s ease",
            }}>
              <span style={{ fontSize: "1.5rem", fontWeight: 900, lineHeight: 1, letterSpacing: "-1px", position: "relative", left: "-3px" }}>
                Z<span style={{ fontSize: "0.65rem", position: "absolute", top: "2px", right: "-11px", fontWeight: 800 }}>th</span>
              </span>
            </div>
          </a>

          {/* ── Desktop Nav (fills full width between logo & CTA) ── */}
          <nav
            className="mobile-hide"
            style={{
              display: "flex", alignItems: "center",
              justifyContent: "space-evenly",
              flex: 1,
            }}
          >
            {navLinks.map((link) => (
              <div key={link.label} className="nav-item-container" style={{ position: "relative" }}>
                <button
                  onClick={() => handleNavClick(link.href, link.label)}
                  className={`nav-btn ${activeLink === link.label ? "nav-btn-active" : ""}`}
                  style={{
                    background: activeLink === link.label ? "rgba(255,255,255,0.11)" : "transparent",
                    border: "none", cursor: "pointer",
                    color: activeLink === link.label ? "#ffffff" : "rgba(255,255,255,0.62)",
                    fontSize: "0.8rem",
                    fontWeight: activeLink === link.label ? 600 : 450,
                    padding: "0.42rem 0.85rem",
                    borderRadius: "100px",
                    transition: "all 0.18s ease",
                    fontFamily: "'Inter', sans-serif",
                    display: "flex", alignItems: "center", gap: "3px",
                    whiteSpace: "nowrap",
                    letterSpacing: "-0.01em",
                    outline: "none",
                  }}
                >
                  {link.label}
                  {(link.dropdown || (link as { info?: object }).info) && (
                    <ChevronDown
                      size={11}
                      className="dropdown-icon"
                      style={{ opacity: 0.6, transition: "transform 0.25s ease", flexShrink: 0 }}
                    />
                  )}
                </button>

                {/* ── Info Panel (ZTH Insider) ──────────────────── */}
                {(link as { info?: { description: string; cta: string } }).info && (
                  <div className="mega-menu info-panel" style={{
                    position: "absolute",
                    top: "calc(100% + 16px)",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 320,
                    background: "rgba(6, 6, 16, 0.98)",
                    backdropFilter: "blur(32px)",
                    WebkitBackdropFilter: "blur(32px)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "20px",
                    padding: "1.5rem 1.75rem",
                    display: "none",
                    flexDirection: "column",
                    gap: "1rem",
                    boxShadow: "0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.03)",
                    cursor: "default",
                    textAlign: "left",
                    zIndex: 300,
                  }}>
                    {/* Label */}
                    <p style={{
                      color: "rgba(144,202,249,0.85)",
                      fontSize: "0.665rem",
                      fontWeight: 700,
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      margin: 0,
                      fontFamily: "'Inter', sans-serif",
                    }}>
                      ZTH Insider
                    </p>
                    {/* Description */}
                    <p style={{
                      color: "rgba(255,255,255,0.75)",
                      fontSize: "0.925rem",
                      fontWeight: 400,
                      lineHeight: 1.65,
                      margin: 0,
                      fontFamily: "'Inter', sans-serif",
                      letterSpacing: "-0.01em",
                    }}>
                      {(link as { info?: { description: string; cta: string } }).info!.description}
                    </p>
                    {/* CTA */}
                    <a
                      href={(link as { href: string }).href}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.4rem",
                        color: "#90CAF9",
                        fontSize: "0.8rem",
                        fontWeight: 600,
                        textDecoration: "none",
                        fontFamily: "'Inter', sans-serif",
                        letterSpacing: "-0.01em",
                        transition: "gap 0.2s ease",
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.gap = "0.65rem"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.gap = "0.4rem"; }}
                    >
                      {(link as { info?: { description: string; cta: string } }).info!.cta}
                      <ArrowRight size={12} />
                    </a>
                  </div>
                )}

                {/* ── Mega Menu ─────────────────────────────────── */}
                {link.dropdown && (
                  <div className="mega-menu" style={{
                    position: "absolute",
                    top: "calc(100% + 16px)",
                    left: "50%",
                    transform: "translateX(-50%)",
                    minWidth: 560,
                    background: "rgba(6, 6, 16, 0.98)",
                    backdropFilter: "blur(32px)",
                    WebkitBackdropFilter: "blur(32px)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "20px",
                    padding: "1.75rem 2rem",
                    display: "none",
                    gap: "2.5rem",
                    boxShadow: "0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.03)",
                    cursor: "default",
                    textAlign: "left",
                    zIndex: 300,
                  }}>
                    {/* Section columns */}
                    {link.dropdown.map((section, idx) => (
                      <div key={idx} style={{ minWidth: 200 }}>
                        <p style={{
                          color: "rgba(144,202,249,0.85)",
                          fontSize: "0.665rem",
                          fontWeight: 700,
                          letterSpacing: "0.16em",
                          textTransform: "uppercase",
                          margin: "0 0 1rem",
                          fontFamily: "'Inter', sans-serif",
                        }}>
                          {section.title}
                        </p>
                        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.45rem" }}>
                          {section.items.map((item, i) => (
                            <li key={i} style={{ display: "flex", alignItems: "center", gap: "0.55rem" }}>
                              <span className="menu-dot" style={{
                                width: 3, height: 3, borderRadius: "50%",
                                background: "rgba(25,118,210,0.45)",
                                flexShrink: 0, transition: "background 0.2s ease",
                              }} />
                              <a
                                href={link.href}
                                className="menu-item-link"
                                style={{
                                  color: "rgba(255,255,255,0.6)",
                                  textDecoration: "none",
                                  fontSize: "0.8125rem",
                                  fontWeight: 450,
                                  transition: "all 0.18s ease",
                                  display: "inline-block",
                                  fontFamily: "'Inter', sans-serif",
                                  letterSpacing: "-0.01em",
                                }}
                              >
                                {item}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {/* Login — last item inside the evenly-spaced nav */}
            <Link
              href="/login"
              style={{
                color: "rgba(255,255,255,0.62)",
                fontSize: "0.8rem",
                fontWeight: 450,
                textDecoration: "none",
                transition: "all 0.18s ease",
                padding: "0.42rem 0.85rem",
                letterSpacing: "-0.01em",
                borderRadius: "100px",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#fff";
                e.currentTarget.style.background = "rgba(255,255,255,0.07)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "rgba(255,255,255,0.62)";
                e.currentTarget.style.background = "transparent";
              }}
            >
              Login
            </Link>
          </nav>

          {/* ── Book a Call — pinned to far right ─────────────── */}
          <button onClick={onBookNow} className="book-now-btn mobile-hide" style={{ flexShrink: 0 }}>
            Book a Call
            <ArrowRight size={12} />
          </button>

          {/* Mobile burger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="mobile-menu-btn"
            style={{
              background: "none", border: "none", cursor: "pointer",
              color: "#fff", display: "none", padding: "0.5rem",
              borderRadius: "8px", transition: "background 0.2s ease",
            }}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* ── Mobile full-screen drawer ────────────────────────────── */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 999,
        background: "rgba(4, 4, 10, 0.98)",
        backdropFilter: "blur(32px)",
        WebkitBackdropFilter: "blur(32px)",
        display: "flex", flexDirection: "column",
        padding: "5rem 2rem 3rem",
        transform: menuOpen ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        overflowY: "auto",
      }}>
        {/* Close */}
        <button
          onClick={() => setMenuOpen(false)}
          style={{
            position: "absolute", top: "1.25rem", right: "1.25rem",
            background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "50%", width: 40, height: 40,
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", color: "rgba(255,255,255,0.8)",
          }}
        >
          <X size={18} />
        </button>

        {/* Mobile logo */}
        <div style={{ marginBottom: "3rem" }}>
          <div style={{
            width: "40px", height: "40px", borderRadius: "50%",
            background: "linear-gradient(135deg, #1976D2, #0D47A1)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "white", fontFamily: "'Inter', sans-serif",
            boxShadow: "0 2px 10px rgba(25,118,210,0.2)",
          }}>
            <span style={{ fontSize: "1.5rem", fontWeight: 900, lineHeight: 1, letterSpacing: "-1px", position: "relative", left: "-3px" }}>
              Z<span style={{ fontSize: "0.65rem", position: "absolute", top: "2px", right: "-11px", fontWeight: 800 }}>th</span>
            </span>
          </div>
        </div>

        {/* Mobile nav links */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem", flex: 1 }}>
          {navLinks.map((link, i) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href, link.label)}
              style={{
                background: activeLink === link.label ? "rgba(25,118,210,0.12)" : "transparent",
                border: "none", cursor: "pointer",
                fontFamily: "'Inter', sans-serif",
                fontSize: "1.1rem",
                fontWeight: activeLink === link.label ? 700 : 500,
                color: activeLink === link.label ? "#ffffff" : "rgba(255,255,255,0.55)",
                letterSpacing: "-0.02em",
                padding: "0.85rem 1rem",
                borderRadius: "12px",
                textAlign: "left",
                transform: menuOpen ? "translateX(0)" : "translateX(30px)",
                opacity: menuOpen ? 1 : 0,
                transition: `all 0.4s cubic-bezier(0.4, 0, 0.2, 1) ${i * 0.05}s`,
                display: "flex", alignItems: "center", justifyContent: "space-between",
              }}
            >
              {link.label}
              {activeLink === link.label && (
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#1976D2" }} />
              )}
            </button>
          ))}
        </div>

        {/* Mobile footer actions */}
        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.07)",
          paddingTop: "1.5rem", marginTop: "1.5rem",
          display: "flex", flexDirection: "column", gap: "0.75rem",
          opacity: menuOpen ? 1 : 0,
          transform: menuOpen ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.4s ease 0.3s",
        }}>
          <Link
            href="/login"
            onClick={() => setMenuOpen(false)}
            style={{
              fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", fontWeight: 600,
              color: "rgba(255,255,255,0.6)", textDecoration: "none",
              padding: "0.85rem 1rem", borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.1)",
              textAlign: "center",
            }}
          >
            Login
          </Link>
          <button
            onClick={() => { setMenuOpen(false); onBookNow(); }}
            style={{
              background: "linear-gradient(135deg, #1976D2, #0D47A1)",
              color: "#fff", border: "none", borderRadius: "12px",
              padding: "0.9rem 1rem",
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.9rem", fontWeight: 700, cursor: "pointer",
              boxShadow: "0 8px 24px rgba(25,118,210,0.35)",
            }}
          >
            Book a Call →
          </button>
        </div>
      </div>

      <style jsx>{`
        /* Responsive */
        @media (max-width: 1024px) {
          .mobile-menu-btn { display: flex !important; align-items: center; justify-content: center; }
          .mobile-hide { display: none !important; }
        }

        /* Nav button hover (JS handles active) */
        .nav-btn:hover:not(.nav-btn-active) {
          background: rgba(255,255,255,0.07) !important;
          color: #ffffff !important;
        }

        /* Chevron rotate on hover */
        .nav-item-container:hover .dropdown-icon {
          transform: rotate(180deg);
        }

        /* Mega menu show on hover */
        .nav-item-container:hover .mega-menu {
          display: flex !important;
          animation: megaFadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        /* Info panel is flex-column */
        .nav-item-container:hover .info-panel {
          flex-direction: column !important;
        }

        /* Hover bridge so menu stays open while moving mouse */
        .nav-item-container::after {
          content: '';
          position: absolute;
          top: 100%;
          left: -20px;
          right: -20px;
          height: 20px;
        }

        /* Mega menu top accent */
        .mega-menu::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, #1976D2, #90CAF9, #1976D2);
          border-radius: 20px 20px 0 0;
        }

        /* Mega menu item hover */
        .menu-item-link:hover {
          color: #ffffff !important;
          transform: translateX(4px) !important;
        }
        .menu-item-link:hover ~ .menu-dot,
        li:hover .menu-dot {
          background: #1976D2 !important;
        }

        @keyframes megaFadeIn {
          from { opacity: 0; transform: translateX(-50%) translateY(8px) scale(0.98); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0)   scale(1);    }
        }

        /* Book Now button */
        .book-now-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          background: linear-gradient(135deg, #1976D2 0%, #1565C0 100%);
          color: #ffffff;
          border: none;
          border-radius: 100px;
          padding: 0.46rem 1.1rem;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
          letter-spacing: -0.01em;
          box-shadow: 0 4px 16px rgba(25,118,210,0.35), inset 0 1px 0 rgba(255,255,255,0.15);
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }
        .book-now-btn::before {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s ease;
        }
        .book-now-btn:hover::before { left: 100%; }
        .book-now-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 28px rgba(25,118,210,0.5), inset 0 1px 0 rgba(255,255,255,0.2);
        }
        .book-now-btn:active { transform: translateY(0); }
      `}</style>
    </>
  );
}
