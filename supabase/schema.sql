-- ReinstateLabs inquiries table.
-- Run this once in the Supabase SQL editor for the project.

create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  form_type text not null check (form_type in ('appointment', 'contact')),
  name text not null,
  email text not null,
  company text,
  phone text,
  service text,
  project_type text,
  budget_range text,
  message text not null,
  status text not null default 'new'
);

create index if not exists inquiries_created_at_idx on public.inquiries (created_at desc);
create index if not exists inquiries_form_type_idx on public.inquiries (form_type);
create index if not exists inquiries_status_idx on public.inquiries (status);

-- Row Level Security is enabled and no policies are defined for the anon or
-- authenticated roles, so the public/browser Supabase key (if one is ever
-- introduced later) gets zero access by default: no select, no insert, no
-- update, no delete. The website never talks to Supabase directly — the
-- Next.js API route inserts using the service-role key, which bypasses RLS
-- entirely and is never exposed to the browser. You can read submissions
-- from the Supabase dashboard's Table Editor, which also uses elevated
-- access.
alter table public.inquiries enable row level security;
