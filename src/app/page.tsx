import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import Hero from "@/components/Hero";
import ResourcesCarousel from "@/components/ResourcesCarousel";
import TopographicDrift from "@/components/TopographicDrift";

export const metadata: Metadata = {
  title: "The intelligence pathway | Sentiera Technologies Limited",
  description:
    "Sentiera Technologies Limited is a Masdar City AI venture studio. We build proprietary AI infrastructure and help GCC enterprises stay visible in AI answers.",
  alternates: { canonical: "/" },
};

const clients = ["Nidec", "Murata", "TD Power Systems", "Azzurro", "TSI Power"];
const stack = ["Google Cloud", "Vercel", "Meta Llama", "n8n"];

export default function Home() {
  return (
    <div className="relative">
      <Hero />

      <section className="relative border-b border-hairline bg-white/80 py-12 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="font-mono text-[10px] uppercase tracking-widest text-slate-400 mb-6">{"// Trusted entities & infrastructure"}</p>
          <div className="flex flex-wrap gap-x-10 gap-y-3 font-mono text-sm uppercase tracking-wide text-slate-500">
            {clients.map((name) => (
              <span key={name}>{name}</span>
            ))}
            <span className="text-slate-300">·</span>
            {stack.map((name) => (
              <span key={name}>{name}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="relative border-b border-hairline bg-white/70 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest-tag text-tech-blue font-semibold mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span>Enterprise solutions</span>
          </div>
          <h2 className="font-sans text-4xl sm:text-5xl font-bold tracking-tight-heading text-slate-950">
            Bridging raw AI capability and market position.
          </h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 border border-slate-300">
            <div className="bg-white p-8 sm:p-12 border-b md:border-b-0 md:border-r border-slate-300">
              <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400 border border-slate-200 px-2 py-0.5">Project builds</span>
              <h3 className="mt-6 font-sans text-2xl font-bold text-slate-950">AI infrastructure & readiness</h3>
              <p className="mt-4 font-sans text-base text-slate-700 leading-relaxed">
                We rebuild your digital footprint for machine readability. Semantic HTML, FAQ schema and entity-rich content so large language models can extract and cite you. Custom agents and intent workflows built to scale.
              </p>
            </div>
            <div className="bg-white p-8 sm:p-12">
              <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400 border border-slate-200 px-2 py-0.5">Monthly ecosystem</span>
              <h3 className="mt-6 font-sans text-2xl font-bold text-slate-950">The AI visibility retainer</h3>
              <p className="mt-4 font-sans text-base text-slate-700 leading-relaxed">
                Continuous structured content, high-fidelity video and authoritative digital PR that feeds answer engines. The work that keeps a GCC brand on the shortlist after the first build.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ResourcesCarousel />

      <section className="relative overflow-hidden bg-slate-950 text-white py-20 sm:py-28 border-b border-slate-800">
        <TopographicDrift />
        <div className="pointer-events-none absolute inset-0 bg-slate-950/55" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-8">
          <p className="font-mono text-[10px] uppercase tracking-widest text-slate-400">Sentiera Ventures</p>
          <h2 className="mt-4 font-sans text-4xl sm:text-5xl font-bold tracking-tight-heading">We build the infrastructure of tomorrow.</h2>
          <p className="mt-4 max-w-2xl font-sans text-base text-slate-300">
            Sentiera does not only consult. We engineer proprietary platforms.
          </p>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href="/products/sourza" className="group border border-white/10 bg-slate-950/40 p-8 backdrop-blur-sm hover:border-accent/40 transition-colors">
              <div className="flex items-center justify-between">
                <h3 className="font-sans text-2xl font-bold">Sourza</h3>
                <span className="font-mono text-[10px] uppercase tracking-wider text-accent">Active / scaling</span>
              </div>
              <p className="mt-4 font-sans text-sm text-slate-300 leading-relaxed">
                Autonomous B2B procurement. An AI-native marketplace connecting industrial manufacturing with GCC enterprise buyers.
              </p>
              <span className="mt-6 inline-block font-mono text-xs uppercase tracking-wider text-white group-hover:text-accent">View Sourza →</span>
            </Link>
            <Link href="/cortex" className="group border border-white/10 bg-slate-950/40 p-8 backdrop-blur-sm hover:border-tech-blue/40 transition-colors">
              <div className="flex items-center justify-between">
                <h3 className="font-sans text-2xl font-bold">Cortex</h3>
                <span className="font-mono text-[10px] uppercase tracking-wider text-tech-blue">Live diagnostic</span>
              </div>
              <p className="mt-4 font-sans text-sm text-slate-300 leading-relaxed">
                A basic AI visibility check. Enter a URL and a commercial keyword. Cortex scores citation probability, entity health and RAG readiness.
              </p>
              <span className="mt-6 inline-block font-mono text-xs uppercase tracking-wider text-white group-hover:text-tech-blue">Run Cortex →</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="relative border-b border-hairline bg-white/70 py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest-tag text-tech-blue font-semibold mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span>Delivery</span>
          </div>
          <h2 className="font-sans text-4xl sm:text-5xl font-bold tracking-tight-heading text-slate-950">
            Abu Dhabi strategy. Bangalore execution.
          </h2>
          <p className="mt-6 font-sans text-base sm:text-lg text-slate-700 leading-relaxed">
            Operating from Masdar City Free Zone, our strategic leadership partners directly with your boardroom. Execution is handled by a dedicated engineering and design facility in Bangalore. Enterprise-grade output, without the overhead of a bloated agency.
          </p>
        </div>
      </section>

      <section className="relative bg-white/70 py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <h2 className="font-sans text-4xl sm:text-5xl font-bold tracking-tight-heading text-slate-950">Initiate the pathway.</h2>
          <p className="mt-6 font-sans text-base sm:text-lg text-slate-700 leading-relaxed">
            Book a 45-minute complimentary visibility review. We will map why AI is missing your brand, and how to fix it.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-sm bg-tech-blue px-8 py-4 font-mono text-xs font-semibold uppercase tracking-wider text-white shadow-tech-button transition-all duration-200 hover:bg-tech-blue-600 hover:shadow-accent-glow">
              Book boardroom review →
            </Link>
            <Link href="/cortex" className="inline-flex items-center gap-2 border border-hairline bg-white/80 px-7 py-4 font-mono text-xs font-medium uppercase tracking-widest text-slate-600 hover:border-accent/40">
              Run Cortex first
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
