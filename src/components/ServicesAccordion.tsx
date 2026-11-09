"use client";

import React, { useState } from "react";
import Link from "next/link";

export interface ServiceItem {
  id: string;
  title: string;
  summary: string;
  detail?: string;
  items: string[];
  cta: string;
  ctaHref: string;
}

export default function ServicesAccordion({ services }: { services: ServiceItem[] }) {
  const [openId, setOpenId] = useState<string | null>(services[0]?.id ?? null);

  return (
    <div className="divide-y divide-hairline border-t border-b border-hairline">
      {services.map((service) => {
        const isOpen = openId === service.id;
        return (
          <div key={service.id} id={service.id} className="bg-white">
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : service.id)}
              className="w-full flex items-center justify-between gap-4 px-6 py-6 sm:py-8 text-left hover:bg-slate-50/50 transition-colors"
              aria-expanded={isOpen}
              aria-controls={`panel-${service.id}`}
            >
              <span className="flex items-center">
                <span className="mr-3 text-tech-blue font-mono text-lg" aria-hidden="true">{isOpen ? "—" : "+"}</span>
                <h2 className="font-sans text-2xl sm:text-3xl font-bold text-slate-950">{service.title}</h2>
              </span>
            </button>

            {/* Always in the DOM so crawlers and AI tools can read it */}
            <div
              id={`panel-${service.id}`}
              className={isOpen ? "block" : "hidden"}
              // hidden removes from visual layout but content remains in HTML source
            >
              <div className="px-6 pb-8 sm:pb-10">
                {service.detail ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    <p className="font-sans text-base text-slate-700 leading-relaxed">{service.summary}</p>
                    <p className="font-sans text-base text-slate-600 leading-relaxed">{service.detail}</p>
                  </div>
                ) : (
                  <p className="max-w-3xl font-sans text-base text-slate-700 leading-relaxed">{service.summary}</p>
                )}

                <ul className="mt-8 flex flex-wrap gap-2 list-none p-0">
                  {service.items.map((item) => (
                    <li
                      key={item}
                      className="inline-flex items-center rounded-full border border-hairline bg-white px-3.5 py-1.5 font-sans text-xs text-slate-700"
                    >
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <Link
                    href={service.ctaHref}
                    className="inline-flex items-center gap-2 rounded-full border border-tech-blue px-5 py-2 font-mono text-xs font-semibold uppercase tracking-wider text-tech-blue hover:bg-tech-blue hover:text-white transition-colors"
                  >
                    {service.cta}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
