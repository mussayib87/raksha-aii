import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  Search,
  RefreshCw,
  MapPin,
  Clock3,
  Loader2,
  XCircle,
} from "lucide-react";
import { supabase, supabaseConfigError } from "../lib/supabase";

type Incident = {
  id: string;
  title?: string | null;
  name?: string | null;
  type?: string | null;
  incident_type?: string | null;
  description?: string | null;
  severity?: string | null;
  status?: string | null;
  location?: unknown;
  created_at?: string | null;
  reported_at?: string | null;
  createdAt?: string | null;
};

export default function Incidents() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const [search, setSearch] = useState<string>("");
  const [severity, setSeverity] = useState<string>("");

  // --------------------------------------------------
  // Fetch incidents
  // --------------------------------------------------
  const fetchIncidents = async (isRefresh = false): Promise<void> => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      if (!supabase) {
        throw new Error(
          supabaseConfigError ?? "The Supabase client is unavailable."
        );
      }

      const { data, error: supabaseError } = await supabase
        .from("incidents")
        .select("*")
        .order("created_at", { ascending: false });

      if (supabaseError) {
        throw supabaseError;
      }

      setIncidents((data as Incident[]) || []);
    } catch (err: unknown) {
      console.error("Error loading incidents:", err);

      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(
          "Unable to load incidents. Please check your Supabase connection."
        );
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    void fetchIncidents();
  }, []);

  // --------------------------------------------------
  // Format date
  // --------------------------------------------------
  const formatDate = (date: string | null | undefined): string => {
    if (!date) return "—";

    const parsed = new Date(date);

    if (Number.isNaN(parsed.getTime())) {
      return "—";
    }

    return parsed.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // --------------------------------------------------
  // Format location
  // --------------------------------------------------
  const formatLocation = (location: unknown): string => {
    if (!location) return "Unknown";

    if (typeof location === "string") {
      return location;
    }

    if (typeof location === "object") {
      const value = location as Record<string, unknown>;

      if (typeof value.address === "string") {
        return value.address;
      }

      if (typeof value.name === "string") {
        return value.name;
      }

      if (
        typeof value.latitude === "number" &&
        typeof value.longitude === "number"
      ) {
        return `${value.latitude.toFixed(4)}, ${value.longitude.toFixed(4)}`;
      }

      if (
        typeof value.lat === "number" &&
        typeof value.lng === "number"
      ) {
        return `${value.lat.toFixed(4)}, ${value.lng.toFixed(4)}`;
      }

      return "Location available";
    }

    return String(location);
  };

  // --------------------------------------------------
  // Normalize values
  // --------------------------------------------------
  const normalize = (value: unknown): string =>
    String(value ?? "")
      .trim()
      .toLowerCase();

  // --------------------------------------------------
  // Filter incidents
  // --------------------------------------------------
  const filteredIncidents = useMemo(() => {
    const query = normalize(search);

    return incidents.filter((incident: Incident) => {
      const matchesSearch =
        !query ||
        normalize(incident.id).includes(query) ||
        normalize(incident.title).includes(query) ||
        normalize(incident.type).includes(query) ||
        normalize(incident.description).includes(query) ||
        normalize(formatLocation(incident.location)).includes(query);

      const matchesSeverity =
        !severity ||
        normalize(incident.severity) === normalize(severity);

      return matchesSearch && matchesSeverity;
    });
  }, [incidents, search, severity]);

  // --------------------------------------------------
  // Severity styles
  // --------------------------------------------------
  const getSeverityStyle = (value: unknown): string => {
    switch (normalize(value)) {
      case "critical":
        return "border-red-500/30 bg-red-500/10 text-red-400";

      case "high":
        return "border-orange-500/30 bg-orange-500/10 text-orange-400";

      case "medium":
        return "border-yellow-500/30 bg-yellow-500/10 text-yellow-400";

      case "low":
        return "border-emerald-500/30 bg-emerald-500/10 text-emerald-400";

      default:
        return "border-slate-500/30 bg-slate-500/10 text-slate-400";
    }
  };

  // --------------------------------------------------
  // Status styles
  // --------------------------------------------------
  const getStatusStyle = (value: unknown): string => {
    switch (normalize(value)) {
      case "active":
      case "open":
      case "pending":
        return "border-red-500/30 bg-red-500/10 text-red-400";

      case "assigned":
      case "responding":
      case "in progress":
      case "in_progress":
        return "border-blue-500/30 bg-blue-500/10 text-blue-400";

      case "resolved":
      case "closed":
      case "completed":
        return "border-emerald-500/30 bg-emerald-500/10 text-emerald-400";

      default:
        return "border-slate-500/30 bg-slate-500/10 text-slate-400";
    }
  };

  // --------------------------------------------------
  // Clear filters
  // --------------------------------------------------
  const clearFilters = (): void => {
    setSearch("");
    setSeverity("");
  };

  return (
    <div className="space-y-4 p-4 lg:p-6">
      {/* Page heading */}
      <section>
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-red-400 shadow-[0_0_8px_rgba(239,68,68,0.8)]" />

          <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-red-400">
            Incident Management
          </span>
        </div>

        <div className="mt-1 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white">
              Incidents
            </h1>

            <p className="mt-1 text-[11px] text-slate-500">
              Manage and track emergency incidents
            </p>
          </div>

          <button
            onClick={() => void fetchIncidents(true)}
            disabled={refreshing}
            className="inline-flex h-9 items-center justify-center gap-2 rounded-md border border-[var(--border)] bg-[var(--bg-secondary)] px-3 text-[11px] font-medium text-slate-300 transition hover:border-red-500/30 hover:bg-red-500/5 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {refreshing ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <RefreshCw size={14} />
            )}

            {refreshing ? "Refreshing..." : "Refresh"}
          </button>
        </div>
      </section>

      {/* Filters */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search
            size={14}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-600"
          />

          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search incidents..."
            className="h-9 w-full rounded-md border border-[var(--border)] bg-[var(--bg-secondary)] pl-9 pr-3 text-[11px] text-slate-200 placeholder:text-slate-600 focus:border-red-500/40 focus:outline-none"
          />
        </div>

        <select
          value={severity}
          onChange={(e) => setSeverity(e.target.value)}
          className="h-9 rounded-md border border-[var(--border)] bg-[var(--bg-secondary)] px-3 text-[11px] text-slate-200 focus:border-red-500/40 focus:outline-none"
        >
          <option value="">All Severities</option>
          <option value="critical">Critical</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

        {(search || severity) && (
          <button
            onClick={clearFilters}
            className="inline-flex h-9 items-center justify-center gap-1.5 rounded-md border border-[var(--border)] px-3 text-[11px] text-slate-400 transition hover:border-red-500/30 hover:text-red-400"
          >
            <XCircle size={13} />
            Clear
          </button>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle
              size={18}
              className="mt-0.5 shrink-0 text-red-400"
            />

            <div>
              <p className="text-sm font-medium text-red-400">
                Failed to load incidents
              </p>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                {error}
              </p>

              <button
                onClick={() => void fetchIncidents()}
                className="mt-3 rounded-md border border-red-500/20 px-3 py-1.5 text-[11px] font-medium text-red-400 transition hover:bg-red-500/10"
              >
                Try again
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-panel)] p-12 text-center">
          <div className="flex justify-center">
            <Loader2 size={28} className="animate-spin text-red-400" />
          </div>

          <p className="mt-4 text-sm font-medium text-slate-300">
            Loading incidents...
          </p>

          <p className="mt-1 text-xs text-slate-600">
            Connecting to emergency data source
          </p>
        </div>
      ) : (
        <>
          {/* Result count */}
          <div className="flex items-center justify-between">
            <p className="text-[10px] uppercase tracking-[0.12em] text-slate-600">
              {filteredIncidents.length}{" "}
              {filteredIncidents.length === 1 ? "Incident" : "Incidents"}
            </p>

            {(search || severity) && (
              <p className="text-[10px] text-slate-600">
                Filtered from {incidents.length}
              </p>
            )}
          </div>

          {/* Empty state */}
          {filteredIncidents.length === 0 ? (
            <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-panel)] p-12 text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-lg border border-red-500/30 bg-red-500/10">
                  <AlertTriangle
                    size={32}
                    className="text-red-400"
                    strokeWidth={1.5}
                  />
                </div>
              </div>

              <h2 className="mb-2 text-lg font-semibold text-white">
                {incidents.length === 0
                  ? "No Incidents"
                  : "No Matching Incidents"}
              </h2>

              <p className="mb-4 text-sm text-slate-400">
                {incidents.length === 0
                  ? "No emergency incidents have been reported yet."
                  : "Try changing your search or severity filter."}
              </p>

              {(search || severity) && (
                <button
                  onClick={clearFilters}
                  className="rounded-md border border-red-500/20 bg-red-500/5 px-4 py-2 text-xs font-medium text-red-400 transition hover:bg-red-500/10"
                >
                  Clear Filters
                </button>
              )}
            </div>
          ) : (
            <div className="overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--bg-panel)]">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[850px] text-sm">
                  <thead>
                    <tr className="border-b border-[var(--border)] bg-[var(--bg-secondary)]">
                      <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.1em] text-slate-400">
                        Incident
                      </th>

                      <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.1em] text-slate-400">
                        Type
                      </th>

                      <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.1em] text-slate-400">
                        Severity
                      </th>

                      <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.1em] text-slate-400">
                        Location
                      </th>

                      <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.1em] text-slate-400">
                        Status
                      </th>

                      <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.1em] text-slate-400">
                        Reported
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredIncidents.map((incident: Incident) => (
                      <tr
                        key={incident.id}
                        className="border-b border-[var(--border)] transition hover:bg-white/[0.02]"
                      >
                        <td className="px-4 py-4">
                          <div className="max-w-[230px]">
                            <p className="truncate text-xs font-semibold text-slate-200">
                              {incident.title ||
                                incident.name ||
                                "Untitled Incident"}
                            </p>

                            <p className="mt-1 truncate font-mono text-[9px] text-slate-600">
                              {incident.id}
                            </p>
                          </div>
                        </td>

                        <td className="px-4 py-4">
                          <span className="text-xs capitalize text-slate-400">
                            {incident.type ||
                              incident.incident_type ||
                              "Unknown"}
                          </span>
                        </td>

                        <td className="px-4 py-4">
                          <span
                            className={`inline-flex rounded-full border px-2 py-1 text-[9px] font-semibold uppercase tracking-wide ${getSeverityStyle(
                              incident.severity
                            )}`}
                          >
                            {incident.severity || "Unknown"}
                          </span>
                        </td>

                        <td className="px-4 py-4">
                          <div className="flex max-w-[220px] items-center gap-1.5">
                            <MapPin
                              size={12}
                              className="shrink-0 text-slate-600"
                            />

                            <span className="truncate text-xs text-slate-400">
                              {formatLocation(incident.location)}
                            </span>
                          </div>
                        </td>

                        <td className="px-4 py-4">
                          <span
                            className={`inline-flex rounded-full border px-2 py-1 text-[9px] font-semibold uppercase tracking-wide ${getStatusStyle(
                              incident.status
                            )}`}
                          >
                            {incident.status || "Unknown"}
                          </span>
                        </td>

                        <td className="px-4 py-4">
                          <div className="flex items-center gap-1.5 whitespace-nowrap">
                            <Clock3
                              size={12}
                              className="text-slate-600"
                            />

                            <span className="text-[10px] text-slate-500">
                              {formatDate(
                                incident.created_at ||
                                  incident.reported_at ||
                                  incident.createdAt
                              )}
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
  }
