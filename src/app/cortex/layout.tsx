import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Cortex: AEO Visibility Snapshot | Sentiera Technologies",
  description:
    "A free snapshot of how ready your brand is for AI-assisted search, and where to improve. From Sentiera Technologies, Dubai and Abu Dhabi.",
  alternates: { canonical: "/cortex" },
  openGraph: {
    title: "Cortex: AEO Visibility Snapshot | Sentiera Technologies",
    description:
      "A free snapshot of how ready your brand is for AI-assisted search, and where to improve. From Sentiera Technologies, Dubai and Abu Dhabi.",
    url: "/cortex",
    type: "website",
  },
};

export default function CortexLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Cortex: AEO Visibility Snapshot",
    description:
      "A free snapshot of how ready your brand is for AI-assisted search, and where to improve.",
    url: "https://www.sentieratech.com/cortex",
    isPartOf: {
      "@type": "WebSite",
      name: "Sentiera Technologies",
      url: "https://www.sentieratech.com",
    },
    provider: {
      "@type": "Organization",
      name: "Sentiera Technologies Limited",
      url: "https://www.sentieratech.com",
    },
  };

  return (
    <Suspense fallback={null}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </Suspense>
  );
}
