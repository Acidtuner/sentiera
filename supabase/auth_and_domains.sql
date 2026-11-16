-- Run this in the Supabase SQL editor

-- Profiles table (linked to auth.users)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  plan text default 'free',
  created_at timestamptz default now()
);

-- Domains audited per user (free tier = 1 forever)
create table if not exists public.user_domains (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  domain text not null,
  first_audited_at timestamptz default now(),
  unique(user_id, domain)
);

-- Enable RLS
alter table public.profiles enable row level security;
alter table public.user_domains enable row level security;

-- Policies (users can read their own rows)
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can view own domains"
  on public.user_domains for select
  using (auth.uid() = user_id);

-- Service role can do everything (used by the app server)
-- (service role bypasses RLS by default)
