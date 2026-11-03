import React from "react";
import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Sentiera Technologies | Masdar City, Abu Dhabi",
  description: "Book a free visibility check or ask a question. Sentiera Technologies, Masdar City, Abu Dhabi, UAE.",
};

export default function Contact() {
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

        <ContactForm />

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
