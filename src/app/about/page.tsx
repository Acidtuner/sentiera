import React from "react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Sentiera | Masdar City, Abu Dhabi",
  description:
    "Sentiera Technologies Limited is a Masdar City AI venture studio. Strategy in Abu Dhabi. Execution in Bangalore.",
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
            A venture studio for the AI shortlist.
          </h1>
        </div>
      </section>

      <section className="relative bg-white py-16 sm:py-24 border-b border-hairline">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <div className="space-y-5 font-sans text-base sm:text-lg text-slate-700 leading-relaxed">
            <p>Sentiera Technologies Limited is based in Masdar City Free Zone, Abu Dhabi.</p>
            <p>We build proprietary AI infrastructure and help mid-to-large B2B enterprises in the GCC stay visible when buyers ask an AI assistant for a recommendation.</p>
            <p>Strategy and client leadership sit with us in Abu Dhabi. Design, writing, video and engineering are handled by a dedicated team in Bangalore. You work with one point of contact here, in your time zone.</p>
          </div>

          <div className="mt-16">
            <h2 className="font-sans text-2xl font-bold text-slate-950">What we believe</h2>
            <ul className="mt-6 space-y-3">
              <li className="flex items-start gap-3 font-sans text-base text-slate-700"><span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-tech-blue" /><span>Be clear. No jargon in reports or contracts.</span></li>
              <li className="flex items-start gap-3 font-sans text-base text-slate-700"><span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-tech-blue" /><span>Be honest. We say what we can and cannot do.</span></li>
              <li className="flex items-start gap-3 font-sans text-base text-slate-700"><span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-tech-blue" /><span>Build, then advise. Our own products prove the work.</span></li>
            </ul>
          </div>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-4">
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

          <div className="mt-16 text-center">
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-sm bg-tech-blue px-8 py-4 font-mono text-xs font-semibold uppercase tracking-wider text-white shadow-tech-button hover:bg-tech-blue-600">
              Book a review →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
