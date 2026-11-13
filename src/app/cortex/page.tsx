"use client";

import React, { useState } from "react";
import AuditForm from "@/components/AuditForm";
import AuditProgress from "@/components/AuditProgress";
import ReportDashboard from "@/components/ReportDashboard";
import { AEOResult, LiveGroundingResult, AuditResponsePayload } from "@/types/aeo";
import { AlertCircle, Bot, Database, MapPin } from "lucide-react";

export default function CortexPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");
  const [currentKeyword, setCurrentKeyword] = useState("");
  const [auditResult, setAuditResult] = useState<AEOResult | null>(null);
  const [liveGrounding, setLiveGrounding] = useState<LiveGroundingResult | undefined>(undefined);
  const [scrapedData, setScrapedData] = useState<Record<string, unknown> | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

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

      const data: AuditResponsePayload = await res.json();

      if (!res.ok || !data.success || !data.data) {
        throw new Error(data.error || "Failed to execute AEO audit on target.");
      }

      setAuditResult(data.data);
      setLiveGrounding(data.liveGrounding);
      setScrapedData(data.scrapedData || null);
    } catch (err: unknown) {
      console.error(err);
      setErrorMsg(err instanceof Error ? err.message : "An unexpected error occurred during the audit.");
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
    <div className="relative min-h-[60vh] py-10 sm:py-16">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {!auditResult && !isLoading && (
          <div className="text-center max-w-4xl mx-auto space-y-6 pt-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-hairline bg-white/90 px-3.5 py-1.5 shadow-sm backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tech-blue opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-tech-blue"></span>
              </span>
              <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-700">
                sentiera Cortex // AEO Visibility Benchmark
              </span>
            </div>

            <h1 className="font-sans text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight-heading text-slate-950 leading-[0.96]">
              sentiera Cortex: Is your brand missing from the{" "}
              <span className="text-tech-blue">AI shortlist?</span>
            </h1>

            <p className="max-w-2xl mx-auto font-mono text-xs sm:text-sm text-slate-500 uppercase tracking-wide leading-relaxed">
              When buyers research using AI assistants, can they find your business? Evaluate live citation probability, entity clarity, and RAG-readiness.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-left max-w-3xl mx-auto">
              <div className="bg-white/90 p-4 rounded-xl border border-hairline/80 shadow-sm backdrop-blur-sm">
                <div className="flex items-center space-x-2 text-xs font-bold text-slate-900 mb-1">
                  <Bot className="w-3.5 h-3.5 text-tech-blue" />
                  <span>Recommendation Rate (40)</span>
                </div>
                <p className="text-[11px] text-slate-500 font-mono">
                  Semantic relevance and live citation probability in zero-shot answers.
                </p>
              </div>

              <div className="bg-white/90 p-4 rounded-xl border border-hairline/80 shadow-sm backdrop-blur-sm">
                <div className="flex items-center space-x-2 text-xs font-bold text-slate-900 mb-1">
                  <MapPin className="w-3.5 h-3.5 text-tech-blue" />
                  <span>Entity Health (30)</span>
                </div>
                <p className="text-[11px] text-slate-500 font-mono">
                  Brand disambiguation, physical jurisdiction, concrete offerings.
                </p>
              </div>

              <div className="bg-white/90 p-4 rounded-xl border border-hairline/80 shadow-sm backdrop-blur-sm">
                <div className="flex items-center space-x-2 text-xs font-bold text-slate-900 mb-1">
                  <Database className="w-3.5 h-3.5 text-tech-blue" />
                  <span>RAG-Readiness (30)</span>
                </div>
                <p className="text-[11px] text-slate-500 font-mono">
                  Machine-readable JSON-LD schema, headings, and clean Q&A chunking.
                </p>
              </div>
            </div>
          </div>
        )}

        {!auditResult && !isLoading && (
          <div>
            <AuditForm onSubmit={handleRunAudit} isLoading={isLoading} />
          </div>
        )}

        {isLoading && (
          <div className="max-w-3xl mx-auto">
            <AuditProgress targetUrl={currentUrl} targetKeyword={currentKeyword} />
          </div>
        )}

        {errorMsg && (
          <div className="max-w-3xl mx-auto p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 flex items-start space-x-3 text-xs font-mono shadow-sm">
            <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold uppercase">Audit Stream Failure:</span>
              <p>{errorMsg}</p>
            </div>
          </div>
        )}

        {auditResult && (
          <ReportDashboard
            result={auditResult}
            liveGrounding={liveGrounding}
            targetUrl={currentUrl}
            targetKeyword={currentKeyword}
            scrapedData={scrapedData}
            onReset={handleReset}
          />
        )}
      </div>
    </div>
  );
}
