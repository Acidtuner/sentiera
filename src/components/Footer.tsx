import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative bg-slate-950 text-slate-300 border-t border-slate-800">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <p className="font-sans text-lg font-semibold text-white">Sentiera Technologies LLC</p>
            <p className="mt-4 font-sans text-sm leading-relaxed">
              Masdar City<br />
              Abu Dhabi<br />
              United Arab Emirates
            </p>
            <p className="mt-4 font-mono text-[11px] text-slate-500 uppercase tracking-wide">
              Licensed in Masdar City, Abu Dhabi
            </p>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-slate-500">Contact</p>
            <ul className="mt-4 space-y-2 font-sans text-sm">
              <li>
                <a href="mailto:hello@sentieratech.com" className="hover:text-white transition-colors">
                  hello@sentieratech.com
                </a>
              </li>
              <li>
                <a href="tel:+971585737464" className="hover:text-white transition-colors">
                  +971 58 573 7464
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-slate-500">Legal</p>
            <ul className="mt-4 space-y-2 font-sans text-sm">
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Use
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="font-mono text-[11px] text-slate-500">
            © {new Date().getFullYear()} Sentiera Technologies LLC. All rights reserved.
          </p>
          <p className="font-mono text-[11px] text-slate-500">
            Masdar City · Abu Dhabi · UAE
          </p>
        </div>
      </div>
    </footer>
  );
}
