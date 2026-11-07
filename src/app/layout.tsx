import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

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
  metadataBase: new URL("https://www.sentieratech.com"),
  title: {
    default: "SEO & AEO Agency in Abu Dhabi | Sentiera Technologies",
    template: "%s | Sentiera Technologies",
  },
  description:
    "Help customers find and choose your business on Google and in AI answers. SEO, AEO, web, content and creative from Masdar City, Abu Dhabi.",
  keywords: [
    "Sentiera",
    "SEO Abu Dhabi",
    "AEO",
    "Answer Engine Optimisation",
    "Digital Marketing Abu Dhabi",
    "Masdar City",
    "UAE business marketing",
  ],
  authors: [{ name: "Sentiera Technologies LLC", url: "https://www.sentieratech.com" }],
  creator: "Sentiera Technologies LLC",
  icons: {
    icon: "/favicon.ico",
    apple: "/sentiera-logo.png",
  },
  openGraph: {
    title: "SEO & AEO Agency in Abu Dhabi | Sentiera Technologies",
    description: "Help customers find and choose your business on Google and in AI answers. SEO, AEO, web, content and creative from Masdar City, Abu Dhabi.",
    url: "https://www.sentieratech.com",
    siteName: "Sentiera Technologies",
    locale: "en_US",
    type: "website",
    images: [{ url: "/sentiera-logo.png", width: 1200, height: 630, alt: "Sentiera Technologies" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SEO & AEO Agency in Abu Dhabi | Sentiera Technologies",
    description: "Help customers find and choose your business on Google and in AI answers. SEO, AEO, web, content and creative from Masdar City, Abu Dhabi.",
    images: ["/sentiera-logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Sentiera Technologies LLC",
    url: "https://sentieratech.com",
    email: "hello@sentieratech.com",
    telephone: "+971585737464",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Masdar City, Abu Dhabi",
      addressCountry: "AE",
    },
    areaServed: ["Abu Dhabi", "Dubai"],
    knowsAbout: [
      "AI agents",
      "Chatbots",
      "SEO",
      "AEO",
      "Digital marketing strategy",
      "Social media creatives",
      "Website design and management",
      "Brand video and photography",
      "Brochures",
      "Events graphics",
      "Internal communications",
    ],
  };

  return (
    <html lang="en" className="scroll-smooth bg-white text-slate-950">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans min-h-screen bg-white text-slate-950 antialiased selection:bg-tech-blue selection:text-white flex flex-col`}
      >
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <div
          className="pointer-events-none fixed inset-0 z-0"
          aria-hidden="true"
          style={{
            backgroundImage: [
              "radial-gradient(ellipse 70% 50% at 8% -10%, rgba(255,46,156,0.10), transparent 55%)",
              "radial-gradient(ellipse 55% 40% at 100% 8%, rgba(255,46,156,0.07), transparent 50%)",
              "radial-gradient(ellipse 45% 35% at 90% 100%, rgba(255,46,156,0.06), transparent 55%)",
              "radial-gradient(ellipse 40% 30% at 0% 70%, rgba(0,102,255,0.04), transparent 50%)",
            ].join(", "),
          }}
        />
        <div
          className="pointer-events-none fixed inset-0 z-0 opacity-40 [background-image:linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] [background-size:64px_64px]"
          aria-hidden="true"
        />
        <Navbar />
        <main className="relative z-10 flex-1">{children}</main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
