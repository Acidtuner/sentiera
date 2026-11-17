"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function DiagnosticForm() {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [keyword, setKeyword] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (url.trim()) params.set("url", url.trim());
    if (keyword.trim()) params.set("keyword", keyword.trim());
    router.push(`/cortex${params.toString() ? `?${params.toString()}` : ""}`);
  }

  return (
    <form onSubmit={onSubmit} className="w-full max-w-2xl border border-hairline bg-white/90 p-4 sm:p-5 shadow-sm backdrop-blur-sm">
      <div className="flex items-center justify-between mb-3">
        <span className="font-mono text-[10px] uppercase tracking-widest text-slate-500">// Cortex · AI visibility diagnostic</span>
        <span className="font-mono text-[10px] uppercase tracking-wider text-tech-blue">Live</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter your company URL..."
          className="w-full border border-hairline px-3 py-3 font-mono text-sm focus:border-tech-blue focus:outline-none"
          required
        />
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Enter your target commercial keyword..."
          className="w-full border border-hairline px-3 py-3 font-mono text-sm focus:border-tech-blue focus:outline-none"
          required
        />
      </div>
      <button
        type="submit"
        className="mt-3 w-full bg-tech-blue px-4 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-tech-blue-600 hover:shadow-accent-glow"
      >
        Run AI Visibility Diagnostic →
      </button>
    </form>
  );
}
