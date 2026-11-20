"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

interface AuditFormProps {
  onSubmit: (data: {
    url: string;
    keyword: string;
    manual?: string;
    name: string;
    company: string;
    email: string;
    honeypot?: string;
  }) => void;
  isLoading: boolean;
  showManual?: boolean;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function QueryPrefill({
  onPrefill,
}: {
  onPrefill: (url: string | null, keyword: string | null) => void;
}) {
  const searchParams = useSearchParams();

  useEffect(() => {
    onPrefill(searchParams.get("url"), searchParams.get("keyword"));
  }, [searchParams, onPrefill]);

  return null;
}

export default function AuditForm({ onSubmit, isLoading, showManual = false }: AuditFormProps) {
  const [url, setUrl] = useState("");
  const [keyword, setKeyword] = useState("");
  const [manual, setManual] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [emailError, setEmailError] = useState("");

  const onPrefill = React.useCallback((nextUrl: string | null, nextKeyword: string | null) => {
    if (nextUrl) setUrl(nextUrl);
    if (nextKeyword) setKeyword(nextKeyword);
  }, []);

  const validateEmail = (value: string) => {
    if (!value) {
      setEmailError("Work email is required");
      return false;
    }
    if (!EMAIL_REGEX.test(value)) {
      setEmailError("Please enter a valid work email");
      return false;
    }
    setEmailError("");
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return;
    if (!agreed) return;
    if (!validateEmail(email)) return;
    if (url.trim() && name.trim() && company.trim()) {
      onSubmit({
        url: url.trim(),
        keyword: keyword.trim(),
        manual: manual.trim() || undefined,
        name: name.trim(),
        company: company.trim(),
        email: email.trim().toLowerCase(),
        honeypot,
      });
    }
  };

  return (
    <form id="cortex-form" onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-4 bg-white/90 p-6 border border-hairline shadow-sm">
      <Suspense fallback={null}>
        <QueryPrefill onPrefill={onPrefill} />
      </Suspense>

      <input
        type="text"
        name="company_url_check"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        className="absolute opacity-0 pointer-events-none h-0 w-0"
        tabIndex={-1}
        autoComplete="off"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block font-mono text-xs uppercase tracking-wide text-slate-500 mb-1">Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className="w-full px-3 py-2 border border-hairline font-mono text-sm focus:outline-none focus:border-tech-blue" required />
        </div>
        <div>
          <label className="block font-mono text-xs uppercase tracking-wide text-slate-500 mb-1">Company</label>
          <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company name" className="w-full px-3 py-2 border border-hairline font-mono text-sm focus:outline-none focus:border-tech-blue" required />
        </div>
      </div>

      <div>
        <label className="block font-mono text-xs uppercase tracking-wide text-slate-500 mb-1">Work email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (emailError) validateEmail(e.target.value);
          }}
          onBlur={() => validateEmail(email)}
          placeholder="you@company.com"
          className={`w-full px-3 py-2 border font-mono text-sm focus:outline-none focus:border-tech-blue ${emailError ? "border-rose-400" : "border-hairline"}`}
          required
        />
        {emailError && <p className="text-xs text-rose-600 mt-1 font-mono">{emailError}</p>}
      </div>

      <div>
        <label className="block font-mono text-xs uppercase tracking-wide text-slate-500 mb-1">Website URL</label>
        <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://example.com" className="w-full px-3 py-2 border border-hairline font-mono text-sm focus:outline-none focus:border-tech-blue" required />
      </div>

      <div>
        <label className="block font-mono text-xs uppercase tracking-wide text-slate-500 mb-1">A buyer topic you care about <span className="normal-case text-slate-400">(optional)</span></label>
        <input type="text" value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="industrial cable suppliers UAE" className="w-full px-3 py-2 border border-hairline font-mono text-sm focus:outline-none focus:border-tech-blue" />
      </div>

      {showManual && (
        <div>
          <label className="block font-mono text-xs uppercase tracking-wide text-slate-500 mb-1">Page text, if we could not read the site</label>
          <textarea value={manual} onChange={(e) => setManual(e.target.value)} placeholder="Paste the main page text here" rows={4} className="w-full px-3 py-2 border border-hairline font-mono text-sm focus:outline-none focus:border-tech-blue" />
        </div>
      )}

      <label className="flex items-start gap-2 text-xs text-slate-600 font-mono">
        <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-0.5" required />
        <span>
          I agree to the <a href="/privacy" className="text-tech-blue underline" target="_blank" rel="noopener noreferrer">Privacy Policy</a>. We use this to prepare and email your snapshot.
        </span>
      </label>

      <button type="submit" disabled={isLoading || !agreed} className="w-full bg-tech-blue text-white font-mono text-xs uppercase tracking-wider py-3 hover:bg-tech-blue-600 disabled:opacity-50">
        {isLoading ? "Preparing your snapshot..." : "Get my free snapshot"}
      </button>
    </form>
  );
}
