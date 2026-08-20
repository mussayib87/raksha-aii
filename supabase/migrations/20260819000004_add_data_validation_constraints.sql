-- Database-side validation for operational data.
-- NOT VALID preserves existing rows while enforcing rules for new writes.

begin;

do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'incidents_severity_valid') then
    alter table public.incidents
      add constraint incidents_severity_valid
      check (lower(severity) in ('low', 'medium', 'high', 'critical')) not valid;
  end if;

  if not exists (select 1 from pg_constraint where conname = 'incidents_priority_valid') then
    alter table public.incidents
      add constraint incidents_priority_valid
      check (lower(priority) in ('low', 'medium', 'high', 'critical')) not valid;
  end if;

  if not exists (select 1 from pg_constraint where conname = 'incidents_status_valid') then
    alter table public.incidents
      add constraint incidents_status_valid
      check (lower(status) in ('open', 'active', 'pending', 'assigned', 'responding', 'in_progress', 'in progress', 'resolved', 'closed', 'completed')) not valid;
  end if;

  if not exists (select 1 from pg_constraint where conname = 'incidents_coordinates_valid') then
    alter table public.incidents
      add constraint incidents_coordinates_valid
      check (
        (latitude is null and longitude is null)
        or (latitude between -90 and 90 and longitude between -180 and 180)
      ) not valid;
  end if;

  if not exists (select 1 from pg_constraint where conname = 'incidents_coordinates_pair_valid') then
    alter table public.incidents
      add constraint incidents_coordinates_pair_valid
      check ((latitude is null) = (longitude is null)) not valid;
  end if;

  if not exists (select 1 from pg_constraint where conname = 'responders_coordinates_valid') then
    alter table public.responders
      add constraint responders_coordinates_valid
      check (
        (latitude is null and longitude is null)
        or (latitude between -90 and 90 and longitude between -180 and 180)
      ) not valid;
  end if;

  if not exists (select 1 from pg_constraint where conname = 'responders_coordinates_pair_valid') then
    alter table public.responders
      add constraint responders_coordinates_pair_valid
      check ((latitude is null) = (longitude is null)) not valid;
  end if;

  if not exists (select 1 from pg_constraint where conname = 'resources_quantity_valid') then
    alter table public.resources
      add constraint resources_quantity_valid
      check (quantity >= 0 and quantity <> 'NaN'::numeric) not valid;
  end if;

  if not exists (select 1 from pg_constraint where conname = 'resources_coordinates_valid') then
    alter table public.resources
      add constraint resources_coordinates_valid
      check (
        (latitude is null and longitude is null)
        or (latitude between -90 and 90 and longitude between -180 and 180)
      ) not valid;
  end if;

  if not exists (select 1 from pg_constraint where conname = 'resources_coordinates_pair_valid') then
    alter table public.resources
      add constraint resources_coordinates_pair_valid
      check ((latitude is null) = (longitude is null)) not valid;
  end if;

  if not exists (select 1 from pg_constraint where conname = 'alerts_severity_valid') then
    alter table public.alerts
      add constraint alerts_severity_valid
      check (lower(severity) in ('low', 'medium', 'high', 'critical')) not valid;
  end if;

  if not exists (select 1 from pg_constraint where conname = 'alerts_priority_valid') then
    alter table public.alerts
      add constraint alerts_priority_valid
      check (lower(priority) in ('low', 'medium', 'high', 'critical')) not valid;
  end if;
end;
$$;

commit;