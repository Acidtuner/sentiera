-- Run this in the Supabase SQL editor to create the audits table

create table if not exists public.audits (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  company text not null,
  email text not null,
  target_url text not null,
  keyword text not null,
  success boolean not null default false,
  error_message text,
  result jsonb,
  created_at timestamptz not null default now()
);

-- Enable RLS
alter table public.audits enable row level security;

-- Only service role can insert/select (dashboard will use service role or a protected admin view later)
create policy "Service role full access" on public.audits
  for all
  using (true)
  with check (true);

-- Optional: index for later dashboard queries
create index if not exists audits_email_idx on public.audits (email);
create index if not exists audits_created_at_idx on public.audits (created_at desc);
