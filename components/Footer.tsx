"use client";

import { useEffect, useRef, useState } from "react";

const footerWords = ["create", "convert", "scale"];

/* ── Every typed line in the footer ───────────────────────────────── */
const LINES = [
  // Contact
  { id: "email",   value: "admin@zth.co.in",        href: "mailto:admin@zth.co.in", delay: 300  },
  { id: "phone1",  value: "+91 721 942 2299",        href: "tel:+917219422299",      delay: 900  },
  { id: "phone2",  value: "+91 93566 17639",         href: "tel:+919356617639",      delay: 1500 },
  // Navigate
  { id: "nav0",    value: "About",                   href: "#",                      delay: 200  },
  { id: "nav1",    value: "Services",                href: "#",                      delay: 420  },
  { id: "nav2",    value: "Pitch Deck",              href: "#",                      delay: 640  },
  { id: "nav3",    value: "Mock Room",               href: "#",                      delay: 860  },
  { id: "nav4",    value: "Investors",               href: "#",                      delay: 1080 },
  // Follow
  { id: "soc0",    value: "LinkedIn ↗",             href: "https://www.linkedin.com/company/zth2/", delay: 350 },
  { id: "soc1",    value: "X ↗",                    href: "https://x.com/Zthsass",  delay: 620  },
  // Bottom
  { id: "copy",    value: `© ${new Date().getFullYear()} Zth, Inc. All rights reserved.`, href: null, delay: 1800 },
  { id: "backtxt", value: "Back to top",            href: null,                     delay: 1700 },
];

export default function Footer({ onCTAClick }: { onCTAClick?: () => void }) {
  /* ── Flip word animation ─────────────────────────────────────── */
  const [wordIndex, setWordIndex] = useState(0);
  const [flipClass, setFlipClass] = useState("");

  useEffect(() => {
    const id = setInterval(() => {
      setFlipClass("flip-out");
      setTimeout(() => { setWordIndex(i => (i + 1) % footerWords.length); setFlipClass("flip-in"); }, 280);
      setTimeout(() => setFlipClass(""), 580);
    }, 2600);
    return () => clearInterval(id);
  }, []);

  /* ── Typing animation ────────────────────────────────────────── */
  const footerRef = useRef<HTMLElement>(null);
  const [started, setStarted] = useState(false);
  const [typed, setTyped] = useState<Record<string, string>>(
    Object.fromEntries(LINES.map(l => [l.id, ""]))
  );

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setStarted(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const tos: ReturnType<typeof setTimeout>[] = [];
    const ivs: ReturnType<typeof setInterval>[] = [];
    LINES.forEach(({ id, value, delay }) => {
      const t = setTimeout(() => {
        let i = 0;
        const iv = setInterval(() => {
          i++;
          setTyped(p => ({ ...p, [id]: value.slice(0, i) }));
          if (i >= value.length) clearInterval(iv);
        }, 52);
        ivs.push(iv);
      }, delay);
      tos.push(t);
    });
    return () => { tos.forEach(clearTimeout); ivs.forEach(clearInterval); };
  }, [started]);

  /* ── Helper: typed span with blinking cursor ─────────────────── */
  const T = ({ id, href, cls = "" }: { id: string; href: string | null; cls?: string }) => {
    const val  = LINES.find(l => l.id === id)!.value;
    const done = typed[id].length >= val.length;
    const node = (
      <>
        {typed[id]}
        {!done && typed[id].length > 0 && <span className="ft-cur" aria-hidden>|</span>}
      </>
    );
    if (!href) return <span className={`ft-tv ${cls}`}>{node}</span>;
    const isExt = href.startsWith("http");
    return (
      <a href={href} className={`ft-tv ft-lnk ${cls}`}
        {...(isExt ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {node}
      </a>
    );
  };

  return (
    <footer className="ft-root" ref={footerRef}>
      <div className="ft-glow" />
      <div className="ft-wrap">

        {/* ── TOP: headline left + 3 cols right ─────────────────── */}
        <div className="ft-top">

          {/* Headline */}
          <div className="ft-brand">
            <span className="ft-eyebrow">/ Let&apos;s work together</span>
            <h2 className="ft-headline">
              let&apos;s{" "}
              <span className={`ft-flip ${flipClass}`}>{footerWords[wordIndex]}</span>
              {" "}together
            </h2>
            <button className="ft-cta" onClick={onCTAClick}>
              Book a free call
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M1 6.5h11M6.5 1l5.5 5.5L6.5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {/* 3 columns */}
          <div className="ft-cols">

            {/* Contact */}
            <div className="ft-col">
              <span className="ft-col-lbl">/ Contact</span>
              <div className="ft-col-body">
                <div className="ft-grp">
                  <span className="ft-key">Email</span>
                  <T id="email" href="mailto:admin@zth.co.in" />
                </div>
                <div className="ft-grp">
                  <span className="ft-key">Phone</span>
                  <T id="phone1" href="tel:+917219422299" />
                  <T id="phone2" href="tel:+919356617639" />
                </div>
              </div>
            </div>

            {/* Navigate */}
            <div className="ft-col">
              <span className="ft-col-lbl">/ Navigate</span>
              <nav className="ft-col-body">
                <T id="nav0" href="#" cls="ft-nav" />
                <T id="nav1" href="#" cls="ft-nav" />
                <T id="nav2" href="#" cls="ft-nav" />
                <T id="nav3" href="#" cls="ft-nav" />
                <T id="nav4" href="#" cls="ft-nav" />
              </nav>
            </div>

            {/* Follow */}
            <div className="ft-col">
              <span className="ft-col-lbl">/ Follow</span>
              <div className="ft-col-body">
                <T id="soc0" href="https://www.linkedin.com/company/zth2/" cls="ft-nav" />
                <T id="soc1" href="https://x.com/Zthsass" cls="ft-nav" />
              </div>
            </div>

          </div>
        </div>

        {/* ── Divider ───────────────────────────────────────────── */}
        <div className="ft-div" />

        {/* ── Bottom bar ────────────────────────────────────────── */}
        <div className="ft-bot">
          <div className="ft-bot-l">
            <span className="ft-logo">Zth</span>
            <T id="copy" href={null} cls="ft-copy" />
          </div>
          <button className="ft-uptbtn" onClick={() => { onCTAClick?.(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
            <T id="backtxt" href={null} />
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M6.5 11V2M2 6.5l4.5-4.5 4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

      </div>

      <style jsx>{`
        .ft-root {
          position: relative;
          background: #eef5ff;
          color: #111827;
          font-family: 'Inter', sans-serif;
          overflow: hidden;
          border-top: 1px solid rgba(0,119,194,0.12);
        }
        .ft-glow {
          position: absolute; top: -80px; right: 10%;
          width: 400px; height: 400px; border-radius: 50%;
          background: radial-gradient(circle, rgba(0,119,194,0.08) 0%, transparent 65%);
          filter: blur(60px); pointer-events: none;
        }
        .ft-wrap {
          position: relative; z-index: 1;
          max-width: 1200px; margin: 0 auto;
          padding: clamp(3.5rem,7vw,5.5rem) clamp(1.25rem,5vw,3rem) 0;
        }
        .ft-top {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: clamp(2rem,6vw,6rem);
          align-items: start;
          padding-bottom: clamp(2.5rem,5vw,4rem);
        }
        /* Brand */
        .ft-brand { display: flex; flex-direction: column; gap: 0; }
        .ft-eyebrow {
          display: block; font-size: 0.65rem; font-weight: 700;
          letter-spacing: 0.3em; text-transform: uppercase;
          color: #9ca3af; margin-bottom: 1.1rem;
        }
        .ft-headline {
          font-size: clamp(2.4rem,4.5vw,3.8rem);
          font-weight: 900; line-height: 1.0;
          letter-spacing: -0.04em; color: #111827;
          margin: 0 0 2rem;
        }
        /* Flip word */
        .ft-flip {
          display: inline-block; color: #0077c2;
          white-space: nowrap;
          transform-origin: center;
          transform-style: preserve-3d;
          backface-visibility: hidden;
        }
        .ft-flip.flip-out { animation: flip-out 0.28s cubic-bezier(0.4,0,1,1) forwards; }
        .ft-flip.flip-in  { animation: flip-in  0.30s cubic-bezier(0,0,0.6,1)   forwards; }
        @keyframes flip-out {
          from { transform: rotateX(0)     scaleY(1);   opacity: 1; }
          to   { transform: rotateX(90deg) scaleY(0.4); opacity: 0; }
        }
        @keyframes flip-in {
          from { transform: rotateX(-90deg) scaleY(0.4); opacity: 0; }
          to   { transform: rotateX(0)      scaleY(1);   opacity: 1; }
        }
        /* CTA */
        .ft-cta {
          display: inline-flex; align-items: center; gap: 0.5rem;
          padding: 0.7rem 1.5rem;
          background: #0077c2; color: #fff;
          border: none; border-radius: 100px;
          font-family: 'Inter', sans-serif; font-size: 0.82rem; font-weight: 600;
          cursor: pointer; transition: all 0.25s ease;
          box-shadow: 0 4px 20px rgba(0,119,194,0.2);
          align-self: flex-start;
        }
        .ft-cta:hover { background: #0087db; transform: translateY(-2px); box-shadow: 0 8px 28px rgba(0,119,194,0.3); }
        /* Columns */
        .ft-cols { display: grid; grid-template-columns: repeat(3,1fr); gap: clamp(1.5rem,4vw,3rem); align-items: start; }
        .ft-col  { display: flex; flex-direction: column; gap: 1.1rem; }
        .ft-col-lbl {
          display: block; font-size: 0.62rem; font-weight: 700;
          letter-spacing: 0.38em; text-transform: uppercase;
          color: #9ca3af;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid rgba(0,0,0,0.08);
        }
        .ft-col-body { display: flex; flex-direction: column; gap: 0.55rem; }
        .ft-grp { display: flex; flex-direction: column; gap: 0.2rem; margin-bottom: 0.6rem; }
        .ft-key {
          font-size: 0.6rem; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: #d1d5db;
        }
        /* Typed value */
        .ft-tv {
          font-size: 0.88rem; font-weight: 400;
          color: #374151; line-height: 1.5;
          min-height: 1.3em;
        }
        .ft-lnk { text-decoration: none; transition: color 0.2s ease; }
        .ft-lnk:hover { color: #0077c2; }
        .ft-nav { font-size: 0.9rem; font-weight: 500; color: #374151; transition: color 0.2s ease, transform 0.2s ease; display: inline-flex; align-items: center; width: fit-content; }
        .ft-nav:hover { color: #0077c2; transform: translateX(3px); }
        /* Blinking cursor */
        .ft-cur {
          display: inline-block; color: #0077c2; font-weight: 300;
          margin-left: 1px;
          animation: blink 0.75s step-end infinite;
        }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        /* Divider */
        .ft-div { width: 100%; height: 1px; background: linear-gradient(90deg, transparent, rgba(0,119,194,0.15), transparent); }
        /* Bottom bar */
        .ft-bot {
          display: flex; align-items: center; justify-content: space-between;
          padding: 1.25rem 0 clamp(1.5rem,3vw,2rem); gap: 1rem;
        }
        .ft-bot-l { display: flex; align-items: center; gap: 1.25rem; }
        .ft-logo {
          font-size: 1.1rem; font-weight: 900; letter-spacing: -0.04em;
          background: linear-gradient(135deg, #0077c2, #44a8ee);
          -webkit-background-clip: text; background-clip: text; color: transparent;
        }
        .ft-copy { font-size: 0.72rem; color: #9ca3af; font-weight: 400; }
        .ft-uptbtn {
          display: inline-flex; align-items: center; gap: 0.5rem;
          background: none; border: 1px solid rgba(0,0,0,0.1);
          border-radius: 100px; padding: 0.45rem 1rem;
          font-family: 'Inter', sans-serif; font-size: 0.75rem; font-weight: 500;
          color: #6b7280; cursor: pointer;
          transition: all 0.25s ease;
        }
        .ft-uptbtn:hover { border-color: #0077c2; color: #0077c2; transform: translateY(-2px); }
        /* Responsive */
        @media (max-width: 960px) {
          .ft-top { grid-template-columns: 1fr; gap: 2.5rem; }
        }
        @media (max-width: 600px) {
          .ft-cols { grid-template-columns: 1fr 1fr; }
          .ft-col:last-child { grid-column: span 2; }
          .ft-bot { flex-direction: column; align-items: flex-start; }
          .ft-copy { display: none; }
        }
      `}</style>


    </footer>
  );
}
