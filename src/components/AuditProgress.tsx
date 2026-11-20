"use client";

import React, { useEffect, useState } from "react";

interface AuditProgressProps {
  targetUrl: string;
  targetKeyword: string;
  attempt?: number;
}

export default function AuditProgress({ targetUrl, targetKeyword, attempt = 1 }: AuditProgressProps) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setElapsed((value) => value + 1), 1000);
    return () => clearInterval(id);
  }, [attempt]);

  const waiting = elapsed >= 12;

  return (
    <div className="text-center space-y-6 py-12">
      <div className="inline-flex items-center gap-2">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tech-blue opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-tech-blue"></span>
        </span>
        <span className="font-mono text-sm uppercase tracking-wider text-slate-700">
          {attempt > 1 ? "Trying once more…" : "Asking Gemini…"}
        </span>
      </div>
      <p className="font-mono text-xs text-slate-500">
        {targetKeyword ? `Topic: ${targetKeyword}` : targetUrl}
      </p>

      <div className="mx-auto max-w-md">
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
          <div className="h-full animate-progress-indeterminate rounded-full bg-tech-blue" />
        </div>
        <p className="mt-4 font-sans text-sm text-slate-700">
          {attempt > 1
            ? "The first attempt did not return. Running it once more."
            : "This usually takes 15 to 30 seconds. Please keep this page open."}
        </p>
        {waiting && (
          <p className="mt-2 font-sans text-xs text-slate-500">Still working. Gemini can be slow on the first answer.</p>
        )}
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
