import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.warn("Supabase env vars missing — audit storage will be skipped");
}

export const supabase = supabaseUrl && supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey, {
      auth: { persistSession: false },
    })
  : null;

export async function storeAudit(payload: {
  name: string;
  company: string;
  email: string;
  target_url: string;
  keyword: string;
  success: boolean;
  error_message?: string | null;
  result?: unknown;
}) {
  if (!supabase) return;
  try {
    const { error } = await supabase.from("audits").insert({
      name: payload.name,
      company: payload.company,
      email: payload.email,
      target_url: payload.target_url,
      keyword: payload.keyword,
      success: payload.success,
      error_message: payload.error_message || null,
      result: payload.result || null,
      created_at: new Date().toISOString(),
    });
    if (error) console.error("Supabase insert error:", error);
  } catch (err) {
    console.error("Failed to store audit:", err);
  }
}

export async function storeContactEnquiry(payload: {
  name: string;
  company: string;
  role?: string | null;
  email: string;
  phone: string;
  website?: string | null;
  engagement: string;
  message?: string | null;
}) {
  if (!supabase) {
    throw new Error("Supabase is not configured.");
  }
  const { error } = await supabase.from("contact_enquiries").insert({
    name: payload.name,
    company: payload.company,
    role: payload.role || null,
    email: payload.email,
    phone: payload.phone,
    website: payload.website || null,
    engagement: payload.engagement,
    message: payload.message || null,
    created_at: new Date().toISOString(),
  });
  if (error) {
    console.error("Supabase contact insert error:", error);
    throw new Error(error.message);
  }
}
