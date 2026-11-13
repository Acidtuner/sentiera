import * as cheerio from "cheerio";
import { ScrapedData, AnalyzedPage } from "@/types/aeo";

const BROWSER_HEADERS = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
  "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
  "Accept-Language": "en-US,en;q=0.9",
  "Accept-Encoding": "gzip, deflate, br",
  "Cache-Control": "no-cache",
  "Pragma": "no-cache",
  "Sec-Fetch-Dest": "document",
  "Sec-Fetch-Mode": "navigate",
  "Sec-Fetch-Site": "none",
  "Sec-Fetch-User": "?1",
  "Upgrade-Insecure-Requests": "1",
};

const HIGH_VALUE_PATHS = ["/about", "/services", "/service", "/contact", "/faq", "/about-us", "/our-services", "/pricing"];
const MAX_PAGES = 8;

function isPrivateOrLocalHost(hostname: string): boolean {
  const host = hostname.toLowerCase();
  if (host === "localhost" || host === "127.0.0.1" || host === "::1" || host === "0.0.0.0") return true;
  if (host === "169.254.169.254" || host.startsWith("169.254.")) return true;
  if (/^10\./.test(host) || /^192\.168\./.test(host) || /^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(host)) return true;
  if (host.endsWith(".local") || host.endsWith(".internal") || host.endsWith(".lan")) return true;
  return false;
}

async function fetchWithTimeout(url: string, timeoutMs = 12000): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, {
      signal: controller.signal,
      headers: BROWSER_HEADERS,
      redirect: "follow",
    });
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function discoverSitemapUrls(baseUrl: string, maxUrls = 40): Promise<string[]> {
  let parsed: URL;
  try {
    parsed = new URL(baseUrl);
  } catch {
    return [];
  }

  const origin = parsed.origin;
  const candidates = [
    `${origin}/sitemap.xml`,
    `${origin}/sitemap_index.xml`,
    `${origin}/sitemap-index.xml`,
    `${origin}/wp-sitemap.xml`,
    `${origin}/sitemap/sitemap.xml`,
  ];

  const seen = new Set<string>();
  const result: string[] = [];

  for (const sitemapUrl of candidates) {
    if (result.length >= maxUrls) break;
    try {
      const res = await fetchWithTimeout(sitemapUrl, 8000);
      if (!res.ok) continue;
      const text = await res.text();
      if (!text.includes("<urlset") && !text.includes("<sitemapindex") && !text.includes("<sitemap")) continue;

      const urls = await parseSitemapXml(text, origin, maxUrls - result.length);
      for (const u of urls) {
        if (!seen.has(u) && result.length < maxUrls) {
          seen.add(u);
          result.push(u);
        }
      }
      if (result.length > 0) break;
    } catch {
      // try next
    }
  }

  return result;
}

async function parseSitemapXml(xml: string, origin: string, remaining: number): Promise<string[]> {
  const urls: string[] = [];
  const locRegex = /<loc[^>]*>([^<]+)<\/loc>/gi;
  let match: RegExpExecArray | null;

  if (xml.includes("<sitemapindex") || xml.includes("<sitemap>")) {
    const indexLocs: string[] = [];
    while ((match = locRegex.exec(xml)) !== null && indexLocs.length < 5) {
      const loc = match[1].trim();
      if (loc.startsWith("http")) indexLocs.push(loc);
    }
    for (const child of indexLocs) {
      if (urls.length >= remaining) break;
      try {
        const res = await fetchWithTimeout(child, 8000);
        if (!res.ok) continue;
        const childXml = await res.text();
        const childUrls = await parseSitemapXml(childXml, origin, remaining - urls.length);
        urls.push(...childUrls);
      } catch {
        // skip
      }
    }
    return urls.slice(0, remaining);
  }

  locRegex.lastIndex = 0;
  while ((match = locRegex.exec(xml)) !== null && urls.length < remaining) {
    const loc = match[1].trim();
    if (loc.startsWith("http") && loc.includes(new URL(origin).hostname)) {
      urls.push(loc);
    }
  }
  return urls;
}

function selectPages(userUrl: string, sitemapUrls: string[], keyword: string): { url: string; reason: string }[] {
  const selected: { url: string; reason: string }[] = [];
  const seen = new Set<string>();

  const add = (url: string, reason: string) => {
    if (!seen.has(url) && selected.length < MAX_PAGES) {
      seen.add(url);
      selected.push({ url, reason });
    }
  };

  // 1. Always include user-provided URL
  add(userUrl, "User-provided");

  const kw = keyword.toLowerCase();
  const origin = new URL(userUrl).origin;

  // 2. Keyword matches in path or likely title
  for (const u of sitemapUrls) {
    const path = new URL(u).pathname.toLowerCase();
    if (path.includes(kw) || u.toLowerCase().includes(kw)) {
      add(u, "Keyword match in sitemap");
    }
  }

  // 3. High-value paths
  for (const path of HIGH_VALUE_PATHS) {
    const candidate = origin + path;
    if (sitemapUrls.some(u => u.toLowerCase().includes(path)) || true) {
      add(candidate, "High-value path (about/services/contact)");
    }
  }

  // 4. Fill remaining from sitemap
  for (const u of sitemapUrls) {
    add(u, "Sitemap entry");
  }

  return selected;
}

export async function scrapeTargetUrl(
  targetUrl: string,
  manualContent?: string,
  useSitemap = false,
  keyword = ""
): Promise<ScrapedData> {
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
      analyzedPages: [{ url: normalizedUrl, title: "Manual Content", reason: "User-provided content", wordCount: clean.split(/\s+/).length, hasSchema: false }],
    };
  }

  let pageSelections: { url: string; reason: string }[] = [{ url: normalizedUrl, reason: "User-provided" }];

  if (useSitemap) {
    try {
      const sitemapUrls = await discoverSitemapUrls(normalizedUrl, 40);
      pageSelections = selectPages(normalizedUrl, sitemapUrls, keyword);
    } catch {
      // fall back to single page
    }
  }

  const analyzedPages: AnalyzedPage[] = [];
  const allTexts: string[] = [];
  const allSchemas: Record<string, unknown>[] = [];
  let primary: ScrapedData | null = null;

  for (const { url: pageUrl, reason } of pageSelections) {
    try {
      const res = await fetchWithTimeout(pageUrl, 12000);
      if (!res.ok) continue;
      const html = await res.text();
      const scraped = parseHtml(pageUrl, html);

      analyzedPages.push({
        url: pageUrl,
        title: scraped.title,
        reason,
        wordCount: scraped.wordCount,
        hasSchema: scraped.schemaMarkupDetected,
      });

      if (!primary) primary = scraped;
      allTexts.push(scraped.fullCleanText);
      allSchemas.push(...scraped.jsonLdSchemas);
    } catch {
      // skip failed page
    }
  }

  if (!primary) {
    throw new Error("Failed to fetch any pages from the target URL.");
  }

  const combinedText = allTexts.join(" ").replace(/\s+/g, " ").trim();
  primary.fullCleanText = combinedText.slice(0, 15000);
  primary.wordCount = combinedText.split(/\s+/).length;
  primary.bodyTextSnippet = combinedText.slice(0, 6000);
  primary.jsonLdSchemas = allSchemas;
  primary.schemaMarkupDetected = allSchemas.length > 0;
  primary.hasFaqStructure = primary.hasFaqStructure || /faq|frequently asked|q&a/i.test(combinedText);
  primary.hasAuthorOrOrg = primary.hasAuthorOrOrg || /about us|our team|founded|headquartered|contact/i.test(combinedText);
  primary.analyzedPages = analyzedPages;

  return primary;
}

function parseHtml(url: string, html: string): ScrapedData {
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
    url,
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
