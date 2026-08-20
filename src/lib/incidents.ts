import { supabase, supabaseConfigError } from "./supabase";
import { z } from "zod";
import { classifyIncident } from "./incidentClassification";
import {
  coordinateSchema,
  incidentStatusSchema,
  riskLevelSchema,
} from "./validation";

type IncidentRealtimeListener = () => void;

const incidentRealtimeListeners = new Set<IncidentRealtimeListener>();
let incidentRealtimeChannel: ReturnType<NonNullable<typeof supabase>["channel"]> | null = null;

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

export interface IncidentInput {
  title: string;
  description?: string | null;
  type: string;
  severity: string;
  status: string;
  location?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  reporter_name?: string | null;
  reporter_contact?: string | null;
  assigned_responder?: string | null;
  assigned_resource?: string | null;
}

const incidentSchema = z.object({
  id: z.string().min(1),
  title: z.string(),
  description: z.string().nullable(),
  type: z.string(),
  severity: z.string(),
  status: z.string(),
  location: z.string().nullable(),
  latitude: z.number().finite().min(-90).max(90).nullable(),
  longitude: z.number().finite().min(-180).max(180).nullable(),
  assigned_responder: z.string().nullable(),
  created_at: z.string().min(1),
  updated_at: z.string().min(1),
});

const incidentInputSchema = z.object({
  title: z.string().trim().min(1).max(200),
  description: z.string().trim().max(5000).nullable().optional(),
  type: z.string().trim().min(1).max(80),
  severity: riskLevelSchema,
  status: incidentStatusSchema,
  location: z.string().trim().max(300).nullable().optional(),
  ...coordinateSchema.shape,
  reporter_name: z.string().trim().max(160).nullable().optional(),
  reporter_contact: z.string().trim().max(160).nullable().optional(),
  assigned_responder: z.string().trim().max(160).nullable().optional(),
  assigned_resource: z.string().trim().max(160).nullable().optional(),
}).superRefine((value, context) => {
  if ((value.latitude === null) !== (value.longitude === null)) {
    context.addIssue({
      code: "custom",
      message: "Latitude and longitude must be provided together.",
      path: [value.latitude === null ? "latitude" : "longitude"],
    });
  }
});

const incidentUpdateSchema = incidentInputSchema.partial().refine(
  (input) => Object.keys(input).length > 0,
  "At least one incident field is required."
);

const incidentSelect =
  "id, title, description, type, severity, status, location, latitude, longitude, assigned_responder, created_at, updated_at";

export class IncidentDataError extends Error {
  readonly diagnosticMessage?: string;

  constructor(message: string, diagnosticMessage?: string) {
    super(message);
    this.name = "IncidentDataError";
    this.diagnosticMessage = diagnosticMessage;
  }
}

export const getIncidentDataError = (): IncidentDataError =>
  new IncidentDataError(
    supabaseConfigError ?? "The Supabase client is unavailable.",
    supabaseConfigError ?? "Supabase client initialization failed."
  );

interface SupabaseErrorDetails {
  message?: string;
  details?: string;
  hint?: string;
  code?: string;
  status?: number;
}

const readSupabaseError = (error: unknown): SupabaseErrorDetails => {
  if (typeof error !== "object" || error === null) {
    return {
      message: error instanceof Error ? error.message : String(error),
    };
  }

  const candidate = error as Record<string, unknown>;

  return {
    message:
      typeof candidate.message === "string" ? candidate.message : undefined,
    details:
      typeof candidate.details === "string" ? candidate.details : undefined,
    hint: typeof candidate.hint === "string" ? candidate.hint : undefined,
    code: typeof candidate.code === "string" ? candidate.code : undefined,
    status:
      typeof candidate.status === "number" ? candidate.status : undefined,
  };
};

const getSafeSupabaseMessage = (
  operation: string,
  details: SupabaseErrorDetails
): string => {
  const message = details.message?.toLowerCase() ?? "";

  if (
    details.code === "42501" ||
    details.status === 401 ||
    details.status === 403 ||
    message.includes("row-level security") ||
    message.includes("permission denied")
  ) {
    return `You are not authorized to ${operation} incident data.`;
  }

  if (details.code === "42P01" || details.code === "PGRST205") {
    return "The incidents table is unavailable. Check the Supabase migration status.";
  }

  if (details.code === "42703" || details.code === "PGRST204") {
    return "The incidents data schema is incomplete. Check the Supabase migration status.";
  }

  if (details.code === "22P02") {
    return "The incident identifier or a submitted value is invalid.";
  }

  if (details.code === "23505") {
    return "An incident with those unique details already exists.";
  }

  if (
    details.status !== undefined && details.status >= 500 ||
    message.includes("failed to fetch") ||
    message.includes("network")
  ) {
    return "The emergency data service is temporarily unreachable. Please try again.";
  }

  return `Unable to ${operation} incident data. Please try again.`;
};

const getSupabaseError = (
  operation: string,
  error: unknown
): IncidentDataError => {
  const details = readSupabaseError(error);
  const diagnosticMessage = JSON.stringify(details);

  console.error(`Supabase incident ${operation} failed`, {
    operation,
    ...details,
  });

  return new IncidentDataError(
    getSafeSupabaseMessage(operation, details),
    diagnosticMessage
  );
};

export const getIncidentErrorMessage = (
  error: unknown,
  fallback = "Unable to load incident data. Please try again."
): string => {
  if (error instanceof IncidentDataError) {
    return error.message;
  }

  return fallback;
};

const requireSupabase = () => {
  if (!supabase) {
    throw getIncidentDataError();
  }

  return supabase;
};

const requireAuthenticatedSupabase = async () => {
  const client = requireSupabase();
  const { data, error } = await client.auth.getSession();

  if (error) {
    const details = readSupabaseError(error);
    console.error("Supabase authentication check failed", details);
    throw new IncidentDataError(
      "Unable to verify your session. Please sign in again.",
      JSON.stringify(details)
    );
  }

  if (!data.session) {
    throw new IncidentDataError(
      "Authentication is required to access incident data.",
      "No authenticated Supabase session is available."
    );
  }

  return client;
};

const requireIncidentId = (id: string): string => {
  const result = z.string().trim().min(1).safeParse(id);

  if (!result.success) {
    throw new IncidentDataError("A valid incident ID is required.");
  }

  return result.data;
};

const parseIncident = (data: unknown): Incident => {
  const result = incidentSchema.safeParse(data);

  if (!result.success) {
    throw new IncidentDataError(
      "The incident data returned by the database is malformed.",
      result.error.message
    );
  }

  return result.data;
};

type ParsedIncidentInput = z.infer<typeof incidentInputSchema>;

const parseIncidentInput = (input: IncidentInput): ParsedIncidentInput => {
  const result = incidentInputSchema.safeParse(input);

  if (!result.success) {
    throw new IncidentDataError(
      "Please check the incident details and try again.",
      result.error.message
    );
  }

  return result.data;
};

export async function fetchIncidents(): Promise<Incident[]> {
  const client = await requireAuthenticatedSupabase();

  const { data, error } = await client
    .from("incidents")
    .select(incidentSelect)
    .order("created_at", { ascending: false });

  if (error) {
    throw getSupabaseError("load", error);
  }

  return (data ?? []).flatMap((item) => {
    try {
      return [parseIncident(item)];
    } catch (parseError) {
      console.error("Malformed incident row omitted", parseError);
      return [];
    }
  });
}

export async function fetchIncident(id: string): Promise<Incident> {
  const client = await requireAuthenticatedSupabase();
  const incidentId = requireIncidentId(id);
  const { data, error } = await client
    .from("incidents")
    .select(incidentSelect)
    .eq("id", incidentId)
    .maybeSingle();

  if (error) {
    throw getSupabaseError("load", error);
  }

  if (!data) {
    throw new IncidentDataError("Incident not found.");
  }

  return parseIncident(data);
}

export async function createIncident(input: IncidentInput): Promise<Incident> {
  const client = await requireAuthenticatedSupabase();
  const values = parseIncidentInput(input);
  const classification = await classifyIncident(values);
  const { data, error } = await client
    .from("incidents")
    .insert({ ...values, priority: classification.priority })
    .select(incidentSelect)
    .single();

  if (error) {
    throw getSupabaseError("create", error);
  }

  return parseIncident(data);
}

export async function updateIncident(
  id: string,
  input: Partial<IncidentInput>
): Promise<Incident> {
  const client = await requireAuthenticatedSupabase();
  const incidentId = requireIncidentId(id);
  const result = incidentUpdateSchema.safeParse(input);

  if (!result.success) {
    throw new IncidentDataError(
      "Please provide at least one valid incident detail to update.",
      result.error.message
    );
  }

  const { data: currentData, error: currentError } = await client
    .from("incidents")
    .select(incidentSelect)
    .eq("id", incidentId)
    .maybeSingle();

  if (currentError) {
    throw getSupabaseError("load", currentError);
  }

  if (!currentData) {
    throw new IncidentDataError("Incident not found.");
  }

  const currentIncident = parseIncident(currentData);
  const mergedIncident = { ...currentIncident, ...result.data };
  const classification = await classifyIncident(mergedIncident);

  const { data, error } = await client
    .from("incidents")
    .update({ ...result.data, priority: classification.priority })
    .eq("id", incidentId)
    .select(incidentSelect)
    .maybeSingle();

  if (error) {
    throw getSupabaseError("update", error);
  }

  if (!data) {
    throw new IncidentDataError("Incident not found or could not be updated.");
  }

  return parseIncident(data);
}

export async function deleteIncident(id: string): Promise<void> {
  const client = await requireAuthenticatedSupabase();
  const incidentId = requireIncidentId(id);
  const { error, count } = await client
    .from("incidents")
    .delete({ count: "exact" })
    .eq("id", incidentId);

  if (error) {
    throw getSupabaseError("delete", error);
  }

  if (count !== 1) {
    throw new IncidentDataError("Incident not found or could not be deleted.");
  }
}

const startIncidentRealtime = (): void => {
  if (!supabase || incidentRealtimeChannel) return;

  incidentRealtimeChannel = supabase
    .channel("raksha-incidents")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "incidents" },
      () => {
        incidentRealtimeListeners.forEach((listener) => listener());
      }
    )
    .subscribe((status, error) => {
      if (status === "CHANNEL_ERROR" || status === "TIMED_OUT") {
        console.error("Supabase incident realtime subscription failed", {
          status,
          error,
        });
      }
    });
};

const stopIncidentRealtime = (): void => {
  if (!supabase || !incidentRealtimeChannel) return;

  const channel = incidentRealtimeChannel;
  incidentRealtimeChannel = null;
  void supabase.removeChannel(channel);
};

export const subscribeToIncidentChanges = (
  listener: IncidentRealtimeListener
): (() => void) => {
  if (!supabase) return () => undefined;

  incidentRealtimeListeners.add(listener);
  startIncidentRealtime();

  return () => {
    incidentRealtimeListeners.delete(listener);

    if (incidentRealtimeListeners.size === 0) {
      stopIncidentRealtime();
    }
  };
};

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

  if (
    locatedIncidents.length === 0 ||
    incident.latitude === null ||
    incident.longitude === null
  ) {
    return { left: "50%", top: "50%" };
  }

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
