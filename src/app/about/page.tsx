import React from "react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Sentiera | Masdar City, Abu Dhabi",
  description:
    "Sentiera Technologies Limited is an AI-native venture studio in Masdar City. Strategy in Abu Dhabi. Engineering and production in Bangalore.",
};

export default function About() {
  return (
    <div className="relative bg-white">
      <section className="relative overflow-hidden border-b border-hairline pt-24 pb-16 sm:pt-32 sm:pb-24">
        <div className="pointer-events-none absolute inset-0 z-0 opacity-40 [background-image:radial-gradient(#0066FF_0.75px,transparent_0.75px)] [background-size:32px_32px]" aria-hidden="true" />
        <div
          className="pointer-events-none absolute inset-0 z-0"
          aria-hidden="true"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 55% 45% at 50% 35%, rgba(255,46,156,0.12), transparent 60%)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest-tag text-tech-blue font-semibold mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span>About Sentiera</span>
          </div>
          <h1 className="font-sans text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight-heading text-slate-950 leading-[0.95]">
            The architects of the AI-first web.
          </h1>
          <p className="mt-6 font-sans text-lg sm:text-xl text-slate-700 leading-relaxed max-w-2xl mx-auto">
            We help enterprise brands move from traditional search dependency to being the business AI recommends.
          </p>
        </div>
      </section>

      <section className="relative overflow-hidden border-b border-slate-800 bg-slate-950 text-white py-20 sm:py-28">
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-30"
          aria-hidden="true"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 50% 40% at 15% 20%, rgba(255,46,156,0.18), transparent 55%), radial-gradient(ellipse 40% 35% at 90% 80%, rgba(0,102,255,0.16), transparent 55%)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-8">
          <p className="font-mono text-[10px] uppercase tracking-widest text-slate-400">{"// Direction"}</p>
          <h2 className="mt-4 font-sans text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight-heading max-w-3xl">
            Vision and mission.
          </h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 border border-white/15">
            <div className="bg-white/5 p-8 sm:p-10 border-b md:border-b-0 md:border-r border-white/15">
              <span className="font-mono text-[10px] uppercase tracking-wider text-accent border border-accent/30 px-2 py-0.5">Vision</span>
              <h3 className="mt-6 font-sans text-2xl sm:text-3xl font-bold tracking-tight-heading">A reliable layer of digital truth.</h3>
              <p className="mt-5 font-sans text-base sm:text-lg text-slate-300 leading-relaxed">
                The era of ten blue links is ending. Over the next few years, B2B procurement and customer discovery will be increasingly mediated by large language models, AI agents and answer engines. We engineer the foundation so that when AI makes a recommendation, it can recommend our clients.
              </p>
            </div>
            <div className="bg-white/5 p-8 sm:p-10">
              <span className="font-mono text-[10px] uppercase tracking-wider text-tech-blue border border-tech-blue/30 px-2 py-0.5">Mission</span>
              <h3 className="mt-6 font-sans text-2xl sm:text-3xl font-bold tracking-tight-heading">Rebuild for the AI era.</h3>
              <p className="mt-5 font-sans text-base sm:text-lg text-slate-300 leading-relaxed">
                Sentiera Technologies Limited is an AI-native venture studio. We rebuild legacy digital marketing for the AI era. Through Answer Engine Optimisation, structured data and custom agentic workflows, we connect high-value businesses with the AI systems their customers already use.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative border-b border-hairline bg-white/70 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest-tag text-tech-blue font-semibold mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span>How we work</span>
          </div>
          <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight-heading text-slate-950 max-w-3xl">
            The hybrid execution model.
          </h2>
          <p className="mt-5 max-w-2xl font-sans text-base sm:text-lg text-slate-700 leading-relaxed">
            Complex AI work needs both strategy and technical execution. Sentiera runs as a consultancy with its own production floor.
          </p>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 border border-slate-300">
            <div className="bg-white p-8 sm:p-10 border-b md:border-b-0 md:border-r border-slate-300">
              <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400 border border-slate-200 px-2 py-0.5">Masdar City, UAE</span>
              <h3 className="mt-6 font-sans text-2xl font-bold text-slate-950">Strategic leadership</h3>
              <p className="mt-4 font-sans text-base text-slate-700 leading-relaxed">
                Enterprise architecture, boardroom strategy and client advisory are led from our headquarters in Abu Dhabi.
              </p>
            </div>
            <div className="bg-white p-8 sm:p-10">
              <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400 border border-slate-200 px-2 py-0.5">Bangalore, India</span>
              <h3 className="mt-6 font-sans text-2xl font-bold text-slate-950">Engineering and production</h3>
              <p className="mt-4 font-sans text-base text-slate-700 leading-relaxed">
                AI infrastructure, web deployment and structured content are handled by our dedicated technical hub in Bangalore. Scale without the overhead of a traditional local agency.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative border-b border-slate-800 bg-slate-950 text-white py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <p className="font-mono text-[10px] uppercase tracking-widest text-slate-400">{"// Founder"}</p>
          <blockquote className="mt-6">
            <p className="font-sans text-xl sm:text-2xl leading-relaxed text-slate-100">
              “Having built both physical manufacturing facilities and AI-driven B2B procurement platforms, I know that enterprise growth requires rigorous infrastructure, not marketing fluff. I founded Sentiera to engineer the precise data architectures businesses need to survive and lead the shift to AI-mediated commerce.”
            </p>
            <footer className="mt-6 font-mono text-xs uppercase tracking-wider text-slate-400">
              Jayakumar Attoor · Founder & Lead Architect
            </footer>
          </blockquote>
        </div>
      </section>

      <section className="relative bg-white/70 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <h2 className="font-sans text-3xl sm:text-4xl font-bold tracking-tight-heading text-slate-950">What we believe</h2>
          <ul className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <li className="border border-hairline bg-white p-6 font-sans text-base text-slate-700">Be clear. No jargon in reports or contracts.</li>
            <li className="border border-hairline bg-white p-6 font-sans text-base text-slate-700">Be honest. We say what we can and cannot do.</li>
            <li className="border border-hairline bg-white p-6 font-sans text-base text-slate-700">Build, then advise. Our own products prove the work.</li>
          </ul>

          <h2 className="mt-16 font-sans text-3xl sm:text-4xl font-bold tracking-tight-heading text-slate-950">Products</h2>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/products/sourza" className="border border-hairline bg-white p-6 hover:border-accent/40 transition-colors">
              <p className="font-mono text-[10px] uppercase tracking-wider text-slate-400">Product</p>
              <p className="mt-2 font-sans text-xl font-semibold text-slate-950">Sourza</p>
              <p className="mt-1 font-sans text-sm text-slate-600">Autonomous B2B procurement for GCC buyers.</p>
            </Link>
            <Link href="/cortex" className="border border-hairline bg-white p-6 hover:border-tech-blue/40 transition-colors">
              <p className="font-mono text-[10px] uppercase tracking-wider text-slate-400">Product</p>
              <p className="mt-2 font-sans text-xl font-semibold text-slate-950">Cortex</p>
              <p className="mt-1 font-sans text-sm text-slate-600">A basic AI visibility diagnostic.</p>
            </Link>
          </div>

          <div className="mt-16 text-center">
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-sm bg-tech-blue px-8 py-4 font-mono text-xs font-semibold uppercase tracking-wider text-white shadow-tech-button hover:bg-tech-blue-600 hover:shadow-accent-glow">
              Book a boardroom review →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
