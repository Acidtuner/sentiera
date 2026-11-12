import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import { AEOResult, ScrapedData } from "@/types/aeo";

const SYSTEM_INSTRUCTION = `You are an elite Answer Engine Optimization (AEO) evaluator. Analyze the provided TARGET_URL, TARGET_KEYWORD, and SCRAPED_CONTENT to assess visibility for AI assistants.

Analyze against three pillars:
1. AI Recommendation Rate (Max 40 points): Semantic relevance and likelihood of LLM citation.
2. Entity & Accuracy Health (Max 30 points): Clarity of brand identity, location, and services without vague metaphors.
3. RAG-Readiness & Schema (Max 30 points): Use of structured data, semantic HTML, and machine-readable Q&A formats.

Respond ONLY with a valid JSON object matching the requested schema.`;

const AEO_JSON_SCHEMA = {
  type: SchemaType.OBJECT,
  properties: {
    overall_aeo_score: { type: SchemaType.NUMBER, description: "Total score 0-100" },
    metrics: {
      type: SchemaType.OBJECT,
      properties: {
        ai_recommendation_rate: { type: SchemaType.NUMBER },
        entity_accuracy_health: { type: SchemaType.NUMBER },
        rag_readiness_score: { type: SchemaType.NUMBER },
      },
      required: ["ai_recommendation_rate", "entity_accuracy_health", "rag_readiness_score"],
    },
    is_invisible_to_ai: { type: SchemaType.BOOLEAN },
    schema_markup_detected: { type: SchemaType.BOOLEAN },
    diagnostic_summary: { type: SchemaType.STRING },
    critical_gaps: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
    recommended_fixes: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
  },
  required: ["overall_aeo_score", "metrics", "is_invisible_to_ai", "schema_markup_detected", "diagnostic_summary", "critical_gaps", "recommended_fixes"],
};

function deterministicEvaluate(url: string, keyword: string, scraped: ScrapedData): AEOResult {
  let rec = 15;
  let entity = 12;
  let rag = 10;

  const text = (scraped.fullCleanText || "").toLowerCase();
  const kw = keyword.toLowerCase();

  if (text.includes(kw)) rec += 8;
  if (scraped.wordCount > 400) rec += 5;
  if (scraped.headings.h1.length > 0) rag += 4;
  if (scraped.schemaMarkupDetected) rag += 10;
  if (scraped.hasFaqStructure) rag += 4;
  if (scraped.hasAuthorOrOrg) entity += 6;
  if (text.includes("abu dhabi") || text.includes("uae") || text.includes("masdar")) entity += 5;
  if (scraped.description && scraped.description.length > 50) entity += 3;

  rec = Math.min(40, Math.max(0, rec));
  entity = Math.min(30, Math.max(0, entity));
  rag = Math.min(30, Math.max(0, rag));

  const overall = Math.min(100, rec + entity + rag);

  return {
    overall_aeo_score: overall,
    metrics: { ai_recommendation_rate: rec, entity_accuracy_health: entity, rag_readiness_score: rag },
    is_invisible_to_ai: overall < 50,
    schema_markup_detected: scraped.schemaMarkupDetected,
    diagnostic_summary: `sentiera Cortex scored ${overall}/100. The site shows ${scraped.schemaMarkupDetected ? "some" : "limited"} structured data and ${scraped.wordCount} words of content around the target intent.`,
    critical_gaps: [
      scraped.schemaMarkupDetected ? "Entity signals could be stronger in schema." : "Missing JSON-LD / Schema.org markup.",
      scraped.hasFaqStructure ? "FAQ structure present but could be expanded." : "No clear FAQ or Q&A blocks for AI extraction.",
      "Brand location and concrete service definitions need tighter alignment with buyer queries.",
    ].slice(0, 3),
    recommended_fixes: [
      "Add Organization + Service JSON-LD with clear name, areaServed, and description.",
      "Create dedicated pages answering the exact questions buyers ask AI tools.",
      "Include consistent NAP (name, address, phone) and concrete capability statements.",
    ],
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        responseSchema: AEO_JSON_SCHEMA as any,
      },
    });

    const prompt = `TARGET_URL: ${targetUrl}\nTARGET_KEYWORD: ${targetKeyword}\nSCRAPED_TITLE: ${scraped.title}\nSCRAPED_DESCRIPTION: ${scraped.description}\nWORD_COUNT: ${scraped.wordCount}\nSCHEMA_DETECTED: ${scraped.schemaMarkupDetected}\nCONTENT_SNIPPET: ${scraped.bodyTextSnippet.slice(0, 3000)}`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const parsed = JSON.parse(text.replace(/```json|```/g, "").trim());

    parsed.overall_aeo_score = Math.min(100, Math.max(0, parsed.overall_aeo_score || 0));
    parsed.is_invisible_to_ai = parsed.overall_aeo_score < 50;
    return parsed as AEOResult;
  } catch (err) {
    console.warn("Gemini evaluation failed, falling back to deterministic:", err);
    return deterministicEvaluate(targetUrl, targetKeyword, scraped);
  }
}
