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

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function sendAuditReportEmail(to: string, name: string, company: string, url: string, keyword: string, result: {
  overall_aeo_score: number;
  diagnostic_summary: string;
  critical_gaps: string[];
  recommended_fixes: string[];
  metrics: { ai_recommendation_rate: number; entity_accuracy_health: number; rag_readiness_score: number };
}, live?: {
  executed?: boolean;
  queryPrompt?: string;
  aiSynthesizedAnswer?: string;
  aiVerdictSummary?: string;
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
      <p>Hi ${escapeHtml(name)},</p>
      <p>Here is the snapshot for <strong>${escapeHtml(company)}</strong> at <strong>${escapeHtml(url)}</strong>${keyword ? ` (topic: ${escapeHtml(keyword)})` : ""}.</p>
      <p><strong>Summary:</strong> ${escapeHtml(result.diagnostic_summary)}</p>
      <p><strong>Mention check:</strong> ${escapeHtml(live?.aiVerdictSummary || "Not run")}</p>
      ${live?.queryPrompt ? `<p><strong>Question asked:</strong> ${escapeHtml(live.queryPrompt)}</p>` : ""}
      ${live?.aiSynthesizedAnswer ? `<p><strong>Grok answer:</strong></p><p style="white-space: pre-wrap;">${escapeHtml(live.aiSynthesizedAnswer.slice(0, 1500))}</p>` : ""}
      ${gaps.length ? `<p><strong>Key gaps:</strong></p><ul>${gaps.map(g => `<li>${escapeHtml(g)}</li>`).join("")}</ul>` : ""}
      <p>Want a specialist to walk you through it? <a href="https://www.sentieratech.com/contact">Book a Complimentary Visibility Review</a>.</p>
      <p style="margin-top: 24px; font-size: 13px; color: #64748b;">Sentiera Technologies · Masdar City, Abu Dhabi</p>
    </div>
  `;

  const message = [
    `From: Sentiera Cortex <${FROM_EMAIL}>`,
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

export async function sendContactEnquiryEmail(payload: {
  name: string;
  company: string;
  role?: string | null;
  email: string;
  phone: string;
  website?: string | null;
  engagement: string;
  message?: string | null;
}) {
  const gmail = getGmailClient();
  if (!gmail) {
    throw new Error("Gmail credentials missing.");
  }

  const to = process.env.CONTACT_TO_EMAIL || "hello@sentieratech.com";
  const subject = `New contact: ${payload.company} — ${payload.name}`;
  const html = `
    <div style="font-family: system-ui, sans-serif; max-width: 640px; margin: 0 auto; color: #1e293b;">
      <h2 style="color: #0f172a;">New contact form submission</h2>
      <p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
      <p><strong>Company:</strong> ${escapeHtml(payload.company)}</p>
      <p><strong>Role:</strong> ${escapeHtml(payload.role || "—")}</p>
      <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(payload.phone)}</p>
      <p><strong>Website:</strong> ${escapeHtml(payload.website || "—")}</p>
      <p><strong>Engagement:</strong> ${escapeHtml(payload.engagement)}</p>
      <p><strong>Message:</strong></p>
      <p style="white-space: pre-wrap;">${escapeHtml(payload.message || "—")}</p>
    </div>
  `;

  const message = [
    `From: Sentiera Website <${FROM_EMAIL}>`,
    `To: ${to}`,
    `Reply-To: ${payload.email}`,
    `Subject: ${subject}`,
    `MIME-Version: 1.0`,
    `Content-Type: text/html; charset=utf-8`,
    ``,
    html,
  ].join("\n");

  const encoded = Buffer.from(message).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  await gmail.users.messages.send({
    userId: "me",
    requestBody: { raw: encoded },
  });
}
