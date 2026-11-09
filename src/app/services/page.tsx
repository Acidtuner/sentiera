import React from "react";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { FaqSection } from "@/lib/faqs";
import ServicesAccordion, { type ServiceItem } from "@/components/ServicesAccordion";

export const metadata: Metadata = pageMetadata({
  title: "AI Agents, SEO & AEO, Brand & Events | Sentiera Abu Dhabi",
  description: "Four ways we work with UAE businesses: AI agents, 360° brand management, SEO and AEO, and events and PR. Led from Masdar City, Abu Dhabi.",
  path: "/services",
});

const services: ServiceItem[] = [
  {
    id: "ai-agents",
    title: "AI Agents for Sales, Support and Social",
    summary: "Assistants that answer your customers' questions from your own content, connected to the tools you already use. We plan, build and test each one with you before it goes live.",
    items: [
      "Website and WhatsApp chatbots that answer from your own content",
      "Custom sales and customer-service agents",
      "Social listening agents that monitor and summarise what people say about your brand on social media",
    ],
    cta: "Discuss an AI agent",
    ctaHref: "/contact",
  },
  {
    id: "brand-management",
    title: "360° Brand Management in Abu Dhabi",
    summary: "One monthly partnership that keeps your brand clear and consistent wherever it appears. Our Abu Dhabi team runs it as a single plan and reviews it with you each month.",
    items: [
      "Brand strategy and brand guidelines",
      "Company and product brochures",
      "Internal communications: newsletters, announcements and town-hall materials",
      "Brand photography",
    ],
    cta: "Discuss a brand partnership",
    ctaHref: "/contact",
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing: SEO, AEO and Web",
    summary: "Help customers find you on Google, understand you in AI answers, and see you where they spend time online.",
    // PENDING JAY: multi-channel marketing wording for this line. Kept as-is until approved.
    detail: "SEO and AEO, social content, email and website design are planned together so search, AI answers and presence reinforce each other.",
    items: [
      "SEO and AEO: audits, pages written around your customers' questions, local listings and structured data",
      "Social media: content calendars, post designs, short videos and captions for each platform",
      "Email marketing",
      "Website design and development, with technical SEO built in from the start",
    ],
    cta: "Review your visibility",
    ctaHref: "/contact?intent=visibility-review",
  },
  {
    id: "events-pr",
    title: "Events and PR for UAE Brands",
    summary: "From the first announcement to the follow-up, we look after the creative side of your event or campaign. Each project is quoted on its own.",
    items: [
      "Event graphics: stand, stage, screen and print",
      "Photography and video on the day",
      "Promotional campaigns before the event",
      "Follow-up content afterwards",
    ],
    cta: "Request an event quote",
    ctaHref: "/contact",
  },
];

export default function Services() {
  return (
    <div className="relative bg-white">
      <section className="relative overflow-hidden border-b border-hairline pt-24 pb-12 sm:pt-32 sm:pb-16">
        <div className="pointer-events-none absolute inset-0 z-0 opacity-40 [background-image:radial-gradient(#0066FF_0.75px,transparent_0.75px)] [background-size:32px_32px]" aria-hidden="true" />
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] h-[360px] bg-tech-blue/5 blur-[120px] rounded-full" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest-tag text-tech-blue font-semibold mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-tech-blue" />
            <span>Services</span>
          </div>
          <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight-heading text-slate-950">Our services</h1>
          <p className="mt-6 font-sans text-lg text-slate-700 leading-relaxed max-w-2xl mx-auto">Led from Masdar City, Abu Dhabi, and delivered by our full production team.</p>
        </div>
      </section>

      <section className="relative bg-slate-50">
        <div className="mx-auto max-w-5xl">
          <ServicesAccordion services={services} />
        </div>
      </section>

      <FaqSection />
    </div>
  );
}
