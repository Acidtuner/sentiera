"use client";

import React from "react";
import { motion } from "framer-motion";

interface Step {
  number: string;
  phase: string;
  headline: string;
  desc: string;
  deliverables: string[];
  latency: string;
}

const STEPS: Step[] = [
  {
    number: "01",
    phase: "PHASE_01 // DIAGNOSTIC",
    headline: "Audit & Align",
    desc: "Rigorous stress-testing of technological feasibility, data readiness, and regulatory parameters across the GCC landscape.",
    deliverables: [
      "Algorithmic whitespace & threat model audit",
      "Sovereign data topology & compliance review",
      "Strategic roadmap & ROI qualification",
    ],
    latency: "WEEKS 01 - 03",
  },
  {
    number: "02",
    phase: "PHASE_02 // SYSTEM_BUILD",
    headline: "Architect",
    desc: "Precision engineering of sovereign LLMs, multi-agent autonomous orchestration, and high-performance digital systems.",
    deliverables: [
      "Domain-adapted foundation model fine-tuning",
      "Agentic workflow DAGs & tool synthesis",
      "Air-gapped compute & zero-latency APIs",
    ],
    latency: "WEEKS 04 - 10",
  },
  {
    number: "03",
    phase: "PHASE_03 // SCALE_VECTOR",
    headline: "Accelerate",
    desc: "Production deployment, continuous telemetry observation, institutional integration, and venture-scale commercialization.",
    deliverables: [
      "Zero-downtime production deployment",
      "Live telemetry & drift monitoring systems",
      "Enterprise scaling & GCC partner rollout",
    ],
    latency: "CONTINUOUS // PRODUCTION",
  },
];

export default function Pathway() {
  return (
    <section
      id="pathway"
      className="relative bg-white py-28 sm:py-36 border-b border-hairline overflow-hidden"
    >
      {/* Background Micro-Grid */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-40 [background-image:linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] [background-size:64px_64px]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-hairline pb-8 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest-tag text-tech-blue font-semibold mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-tech-blue" />
              <span>{"// 03 · Operational Methodology"}</span>
            </div>
            <h2 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight-heading text-slate-950">
              The Pathway<span className="text-tech-blue">.</span>
            </h2>
          </div>
          <p className="mt-4 md:mt-0 font-mono text-xs uppercase tracking-wide text-slate-500 max-w-sm leading-relaxed">
            A deterministic 3-stage protocol designed to take frontier AI from
            algorithmic hypothesis to sovereign production.
          </p>
        </div>

        {/* Horizontal Node Pathway Layout */}
        <div className="relative">
          {/* Horizontal Digital Transit Line (Desktop) */}
          <div
            className="hidden lg:block absolute top-[28px] left-[5%] right-[5%] h-[1px] bg-slate-300"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
            {STEPS.map((step, idx) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.7,
                  delay: idx * 0.15,
                  ease: [0.16, 1, 0.3, 1] as const,
                }}
                className="group relative flex flex-col"
              >
                {/* Node Anchor & Minimalist Vertical Connecting Line */}
                <div className="relative flex items-center lg:items-start mb-6">
                  {/* Digital Node Circle with Inner Core */}
                  <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-none border border-slate-900 bg-white shadow-sm transition-all duration-300 group-hover:border-tech-blue group-hover:bg-tech-blue group-hover:text-white">
                    <span className="font-mono text-sm font-bold tracking-wider text-slate-950 group-hover:text-white transition-colors">
                      {step.number}
                    </span>
                    {/* Crosshair micro-accents */}
                    <span className="absolute -top-1 -left-1 text-[8px] font-mono text-slate-400 group-hover:text-tech-blue">
                      +
                    </span>
                    <span className="absolute -bottom-1 -right-1 text-[8px] font-mono text-slate-400 group-hover:text-tech-blue">
                      +
                    </span>
                  </div>

                  {/* Latency Tag Next to Node on Mobile */}
                  <div className="ml-4 lg:hidden">
                    <span className="font-mono text-[10px] text-tech-blue font-semibold tracking-wider">
                      {step.phase}
                    </span>
                  </div>
                </div>

                {/* Minimalist Vertical Line Connecting Node to Content (Digital Bus) */}
                <div className="relative pl-6 sm:pl-8 border-l border-slate-300 group-hover:border-tech-blue transition-colors duration-300 ml-7">
                  {/* Phase & Latency */}
                  <div className="hidden lg:flex items-center justify-between font-mono text-[10px] uppercase text-slate-400 pb-3 border-b border-hairline mb-4">
                    <span className="text-tech-blue font-semibold tracking-wider">
                      {step.phase}
                    </span>
                    <span>{step.latency}</span>
                  </div>

                  {/* Step Heading */}
                  <h3 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight-heading text-slate-950 group-hover:text-tech-blue transition-colors">
                    [{step.number}] {step.headline}
                  </h3>

                  {/* Step Description */}
                  <p className="mt-4 font-sans text-sm text-slate-600 leading-relaxed">
                    {step.desc}
                  </p>

                  {/* Deliverables / Architectural Checkpoints */}
                  <div className="mt-6 pt-4 border-t border-hairline/80 space-y-2.5">
                    <span className="block font-mono text-[9px] uppercase tracking-widest text-slate-400 font-semibold">
                      KEY DELIVERABLES:
                    </span>
                    {step.deliverables.map((item, dIdx) => (
                      <div
                        key={dIdx}
                        className="flex items-start gap-2 font-mono text-xs text-slate-700"
                      >
                        <span className="text-tech-blue mt-0.5 font-bold">›</span>
                        <span className="leading-tight">{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Bottom Pathway Terminal Spec */}
                  <div className="mt-8 pt-3 border-t border-hairline flex items-center justify-between font-mono text-[9px] uppercase tracking-wider text-slate-400">
                    <span>STAGE_GATE // {step.number}</span>
                    <span className="text-slate-900 font-semibold group-hover:text-tech-blue transition-colors">
                      VERIFIED →
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
