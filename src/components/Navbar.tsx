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
  children?: { label: string; href: string; note?: string }[];
}

const NAV_ITEMS: NavItem[] = [
  { id: "01", label: "Home", href: "/" },
  { id: "02", label: "About Sentiera", href: "/about" },
  {
    id: "03",
    label: "Products",
    href: "/products",
    children: [
      { label: "Sourza", href: "/products/sourza", note: "B2B procurement" },
      { label: "Cortex", href: "/cortex", note: "AI visibility" },
    ],
  },
  { id: "04", label: "Resources", href: "/resources" },
  { id: "05", label: "Contact", href: "/contact" },
];

function isActive(pathname: string, item: NavItem) {
  if (item.href === "/") return pathname === "/";
  if (item.children) {
    return (
      pathname === item.href ||
      pathname.startsWith("/products") ||
      pathname.startsWith("/cortex")
    );
  }
  return pathname === item.href || pathname.startsWith(item.href + "/");
}

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 16);
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
        <Link href="/" className="group flex items-center gap-3 transition-opacity hover:opacity-90" aria-label="Sentiera Home">
          <Image src="/sentiera-logo.png" alt="Sentiera" width={124} height={32} priority className="h-6 w-auto object-contain sm:h-7" />
          <div className="hidden border-l border-hairline pl-4 md:flex flex-col">
            <span className="font-mono text-[9px] font-medium uppercase tracking-widest-tag text-slate-400">The intelligence pathway</span>
            <span className="font-mono text-[9px] font-semibold uppercase tracking-wide-tag text-slate-600">Masdar City · UAE</span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {NAV_ITEMS.map((item) => {
            const active = isActive(pathname, item);
            if (item.children) {
              return (
                <div
                  key={item.id}
                  className="relative"
                  onMouseEnter={() => setProductsOpen(true)}
                  onMouseLeave={() => setProductsOpen(false)}
                >
                  <Link href={item.href} className="group relative flex items-center gap-1.5 py-1 text-xs transition-colors">
                    <span className="font-mono text-[10px] text-slate-400 group-hover:text-tech-blue">{item.id}</span>
                    <span className={`font-mono text-[11px] font-medium tracking-wide uppercase ${active ? "text-tech-blue font-semibold" : "text-slate-700 group-hover:text-tech-blue"}`}>
                      {item.label}
                    </span>
                    {active && <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-tech-blue" />}
                  </Link>
                  <AnimatePresence>
                    {productsOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        className="absolute left-0 top-full pt-3 w-56"
                      >
                        <div className="border border-hairline bg-white shadow-lg">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="block px-4 py-3 border-b border-hairline last:border-b-0 hover:bg-slate-50"
                            >
                              <span className="block font-mono text-[11px] font-semibold uppercase tracking-wider text-slate-900">{child.label}</span>
                              {child.note && <span className="block font-sans text-xs text-slate-500 mt-0.5">{child.note}</span>}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }
            return (
              <Link key={item.id} href={item.href} className="group relative flex items-center gap-1.5 py-1 text-xs transition-colors">
                <span className="font-mono text-[10px] text-slate-400 group-hover:text-tech-blue">{item.id}</span>
                <span className={`font-mono text-[11px] font-medium tracking-wide uppercase ${active ? "text-tech-blue font-semibold" : "text-slate-700 group-hover:text-tech-blue"}`}>
                  {item.label}
                </span>
                {active && <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-tech-blue" />}
              </Link>
            );
          })}
        </nav>

        <div className="hidden sm:flex items-center gap-5">
          <Link href="/cortex" className="group relative inline-flex items-center gap-2 overflow-hidden rounded-sm bg-tech-blue px-4 py-2 font-mono text-xs font-semibold uppercase tracking-wider text-white shadow-tech-button transition-all duration-200 hover:bg-tech-blue-600 hover:shadow-accent-glow active:scale-[0.98]">
            <span>Run diagnostic</span>
            <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
          </Link>
        </div>

        <div className="flex lg:hidden items-center gap-3">
          <Link href="/cortex" className="rounded-sm bg-tech-blue px-3 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-white">Cortex</Link>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 rounded-sm border border-hairline p-1 text-slate-900" aria-label="Toggle navigation menu" aria-expanded={mobileMenuOpen}>
            <motion.span animate={mobileMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }} className="h-[1.5px] w-5 bg-slate-900 origin-center" />
            <motion.span animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }} className="h-[1.5px] w-5 bg-slate-900" />
            <motion.span animate={mobileMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }} className="h-[1.5px] w-5 bg-slate-900 origin-center" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="border-b border-hairline bg-white/95 px-6 py-6 backdrop-blur-md lg:hidden">
            <div className="flex flex-col space-y-3">
              {NAV_ITEMS.map((item) => (
                <div key={item.id}>
                  <Link href={item.href} onClick={() => setMobileMenuOpen(false)} className={`flex items-center justify-between py-2 border-b border-hairline/30 text-sm ${isActive(pathname, item) ? "text-tech-blue" : "text-slate-900"}`}>
                    <span className="font-mono text-xs font-semibold uppercase tracking-wider">{item.label}</span>
                    <span className="font-mono text-xs text-slate-400">{item.id}</span>
                  </Link>
                  {item.children && (
                    <div className="pl-3 py-1">
                      {item.children.map((child) => (
                        <Link key={child.href} href={child.href} onClick={() => setMobileMenuOpen(false)} className="block py-1.5 font-mono text-[11px] uppercase tracking-wider text-slate-600 hover:text-tech-blue">
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
