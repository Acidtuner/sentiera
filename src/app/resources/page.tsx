import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { resources } from "@/lib/resources";

export const metadata: Metadata = {
  title: "Resources",
  description: "Longform notes from Sentiera Technologies Limited on AI visibility, AEO and the shift away from ten blue links.",
};

export default function Resources() {
  return (
    <div className="relative bg-white">
      <section className="relative overflow-hidden border-b border-hairline pt-24 pb-16 sm:pt-32 sm:pb-20">
        <div className="pointer-events-none absolute inset-0 z-0 opacity-40 [background-image:radial-gradient(#0066FF_0.75px,transparent_0.75px)] [background-size:32px_32px]" aria-hidden="true" />
        <div
          className="pointer-events-none absolute inset-0 z-0"
          aria-hidden="true"
          style={{
            backgroundImage: "radial-gradient(ellipse 55% 45% at 50% 30%, rgba(255,46,156,0.10), transparent 60%)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest-tag text-tech-blue font-semibold mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span>Resources</span>
          </div>
          <h1 className="font-sans text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight-heading text-slate-950 leading-[0.95]">
            Longform.
          </h1>
          <p className="mt-5 font-sans text-lg text-slate-700">Notes on AI visibility and the work behind it.</p>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <ul className="space-y-8">
            {resources.map((post) => (
              <li key={post.slug}>
                <Link href={`/resources/${post.slug}`} className="group grid grid-cols-1 md:grid-cols-5 gap-6 border border-hairline bg-white p-4 sm:p-5 hover:border-accent/40 transition-colors">
                  <div className="md:col-span-2 relative aspect-[3/2] overflow-hidden bg-slate-100">
                    <Image src={post.image} alt={post.imageAlt} fill className="object-cover" sizes="(min-width: 768px) 40vw, 100vw" />
                  </div>
                  <div className="md:col-span-3 flex flex-col justify-center py-2">
                    <p className="font-mono text-[10px] uppercase tracking-wider text-slate-400">
                      {post.date} · {post.readTime}
                    </p>
                    <h2 className="mt-3 font-sans text-2xl sm:text-3xl font-bold tracking-tight-heading text-slate-950 group-hover:text-tech-blue transition-colors">
                      {post.title}
                    </h2>
                    <p className="mt-3 font-sans text-base text-slate-600 leading-relaxed">{post.excerpt}</p>
                    <span className="mt-5 font-mono text-xs uppercase tracking-wider text-tech-blue">Read article →</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
