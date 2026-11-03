import React from "react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Packages | Visibility, Growth and Build",
  description: "Three packages for UAE businesses: Visibility for SEO, AEO, social and a website AI assistant; Growth adds photo, video and one automated workflow; Build for larger AI projects. No lock-in contracts.",
};

export default function Packages() {
  return (
    <div className="relative bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest-tag text-tech-blue font-semibold mb-4">
          <span className="h-1.5 w-1.5 rounded-full bg-tech-blue" />
          <span>Packages</span>
        </div>
        <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight-heading text-slate-950">
          Simple packages. Clear scope.
        </h1>
        <p className="mt-6 font-sans text-lg text-slate-700 leading-relaxed">
          Pick the one that fits. We agree the details with you before we start. No lock-in contracts.
        </p>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="border border-hairline p-8 bg-white">
            <h2 className="font-sans text-2xl font-bold text-slate-950">Visibility</h2>
            <p className="mt-2 font-sans text-sm text-slate-600">For businesses that need to be found.</p>
            <ul className="mt-6 space-y-2 font-sans text-sm text-slate-700 list-disc list-inside">
              <li>SEO and AEO, every month</li>
              <li>Social media management</li>
              <li>Monthly report and planning call</li>
              <li>AI integration: an AI assistant on your website that answers common questions from your own content, set up and kept up to date by us</li>
              <li>Add-on: events marketing</li>
            </ul>
            <p className="mt-6 font-mono text-xs text-slate-500 uppercase">Pricing on request.</p>
          </div>

          <div className="border border-hairline p-8 bg-slate-50">
            <h2 className="font-sans text-2xl font-bold text-slate-950">Growth</h2>
            <p className="mt-2 font-sans text-sm text-slate-600">For businesses that need to be found and seen.</p>
            <ul className="mt-6 space-y-2 font-sans text-sm text-slate-700 list-disc list-inside">
              <li>Everything in Visibility</li>
              <li>Monthly photo and video shoot</li>
              <li>Content made for your website, social and search</li>
              <li>AI integration: the website assistant, plus one automated workflow, such as enquiry routing or follow-ups, scoped with you</li>
            </ul>
            <p className="mt-6 font-mono text-xs text-slate-500 uppercase">Pricing on request.</p>
          </div>

          <div className="border border-hairline p-8 bg-white">
            <h2 className="font-sans text-2xl font-bold text-slate-950">Build</h2>
            <p className="mt-2 font-sans text-sm text-slate-600">For businesses that want larger AI projects.</p>
            <ul className="mt-6 space-y-2 font-sans text-sm text-slate-700 list-disc list-inside">
              <li>Everything in Visibility</li>
              <li>Custom AI assistants, for your website, WhatsApp or internal team use</li>
              <li>Several automated workflows, connected to the tools you already use</li>
              <li>Scoping, set-up, testing, handover and ongoing support</li>
            </ul>
            <p className="mt-6 font-mono text-xs text-slate-500 uppercase">Pricing on request.</p>
          </div>
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-sm bg-tech-blue px-8 py-4 font-mono text-xs font-semibold uppercase tracking-wider text-white shadow-tech-button transition-all duration-200 hover:bg-tech-blue-600"
          >
            Book a free visibility check →
          </Link>
        </div>
      </div>
    </div>
  );
}
