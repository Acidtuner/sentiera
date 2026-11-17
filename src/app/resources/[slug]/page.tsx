import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getResource, resources } from "@/lib/resources";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return resources.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getResource(slug);
  if (!article) return { title: "Resource" };
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [{ url: article.image, alt: article.imageAlt }],
    },
  };
}

export default async function ResourceArticle({ params }: Props) {
  const { slug } = await params;
  const article = getResource(slug);
  if (!article) notFound();

  return (
    <article className="relative bg-white">
      <header className="relative overflow-hidden border-b border-hairline pt-24 pb-12 sm:pt-32 sm:pb-16">
        <div className="pointer-events-none absolute inset-0 z-0 opacity-40 [background-image:radial-gradient(#0066FF_0.75px,transparent_0.75px)] [background-size:32px_32px]" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-3xl px-6 lg:px-8">
          <Link href="/resources" className="font-mono text-[10px] uppercase tracking-wider text-tech-blue hover:underline">
            ← Resources
          </Link>
          <p className="mt-6 font-mono text-[10px] uppercase tracking-wider text-slate-400">
            {article.date} · {article.readTime}
          </p>
          <h1 className="mt-4 font-sans text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight-heading text-slate-950 leading-[0.98]">
            {article.title}
          </h1>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-6 lg:px-8 py-10">
        <div className="relative aspect-[3/2] overflow-hidden border border-hairline bg-slate-100">
          <Image src={article.image} alt={article.imageAlt} fill className="object-cover" priority sizes="(min-width: 1024px) 896px, 100vw" />
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 lg:px-8 pb-20">
        <div className="space-y-6 font-sans text-base sm:text-lg text-slate-700 leading-relaxed">
          {article.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className="mt-14 border-t border-hairline pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <Link href="/cortex" className="font-mono text-xs uppercase tracking-wider text-tech-blue hover:underline">
            Run a Cortex diagnostic →
          </Link>
          <Link href="/contact" className="inline-flex items-center gap-2 rounded-sm bg-tech-blue px-6 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-white hover:bg-tech-blue-600">
            Book a review
          </Link>
        </div>
      </div>
    </article>
  );
}
