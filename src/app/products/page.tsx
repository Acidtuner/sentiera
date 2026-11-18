import React from "react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Products",
  description: "Sourza and Cortex. Proprietary products from Sentiera Technologies Limited.",
  alternates: { canonical: "/products" },
};

export default function Products() {
  return (
    <div className="relative bg-white">
      <section className="relative overflow-hidden border-b border-hairline pt-24 pb-16 sm:pt-32 sm:pb-20">
        <div className="pointer-events-none absolute inset-0 z-0 opacity-40 [background-image:radial-gradient(#0066FF_0.75px,transparent_0.75px)] [background-size:32px_32px]" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest-tag text-tech-blue font-semibold mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span>Products</span>
          </div>
          <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight-heading text-slate-950">
            What we build.
          </h1>
          <p className="mt-4 font-sans text-lg text-slate-700">Two products. One studio.</p>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/products/sourza" className="border border-hairline bg-white p-8 hover:border-accent/40 transition-colors">
            <p className="font-mono text-[10px] uppercase tracking-wider text-accent">Active / scaling</p>
            <h2 className="mt-4 font-sans text-3xl font-bold text-slate-950">Sourza</h2>
            <p className="mt-4 font-sans text-base text-slate-700 leading-relaxed">
              Autonomous B2B procurement. An AI-native marketplace connecting industrial manufacturing with GCC enterprise buyers.
            </p>
            <span className="mt-6 inline-block font-mono text-xs uppercase tracking-wider text-tech-blue">Introduction →</span>
          </Link>
          <Link href="/cortex" className="border border-hairline bg-white p-8 hover:border-tech-blue/40 transition-colors">
            <p className="font-mono text-[10px] uppercase tracking-wider text-tech-blue">Live</p>
            <h2 className="mt-4 font-sans text-3xl font-bold text-slate-950">Cortex</h2>
            <p className="mt-4 font-sans text-base text-slate-700 leading-relaxed">
              A basic AI visibility check. Enter a company URL and a target keyword. Cortex scores how likely an answer engine is to cite you.
            </p>
            <span className="mt-6 inline-block font-mono text-xs uppercase tracking-wider text-tech-blue">Run diagnostic →</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
