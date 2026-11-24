"use client";

import React from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import PrismaticLiquidGlassCard from "@/components/PrismaticLiquidGlass";

export default function Hero() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.08 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 22 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] as const } },
  };

  return (
    <section className="relative overflow-hidden bg-white pt-24 pb-20 sm:pt-32 sm:pb-28 lg:pt-36 lg:pb-32 border-b border-hairline">
      <PrismaticLiquidGlassCard />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-white/25" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 z-[1] opacity-30 [background-image:radial-gradient(#0066FF_0.75px,transparent_0.75px)] [background-size:32px_32px]" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col items-center text-center">
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2.5 border border-hairline bg-slate-50/80 px-3.5 py-1.5 backdrop-blur-xs mb-8">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            <span className="font-mono text-[10px] font-medium uppercase tracking-widest-tag text-slate-700">MASDAR CITY, ABU DHABI · UAE</span>
          </motion.div>

          <motion.h1 variants={itemVariants} className="font-sans text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight-heading text-slate-950 leading-[0.92] max-w-5xl">
            Be the business AI recommends<span className="text-tech-blue">.</span>
          </motion.h1>

          <motion.p variants={itemVariants} className="mt-8 max-w-2xl font-sans text-base sm:text-lg text-slate-600 leading-relaxed">
            Traditional search is fading. We architect AI infrastructure and answer-engine optimisation so your enterprise is the entity ChatGPT, Gemini and Google AI recommend.
          </motion.p>

          <motion.div variants={itemVariants} className="mt-10 flex flex-col items-center gap-4">
            <p className="font-mono text-[10px] uppercase tracking-widest text-slate-500">Cortex · free AI visibility snapshot</p>
            <Link href="/cortex" className="inline-flex items-center gap-2 bg-tech-blue px-8 py-4 font-mono text-xs font-semibold uppercase tracking-wider text-white shadow-tech-button transition-all duration-200 hover:bg-tech-blue-600 hover:shadow-accent-glow">
              Get my free snapshot →
            </Link>
            <Link href="/contact" className="font-mono text-xs uppercase tracking-wider text-slate-600 hover:text-tech-blue">
              Prefer to talk? Book a Complimentary Visibility Review.
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
