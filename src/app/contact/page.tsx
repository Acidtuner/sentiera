import React from "react";
import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Sentiera Technologies | Masdar City, Abu Dhabi",
  description: "Arrange a meeting with Sentiera Technologies in Masdar City, Abu Dhabi. SEO, AEO, websites and creative for businesses in Abu Dhabi and Dubai.",
};

export default function Contact() {
  return (
    <div className="relative bg-white">
      <section className="relative overflow-hidden border-b border-hairline pt-24 pb-16 sm:pt-32 sm:pb-20">
        <div className="pointer-events-none absolute inset-0 z-0 opacity-40 [background-image:radial-gradient(#0066FF_0.75px,transparent_0.75px)] [background-size:32px_32px]" aria-hidden="true" />
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] h-[360px] bg-tech-blue/5 blur-[120px] rounded-full" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest-tag text-tech-blue font-semibold mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-tech-blue" />
            <span>Contact</span>
          </div>
          <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight-heading text-slate-950">Arrange a meeting</h1>
          <p className="mt-4 font-sans text-lg text-slate-700 max-w-xl mx-auto">Share a few details about your business and we&apos;ll be in touch to find a time that suits you, in person or online.</p>
        </div>
      </section>

      <section className="relative bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <ContactForm />
          <div className="mt-16 pt-8 border-t border-hairline font-sans text-sm text-slate-600 space-y-1">
            <p className="font-semibold text-slate-900">Sentiera Technologies LLC</p>
            <p>Masdar City, Abu Dhabi</p>
            <p>Email: <a href="mailto:jay@sentieratech.com" className="text-tech-blue hover:underline">jay@sentieratech.com</a></p>
            <p>Phone / WhatsApp: <a href="https://wa.me/971585737464" className="text-tech-blue hover:underline">+971 58 573 7464</a></p>
          </div>
        </div>
      </section>
    </div>
  );
}
