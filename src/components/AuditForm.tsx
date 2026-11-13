"use client";

import React, { useState } from "react";

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
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function AuditForm({ onSubmit, isLoading }: AuditFormProps) {
  const [url, setUrl] = useState("");
  const [keyword, setKeyword] = useState("");
  const [manual, setManual] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [emailError, setEmailError] = useState("");

  const validateEmail = (value: string) => {
    if (!value) {
      setEmailError("Email is required");
      return false;
    }
    if (!EMAIL_REGEX.test(value)) {
      setEmailError("Please enter a valid email address");
      return false;
    }
    setEmailError("");
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return; // bot
    if (!agreed) return;
    if (!validateEmail(email)) return;
    if (url.trim() && keyword.trim() && name.trim() && company.trim()) {
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
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-4 bg-white/90 p-6 rounded-xl border border-hairline shadow-sm">
      {/* Honeypot - hidden from users */}
      <input
        type="text"
        name="website"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        className="absolute opacity-0 pointer-events-none h-0 w-0"
        tabIndex={-1}
        autoComplete="off"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block font-mono text-xs uppercase tracking-wide text-slate-500 mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="w-full px-3 py-2 border border-hairline rounded-sm font-mono text-sm focus:outline-none focus:border-tech-blue"
            required
          />
        </div>
        <div>
          <label className="block font-mono text-xs uppercase tracking-wide text-slate-500 mb-1">Company</label>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Company name"
            className="w-full px-3 py-2 border border-hairline rounded-sm font-mono text-sm focus:outline-none focus:border-tech-blue"
            required
          />
        </div>
      </div>

      <div>
        <label className="block font-mono text-xs uppercase tracking-wide text-slate-500 mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (emailError) validateEmail(e.target.value);
          }}
          onBlur={() => validateEmail(email)}
          placeholder="you@company.com"
          className={`w-full px-3 py-2 border rounded-sm font-mono text-sm focus:outline-none focus:border-tech-blue ${emailError ? "border-rose-400" : "border-hairline"}`}
          required
        />
        {emailError && <p className="text-xs text-rose-600 mt-1 font-mono">{emailError}</p>}
      </div>

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
          rows={3}
          className="w-full px-3 py-2 border border-hairline rounded-sm font-mono text-sm focus:outline-none focus:border-tech-blue"
        />
      </div>

      <label className="flex items-start gap-2 text-xs text-slate-600 font-mono">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="mt-0.5"
          required
        />
        <span>
          I agree to the <a href="/privacy" className="text-tech-blue underline" target="_blank" rel="noopener noreferrer">Privacy Policy</a> and <a href="/terms" className="text-tech-blue underline" target="_blank" rel="noopener noreferrer">Terms</a> for storing and emailing this analysis.
        </span>
      </label>

      <button
        type="submit"
        disabled={isLoading || !agreed}
        className="w-full bg-tech-blue text-white font-mono text-xs uppercase tracking-wider py-3 rounded-sm hover:bg-tech-blue-600 disabled:opacity-50"
      >
        {isLoading ? "Running Cortex Audit..." : "Run sentiera Cortex Audit"}
      </button>
    </form>
  );
}
