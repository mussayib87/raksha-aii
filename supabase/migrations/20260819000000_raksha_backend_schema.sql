-- RAKSHA-AI backend schema.
-- This migration is additive and intentionally does not drop or rewrite data.

begin;

create table if not exists public.incidents (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  type text not null default 'other',
  severity text not null default 'medium',
  priority text not null default 'medium',
  status text not null default 'open',
  location text,
  latitude double precision,
  longitude double precision,
  reporter_name text,
  reporter_contact text,
  assigned_responder text,
  assigned_resource text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.incidents add column if not exists title text;
alter table public.incidents add column if not exists description text;
alter table public.incidents add column if not exists type text;
alter table public.incidents add column if not exists severity text;
alter table public.incidents add column if not exists priority text;
alter table public.incidents add column if not exists status text;
alter table public.incidents add column if not exists location text;
alter table public.incidents add column if not exists latitude double precision;
alter table public.incidents add column if not exists longitude double precision;
alter table public.incidents add column if not exists reporter_name text;
alter table public.incidents add column if not exists reporter_contact text;
alter table public.incidents add column if not exists assigned_responder text;
alter table public.incidents add column if not exists assigned_resource text;
alter table public.incidents add column if not exists created_at timestamptz default now();
alter table public.incidents add column if not exists updated_at timestamptz default now();

create table if not exists public.responders (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text,
  contact_phone text,
  contact_email text,
  status text not null default 'unavailable',
  location text,
  latitude double precision,
  longitude double precision,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.responder_incident_assignments (
  id uuid primary key default gen_random_uuid(),
  responder_id uuid not null references public.responders(id) on delete cascade,
  incident_id text not null,
  status text not null default 'assigned',
  assigned_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (responder_id, incident_id)
);

create table if not exists public.resources (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  resource_type text not null,
  quantity numeric not null default 0,
  status text not null default 'available',
  location text,
  latitude double precision,
  longitude double precision,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.alerts (
  id uuid primary key default gen_random_uuid(),
  incident_id text,
  alert_type text not null,
  severity text not null default 'info',
  priority text not null default 'medium',
  message text not null,
  recipient text,
  target text,
  is_read boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists incidents_created_at_idx
  on public.incidents (created_at desc);
create index if not exists incidents_status_idx
  on public.incidents (status);
create index if not exists incidents_severity_idx
  on public.incidents (severity);
create index if not exists responders_status_idx
  on public.responders (status);
create index if not exists resources_status_idx
  on public.resources (status);
create index if not exists alerts_incident_id_idx
  on public.alerts (incident_id);
create index if not exists alerts_unread_idx
  on public.alerts (is_read, created_at desc);

alter table public.incidents enable row level security;
alter table public.responders enable row level security;
alter table public.responder_incident_assignments enable row level security;
alter table public.resources enable row level security;
alter table public.alerts enable row level security;

grant select on public.incidents to authenticated;
grant select on public.responders to authenticated;
grant select on public.responder_incident_assignments to authenticated;
grant select on public.resources to authenticated;
grant select on public.alerts to authenticated;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'incidents'
      and policyname = 'authenticated_users_can_read_incidents'
  ) then
    create policy authenticated_users_can_read_incidents
      on public.incidents for select to authenticated using (true);
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'responders'
      and policyname = 'authenticated_users_can_read_responders'
  ) then
    create policy authenticated_users_can_read_responders
      on public.responders for select to authenticated using (true);
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'responder_incident_assignments'
      and policyname = 'authenticated_users_can_read_assignments'
  ) then
    create policy authenticated_users_can_read_assignments
      on public.responder_incident_assignments for select to authenticated using (true);
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'resources'
      and policyname = 'authenticated_users_can_read_resources'
  ) then
    create policy authenticated_users_can_read_resources
      on public.resources for select to authenticated using (true);
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'alerts'
      and policyname = 'authenticated_users_can_read_alerts'
  ) then
    create policy authenticated_users_can_read_alerts
      on public.alerts for select to authenticated using (true);
  end if;
end;
$$;

commit;