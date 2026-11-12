"use client";

import React from "react";
import { AEOResult, LiveGroundingResult } from "@/types/aeo";
import PillarCard from "@/components/PillarCard";
import { RotateCcw } from "lucide-react";

interface ReportDashboardProps {
  result: AEOResult;
  liveGrounding?: LiveGroundingResult;
  targetUrl: string;
  targetKeyword: string;
  scrapedData?: Record<string, unknown> | null;
  onReset: () => void;
}

export default function ReportDashboard({
  result,
  liveGrounding,
  targetUrl,
  targetKeyword,
  onReset,
}: ReportDashboardProps) {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="font-sans text-3xl font-bold text-slate-950">sentiera Cortex Score</h2>
        <p className="font-mono text-sm text-slate-500 mt-1">{targetUrl} · {targetKeyword}</p>
        <div className="mt-6 inline-flex items-center justify-center w-32 h-32 rounded-full border-4 border-tech-blue bg-tech-blue/5">
          <span className="font-sans text-5xl font-bold text-tech-blue">{result.overall_aeo_score}</span>
        </div>
        <p className="mt-2 font-mono text-xs uppercase tracking-wider text-slate-500">
          {result.is_invisible_to_ai ? "Invisible to AI" : "Visible to AI"}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <PillarCard title="AI Recommendation" score={result.metrics.ai_recommendation_rate} max={40} />
        <PillarCard title="Entity Health" score={result.metrics.entity_accuracy_health} max={30} />
        <PillarCard title="RAG-Readiness" score={result.metrics.rag_readiness_score} max={30} />
      </div>

      <div className="bg-white p-6 rounded-xl border border-hairline">
        <h3 className="font-mono text-xs uppercase tracking-widest text-slate-500 mb-2">Diagnostic Summary</h3>
        <p className="text-sm text-slate-800 leading-relaxed">{result.diagnostic_summary}</p>
      </div>

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
