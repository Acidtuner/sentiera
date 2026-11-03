"use client";

import React, { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [form, setForm] = useState({
    name: "",
    business: "",
    email: "",
    phone: "",
    website: "",
    help: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    // Mock submission - wire to form service or API in production
    setTimeout(() => {
      setStatus("success");
    }, 1000);
  };

  if (status === "success") {
    return (
      <div className="mt-12 p-8 border border-emerald-500/30 bg-emerald-50 text-emerald-800">
        <p className="font-semibold">Thank you. We&apos;ll be in touch soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-12 space-y-6">
      <div>
        <label className="block font-mono text-xs uppercase tracking-wide text-slate-600 mb-1">Name</label>
        <input name="name" required value={form.name} onChange={handleChange} className="w-full border border-hairline px-4 py-3 font-sans text-sm focus:border-tech-blue focus:outline-none" />
      </div>
      <div>
        <label className="block font-mono text-xs uppercase tracking-wide text-slate-600 mb-1">Business name</label>
        <input name="business" required value={form.business} onChange={handleChange} className="w-full border border-hairline px-4 py-3 font-sans text-sm focus:border-tech-blue focus:outline-none" />
      </div>
      <div>
        <label className="block font-mono text-xs uppercase tracking-wide text-slate-600 mb-1">Email</label>
        <input type="email" name="email" required value={form.email} onChange={handleChange} className="w-full border border-hairline px-4 py-3 font-sans text-sm focus:border-tech-blue focus:outline-none" />
      </div>
      <div>
        <label className="block font-mono text-xs uppercase tracking-wide text-slate-600 mb-1">Phone / WhatsApp</label>
        <input name="phone" required value={form.phone} onChange={handleChange} className="w-full border border-hairline px-4 py-3 font-sans text-sm focus:border-tech-blue focus:outline-none" />
      </div>
      <div>
        <label className="block font-mono text-xs uppercase tracking-wide text-slate-600 mb-1">Website (optional)</label>
        <input name="website" value={form.website} onChange={handleChange} className="w-full border border-hairline px-4 py-3 font-sans text-sm focus:border-tech-blue focus:outline-none" />
      </div>
      <div>
        <label className="block font-mono text-xs uppercase tracking-wide text-slate-600 mb-1">What would you like help with?</label>
        <select name="help" required value={form.help} onChange={handleChange} className="w-full border border-hairline px-4 py-3 font-sans text-sm focus:border-tech-blue focus:outline-none bg-white">
          <option value="">Select...</option>
          <option value="Visibility">Visibility</option>
          <option value="Growth">Growth</option>
          <option value="Events marketing">Events marketing</option>
          <option value="AI build">AI build</option>
          <option value="Not sure yet">Not sure yet</option>
        </select>
      </div>
      <div>
        <label className="block font-mono text-xs uppercase tracking-wide text-slate-600 mb-1">Message</label>
        <textarea name="message" rows={5} value={form.message} onChange={handleChange} className="w-full border border-hairline px-4 py-3 font-sans text-sm focus:border-tech-blue focus:outline-none" />
      </div>
      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-sm bg-tech-blue px-8 py-4 font-mono text-xs font-semibold uppercase tracking-wider text-white shadow-tech-button transition-all duration-200 hover:bg-tech-blue-600 disabled:opacity-50"
      >
        {status === "submitting" ? "Sending..." : "Send"}
      </button>
    </form>
  );
}
