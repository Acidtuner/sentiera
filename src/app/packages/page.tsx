import React from "react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Packages | Visibility, Growth and Build",
  // Parked (not for launch): keep out of search results until revived.
  robots: { index: false, follow: false },
  description: "Three packages for UAE businesses: Visibility for SEO, AEO, social and a website AI assistant; Growth adds photo, video and one automated workflow; Build for larger AI projects. No lock-in contracts.",
};

const packages = [
  {
    name: "Visibility",
    summary: "For businesses that need to be found.",
    items: [
      "SEO and AEO, every month",
      "Social media management",
      "Monthly report and planning call",
      "AI integration: an AI assistant on your website that answers common questions from your own content, set up and kept up to date by us",
      "Add-on: events marketing",
    ],
    featured: false,
  },
  {
    name: "Growth",
    summary: "For businesses that need to be found and seen.",
    items: [
      "Everything in Visibility",
      "Monthly photo and video shoot",
      "Content made for your website, social and search",
      "AI integration: the website assistant, plus one automated workflow, such as enquiry routing or follow-ups, scoped with you",
    ],
    featured: true,
  },
  {
    name: "Build",
    summary: "For businesses that want larger AI projects.",
    items: [
      "Everything in Visibility",
      "Custom AI assistants, for your website, WhatsApp or internal team use",
      "Several automated workflows, connected to the tools you already use",
      "Scoping, set-up, testing, handover and ongoing support",
    ],
    featured: false,
  },
];

export default function Packages() {
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

        <div className="relative z-10 mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest-tag text-tech-blue font-semibold mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-tech-blue" />
            <span>Packages</span>
          </div>
          <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight-heading text-slate-950">
            Simple packages. Clear scope.
          </h1>
          <p className="mt-6 font-sans text-lg text-slate-700 leading-relaxed max-w-2xl mx-auto">
            Pick the one that fits. We agree the details with you before we start. No lock-in contracts.
          </p>
        </div>
      </section>

      <section className="relative bg-slate-50 py-16 sm:py-24 border-b border-hairline">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className={`relative bg-white border p-8 transition-colors duration-200 ${
                  pkg.featured
                    ? "border-tech-blue/50 shadow-sm"
                    : "border-hairline hover:border-tech-blue/30"
                }`}
              >
                {pkg.featured && (
                  <div className="absolute -top-3 left-6 bg-tech-blue px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-white">
                    Most popular
                  </div>
                )}

                <h2 className="font-sans text-2xl font-bold text-slate-950">
                  {pkg.name}
                </h2>
                <p className="mt-2 font-sans text-sm text-slate-600">
                  {pkg.summary}
                </p>

                <ul className="mt-6 space-y-2.5">
                  {pkg.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 font-sans text-sm text-slate-700">
                      <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-tech-blue" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <p className="mt-8 font-mono text-[11px] text-slate-500 uppercase tracking-wide">
                  Pricing on request.
                </p>
              </div>
            ))}
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
      </section>
    </div>
  );
}
