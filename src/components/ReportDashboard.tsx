"use client";

import React from "react";
import { AEOResult, LiveGroundingResult, AnalyzedPage, AdvancedSignals } from "@/types/aeo";
import { RotateCcw } from "lucide-react";
import Link from "next/link";

interface ReportDashboardProps {
  result: AEOResult;
  liveGrounding?: LiveGroundingResult;
  targetUrl: string;
  targetKeyword: string;
  scrapedData?: {
    analyzedPages?: AnalyzedPage[];
    advancedSignals?: AdvancedSignals;
    [key: string]: unknown;
  } | null;
  onReset: () => void;
}

export default function ReportDashboard({
  result,
  liveGrounding,
  targetUrl,
  targetKeyword,
  scrapedData,
  onReset,
}: ReportDashboardProps) {
  const pages = scrapedData?.analyzedPages || [];
  const advanced = scrapedData?.advancedSignals || result.advancedSignals;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center border border-hairline bg-white p-8">
        <p className="font-mono text-[10px] uppercase tracking-wider text-tech-blue">Sentiera Cortex</p>
        <h2 className="mt-3 font-sans text-2xl sm:text-3xl font-bold text-slate-950">Your snapshot is on its way.</h2>
        <p className="mt-3 font-sans text-base text-slate-700">Want a specialist to walk you through it? Book a Complimentary Visibility Review.</p>
        <Link href="/contact" className="mt-6 inline-flex items-center gap-2 bg-tech-blue px-6 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-white hover:bg-tech-blue-600">
          Book a review
        </Link>
        <p className="mt-4 font-mono text-xs text-slate-500">{targetUrl}{targetKeyword ? ` · ${targetKeyword}` : ""}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border border-hairline bg-white p-6">
          <p className="font-mono text-[10px] uppercase tracking-wider text-slate-400">Website readiness</p>
          <p className="mt-3 font-sans text-sm text-slate-700">How clearly the public pages state who you are, where you are and what you offer.</p>
        </div>
        <div className="border border-hairline bg-white p-6">
          <p className="font-mono text-[10px] uppercase tracking-wider text-slate-400">Observed mention</p>
          <p className="mt-3 font-sans text-sm text-slate-700">
            {liveGrounding?.executed
              ? liveGrounding.targetBrandFound || liveGrounding.targetUrlFound
                ? "The live check mentioned this brand or URL."
                : "The live check did not mention this brand or URL."
              : "No live mention check was run for this snapshot."}
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-hairline">
        <h3 className="font-mono text-xs uppercase tracking-widest text-slate-500 mb-2">Diagnostic Summary</h3>
        <p className="text-sm text-slate-800 leading-relaxed">{result.diagnostic_summary}</p>
        {result.signalsUsed && result.signalsUsed.length > 0 && (
          <ul className="mt-3 space-y-1 text-xs text-slate-600 font-mono">
            {result.signalsUsed.map((s, i) => (
              <li key={i}>• {s}</li>
            ))}
          </ul>
        )}
      </div>

      {advanced && (
        <div className="bg-white p-6 rounded-xl border border-hairline space-y-4">
          <h3 className="font-mono text-xs uppercase tracking-widest text-slate-500">Advanced Signals</h3>

          <div>
            <p className="font-mono text-[11px] uppercase text-slate-400 mb-1">AI Crawler Access</p>
            <ul className="text-xs font-mono space-y-0.5">
              {advanced.crawlerAccess.slice(0, 6).map((c, i) => (
                <li key={i} className={c.allowed === false ? "text-rose-600" : c.allowed === true ? "text-emerald-600" : "text-slate-500"}>
                  {c.bot}: {c.allowed === null ? "not mentioned" : c.allowed ? "allowed" : "blocked"}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[11px] uppercase text-slate-400 mb-1">llms.txt</p>
            <p className="text-sm">
              {advanced.llmsTxt.present
                ? `✓ Present (${advanced.llmsTxt.length || 0} chars) — ${advanced.llmsTxt.qualityNote || ""}`
                : "✗ Not found"}
            </p>
          </div>

          {advanced.citationSampling && (
            <div>
              <p className="font-mono text-[11px] uppercase text-slate-400 mb-1">Sample mention</p>
              <p className="text-sm">
                {advanced.citationSampling.executed
                  ? advanced.citationSampling.cited
                    ? "Domain appeared in the sample"
                    : "Domain was not mentioned in the sample"
                  : "Sampling skipped (no API key)"}
              </p>
            </div>
          )}
        </div>
      )}

      {pages.length > 0 && (
        <div className="bg-white p-6 rounded-xl border border-hairline">
          <h3 className="font-mono text-xs uppercase tracking-widest text-slate-500 mb-3">Pages Analyzed ({pages.length})</h3>
          <ul className="space-y-3">
            {pages.map((p, i) => (
              <li key={i} className="text-sm border-b border-hairline/60 pb-2 last:border-0">
                <div className="font-medium text-slate-900 truncate">{p.title || p.url}</div>
                <div className="font-mono text-xs text-slate-500 truncate">{p.url}</div>
                <div className="font-mono text-[11px] text-tech-blue mt-0.5">{p.reason}</div>
                <div className="font-mono text-[11px] text-slate-400">
                  {p.wordCount} words {p.hasSchema ? "· schema" : ""}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {result.critical_gaps?.length > 0 && (
        <div className="bg-rose-50 p-6 rounded-xl border border-rose-200">
          <h3 className="font-mono text-xs uppercase tracking-widest text-rose-700 mb-2">Critical Gaps</h3>
          <ul className="list-disc pl-5 space-y-1 text-sm text-rose-900">
            {result.critical_gaps.map((g, i) => <li key={i}>{g}</li>)}
          </ul>
        </div>
      )}

      {result.recommended_fixes?.length > 0 && (
        <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-200">
          <h3 className="font-mono text-xs uppercase tracking-widest text-emerald-700 mb-2">Recommended Fixes</h3>
          <ul className="list-disc pl-5 space-y-1 text-sm text-emerald-900">
            {result.recommended_fixes.map((f, i) => <li key={i}>{f}</li>)}
          </ul>
        </div>
      )}

      {liveGrounding?.executed && (
        <div className="bg-slate-50 p-6 rounded-xl border border-hairline">
          <h3 className="font-mono text-xs uppercase tracking-widest text-slate-500 mb-2">Live Grounding</h3>
          <p className="text-sm text-slate-700">{liveGrounding.aiVerdictSummary}</p>
          <p className="mt-2 font-mono text-xs text-slate-500">Status: {liveGrounding.brandVisibilityStatus}</p>
        </div>
      )}

      <div className="text-center">
        <button onClick={onReset} className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-tech-blue hover:underline">
          <RotateCcw className="w-3 h-3" /> Run another audit
        </button>
      </div>
    </div>
  );
}
