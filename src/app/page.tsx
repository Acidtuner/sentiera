import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import Hero from "@/components/Hero";

export const metadata: Metadata = {
  title: "SEO & AEO Agency in Abu Dhabi | Sentiera Technologies",
  description: "Help customers find and choose your business on Google and in AI answers. SEO, AEO, web, content and creative from Masdar City, Abu Dhabi.",
};

const whatWeDo = [
  { label: "AI Agents", href: "/services#ai-agents" },
  { label: "360° Brand Management", href: "/services#brand-management" },
  { label: "Digital Marketing", href: "/services#digital-marketing" },
  { label: "Events and PR", href: "/services#events-pr" },
];

const proof = [
  { name: "Nidec", detail: "Ongoing social media creatives, event graphics and internal communications." },
  { name: "TD Power Systems", detail: "Ongoing social media creatives, event graphics and internal communications." },
  { name: "Murata", detail: "Events and internal communications for its India and Singapore offices." },
  { name: "TSI Power", detail: "Events, creative communications, brochures and graphics." },
  { name: "Azzurro", detail: "Website design and management, plus two brand videos." },
];

const faqs = [
  { q: "What is AEO?", a: "Answer engine optimisation is the work of helping AI assistants such as ChatGPT, Gemini and Google's AI Overviews understand your business, so it has a fair chance of being named when customers ask for a recommendation." },
  { q: "How is AEO different from SEO?", a: "SEO helps your pages rank in search results. AEO helps AI tools understand and cite your business. Both rely on clear pages, honest answers and consistent business details, so we plan them together." },
  { q: "What's included in the Complimentary Visibility Review?", a: "A 45-minute session on how your business appears on Google and in AI answers, followed by a short written summary of what we would focus on first." },
  { q: "Do you work with businesses in Dubai as well as Abu Dhabi?", a: "Yes. We're based in Masdar City, Abu Dhabi, and work with businesses across Abu Dhabi and Dubai. We're happy to meet in either city." },
  { q: "Who does the work?", a: "Strategy and client relationships are led from Abu Dhabi. Design, writing, video and development are handled by our delivery team in Bangalore." },
  { q: "How much does it cost?", a: "Every engagement is shaped around what you need, so we share pricing after our first conversation." },
];

export default function Home() {
  return (
    <div className="relative">
      <Hero />

      <section className="relative bg-white/70 py-20 sm:py-28 border-b border-hairline">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest-tag text-tech-blue font-semibold mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span>Positioning</span>
          </div>
          <h2 className="font-sans text-4xl sm:text-5xl font-bold tracking-tight-heading text-slate-950">
            Led in Abu Dhabi. Delivered by a dedicated team.
          </h2>
          <div className="mt-8 space-y-4 font-sans text-base sm:text-lg text-slate-700 leading-relaxed">
            <p>Our Abu Dhabi team sets strategy and looks after every client relationship from Masdar City. You work with us directly, in your time zone, from the first meeting to each monthly review.</p>
            <p>Our delivery team in Bangalore brings designers, writers, video editors and developers to every engagement, working on your account every day.</p>
            <p className="font-semibold text-slate-900">Strategy, creative and delivery, brought together as one team.</p>
          </div>
        </div>
      </section>

      <section className="relative bg-slate-50/80 py-20 sm:py-28 border-b border-hairline">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest-tag text-tech-blue font-semibold mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span>Why it matters now</span>
          </div>
          <h2 className="font-sans text-4xl sm:text-5xl font-bold tracking-tight-heading text-slate-950">How customers search is changing.</h2>
          <div className="mt-8 space-y-4 font-sans text-base sm:text-lg text-slate-700 leading-relaxed">
            <p>More people now ask an AI assistant for a recommendation before they visit a website. The answer usually names only a few businesses. We help improve how your business appears in those answers, building on the same foundations as good SEO: clear pages, honest answers to real questions, and consistent details about who you are.</p>
            <p className="font-semibold text-slate-900">We plan search and AI visibility together, as one piece of work.</p>
          </div>
        </div>
      </section>

      <section className="relative bg-white/70 py-20 sm:py-28 border-b border-hairline">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <h2 className="font-sans text-4xl sm:text-5xl font-bold tracking-tight-heading text-slate-950">AI, brand, digital and events services in Abu Dhabi and Dubai</h2>
          <ul className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {whatWeDo.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="group flex items-center justify-between border border-hairline bg-white/90 px-5 py-4 font-sans text-sm text-slate-800 hover:border-accent/40 hover:text-tech-blue transition-colors">
                  <span>{item.label}</span>
                  <span className="font-mono text-xs text-slate-400 group-hover:text-accent transition-colors">→</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <Link href="/services" className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-tech-blue hover:text-tech-blue-600">See all services →</Link>
          </div>
        </div>
      </section>

      <section className="relative bg-slate-50/80 py-20 sm:py-28 border-b border-hairline">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <h2 className="font-sans text-4xl sm:text-5xl font-bold tracking-tight-heading text-slate-950">The team behind the work.</h2>
          <p className="mt-4 font-sans text-base text-slate-600">Our delivery team in Bangalore has worked with these organisations.</p>
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 font-mono text-sm text-slate-500 uppercase tracking-wide">
            <span>Nidec</span><span>TSI Power</span><span>Murata</span><span>TD Power Systems</span>
          </div>
          <ul className="mt-10 space-y-4">
            {proof.map((p) => (
              <li key={p.name} className="font-sans text-sm text-slate-700">
                <strong className="text-slate-950">{p.name}:</strong> {p.detail}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="relative bg-white/70 py-20 sm:py-28 border-b border-hairline">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <h2 className="font-sans text-4xl sm:text-5xl font-bold tracking-tight-heading text-slate-950">FAQ</h2>
          <dl className="mt-10 space-y-8">
            {faqs.map((faq) => (
              <div key={faq.q}>
                <dt className="font-sans text-lg font-semibold text-slate-950">{faq.q}</dt>
                <dd className="mt-2 font-sans text-base text-slate-600 leading-relaxed">{faq.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="relative bg-white/70 py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <h2 className="font-sans text-4xl sm:text-5xl font-bold tracking-tight-heading text-slate-950">Let&apos;s start with a conversation.</h2>
          <p className="mt-6 font-sans text-base sm:text-lg text-slate-700 leading-relaxed">Tell us where your business is today and where you&apos;d like it to be. We&apos;ll give you an honest view of where to begin.</p>
          <div className="mt-10">
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-sm bg-tech-blue px-8 py-4 font-mono text-xs font-semibold uppercase tracking-wider text-white shadow-tech-button transition-all duration-200 hover:bg-tech-blue-600">Arrange a meeting →</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
