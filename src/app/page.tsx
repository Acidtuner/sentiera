import React from "react";
import Link from "next/link";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <div className="relative">
      <Hero />

      {/* Why AEO */}
      <section className="relative bg-white py-20 sm:py-28 border-b border-hairline">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest-tag text-tech-blue font-semibold mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-tech-blue" />
            <span>Why AEO</span>
          </div>
          <h2 className="font-sans text-4xl sm:text-5xl font-bold tracking-tight-heading text-slate-950">
            Search has changed. Your marketing should too.
          </h2>
          <div className="mt-8 space-y-4 font-sans text-base sm:text-lg text-slate-700 leading-relaxed">
            <p>
              More people now ask AI tools for answers instead of scrolling a page of links. They ask, "Which logistics software firm in Abu Dhabi does this?" or "Who supplies this in Dubai?" They get a short answer with a few names.
            </p>
            <p>
              AEO (answer engine optimisation) is the work of making your business one of those names. It builds on good SEO. Clear pages. Real answers to real questions. Consistent details about who you are and where you are.
            </p>
            <p className="font-semibold text-slate-900">
              We do both, together, as one plan.
            </p>
          </div>
        </div>
      </section>

      {/* How we work */}
      <section className="relative bg-slate-50 py-20 sm:py-28 border-b border-hairline">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest-tag text-tech-blue font-semibold mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-tech-blue" />
            <span>How we work</span>
          </div>
          <h2 className="font-sans text-4xl sm:text-5xl font-bold tracking-tight-heading text-slate-950">
            A small expert team, with AI doing the heavy lifting.
          </h2>
          <p className="mt-6 font-sans text-base sm:text-lg text-slate-700 leading-relaxed">
            Our creative and coding team plans the work, sets the standard and checks every piece. AI agents handle much of the production: research, first drafts, edits, reporting.
          </p>
          <p className="mt-4 font-sans text-base sm:text-lg text-slate-700 leading-relaxed">
            That is how we keep agency-quality work within reach of smaller budgets.
          </p>
          <ol className="mt-10 space-y-6 list-decimal list-inside font-sans text-base text-slate-700">
            <li><strong>Understand.</strong> We learn your business, customers and goals.</li>
            <li><strong>Plan.</strong> One clear monthly plan for search, AI answers and content.</li>
            <li><strong>Produce.</strong> Our team and our AI tools make the work. People review all of it.</li>
            <li><strong>Report.</strong> Plain monthly updates on what we did and what comes next.</li>
          </ol>
        </div>
      </section>

      {/* Packages teaser */}
      <section className="relative bg-white py-20 sm:py-28 border-b border-hairline">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h2 className="font-sans text-4xl sm:text-5xl font-bold tracking-tight-heading text-slate-950">
            Three packages. No menu to decode.
          </h2>
          <ul className="mt-8 space-y-3 font-sans text-base text-slate-700 text-left max-w-2xl mx-auto">
            <li><strong>Visibility</strong> — SEO, AEO and social media every month, plus an AI assistant on your website.</li>
            <li><strong>Growth</strong> — everything in Visibility, plus monthly photo and video shoots and one automated workflow.</li>
            <li><strong>Build</strong> — larger AI projects: custom assistants and automations across your tools.</li>
          </ul>
          <p className="mt-6 font-sans text-sm text-slate-600">
            Events marketing can be added to the Visibility package. No lock-in contracts.
          </p>
          <div className="mt-8">
            <Link
              href="/packages"
              className="inline-flex items-center gap-2 rounded-sm bg-tech-blue px-6 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-white shadow-tech-button transition-all duration-200 hover:bg-tech-blue-600"
            >
              Compare packages →
            </Link>
          </div>
          <p className="mt-4 font-mono text-[11px] text-slate-500 uppercase tracking-wide">
            Pricing on request.
          </p>
        </div>
      </section>

      {/* Who we work with */}
      <section className="relative bg-slate-50 py-20 sm:py-28 border-b border-hairline">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <h2 className="font-sans text-4xl sm:text-5xl font-bold tracking-tight-heading text-slate-950">
            Focused on three kinds of business.
          </h2>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-sans text-xl font-bold text-slate-950">IT and supply-chain tech.</h3>
              <p className="mt-3 font-sans text-sm text-slate-600 leading-relaxed">
                Buyers research vendors, compare options and ask AI tools for a shortlist before they ever book a demo. We help your company be on that list, with clear answers about what you do.
              </p>
            </div>
            <div>
              <h3 className="font-sans text-xl font-bold text-slate-950">Retail.</h3>
              <p className="mt-3 font-sans text-sm text-slate-600 leading-relaxed">
                Shoppers search for products, stores and opening hours near them. We help them find you, and see your range at its best.
              </p>
            </div>
            <div>
              <h3 className="font-sans text-xl font-bold text-slate-950">FMCG.</h3>
              <p className="mt-3 font-sans text-sm text-slate-600 leading-relaxed">
                Distributors, retailers and consumers look up brands and products online. We help your brand show up with consistent, accurate details wherever they look.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="relative bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <h2 className="font-sans text-4xl sm:text-5xl font-bold tracking-tight-heading text-slate-950">
            Find out how visible you are.
          </h2>
          <p className="mt-6 font-sans text-base sm:text-lg text-slate-700 leading-relaxed">
            We will check how your business shows up in Google and in AI answers, and tell you plainly what we would fix first.
          </p>
          <div className="mt-10">
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
