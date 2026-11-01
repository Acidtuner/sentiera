"use client";

import React from "react";
import { motion } from "framer-motion";

interface CapabilityItem {
  name: string;
  desc: string;
  metrics: string;
}

const INTELLIGENCE_ITEMS: CapabilityItem[] = [
  {
    name: "Custom LLM Integration",
    desc: "Domain-specific fine-tuning, quantized local inference, retrieval-augmented generation (RAG), and air-gapped sovereign models designed for proprietary data security.",
    metrics: "SOVEREIGN / SECURE / AIR-GAPPED",
  },
  {
    name: "Voice-to-Intent Workflows",
    desc: "Sub-second speech-to-semantic intent pipelines with native dialect support (Khaleeji & Modern Standard Arabic), autonomous phone dispatchers, and conversational audio agents.",
    metrics: "SUB-300MS / MULTI-DIALECT / DUPLEX",
  },
  {
    name: "Automation Pipelines",
    desc: "Multi-agent autonomous swarms, asynchronous task graphs, self-healing API integrations, and continuous data pipelines that automate mission-critical enterprise workflows.",
    metrics: "AUTONOMOUS / AGENTIC / CONTINUOUS",
  },
];

const GROWTH_ITEMS: CapabilityItem[] = [
  {
    name: "Strategic Communication",
    desc: "High-conviction market positioning, investor syndication narratives, and authoritative executive communications that position ventures as category definers.",
    metrics: "VENTURE POSITIONING / CATEGORY DESIGN",
  },
  {
    name: "Enterprise Identity",
    desc: "Monolithic, high-end design systems, clinical user experience architectures, and digital flagships that command immediate institutional respect.",
    metrics: "BOUTIQUE UI/UX / RADICAL MINIMALISM",
  },
  {
    name: "Go-to-Market Execution",
    desc: "High-leverage enterprise customer acquisition channels, pilot conversion frameworks, and strategic ecosystem alliances across the GCC.",
    metrics: "GCC DISTRIBUTION / INSTITUTIONAL PILOTS",
  },
];

export default function Capabilities() {
  return (
    <section
      id="capabilities"
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
              <span>{"// 02 · Technical Disciplines & Studio Practice"}</span>
            </div>
            <h2 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight-heading text-slate-950">
              Capabilities<span className="text-tech-blue">.</span>
            </h2>
          </div>
          <p className="mt-4 md:mt-0 font-mono text-xs uppercase tracking-wide text-slate-500 max-w-sm leading-relaxed">
            Rigorous engineering standards paired with elite venture execution for
            the GCC&apos;s most demanding enterprises.
          </p>
        </div>

        {/* 2-Column Industrial Grid with visible 1px borders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-slate-300 bg-slate-200">
          {/* COLUMN 1: Intelligence & AI Architecture */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
            className="group relative bg-white p-8 sm:p-12 lg:p-14 border-b md:border-b-0 md:border-r border-slate-300 flex flex-col justify-between"
          >
            {/* Top Industrial Index & Technical Tag */}
            <div>
              <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-8">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold tracking-widest text-tech-blue">
                    [01]
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-slate-400">
                    CORE INTELLIGENCE ARCHITECTURE
                  </span>
                </div>
                <span className="font-mono text-[9px] uppercase tracking-wider text-slate-400 border border-slate-200 px-2 py-0.5 bg-slate-50">
                  SYSTEM ENGINE
                </span>
              </div>

              {/* Column Headline */}
              <h3 className="font-sans text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight-heading text-slate-950 group-hover:text-tech-blue transition-colors">
                Intelligence &amp; AI Architecture
              </h3>

              <p className="mt-4 font-sans text-sm text-slate-600 leading-relaxed">
                Foundational machine intelligence systems engineered for institutional
                reliability, data sovereignty, and algorithmic advantage.
              </p>

              {/* Detailed Disciplines */}
              <div className="mt-10 space-y-8">
                {INTELLIGENCE_ITEMS.map((item, idx) => (
                  <div
                    key={idx}
                    className="relative pl-4 border-l-2 border-slate-200 hover:border-tech-blue transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-sans text-base sm:text-lg font-bold text-slate-900">
                        {item.name}
                      </h4>
                      <span className="font-mono text-[9px] font-semibold text-tech-blue">
                        {item.metrics}
                      </span>
                    </div>
                    <p className="mt-2 font-sans text-xs sm:text-sm text-slate-500 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Stack Badges */}
            <div className="mt-12 pt-6 border-t border-slate-200 flex flex-wrap items-center gap-2 font-mono text-[10px] text-slate-500">
              <span className="uppercase text-slate-400 mr-1 font-semibold">STACK:</span>
              {["PyTorch", "vLLM", "LangGraph", "NVIDIA TensorRT", "Air-Gapped Clusters"].map(
                (tech, i) => (
                  <span
                    key={i}
                    className="border border-slate-200 bg-slate-50 px-2 py-1 text-slate-700"
                  >
                    {tech}
                  </span>
                )
              )}
            </div>
          </motion.div>

          {/* COLUMN 2: Digital Growth & Brand Ecosystems */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const }}
            className="group relative bg-white p-8 sm:p-12 lg:p-14 flex flex-col justify-between"
          >
            {/* Top Industrial Index & Technical Tag */}
            <div>
              <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-8">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold tracking-widest text-tech-blue">
                    [02]
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-slate-400">
                    MARKET VECTOR &amp; VENTURE SCALE
                  </span>
                </div>
                <span className="font-mono text-[9px] uppercase tracking-wider text-slate-400 border border-slate-200 px-2 py-0.5 bg-slate-50">
                  GTM CATALYST
                </span>
              </div>

              {/* Column Headline */}
              <h3 className="font-sans text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight-heading text-slate-950 group-hover:text-tech-blue transition-colors">
                Digital Growth &amp; Brand Ecosystems
              </h3>

              <p className="mt-4 font-sans text-sm text-slate-600 leading-relaxed">
                Transforming computational horsepower into sovereign market leadership,
                institutional narrative dominance, and high-velocity enterprise traction.
              </p>

              {/* Detailed Disciplines */}
              <div className="mt-10 space-y-8">
                {GROWTH_ITEMS.map((item, idx) => (
                  <div
                    key={idx}
                    className="relative pl-4 border-l-2 border-slate-200 hover:border-tech-blue transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-sans text-base sm:text-lg font-bold text-slate-900">
                        {item.name}
                      </h4>
                      <span className="font-mono text-[9px] font-semibold text-tech-blue">
                        {item.metrics}
                      </span>
                    </div>
                    <p className="mt-2 font-sans text-xs sm:text-sm text-slate-500 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Stack Badges */}
            <div className="mt-12 pt-6 border-t border-slate-200 flex flex-wrap items-center gap-2 font-mono text-[10px] text-slate-500">
              <span className="uppercase text-slate-400 mr-1 font-semibold">ECOSYSTEM:</span>
              {["Next.js App Router", "Design Systems", "Institutional Syndication", "GCC Enterprise GTM"].map(
                (tech, i) => (
                  <span
                    key={i}
                    className="border border-slate-200 bg-slate-50 px-2 py-1 text-slate-700"
                  >
                    {tech}
                  </span>
                )
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
