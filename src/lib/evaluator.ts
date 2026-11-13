import { GoogleGenerativeAI } from "@google/generative-ai";
import { AEOResult, ScrapedData } from "@/types/aeo";

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
  let rec = 12;
  let entity = 10;
  let rag = 8;
  const signals: string[] = [];

  const text = (scraped.fullCleanText || "").toLowerCase();
  const kw = keyword.toLowerCase();
  const pages = scraped.analyzedPages || [];
  const pageCount = pages.length || 1;

  // Keyword relevance
  const kwCount = (text.match(new RegExp(kw.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi")) || []).length;
  if (kwCount > 0) {
    rec += Math.min(12, 4 + kwCount);
    signals.push(`Keyword found ${kwCount} time(s) across ${pageCount} page(s)`);
  }
  if (scraped.title?.toLowerCase().includes(kw)) {
    rec += 4;
    signals.push("Keyword in page title");
  }

  // Content depth
  if (scraped.wordCount > 800) {
    rec += 6;
    signals.push(`Substantial content (${scraped.wordCount} words)`);
  } else if (scraped.wordCount > 300) {
    rec += 3;
  }
  if (pageCount >= 3) {
    rec += 3;
    signals.push(`Analyzed ${pageCount} pages`);
  }

  // Schema quality
  const schemaText = JSON.stringify(scraped.jsonLdSchemas).toLowerCase();
  if (scraped.schemaMarkupDetected) {
    rag += 8;
    if (schemaText.includes("organization") || schemaText.includes("localbusiness")) {
      rag += 4;
      entity += 4;
      signals.push("Organization/LocalBusiness schema detected");
    }
    if (schemaText.includes("faqpage")) {
      rag += 3;
      signals.push("FAQPage schema detected");
    }
    if (schemaText.includes("service") || schemaText.includes("product")) {
      rag += 2;
      signals.push("Service/Product schema present");
    }
  }

  // Entity signals
  if (scraped.hasAuthorOrOrg) {
    entity += 5;
    signals.push("Author/organization signals found");
  }
  if (text.includes("abu dhabi") || text.includes("uae") || text.includes("masdar") || text.includes("dubai")) {
    entity += 4;
    signals.push("Location signals present");
  }
  if (scraped.description && scraped.description.length > 60) {
    entity += 3;
  }
  if (pages.some(p => p.reason.includes("about") || p.reason.includes("contact"))) {
    entity += 3;
    signals.push("About or contact page included");
  }

  // RAG readiness
  if (scraped.headings.h1.length > 0) rag += 3;
  if (scraped.hasFaqStructure) {
    rag += 5;
    signals.push("FAQ or Q&A structure detected");
  }
  if (scraped.headings.h2.length >= 3) rag += 2;

  rec = Math.min(40, Math.max(0, rec));
  entity = Math.min(30, Math.max(0, entity));
  rag = Math.min(30, Math.max(0, rag));

  const overall = Math.min(100, rec + entity + rag);

  return {
    overall_aeo_score: overall,
    metrics: { ai_recommendation_rate: rec, entity_accuracy_health: entity, rag_readiness_score: rag },
    is_invisible_to_ai: overall < 50,
    schema_markup_detected: scraped.schemaMarkupDetected,
    diagnostic_summary: `sentiera Cortex scored ${overall}/100 after analyzing ${pageCount} page(s). ${scraped.schemaMarkupDetected ? "Structured data was found." : "Limited structured data."} Content volume: ${scraped.wordCount} words.`,
    critical_gaps: [
      !scraped.schemaMarkupDetected ? "Missing JSON-LD / Schema.org markup." : "Schema could be richer (Organization + Service + FAQ).",
      !scraped.hasFaqStructure ? "No clear FAQ or Q&A blocks for AI extraction." : "FAQ structure present but could be expanded.",
      pageCount < 3 ? "Limited page coverage; deeper pages may hold stronger signals." : "Brand location and concrete service definitions need tighter alignment.",
    ].slice(0, 3),
    recommended_fixes: [
      "Add Organization + Service JSON-LD with clear name, areaServed, and description.",
      "Create dedicated pages answering the exact questions buyers ask AI tools.",
      "Include consistent NAP and concrete capability statements across key pages.",
    ],
    signalsUsed: signals,
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

    const prompt = `TARGET_URL: ${targetUrl}\nTARGET_KEYWORD: ${targetKeyword}\nPAGES_ANALYZED: ${scraped.analyzedPages?.length || 1}\nSCRAPED_TITLE: ${scraped.title}\nSCRAPED_DESCRIPTION: ${scraped.description}\nWORD_COUNT: ${scraped.wordCount}\nSCHEMA_DETECTED: ${scraped.schemaMarkupDetected}\nCONTENT_SNIPPET: ${scraped.bodyTextSnippet.slice(0, 3000)}`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const parsed = JSON.parse(text.replace(/```json|```/g, "").trim()) as AEOResult;

    parsed.overall_aeo_score = Math.min(100, Math.max(0, parsed.overall_aeo_score || 0));
    parsed.is_invisible_to_ai = parsed.overall_aeo_score < 50;
    return parsed;
  } catch (err) {
    console.warn("Gemini evaluation failed, falling back to deterministic:", err);
    return deterministicEvaluate(targetUrl, targetKeyword, scraped);
  }
}
