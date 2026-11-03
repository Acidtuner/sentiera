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
  metadataBase: new URL("https://www.sentieratech.com"),
  title: {
    default: "Sentiera Technologies | SEO, AEO, Content and AI for UAE Businesses",
    template: "%s | Sentiera Technologies",
  },
  description:
    "Get found in Google and in AI answers like ChatGPT. SEO, AEO, photo and video, events marketing, social and AI builds for UAE small and medium businesses. Based in Masdar City.",
  keywords: [
    "Sentiera",
    "SEO UAE",
    "AEO",
    "Answer Engine Optimisation",
    "Digital Marketing Abu Dhabi",
    "AI for SMBs",
    "Masdar City",
    "UAE small business marketing",
  ],
  authors: [{ name: "Sentiera Technologies LLC", url: "https://www.sentieratech.com" }],
  creator: "Sentiera Technologies LLC",
  icons: {
    icon: "/favicon.ico",
    apple: "/sentiera-logo.png",
  },
  openGraph: {
    title: "Sentiera Technologies | SEO, AEO, Content and AI for UAE Businesses",
    description:
      "Get found in Google and in AI answers like ChatGPT. SEO, AEO, photo and video, events marketing, social and AI builds for UAE small and medium businesses.",
    url: "https://www.sentieratech.com",
    siteName: "Sentiera Technologies",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/sentiera-logo.png",
        width: 1200,
        height: 630,
        alt: "Sentiera Technologies",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sentiera Technologies | SEO, AEO, Content and AI for UAE Businesses",
    description:
      "Get found in Google and in AI answers like ChatGPT. SEO, AEO, photo and video, events marketing, social and AI builds for UAE small and medium businesses.",
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
