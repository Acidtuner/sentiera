create table if not exists public.cortex_jobs (
  id uuid primary key default gen_random_uuid(),
  name text,
  company text,
  email text,
  target_url text not null,
  keyword text,
  status text not null default 'queued',
  grok_status text not null default 'queued',
  site_status text not null default 'queued',
  grok_result jsonb,
  site_result jsonb,
  error_message text,
  email_sent boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.cortex_jobs enable row level security;
