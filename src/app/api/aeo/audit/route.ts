export const maxDuration = 60;

import { NextRequest, NextResponse } from "next/server";
import { runLiveSearchGrounding } from "@/lib/liveSearchGrounding";
import { storeAudit } from "@/lib/supabase";
import { sendAuditReportEmail } from "@/lib/email";
import { AuditRequestPayload, AuditResponsePayload, AEOResult } from "@/types/aeo";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function mentionResult(url: string, keyword: string, mention: string): AEOResult {
  return {
    overall_aeo_score: 0,
    metrics: { ai_recommendation_rate: 0, entity_accuracy_health: 0, rag_readiness_score: 0 },
    is_invisible_to_ai: false,
    schema_markup_detected: false,
    diagnostic_summary: keyword
      ? `Grok was asked who is recommended for ${keyword}. This snapshot is that one answer. It is not a site score.`
      : "No buyer topic was given, so Grok was not asked.",
    critical_gaps: [],
    recommended_fixes: [],
    signalsUsed: [mention],
  };
}

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
    return NextResponse.json({ success: false, error: "Target URL is required." }, { status: 400 });
  }

  body.targetKeyword = (body.targetKeyword || "").trim();

  try {
    const liveGroundingResult = await runLiveSearchGrounding(
      body.targetUrl,
      body.targetKeyword,
      undefined,
      body.apiKey,
      company
    );
    const auditResult = mentionResult(
      body.targetUrl,
      body.targetKeyword,
      liveGroundingResult.aiVerdictSummary
    );

    storeAudit({
      name,
      company,
      email,
      target_url: body.targetUrl,
      keyword: body.targetKeyword,
      success: true,
      result: { ...auditResult, liveGrounding: liveGroundingResult },
    }).catch(console.error);

    sendAuditReportEmail(email, name, company, body.targetUrl, body.targetKeyword, auditResult, liveGroundingResult).catch(console.error);

    return NextResponse.json({
      success: true,
      data: auditResult,
      liveGrounding: liveGroundingResult,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("AEO Audit Route Error:", err);
    return NextResponse.json(
      { success: false, error: message || "An unexpected error occurred during the AEO audit." },
      { status: 500 }
    );
  }
}
