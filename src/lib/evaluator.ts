import { GoogleGenerativeAI } from "@google/generative-ai";
import { AEOResult, ScrapedData, AdvancedSignals } from "@/types/aeo";

const SYSTEM_INSTRUCTION = `You are an elite Answer Engine Optimization (AEO) evaluator. Analyze the provided TARGET_URL, TARGET_KEYWORD, and SCRAPED_CONTENT to assess visibility for AI assistants.

Analyze against three pillars:
1. AI Recommendation Rate (Max 40 points): Semantic relevance and likelihood of LLM citation.
2. Entity & Accuracy Health (Max 30 points): Clarity of brand identity, location, and services without vague metaphors.
3. RAG-Readiness & Schema (Max 30 points): Use of structured data, semantic HTML, and machine-readable Q&A formats.

Respond ONLY with a valid JSON object with these exact keys:
overall_aeo_score (number 0-100),
metrics: { ai_recommendation_rate (0-40), entity_accuracy_health (0-30), rag_readiness_score (0-30) },
is_invisible_to_ai (boolean),
schema_markup_detected (boolean),
diagnostic_summary (string),
critical_gaps (string array),
recommended_fixes (string array).`;

function deterministicEvaluate(url: string, keyword: string, scraped: ScrapedData): AEOResult {
  let rec = 10;
  let entity = 8;
  let rag = 6;
  const signals: string[] = [];
  const advanced = scraped.advancedSignals;

  const text = (scraped.fullCleanText || "").toLowerCase();
  const kw = keyword.toLowerCase();
  const pages = scraped.analyzedPages || [];
  const pageCount = pages.length || 1;

  // Keyword relevance
  const kwCount = (text.match(new RegExp(kw.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi")) || []).length;
  if (kwCount > 0) {
    rec += Math.min(10, 3 + Math.floor(kwCount / 2));
    signals.push(`Keyword found ${kwCount} time(s) across ${pageCount} page(s)`);
  }
  if (scraped.title?.toLowerCase().includes(kw)) {
    rec += 3;
    signals.push("Keyword in page title");
  }

  // Content depth
  if (scraped.wordCount > 800) {
    rec += 5;
    signals.push(`Substantial content (${scraped.wordCount} words)`);
  } else if (scraped.wordCount > 300) {
    rec += 2;
  }
  if (pageCount >= 3) {
    rec += 2;
    signals.push(`Analyzed ${pageCount} pages`);
  }

  // Schema quality
  const schemaText = JSON.stringify(scraped.jsonLdSchemas).toLowerCase();
  if (scraped.schemaMarkupDetected) {
    rag += 7;
    if (schemaText.includes("organization") || schemaText.includes("localbusiness")) {
      rag += 3;
      entity += 3;
      signals.push("Organization/LocalBusiness schema detected");
    }
    if (schemaText.includes("faqpage")) {
      rag += 2;
      signals.push("FAQPage schema detected");
    }
  }

  // Entity signals
  if (scraped.hasAuthorOrOrg) {
    entity += 4;
    signals.push("Author/organization signals found");
  }
  if (text.includes("abu dhabi") || text.includes("uae") || text.includes("masdar") || text.includes("dubai")) {
    entity += 3;
    signals.push("Location signals present");
  }
  if (pages.some(p => p.reason.includes("about") || p.reason.includes("contact"))) {
    entity += 2;
    signals.push("About or contact page included");
  }

  // RAG readiness
  if (scraped.headings.h1.length > 0) rag += 2;
  if (scraped.hasFaqStructure) {
    rag += 4;
    signals.push("FAQ or Q&A structure detected");
  }

  // Advanced signals
  if (advanced) {
    const blocked = advanced.crawlerAccess.filter(c => c.allowed === false).length;
    const allowed = advanced.crawlerAccess.filter(c => c.allowed === true).length;
    if (blocked === 0 && allowed > 0) {
      rec += 4;
      signals.push("Major AI crawlers explicitly allowed");
    } else if (blocked > 2) {
      rec -= 3;
      signals.push(`${blocked} AI crawlers blocked in robots.txt`);
    }

    if (advanced.llmsTxt.present) {
      rag += 5;
      signals.push(`llms.txt present (${advanced.llmsTxt.qualityNote || "found"})`);
    } else {
      signals.push("No llms.txt detected");
    }

    if (advanced.citationSampling?.executed && advanced.citationSampling.cited) {
      rec += 6;
      signals.push("Domain cited in live sample answer");
    }
  }

  rec = Math.min(40, Math.max(0, rec));
  entity = Math.min(30, Math.max(0, entity));
  rag = Math.min(30, Math.max(0, rag));

  const overall = Math.min(100, rec + entity + rag);

  return {
    overall_aeo_score: overall,
    metrics: { ai_recommendation_rate: rec, entity_accuracy_health: entity, rag_readiness_score: rag },
    is_invisible_to_ai: overall < 50,
    schema_markup_detected: scraped.schemaMarkupDetected,
    diagnostic_summary: `sentiera Cortex (advanced) scored ${overall}/100 after analyzing ${pageCount} page(s). ${advanced?.llmsTxt.present ? "llms.txt found." : "No llms.txt."} AI crawler access: ${advanced ? "checked" : "n/a"}.`,
    critical_gaps: [
      !scraped.schemaMarkupDetected ? "Missing JSON-LD / Schema.org markup." : "Schema could be richer.",
      !advanced?.llmsTxt.present ? "No llms.txt file for AI guidance." : "llms.txt present but could be expanded.",
      advanced && advanced.crawlerAccess.some(c => c.allowed === false) ? "Some AI crawlers are blocked in robots.txt." : "AI crawler access looks open.",
    ].slice(0, 3),
    recommended_fixes: [
      "Ensure robots.txt allows GPTBot, PerplexityBot, ClaudeBot, and Google-Extended.",
      "Add a /llms.txt file describing key pages and entity info.",
      "Strengthen schema and FAQ structure for better RAG extraction.",
    ],
    signalsUsed: signals,
    advancedSignals: advanced,
  };
}

export async function evaluateAEO(
  targetUrl: string,
  targetKeyword: string,
  scraped: ScrapedData,
  apiKeyOverride?: string
): Promise<AEOResult> {
  const apiKey = apiKeyOverride || process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey.length < 10) {
    return deterministicEvaluate(targetUrl, targetKeyword, scraped);
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: SYSTEM_INSTRUCTION,
      generationConfig: {
        responseMimeType: "application/json",
      },
    });

    const prompt = `TARGET_URL: ${targetUrl}\nTARGET_KEYWORD: ${targetKeyword}\nPAGES_ANALYZED: ${scraped.analyzedPages?.length || 1}\nSCRAPED_TITLE: ${scraped.title}\nSCRAPED_DESCRIPTION: ${scraped.description}\nWORD_COUNT: ${scraped.wordCount}\nSCHEMA_DETECTED: ${scraped.schemaMarkupDetected}\nLLMS_TXT: ${scraped.advancedSignals?.llmsTxt.present ? "yes" : "no"}\nCONTENT_SNIPPET: ${scraped.bodyTextSnippet.slice(0, 2500)}`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const parsed = JSON.parse(text.replace(/```json|```/g, "").trim()) as AEOResult;

    parsed.overall_aeo_score = Math.min(100, Math.max(0, parsed.overall_aeo_score || 0));
    parsed.is_invisible_to_ai = parsed.overall_aeo_score < 50;
    parsed.advancedSignals = scraped.advancedSignals;
    return parsed;
  } catch (err) {
    console.warn("Gemini evaluation failed, falling back to deterministic:", err);
    return deterministicEvaluate(targetUrl, targetKeyword, scraped);
  }
}
