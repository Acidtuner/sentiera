"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";

export default function Hero() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.08,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.75,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section className="relative overflow-hidden bg-white pt-24 pb-20 sm:pt-32 sm:pb-28 lg:pt-36 lg:pb-32 border-b border-hairline">
      {/* Background Micro-Grid & Subtle Radial Glow */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-40 [background-image:radial-gradient(#0066FF_0.75px,transparent_0.75px)] [background-size:32px_32px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] h-[360px] bg-tech-blue/5 blur-[120px] rounded-full"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center"
        >
          {/* Clinical Telemetry / Origin Tag */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2.5 rounded-none border border-hairline bg-slate-50/80 px-3.5 py-1.5 backdrop-blur-xs mb-8"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-tech-blue opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-tech-blue" />
            </span>
            <span className="font-mono text-[10px] font-medium uppercase tracking-widest-tag text-slate-700">
              VENTURE STUDIO // MASDAR CITY, UAE · 24.4283° N, 54.6186° E
            </span>
          </motion.div>

          {/* Massive Headline: Geist Bold, tight tracking */}
          <motion.h1
            variants={itemVariants}
            className="font-sans text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight-heading text-slate-950 leading-[0.92] max-w-5xl"
          >
            The intelligence{" "}
            <span className="inline-block">
              pathway
              <span className="text-tech-blue">.</span>
            </span>
          </motion.h1>

          {/* Sub-headline: Geist Mono, muted color */}
          <motion.p
            variants={itemVariants}
            className="mt-8 max-w-2xl font-mono text-xs sm:text-sm md:text-base font-normal uppercase tracking-wider text-slate-500 leading-relaxed"
          >
            Architecting AI infrastructure and digital growth for the GCC enterprise.
          </motion.p>

          {/* Square-Cornered Primary CTA Button */}
          <motion.div
            variants={itemVariants}
            className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center gap-4"
          >
            <a
              href="#contact"
              className="group relative inline-flex items-center justify-center gap-3 rounded-none bg-tech-blue px-9 py-4 font-mono text-xs font-semibold uppercase tracking-widest text-white shadow-tech-button transition-all duration-200 hover:bg-tech-blue-600 active:scale-[0.99]"
            >
              <span>Initialize</span>
              <span className="font-sans text-sm transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </a>

            <a
              href="#pedigree"
              className="inline-flex items-center justify-center gap-2 rounded-none border border-hairline bg-white/80 px-7 py-4 font-mono text-xs font-medium uppercase tracking-widest text-slate-600 transition-colors hover:border-slate-400 hover:text-slate-950 backdrop-blur-xs"
            >
              <span>Technical Pedigree</span>
              <span className="text-slate-400">↓</span>
            </a>
          </motion.div>

          {/* Micro-Telemetry Bottom Metadata */}
          <motion.div
            variants={itemVariants}
            className="mt-16 pt-8 border-t border-hairline/60 w-full max-w-3xl flex flex-wrap items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-wide-tag text-slate-400"
          >
            <div className="flex items-center gap-2">
              <span className="text-slate-900 font-semibold">FOUNDRY:</span>
              <span>Autonomous Systems</span>
            </div>
            <div className="hidden sm:inline text-slate-300">/</div>
            <div className="flex items-center gap-2">
              <span className="text-slate-900 font-semibold">DEPLOYMENT:</span>
              <span>Enterprise Scale</span>
            </div>
            <div className="hidden sm:inline text-slate-300">/</div>
            <div className="flex items-center gap-2">
              <span className="text-slate-900 font-semibold">PROTOCOL:</span>
              <span className="text-tech-blue">01-VERIFIED</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
