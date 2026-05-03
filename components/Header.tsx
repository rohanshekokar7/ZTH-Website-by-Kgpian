"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { label: "Home", href: "#" },
  { label: "Pitch Deck Services", href: "#pitch-deck" },
  { label: "Investor Mock Room", href: "#mock-room" },
  { label: "Funding", href: "#funding" },
  { label: "Consultation", href: "#consultation" },
  { label: "Zth Insider", href: "#insider" },
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
      if (window.innerWidth <= 768) {
        if (currentScrollY > lastScrollY.current && currentScrollY > 60) setIsHidden(true);
        else if (currentScrollY < lastScrollY.current) setIsHidden(false);
      } else {
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
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: "1.25rem",
          left: "50%",
          transform: `translateX(-50%) translateY(${isHidden ? "-150%" : "0"})`,
          width: "93.5vw",
          maxWidth: "1100px",
          background: scrolled ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.85)",
          border: "1px solid rgba(0,0,0,0.06)",
          borderRadius: "9999px",
          padding: "1rem 1.5rem 1rem 2rem",
          boxShadow: scrolled
            ? "0 10px 40px -8px rgba(0,0,0,0.08), 0 4px 12px -4px rgba(0,0,0,0.03)"
            : "0 4px 15px -3px rgba(0,0,0,0.05)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {/* Logo */}
        <a href="#" className="mobile-logo-wrap" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }} style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
          <div style={{
            width: "40px", height: "40px", borderRadius: "50%",
            background: "linear-gradient(135deg, #0077c2, #44a8ee)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "white", fontFamily: "'Inter', sans-serif",
            boxShadow: "0 2px 10px rgba(0,119,194,0.2)",
            transition: "box-shadow 0.3s ease",
          }}>
            <span style={{ fontSize: "1.5rem", fontWeight: 900, lineHeight: 1, letterSpacing: "-1px", position: "relative", left: "-3px" }}>
              Z<span style={{ fontSize: "0.65rem", position: "absolute", top: "2px", right: "-11px", fontWeight: 800 }}>th</span>
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        {navLinks.map((link) => (
          <button
            key={link.label}
            className="mobile-hide"
            onClick={() => handleNavClick(link.href, link.label)}
            style={{
              background: "none", border: "none", cursor: "pointer",
              color: activeLink === link.label ? "#111827" : "#6b7280",
              fontSize: "0.8585rem",
              fontWeight: activeLink === link.label ? 700 : 500,
              padding: "0.25rem 0",
              position: "relative",
              transition: "color 0.2s ease",
              fontFamily: "'Inter', sans-serif",
            }}
            onMouseEnter={(e) => { if (activeLink !== link.label) e.currentTarget.style.color = "#374151"; }}
            onMouseLeave={(e) => { if (activeLink !== link.label) e.currentTarget.style.color = "#6b7280"; }}
          >
            {link.label}
            {activeLink === link.label && (
              <span style={{
                position: "absolute", bottom: "-2px", left: "50%", transform: "translateX(-50%)",
                width: "4px", height: "4px", borderRadius: "50%", background: "#0077c2",
              }} />
            )}
          </button>
        ))}

        {/* CTA */}
        <Link
          href="/login"
          className="mobile-hide"
          style={{
            textDecoration: "none", color: "#6b7280", fontSize: "0.85rem",
            fontWeight: 500, cursor: "pointer", transition: "color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#111827")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#6b7280")}
        >
          Login
        </Link>
        <button
          onClick={onBookNow}
          className="mobile-hide"
          style={{
            background: "linear-gradient(135deg, #0077c2, #0087db)",
            color: "#ffffff", border: "none", borderRadius: "9999px",
            padding: "0.55rem 1.3rem", fontSize: "0.85rem", fontWeight: 600,
            cursor: "pointer", transition: "all 0.3s ease",
            boxShadow: "0 2px 10px rgba(0,119,194,0.2)",
            fontFamily: "'Inter', sans-serif",
          }}
          onMouseOver={(e) => { e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,119,194,0.3)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
          onMouseOut={(e) => { e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,119,194,0.2)"; e.currentTarget.style.transform = "translateY(0)"; }}
        >
          Book now
        </button>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: "none", border: "none", cursor: "pointer",
            color: "#374151", display: "none", padding: "0.5rem",
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
          background: "rgba(255,255,255,0.98)",
          backdropFilter: "blur(20px)",
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
            background: "none", border: "none", cursor: "pointer", color: "#1f2937",
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
              color: activeLink === link.label ? "#111827" : "#6b7280",
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
            color: "#0077c2", textDecoration: "none", letterSpacing: "-0.02em",
            opacity: menuOpen ? 1 : 0, transform: menuOpen ? "translateX(0)" : "translateX(40px)",
            transition: `all 0.4s ease 0.35s`, marginTop: "0.5rem",
          }}
        >
          Login
        </Link>
        <button
          onClick={() => { setMenuOpen(false); onBookNow(); }}
          style={{
            background: "#0077c2", color: "#fff", border: "none", borderRadius: "9999px",
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
      `}</style>
    </>
  );
}
