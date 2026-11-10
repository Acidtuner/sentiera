import type { Metadata } from "next";

export const SITE_URL = "https://sentieratech.com";
export const OG_IMAGE = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: "Sentiera Technologies, Masdar City, Abu Dhabi",
};

/**
 * Page metadata with the SEO title used exactly as written (no brand suffix
 * appended by the layout template), a canonical URL on the non-www host,
 * and Open Graph / Twitter tags that point at the 1200x630 share image.
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: "Sentiera Technologies",
      locale: "en_US",
      type: "website",
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE.url],
    },
  };
}
