import { NextRequest, NextResponse } from "next/server";
import { scrapeTargetUrl } from "@/lib/scraper";
import { evaluateAEO } from "@/lib/evaluator";
import { runLiveSearchGrounding } from "@/lib/liveSearchGrounding";
import { AuditRequestPayload, AuditResponsePayload } from "@/types/aeo";

export async function POST(req: NextRequest): Promise<NextResponse<AuditResponsePayload>> {
  try {
    const body: AuditRequestPayload = await req.json();

    if (!body.targetUrl || body.targetUrl.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Target URL is required." },
        { status: 400 }
      );
    }

    if (!body.targetKeyword || body.targetKeyword.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Target Keyword / Intent Query is required." },
        { status: 400 }
      );
    }

    const useSitemap = !body.customContent;
    const scraped = await scrapeTargetUrl(body.targetUrl, body.customContent, useSitemap, body.targetKeyword);

    const auditResult = await evaluateAEO(
      body.targetUrl,
      body.targetKeyword,
      scraped,
      body.apiKey
    );

    let liveGroundingResult;
    try {
      liveGroundingResult = await runLiveSearchGrounding(
        body.targetUrl,
        body.targetKeyword,
        scraped.title,
        body.apiKey
      );

      if (liveGroundingResult.executed) {
        if (liveGroundingResult.targetUrlFound) {
          auditResult.metrics.ai_recommendation_rate = Math.max(
            32,
            auditResult.metrics.ai_recommendation_rate
          );
        } else if (
          liveGroundingResult.brandVisibilityStatus === "OMITTED_FROM_AI_SHORTLIST"
        ) {
          auditResult.metrics.ai_recommendation_rate = Math.min(
            22,
            auditResult.metrics.ai_recommendation_rate
          );
        }
        auditResult.overall_aeo_score = Math.min(
          100,
          auditResult.metrics.ai_recommendation_rate +
            auditResult.metrics.entity_accuracy_health +
            auditResult.metrics.rag_readiness_score
        );
        auditResult.is_invisible_to_ai = auditResult.overall_aeo_score < 50;
      }
    } catch (groundingErr: unknown) {
      console.warn("Live Search Grounding non-fatal error:", groundingErr instanceof Error ? groundingErr.message : String(groundingErr));
    }

    return NextResponse.json({
      success: true,
      data: auditResult,
      liveGrounding: liveGroundingResult,
      scrapedData: {
        url: scraped.url,
        title: scraped.title,
        description: scraped.description,
        wordCount: scraped.wordCount,
        schemaMarkupDetected: scraped.schemaMarkupDetected,
        schemasCount: scraped.jsonLdSchemas.length,
        analyzedPages: scraped.analyzedPages,
      },
    });
  } catch (err: unknown) {
    console.error("AEO Audit Route Error:", err);
    return NextResponse.json(
      {
        success: false,
        error: (err instanceof Error ? err.message : String(err)) || "An unexpected error occurred during the AEO audit.",
      },
      { status: 500 }
    );
  }
}
