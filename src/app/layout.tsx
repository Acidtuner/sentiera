import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";

// Geist Sans for authoritative, tight-tracking primary headings & body
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
});

// Geist Mono for clinical subtext, coordinate metadata, tags, and secondary UI
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0066FF",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://sentiera.ai"),
  title: {
    default: "sentiera — AI Venture Studio & Digital Agency | Masdar City",
    template: "%s | sentiera",
  },
  description:
    "Sentiera is a frontier AI venture studio and digital agency based in Masdar City. Architecting autonomous systems, venture-scale intelligence, and high-impact digital experiences.",
  keywords: [
    "Sentiera",
    "AI Venture Studio",
    "Masdar City AI",
    "Digital Agency Abu Dhabi",
    "Autonomous Systems",
    "Frontier Intelligence",
    "Boutique Engineering Firm",
  ],
  authors: [{ name: "Sentiera Technologies LLC", url: "https://sentiera.ai" }],
  creator: "Sentiera Technologies LLC",
  icons: {
    icon: "/favicon.ico",
    apple: "/sentiera-logo.png",
  },
  openGraph: {
    title: "sentiera — AI Venture Studio & Digital Agency",
    description:
      "A clinical, high-end engineering firm architecting next-generation AI ventures from Masdar City.",
    url: "https://sentiera.ai",
    siteName: "sentiera",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/sentiera-logo.png",
        width: 1200,
        height: 630,
        alt: "sentiera — AI Venture Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "sentiera — AI Venture Studio & Digital Agency",
    description:
      "A clinical, high-end engineering firm architecting next-generation AI ventures from Masdar City.",
    images: ["/sentiera-logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth bg-white text-slate-950">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans min-h-screen bg-white text-slate-950 antialiased selection:bg-tech-blue selection:text-white flex flex-col`}
      >
        {/* Architectural hairline grid lines for subtle high-end studio depth */}
        <div
          className="pointer-events-none fixed inset-0 z-0 opacity-40 [background-image:linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] [background-size:64px_64px]"
          aria-hidden="true"
        />

        {/* Minimalist Sticky Navigation Bar */}
        <Navbar />

        {/* Overarching Main Canvas */}
        <main className="relative z-10 flex-1">{children}</main>
      </body>
    </html>
  );
}
