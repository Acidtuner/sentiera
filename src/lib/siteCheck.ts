import { AdvancedSignals, AnalyzedPage } from "@/types/aeo";

const BOTS = ["GPTBot", "Google-Extended", "PerplexityBot", "ClaudeBot", "Amazonbot"];

async function fetchText(url: string, timeoutMs = 6000): Promise<{ ok: boolean; status: number; text: string }> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      redirect: "follow",
      headers: { "User-Agent": "SentieraCortex/1.0" },
    });
    const text = res.ok ? await res.text() : "";
    return { ok: res.ok, status: res.status, text };
  } catch {
    return { ok: false, status: 0, text: "" };
  } finally {
    clearTimeout(timer);
  }
}

function originOf(url: string): string {
  const parsed = new URL(/^https?:\/\//i.test(url) ? url : `https://${url}`);
  return parsed.origin;
}

function crawlerAccess(robots: string): AdvancedSignals["crawlerAccess"] {
  if (!robots) return BOTS.map((bot) => ({ bot, allowed: null }));
  return BOTS.map((bot) => {
    const lines = robots.split(/\r?\n/);
    let inGroup = false;
    let allowed: boolean | null = null;
    for (const raw of lines) {
      const line = raw.trim().toLowerCase();
      if (line.startsWith("user-agent:")) {
        const agent = line.slice(11).trim();
        inGroup = agent === "*" || agent === bot.toLowerCase();
      } else if (inGroup && (line.startsWith("disallow:") || line.startsWith("allow:"))) {
        const path = line.split(":")[1]?.trim() || "";
        if (path === "/" || path === "") allowed = line.startsWith("allow:");
      }
    }
    return { bot, allowed };
  });
}

function sitemapPages(xml: string, origin: string): AnalyzedPage[] {
  const locs = Array.from(xml.matchAll(/<loc>([^<]+)<\/loc>/gi)).map((match) => match[1].trim());
  return locs.slice(0, 6).map((url) => ({
    url,
    title: url.replace(origin, "") || "/",
    reason: "Listed in sitemap",
    wordCount: 0,
    hasSchema: false,
  }));
}

export async function runSiteCheck(targetUrl: string) {
  const origin = originOf(targetUrl);
  const pageUrl = /^https?:\/\//i.test(targetUrl) ? targetUrl : `https://${targetUrl}`;
  const [page, robots, llms, sitemap] = await Promise.all([
    fetchText(pageUrl),
    fetchText(`${origin}/robots.txt`),
    fetchText(`${origin}/llms.txt`),
    fetchText(`${origin}/sitemap.xml`),
  ]);

  const titleMatch = page.text.match(/<title>([^<]*)<\/title>/i);
  const title = titleMatch?.[1]?.trim() || pageUrl;
  const hasSchema = /application\/ld\+json/i.test(page.text);
  const pages = sitemap.ok ? sitemapPages(sitemap.text, origin) : [];
  if (!pages.some((item) => item.url === pageUrl)) {
    pages.unshift({ url: pageUrl, title, reason: "Submitted URL", wordCount: 0, hasSchema });
  }

  const advancedSignals: AdvancedSignals = {
    crawlerAccess: crawlerAccess(robots.ok ? robots.text : ""),
    llmsTxt: llms.ok
      ? { present: true, url: `${origin}/llms.txt`, length: llms.text.length, qualityNote: "File found" }
      : { present: false },
  };

  return {
    url: pageUrl,
    title,
    schemaMarkupDetected: hasSchema,
    robotsFound: robots.ok,
    sitemapFound: sitemap.ok,
    analyzedPages: pages.slice(0, 6),
    advancedSignals,
  };
}
