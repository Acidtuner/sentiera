"use client";

import React, { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const [companyFax, setCompanyFax] = useState("");
  const [form, setForm] = useState({
    name: "",
    company: "",
    role: "",
    email: "",
    phone: "",
    website: "",
    engagement: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, company_fax: companyFax }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) {
        throw new Error(data.error || "We could not send your details.");
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "We could not send your details.");
    }
  };

  if (status === "success") {
    return (
      <div className="mt-12 p-8 border border-emerald-500/30 bg-emerald-50 text-emerald-800">
        <p className="font-semibold">Thank you. We&apos;ll be in touch soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-12 space-y-6" autoComplete="on">
      <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden">
        <label>
          Fax
          <input
            type="text"
            name="company_fax"
            value={companyFax}
            onChange={(e) => setCompanyFax(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block font-mono text-xs uppercase tracking-wide text-slate-600 mb-1">Name</label>
          <input name="name" required value={form.name} onChange={handleChange} className="w-full border border-hairline px-4 py-3 font-sans text-sm focus:border-tech-blue focus:outline-none" />
        </div>
        <div>
          <label className="block font-mono text-xs uppercase tracking-wide text-slate-600 mb-1">Company</label>
          <input name="company" required value={form.company} onChange={handleChange} className="w-full border border-hairline px-4 py-3 font-sans text-sm focus:border-tech-blue focus:outline-none" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block font-mono text-xs uppercase tracking-wide text-slate-600 mb-1">Role</label>
          <input name="role" value={form.role} onChange={handleChange} className="w-full border border-hairline px-4 py-3 font-sans text-sm focus:border-tech-blue focus:outline-none" />
        </div>
        <div>
          <label className="block font-mono text-xs uppercase tracking-wide text-slate-600 mb-1">Email</label>
          <input type="email" name="email" required value={form.email} onChange={handleChange} className="w-full border border-hairline px-4 py-3 font-sans text-sm focus:border-tech-blue focus:outline-none" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block font-mono text-xs uppercase tracking-wide text-slate-600 mb-1">Phone / WhatsApp</label>
          <input name="phone" required value={form.phone} onChange={handleChange} className="w-full border border-hairline px-4 py-3 font-sans text-sm focus:border-tech-blue focus:outline-none" />
        </div>
        <div>
          <label className="block font-mono text-xs uppercase tracking-wide text-slate-600 mb-1">Website</label>
          <input name="website" value={form.website} onChange={handleChange} className="w-full border border-hairline px-4 py-3 font-sans text-sm focus:border-tech-blue focus:outline-none" />
        </div>
      </div>
      <div>
        <label className="block font-mono text-xs uppercase tracking-wide text-slate-600 mb-1">Engagement of interest</label>
        <select name="engagement" required value={form.engagement} onChange={handleChange} className="w-full border border-hairline px-4 py-3 font-sans text-sm focus:border-tech-blue focus:outline-none bg-white">
          <option value="">Select...</option>
          <option value="Visibility Review">Visibility Review</option>
          <option value="Partnership Retainer">Partnership Retainer</option>
          <option value="AI Integration Programme">AI Integration Programme</option>
          <option value="Events and Campaigns">Events and Campaigns</option>
          <option value="Not sure yet">Not sure yet</option>
        </select>
      </div>
      <div>
        <label className="block font-mono text-xs uppercase tracking-wide text-slate-600 mb-1">Message</label>
        <textarea name="message" rows={5} value={form.message} onChange={handleChange} className="w-full border border-hairline px-4 py-3 font-sans text-sm focus:border-tech-blue focus:outline-none" />
      </div>
      {status === "error" && <p className="font-sans text-sm text-rose-600">{error}</p>}
      <button type="submit" disabled={status === "submitting"} className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-sm bg-tech-blue px-8 py-4 font-mono text-xs font-semibold uppercase tracking-wider text-white shadow-tech-button transition-all duration-200 hover:bg-tech-blue-600 disabled:opacity-50">
        {status === "submitting" ? "Sending..." : "Send your details"}
      </button>
    </form>
  );
}
