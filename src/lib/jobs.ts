import { supabase } from "@/lib/supabase";

export type CortexJob = {
  id: string;
  name: string | null;
  company: string | null;
  email: string | null;
  target_url: string;
  keyword: string | null;
  status: string;
  grok_status: string;
  site_status: string;
  grok_result: unknown;
  site_result: unknown;
  error_message: string | null;
  email_sent: boolean;
};

function requireClient() {
  if (!supabase) throw new Error("Supabase is not configured.");
  return supabase;
}

export async function createJob(input: {
  name: string;
  company: string;
  email: string;
  targetUrl: string;
  keyword: string;
}): Promise<CortexJob> {
  const client = requireClient();
  const { data, error } = await client
    .from("cortex_jobs")
    .insert({
      name: input.name,
      company: input.company,
      email: input.email,
      target_url: input.targetUrl,
      keyword: input.keyword,
      status: "running",
    })
    .select("*")
    .single();
  if (error || !data) throw new Error(error?.message || "Could not create the check.");
  return data as CortexJob;
}

export async function getJob(id: string): Promise<CortexJob | null> {
  const client = requireClient();
  const { data, error } = await client.from("cortex_jobs").select("*").eq("id", id).maybeSingle();
  if (error) throw new Error(error.message);
  return (data as CortexJob | null) || null;
}

export async function updateJob(id: string, patch: Record<string, unknown>) {
  const client = requireClient();
  const { error } = await client
    .from("cortex_jobs")
    .update({ ...patch, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw new Error(error.message);
}
