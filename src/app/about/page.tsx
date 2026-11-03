import React from "react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Sentiera Technologies | Masdar City, Abu Dhabi",
  description: "Sentiera Technologies is a digital marketing and AI team in Masdar City, Abu Dhabi, helping UAE small and medium businesses get found and grow.",
};

export default function About() {
  return (
    <div className="relative bg-white">
      <section className="relative overflow-hidden border-b border-hairline pt-24 pb-16 sm:pt-32 sm:pb-20">
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-40 [background-image:radial-gradient(#0066FF_0.75px,transparent_0.75px)] [background-size:32px_32px]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] h-[360px] bg-tech-blue/5 blur-[120px] rounded-full"
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest-tag text-tech-blue font-semibold mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-tech-blue" />
            <span>About</span>
          </div>
          <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight-heading text-slate-950">
            About Sentiera
          </h1>
        </div>
      </section>

      <section className="relative bg-white py-16 sm:py-24 border-b border-hairline">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <div className="space-y-5 font-sans text-base sm:text-lg text-slate-700 leading-relaxed">
            <p>
              Sentiera Technologies is a digital marketing and software company based in Masdar City, Abu Dhabi.
            </p>
            <p>
              We are a creative and coding team. We use AI agents for much of the production work, and people for the thinking, the standards and the final check.
            </p>
            <p>
              We set up Sentiera for one reason. Small and medium businesses deserve the same quality of marketing as large companies, at a cost that makes sense for them.
            </p>
          </div>

          <div className="mt-16">
            <h2 className="font-sans text-2xl font-bold text-slate-950">What we believe</h2>
            <ul className="mt-6 space-y-3">
              <li className="flex items-start gap-3 font-sans text-base text-slate-700">
                <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-tech-blue" />
                <span>Be clear. No jargon in our reports or our contracts.</span>
              </li>
              <li className="flex items-start gap-3 font-sans text-base text-slate-700">
                <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-tech-blue" />
                <span>Be honest. We tell you what we can and cannot do.</span>
              </li>
              <li className="flex items-start gap-3 font-sans text-base text-slate-700">
                <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-tech-blue" />
                <span>Keep it simple. A few packages, done well.</span>
              </li>
            </ul>
          </div>

          <div className="mt-16 border border-hairline bg-slate-50 p-8">
            <h2 className="font-sans text-xl font-bold text-slate-950">Our founder</h2>
            <p className="mt-3 font-sans text-sm text-slate-500 italic">
              [FOUNDER BIO — to come: name, photo, short bio and details]
            </p>
          </div>

          <div className="mt-16 text-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-sm bg-tech-blue px-8 py-4 font-mono text-xs font-semibold uppercase tracking-wider text-white shadow-tech-button transition-all duration-200 hover:bg-tech-blue-600"
            >
              Get in touch →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
