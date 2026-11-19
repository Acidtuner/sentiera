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
  honeypot?: string;
};

export async function POST(req: NextRequest) {
  let body: ContactBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request." }, { status: 400 });
  }

  if (body.honeypot) {
    return NextResponse.json({ success: true });
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
    return NextResponse.json({ success: false, error: "We could not save your details. Please email hello@sentieratech.com." }, { status: 500 });
  }

  try {
    await sendContactEnquiryEmail(payload);
  } catch (err) {
    console.error("Contact email failed:", err);
  }

  return NextResponse.json({ success: true });
}
