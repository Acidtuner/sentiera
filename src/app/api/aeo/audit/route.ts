import { NextRequest, NextResponse } from "next/server";
import { scrapeTargetUrl } from "@/lib/scraper";
import { evaluateAEO } from "@/lib/evaluator";
import { runLiveSearchGrounding } from "@/lib/liveSearchGrounding";
import { runCitationSampling } from "@/lib/citationSampling";
import { storeAudit } from "@/lib/supabase";
import { sendAuditReportEmail } from "@/lib/email";
import { checkDomainEntitlement, recordDomain, normalizeDomain } from "@/lib/auth";
import { AuditRequestPayload, AuditResponsePayload } from "@/types/aeo";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest): Promise<NextResponse<AuditResponsePayload>> {
  let body: AuditRequestPayload & { userId?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request body." }, { status: 400 });
  }

  if (body.honeypot) {
    return NextResponse.json({ success: false, error: "Invalid submission." }, { status: 400 });
  }

  const name = (body.name || "").trim();
  const company = (body.company || "").trim();
  const email = (body.email || "").trim().toLowerCase();
  const userId = body.userId;

  if (!userId) {
    return NextResponse.json({ success: false, error: "Please sign in to run an audit." }, { status: 401 });
  }

  if (!name || !company || !email || !EMAIL_REGEX.test(email)) {
    return NextResponse.json({ success: false, error: "Name, company, and a valid email are required." }, { status: 400 });
  }

  if (!body.targetUrl || body.targetUrl.trim().length === 0) {
    await storeAudit({ name, company, email, target_url: body.targetUrl || "", keyword: body.targetKeyword || "", success: false, error_message: "Missing URL" });
    return NextResponse.json({ success: false, error: "Target URL is required." }, { status: 400 });
  }

  if (!body.targetKeyword || body.targetKeyword.trim().length === 0) {
    await storeAudit({ name, company, email, target_url: body.targetUrl, keyword: "", success: false, error_message: "Missing keyword" });
    return NextResponse.json({ success: false, error: "Target Keyword / Intent Query is required." }, { status: 400 });
  }

  // Domain entitlement check (free tier = 1 domain forever)
  const domain = normalizeDomain(body.targetUrl);
  const entitlement = await checkDomainEntitlement(userId, domain);
  if (!entitlement.allowed) {
    return NextResponse.json(
      { success: false, error: entitlement.reason || "Domain limit reached." },
      { status: 403 }
    );
  }

  try {
    const useSitemap = !body.customContent;
    const scraped = await scrapeTargetUrl(body.targetUrl, body.customContent, useSitemap, body.targetKeyword);

    if (scraped.advancedSignals) {
      scraped.advancedSignals.citationSampling = await runCitationSampling(
        body.targetUrl,
        body.targetKeyword,
        body.apiKey
      );
    }

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
          auditResult.metrics.ai_recommendation_rate = Math.max(32, auditResult.metrics.ai_recommendation_rate);
        } else if (liveGroundingResult.brandVisibilityStatus === "OMITTED_FROM_AI_SHORTLIST") {
          auditResult.metrics.ai_recommendation_rate = Math.min(22, auditResult.metrics.ai_recommendation_rate);
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

    // Record the domain for the free-tier limit
    await recordDomain(userId, domain);

    await storeAudit({
      name,
      company,
      email,
      target_url: body.targetUrl,
      keyword: body.targetKeyword,
      success: true,
      result: {
        ...auditResult,
        analyzedPages: scraped.analyzedPages,
        advancedSignals: scraped.advancedSignals,
        liveGrounding: liveGroundingResult,
        userId,
      },
    });

    sendAuditReportEmail(email, name, company, body.targetUrl, body.targetKeyword, auditResult).catch(console.error);

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
        advancedSignals: scraped.advancedSignals,
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("AEO Audit Route Error:", err);

    await storeAudit({
      name,
      company,
      email,
      target_url: body.targetUrl,
      keyword: body.targetKeyword,
      success: false,
      error_message: message,
    });

    return NextResponse.json(
      { success: false, error: message || "An unexpected error occurred during the AEO audit." },
      { status: 500 }
    );
  }
}
