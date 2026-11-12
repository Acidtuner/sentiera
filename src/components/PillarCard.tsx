"use client";

import React from "react";

interface PillarCardProps {
  title: string;
  score: number;
  max: number;
  description?: string;
}

export default function PillarCard({ title, score, max, description }: PillarCardProps) {
  const pct = Math.round((score / max) * 100);
  return (
    <div className="bg-white p-4 rounded-xl border border-hairline">
      <div className="flex justify-between items-baseline mb-2">
        <span className="font-mono text-xs uppercase tracking-wide text-slate-700">{title}</span>
        <span className="font-sans text-lg font-bold text-slate-950">{score}<span className="text-sm text-slate-400">/{max}</span></span>
      </div>
      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
        <div className="h-full bg-tech-blue" style={{ width: `${pct}%` }} />
      </div>
      {description && <p className="mt-2 text-xs text-slate-500 font-mono">{description}</p>}
    </div>
  );
}
