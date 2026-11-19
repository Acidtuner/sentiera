-- Contact form submissions from sentieratech.com/contact
-- Run in the Supabase SQL editor.

create table if not exists public.contact_enquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  company text not null,
  role text,
  email text not null,
  phone text not null,
  website text,
  engagement text not null,
  message text,
  created_at timestamptz not null default now()
);

alter table public.contact_enquiries enable row level security;

-- No public insert or select policy.
-- The site writes with the service role, which bypasses RLS.
-- Read the rows from the Supabase dashboard.

create index if not exists contact_enquiries_created_at_idx
  on public.contact_enquiries (created_at desc);

create index if not exists contact_enquiries_email_idx
  on public.contact_enquiries (email);
