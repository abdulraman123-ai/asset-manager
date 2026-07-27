-- Founder / admin access control.
--
-- This table lists which email addresses are allowed to add products and
-- manage this list. It's intentionally NOT readable or writable by regular
-- users at all — there are no RLS policies below for the authenticated or
-- anon roles. Only server-side code using the service role key (the admin
-- page and its API routes) can read or write it. That's deliberate: this
-- table controls who has admin power, so it gets the strictest possible
-- default — nobody, until your own backend code says otherwise.

create table public.founder_emails (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);

alter table public.founder_emails enable row level security;
-- (No policies added — see explanation above.)

-- Seed yourself as the first founder. REPLACE the placeholder email below
-- with your real one (the same email you sign in with) before running this
-- in the SQL Editor.
insert into public.founder_emails (email) values ('abdulrahmanodunmbaku44@gmail.com');
