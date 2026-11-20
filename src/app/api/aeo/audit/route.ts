export const maxDuration = 60;

import { NextRequest, NextResponse } from "next/server";
import { scrapeTargetUrl } from "@/lib/scraper";
import { evaluateAEO } from "@/lib/evaluator";
import { runLiveSearchGrounding } from "@/lib/liveSearchGrounding";
import { storeAudit } from "@/lib/supabase";
import { sendAuditReportEmail } from "@/lib/email";
import { AuditRequestPayload, AuditResponsePayload } from "@/types/aeo";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest): Promise<NextResponse<AuditResponsePayload>> {
  let body: AuditRequestPayload;
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

  if (!name || !company || !email || !EMAIL_REGEX.test(email)) {
    return NextResponse.json({ success: false, error: "Name, company, and a valid email are required." }, { status: 400 });
  }

  if (!body.targetUrl || body.targetUrl.trim().length === 0) {
    await storeAudit({ name, company, email, target_url: body.targetUrl || "", keyword: body.targetKeyword || "", success: false, error_message: "Missing URL" });
    return NextResponse.json({ success: false, error: "Target URL is required." }, { status: 400 });
  }

  body.targetKeyword = (body.targetKeyword || "").trim();

  try {
    const useSitemap = !body.customContent;
    const scraped = await scrapeTargetUrl(body.targetUrl, body.customContent, useSitemap, body.targetKeyword);

    const auditResult = await evaluateAEO(
      body.targetUrl,
      body.targetKeyword,
      scraped
    );

    let liveGroundingResult;
    try {
      const siteText = `${scraped.title || ""} ${scraped.description || ""} ${scraped.fullCleanText || ""}`.toLowerCase();
      const places = ["Abu Dhabi", "Dubai", "Sharjah", "UAE", "Saudi Arabia", "Riyadh", "Qatar", "Doha", "Bahrain", "Oman", "Kuwait", "Masdar City"];
      const location = places.find((place) => siteText.includes(place.toLowerCase()));
      liveGroundingResult = await runLiveSearchGrounding(
        body.targetUrl,
        body.targetKeyword,
        scraped.title,
        body.apiKey,
        company,
        location
      );

      if (liveGroundingResult.executed && scraped.advancedSignals) {
        scraped.advancedSignals.citationSampling = {
          executed: true,
          cited: liveGroundingResult.targetUrlFound || liveGroundingResult.targetBrandFound,
          sampleAnswer: liveGroundingResult.aiSynthesizedAnswer,
        };
        auditResult.advancedSignals = scraped.advancedSignals;
      }
    } catch (groundingErr: unknown) {
      console.warn("Live Search Grounding non-fatal error:", groundingErr instanceof Error ? groundingErr.message : String(groundingErr));
    }

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
      },
    });

    sendAuditReportEmail(email, name, company, body.targetUrl, body.targetKeyword, auditResult, liveGroundingResult).catch(console.error);

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
