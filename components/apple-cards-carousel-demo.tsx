"use client";

import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

export default function AppleCardsCarouselDemo() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="w-full h-full bg-[#F5F5F7] py-20">
      <div className="w-full px-6 md:px-16 lg:px-24 xl:px-32 mb-10">
        <h2 className="text-left text-3xl md:text-5xl lg:text-[56px] font-extrabold tracking-tight text-black">
          During Fundraising Support
        </h2>
      </div>
      <Carousel items={cards} />
    </div>
  );
}

const data = [
  {
    title: "Investor Meeting Preparation",
    src: "/fundraising_illustration.png",
    desc: "Preparation support for investor conversations, presentations, and fundraising discussions.",
  },
  {
    title: "Pitch Day Support",
    src: "/fundraising_illustration.png",
    desc: "Strategic support during pitch events, demo days, and investor-facing opportunities.",
  },
  {
    title: "Deal Structuring Support",
    src: "/fundraising_illustration.png",
    desc: "Assistance across fundraising structuring, documentation coordination, and strategic financial discussions.",
  },
  {
    title: "Due Diligence Coordination",
    src: "/fundraising_illustration.png",
    desc: "Support for investor data preparation, documentation workflows, and fundraising readiness processes.",
  },
  {
    title: "Investor Communication Support",
    src: "/fundraising_illustration.png",
    desc: "Ongoing support across investor follow-ups, fundraising updates, and strategic communication.",
  },
];
