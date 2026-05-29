"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const listItem = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" as const } }
};

export default function PitchDeckPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900 pb-32 overflow-x-hidden">
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-200 z-50"
      >
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-sm font-semibold tracking-wider text-slate-900 uppercase hover:text-blue-600 transition-colors">
            ← Back to Home
          </Link>
          <div className="text-xs font-bold tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase">
            ZTH Playbook
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <header className="pt-48 pb-24 px-6 relative">
        <motion.div 
          initial="hidden" 
          animate="visible" 
          variants={staggerContainer} 
          className="max-w-3xl mx-auto text-center"
        >
          <motion.div variants={fadeInUp} className="inline-block mb-6 px-4 py-1.5 bg-blue-50 rounded-full border border-blue-100">
            <span className="text-blue-600 text-sm font-bold tracking-widest uppercase">Masterclass Series</span>
          </motion.div>
          <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-8 leading-tight">
            The Ultimate <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Pitch Deck Playbook
            </span>
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Everything you need to secure your next round of funding, engineered with an investor-first psychology and a bulletproof narrative strategy.
          </motion.p>
        </motion.div>
      </header>

      {/* Content Sections */}
      <main className="max-w-3xl mx-auto px-6 space-y-32">
        
        {/* Founder Narrative */}
        <motion.section id="founder-narrative" className="scroll-mt-32" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-sm font-bold text-blue-600 tracking-widest uppercase">Insider 01</span>
            <div className="h-px bg-slate-200 flex-1"></div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">Founder Narrative</h2>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            Investors don't just invest in ideas; they invest in the people executing them. Your narrative needs to instantly establish trust, immense conviction, and a sense of inevitability. Why are you the only person on earth uniquely qualified to build this?
          </p>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <h3 className="font-semibold text-slate-900 mb-6 uppercase tracking-wider text-sm">Key Slide Requirements</h3>
            <ul className="space-y-4">
              <motion.li variants={listItem} className="flex items-start gap-4 p-3 hover:bg-slate-50 rounded-lg transition-colors">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                <span className="text-slate-700"><strong>Founder-market fit:</strong> Deep domain expertise that gives you an unfair advantage.</span>
              </motion.li>
              <motion.li variants={listItem} className="flex items-start gap-4 p-3 hover:bg-slate-50 rounded-lg transition-colors">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                <span className="text-slate-700"><strong>Contrarian insight:</strong> What truth do you know that the rest of the market completely misunderstands?</span>
              </motion.li>
              <motion.li variants={listItem} className="flex items-start gap-4 p-3 hover:bg-slate-50 rounded-lg transition-colors">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                <span className="text-slate-700"><strong>Vision framing psychology:</strong> Storytelling that makes your success feel pre-destined.</span>
              </motion.li>
            </ul>
          </motion.div>
        </motion.section>

        {/* Investor Thinking */}
        <motion.section id="investor-thinking" className="scroll-mt-32" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-sm font-bold text-blue-600 tracking-widest uppercase">Playbook 02</span>
            <div className="h-px bg-slate-200 flex-1"></div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">Investor Thinking</h2>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            Understanding the meta-game of fundraising. Investors are constantly pattern-matching against their biggest winners and worst losers. You need to trigger their FOMO (Fear Of Missing Out) while simultaneously de-risking their decision.
          </p>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <h3 className="font-semibold text-slate-900 mb-6 uppercase tracking-wider text-sm">Key Slide Requirements</h3>
            <ul className="space-y-4">
              <motion.li variants={listItem} className="flex items-start gap-4 p-3 hover:bg-slate-50 rounded-lg transition-colors">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                <span className="text-slate-700"><strong>Decision-making triggers:</strong> Hitting the psychological checkpoints partners need to see.</span>
              </motion.li>
              <motion.li variants={listItem} className="flex items-start gap-4 p-3 hover:bg-slate-50 rounded-lg transition-colors">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                <span className="text-slate-700"><strong>Red-flag avoidance:</strong> Pre-emptively answering objections before they are even asked.</span>
              </motion.li>
              <motion.li variants={listItem} className="flex items-start gap-4 p-3 hover:bg-slate-50 rounded-lg transition-colors">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                <span className="text-slate-700"><strong>FOMO creation frameworks:</strong> Showing momentum that makes the round highly competitive.</span>
              </motion.li>
            </ul>
          </motion.div>
        </motion.section>

        {/* Market Positioning */}
        <motion.section id="market-positioning" className="scroll-mt-32" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-sm font-bold text-blue-600 tracking-widest uppercase">Signal 03</span>
            <div className="h-px bg-slate-200 flex-1"></div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">Market Positioning</h2>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            Don't just compete in an existing category—create a new one where you are the default leader. Demonstrate that the market is pulling your product out of your hands, and explain exactly why the timing is perfect right now.
          </p>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <h3 className="font-semibold text-slate-900 mb-6 uppercase tracking-wider text-sm">Key Slide Requirements</h3>
            <ul className="space-y-4">
              <motion.li variants={listItem} className="flex items-start gap-4 p-3 hover:bg-slate-50 rounded-lg transition-colors">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                <span className="text-slate-700"><strong>Category creation strategy:</strong> Naming and claiming a massive, untapped market segment.</span>
              </motion.li>
              <motion.li variants={listItem} className="flex items-start gap-4 p-3 hover:bg-slate-50 rounded-lg transition-colors">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                <span className="text-slate-700"><strong>Timing advantage analysis:</strong> Why this company couldn't exist 3 years ago, and why in 3 years it will be too late.</span>
              </motion.li>
              <motion.li variants={listItem} className="flex items-start gap-4 p-3 hover:bg-slate-50 rounded-lg transition-colors">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                <span className="text-slate-700"><strong>Market capture potential:</strong> TAM/SAM/SOM mapped to actual go-to-market mechanics.</span>
              </motion.li>
            </ul>
          </motion.div>
        </motion.section>

        {/* Strategic Moats */}
        <motion.section id="strategic-moats" className="scroll-mt-32" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-sm font-bold text-blue-600 tracking-widest uppercase">Framework 04</span>
            <div className="h-px bg-slate-200 flex-1"></div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">Strategic Moats</h2>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            Capital is a commodity. If your only advantage is having money to spend on ads, you will lose. You must prove you have compounding advantages—network effects, proprietary data, deeply integrated IP, or a unique distribution hack.
          </p>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <h3 className="font-semibold text-slate-900 mb-6 uppercase tracking-wider text-sm">Key Slide Requirements</h3>
            <ul className="space-y-4">
              <motion.li variants={listItem} className="flex items-start gap-4 p-3 hover:bg-slate-50 rounded-lg transition-colors">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                <span className="text-slate-700"><strong>Product differentiation:</strong> A 10x better solution, not just 10% better.</span>
              </motion.li>
              <motion.li variants={listItem} className="flex items-start gap-4 p-3 hover:bg-slate-50 rounded-lg transition-colors">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                <span className="text-slate-700"><strong>Defensibility frameworks:</strong> Why incumbents can't just copy you and leverage their existing distribution.</span>
              </motion.li>
              <motion.li variants={listItem} className="flex items-start gap-4 p-3 hover:bg-slate-50 rounded-lg transition-colors">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                <span className="text-slate-700"><strong>Long-term scalability:</strong> How unit economics improve dramatically at scale.</span>
              </motion.li>
            </ul>
          </motion.div>
        </motion.section>

        {/* Growth Momentum */}
        <motion.section id="growth-momentum" className="scroll-mt-32" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-sm font-bold text-blue-600 tracking-widest uppercase">Strategy 05</span>
            <div className="h-px bg-slate-200 flex-1"></div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">Growth Momentum</h2>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            Traction is the ultimate antidote to investor skepticism. Show them the slope of your growth curve. Focus on retention, viral loops, and the leading indicators that prove you have achieved undeniable Product-Market Fit.
          </p>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <h3 className="font-semibold text-slate-900 mb-6 uppercase tracking-wider text-sm">Key Slide Requirements</h3>
            <ul className="space-y-4">
              <motion.li variants={listItem} className="flex items-start gap-4 p-3 hover:bg-slate-50 rounded-lg transition-colors">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                <span className="text-slate-700"><strong>Early traction indicators:</strong> Revenue, active users, or deep engagement metrics pointing up and to the right.</span>
              </motion.li>
              <motion.li variants={listItem} className="flex items-start gap-4 p-3 hover:bg-slate-50 rounded-lg transition-colors">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                <span className="text-slate-700"><strong>Retention psychology:</strong> Why users stick around (Net Revenue Retention or DAU/MAU ratios).</span>
              </motion.li>
              <motion.li variants={listItem} className="flex items-start gap-4 p-3 hover:bg-slate-50 rounded-lg transition-colors">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                <span className="text-slate-700"><strong>Viral growth loops:</strong> Built-in mechanisms where existing users naturally acquire new users.</span>
              </motion.li>
            </ul>
          </motion.div>
        </motion.section>

        {/* Raise Preparation */}
        <motion.section id="raise-preparation" className="scroll-mt-32" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-sm font-bold text-blue-600 tracking-widest uppercase">Capital 06</span>
            <div className="h-px bg-slate-200 flex-1"></div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">Raise Preparation</h2>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            The final test is proving you are a responsible steward of capital. Don't just ask for money; present a highly detailed plan of exactly how you will deploy those funds to reach the next fundamental valuation milestone.
          </p>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <h3 className="font-semibold text-slate-900 mb-6 uppercase tracking-wider text-sm">Key Slide Requirements</h3>
            <ul className="space-y-4">
              <motion.li variants={listItem} className="flex items-start gap-4 p-3 hover:bg-slate-50 rounded-lg transition-colors">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                <span className="text-slate-700"><strong>Capital deployment strategy:</strong> Specific allocations for engineering, sales, marketing, and operations.</span>
              </motion.li>
              <motion.li variants={listItem} className="flex items-start gap-4 p-3 hover:bg-slate-50 rounded-lg transition-colors">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                <span className="text-slate-700"><strong>Fundraising milestones:</strong> The exact metrics this capital will get you to before the next round (18-24 months of runway).</span>
              </motion.li>
              <motion.li variants={listItem} className="flex items-start gap-4 p-3 hover:bg-slate-50 rounded-lg transition-colors">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                <span className="text-slate-700"><strong>Due diligence readiness:</strong> Having your data room, financial models, and corporate structure immaculate.</span>
              </motion.li>
            </ul>
          </motion.div>
        </motion.section>

      </main>
    </div>
  );
}
