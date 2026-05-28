"use client";
import LogoLoop from "./LogoLoop";
// ─── Data ──────────────────────────────────────────────────────────────────

const logos = [
  { name: "TechCrunch",   tagline: "FEATURED IN"      },
  { name: "Y Combinator", tagline: "ALUMNI NETWORK"   },
  { name: "Forbes",       tagline: "FEATURED IN"      },
  { name: "Sequoia",      tagline: "PORTFOLIO MENTORS" },
  { name: "Lightspeed",   tagline: "PARTNER NETWORK"  },
  { name: "AngelList",    tagline: "LISTED ON"        },
  { name: "Bloomberg",    tagline: "AS SEEN ON"       },
];

// ─── SVG Logo Renderers ────────────────────────────────────────────────────

function CompanyLogo({ name }: { name: string }) {
  switch (name) {
    case "TechCrunch":
      return (
        <svg height="30" viewBox="0 0 200 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <text x="0" y="30" fontFamily="system-ui, -apple-system, sans-serif" fontSize="28" fontWeight="900" fill="#00A562" letterSpacing="-1px">TechCrunch</text>
        </svg>
      );
    case "Y Combinator":
      return (
        <svg height="30" viewBox="0 0 200 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0" y="5" width="30" height="30" fill="#F26522" />
          <text x="8" y="27" fontFamily="system-ui, -apple-system, sans-serif" fontSize="22" fontWeight="700" fill="#FFFFFF">Y</text>
          <text x="40" y="28" fontFamily="system-ui, -apple-system, sans-serif" fontSize="22" fontWeight="600" fill="#1A1A1A" letterSpacing="-0.5px">Combinator</text>
        </svg>
      );
    case "Forbes":
      return (
        <svg height="30" viewBox="0 0 150 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <text x="0" y="30" fontFamily="Georgia, serif" fontSize="28" fontWeight="bold" fill="#000000" letterSpacing="1px">Forbes</text>
        </svg>
      );
    case "Sequoia":
      return (
        <svg height="30" viewBox="0 0 180 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 5 L25 35 L5 35 Z" fill="#111111" opacity="0.8" />
          <path d="M15 15 L30 35 L0 35 Z" fill="#333333" />
          <text x="38" y="28" fontFamily="Georgia, serif" fontSize="20" fontWeight="400" fill="#000000" letterSpacing="2px">SEQUOIA</text>
        </svg>
      );
    case "Lightspeed":
      return (
        <svg height="30" viewBox="0 0 160 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <text x="0" y="28" fontFamily="system-ui, -apple-system, sans-serif" fontSize="24" fontWeight="800" fontStyle="italic" fill="#000000" letterSpacing="-1px">Lightspeed</text>
        </svg>
      );
    case "AngelList":
      return (
        <svg height="30" viewBox="0 0 160 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="15" cy="20" r="12" stroke="#000000" strokeWidth="3" fill="none" />
          <line x1="15" y1="8" x2="15" y2="32" stroke="#000000" strokeWidth="3" />
          <line x1="15" y1="20" x2="6" y2="28" stroke="#000000" strokeWidth="3" />
          <line x1="15" y1="20" x2="24" y2="28" stroke="#000000" strokeWidth="3" />
          <text x="35" y="28" fontFamily="system-ui, -apple-system, sans-serif" fontSize="22" fontWeight="700" fill="#000000" letterSpacing="-0.5px">AngelList</text>
        </svg>
      );
    case "Bloomberg":
      return (
        <svg height="30" viewBox="0 0 160 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <text x="0" y="30" fontFamily="system-ui, -apple-system, sans-serif" fontSize="26" fontWeight="900" fill="#000000" letterSpacing="-1px">Bloomberg</text>
        </svg>
      );
    default:
      return (
        <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: "1.2rem", color: "#1A1A1A" }}>
          {name}
        </span>
      );
  }
}

// ─── Marquee (Removed, using LogoLoop instead) ─────────────────────────
// ─── Export ────────────────────────────────────────────────────────────────

export default function TestimonialsAndLogos() {
  return (
    <>
      <div
        style={{
          borderTop: "1px solid #e5e7eb",
          background: "#ffffff",
          paddingTop: "clamp(3rem, 5vw, 4.5rem)",
          paddingBottom: "clamp(3rem, 5vw, 4.5rem)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.7rem",
              fontWeight: 600,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "#1976D2",
            }}
          >
            Trusted & Featured By
          </span>
        </div>

        <LogoLoop
          logos={logos}
          speed={60}
          direction="left"
          logoHeight={80}
          gap={40}
          hoverSpeed={0}
          scaleOnHover={true}
          fadeOut={true}
          fadeOutColor="#ffffff"
          ariaLabel="Featured in logos"
          renderItem={(item: any) => (
            <div className="logoloop__node">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.2rem",
                  padding: "0.875rem 1.75rem",
                  background: "#ffffff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "0.875rem",
                  minWidth: "140px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
                  cursor: "default",
                  height: "80px",
                  flexShrink: 0
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "40px" }}>
                  <CompanyLogo name={item.name} />
                </div>
              </div>
            </div>
          )}
        />
      </div>
    </>
  );
}
