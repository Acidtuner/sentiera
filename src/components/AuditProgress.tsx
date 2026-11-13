"use client";

import React, { useEffect, useState } from "react";

interface AuditProgressProps {
  targetUrl: string;
  targetKeyword: string;
}

const STATUSES = [
  "Discovering pages from sitemap…",
  "Fetching and analyzing content…",
  "Evaluating AI visibility signals…",
  "Scoring recommendation rate, entity health & RAG-readiness…",
  "Preparing your Cortex report…",
];

export default function AuditProgress({ targetUrl, targetKeyword }: AuditProgressProps) {
  const [statusIndex, setStatusIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setStatusIndex((i) => (i + 1) % STATUSES.length);
    }, 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="text-center space-y-6 py-12">
      <div className="inline-flex items-center gap-2">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tech-blue opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-tech-blue"></span>
        </span>
        <span className="font-mono text-sm uppercase tracking-wider text-slate-700">sentiera Cortex running…</span>
      </div>
      <p className="font-mono text-xs text-slate-500">
        Analyzing {targetUrl} for “{targetKeyword}”
      </p>

      <div className="max-w-xs mx-auto">
        <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
          <div className="h-full bg-tech-blue rounded-full animate-progress-indeterminate" />
        </div>
        <p className="mt-3 font-mono text-xs text-slate-600 h-4">{STATUSES[statusIndex]}</p>
      </div>

      <style jsx>{`
        @keyframes progress-indeterminate {
          0% { transform: translateX(-100%); width: 40%; }
          50% { transform: translateX(50%); width: 60%; }
          100% { transform: translateX(200%); width: 40%; }
        }
        .animate-progress-indeterminate {
          animation: progress-indeterminate 1.8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
