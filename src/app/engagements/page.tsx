import React from "react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Ways to Work With Us | SEO, AEO & Creative | Sentiera",
  description: "Four ways to work with Sentiera Technologies: a Complimentary Visibility Review, a Partnership Retainer, an AI Integration Programme, and Events and Campaigns quoted per project.",
};

const engagements = [
  {
    title: "Complimentary Visibility Review",
    summary: "A starting point, by application.",
    items: [
      "A 45-minute session reviewing how your business shows up in Google and in AI answers",
      "A written summary afterwards, setting out what we would address first",
      "Offered for a limited number of UAE businesses each month",
    ],
    cta: "Apply for a review",
    href: "/contact?intent=visibility-review",
  },
  {
    title: "Partnership Retainer",
    summary: "An ongoing monthly partnership, run as one plan.",
    items: [
      "SEO and AEO",
      "Social media management",
      "Content: writing, design, photography and video",
      "An AI assistant on your website, answering common questions from your own content",
      "Automated workflows, such as enquiry routing or follow-ups, scoped with you",
      "A monthly review with your Abu Dhabi lead",
    ],
    cta: "Request a consultation",
    href: "/contact",
  },
  {
    title: "AI Integration Programme",
    summary: "For organisations planning larger AI work.",
    items: [
      "Custom AI assistants for your website, WhatsApp or internal teams",
      "Workflows connected to the tools you already use",
      "Scoping, set-up, testing, handover and ongoing support",
    ],
    cta: "Request a consultation",
    href: "/contact",
  },
  {
    title: "Events and Campaigns",
    summary: "Quoted per project.",
    items: [
      "Pre-event promotion across social, email and your website",
      "Event graphics and printed collateral",
      "Photo and video coverage on the day",
      "Follow-up content after the event or campaign",
    ],
    cta: "Request a quote",
    href: "/contact",
  },
];

export default function Engagements() {
  return (
    <div className="relative bg-white">
      <section className="relative overflow-hidden border-b border-hairline pt-24 pb-16 sm:pt-32 sm:pb-20">
        <div className="pointer-events-none absolute inset-0 z-0 opacity-40 [background-image:radial-gradient(#0066FF_0.75px,transparent_0.75px)] [background-size:32px_32px]" aria-hidden="true" />
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] h-[360px] bg-tech-blue/5 blur-[120px] rounded-full" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest-tag text-tech-blue font-semibold mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-tech-blue" />
            <span>Engagements</span>
          </div>
          <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight-heading text-slate-950">Four ways to work with us.</h1>
          <p className="mt-6 font-sans text-lg text-slate-700 leading-relaxed max-w-2xl mx-auto">Each engagement is scoped with you before it starts.</p>
        </div>
      </section>

      <section className="relative bg-slate-50 py-16 sm:py-24 border-b border-hairline">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {engagements.map((eng) => (
              <div key={eng.title} className="bg-white border border-hairline p-8">
                <h2 className="font-sans text-2xl font-bold text-slate-950">{eng.title}</h2>
                <p className="mt-2 font-sans text-sm text-slate-600">{eng.summary}</p>
                <ul className="mt-6 space-y-2.5">
                  {eng.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 font-sans text-sm text-slate-700">
                      <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-tech-blue" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Link href={eng.href} className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-tech-blue hover:text-tech-blue-600">{eng.cta} →</Link>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-12 text-center font-sans text-sm text-slate-500">Pricing for all engagements is shared after a consultation.</p>
        </div>
      </section>
    </div>
  );
}
