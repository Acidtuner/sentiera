import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase public env vars missing — auth will not work");
}

export const supabaseAuth = supabaseUrl && supabaseAnonKey
  ? createBrowserClient(supabaseUrl, supabaseAnonKey)
  : null;

export function normalizeDomain(url: string): string {
  try {
    const u = new URL(url.startsWith("http") ? url : `https://${url}`);
    return u.hostname.replace(/^www\./, "").toLowerCase();
  } catch {
    return url.toLowerCase();
  }
}

export async function checkDomainEntitlement(userId: string, domain: string): Promise<{
  allowed: boolean;
  reason?: string;
  existingDomain?: string;
}> {
  if (!supabaseAuth) return { allowed: false, reason: "Auth not configured" };

  const { data: domains } = await supabaseAuth
    .from("user_domains")
    .select("domain")
    .eq("user_id", userId);

  const list = domains || [];
  const alreadyHas = list.some((d) => d.domain === domain);

  if (alreadyHas) return { allowed: true };

  if (list.length === 0) return { allowed: true };

  // Free tier: 1 domain forever
  return {
    allowed: false,
    reason: `Free plan allows 1 domain. You already audited ${list[0].domain}.`,
    existingDomain: list[0].domain,
  };
}

export async function recordDomain(userId: string, domain: string) {
  if (!supabaseAuth) return;
  await supabaseAuth.from("user_domains").upsert(
    { user_id: userId, domain },
    { onConflict: "user_id,domain" }
  );
}
