"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export default function Terminal() {
  const [objective, setObjective] = useState("");
  const [scale, setScale] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!objective || !scale) return;
    setStatus("submitting");
    setTimeout(() => {
      setStatus("success");
    }, 1200);
  };

  return (
    <footer
      id="contact"
      className="relative bg-[#08090A] text-white pt-28 pb-14 border-t border-white/10 overflow-hidden"
    >
      {/* Background Architectural Grid Accent */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-20 [background-image:linear-gradient(to_right,#ffffff0f_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0f_1px,transparent_1px)] [background-size:56px_56px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 left-1/3 h-[450px] w-[600px] rounded-full bg-tech-blue/10 blur-[150px]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* Terminal Window Frame / Intake Modal */}
        <div className="mx-auto max-w-4xl border border-white/15 bg-slate-950/90 shadow-2xl backdrop-blur-xl">
          {/* CLI Title Bar with macOS / Industrial Window Controls */}
          <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-5 py-3.5 font-mono text-xs text-slate-400">
            <div className="flex items-center gap-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
              <span className="ml-3 text-[11px] uppercase tracking-wider text-slate-400">
                sentiera-terminal // v3.1-exclusive
              </span>
            </div>
            <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest text-slate-500">
              <span className="inline-flex items-center gap-1.5 text-tech-blue">
                <span className="h-1.5 w-1.5 rounded-full bg-tech-blue animate-pulse" />
                SECURE SSL/TLS 1.3
              </span>
              <span className="hidden sm:inline text-white/10">|</span>
              <span className="hidden sm:inline">HOST: MASDAR-NODE-01</span>
            </div>
          </div>

          {/* Terminal Workspace Body */}
          <div className="p-8 sm:p-12 lg:p-16">
            {/* Terminal Heading */}
            <div className="border-b border-white/10 pb-8 mb-10">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-tech-blue font-semibold mb-2">
                <span>INTAKE PROTOCOL</span>
                <span className="text-slate-600">{"//"}</span>
                <span>CONFIDENTIAL TRANSMISSION</span>
              </div>
              <h2 className="font-sans text-4xl sm:text-5xl font-bold tracking-tight-heading text-white">
                Engage Sentiera<span className="text-tech-blue">.</span>
              </h2>
              <p className="mt-3 font-mono text-xs text-slate-400 max-w-xl leading-relaxed">
                Direct conduit to Sentiera partners and principal architects.
                All transmissions are handled with strict institutional non-disclosure.
              </p>
            </div>

            {/* CLI Echo Feed */}
            <div className="mb-8 font-mono text-xs text-slate-500 space-y-1">
              <div>
                <span className="text-tech-blue">$</span> sentiera intake --dispatch=partners --region=masdar
              </div>
              <div className="text-slate-400">
                [OK] Studio pipeline initialized. Configure parameters below:
              </div>
            </div>

            {/* Structured 3-Field Intake Form */}
            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="border border-emerald-500/30 bg-emerald-500/10 p-8 font-mono text-xs text-emerald-400"
              >
                <div className="flex items-center gap-2 text-sm font-bold text-white mb-2">
                  <span className="text-emerald-400">✓</span> TRANSMISSION COMMITTED
                </div>
                <p className="text-slate-300">
                  Your parameters have been logged to the Sentiera core registry. A
                  principal engineer will respond via encrypted channel within 12 hours.
                </p>
                <div className="mt-4 text-[10px] text-slate-400">
                  HASH: 0x8F94...B12A // NODE: MASDAR-CLUSTER-AE
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 font-mono text-xs">
                {/* FIELD 1: System / Objective */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label
                      htmlFor="objective"
                      className="uppercase tracking-widest text-slate-300 font-semibold"
                    >
                      System / Objective <span className="text-tech-blue">*</span>
                    </label>
                    <span className="text-[10px] text-slate-500">PARAM_01</span>
                  </div>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-tech-blue font-bold">
                      &gt;
                    </div>
                    <input
                      id="objective"
                      type="text"
                      required
                      value={objective}
                      onChange={(e) => setObjective(e.target.value)}
                      placeholder="e.g. Autonomous B2B agent architecture, Custom LLM fine-tuning, Sovereign AI infra"
                      className="w-full rounded-none border border-white/15 bg-black/60 py-3.5 pl-9 pr-4 text-white placeholder-slate-600 transition-colors focus:border-tech-blue focus:bg-black/90 focus:outline-none"
                    />
                  </div>
                </div>

                {/* FIELD 2: Current Scale */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label
                      htmlFor="scale"
                      className="uppercase tracking-widest text-slate-300 font-semibold"
                    >
                      Current Scale <span className="text-tech-blue">*</span>
                    </label>
                    <span className="text-[10px] text-slate-500">PARAM_02</span>
                  </div>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-tech-blue font-bold">
                      &gt;
                    </div>
                    <select
                      id="scale"
                      required
                      value={scale}
                      onChange={(e) => setScale(e.target.value)}
                      className="w-full rounded-none border border-white/15 bg-black/60 py-3.5 pl-9 pr-4 text-white transition-colors focus:border-tech-blue focus:bg-black/90 focus:outline-none appearance-none cursor-pointer"
                    >
                      <option value="" disabled className="bg-slate-950 text-slate-500">
                        Select Current Operational Scale...
                      </option>
                      <option value="seed" className="bg-slate-950 text-white">
                        Venture Incubation // Seed ($1M - $5M capital stage)
                      </option>
                      <option value="growth" className="bg-slate-950 text-white">
                        Mid-Market Growth ($10M - $50M ARR / Enterprise scale)
                      </option>
                      <option value="institutional" className="bg-slate-950 text-white">
                        Sovereign Wealth / GCC Tier-1 Government Entity
                      </option>
                      <option value="fellowship" className="bg-slate-950 text-white">
                        Engineering Fellow / Frontier Researcher
                      </option>
                    </select>
                  </div>
                </div>

                {/* FIELD 3: Initiate (Submit Button) */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="group relative flex w-full items-center justify-center gap-3 rounded-none bg-tech-blue py-4 font-mono text-xs font-semibold uppercase tracking-widest text-white shadow-tech-button transition-all duration-300 hover:bg-tech-blue-600 hover:shadow-[0_0_32px_rgba(0,102,255,0.7)] active:scale-[0.99] disabled:opacity-50 cursor-pointer"
                  >
                    <span>
                      {status === "submitting" ? "Compiling Transmission..." : "Initiate"}
                    </span>
                    <span className="transition-transform duration-200 group-hover:translate-x-1">
                      [ENTER ↵]
                    </span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Global Terminal Sub-Footer */}
        <div className="mt-20 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          {/* Bottom Left: Brand & Coordinates */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-3">
              <span className="font-sans text-base font-bold tracking-tight-heading text-tech-blue">
                sentiera
              </span>
              <span className="font-mono text-xs text-slate-500">
                / AI Venture Studio &amp; Digital Agency
              </span>
            </div>
            <div className="font-mono text-[10px] uppercase text-slate-500 tracking-wider">
              LAT 24.4283° N · LON 54.6186° E · TIMEZONE GST (UTC+4)
            </div>
          </div>

          {/* Bottom Right: Specific Required Text in Small Monospaced Tech Font */}
          <div className="sm:text-right">
            <p className="font-mono text-xs text-slate-400 tracking-wide uppercase">
              Operating from Masdar City Free Zone, Abu Dhabi, UAE
            </p>
            <p className="font-mono text-[10px] text-slate-600 mt-1">
              © {new Date().getFullYear()} Sentiera Technologies LLC. All sovereign rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
