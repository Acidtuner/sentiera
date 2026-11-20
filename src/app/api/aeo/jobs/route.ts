import { NextRequest, NextResponse } from "next/server";
import { createJob } from "@/lib/jobs";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ success: false, error: "Invalid request body." }, { status: 400 });
  if (body.honeypot) return NextResponse.json({ success: false, error: "Invalid submission." }, { status: 400 });

  const name = String(body.name || "").trim();
  const company = String(body.company || "").trim();
  const email = String(body.email || "").trim().toLowerCase();
  const targetUrl = String(body.targetUrl || "").trim();
  const keyword = String(body.targetKeyword || "").trim();

  if (!name || !company || !EMAIL_REGEX.test(email) || !targetUrl) {
    return NextResponse.json({ success: false, error: "Name, company, a valid email, and a URL are required." }, { status: 400 });
  }

  try {
    const job = await createJob({ name, company, email, targetUrl, keyword });
    return NextResponse.json({ success: true, id: job.id });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Could not start the check.";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
