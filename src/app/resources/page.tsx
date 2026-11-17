import React from "react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Resources",
  description: "Longform notes from Sentiera Technologies Limited on AI visibility, AEO and GCC enterprise search.",
};

const posts = [
  {
    slug: "coming-soon",
    title: "First notes are being written.",
    excerpt: "Longform on AI visibility, answer engines and industrial B2B in the GCC will land here.",
    date: "Soon",
  },
];

export default function Resources() {
  return (
    <div className="relative bg-white">
      <section className="relative overflow-hidden border-b border-hairline pt-24 pb-16 sm:pt-32 sm:pb-20">
        <div className="pointer-events-none absolute inset-0 z-0 opacity-40 [background-image:radial-gradient(#0066FF_0.75px,transparent_0.75px)] [background-size:32px_32px]" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest-tag text-tech-blue font-semibold mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span>Resources</span>
          </div>
          <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight-heading text-slate-950">
            Longform.
          </h1>
          <p className="mt-4 font-sans text-lg text-slate-700">Notes on AI visibility and the work behind it.</p>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <ul className="divide-y divide-hairline border-y border-hairline">
            {posts.map((post) => (
              <li key={post.slug} className="py-8">
                <p className="font-mono text-[10px] uppercase tracking-wider text-slate-400">{post.date}</p>
                <h2 className="mt-2 font-sans text-2xl font-bold text-slate-950">{post.title}</h2>
                <p className="mt-2 font-sans text-base text-slate-600">{post.excerpt}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 font-sans text-sm text-slate-500">
            Articles will be added here. For a diagnostic now, use <Link href="/cortex" className="text-tech-blue hover:underline">Cortex</Link>.
          </p>
        </div>
      </section>
    </div>
  );
}
