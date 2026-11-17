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
      <section className="relative overflow-hidden border-b border-hairline pt-24 pb-16 sm:pt-32 sm:pb-20">
        <div className="pointer-events-none absolute inset-0 z-0 opacity-40 [background-image:radial-gradient(#0066FF_0.75px,transparent_0.75px)] [background-size:32px_32px]" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest-tag text-tech-blue font-semibold mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span>About Sentiera</span>
          </div>
          <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight-heading text-slate-950">
            The architects of the AI-first web.
          </h1>
          <p className="mt-6 font-sans text-lg text-slate-700 leading-relaxed">
            We help enterprise brands move from traditional search dependency to being the business AI recommends.
          </p>
        </div>
      </section>

      <section className="relative bg-white py-16 sm:py-24 border-b border-hairline">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 space-y-16">
          <div>
            <h2 className="font-sans text-2xl font-bold text-slate-950">Our vision</h2>
            <p className="mt-4 font-sans text-base sm:text-lg text-slate-700 leading-relaxed">
              The era of ten blue links is ending. Over the next few years, B2B procurement and customer discovery will be increasingly mediated by large language models, AI agents and answer engines. Our vision is to engineer a reliable layer of digital truth for enterprises, so that when AI makes a recommendation, it can recommend our clients.
            </p>
          </div>

          <div>
            <h2 className="font-sans text-2xl font-bold text-slate-950">Our mission</h2>
            <p className="mt-4 font-sans text-base sm:text-lg text-slate-700 leading-relaxed">
              Sentiera Technologies Limited is an AI-native venture studio. We rebuild legacy digital marketing for the AI era. Through Answer Engine Optimisation, structured data and custom agentic workflows, we connect high-value businesses with the AI systems their customers already use.
            </p>
          </div>

          <div>
            <h2 className="font-sans text-2xl font-bold text-slate-950">What we believe</h2>
            <ul className="mt-6 space-y-3">
              <li className="flex items-start gap-3 font-sans text-base text-slate-700"><span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-tech-blue" /><span>Be clear. No jargon in reports or contracts.</span></li>
              <li className="flex items-start gap-3 font-sans text-base text-slate-700"><span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-tech-blue" /><span>Be honest. We say what we can and cannot do.</span></li>
              <li className="flex items-start gap-3 font-sans text-base text-slate-700"><span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-tech-blue" /><span>Build, then advise. Our own products prove the work.</span></li>
            </ul>
          </div>

          <div>
            <h2 className="font-sans text-2xl font-bold text-slate-950">The hybrid execution model</h2>
            <p className="mt-4 font-sans text-base text-slate-700 leading-relaxed">
              Complex AI work needs both strategy and technical execution. Sentiera runs as a consultancy with its own production floor.
            </p>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="border border-hairline p-6">
                <p className="font-mono text-[10px] uppercase tracking-wider text-tech-blue">Masdar City, UAE</p>
                <h3 className="mt-2 font-sans text-lg font-semibold text-slate-950">Strategic leadership</h3>
                <p className="mt-2 font-sans text-sm text-slate-600 leading-relaxed">
                  Enterprise architecture, boardroom strategy and client advisory are led from our headquarters in Abu Dhabi.
                </p>
              </div>
              <div className="border border-hairline p-6">
                <p className="font-mono text-[10px] uppercase tracking-wider text-tech-blue">Bangalore, India</p>
                <h3 className="mt-2 font-sans text-lg font-semibold text-slate-950">Engineering and production</h3>
                <p className="mt-2 font-sans text-sm text-slate-600 leading-relaxed">
                  AI infrastructure, web deployment and structured content are handled by our dedicated technical hub in Bangalore. Scale without the overhead of a traditional local agency.
                </p>
              </div>
            </div>
          </div>

          <blockquote className="border-l-2 border-accent pl-6">
            <p className="font-sans text-lg text-slate-800 leading-relaxed">
              “Having built both physical manufacturing facilities and AI-driven B2B procurement platforms, I know that enterprise growth requires rigorous infrastructure, not marketing fluff. I founded Sentiera to engineer the precise data architectures businesses need to survive and lead the shift to AI-mediated commerce.”
            </p>
            <footer className="mt-4 font-mono text-xs uppercase tracking-wider text-slate-500">
              Jayakumar Attoor, Founder & Lead Architect
            </footer>
          </blockquote>

          <div>
            <h2 className="font-sans text-2xl font-bold text-slate-950">Products</h2>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link href="/products/sourza" className="border border-hairline p-5 hover:border-accent/40">
                <p className="font-mono text-[10px] uppercase tracking-wider text-slate-400">Product</p>
                <p className="mt-2 font-sans text-lg font-semibold text-slate-950">Sourza</p>
                <p className="mt-1 font-sans text-sm text-slate-600">Autonomous B2B procurement for GCC buyers.</p>
              </Link>
              <Link href="/cortex" className="border border-hairline p-5 hover:border-tech-blue/40">
                <p className="font-mono text-[10px] uppercase tracking-wider text-slate-400">Product</p>
                <p className="mt-2 font-sans text-lg font-semibold text-slate-950">Cortex</p>
                <p className="mt-1 font-sans text-sm text-slate-600">A basic AI visibility diagnostic.</p>
              </Link>
            </div>
          </div>

          <div className="text-center">
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-sm bg-tech-blue px-8 py-4 font-mono text-xs font-semibold uppercase tracking-wider text-white shadow-tech-button hover:bg-tech-blue-600">
              Book a boardroom review →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
