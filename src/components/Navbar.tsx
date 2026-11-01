"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface NavItem {
  id: string;
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: "01", label: "Ventures", href: "#ventures" },
  { id: "02", label: "Capabilities", href: "#capabilities" },
  { id: "03", label: "The Pathway", href: "#pathway" },
  { id: "04", label: "Terminal", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 16);

      // Simple active section detection for single page smooth scroll
      const sections = NAV_ITEMS.map((item) => item.href.replace("#", ""));
      const current = sections.find((sec) => {
        const el = document.getElementById(sec);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 120 && rect.bottom >= 120;
        }
        return false;
      });
      if (current) setActiveSection(`#${current}`);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-white/85 backdrop-blur-md border-b border-hairline/80 shadow-nav-scrolled"
          : "bg-white/60 backdrop-blur-sm border-b border-hairline/40"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Brand Logo & Studio Metadata */}
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="group flex items-center gap-3 transition-opacity hover:opacity-90"
            aria-label="Sentiera Home"
          >
            {/* Visual Logo mark matching attached asset */}
            <div className="relative flex items-center">
              <Image
                src="/sentiera-logo.png"
                alt="sentiera"
                width={124}
                height={32}
                priority
                className="h-6 w-auto object-contain sm:h-7"
              />
            </div>
          </Link>

          {/* Clinical Engineering Hub Tag */}
          <div className="hidden border-l border-hairline pl-4 md:flex flex-col">
            <span className="font-mono text-[9px] font-medium uppercase tracking-widest-tag text-slate-400">
              AI Venture Studio
            </span>
            <span className="font-mono text-[9px] font-semibold uppercase tracking-wide-tag text-slate-600">
              Masdar City · UAE
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.href;
            return (
              <a
                key={item.id}
                href={item.href}
                className="group relative flex items-center gap-1.5 py-1 text-xs transition-colors"
              >
                <span className="font-mono text-[10px] text-slate-400 transition-colors group-hover:text-tech-blue">
                  {item.id}
                </span>
                <span
                  className={`font-mono text-[11px] font-medium tracking-wide uppercase transition-colors ${
                    isActive
                      ? "text-tech-blue font-semibold"
                      : "text-slate-700 group-hover:text-tech-blue"
                  }`}
                >
                  {item.label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-tech-blue"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right Action & Operational Status Bead */}
        <div className="hidden sm:flex items-center gap-5">
          {/* Live Studio Status Indicator */}
          <div className="hidden xl:flex items-center gap-2 border border-hairline/80 bg-slate-50/70 px-2.5 py-1 rounded-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tech-blue opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-tech-blue"></span>
            </span>
            <span className="font-mono text-[9px] font-medium tracking-wide uppercase text-slate-600">
              Lab Online
            </span>
          </div>

          {/* Primary CTA: Tech Blue Minimalist Button */}
          <a
            href="#contact"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-sm bg-tech-blue px-4 py-2 font-mono text-xs font-semibold uppercase tracking-wider text-white shadow-tech-button transition-all duration-200 hover:bg-tech-blue-600 active:scale-[0.98]"
          >
            <span>Initiate</span>
            <span className="transition-transform duration-200 group-hover:translate-x-0.5">
              →
            </span>
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center gap-3">
          <a
            href="#contact"
            className="rounded-sm bg-tech-blue px-3 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-white"
          >
            Initiate
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 rounded-sm border border-hairline p-1 text-slate-900 focus:outline-none"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <motion.span
              animate={mobileMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className="h-[1.5px] w-5 bg-slate-900 origin-center transition-transform"
            />
            <motion.span
              animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="h-[1.5px] w-5 bg-slate-900 transition-opacity"
            />
            <motion.span
              animate={mobileMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              className="h-[1.5px] w-5 bg-slate-900 origin-center transition-transform"
            />
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.24, ease: "easeInOut" }}
            className="border-b border-hairline bg-white/95 px-6 py-6 backdrop-blur-md md:hidden"
          >
            <div className="flex flex-col space-y-4">
              <div className="pb-2 border-b border-hairline/60">
                <span className="font-mono text-[10px] uppercase tracking-widest text-slate-400">
                  Navigation Index // Masdar City
                </span>
              </div>
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-2 border-b border-hairline/30 text-sm"
                >
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-900 hover:text-tech-blue">
                    {item.label}
                  </span>
                  <span className="font-mono text-xs text-slate-400">
                    {item.id}
                  </span>
                </a>
              ))}
              <div className="pt-3 flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase text-slate-500">
                  Studio Node: Masdar City, UAE
                </span>
                <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-tech-blue">
                  <span className="h-1.5 w-1.5 rounded-full bg-tech-blue"></span>
                  Active
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
