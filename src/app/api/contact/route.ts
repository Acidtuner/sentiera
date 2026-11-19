import { NextRequest, NextResponse } from "next/server";
import { storeContactEnquiry } from "@/lib/supabase";
import { sendContactEnquiryEmail } from "@/lib/email";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ContactBody = {
  name?: string;
  company?: string;
  role?: string;
  email?: string;
  phone?: string;
  website?: string;
  engagement?: string;
  message?: string;
  company_fax?: string;
};

export async function POST(req: NextRequest) {
  let body: ContactBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request." }, { status: 400 });
  }

  if (body.company_fax) {
    console.warn("Contact honeypot filled — ignored");
    return NextResponse.json({ success: true, ignored: true });
  }

  const name = body.name?.trim() || "";
  const company = body.company?.trim() || "";
  const role = body.role?.trim() || null;
  const email = body.email?.trim().toLowerCase() || "";
  const phone = body.phone?.trim() || "";
  const website = body.website?.trim() || null;
  const engagement = body.engagement?.trim() || "";
  const message = body.message?.trim() || null;

  if (!name || !company || !email || !phone || !engagement) {
    return NextResponse.json({ success: false, error: "Name, company, email, phone and engagement are required." }, { status: 400 });
  }
  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json({ success: false, error: "Please enter a valid email." }, { status: 400 });
  }

  const payload = { name, company, role, email, phone, website, engagement, message };

  try {
    await storeContactEnquiry(payload);
  } catch (err) {
    console.error("Contact save failed:", err);
    const detail = err instanceof Error ? err.message : "unknown";
    return NextResponse.json({
      success: false,
      error: detail.includes("not configured")
        ? "Contact storage is not configured on the server."
        : "We could not save your details. Please email hello@sentieratech.com.",
    }, { status: 500 });
  }

  try {
    await sendContactEnquiryEmail(payload);
  } catch (err) {
    console.error("Contact email failed:", err);
  }

  return NextResponse.json({ success: true });
}
