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
  const gaps = (result.critical_gaps || []).slice(0, 3);
  const fixes = (result.recommended_fixes || []).slice(0, 3);

  const mention = !liveGrounding?.executed
    ? "Not run"
    : liveGrounding.targetBrandFound || liveGrounding.targetUrlFound
      ? "Mentioned"
      : "Not mentioned";

  return (
    <div className="mx-auto max-w-6xl space-y-4">
      <div className="flex flex-col gap-3 border border-hairline bg-white px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <p className="font-mono text-[10px] uppercase tracking-wider text-tech-blue">Sentiera Cortex</p>
          <p className="truncate font-sans text-sm font-medium text-slate-950">{targetUrl}</p>
          {targetKeyword && <p className="truncate font-mono text-[11px] text-slate-500">{targetKeyword}</p>}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button onClick={onReset} className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-wider text-slate-600 hover:text-tech-blue">
            <RotateCcw className="h-3 w-3" /> Run another
          </button>
          <Link href="/contact" className="inline-flex items-center bg-tech-blue px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-white hover:bg-tech-blue-600">
            Book a review
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="border border-hairline bg-white p-4">
          <p className="font-mono text-[10px] uppercase tracking-wider text-slate-400">Website readiness</p>
          <p className="mt-2 font-sans text-4xl font-bold text-tech-blue">{result.overall_aeo_score}</p>
          <p className="mt-1 font-sans text-xs text-slate-500">Out of 100. A diagnostic indicator, not a ranking.</p>
        </div>
        <div className="border border-hairline bg-white p-4">
          <p className="font-mono text-[10px] uppercase tracking-wider text-slate-400">Observed mention</p>
          <p className={`mt-2 font-sans text-2xl font-bold ${mention === "Mentioned" ? "text-emerald-600" : mention === "Not mentioned" ? "text-accent" : "text-slate-500"}`}>
            {mention}
          </p>
          <p className="mt-1 font-sans text-xs text-slate-500">Whether a live Gemini check named the brand or URL.</p>
          {liveGrounding?.aiVerdictSummary && (
            <p className={`mt-2 font-sans text-xs ${liveGrounding.executed ? "text-slate-500" : "text-rose-600"}`}>{liveGrounding.aiVerdictSummary}</p>
          )}
        </div>
        <div className="border border-hairline bg-white p-4">
          <p className="font-mono text-[10px] uppercase tracking-wider text-slate-400">Pages reviewed</p>
          <p className="mt-2 font-sans text-4xl font-bold text-slate-950">{pages.length || "—"}</p>
          <p className="mt-1 font-sans text-xs text-slate-500">Public pages read for this snapshot.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        <div className="border border-hairline bg-white p-5">
          <h3 className="font-mono text-[10px] uppercase tracking-wider text-slate-400">Summary</h3>
          <p className="mt-3 font-sans text-sm leading-relaxed text-slate-800">{result.diagnostic_summary}</p>
          {gaps.length > 0 && (
            <div className="mt-4 border-t border-hairline pt-4">
              <p className="font-mono text-[10px] uppercase tracking-wider text-rose-700">Top gaps</p>
              <ul className="mt-2 space-y-2">
                {gaps.map((gap) => (
                  <li key={gap} className="font-sans text-sm text-slate-700">{gap}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="border border-hairline bg-white p-5">
          <h3 className="font-mono text-[10px] uppercase tracking-wider text-slate-400">Priority fixes</h3>
          {fixes.length > 0 ? (
            <ul className="mt-3 space-y-2">
              {fixes.map((fix) => (
                <li key={fix} className="font-sans text-sm text-slate-700">{fix}</li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 font-sans text-sm text-slate-500">No priority fixes were returned for this snapshot.</p>
          )}
          {liveGrounding?.executed && liveGrounding.competitorsCited?.length > 0 && (
            <div className="mt-4">
              <p className="font-mono text-[10px] uppercase tracking-wider text-slate-400">Other names in this answer</p>
              <ul className="mt-2 space-y-1">
                {liveGrounding.competitorsCited.slice(0, 6).map((item) => (
                  <li key={`${item.title}-${item.domain}`} className="font-sans text-sm text-slate-700">
                    {item.title}{item.domain ? ` · ${item.domain}` : ""}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {liveGrounding?.executed && liveGrounding.aiSynthesizedAnswer && (
            <div className="mt-4 border-t border-hairline pt-4">
              <p className="font-mono text-[10px] uppercase tracking-wider text-slate-400">Gemini answer · one run</p>
              <p className="mt-2 whitespace-pre-wrap font-sans text-sm leading-relaxed text-slate-700">{liveGrounding.aiSynthesizedAnswer}</p>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
        <div className="border border-hairline bg-white p-4">
          <p className="font-mono text-[10px] uppercase tracking-wider text-slate-400">Crawler access</p>
          {advanced?.crawlerAccess?.length ? (
            <ul className="mt-2 space-y-1 font-mono text-[11px]">
              {advanced.crawlerAccess.slice(0, 5).map((crawler) => (
                <li key={crawler.bot} className={crawler.allowed === false ? "text-rose-600" : crawler.allowed ? "text-emerald-600" : "text-slate-500"}>
                  {crawler.bot}: {crawler.allowed === null ? "not mentioned" : crawler.allowed ? "allowed" : "blocked"}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 font-sans text-sm text-slate-500">Not checked.</p>
          )}
        </div>
        <div className="border border-hairline bg-white p-4">
          <p className="font-mono text-[10px] uppercase tracking-wider text-slate-400">llms.txt</p>
          <p className="mt-2 font-sans text-sm text-slate-700">
            {advanced?.llmsTxt?.present ? "Present" : "Not found"}
          </p>
          {advanced?.citationSampling && (
            <p className="mt-2 font-sans text-sm text-slate-600">
              Sample mention: {advanced.citationSampling.executed ? (advanced.citationSampling.cited ? "appeared" : "not mentioned") : "not run"}
            </p>
          )}
        </div>
        <div className="border border-hairline bg-white p-4">
          <p className="font-mono text-[10px] uppercase tracking-wider text-slate-400">Pages</p>
          {pages.length > 0 ? (
            <ul className="mt-2 space-y-1">
              {pages.slice(0, 4).map((page) => (
                <li key={page.url} className="truncate font-mono text-[11px] text-slate-600">{page.title || page.url}</li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 font-sans text-sm text-slate-500">No page list returned.</p>
          )}
        </div>
      </div>
    </div>
  );
}
