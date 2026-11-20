"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import AuditForm from "@/components/AuditForm";
import AuditProgress from "@/components/AuditProgress";
import ReportDashboard from "@/components/ReportDashboard";
import { AEOResult, LiveGroundingResult, AuditResponsePayload } from "@/types/aeo";
import { AlertCircle } from "lucide-react";

const faqs = [
  {
    q: "What does Cortex check?",
    a: "Cortex reviews your public pages for how clearly your brand, location and offer are stated, and whether the page structure is readable. If you give a buyer topic, it also notes whether that topic appears in a live check.",
  },
  {
    q: "Is it really free?",
    a: "Yes. The Cortex Snapshot is free. A Complimentary Visibility Review is a separate conversation if you want a specialist to walk through the findings.",
  },
  {
    q: "How is my data used?",
    a: "We use your name, work email, company and website to run the snapshot and send it to you. We do not sell this data. See the Privacy Policy for how enquiry data is handled.",
  },
  {
    q: "How is this different from SEO?",
    a: "SEO is about how pages rank in search results. Cortex looks at whether your public pages state the facts an AI-assisted search needs in order to understand and cite your brand.",
  },
  {
    q: "What happens after I get my snapshot?",
    a: "You get the summary on screen and by email, with the main gaps. If you want a walkthrough, book a Complimentary Visibility Review.",
  },
];

export default function CortexPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");
  const [currentKeyword, setCurrentKeyword] = useState("");
  const [auditResult, setAuditResult] = useState<AEOResult | null>(null);
  const [liveGrounding, setLiveGrounding] = useState<LiveGroundingResult | undefined>(undefined);
  const [scrapedData, setScrapedData] = useState<Record<string, unknown> | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showManual, setShowManual] = useState(false);

  const handleRunAudit = async (formData: {
    url: string;
    keyword: string;
    manual?: string;
    name: string;
    company: string;
    email: string;
    honeypot?: string;
  }) => {
    setIsLoading(true);
    setErrorMsg(null);
    setAuditResult(null);
    setLiveGrounding(undefined);
    setCurrentUrl(formData.url);
    setCurrentKeyword(formData.keyword);

    try {
      const res = await fetch("/api/aeo/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetUrl: formData.url,
          targetKeyword: formData.keyword,
          customContent: formData.manual,
          name: formData.name,
          company: formData.company,
          email: formData.email,
          honeypot: formData.honeypot,
        }),
      });

      const raw = await res.text();
      let data: AuditResponsePayload;
      try {
        data = JSON.parse(raw) as AuditResponsePayload;
      } catch {
        throw new Error(
          res.status === 504 || res.status === 502
            ? "The check took too long and the server stopped it. Try again, or use a simpler page."
            : "The server returned an unexpected page instead of a result. Redeploy, then try again."
        );
      }

      if (!res.ok || !data.success || !data.data) {
        const message = data.error || "We could not complete the snapshot.";
        if (/fetch any pages|could not read|blocked/i.test(message)) setShowManual(true);
        throw new Error(message);
      }

      setShowManual(false);
      setAuditResult(data.data);
      setLiveGrounding(data.liveGrounding);
      setScrapedData(data.scrapedData || null);
    } catch (err: unknown) {
      console.error(err);
      setErrorMsg(err instanceof Error ? err.message : "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setAuditResult(null);
    setLiveGrounding(undefined);
    setScrapedData(null);
    setErrorMsg(null);
    setCurrentUrl("");
    setCurrentKeyword("");
  };

  return (
    <div className="relative min-h-[60vh]">
      {!auditResult && !isLoading && (
        <>
          <section className="relative overflow-hidden border-b border-hairline pt-16 pb-16 sm:pt-24 sm:pb-20">
            <div className="pointer-events-none absolute inset-0 z-0 opacity-40 [background-image:radial-gradient(#0066FF_0.75px,transparent_0.75px)] [background-size:32px_32px]" aria-hidden="true" />
            <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
                <div className="lg:sticky lg:top-24">
                  <div className="inline-flex items-center gap-2 border border-hairline bg-white/90 px-3.5 py-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-700">Sentiera Cortex</span>
                  </div>
                  <h1 className="mt-6 font-sans text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight-heading text-slate-950 leading-[0.96]">
                    Is your brand missing from the <span className="text-tech-blue">AI shortlist?</span>
                  </h1>
                  <p className="mt-6 font-sans text-base sm:text-lg text-slate-700 leading-relaxed max-w-xl">
                    Get a free Cortex Snapshot showing how clearly your brand and offer come across to AI-assisted search, with your top fixes.
                  </p>
                  <Link href="/contact" className="mt-6 inline-block font-mono text-xs uppercase tracking-wider text-slate-600 hover:text-tech-blue">
                    Prefer to talk? Book a Complimentary Visibility Review.
                  </Link>
                </div>
                <div>
                  <AuditForm onSubmit={handleRunAudit} isLoading={isLoading} showManual={showManual} />
                  {errorMsg && (
                    <div className="mt-4 p-4 bg-rose-50 border border-rose-200 text-rose-800 flex items-start gap-3 text-xs font-mono">
                      <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <p>{errorMsg}{showManual ? " Paste the main page text above and submit again." : ""}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          <section className="border-b border-hairline bg-white py-16 sm:py-20">
            <div className="mx-auto max-w-5xl px-6">
              <h2 className="font-sans text-3xl sm:text-4xl font-bold tracking-tight-heading text-slate-950">What you will receive</h2>
              <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "A readiness summary of your public pages",
                  "Entity and content gaps we can see from the site",
                  "Priority fixes, written in plain language",
                  "An email copy of the same snapshot",
                ].map((item) => (
                  <li key={item} className="border border-hairline bg-white p-5 font-sans text-base text-slate-700">{item}</li>
                ))}
              </ul>
              <div className="mt-10">
                <p className="font-mono text-[10px] uppercase tracking-wider text-accent mb-3">Example, not a client result</p>
                <div className="relative aspect-[3/2] max-w-3xl overflow-hidden border border-hairline bg-slate-50">
                  <Image src="/cortex-example-snapshot.jpg" alt="Example Cortex snapshot showing website readiness and observed mention" fill className="object-cover" sizes="(min-width: 768px) 768px, 100vw" />
                </div>
                <p className="mt-4 font-sans text-sm text-slate-600">You get the snapshot on screen after the check, and by email to the address you give. If the site can be read, that is usually within a minute.</p>
              </div>
            </div>
          </section>

          <section className="border-b border-hairline bg-slate-50/80 py-16 sm:py-20">
            <div className="mx-auto max-w-6xl px-6 lg:px-8">
              <h2 className="font-sans text-3xl sm:text-4xl font-bold tracking-tight-heading text-slate-950">How Cortex works</h2>
              <div className="relative mt-12">
                <div className="pointer-events-none absolute left-0 right-0 top-8 hidden h-px bg-slate-300 md:block" aria-hidden="true" />
                <ol className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    { n: "01", title: "You share", body: "Your website, and a buyer topic if you want one." },
                    { n: "02", title: "Cortex reviews", body: "Public pages are read for how clearly the brand and offer are stated." },
                    { n: "03", title: "You receive", body: "A summary on screen and by email, with the priorities." },
                  ].map((step) => (
                    <li key={step.n} className="relative bg-white border border-hairline p-6">
                      <div className="flex h-16 w-16 items-center justify-center border border-tech-blue bg-white font-mono text-sm font-semibold text-tech-blue">
                        {step.n}
                      </div>
                      <h3 className="mt-6 font-sans text-xl font-bold text-slate-950">{step.title}</h3>
                      <p className="mt-2 font-sans text-sm text-slate-600 leading-relaxed">{step.body}</p>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="border border-hairline bg-white p-5">
                  <p className="font-mono text-[10px] uppercase tracking-wider text-tech-blue">Website readiness</p>
                  <p className="mt-2 font-sans text-sm text-slate-700">How clearly the public pages state who you are and what you offer.</p>
                </div>
                <div className="border border-hairline bg-white p-5">
                  <p className="font-mono text-[10px] uppercase tracking-wider text-accent">Observed mention</p>
                  <p className="mt-2 font-sans text-sm text-slate-700">Whether a live check mentioned the brand or URL. Shown separately.</p>
                </div>
              </div>
              <p className="mt-6 font-sans text-sm text-slate-600">Cortex is a diagnostic indicator. It does not guarantee rankings, citations or leads.</p>
            </div>
          </section>

          <section className="bg-white py-16 sm:py-20">
            <div className="mx-auto max-w-3xl px-6">
              <h2 className="font-sans text-3xl sm:text-4xl font-bold tracking-tight-heading text-slate-950">FAQ</h2>
              <dl className="mt-8 space-y-6">
                {faqs.map((faq) => (
                  <div key={faq.q}>
                    <dt className="font-sans text-lg font-semibold text-slate-950">{faq.q}</dt>
                    <dd className="mt-2 font-sans text-base text-slate-600 leading-relaxed">{faq.a}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>
        </>
      )}

      {isLoading && (
        <div className="max-w-3xl mx-auto px-6 py-16">
          <AuditProgress targetUrl={currentUrl} targetKeyword={currentKeyword} />
        </div>
      )}

      {auditResult && (
        <div className="px-6 py-12">
          <ReportDashboard
            result={auditResult}
            liveGrounding={liveGrounding}
            targetUrl={currentUrl}
            targetKeyword={currentKeyword}
            scrapedData={scrapedData}
            onReset={handleReset}
          />
        </div>
      )}
    </div>
  );
}
