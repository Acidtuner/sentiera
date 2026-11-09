import React from "react";

export interface Faq {
  q: string;
  a: string;
}

// Shared FAQ set (Home and Services). The FAQPage JSON-LD below is built
// from exactly this text, so the markup always matches what is on the page.
export const faqs: Faq[] = [
  { q: "What is AEO?", a: "Answer engine optimisation is the work of helping AI assistants such as ChatGPT, Gemini and Google's AI Overviews understand your business, so it has a fair chance of being named when customers ask for a recommendation." },
  { q: "How is AEO different from SEO?", a: "SEO helps your pages rank in search results. AEO helps AI tools understand and cite your business. Both rely on clear pages, honest answers and consistent business details, so we plan them together." },
  { q: "What's included in the Complimentary Visibility Review?", a: "A 45-minute session on how your business appears on Google and in AI answers, followed by a short written summary of what we would focus on first." },
  { q: "Do you work with businesses in Dubai as well as Abu Dhabi?", a: "Yes. We're based in Masdar City, Abu Dhabi, and work with businesses across Abu Dhabi and Dubai. We're happy to meet in either city." },
  { q: "Who does the work?", a: "Strategy and client relationships are led from Abu Dhabi. Design, writing, video and development are handled by our delivery team in Bangalore." },
  { q: "How much does it cost?", a: "Every engagement is shaped around what you need, so we share pricing after our first conversation." },
];

export function faqJsonLd(items: Faq[] = faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function FaqJsonLd({ items = faqs }: { items?: Faq[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(items)) }}
    />
  );
}

export function FaqSection({ items = faqs }: { items?: Faq[] }) {
  return (
    <section className="relative bg-white/70 py-20 sm:py-28 border-b border-hairline">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <h2 className="font-sans text-4xl sm:text-5xl font-bold tracking-tight-heading text-slate-950">FAQ</h2>
        <dl className="mt-10 space-y-8">
          {items.map((faq) => (
            <div key={faq.q}>
              <dt className="font-sans text-lg font-semibold text-slate-950">{faq.q}</dt>
              <dd className="mt-2 font-sans text-base text-slate-600 leading-relaxed">{faq.a}</dd>
            </div>
          ))}
        </dl>
      </div>
      <FaqJsonLd items={items} />
    </section>
  );
}
