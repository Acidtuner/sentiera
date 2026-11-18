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

  const gaps = (result.critical_gaps || []).slice(0, 3);
  const subject = `Your Sentiera Cortex Snapshot — ${url}`;
  const html = `
    <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; color: #1e293b;">
      <h2 style="color: #0f172a;">Your Cortex Snapshot</h2>
      <p>Hi ${name},</p>
      <p>Here is the snapshot for <strong>${company}</strong> at <strong>${url}</strong>${keyword ? ` (topic: ${keyword})` : ""}.</p>
      <p><strong>Summary:</strong> ${result.diagnostic_summary}</p>
      ${gaps.length ? `<p><strong>Key gaps:</strong></p><ul>${gaps.map(g => `<li>${g}</li>`).join("")}</ul>` : ""}
      <p>Want a specialist to walk you through it? <a href="https://www.sentieratech.com/contact">Book a Complimentary Visibility Review</a>.</p>
      <p style="margin-top: 24px; font-size: 13px; color: #64748b;">Sentiera Technologies · Masdar City, Abu Dhabi</p>
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
