import { google } from "googleapis";

const CLIENT_ID = process.env.GMAIL_CLIENT_ID;
const CLIENT_SECRET = process.env.GMAIL_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.GMAIL_REFRESH_TOKEN;
const FROM_EMAIL = process.env.GMAIL_FROM_EMAIL || "noreply@sentieratech.com";

function getGmailClient() {
  if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
    return null;
  }
  const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET);
  oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
  return google.gmail({ version: "v1", auth: oauth2Client });
}

export async function sendAuditReportEmail(to: string, name: string, company: string, url: string, keyword: string, result: {
  overall_aeo_score: number;
  diagnostic_summary: string;
  critical_gaps: string[];
  recommended_fixes: string[];
  metrics: { ai_recommendation_rate: number; entity_accuracy_health: number; rag_readiness_score: number };
}) {
  const gmail = getGmailClient();
  if (!gmail) {
    console.warn("Gmail credentials missing — skipping email");
    return;
  }

  const subject = `Your sentiera Cortex AI Visibility Report — ${url}`;
  const html = `
    <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; color: #1e293b;">
      <h2 style="color: #0f172a;">sentiera Cortex Report</h2>
      <p>Hi ${name},</p>
      <p>Here's the AI visibility audit for <strong>${url}</strong> (keyword: ${keyword}).</p>
      <div style="background: #f8fafc; padding: 16px; border-radius: 8px; margin: 16px 0;">
        <p style="font-size: 32px; font-weight: bold; margin: 0; color: #2563eb;">${result.overall_aeo_score}/100</p>
        <p style="margin: 4px 0 0; font-size: 14px;">Overall AEO Score</p>
      </div>
      <p><strong>Pillars:</strong></p>
      <ul>
        <li>AI Recommendation: ${result.metrics.ai_recommendation_rate}/40</li>
        <li>Entity Health: ${result.metrics.entity_accuracy_health}/30</li>
        <li>RAG-Readiness: ${result.metrics.rag_readiness_score}/30</li>
      </ul>
      <p><strong>Summary:</strong> ${result.diagnostic_summary}</p>
      ${result.critical_gaps?.length ? `<p><strong>Critical Gaps:</strong></p><ul>${result.critical_gaps.map(g => `<li>${g}</li>`).join("")}</ul>` : ""}
      ${result.recommended_fixes?.length ? `<p><strong>Recommended Fixes:</strong></p><ul>${result.recommended_fixes.map(f => `<li>${f}</li>`).join("")}</ul>` : ""}
      <p style="margin-top: 24px; font-size: 13px; color: #64748b;">— sentiera Cortex<br/>Digital Marketing & AI · Masdar City, UAE</p>
    </div>
  `;

  const message = [
    `From: sentiera Cortex <${FROM_EMAIL}>`,
    `To: ${to}`,
    `Subject: ${subject}`,
    `MIME-Version: 1.0`,
    `Content-Type: text/html; charset=utf-8`,
    ``,
    html,
  ].join("\n");

  const encoded = Buffer.from(message).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

  try {
    await gmail.users.messages.send({
      userId: "me",
      requestBody: { raw: encoded },
    });
  } catch (err) {
    console.error("Failed to send audit email:", err);
  }
}
