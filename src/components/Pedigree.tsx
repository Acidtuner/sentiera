"use client";

import React from "react";
import { motion } from "framer-motion";

interface Partner {
  name: string;
  category: string;
  logo: React.ReactNode;
}

const PARTNERS: Partner[] = [
  {
    name: "Google Cloud",
    category: "Vertex AI & Sovereign Cloud",
    logo: (
      <svg className="h-6 w-auto" viewBox="0 0 192 32" fill="currentColor">
        <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.94 6 12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11c1.56.1 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3z" />
        <text
          x="30"
          y="18"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontSize="13"
          fontWeight="600"
          letterSpacing="-0.02em"
        >
          Google Cloud
        </text>
      </svg>
    ),
  },
  {
    name: "Vercel",
    category: "Edge Compute & Frontend Infra",
    logo: (
      <svg className="h-5 w-auto" viewBox="0 0 116 24" fill="currentColor">
        <path d="M12 1L24 22H0L12 1Z" />
        <text
          x="32"
          y="17"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontSize="14"
          fontWeight="700"
          letterSpacing="-0.03em"
        >
          Vercel
        </text>
      </svg>
    ),
  },
  {
    name: "Meta Llama",
    category: "Open Weights & Foundation Models",
    logo: (
      <svg className="h-5 w-auto" viewBox="0 0 148 24" fill="currentColor">
        <path d="M7.34 3.06C4.85 3.06 2.8 4.67 1.8 6.94 0.68 9.48 0.88 12.38 2.37 14.73 3.86 17.07 6.47 18.52 9.25 18.52c2.72 0 5.17-1.39 6.64-3.69 1.46 2.3 3.92 3.69 6.64 3.69 2.78 0 5.39-1.45 6.88-3.79 1.49-2.35 1.69-5.25.57-7.79C29.02 4.67 26.97 3.06 24.48 3.06c-2.42 0-4.66 1.42-5.74 3.61L18 8.16l-.74-1.49C16.18 4.48 13.94 3.06 11.52 3.06H7.34zm0 2.2h4.18c1.69 0 3.23 1.05 3.98 2.65l1.62 3.47c.39.84 1.37.84 1.76 0l1.62-3.47c.75-1.6 2.29-2.65 3.98-2.65 1.83 0 3.39 1.25 4.19 3.06.91 2.06.74 4.41-.47 6.32-1.21 1.9-3.32 3.08-5.58 3.08-2.07 0-3.95-1.07-5.02-2.86l-.89-1.49-.89 1.49c-1.07 1.79-2.95 2.86-5.02 2.86-2.26 0-4.37-1.18-5.58-3.08-1.21-1.91-1.38-4.26-.47-6.32.8-1.81 2.36-3.06 4.19-3.06z" />
        <text
          x="38"
          y="17"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontSize="13"
          fontWeight="600"
          letterSpacing="-0.02em"
        >
          Meta Llama
        </text>
      </svg>
    ),
  },
  {
    name: "Sarvam AI",
    category: "Indic & Regional Multimodal LLMs",
    logo: (
      <svg className="h-5 w-auto" viewBox="0 0 144 24" fill="currentColor">
        <path d="M4 4h7l5 8-5 8H4l5-8-5-8zm10 0h7l5 8-5 8h-7l5-8-5-8z" />
        <text
          x="34"
          y="17"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontSize="13"
          fontWeight="700"
          letterSpacing="-0.02em"
        >
          Sarvam AI
        </text>
      </svg>
    ),
  },
  {
    name: "NVIDIA",
    category: "Accelerated GPU Infrastructure",
    logo: (
      <svg className="h-5 w-auto" viewBox="0 0 130 24" fill="currentColor">
        <path d="M12.5 4C6.7 4 2 8.7 2 14.5c0 4.2 2.5 7.8 6.1 9.4-.2-.8-.3-1.7-.3-2.6 0-3.8 2.4-7 5.9-8.2-1.3-.9-2.1-2.4-2.1-4.1 0-2.8 2.2-5 5-5 .8 0 1.5.2 2.2.5C17.1 4.2 14.9 4 12.5 4zm-1.8 11.2c-2.4.9-4.1 3.2-4.1 5.9 0 .4 0 .9.1 1.3C4.2 20.8 2.5 18 2.5 14.8c0-5.1 4.1-9.2 9.2-9.2 1.4 0 2.7.3 3.9.9-.4-.1-.8-.1-1.2-.1-2.6 0-4.8 2-5 4.6.4-.4.8-.8 1.3-1.1-.1.4-.2.9-.2 1.3 0 2.2 1.4 4 3.3 4.7-.7.2-1.3.3-2.1.3z" />
        <text
          x="26"
          y="17"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontSize="14"
          fontWeight="800"
          letterSpacing="0.02em"
        >
          NVIDIA
        </text>
      </svg>
    ),
  },
  {
    name: "Mistral AI",
    category: "Efficient Frontier Models",
    logo: (
      <svg className="h-5 w-auto" viewBox="0 0 140 24" fill="currentColor">
        <rect x="0" y="4" width="4" height="4" />
        <rect x="16" y="4" width="4" height="4" />
        <rect x="0" y="8" width="8" height="4" />
        <rect x="12" y="8" width="8" height="4" />
        <rect x="0" y="12" width="20" height="4" />
        <rect x="0" y="16" width="4" height="4" />
        <rect x="8" y="16" width="4" height="4" />
        <rect x="16" y="16" width="4" height="4" />
        <text
          x="28"
          y="17"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontSize="13"
          fontWeight="700"
          letterSpacing="-0.02em"
        >
          Mistral AI
        </text>
      </svg>
    ),
  },
  {
    name: "Databricks",
    category: "Unified Data Intelligence Platform",
    logo: (
      <svg className="h-5 w-auto" viewBox="0 0 148 24" fill="currentColor">
        <path d="M12 2L2 7.2l10 5.2 10-5.2L12 2zm0 6.6L4.8 12.3 12 16l7.2-3.7L12 8.6zm0 7.4L4.8 19.7 12 23.4l7.2-3.7L12 16z" />
        <text
          x="30"
          y="17"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontSize="13"
          fontWeight="600"
          letterSpacing="-0.02em"
        >
          Databricks
        </text>
      </svg>
    ),
  },
  {
    name: "Anthropic",
    category: "Constitutional AI & Safety",
    logo: (
      <svg className="h-5 w-auto" viewBox="0 0 140 24" fill="currentColor">
        <path d="M8.2 3.5h3.6l7.2 17h-3.4l-1.6-3.8H6.5l-1.6 3.8H1.5l6.7-17zm3.1 9.8L9.9 8.2l-1.4 5.1h2.8z" />
        <text
          x="26"
          y="17"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontSize="13"
          fontWeight="700"
          letterSpacing="-0.01em"
        >
          Anthropic
        </text>
      </svg>
    ),
  },
];

export default function Pedigree() {
  // Seamless loop by duplicating the partners array
  const duplicatedPartners = [...PARTNERS, ...PARTNERS];

  return (
    <section
      id="pedigree"
      className="relative border-b border-hairline bg-white py-12 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-hairline/60 pb-3">
          <div className="flex items-center gap-2">
            <span className="h-1 w-1 bg-tech-blue"></span>
            <span className="font-mono text-[10px] uppercase tracking-widest-tag text-slate-400">
              TECHNICAL PEDIGREE // COMPUTE & ECOSYSTEM INTEGRATIONS
            </span>
          </div>
          <span className="font-mono text-[9px] uppercase tracking-wider text-slate-400 hidden sm:inline">
            GCC ENTERPRISE READY · SECURE AIR-GAPPED & HYBRID STACKS
          </span>
        </div>
      </div>

      {/* Marquee Wrapper with soft edge gradient masks for seamless aesthetic */}
      <div className="relative w-full overflow-hidden">
        {/* Left and Right Subtle Fade Masks */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-24 sm:w-36 bg-gradient-to-r from-white via-white/80 to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-24 sm:w-36 bg-gradient-to-l from-white via-white/80 to-transparent" />

        {/* Infinitely Scrolling Track */}
        <motion.div
          className="flex w-max items-center gap-14 sm:gap-20 py-2 cursor-default"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 32,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {duplicatedPartners.map((partner, index) => (
            <div
              key={`${partner.name}-${index}`}
              className="group flex items-center gap-3 text-slate-400 transition-all duration-300 hover:text-slate-900"
              title={`${partner.name} — ${partner.category}`}
            >
              <div className="grayscale opacity-50 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100">
                {partner.logo}
              </div>
              <span className="hidden xl:inline font-mono text-[9px] uppercase tracking-wider text-slate-300 border-l border-hairline pl-2 transition-colors group-hover:text-slate-500">
                {partner.category}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
