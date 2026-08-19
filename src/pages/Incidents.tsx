import { useEffect, useMemo, useState } from "react";
import { AlertTriangle, Loader2, RefreshCw } from "lucide-react";
import { supabase } from "../lib/supabase";

type Incident = {
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
};

export default function Incidents() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [severity, setSeverity] = useState("");

  const loadIncidents = async () => {
    setLoading(true);
    setError(null);

    const { data, error } = await supabase
      .from("incidents")
      .select(
        `
        id,
        title,
        description,
        type,
        severity,
        status,
        location,
        latitude,
        longitude,
        assigned_responder,
        created_at,
        updated_at
        `
      )
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Failed to load incidents:", error);
      setError(error.message);
      setIncidents([]);
    } else {
      setIncidents(data ?? []);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadIncidents();
  }, []);

  const filteredIncidents = useMemo(() => {
    const query = search.trim().toLowerCase();

    return incidents.filter((incident) => {
      const matchesSearch =
        !query ||
        incident.title.toLowerCase().includes(query) ||
        incident.type.toLowerCase().includes(query) ||
        (incident.location ?? "").toLowerCase().includes(query) ||
        incident.status.toLowerCase().includes(query);

      const matchesSeverity =
        !severity || incident.severity.toLowerCase() === severity;

      return matchesSearch && matchesSeverity;
    });
  }, [incidents, search, severity]);

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

        <div className="flex items-end justify-between gap-3">
          <div>
            <h1 className="mt-1 text-xl font-bold tracking-tight text-white">
              Incidents
            </h1>

            <p className="mt-1 text-[11px] text-slate-500">
              Manage and track emergency incidents
            </p>
          </div>

          <button
            type="button"
            onClick={loadIncidents}
            disabled={loading}
            className="inline-flex h-9 items-center gap-2 rounded-md border border-[var(--border)] bg-[var(--bg-secondary)] px-3 text-[11px] font-medium text-slate-300 transition hover:border-red-500/40 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            <RefreshCw size={13} className={loading ? "animate-spin" : ""} />
            Refresh
          </button>
        </div>
      </section>

      {/* Filters */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-2">
        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search incidents..."
          className="flex-1 h-9 rounded-md border border-[var(--border)] bg-[var(--bg-secondary)] px-3 text-[11px] text-slate-200 placeholder:text-slate-600 focus:border-red-500/40 focus:outline-none"
        />

        <select
          value={severity}
          onChange={(event) => setSeverity(event.target.value)}
          className="h-9 rounded-md border border-[var(--border)] bg-[var(--bg-secondary)] px-3 text-[11px] text-slate-200 focus:border-red-500/40 focus:outline-none cursor-pointer"
        >
          <option value="">All Severities</option>
          <option value="critical">Critical</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle
              size={18}
              className="mt-0.5 shrink-0 text-red-400"
            />

            <div>
              <p className="text-sm font-semibold text-red-300">
                Unable to load incidents
              </p>

              <p className="mt-1 text-xs text-red-200/70">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-panel)] p-12 text-center">
          <Loader2
            size={28}
            className="mx-auto animate-spin text-red-400"
          />

          <p className="mt-3 text-xs text-slate-400">
            Loading emergency incidents...
          </p>
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && filteredIncidents.length === 0 && (
        <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-panel)] p-12 text-center">
          <div className="flex justify-center mb-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-lg border border-red-500/30 bg-red-500/10">
              <AlertTriangle
                size={32}
                className="text-red-400"
                strokeWidth={1.5}
              />
            </div>
          </div>

          <h2 className="text-lg font-semibold text-white mb-2">
            No Incidents
          </h2>

          <p className="text-slate-400 text-sm mb-4">
            {incidents.length === 0
              ? "No emergency incidents have been reported yet."
              : "No incidents match your current filters."}
          </p>

          <p className="text-slate-500 text-xs">
            Reported incidents will appear here automatically.
          </p>
        </div>
      )}

      {/* Incident table */}
      {!loading && filteredIncidents.length > 0 && (
        <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-panel)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--border)] bg-[var(--bg-secondary)]">
                  <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.1em] text-slate-400">
                    Incident ID
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
                </tr>
              </thead>

              <tbody>
                {filteredIncidents.map((incident) => (
                  <tr
                    key={incident.id}
                    className="border-b border-[var(--border)] last:border-b-0 hover:bg-white/[0.02]"
                  >
                    <td className="px-4 py-3">
                      <div className="max-w-[180px] truncate text-xs font-medium text-slate-200">
                        {incident.id}
                      </div>

                      <div className="mt-0.5 max-w-[180px] truncate text-[10px] text-slate-500">
                        {incident.title}
                      </div>
                    </td>

                    <td className="px-4 py-3 text-xs capitalize text-slate-300">
                      {incident.type}
                    </td>

                    <td className="px-4 py-3">
                      <span className="rounded-full border border-slate-700 bg-slate-900/60 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-slate-300">
                        {incident.severity}
                      </span>
                    </td>

                    <td className="px-4 py-3 text-xs text-slate-400">
                      {incident.location || "Location unavailable"}
                    </td>

                    <td className="px-4 py-3">
                      <span className="rounded-full border border-slate-700 bg-slate-900/60 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-slate-300">
                        {incident.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
  }
