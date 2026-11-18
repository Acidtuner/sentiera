"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { resources } from "@/lib/resources";

const LATEST = resources.slice(0, 4);

export default function ResourcesCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % LATEST.length);
    }, 6000);
    return () => window.clearInterval(id);
  }, [paused]);

  const article = LATEST[index];

  return (
    <section
      className="relative overflow-hidden border-b border-hairline bg-white/70 py-20 sm:py-28"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
    >
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden="true"
        style={{
          backgroundImage: "radial-gradient(ellipse 50% 40% at 80% 20%, rgba(255,46,156,0.08), transparent 55%)",
        }}
      />
      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-8">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-slate-400">{"// Resources"}</p>
            <h2 className="mt-4 font-sans text-4xl sm:text-5xl font-bold tracking-tight-heading text-slate-950">
              From the intelligence pathway.
            </h2>
          </div>
          <Link href="/resources" className="hidden sm:inline-flex font-mono text-xs uppercase tracking-wider text-tech-blue hover:underline">
            All resources →
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <Link
            href={`/resources/${article.slug}`}
            className="group lg:col-span-8 border border-hairline bg-white hover:border-accent/40 transition-colors"
          >
            <div className="relative aspect-[3/2] overflow-hidden bg-slate-100">
              <Image
                src={article.image}
                alt={article.imageAlt}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 60vw, 100vw"
              />
            </div>
            <div className="p-6 sm:p-8">
              <p className="font-mono text-[10px] uppercase tracking-wider text-slate-400">
                {article.date} · {article.readTime}
              </p>
              <h3 className="mt-3 font-sans text-2xl sm:text-3xl font-bold tracking-tight-heading text-slate-950 group-hover:text-tech-blue transition-colors">
                {article.title}
              </h3>
              <p className="mt-3 font-sans text-base text-slate-600 leading-relaxed">{article.excerpt}</p>
              <span className="mt-5 inline-block font-mono text-xs uppercase tracking-wider text-tech-blue">Read article →</span>
            </div>
          </Link>

          <div className="lg:col-span-4 flex flex-col justify-between gap-4">
            <div className="grid grid-cols-1 gap-3">
              {LATEST.map((item, itemIndex) => (
                <button
                  key={item.slug}
                  type="button"
                  onClick={() => setIndex(itemIndex)}
                  className={`flex items-center gap-3 border p-3 text-left transition-colors ${
                    itemIndex === index ? "border-tech-blue bg-white" : "border-hairline bg-white/80 hover:border-slate-300"
                  }`}
                >
                  <div className="relative h-14 w-20 flex-shrink-0 overflow-hidden bg-slate-100">
                    <Image src={item.image} alt="" fill className="object-cover" sizes="80px" />
                  </div>
                  <span className="font-sans text-sm font-medium text-slate-800 line-clamp-2">{item.title}</span>
                </button>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400">
                {String(index + 1).padStart(2, "0")} / {String(LATEST.length).padStart(2, "0")}
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setIndex((current) => (current - 1 + LATEST.length) % LATEST.length)}
                  className="h-9 w-9 border border-hairline font-mono text-sm hover:border-accent/40"
                  aria-label="Previous article"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={() => setIndex((current) => (current + 1) % LATEST.length)}
                  className="h-9 w-9 border border-hairline font-mono text-sm hover:border-accent/40"
                  aria-label="Next article"
                >
                  →
                </button>
              </div>
            </div>
            <Link href="/resources" className="sm:hidden font-mono text-xs uppercase tracking-wider text-tech-blue">
              All resources →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
