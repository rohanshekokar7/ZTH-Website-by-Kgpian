"use client";

import React, { useEffect, useRef } from "react";

export default function CurvedMarquee() {
  const textPathRef = useRef<SVGTextPathElement>(null);

  useEffect(() => {
    let animationFrameId: number;
    let offset = 0;
    let phraseWidth = 0;

    // Measure the exact width of a single phrase repetition to loop seamlessly
    if (textPathRef.current) {
      phraseWidth = textPathRef.current.getComputedTextLength() / 40;
    }

    const animate = () => {
      offset -= 1.5; // adjust speed here

      if (phraseWidth > 0 && offset <= -phraseWidth) {
        offset += phraseWidth;
      } else if (phraseWidth === 0 && offset <= -1000) {
        // Fallback
        offset = 0;
      }

      if (textPathRef.current) {
        textPathRef.current.setAttribute("startOffset", `${offset}px`);
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    // Sometimes text width calculation takes a frame, so we might want to defer the measurement
    // But this approach is usually sufficient.
    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // Repeat the phrase many times to ensure it fills the path
  const phrase = " • BUILT TO RAISE CAPITAL ";
  const repeatedText = phrase.repeat(40);

  return (
    <div className="curved-marquee-container">
      <svg className="curved-marquee-svg" viewBox="0 0 1200 250" preserveAspectRatio="xMidYMid slice" overflow="visible">
        {/* A shallower, smooth sine wave that fits in a smaller height */}
        <path
          id="curve-path"
          d="M -200 125 Q 100 85 400 125 T 1000 125 T 1600 125 T 2200 125 T 2800 125 T 3400 125 T 4000 125 T 4600 125"
          fill="transparent"
          stroke="transparent"
        />
        <text className="curved-marquee-text">
          <textPath href="#curve-path" ref={textPathRef} startOffset="0">
            {repeatedText}
          </textPath>
        </text>
      </svg>
      <style jsx>{`
        .curved-marquee-container {
          width: 100%;
          height: 120px; /* Reduced container height */
          overflow: hidden;
          background: transparent;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          z-index: 5;
          padding: 0; /* Removed padding to make it shorter */
        }
        .curved-marquee-svg {
          width: 100%;
          min-width: 1000px;
          height: 140px; /* Reduced SVG height */
          display: block;
        }
        .curved-marquee-text {
          font-family: 'Playfair Display', 'Georgia', serif;
          font-size: 30px; 
          font-style: normal;
          font-weight: 500;
          letter-spacing: 0.05em;
          fill: #111827; 
        }
      `}</style>
    </div>
  );
}
