import { LiveGroundingResult } from "@/types/aeo";
import { GEMINI_MODEL, askGemini } from "@/lib/gemini";

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

export async function runLiveSearchGrounding(
  targetUrl: string,
  targetKeyword: string,
  pageTitle?: string,
  apiKeyOverride?: string,
  company?: string,
  location?: string
): Promise<LiveGroundingResult> {
  const apiKey = apiKeyOverride || process.env.GEMINI_API_KEY;
  const targetHost = extractHostname(targetUrl);
  const topic = targetKeyword.trim();
  const place = location?.trim();
  const buyerQuery = topic
    ? `Which companies or service providers${place ? ` in ${place}` : ""} are recommended for ${topic}? List top options with websites.`
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
      aiVerdictSummary: "Mention check not run. Add a buyer topic to ask Gemini.",
    };
  }

  if (!apiKey || apiKey.length < 10) {
    return {
      executed: false,
      queryPrompt: buyerQuery,
      aiSynthesizedAnswer: "Live grounding skipped (no Gemini API key configured).",
      groundingQueries: [],
      citedSources: [],
      brandVisibilityStatus: "OMITTED_FROM_AI_SHORTLIST",
      targetUrlFound: false,
      targetBrandFound: false,
      competitorsCited: [],
      aiVerdictSummary: "Deterministic mode only.",
    };
  }

  try {
    const answer = await askGemini(buyerQuery, apiKey);
    const domainMatched = includesTerm(answer, targetHost);
    const companyMatched = Boolean(company && includesTerm(answer, company));
    const titleMatched = Boolean(pageTitle && includesTerm(answer, pageTitle.split("|")[0]));
    const found = domainMatched || companyMatched || titleMatched;
    const matched = [
      domainMatched ? "domain" : "",
      companyMatched ? "company name" : "",
      titleMatched ? "page title" : "",
    ].filter(Boolean).join(" and ");

    return {
      executed: true,
      queryPrompt: buyerQuery,
      aiSynthesizedAnswer: answer.slice(0, 2000),
      groundingQueries: [buyerQuery],
      citedSources: [],
      brandVisibilityStatus: found ? "CITED_AND_RECOMMENDED" : "OMITTED_FROM_AI_SHORTLIST",
      targetUrlFound: domainMatched,
      targetBrandFound: companyMatched || titleMatched,
      competitorsCited: [],
      aiVerdictSummary: found
        ? `Mentioned. Matched on ${matched}.`
        : "Not mentioned. The company name and domain were not in the Gemini answer.",
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
      aiVerdictSummary: `Gemini check failed (${GEMINI_MODEL}): ${err instanceof Error ? err.message : "unknown error"}`,
    };
  }
}
