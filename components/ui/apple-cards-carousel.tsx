"use client";
import React, {
  useEffect,
  useState,
  createContext,
} from "react";
import {
  IconArrowNarrowLeft,
  IconArrowNarrowRight,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface CarouselProps {
  items: React.ReactNode[];
  initialScroll?: number;
}

type Card = {
  src?: string;
  title: string;
  category?: string;
  desc?: string;
  bullets?: string[];
  color?: string;
};

export const CarouselContext = createContext<{
  onCardClose: (index: number) => void;
  currentIndex: number;
}>({
  onCardClose: () => {},
  currentIndex: 0,
});

export const Carousel = ({ items, initialScroll = 0 }: CarouselProps) => {
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const outerRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
  }, [initialScroll]);

  useEffect(() => {
    const outer = outerRef.current;
    const scroll = carouselRef.current;
    if (!outer || !scroll) return;

    const handleWheel = (e: WheelEvent) => {
      const atEnd = scroll.scrollLeft >= scroll.scrollWidth - scroll.clientWidth - 1;
      const atStart = scroll.scrollLeft <= 0;
      const goingRight = e.deltaY > 0 && !atEnd;
      const goingLeft = e.deltaY < 0 && !atStart;

      if (goingRight || goingLeft) {
        e.preventDefault();
        e.stopPropagation();
        scroll.scrollLeft += e.deltaY * 2;
      }
    };

    outer.addEventListener('wheel', handleWheel, { passive: false });
    return () => outer.removeEventListener('wheel', handleWheel);
  }, []);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const handleCardClose = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = isMobile() ? 230 : 384; // (md:w-96)
      const gap = isMobile() ? 4 : 8;
      const scrollPosition = (cardWidth + gap) * (index + 1);
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  const isMobile = () => {
    return window && window.innerWidth < 768;
  };

  return (
    <CarouselContext.Provider
      value={{ onCardClose: handleCardClose, currentIndex }}
    >
      <div ref={outerRef} className="relative w-full">
        <style>{`
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        <div
          className="flex w-full overflow-x-scroll overscroll-x-auto scroll-smooth py-10 md:py-20"
          ref={carouselRef}
          onScroll={checkScrollability}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' } as React.CSSProperties}
        >
          <div
            className={cn(
              "absolute right-0 z-[1000] h-auto w-[5%] overflow-hidden bg-gradient-to-l",
            )}
          ></div>

          <div
            className={cn(
              "flex flex-row justify-start gap-4 md:gap-6 max-w-none w-full",
            )}
            style={{ paddingLeft: '40px', paddingRight: '24px' }}
          >
            {items.map((item, index) => (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    delay: 0.2 * index,
                    ease: "easeOut",
                  },
                }}
                key={"card" + index}
                className="rounded-3xl"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
        <div className="mr-10 flex justify-end gap-2">
          <button
            className="relative z-40 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 disabled:opacity-50"
            onClick={scrollLeft}
            disabled={!canScrollLeft}
          >
            <IconArrowNarrowLeft className="h-6 w-6 text-gray-500" />
          </button>
          <button
            className="relative z-40 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 disabled:opacity-50"
            onClick={scrollRight}
            disabled={!canScrollRight}
          >
            <IconArrowNarrowRight className="h-6 w-6 text-gray-500" />
          </button>
        </div>
      </div>
    </CarouselContext.Provider>
  );
};

export const Card = ({
  card,
}: {
  card: Card;
  index?: number;
  layout?: boolean;
}) => {
  const bg = card.color || '#ffffff';
  const titleColor = '#0f172a';
  const descColor = '#475569';
  const hasImage = !!card.src;

  return (
    <div
      className="relative z-10 flex h-[24rem] w-64 flex-col items-start justify-start overflow-hidden rounded-[2rem] md:h-[30rem] md:w-80 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.18)] transition-shadow duration-300 cursor-pointer border border-slate-200"
      style={{ background: bg }}
    >
      <div
        className={cn(
          "relative z-40 p-8 md:p-10 w-full",
          !hasImage && "flex-1 pb-10"
        )}
        style={{
          background: 'transparent',
          flexShrink: 0,
        }}
      >
        {card.category && (
          <p className="font-sans text-[13px] font-bold md:text-[14px] mb-2" style={{ color: descColor, textAlign: 'left' }}>
            {card.category}
          </p>
        )}
        <p className="font-serif text-[1.85rem] font-bold tracking-[-0.02em] leading-[1.2] mb-3" style={{ color: titleColor, textAlign: 'left', fontFamily: "'Playfair Display', serif" }}>
          {card.title}
        </p>
        {card.desc && (
          <p className="font-sans text-[0.95rem] leading-[1.6] max-w-[100%]" style={{ color: descColor, textAlign: 'left' }}>
            {card.desc}
          </p>
        )}
        {card.bullets && card.bullets.length > 0 && (
          <ul style={{ marginTop: '1.1rem', paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
            {card.bullets.map((bullet, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.55rem' }}>
                <span style={{ color: '#1976D2', fontSize: '0.75rem', marginTop: '0.22rem', flexShrink: 0, fontWeight: 700 }}>→</span>
                <span style={{ color: descColor, fontSize: '0.875rem', lineHeight: 1.55, fontFamily: "'Inter', sans-serif" }}>{bullet}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {hasImage && card.src && (
        <div className="relative flex-1 w-full mt-auto" style={{ background: 'transparent' }}>
          {/* top fade */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 z-30 h-24"
            style={{ background: 'linear-gradient(to bottom, #f1f5f9, transparent)' }}
          />
          <BlurImage
            src={card.src}
            alt={card.title}
            className="absolute inset-0 z-10 h-full w-full object-cover object-center"
            style={{ opacity: 0.8 }}
          />
        </div>
      )}
    </div>
  );
};

export const BlurImage = ({
  height,
  width,
  src,
  className,
  alt,
  ...rest
}: React.ImgHTMLAttributes<HTMLImageElement>) => {
  const [isLoading, setLoading] = useState(true);
  return (
    <img
      className={cn(
        "h-full w-full transition duration-300",
        isLoading ? "blur-sm" : "blur-0",
        className,
      )}
      onLoad={() => setLoading(false)}
      src={src as string}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      alt={alt ? alt : "Background of a beautiful view"}
      {...rest}
    />
  );
};
