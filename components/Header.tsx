"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Pitch Deck Services", href: "/#pitch-deck" },
  { label: "Investor Mock Room", href: "/#mock-room" },
  { label: "Funding", href: "/resources#funding" },
  { label: "Consultation", href: "/resources#consultation" },
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
          top: "1.25rem",
          left: "50%",
          transform: `translateX(-50%) translateY(${isHidden ? "-150%" : "0"})`,
          width: "96vw",
          maxWidth: "1380px",
          background: scrolled
            ? "rgba(255, 255, 255, 0.92)"
            : "rgba(10, 10, 20, 0.35)",
          border: scrolled
            ? "1px solid rgba(0,0,0,0.07)"
            : "1px solid rgba(255,255,255,0.14)",
          borderRadius: "9999px",
          padding: "1rem 1.5rem 1rem 2rem",
          boxShadow: scrolled
            ? "0 10px 40px -8px rgba(0,0,0,0.10), 0 4px 12px -4px rgba(0,0,0,0.04)"
            : "0 8px 32px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.1)",
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
          <button
            key={link.label}
            className="mobile-hide"
            onClick={() => handleNavClick(link.href, link.label)}
            style={{
              background: "none", border: "none", cursor: "pointer",
              color: scrolled
                ? (activeLink === link.label ? "#1A1A1A" : "#666666")
                : (activeLink === link.label ? "#ffffff" : "rgba(255,255,255,0.7)"),
              fontSize: "0.8585rem",
              fontWeight: activeLink === link.label ? 700 : 500,
              padding: "0.25rem 0",
              position: "relative",
              transition: "color 0.3s ease",
              fontFamily: "'Inter', sans-serif",
            }}
            onMouseEnter={(e) => {
              if (activeLink !== link.label)
                e.currentTarget.style.color = scrolled ? "#1A1A1A" : "#ffffff";
            }}
            onMouseLeave={(e) => {
              if (activeLink !== link.label)
                e.currentTarget.style.color = scrolled ? "#666666" : "rgba(255,255,255,0.7)";
            }}
          >
            {link.label}
            {activeLink === link.label && (
              <span style={{
                position: "absolute", bottom: "-2px", left: "50%", transform: "translateX(-50%)",
                width: "4px", height: "4px", borderRadius: "50%",
                background: scrolled ? "#1976D2" : "#ffffff",
              }} />
            )}
          </button>
        ))}

        {/* CTA */}
        <Link
          href="/login"
          className="mobile-hide"
          style={{
            textDecoration: "none",
            color: scrolled ? "#666666" : "rgba(255,255,255,0.75)",
            fontSize: "0.85rem",
            fontWeight: 500, cursor: "pointer", transition: "color 0.3s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = scrolled ? "#1A1A1A" : "#ffffff")}
          onMouseLeave={(e) => (e.currentTarget.style.color = scrolled ? "#666666" : "rgba(255,255,255,0.75)")}
        >
          Login
        </Link>
        <button
          onClick={onBookNow}
          className="mobile-hide"
          style={{
            background: scrolled
              ? "linear-gradient(135deg, #1976D2, #0D47A1)"
              : "rgba(255,255,255,0.18)",
            color: "#ffffff",
            border: scrolled ? "none" : "1px solid rgba(255,255,255,0.35)",
            borderRadius: "9999px",
            padding: "0.55rem 1.3rem", fontSize: "0.85rem", fontWeight: 600,
            cursor: "pointer", transition: "all 0.35s ease",
            boxShadow: scrolled ? "0 2px 10px rgba(25,118,210,0.2)" : "0 2px 12px rgba(0,0,0,0.2)",
            backdropFilter: scrolled ? "none" : "blur(8px)",
            fontFamily: "'Inter', sans-serif",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.boxShadow = scrolled ? "0 6px 20px rgba(25,118,210,0.35)" : "0 6px 20px rgba(0,0,0,0.3)";
            e.currentTarget.style.transform = "translateY(-1px)";
            if (!scrolled) e.currentTarget.style.background = "rgba(255,255,255,0.28)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.boxShadow = scrolled ? "0 2px 10px rgba(25,118,210,0.2)" : "0 2px 12px rgba(0,0,0,0.2)";
            e.currentTarget.style.transform = "translateY(0)";
            if (!scrolled) e.currentTarget.style.background = "rgba(255,255,255,0.18)";
          }}
        >
          Book now
        </button>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: "none", border: "none", cursor: "pointer",
            color: scrolled ? "#333333" : "#ffffff",
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
      `}</style>
    </>
  );
}
