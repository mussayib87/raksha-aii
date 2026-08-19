import { supabase, supabaseConfigError } from "./supabase";

export interface Incident {
  id: string;
  title: string;
  description: string | null;
  type: string;
  severity: string;
  status: string;
  location: string | null;
  latitude: number | null;
  longitude: number | null;
  assigned_responder: string | null;
  created_at: string;
  updated_at: string;
}

export const getIncidentDataError = (): Error =>
  new Error(
    supabaseConfigError ?? "The Supabase client is unavailable."
  );

export async function fetchIncidents(): Promise<Incident[]> {
  if (!supabase) {
    throw getIncidentDataError();
  }

  const { data, error } = await supabase
    .from("incidents")
    .select(
      "id, title, description, type, severity, status, location, latitude, longitude, assigned_responder, created_at, updated_at"
    )
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return (data as Incident[]) ?? [];
}

export const isActiveIncident = (incident: Incident): boolean => {
  const status = incident.status.trim().toLowerCase();
  return !["resolved", "closed", "completed"].includes(status);
};

export const getIncidentMapPosition = (
  incident: Incident,
  incidents: Incident[]
): { left: string; top: string } => {
  const locatedIncidents = incidents.filter(
    (item) => item.latitude !== null && item.longitude !== null
  );
  const latitudes = locatedIncidents.map((item) => item.latitude as number);
  const longitudes = locatedIncidents.map((item) => item.longitude as number);
  const minLatitude = Math.min(...latitudes);
  const maxLatitude = Math.max(...latitudes);
  const minLongitude = Math.min(...longitudes);
  const maxLongitude = Math.max(...longitudes);
  const latitudeRange = maxLatitude - minLatitude;
  const longitudeRange = maxLongitude - minLongitude;
  const horizontalPosition = longitudeRange
    ? ((incident.longitude as number) - minLongitude) / longitudeRange
    : 0.5;
  const verticalPosition = latitudeRange
    ? (maxLatitude - (incident.latitude as number)) / latitudeRange
    : 0.5;

  return {
    left: `${15 + horizontalPosition * 70}%`,
    top: `${18 + verticalPosition * 60}%`,
  };
};
