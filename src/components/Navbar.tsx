"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface NavItem {
  id: string;
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: "01", label: "Services", href: "/services" },
  { id: "02", label: "Engagements", href: "/engagements" },
  { id: "03", label: "Cortex", href: "/cortex" },
  { id: "04", label: "About", href: "/about" },
  { id: "05", label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 16);
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
        <div className="flex items-center gap-4">
          <Link href="/" className="group flex items-center gap-3 transition-opacity hover:opacity-90" aria-label="Sentiera Home">
            <div className="relative flex items-center">
              <Image src="/sentiera-logo.png" alt="sentiera" width={124} height={32} priority className="h-6 w-auto object-contain sm:h-7" />
            </div>
          </Link>
          <div className="hidden border-l border-hairline pl-4 md:flex flex-col">
            <span className="font-mono text-[9px] font-medium uppercase tracking-widest-tag text-slate-400">Digital Marketing & AI</span>
            <span className="font-mono text-[9px] font-semibold uppercase tracking-wide-tag text-slate-600">Masdar City · UAE</span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.id} href={item.href} className="group relative flex items-center gap-1.5 py-1 text-xs transition-colors">
                <span className="font-mono text-[10px] text-slate-400 transition-colors group-hover:text-tech-blue">{item.id}</span>
                <span className={`font-mono text-[11px] font-medium tracking-wide uppercase transition-colors ${
                  isActive ? "text-tech-blue font-semibold" : "text-slate-700 group-hover:text-tech-blue"
                }`}>{item.label}</span>
                {isActive && (
                  <motion.div layoutId="activeNavIndicator" className="absolute -bottom-1 left-0 right-0 h-[2px] bg-tech-blue" transition={{ type: "spring", stiffness: 380, damping: 30 }} />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden sm:flex items-center gap-5">
          <Link href="/contact" className="group relative inline-flex items-center gap-2 overflow-hidden rounded-sm bg-tech-blue px-4 py-2 font-mono text-xs font-semibold uppercase tracking-wider text-white shadow-tech-button transition-all duration-200 hover:bg-tech-blue-600 active:scale-[0.98]">
            <span>Arrange a meeting</span>
            <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
          </Link>
        </div>

        <div className="flex md:hidden items-center gap-3">
          <Link href="/contact" className="rounded-sm bg-tech-blue px-3 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-white">Meet</Link>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 rounded-sm border border-hairline p-1 text-slate-900 focus:outline-none" aria-label="Toggle navigation menu" aria-expanded={mobileMenuOpen}>
            <motion.span animate={mobileMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }} className="h-[1.5px] w-5 bg-slate-900 origin-center transition-transform" />
            <motion.span animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }} className="h-[1.5px] w-5 bg-slate-900 transition-opacity" />
            <motion.span animate={mobileMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }} className="h-[1.5px] w-5 bg-slate-900 origin-center transition-transform" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.24, ease: "easeInOut" }} className="border-b border-hairline bg-white/95 px-6 py-6 backdrop-blur-md md:hidden">
            <div className="flex flex-col space-y-4">
              <div className="pb-2 border-b border-hairline/60"><span className="font-mono text-[10px] uppercase tracking-widest text-slate-400">Navigation</span></div>
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link key={item.id} href={item.href} onClick={() => setMobileMenuOpen(false)} className={`flex items-center justify-between py-2 border-b border-hairline/30 text-sm ${isActive ? "text-tech-blue" : "text-slate-900"}`}>
                    <span className="font-mono text-xs font-semibold uppercase tracking-wider hover:text-tech-blue">{item.label}</span>
                    <span className="font-mono text-xs text-slate-400">{item.id}</span>
                  </Link>
                );
              })}
              <div className="pt-3 flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase text-slate-500">Masdar City, Abu Dhabi, UAE</span>
                <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-tech-blue"><span className="h-1.5 w-1.5 rounded-full bg-tech-blue"></span>Active</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
