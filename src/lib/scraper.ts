import * as cheerio from "cheerio";
import { ScrapedData } from "@/types/aeo";

function isPrivateOrLocalHost(hostname: string): boolean {
  const host = hostname.toLowerCase();

  if (host === "localhost" || host === "127.0.0.1" || host === "::1" || host === "0.0.0.0") {
    return true;
  }
  if (host === "169.254.169.254" || host.startsWith("169.254.")) {
    return true;
  }
  if (/^10\./.test(host) || /^192\.168\./.test(host) || /^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(host)) {
    return true;
  }
  if (host.endsWith(".local") || host.endsWith(".internal") || host.endsWith(".lan")) {
    return true;
  }
  return false;
}

export async function scrapeTargetUrl(targetUrl: string, manualContent?: string): Promise<ScrapedData> {
  let normalizedUrl = targetUrl.trim();
  if (!/^https?:\/\//i.test(normalizedUrl)) {
    normalizedUrl = `https://${normalizedUrl}`;
  }

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(normalizedUrl);
  } catch {
    throw new Error("Invalid target URL format.");
  }

  if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
    throw new Error("Target URL must use HTTP or HTTPS protocol.");
  }

  if (isPrivateOrLocalHost(parsedUrl.hostname)) {
    throw new Error("Target domain is private or local. For security, only public domains can be audited.");
  }

  if (manualContent && manualContent.trim().length > 50) {
    const clean = manualContent.trim();
    return {
      url: normalizedUrl,
      title: "Provided Manual Content",
      description: clean.slice(0, 160),
      headings: { h1: ["Provided Content"], h2: [], h3: [] },
      jsonLdSchemas: [],
      schemaMarkupDetected: false,
      bodyTextSnippet: clean.slice(0, 4000),
      fullCleanText: clean,
      wordCount: clean.split(/\s+/).length,
      openGraph: {},
      hasFaqStructure: /q:|question:|faq|frequently asked/i.test(clean),
      hasAuthorOrOrg: /company|agency|studio|organization|founded|headquartered/i.test(clean),
    };
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 12000);

  let html = "";
  try {
    const response = await fetch(normalizedUrl, {
      signal: controller.signal,
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; SentieraAEOBot/1.0; +https://sentieratech.com)",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
      redirect: "follow",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch URL: ${response.status} ${response.statusText}`);
    }
    html = await response.text();
  } catch (err: unknown) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error("Request timed out while fetching the target URL.");
    }
    throw new Error(`Scraping failed: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timeoutId);
  }

  const $ = cheerio.load(html);
  $("script, style, nav, footer, header, aside, noscript, iframe").remove();

  const title = $("title").text().trim() || "Untitled";
  const description = $('meta[name="description"]').attr("content") || $('meta[property="og:description"]').attr("content") || "";
  const canonical = $('link[rel="canonical"]').attr("href") || undefined;

  const h1 = $("h1").map((_, el) => $(el).text().trim()).get().filter(Boolean);
  const h2 = $("h2").map((_, el) => $(el).text().trim()).get().filter(Boolean);
  const h3 = $("h3").map((_, el) => $(el).text().trim()).get().filter(Boolean);

  const jsonLdSchemas: Record<string, unknown>[] = [];
  $('script[type="application/ld+json"]').each((_, el) => {
    try {
      const raw = $(el).html();
      if (raw) jsonLdSchemas.push(JSON.parse(raw));
    } catch { /* ignore */ }
  });

  const schemaMarkupDetected = jsonLdSchemas.length > 0;
  const fullCleanText = $("body").text().replace(/\s+/g, " ").trim();
  const wordCount = fullCleanText.split(/\s+/).length;
  const bodyTextSnippet = fullCleanText.slice(0, 4000);

  const openGraph: Record<string, string> = {};
  $('meta[property^="og:"]').each((_, el) => {
    const prop = $(el).attr("property");
    const content = $(el).attr("content");
    if (prop && content) openGraph[prop] = content;
  });

  const hasFaqStructure = /faq|frequently asked|q&a|questions and answers/i.test(fullCleanText) ||
    jsonLdSchemas.some((s) => JSON.stringify(s).toLowerCase().includes("faqpage"));
  const hasAuthorOrOrg = /company|organization|agency|studio|founded|headquartered|about us/i.test(fullCleanText) ||
    jsonLdSchemas.some((s) => JSON.stringify(s).toLowerCase().includes("organization") || JSON.stringify(s).toLowerCase().includes("person"));

  return {
    url: normalizedUrl,
    title,
    description,
    canonical,
    headings: { h1, h2, h3 },
    jsonLdSchemas,
    schemaMarkupDetected,
    bodyTextSnippet,
    fullCleanText,
    wordCount,
    openGraph,
    hasFaqStructure,
    hasAuthorOrOrg,
  };
}
