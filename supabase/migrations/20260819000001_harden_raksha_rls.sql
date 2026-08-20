-- RAKSHA-AI RLS hardening.
-- The current browser application has no authentication flow and performs no writes.
-- Keep public access closed and expose operational reads only to authenticated users.

begin;

alter table public.incidents enable row level security;
alter table public.responders enable row level security;
alter table public.responder_incident_assignments enable row level security;
alter table public.resources enable row level security;
alter table public.alerts enable row level security;

-- The browser uses only the publishable/anon key. It must not write operational data.
revoke all on table public.incidents from anon;
revoke all on table public.responders from anon;
revoke all on table public.responder_incident_assignments from anon;
revoke all on table public.resources from anon;
revoke all on table public.alerts from anon;

revoke insert, update, delete, truncate, references, trigger
  on table public.incidents from authenticated;
revoke insert, update, delete, truncate, references, trigger
  on table public.responders from authenticated;
revoke insert, update, delete, truncate, references, trigger
  on table public.responder_incident_assignments from authenticated;
revoke insert, update, delete, truncate, references, trigger
  on table public.resources from authenticated;
revoke insert, update, delete, truncate, references, trigger
  on table public.alerts from authenticated;

grant select on table public.incidents to authenticated;
grant select on table public.responders to authenticated;
grant select on table public.responder_incident_assignments to authenticated;
grant select on table public.resources to authenticated;
grant select on table public.alerts to authenticated;

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