import React from "react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sourza | Autonomous B2B procurement",
  description:
    "Sourza is Sentiera’s AI-native marketplace connecting industrial manufacturing with GCC enterprise buyers. Full case study coming.",
  alternates: { canonical: "/products/sourza" },
};

export default function Sourza() {
  return (
    <div className="relative bg-white">
      <section className="relative overflow-hidden border-b border-hairline pt-24 pb-16 sm:pt-32 sm:pb-20 bg-slate-950 text-white">
        <div className="relative z-10 mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest-tag text-accent font-semibold mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span>Status: Active / Scaling</span>
          </div>
          <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight-heading">Sourza</h1>
          <p className="mt-4 font-sans text-lg text-slate-300">Autonomous B2B procurement.</p>
        </div>
      </section>

      <section className="py-16 sm:py-24 border-b border-hairline">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 space-y-5 font-sans text-base sm:text-lg text-slate-700 leading-relaxed">
          <p>Sourza is Sentiera’s flagship AI-native marketplace. It connects industrial manufacturing with enterprise buyers in the GCC.</p>
          <p>The product is active and scaling. A full introduction and case study will live on this page once the main site structure is settled.</p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <div className="border border-dashed border-hairline bg-slate-50 p-8">
            <p className="font-mono text-[10px] uppercase tracking-wider text-slate-400">Coming next</p>
            <h2 className="mt-3 font-sans text-2xl font-bold text-slate-950">Case study</h2>
            <p className="mt-3 font-sans text-base text-slate-600">
              Architecture, buyer flow, and how Sourza fits the GCC industrial market. This section will be written after the site launch.
            </p>
          </div>
          <div className="mt-10">
            <Link href="/contact" className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-tech-blue hover:text-tech-blue-600">
              Talk to us about Sourza →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
