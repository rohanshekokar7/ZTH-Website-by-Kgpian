"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { label: "Home", href: "/" },
  { 
    label: "Pre-Fundraising", 
    href: "/book?service=pre-fundraising",
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
          "Company Profile"
        ]
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
          "Financial Documentation"
        ]
      }
    ]
  },
  { 
    label: "Capital Network", 
    href: "/book?service=capital-network",
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
          "Fundraising Process Management"
        ]
      },
      {
        title: "Fund Ecosystem",
        items: [
          "Join as Business / Founder",
          "Join as Investor",
          "Join as Partner"
        ]
      }
    ]
  },
  { 
    label: "Post-Fundraise Partnership", 
    href: "/book?service=post-fundraise",
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
          "Follow-On Round Preparation"
        ]
      },
      {
        title: "Execution Network",
        items: [
          "Product & Tech Execution",
          "Legal & Compliance Support",
          "Branding & GTM Support",
          "Finance & Accounting Support",
          "Hiring & Talent Support",
          "Operational Scaling Support"
        ]
      }
    ]
  },
  { label: "Investor Mock Room", href: "/#mock-room" },
  { label: "Zth Insider", href: "/resources#insider" },
];

export default function Header({ onBookNow }: { onBookNow: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");

  useEffect(() => {
    const handler = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 10) {
        // Always show at the very top
        setIsHidden(false);
      } else if (currentScrollY > lastScrollY.current) {
        // Scrolling DOWN → hide navbar
        setIsHidden(true);
      } else if (currentScrollY < lastScrollY.current) {
        // Scrolling UP → show navbar
        setIsHidden(false);
      }

      lastScrollY.current = currentScrollY;
      setScrolled(currentScrollY > 10);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleNavClick = (href: string, label: string) => {
    setMenuOpen(false);
    setActiveLink(label);

    // Parse path and hash from href
    const [path, hash] = href.split("#");
    const targetHash = hash ? "#" + hash : "";

    if (window.location.pathname === path) {
      // If we're already on the target page, scroll smoothly
      if (targetHash) {
        const el = document.querySelector(targetHash);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      // Otherwise navigate
      window.location.href = href;
    }
  };

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: "0",
          left: "0",
          transform: `translateY(${isHidden ? "-100%" : "0"})`,
          width: "100%",
          boxSizing: "border-box",
          background: scrolled
            ? "rgba(10, 10, 15, 0.85)"
            : "rgba(10, 10, 15, 0.35)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          padding: "1rem 2rem",
          boxShadow: scrolled
            ? "0 4px 30px rgba(0,0,0,0.3)"
            : "none",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transition: "all 0.45s cubic-bezier(0.4, 0, 0.2, 1)",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {/* Logo */}
        <a href="#" className="mobile-logo-wrap" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }} style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
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

        {/* Desktop Nav */}
        {navLinks.map((link) => (
          <div
            key={link.label}
            className="mobile-hide nav-item-container"
            style={{ position: "relative", height: "100%", display: "flex", alignItems: "center" }}
          >
            <button
              onClick={() => handleNavClick(link.href, link.label)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                color: activeLink === link.label ? "#ffffff" : "rgba(255,255,255,0.7)",
                fontSize: "0.8585rem",
                fontWeight: activeLink === link.label ? 700 : 500,
                padding: "0.25rem 0",
                position: "relative",
                transition: "color 0.3s ease",
                fontFamily: "'Inter', sans-serif",
                display: "flex", alignItems: "center", gap: "4px"
              }}
              onMouseEnter={(e) => {
                if (activeLink !== link.label)
                  e.currentTarget.style.color = "#ffffff";
              }}
              onMouseLeave={(e) => {
                if (activeLink !== link.label)
                  e.currentTarget.style.color = "rgba(255,255,255,0.7)";
              }}
            >
              {link.label}
              {link.dropdown && <ChevronDown size={14} style={{ opacity: 0.8, marginTop: "1px", transition: "transform 0.3s ease" }} className="dropdown-icon" />}
              {activeLink === link.label && (
                <span style={{
                  position: "absolute", bottom: "-4px", left: "50%", transform: "translateX(-50%)",
                  width: "4px", height: "4px", borderRadius: "50%",
                  background: "#ffffff",
                }} />
              )}
            </button>

            {/* Mega Menu Dropdown */}
            {link.dropdown && (
              <div className="mega-menu" style={{
                position: "absolute", top: "100%", left: "50%", transform: "translateX(-50%)",
                width: "max-content",
                background: "rgba(10, 10, 15, 0.95)",
                backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "16px", padding: "2rem 2.5rem",
                display: "none", // Display managed by CSS hover
                gap: "4rem",
                boxShadow: "0 20px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05), 0 -4px 30px rgba(25,118,210,0.15)",
                cursor: "default",
                textAlign: "left"
              }}>
                {link.dropdown.map((section, idx) => (
                  <div key={idx} style={{ display: "flex", flexDirection: "column", gap: "1.25rem", minWidth: "260px" }}>
                    <h3 style={{ 
                      color: "#90CAF9", fontSize: "0.85rem", fontWeight: 700, 
                      letterSpacing: "0.5px", textTransform: "uppercase", margin: 0 
                    }}>
                      {section.title}
                    </h3>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                      {section.items.map((item, i) => (
                        <li key={i}>
                          <a href={link.href} style={{ 
                            color: "rgba(255,255,255,0.75)", textDecoration: "none", fontSize: "0.85rem",
                            transition: "all 0.2s ease", cursor: "pointer", display: "inline-block",
                            fontWeight: 500
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = "#ffffff";
                            e.currentTarget.style.transform = "translateX(4px)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = "rgba(255,255,255,0.75)";
                            e.currentTarget.style.transform = "translateX(0)";
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

        {/* CTA */}
        <Link
          href="/login"
          className="mobile-hide"
          style={{
            textDecoration: "none",
            color: "rgba(255,255,255,0.75)",
            fontSize: "0.85rem",
            fontWeight: 500, cursor: "pointer", transition: "color 0.3s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.75)")}
        >
          Login
        </Link>
        <button
          onClick={onBookNow}
          className="mobile-hide book-now-btn"
        >
          Book Now
        </button>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: "none", border: "none", cursor: "pointer",
            color: "#ffffff",
            display: "none", padding: "0.5rem",
            transition: "color 0.3s ease",
          }}
          className="mobile-menu-btn"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      {/* Mobile Menu */}
      <div
        style={{
          position: "fixed", inset: 0, zIndex: 99,
          background: "rgba(8, 8, 18, 0.97)",
          backdropFilter: "blur(24px)",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", gap: "1.75rem",
          transform: menuOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <button
          onClick={() => setMenuOpen(false)}
          style={{
            position: "absolute", top: "1.5rem", right: "1.5rem",
            background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.8)",
          }}
        >
          <X size={28} />
        </button>
        {navLinks.map((link, i) => (
          <button
            key={link.href}
            onClick={() => handleNavClick(link.href, link.label)}
            style={{
              background: "none", border: "none", cursor: "pointer",
              fontFamily: "'Inter', sans-serif", fontSize: "1.5rem",
              fontWeight: activeLink === link.label ? 800 : 500,
              color: activeLink === link.label ? "#ffffff" : "rgba(255,255,255,0.55)",
              letterSpacing: "-0.02em",
              transform: menuOpen ? "translateX(0)" : "translateX(40px)",
              opacity: menuOpen ? 1 : 0,
              transition: `all 0.4s ease ${i * 0.06}s`,
            }}
          >
            {link.label}
          </button>
        ))}
        <Link
          href="/login"
          onClick={() => setMenuOpen(false)}
          style={{
            fontFamily: "'Inter', sans-serif", fontSize: "1.5rem", fontWeight: 700,
            color: "#90CAF9", textDecoration: "none", letterSpacing: "-0.02em",
            opacity: menuOpen ? 1 : 0, transform: menuOpen ? "translateX(0)" : "translateX(40px)",
            transition: `all 0.4s ease 0.35s`, marginTop: "0.5rem",
          }}
        >
          Login
        </Link>
        <button
          onClick={() => { setMenuOpen(false); onBookNow(); }}
          style={{
            background: "#1976D2", color: "#fff", border: "none", borderRadius: "9999px",
            padding: "0.875rem 2.5rem", fontFamily: "'Inter', sans-serif",
            fontSize: "1rem", fontWeight: 600, cursor: "pointer",
            opacity: menuOpen ? 1 : 0, transform: menuOpen ? "translateX(0)" : "translateX(40px)",
            transition: `all 0.4s ease 0.4s`,
          }}
        >
          Book Discovery Call
        </button>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .mobile-menu-btn { display: block !important; }
          .mobile-hide { display: none !important; }
        }
        
        .nav-item-container:hover .mega-menu {
          display: flex !important;
          animation: megaMenuFade 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        
        .nav-item-container:hover .dropdown-icon {
          transform: rotate(180deg);
        }
        
        .mega-menu::before {
          content: '';
          position: absolute;
          top: 0; left: 0; width: 100%; height: 3px;
          background: linear-gradient(135deg, #1976D2, #0D47A1);
          border-top-left-radius: 16px;
          border-top-right-radius: 16px;
        }

        .nav-item-container::after {
          content: '';
          position: absolute;
          top: 100%;
          left: 0;
          width: 100%;
          height: 25px;
        }

        @keyframes megaMenuFade {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(10px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0) scale(1);
          }
        }
        
        .book-now-btn {
          background: linear-gradient(135deg, #1976D2, #0D47A1);
          color: #ffffff;
          border: none;
          border-radius: 9999px;
          padding: 0.55rem 1.3rem;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 15px rgba(25, 118, 210, 0.3);
          font-family: 'Inter', sans-serif;
          position: relative;
          overflow: hidden;
          z-index: 1;
        }

        .book-now-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent);
          transition: all 0.6s ease;
          z-index: -1;
        }

        .book-now-btn:hover::before {
          left: 100%;
        }

        .book-now-btn:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 8px 25px rgba(25, 118, 210, 0.5);
        }
      `}</style>
    </>
  );
}
