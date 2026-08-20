-- Allow incident CRUD only for explicitly authorized authenticated operators.
-- Roles are read from Supabase Auth app_metadata, never from client input.

begin;

grant insert, update, delete on table public.incidents to authenticated;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'incidents'
      and policyname = 'authorized_operators_can_create_incidents'
  ) then
    create policy authorized_operators_can_create_incidents
      on public.incidents for insert to authenticated
      with check ((auth.jwt() -> 'app_metadata' ->> 'role') in ('admin', 'incident_manager', 'dispatcher'));
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'incidents'
      and policyname = 'authorized_operators_can_update_incidents'
  ) then
    create policy authorized_operators_can_update_incidents
      on public.incidents for update to authenticated
      using ((auth.jwt() -> 'app_metadata' ->> 'role') in ('admin', 'incident_manager', 'dispatcher'))
      with check ((auth.jwt() -> 'app_metadata' ->> 'role') in ('admin', 'incident_manager', 'dispatcher'));
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'incidents'
      and policyname = 'authorized_operators_can_delete_incidents'
  ) then
    create policy authorized_operators_can_delete_incidents
      on public.incidents for delete to authenticated
      using ((auth.jwt() -> 'app_metadata' ->> 'role') in ('admin', 'incident_manager'));
  end if;
end;
$$;

commit;