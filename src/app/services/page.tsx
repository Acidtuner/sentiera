import React from "react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services | SEO, AEO, Photo, Video, Events and AI",
  description: "SEO and AEO, photography and videography, events marketing, social media management, and AI chatbots and automations for UAE businesses.",
};

export default function Services() {
  return (
    <div className="relative bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest-tag text-tech-blue font-semibold mb-4">
          <span className="h-1.5 w-1.5 rounded-full bg-tech-blue" />
          <span>Services</span>
        </div>
        <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight-heading text-slate-950">
          What we do
        </h1>
        <p className="mt-6 font-sans text-lg text-slate-700 leading-relaxed">
          Five services, combined into packages so they work together. Every package includes some AI integration, scaled to the package.
        </p>

        <div className="mt-16 space-y-16">
          <section>
            <h2 className="font-sans text-2xl sm:text-3xl font-bold text-slate-950">SEO and AEO</h2>
            <p className="mt-3 font-sans text-base text-slate-700">Get found in Google and in AI answers like ChatGPT.</p>
            <ul className="mt-4 space-y-2 font-sans text-sm text-slate-600 list-disc list-inside">
              <li>Website and search audit</li>
              <li>Pages written around the questions customers ask</li>
              <li>Google Business Profile and local listings</li>
              <li>Structured data and technical fixes</li>
              <li>Monthly reporting in plain language</li>
            </ul>
          </section>

          <section>
            <h2 className="font-sans text-2xl sm:text-3xl font-bold text-slate-950">Photography and videography</h2>
            <p className="mt-3 font-sans text-base text-slate-700">Content that shows what you do.</p>
            <ul className="mt-4 space-y-2 font-sans text-sm text-slate-600 list-disc list-inside">
              <li>Planned shoots at your premises</li>
              <li>Short videos for social and your website</li>
              <li>Product, team and location photography</li>
              <li>Edited and delivered in the formats each channel needs</li>
            </ul>
          </section>

          <section>
            <h2 className="font-sans text-2xl sm:text-3xl font-bold text-slate-950">Events marketing</h2>
            <p className="mt-3 font-sans text-base text-slate-700">Help before, during and after an event you run or attend.</p>
            <ul className="mt-4 space-y-2 font-sans text-sm text-slate-600 list-disc list-inside">
              <li>Pre-event promotion across social, email and your website</li>
              <li>Photo and video coverage on the day</li>
              <li>Same-day social posts and short highlight clips</li>
              <li>Follow-up content after the event, reused across search and social</li>
            </ul>
          </section>

          <section>
            <h2 className="font-sans text-2xl sm:text-3xl font-bold text-slate-950">Social media management</h2>
            <p className="mt-3 font-sans text-base text-slate-700">Steady, on-brand posting.</p>
            <ul className="mt-4 space-y-2 font-sans text-sm text-slate-600 list-disc list-inside">
              <li>Monthly content calendar</li>
              <li>Captions, design and scheduling</li>
              <li>Content reused across search and social</li>
            </ul>
          </section>

          <section>
            <h2 className="font-sans text-2xl sm:text-3xl font-bold text-slate-950">AI builds</h2>
            <p className="mt-3 font-sans text-base text-slate-700">Practical tools that save your team time.</p>
            <ul className="mt-4 space-y-2 font-sans text-sm text-slate-600 list-disc list-inside">
              <li>Website and WhatsApp chatbots that answer common questions</li>
              <li>Automations for enquiries, bookings and follow-ups</li>
              <li>Built to fit the tools you already use</li>
            </ul>
            <p className="mt-4 font-sans text-sm text-slate-600">
              Included at a set scope in every package, from a website assistant in Visibility to larger builds in the Build package.
            </p>
          </section>
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-sm bg-tech-blue px-8 py-4 font-mono text-xs font-semibold uppercase tracking-wider text-white shadow-tech-button transition-all duration-200 hover:bg-tech-blue-600"
          >
            Talk to us about your business →
          </Link>
        </div>
      </div>
    </div>
  );
}
