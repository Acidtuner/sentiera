"use client";

import React, { useState } from "react";

interface AuditFormProps {
  onSubmit: (url: string, keyword: string, manual?: string) => void;
  isLoading: boolean;
}

export default function AuditForm({ onSubmit, isLoading }: AuditFormProps) {
  const [url, setUrl] = useState("");
  const [keyword, setKeyword] = useState("");
  const [manual, setManual] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim() && keyword.trim()) {
      onSubmit(url.trim(), keyword.trim(), manual.trim() || undefined);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-4 bg-white/90 p-6 rounded-xl border border-hairline shadow-sm">
      <div>
        <label className="block font-mono text-xs uppercase tracking-wide text-slate-500 mb-1">Target URL</label>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
          className="w-full px-3 py-2 border border-hairline rounded-sm font-mono text-sm focus:outline-none focus:border-tech-blue"
          required
        />
      </div>
      <div>
        <label className="block font-mono text-xs uppercase tracking-wide text-slate-500 mb-1">Target Keyword / Intent</label>
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="SEO agency Abu Dhabi"
          className="w-full px-3 py-2 border border-hairline rounded-sm font-mono text-sm focus:outline-none focus:border-tech-blue"
          required
        />
      </div>
      <div>
        <label className="block font-mono text-xs uppercase tracking-wide text-slate-500 mb-1">Optional manual content (if scrape blocked)</label>
        <textarea
          value={manual}
          onChange={(e) => setManual(e.target.value)}
          placeholder="Paste page text here..."
          rows={4}
          className="w-full px-3 py-2 border border-hairline rounded-sm font-mono text-sm focus:outline-none focus:border-tech-blue"
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-tech-blue text-white font-mono text-xs uppercase tracking-wider py-3 rounded-sm hover:bg-tech-blue-600 disabled:opacity-50"
      >
        {isLoading ? "Running Cortex Audit..." : "Run sentiera Cortex Audit"}
      </button>
    </form>
  );
}
