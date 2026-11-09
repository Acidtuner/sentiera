import React from "react";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Use | Sentiera Technologies",
  description: "Terms of Use for the Sentiera Technologies website.",
  path: "/terms",
});

export default function Terms() {
  return (
    <div className="relative bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest-tag text-tech-blue font-semibold mb-4">
          <span className="h-1.5 w-1.5 rounded-full bg-tech-blue" />
          <span>Legal</span>
        </div>
        <h1 className="font-sans text-4xl sm:text-5xl font-bold tracking-tight-heading text-slate-950">Terms of Use</h1>
        <p className="mt-4 font-sans text-sm text-slate-500">Last updated: 6 November 2026</p>

        <div className="mt-10 space-y-8 font-sans text-base text-slate-700 leading-relaxed">
          <section>
            <h2 className="font-sans text-xl font-semibold text-slate-950">Use of this website</h2>
            <p className="mt-3">
              This website is operated by Sentiera Technologies LLC, Masdar City, Abu Dhabi. By using it you agree to these terms. The site provides general information about our services. Nothing on the site is an offer or a binding proposal until we confirm an engagement in writing.
            </p>
          </section>

          <section>
            <h2 className="font-sans text-xl font-semibold text-slate-950">Services</h2>
            <p className="mt-3">
              Descriptions of services and engagements are for information. Scope, pricing and deliverables are agreed separately after consultation.
            </p>
          </section>

          <section>
            <h2 className="font-sans text-xl font-semibold text-slate-950">Intellectual property</h2>
            <p className="mt-3">
              Content on this site, including text, design and branding, belongs to Sentiera Technologies LLC unless otherwise stated. You may not copy or reuse it for commercial purposes without permission.
            </p>
          </section>

          <section>
            <h2 className="font-sans text-xl font-semibold text-slate-950">Privacy</h2>
            <p className="mt-3">
              Use of the contact form is also covered by our <a href="/privacy" className="text-tech-blue hover:underline">Privacy Policy</a>.
            </p>
          </section>

          <section>
            <h2 className="font-sans text-xl font-semibold text-slate-950">Limitation</h2>
            <p className="mt-3">
              The site is provided as-is. We are not liable for any loss arising from use of the information on this site.
            </p>
          </section>

          <section>
            <h2 className="font-sans text-xl font-semibold text-slate-950">Governing law</h2>
            <p className="mt-3">
              These terms are governed by the laws of the United Arab Emirates, as applied in Abu Dhabi.
            </p>
          </section>

          <section>
            <h2 className="font-sans text-xl font-semibold text-slate-950">Contact</h2>
            <p className="mt-3">
              Sentiera Technologies LLC<br />
              Masdar City, Abu Dhabi, United Arab Emirates<br />
              Email: <a href="mailto:hello@sentieratech.com" className="text-tech-blue hover:underline">hello@sentieratech.com</a>
            </p>
          </section>

          <p className="text-sm text-slate-500">
            These terms are provided for general information and are not legal advice.
          </p>
        </div>
      </div>
    </div>
  );
}
