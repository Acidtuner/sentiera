import { LiveGroundingResult } from "@/types/aeo";
import { GROK_MODEL, askGrok } from "@/lib/gemini";

const SKIP = new Set(["ltd", "limited", "llc", "inc", "company", "co", "the", "and", "for", "technologies", "technology", "group", "services"]);

function extractHostname(url: string): string {
  try {
    const normalized = /^https?:\/\//i.test(url) ? url : `https://${url}`;
    return new URL(normalized).hostname.replace(/^www\./i, "").toLowerCase();
  } catch {
    return url.toLowerCase();
  }
}

function includesTerm(answer: string, term: string): boolean {
  const clean = term.trim().toLowerCase();
  if (clean.length < 3) return false;
  return answer.toLowerCase().includes(clean);
}

function brandTokens(company: string): string[] {
  return company
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length >= 4 && !SKIP.has(word));
}

function otherNames(answer: string, company: string, host: string): Array<{ title: string; domain: string; uri: string }> {
  const own = new Set([company.toLowerCase(), host, ...brandTokens(company)]);
  const found = new Map<string, { title: string; domain: string; uri: string }>();
  const link = /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g;
  let match: RegExpExecArray | null;
  while ((match = link.exec(answer))) {
    const title = match[1].trim();
    const uri = match[2];
    const domain = extractHostname(uri);
    if (!own.has(title.toLowerCase()) && !own.has(domain)) found.set(domain, { title, domain, uri });
  }
  const lines = answer.split(/\n+/);
  for (const line of lines) {
    const cleaned = line.replace(/^\s*(?:[-*]|\d+[.)])\s*/, "").trim();
    const name = cleaned.split(/\s+[–—:-]\s+|\s+\|\s+/)[0].replace(/\*+/g, "").trim();
    if (name.length < 3 || name.length > 60 || own.has(name.toLowerCase())) continue;
    if (!/[A-Z]/.test(name)) continue;
    if (!found.has(name.toLowerCase())) found.set(name.toLowerCase(), { title: name, domain: "", uri: "" });
  }
  return Array.from(found.values()).slice(0, 6);
}

export async function runLiveSearchGrounding(
  targetUrl: string,
  targetKeyword: string,
  pageTitle?: string,
  apiKeyOverride?: string,
  company?: string,
  location?: string
): Promise<LiveGroundingResult> {
  const apiKey = (apiKeyOverride || process.env.XAI_API_KEY || "").trim();
  const targetHost = extractHostname(targetUrl);
  const topic = targetKeyword.trim();
  const place = location?.trim();
  const buyerQuery = topic
    ? `Which companies or service providers${place ? ` in ${place}` : ""} are recommended for ${topic}? List the top options with websites.`
    : "";

  if (!topic) {
    return {
      executed: false,
      queryPrompt: "",
      aiSynthesizedAnswer: "",
      groundingQueries: [],
      citedSources: [],
      brandVisibilityStatus: "OMITTED_FROM_AI_SHORTLIST",
      targetUrlFound: false,
      targetBrandFound: false,
      competitorsCited: [],
      aiVerdictSummary: "Mention check not run. Add a buyer topic to ask Grok.",
    };
  }

  if (!apiKey || apiKey.length < 10) {
    return {
      executed: false,
      queryPrompt: buyerQuery,
      aiSynthesizedAnswer: "Live check skipped (no xAI API key configured).",
      groundingQueries: [],
      citedSources: [],
      brandVisibilityStatus: "OMITTED_FROM_AI_SHORTLIST",
      targetUrlFound: false,
      targetBrandFound: false,
      competitorsCited: [],
      aiVerdictSummary: "Not run. XAI_API_KEY is not available to this check. Set it on the host and redeploy.",
    };
  }

  try {
    let usedSearch = true;
    let answer = "";
    try {
      answer = await askGrok(buyerQuery, apiKey, true);
    } catch {
      usedSearch = false;
      answer = await askGrok(buyerQuery, apiKey, false);
    }
    const tokens = company ? brandTokens(company) : [];
    const domainMatched = includesTerm(answer, targetHost);
    const companyMatched = Boolean(company && (includesTerm(answer, company) || tokens.some((token) => includesTerm(answer, token))));
    const titleMatched = Boolean(pageTitle && includesTerm(answer, pageTitle.split("|")[0]));
    const found = domainMatched || companyMatched || titleMatched;
    const others = otherNames(answer, company || "", targetHost);
    const searchNote = usedSearch ? "Search was on." : "Search was not available, so this is a memory answer.";

    return {
      executed: true,
      queryPrompt: buyerQuery,
      aiSynthesizedAnswer: answer.slice(0, 2000),
      groundingQueries: [buyerQuery],
      citedSources: [],
      brandVisibilityStatus: found ? "CITED_AND_RECOMMENDED" : "OMITTED_FROM_AI_SHORTLIST",
      targetUrlFound: domainMatched,
      targetBrandFound: companyMatched || titleMatched,
      competitorsCited: others,
      aiVerdictSummary: `One Grok run. ${found ? "Mentioned." : "Not mentioned."} ${searchNote}`,
    };
  } catch (err: unknown) {
    return {
      executed: false,
      queryPrompt: buyerQuery,
      aiSynthesizedAnswer: err instanceof Error ? err.message : "Grounding failed.",
      groundingQueries: [],
      citedSources: [],
      brandVisibilityStatus: "OMITTED_FROM_AI_SHORTLIST",
      targetUrlFound: false,
      targetBrandFound: false,
      competitorsCited: [],
      aiVerdictSummary: `Grok check failed (${GROK_MODEL}): ${err instanceof Error ? err.message : "unknown error"}`,
    };
  }
}
