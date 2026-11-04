import React from "react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services | SEO, AEO, Photo, Video, Events and AI",
  description: "SEO and AEO, photography and videography, events marketing, social media management, and AI chatbots and automations for UAE businesses.",
};

const services = [
  {
    tag: "01",
    title: "SEO and AEO",
    summary: "Get found in Google and in AI answers like ChatGPT.",
    why: "More buyers now ask AI tools for a shortlist before they ever search. We make sure your business is one of the names that comes up, with clear, accurate pages that both Google and answer engines can use.",
    items: [
      "Website and search audit",
      "Pages written around the questions customers ask",
      "Google Business Profile and local listings",
      "Structured data and technical fixes",
      "Monthly reporting in plain language",
    ],
  },
  {
    tag: "02",
    title: "Photography and videography",
    summary: "Content that shows what you do.",
    why: "Buyers want to see the real thing. Planned shoots give you photos and short videos that work on your website, Google Business Profile and social channels, so the same assets support both search and AI answers.",
    items: [
      "Planned shoots at your premises",
      "Short videos for social and your website",
      "Product, team and location photography",
      "Edited and delivered in the formats each channel needs",
    ],
  },
  {
    tag: "03",
    title: "Events marketing",
    summary: "Help before, during and after an event you run or attend.",
    why: "An event is only as useful as the content it produces. We promote it in advance, cover it on the day, and turn the photos and clips into lasting material for search, social and your website.",
    items: [
      "Pre-event promotion across social, email and your website",
      "Photo and video coverage on the day",
      "Same-day social posts and short highlight clips",
      "Follow-up content after the event, reused across search and social",
    ],
  },
  {
    tag: "04",
    title: "Social media management",
    summary: "Steady, on-brand posting.",
    why: "Consistent posting keeps your brand present and gives search engines and AI tools fresh, accurate signals about what you do and where you are. We plan, write and schedule so it happens every month without you chasing it.",
    items: [
      "Monthly content calendar",
      "Captions, design and scheduling",
      "Content reused across search and social",
    ],
  },
  {
    tag: "05",
    title: "AI builds",
    summary: "Practical tools that save your team time.",
    why: "An AI assistant on your site or WhatsApp answers common questions instantly. Automations handle enquiry routing and follow-ups. Both are scoped to the tools you already use and included at a set level in every package.",
    items: [
      "Website and WhatsApp chatbots that answer common questions",
      "Automations for enquiries, bookings and follow-ups",
      "Built to fit the tools you already use",
    ],
    note: "Included at a set scope in every package, from a website assistant in Visibility to larger builds in the Build package.",
  },
];

export default function Services() {
  return (
    <div className="relative bg-white">
      {/* Header */}
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
            <span>Services</span>
          </div>
          <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight-heading text-slate-950">
            What we do
          </h1>
          <p className="mt-6 font-sans text-lg text-slate-700 leading-relaxed max-w-2xl mx-auto">
            Five services that work as one system. Every package includes some AI integration, scaled to the package.
          </p>
        </div>
      </section>

      {/* Stacked service sections */}
      {services.map((service, index) => {
        const isEven = index % 2 === 0;
        return (
          <section
            key={service.tag}
            className={`relative py-16 sm:py-24 border-b border-hairline ${
              isEven ? "bg-white" : "bg-slate-50"
            }`}
          >
            <div className="mx-auto max-w-4xl px-6 lg:px-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-xs uppercase tracking-widest text-tech-blue font-semibold">
                  {service.tag}
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-tech-blue" />
              </div>

              <h2 className="font-sans text-3xl sm:text-4xl font-bold tracking-tight-heading text-slate-950">
                {service.title}
              </h2>

              <p className="mt-3 font-sans text-lg text-slate-700">
                {service.summary}
              </p>

              <p className="mt-6 font-sans text-base text-slate-600 leading-relaxed max-w-3xl">
                {service.why}
              </p>

              <ul className="mt-8 space-y-3">
                {service.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 font-sans text-sm sm:text-base text-slate-700">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-tech-blue" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {service.note && (
                <p className="mt-6 font-sans text-sm text-slate-500 leading-relaxed max-w-2xl">
                  {service.note}
                </p>
              )}

              <div className="mt-10">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-tech-blue hover:text-tech-blue-600 transition-colors"
                >
                  Talk to us about {service.title.toLowerCase()} →
                </Link>
              </div>
            </div>
          </section>
        );
      })}

      {/* Closing CTA */}
      <section className="relative bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <h2 className="font-sans text-3xl sm:text-4xl font-bold tracking-tight-heading text-slate-950">
            Ready to get started?
          </h2>
          <p className="mt-4 font-sans text-base text-slate-700">
            Tell us about your business and we&apos;ll recommend the right mix.
          </p>
          <div className="mt-10">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-sm bg-tech-blue px-8 py-4 font-mono text-xs font-semibold uppercase tracking-wider text-white shadow-tech-button transition-all duration-200 hover:bg-tech-blue-600"
            >
              Talk to us about your business →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
