"use client";

import React from "react";

interface AuditProgressProps {
  targetUrl: string;
  targetKeyword: string;
}

export default function AuditProgress({ targetUrl, targetKeyword }: AuditProgressProps) {
  return (
    <div className="text-center space-y-4 py-12">
      <div className="inline-flex items-center gap-2">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tech-blue opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-tech-blue"></span>
        </span>
        <span className="font-mono text-sm uppercase tracking-wider text-slate-700">sentiera Cortex running…</span>
      </div>
      <p className="font-mono text-xs text-slate-500">
        Scraping {targetUrl} for “{targetKeyword}”
      </p>
      <div className="h-1 w-48 mx-auto bg-slate-200 rounded overflow-hidden">
        <div className="h-full bg-tech-blue animate-pulse w-3/4"></div>
      </div>
    </div>
  );
}
