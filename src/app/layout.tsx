import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import { OG_IMAGE } from "@/lib/seo";

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

const META_PIXEL_ID = "1111758175170543";
const GTM_ID = "GTM-N5HXDN3L";

export const viewport: Viewport = {
  themeColor: "#0066FF",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://sentieratech.com"),
  title: {
    default: "SEO & AEO Agency in Abu Dhabi | Sentiera Technologies",
    // Pages with a full SEO title set it with title.absolute (see src/lib/seo.ts),
    // so the brand is not appended twice. Short titles (e.g. Privacy Policy) still use this.
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
    title: "SEO & AEO Agency in Abu Dhabi | Sentiera Technologies",
    description: "Help customers find and choose your business on Google and in AI answers. SEO, AEO, web, content and creative from Masdar City, Abu Dhabi.",
    url: "/",
    siteName: "Sentiera Technologies",
    locale: "en_US",
    type: "website",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "SEO & AEO Agency in Abu Dhabi | Sentiera Technologies",
    description: "Help customers find and choose your business on Google and in AI answers. SEO, AEO, web, content and creative from Masdar City, Abu Dhabi.",
    images: [OG_IMAGE.url],
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
      <head>
        <Script id="gtm" strategy="beforeInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `}
        </Script>
        <Script id="meta-pixel" strategy="beforeInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${META_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans min-h-screen bg-white text-slate-950 antialiased selection:bg-tech-blue selection:text-white flex flex-col`}
      >
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
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
