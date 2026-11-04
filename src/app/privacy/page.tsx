import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Sentiera Technologies LLC. How we handle personal data collected through this website.",
};

export default function Privacy() {
  return (
    <div className="relative bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest-tag text-tech-blue font-semibold mb-4">
          <span className="h-1.5 w-1.5 rounded-full bg-tech-blue" />
          <span>Legal</span>
        </div>
        <h1 className="font-sans text-4xl sm:text-5xl font-bold tracking-tight-heading text-slate-950">Privacy Policy</h1>
        <p className="mt-4 font-sans text-sm text-slate-500">Last updated: 4 November 2026</p>

        <div className="mt-10 space-y-8 font-sans text-base text-slate-700 leading-relaxed">
          <section>
            <h2 className="font-sans text-xl font-semibold text-slate-950">Who we are</h2>
            <p className="mt-3">
              Sentiera Technologies LLC (&quot;we&quot;, &quot;us&quot;) is a company based in Masdar City, Abu Dhabi, United Arab Emirates. This policy explains how we handle personal data collected through www.sentieratech.com.
            </p>
          </section>

          <section>
            <h2 className="font-sans text-xl font-semibold text-slate-950">What we collect</h2>
            <p className="mt-3">
              When you use the contact form we collect the details you provide: name, company, role, email address, phone number, website and message. We also receive standard technical data such as IP address and browser type through our hosting provider.
            </p>
          </section>

          <section>
            <h2 className="font-sans text-xl font-semibold text-slate-950">Why we collect it</h2>
            <p className="mt-3">
              We use this information to respond to your enquiry and, where relevant, to discuss or deliver the services you ask about. We do not sell personal data.
            </p>
          </section>

          <section>
            <h2 className="font-sans text-xl font-semibold text-slate-950">Legal basis</h2>
            <p className="mt-3">
              We process this data on the basis of your consent when you submit the form, and for the purpose of responding to your request. Processing is carried out in line with Federal Decree-Law No. 45 of 2021 on the Protection of Personal Data (PDPL) where it applies.
            </p>
          </section>

          <section>
            <h2 className="font-sans text-xl font-semibold text-slate-950">Sharing and storage</h2>
            <p className="mt-3">
              Form submissions are received by email. Data may be processed by service providers that host our website or email. We keep enquiry data only for as long as needed to respond and manage any resulting engagement.
            </p>
          </section>

          <section>
            <h2 className="font-sans text-xl font-semibold text-slate-950">Your rights</h2>
            <p className="mt-3">
              You may request access to, correction of, or deletion of the personal data we hold about you by emailing jay@sentieratech.com. We will respond within a reasonable time.
            </p>
          </section>

          <section>
            <h2 className="font-sans text-xl font-semibold text-slate-950">Contact</h2>
            <p className="mt-3">
              Sentiera Technologies LLC<br />
              Masdar City, Abu Dhabi, United Arab Emirates<br />
              Email: <a href="mailto:jay@sentieratech.com" className="text-tech-blue hover:underline">jay@sentieratech.com</a>
            </p>
          </section>

          <p className="text-sm text-slate-500">
            This policy is provided for general information. It is not legal advice. Have it reviewed by UAE counsel if you need formal compliance assurance.
          </p>
        </div>
      </div>
    </div>
  );
}
