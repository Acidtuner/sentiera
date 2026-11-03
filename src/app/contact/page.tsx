"use client";

import React, { useState } from "react";
import type { Metadata } from "next";

// Note: metadata export not allowed in client component; handled in layout or separate if needed.
// For simplicity, this is a client page for the form.

export default function Contact() {
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
    // Mock submission - in production, wire to form service or API
    setTimeout(() => {
      setStatus("success");
    }, 1000);
  };

  return (
    <div className="relative bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest-tag text-tech-blue font-semibold mb-4">
          <span className="h-1.5 w-1.5 rounded-full bg-tech-blue" />
          <span>Contact</span>
        </div>
        <h1 className="font-sans text-4xl sm:text-5xl font-bold tracking-tight-heading text-slate-950">
          Let's talk
        </h1>
        <p className="mt-4 font-sans text-lg text-slate-700">
          Tell us about your business. We reply within one working day.
        </p>

        {status === "success" ? (
          <div className="mt-12 p-8 border border-emerald-500/30 bg-emerald-50 text-emerald-800">
            <p className="font-semibold">Thank you. We'll be in touch soon.</p>
          </div>
        ) : (
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
        )}

        <div className="mt-16 pt-8 border-t border-hairline font-sans text-sm text-slate-600 space-y-1">
          <p className="font-semibold text-slate-900">Sentiera Technologies LLC</p>
          <p>Masdar City, Abu Dhabi</p>
          <p>Email: <a href="mailto:jay@sentieratech.com" className="text-tech-blue hover:underline">jay@sentieratech.com</a></p>
          <p>Phone / WhatsApp: <a href="tel:+971585737464" className="text-tech-blue hover:underline">+971 58 573 7464</a></p>
        </div>
      </div>
    </div>
  );
}
