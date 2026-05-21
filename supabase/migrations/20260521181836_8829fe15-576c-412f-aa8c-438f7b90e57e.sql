create table public.report_tokens (
  token uuid primary key default gen_random_uuid(),
  email text not null,
  naam text not null,
  organisatie text not null,
  functie text not null,
  scan_data jsonb not null,
  created_at timestamptz not null default now(),
  expires_at timestamptz not null,
  used_at timestamptz,
  redeem_count integer not null default 0
);
create index report_tokens_email_idx on public.report_tokens(email);
alter table public.report_tokens enable row level security;
-- No policies: only the service role (via edge functions) may read/write.