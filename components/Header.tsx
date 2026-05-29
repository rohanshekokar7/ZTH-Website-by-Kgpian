"use client";

import { useState, useEffect, useRef, Fragment } from "react";
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
  { label: "Investor Mock Room", href: "/#mock-room" },
];

// Map section IDs → nav label
const sectionMap: Record<string, string> = {
  "pre-fundraising": "Pre-Fundraising",
  "strategic-partnership": "Strategic Partnership",
  "capital-network": "Strategic Partnership",
  "post-fundraise": "Post-Fundraise",
  "funding": "Post-Fundraise",
  "mock-room": "Investor Mock Room",
};

export default function Header({ onBookNow }: { onBookNow: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const [isNavHovered, setIsNavHovered] = useState(false);

  // Scroll hide/show + scrolled state
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

  // Auto-highlight nav based on scroll position
  useEffect(() => {
    const ids = Object.keys(sectionMap);

    const updateActive = () => {
      if (window.scrollY < 80) {
        setActiveLink("Home");
        return;
      }

      // Find which section occupies the 40% mark of the viewport
      const probe = window.scrollY + window.innerHeight * 0.4;
      let matched = "";

      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + window.scrollY;
        const bottom = top + el.offsetHeight;
        if (probe >= top && probe <= bottom) {
          matched = id;
          // Don't break — last match (deepest section at that point) wins
        }
      }

      if (matched) setActiveLink(sectionMap[matched]);
    };

    window.addEventListener("scroll", updateActive, { passive: true });
    updateActive(); // run once on mount

    return () => window.removeEventListener("scroll", updateActive);
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
        "--nav-text": (scrolled || isNavHovered) ? "#000000" : "#ffffff",
        "--nav-muted": (scrolled || isNavHovered) ? "rgba(0,0,0,0.75)" : "rgba(255,255,255,0.85)",
        "--nav-hover-bg": (scrolled || isNavHovered) ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.1)",
        "--nav-active-bg": (scrolled || isNavHovered) ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.1)",
      } as React.CSSProperties}>

        {/* ── Main bar ────────────────────────────────────────── */}
        <div
          onMouseEnter={() => setIsNavHovered(true)}
          onMouseLeave={() => setIsNavHovered(false)}
          style={{
            background: (scrolled || isNavHovered) ? "rgba(255, 255, 255, 0.97)" : "transparent",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            borderBottom: (scrolled || isNavHovered) ? "1px solid rgba(0,0,0,0.07)" : "1px solid transparent",
            boxShadow: (scrolled || isNavHovered) ? "0 8px 40px rgba(0,0,0,0.08)" : "none",
            transition: "background 0.5s ease, box-shadow 0.5s ease, border-color 0.5s ease",
            padding: "0 2.5rem",
            height: 66,
            display: "flex", alignItems: "center",
            justifyContent: "space-between",
          }}>

          {/* ── Logo — left corner ─────────────────────────────── */}
          <a
            href="/"
            onClick={(e) => { e.preventDefault(); handleNavClick("/", "Home"); }}
            style={{ textDecoration: "none", display: "flex", alignItems: "center", flexShrink: 0 }}
          >
            <img src="/zth%20logo.png" alt="ZTH Logo" style={{ height: "64px", width: "auto", objectFit: "contain" }} />
          </a>

          {/* ── Nav items — equal space between every item ─────── */}
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="nav-item-container mobile-hide"
                style={{ position: "relative" }}
                onMouseEnter={() => link.dropdown && setHoveredMenu(link.label)}
                onMouseLeave={() => setHoveredMenu(null)}
              >
                <button
                  onClick={() => handleNavClick(link.href, link.label)}
                  className={`nav-btn ${activeLink === link.label ? "nav-btn-active" : ""}`}
                  style={{
                    background: activeLink === link.label ? "var(--nav-active-bg)" : "transparent",
                    border: "none", cursor: "pointer",
                    color: activeLink === link.label ? "var(--nav-text)" : "var(--nav-muted)",
                    fontSize: "0.95rem",
                    fontWeight: activeLink === link.label ? 600 : 500,
                    padding: "0.42rem 0.9rem",
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
                  {link.dropdown && (
                    <ChevronDown
                      size={14}
                      className="dropdown-icon"
                      style={{
                        opacity: 0.6,
                        transition: "transform 0.25s ease",
                        flexShrink: 0,
                        transform: hoveredMenu === link.label ? "rotate(180deg)" : "rotate(0deg)"
                      }}
                    />
                  )}
                </button>

                {/* ── Mega Menu ─────────────────────────────────── */}
                {link.dropdown && (
                  <div className="mega-menu" style={{
                    position: "absolute",
                    top: "calc(100% + 16px)",
                    left: "50%",
                    transform: "translateX(-50%)",
                    minWidth: 680,
                    background: "rgba(255, 255, 255, 0.98)",
                    backdropFilter: "blur(32px)",
                    WebkitBackdropFilter: "blur(32px)",
                    border: "1px solid rgba(0,0,0,0.08)",
                    borderRadius: "20px",
                    padding: "1.75rem 2rem",
                    display: "none",
                    gap: "2rem",
                    boxShadow: "0 32px 80px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.03)",
                    cursor: "default",
                    textAlign: "left",
                    zIndex: 300,
                    overflow: "hidden",
                  }}>
                    {/* Top accent bar */}
                    <div style={{
                      position: "absolute", top: 0, left: 0, right: 0, height: 2,
                      background: "linear-gradient(90deg, transparent 0%, rgba(25,118,210,0.7) 25%, rgba(144,202,249,0.5) 50%, rgba(25,118,210,0.7) 75%, transparent 100%)",
                      borderRadius: "20px 20px 0 0",
                    }} />
                    {/* Bottom accent bar */}
                    <div style={{
                      position: "absolute", bottom: 0, left: 0, right: 0, height: 2,
                      background: "linear-gradient(90deg, transparent 0%, rgba(25,118,210,0.7) 25%, rgba(144,202,249,0.5) 50%, rgba(25,118,210,0.7) 75%, transparent 100%)",
                      borderRadius: "0 0 20px 20px",
                    }} />
                    {/* Section columns */}
                    {link.dropdown.map((section, idx) => (
                      <Fragment key={idx}>
                        {idx > 0 && (
                          <div style={{
                            width: "1px",
                            background: "linear-gradient(to bottom, rgba(25,118,210,0.4) 0%, rgba(25,118,210,0.05) 100%)",
                            margin: "0.5rem 0",
                          }} />
                        )}
                        <div style={{ minWidth: 260 }}>
                          <p style={{
                            color: "#1976D2",
                            fontSize: "0.95rem",
                            fontWeight: 800,
                            letterSpacing: "0.15em",
                            textTransform: "uppercase",
                            margin: "0 0 1.1rem",
                            fontFamily: "'Inter', sans-serif",
                          }}>
                            {section.title}
                          </p>
                          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.55rem" }}>
                            {section.items.map((item, i) => (
                              <li key={i} style={{ display: "flex", alignItems: "center", gap: "0.55rem" }}>
                                <span className="menu-dot" style={{
                                  width: 3, height: 3, borderRadius: "50%",
                                  background: "rgba(25,118,210,0.45)",
                                  flexShrink: 0, transition: "background 0.2s ease",
                                }} />
                                <button
                                  onClick={() => {
                                    window.location.href = `/book?services=${encodeURIComponent(link.label)}`;
                                  }}
                                  className="menu-item-link"
                                  style={{
                                    color: "rgba(24,24,27,0.7)",
                                    background: "none",
                                    border: "none",
                                    cursor: "pointer",
                                    fontSize: "0.9rem",
                                    fontWeight: 450,
                                    transition: "all 0.18s ease",
                                    display: "inline-block",
                                    fontFamily: "'Inter', sans-serif",
                                    letterSpacing: "-0.01em",
                                    padding: 0,
                                    textAlign: "left",
                                  }}
                                >
                                  {item}
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </Fragment>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {/* Login */}
            <Link
              href="/login"
              className="mobile-hide"
              style={{
                color: "var(--nav-muted)",
                fontSize: "0.95rem",
                fontWeight: 500,
                textDecoration: "none",
                transition: "all 0.18s ease",
                padding: "0.42rem 0.9rem",
                letterSpacing: "-0.01em",
                borderRadius: "100px",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--nav-text)";
                e.currentTarget.style.background = "var(--nav-hover-bg)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--nav-muted)";
                e.currentTarget.style.background = "transparent";
              }}
            >
              Login
            </Link>

          {/* ── Book a Call — right corner (desktop) ────────────── */}
          <button onClick={onBookNow} className="book-now-btn mobile-hide">
            Book a Call
            <ArrowRight size={12} />
          </button>

          {/* ── Burger — right corner (mobile) ──────────────────── */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="mobile-menu-btn"
            style={{
              background: "none", border: "none", cursor: "pointer",
              color: "var(--nav-text)", display: "none", padding: "0.5rem",
              borderRadius: "8px", transition: "background 0.2s ease, color 0.2s ease",
            }}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* ── Mobile full-screen drawer ────────────────────────────── */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 999,
        background: "rgba(248, 250, 252, 0.98)",
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
            background: "rgba(0,0,0,0.05)", border: "1px solid rgba(0,0,0,0.1)",
            borderRadius: "50%", width: 40, height: 40,
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", color: "rgba(24,24,27,0.8)",
          }}
        >
          <X size={18} />
        </button>

        {/* Mobile logo */}
        <div style={{ marginBottom: "3rem" }}>
          <img src="/zth%20logo.png" alt="ZTH Logo" style={{ height: "64px", width: "auto", objectFit: "contain" }} />
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
                color: activeLink === link.label ? "#18181B" : "rgba(24,24,27,0.65)",
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
          borderTop: "1px solid rgba(0,0,0,0.07)",
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
              color: "rgba(24,24,27,0.7)", textDecoration: "none",
              padding: "0.85rem 1rem", borderRadius: "12px",
              border: "1px solid rgba(0,0,0,0.1)",
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

      {/* ── Page Blur Overlay ── */}
      <div
        style={{
          position: "fixed",
          top: 66,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(255, 255, 255, 0.02)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          zIndex: 999,
          pointerEvents: "none",
          opacity: hoveredMenu ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      />

      <style jsx>{`
        /* Responsive */
        @media (max-width: 1024px) {
          .mobile-menu-btn { display: flex !important; align-items: center; justify-content: center; }
          .mobile-hide { display: none !important; }
        }

        /* Nav button hover (JS handles active) */
        .nav-btn:hover:not(.nav-btn-active) {
          background: var(--nav-hover-bg) !important;
          color: var(--nav-text) !important;
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
          color: #18181B !important;
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

      {/* Modal bypassed as per user request */}
    </>
  );
}
