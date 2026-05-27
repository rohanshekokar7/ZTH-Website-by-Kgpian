"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";

// ─── Data ──────────────────────────────────────────────────────────────────

const informationCards = [
  {
    id: 1,
    title: "Investor Psychology",
    content: "Understand how investors evaluate startups beyond just numbers and revenue. Learn what creates confidence during a pitch, how strong founders communicate vision, and why storytelling often influences decisions more than data alone. Discover the subtle signals investors notice while reviewing pitch decks, founder behavior, traction metrics, and market positioning before making funding decisions."
  },
  {
    id: 2,
    title: "Pitch Deck Breakdowns",
    content: "Explore detailed analyses of high-performing pitch decks and understand why they successfully attract investor attention. From opening hooks and problem statements to business models and financial projections, ZTH Insider breaks down the exact structure, design language, and storytelling frameworks used by startups that successfully raise capital."
  },
  {
    id: 3,
    title: "Fundraising Strategy",
    content: "Learn how founders strategically prepare for fundraising rounds with better clarity and execution. Understand how much capital to raise, how to approach investor outreach, how to create urgency and momentum, and how to structure fundraising conversations professionally. Gain insights into common mistakes that weaken investor confidence during early-stage fundraising."
  },
  {
    id: 4,
    title: "Venture Growth Insights",
    content: "Access practical insights on startup growth, scalability, market expansion, and operational readiness. Learn how investors evaluate growth potential, product-market fit, customer acquisition strategies, and business sustainability before funding startups. Designed to help founders build companies that are both investable and scalable."
  },
  {
    id: 5,
    title: "Founder Insider Resources",
    content: "Get access to premium founder-focused resources including investor outreach frameworks, fundraising checklists, pitch preparation systems, valuation guidance, financial modeling references, and strategic execution tools. Everything inside ZTH Insider is designed to help founders prepare professionally for high-stakes fundraising opportunities."
  }
];

const logos = [
  { name: "TechCrunch", tagline: "FEATURED IN" },
  { name: "Y Combinator", tagline: "ALUMNI NETWORK" },
  { name: "Forbes", tagline: "FEATURED IN" },
  { name: "Sequoia", tagline: "PORTFOLIO MENTORS" },
  { name: "Lightspeed", tagline: "PARTNER NETWORK" },
  { name: "AngelList", tagline: "LISTED ON" },
  { name: "Bloomberg", tagline: "AS SEEN ON" },
];

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

function TestimonialCard({
  item,
  index,
  isEven,
}: {
  item: (typeof informationCards)[0];
  index: number;
  isEven: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Calculate rotation (-15 to +15 degrees)
    const rotateYValue = ((mouseX / width) - 0.5) * 30;
    const rotateXValue = ((mouseY / height) - 0.5) * -30;

    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  const rotateZValue = isEven ? 2 : -2;

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      style={{
        width: "100%",
        maxWidth: "400px",
        marginLeft: isEven ? "auto" : "0",
        marginRight: isEven ? "0" : "auto",
        marginBottom: "15vh",
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        position: "relative",
        zIndex: 2,
      }}
    >
      {/* 3D Container */}
      <div style={{ perspective: "1200px" }}>
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          animate={{
            rotateX: rotateX,
            rotateY: rotateY,
            rotateZ: rotateZValue,
            boxShadow: isHovered
              ? "0 30px 60px rgba(25, 118, 210, 0.2)"
              : "0 20px 40px rgba(0,0,0,0.08)",
            scale: isHovered ? 1.02 : 1,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 25,
            mass: 0.5,
          }}
          style={{
            background: "#ffffff", // Crisp white to match the theme
            padding: "2.5rem",
            borderRadius: "1rem",
            border: "1px solid #e5e7eb",
            boxShadow: isHovered
              ? "0 12px 30px rgba(0, 0, 0, 0.05)"
              : "0 4px 15px rgba(0, 0, 0, 0.03)",
            aspectRatio: "3/4",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            position: "relative",
            transformStyle: "preserve-3d",
            cursor: "default",
          }}
        >
          <div style={{
            transform: "translateZ(60px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1.5rem",
            position: "relative",
            zIndex: 1
          }}>

            <h3 style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(1.4rem, 2.5vw, 1.7rem)",
                fontWeight: 800,
                color: "#1A1A1A",
                textAlign: "center",
                lineHeight: 1.2,
                letterSpacing: "-0.03em",
                margin: 0
            }}>
              {item.title}
            </h3>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(0.95rem, 1.5vw, 1.05rem)",
                lineHeight: 1.6,
                color: "#4B5563",
                fontWeight: 400,
                textAlign: "center",
                margin: 0
              }}
            >
              {item.content}
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function LogoMarquee({ direction = 1 }: { direction?: 1 | -1 }) {
  const items = [...logos, ...logos];

  return (
    <div
      style={{
        overflow: "hidden",
        position: "relative",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "2.5rem",
          width: "max-content",
          animation: `marquee-logos${direction > 0 ? "-fwd" : "-rev"} 30s linear infinite`,
        }}
      >
        {items.map((logo, i) => (
          <div
            key={i}
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
              flexShrink: 0,
              transition: "border-color 0.2s ease, box-shadow 0.2s ease",
              cursor: "default",
            }}
          >

            {/* Custom SVG Logos instead of external API to prevent adblocker issues */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "40px" }}>
              <CompanyLogo name={logo.name} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TestimonialsAndLogos() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end center"]
  });

  const headerOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0.03]);
  const pOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  const paragraphText = "Exclusive insights, fundraising strategies, investor psychology, and pitch deck breakdowns curated for ambitious founders.";

  return (
    <>
      <style>{`
        @keyframes marquee-logos-fwd {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes marquee-logos-rev {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
      `}</style>

      {/* Logo marquee strip */}
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
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            width: "120px",
            background: "linear-gradient(90deg, #ffffff 0%, transparent 100%)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            width: "120px",
            background: "linear-gradient(270deg, #ffffff 0%, transparent 100%)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />
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
        <LogoMarquee direction={1} />
      </div>

      <section
        id="zth-insider"
        ref={sectionRef}
        style={{
          background: "#ffffff",
          position: "relative",
          color: "#1A1A1A",
          minHeight: "200vh"
        }}
      >
        <div
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
            zIndex: 1,
            pointerEvents: "none",
          }}
        >
          {/* Aesthetic Blue Dot */}
          <div style={{
            position: "absolute",
            top: "50%",
            right: "8%",
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            background: "#1976D2",
            opacity: 0.8,
          }} />

          {/* Rotating Circular Text Stamp */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            style={{
              position: "absolute",
              top: "15%",
              right: "12%",
              opacity: 0.6,
            }}
            className="mobile-hide"
          >
            <svg viewBox="0 0 100 100" width="120" height="120">
              <path id="curve" d="M 50 50 m -40 0 a 40 40 0 1 1 80 0 a 40 40 0 1 1 -80 0" fill="none" />
              <text fontSize="11.5" fill="#1976D2" letterSpacing="1.5" fontWeight="700" style={{ textTransform: "uppercase" }}>
                <textPath href="#curve" startOffset="0">
                  Investor Ready • Pitch Deck • Investor Ready •
                </textPath>
              </text>
            </svg>
          </motion.div>

          <motion.div
            style={{
              opacity: headerOpacity,
              fontFamily: "'Inter', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(4rem, 10vw, 8rem)",
              lineHeight: 0.9,
              letterSpacing: "-0.04em",
              color: "#18181B",
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <div style={{ overflow: "hidden", paddingBottom: "0.15em", marginBottom: "-0.15em" }}>
              <motion.span
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                style={{ display: "inline-block", color: "#1A1A1A" }}
              >
                ZTH
              </motion.span>
            </div>
            <div style={{ overflow: "hidden", paddingBottom: "0.15em", marginBottom: "-0.15em" }}>
              <motion.span
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                style={{ display: "inline-block", color: "#1976D2" }}
              >
                Insider<span style={{ color: "#1976D2" }}>.</span>
              </motion.span>
            </div>
          </motion.div>

          <motion.p
            style={{
              opacity: pOpacity,
              marginTop: "2.5rem",
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(1.1rem, 1.45vw, 1.3rem)",
              lineHeight: 1.7,
              color: "#4B5563",
              maxWidth: "600px",
              textAlign: "center",
              padding: "0 1.5rem",
              fontWeight: 400,
            }}
          >
            {paragraphText.split(" ").map((word, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: 0.4 + idx * 0.03, ease: [0.16, 1, 0.3, 1] }}
                style={{ display: "inline-block", marginRight: "0.25em" }}
              >
                {word}
              </motion.span>
            ))}
          </motion.p>
        </div>

        {/* Scrolling Cards */}
        <div className="container-lg" style={{
          position: "relative",
          zIndex: 2,
          paddingTop: "90vh",
          paddingBottom: "10vh",
        }}>
          {informationCards.map((item, index) => (
            <TestimonialCard
              key={item.id}
              item={item}
              index={index}
              isEven={index % 2 === 1}
            />
          ))}
        </div>
      </section>
    </>
  );
}
