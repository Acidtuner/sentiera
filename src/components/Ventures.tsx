"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export default function Ventures() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section
      id="ventures"
      className="relative overflow-hidden bg-[#08090A] py-28 sm:py-36 text-white border-b border-white/10"
    >
      {/* Background Architectural Grid & Subtle Radial Atmosphere */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-20 [background-image:linear-gradient(to_right,#ffffff0f_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0f_1px,transparent_1px)] [background-size:56px_56px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-40 right-1/4 h-[500px] w-[500px] rounded-full bg-tech-blue/10 blur-[140px]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-8 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest-tag text-tech-blue font-semibold mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-tech-blue animate-pulse" />
              <span>{"// 01 · Studio Portfolio & Incubations"}</span>
            </div>
            <h2 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight-heading text-white">
              Proprietary IP<span className="text-tech-blue">.</span>
            </h2>
          </div>
          <p className="mt-4 md:mt-0 font-mono text-xs uppercase tracking-wide text-slate-400 max-w-sm leading-relaxed">
            Autonomous venture architectures conceived, engineered, and scaled
            from our Masdar City laboratory.
          </p>
        </div>

        {/* Featured Flagship: Sourza Glassmorphism Card */}
        <div className="relative">
          {/* Subtle Ambient Glow that pulses on card hover */}
          <div
            className={`pointer-events-none absolute -inset-1 rounded-none bg-gradient-to-r from-tech-blue/30 via-tech-blue/10 to-transparent blur-xl transition-opacity duration-500 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden="true"
          />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative rounded-none border border-white/10 bg-white/[0.02] p-8 sm:p-12 lg:p-16 backdrop-blur-2xl transition-all duration-300 hover:border-tech-blue/60 hover:bg-white/[0.04]"
          >
            {/* Top Meta Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6 mb-8 font-mono">
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold uppercase tracking-widest text-slate-300">
                  FLAGSHIP PROTOCOL // 001
                </span>
                <span className="text-slate-600">/</span>
                <span className="text-xs uppercase tracking-wider text-slate-400">
                  B2B COMMERCE &amp; LOGISTICS
                </span>
              </div>

              {/* Mock 'Status: Active' Badge */}
              <div className="inline-flex items-center gap-2 rounded-none border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-emerald-400">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </span>
                <span>Status: Active</span>
              </div>
            </div>

            {/* Core Card Content */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-7">
                <div className="flex items-baseline gap-4">
                  <h3 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight-heading text-white">
                    Sourza
                  </h3>
                  <span className="font-mono text-xs uppercase tracking-widest text-tech-blue font-medium">
                    {"// v2.4 PROD"}
                  </span>
                </div>

                <p className="mt-6 font-sans text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl">
                  An autonomous B2B procurement platform connecting Indian
                  manufacturing with GCC buyers.
                </p>

                <p className="mt-4 font-mono text-xs text-slate-400 leading-relaxed max-w-xl">
                  Replacing archaic manual broker layers with algorithmic supplier
                  qualification, automated RFQ synthesis, cross-border trade escrow,
                  and real-time logistics tracking across the India-Arabian Gulf corridor.
                </p>

                {/* Technical Metric Pills */}
                <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-white/10 pt-6 font-mono">
                  <div>
                    <span className="block text-[10px] uppercase text-slate-500 tracking-wider">
                      Trade Corridor
                    </span>
                    <span className="text-xs font-semibold text-white tracking-wide">
                      India ⇄ GCC
                    </span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase text-slate-500 tracking-wider">
                      Automation Engine
                    </span>
                    <span className="text-xs font-semibold text-tech-blue tracking-wide">
                      Agentic RFQ
                    </span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase text-slate-500 tracking-wider">
                      Settlement
                    </span>
                    <span className="text-xs font-semibold text-white tracking-wide">
                      Multi-Currency FX
                    </span>
                  </div>
                </div>

                {/* External 'View Platform' Link with Glowing Blue Hover State */}
                <div className="mt-10 flex flex-wrap items-center gap-5">
                  <a
                    href="https://sourza.io"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn relative inline-flex items-center gap-3 rounded-none border border-white/20 bg-white/[0.05] px-7 py-3.5 font-mono text-xs font-semibold uppercase tracking-widest text-white backdrop-blur-md transition-all duration-300 hover:border-tech-blue hover:bg-tech-blue hover:text-white hover:shadow-[0_0_28px_rgba(0,102,255,0.65)] active:scale-[0.98]"
                  >
                    <span>View Platform</span>
                    <svg
                      className="h-3.5 w-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7 17L17 7M17 7H7M17 7V17"
                      />
                    </svg>
                  </a>

                  <div className="flex items-center gap-2 font-mono text-[11px] text-slate-400">
                    <span className="h-1 w-1 rounded-full bg-tech-blue" />
                    <span>Incubated &amp; Capitalized by Sentiera Studio</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Architectural Schematic / Live Telemetry Mock */}
              <div className="lg:col-span-5 rounded-none border border-white/10 bg-black/40 p-6 font-mono">
                <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4 text-[10px] text-slate-400">
                  <span>TELEMETRY FEED // SOURZA-CORE</span>
                  <span className="text-emerald-400 font-semibold">ONLINE</span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-slate-500">CORRIDOR NODES:</span>
                    <span className="text-slate-200">Mumbai · Gujarat ⇄ Dubai · Riyadh</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-slate-500">RFQ RESPONSE:</span>
                    <span className="text-tech-blue font-semibold">&lt; 4.2 Minutes</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-slate-500">ESCROW SETTLEMENT:</span>
                    <span className="text-slate-200">Automated Smart LC</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-slate-500">SUPPLIER VERIFICATION:</span>
                    <span className="text-slate-200">100% On-Chain KYC</span>
                  </div>
                </div>

                {/* Simulated Telemetry Log Snippet */}
                <div className="mt-5 rounded-none bg-black/60 p-3 border border-white/5 text-[10px] text-slate-400 space-y-1 font-mono">
                  <div className="text-slate-500">[09:42:11 UTC] AGENT_DISPATCH: RFQ-9021 synthesized</div>
                  <div className="text-slate-300">[09:42:12 UTC] MATCH: 4 GCC verified buyers notified</div>
                  <div className="text-emerald-400">[09:42:15 UTC] CLEARANCE: Customs tariff harmonized</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Secondary Pipeline Preview Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-white/10 bg-white/[0.01] p-6 transition-colors hover:border-white/20">
            <div className="flex items-center justify-between font-mono text-[10px] text-slate-400 mb-2">
              <span>PIPELINE // 002</span>
              <span className="text-tech-blue">IN DEVELOPMENT</span>
            </div>
            <h4 className="font-sans text-xl font-bold text-white">Krypton Labs</h4>
            <p className="mt-2 font-sans text-xs text-slate-400">
              Autonomous execution and liquidity protocol engineered for cross-border treasury management.
            </p>
          </div>

          <div className="border border-white/10 bg-white/[0.01] p-6 transition-colors hover:border-white/20">
            <div className="flex items-center justify-between font-mono text-[10px] text-slate-400 mb-2">
              <span>PIPELINE // 003</span>
              <span className="text-tech-blue">IN DEVELOPMENT</span>
            </div>
            <h4 className="font-sans text-xl font-bold text-white">Aura Neural</h4>
            <p className="mt-2 font-sans text-xs text-slate-400">
              Clinical-grade multimodal diagnostics foundation model optimized for localized Arabic-first healthcare.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
