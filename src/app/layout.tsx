import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Link from "next/link";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
});

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
  metadataBase: new URL("https://cortex.sentieratech.com"),
  title: {
    default: "sentiera Cortex | AI Visibility Audit",
    template: "%s | sentiera Cortex",
  },
  description:
    "See how visible your business is to AI answers. Free AEO / GEO audit covering content clarity, structured data, crawler access, llms.txt and citation readiness.",
  keywords: [
    "AEO",
    "Answer Engine Optimisation",
    "GEO",
    "AI visibility",
    "sentiera Cortex",
    "ChatGPT visibility",
    "Gemini citations",
  ],
  authors: [{ name: "Sentiera Technologies LLC", url: "https://sentieratech.com" }],
  creator: "Sentiera Technologies LLC",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "sentiera Cortex | AI Visibility Audit",
    description: "Free AEO / GEO audit for AI answer engines.",
    url: "https://cortex.sentieratech.com",
    siteName: "sentiera Cortex",
    locale: "en_US",
    type: "website",
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
        <header className="border-b border-hairline bg-white/80 backdrop-blur-sm">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <Link href="/" className="font-sans text-lg font-bold tracking-tight text-slate-950">
              sentiera <span className="text-tech-blue">Cortex</span>
            </Link>
            <a
              href="https://sentieratech.com"
              className="font-mono text-xs uppercase tracking-wider text-slate-500 hover:text-tech-blue"
            >
              by Sentiera →
            </a>
          </div>
        </header>
        <main className="relative z-10 flex-1">{children}</main>
        <footer className="border-t border-hairline py-6 text-center">
          <p className="font-mono text-[11px] text-slate-400">
            sentiera Cortex · A free AI visibility tool by{" "}
            <a href="https://sentieratech.com" className="text-tech-blue hover:underline">
              Sentiera Technologies
            </a>
          </p>
        </footer>
      </body>
    </html>
  );
}
