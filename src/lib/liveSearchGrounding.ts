import { GoogleGenerativeAI } from "@google/generative-ai";
import { LiveGroundingResult } from "@/types/aeo";

function extractHostname(url: string): string {
  try {
    const normalized = /^https?:\/\//i.test(url) ? url : `https://${url}`;
    return new URL(normalized).hostname.replace(/^www\./i, "").toLowerCase();
  } catch {
    return url.toLowerCase();
  }
}

export async function runLiveSearchGrounding(
  targetUrl: string,
  targetKeyword: string,
  pageTitle?: string,
  apiKeyOverride?: string
): Promise<LiveGroundingResult> {
  const apiKey = apiKeyOverride || process.env.GEMINI_API_KEY;
  const targetHost = extractHostname(targetUrl);
  const buyerQuery = `Which companies or service providers in the UAE are recommended for ${targetKeyword}? List top options with websites.`;

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
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(buyerQuery);
    const answer = result.response.text();
    const found = answer.toLowerCase().includes(targetHost) || (pageTitle && answer.toLowerCase().includes(pageTitle.toLowerCase().split("|")[0].trim()));

    return {
      executed: true,
      queryPrompt: buyerQuery,
      aiSynthesizedAnswer: answer.slice(0, 2000),
      groundingQueries: [buyerQuery],
      citedSources: [],
      brandVisibilityStatus: found ? "CITED_AND_RECOMMENDED" : "OMITTED_FROM_AI_SHORTLIST",
      targetUrlFound: found,
      targetBrandFound: found,
      competitorsCited: [],
      aiVerdictSummary: found ? "Target appears in the synthesized answer." : "Target was not mentioned in the AI shortlist.",
    };
  } catch (err: any) {
    return {
      executed: false,
      queryPrompt: buyerQuery,
      aiSynthesizedAnswer: "Grounding failed.",
      groundingQueries: [],
      citedSources: [],
      brandVisibilityStatus: "OMITTED_FROM_AI_SHORTLIST",
      targetUrlFound: false,
      targetBrandFound: false,
      competitorsCited: [],
      aiVerdictSummary: err.message || "Error during live grounding.",
    };
  }
}
