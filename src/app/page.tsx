import React from "react";
import Hero from "@/components/Hero";
import Pedigree from "@/components/Pedigree";
import Ventures from "@/components/Ventures";
import Capabilities from "@/components/Capabilities";
import Pathway from "@/components/Pathway";
import Terminal from "@/components/Terminal";

export default function Home() {
  return (
    <div className="relative">
      {/* 01. HERO SECTION (Massive Geist typography & square-cornered CTA) */}
      <Hero />

      {/* 02. TECHNICAL PEDIGREE MARQUEE (Infinite-scroll greyscale partners) */}
      <Pedigree />

      {/* 03. PROPRIETARY IP / VENTURES (Dark mode inversion with Sourza) */}
      <Ventures />

      {/* 04. CAPABILITIES (Clean 2-column industrial grid with 1px borders) */}
      <Capabilities />

      {/* 05. THE PATHWAY (3-step digital node methodology) */}
      <Pathway />

      {/* 06. THE TERMINAL (CLI Intake Modal & Masdar City Free Zone footer) */}
      <Terminal />
    </div>
  );
}
