import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  Search,
  RefreshCw,
  MapPin,
  Clock3,
  Loader2,
  XCircle,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";
import {
  createIncident,
  deleteIncident,
  fetchIncidents as loadIncidents,
  getIncidentErrorMessage,
  subscribeToIncidentChanges,
  updateIncident,
  type IncidentInput,
  type Incident,
} from "../lib/incidents";

export default function Incidents() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const [search, setSearch] = useState<string>("");
  const [severity, setSeverity] = useState<string>("");
  const [formOpen, setFormOpen] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState<boolean>(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [formError, setFormError] = useState<string>("");
  const [form, setForm] = useState<IncidentInput>({
    title: "",
    description: "",
    type: "other",
    severity: "medium",
    status: "open",
    location: "",
    latitude: null,
    longitude: null,
  });

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

      setIncidents(await loadIncidents());
    } catch (err: unknown) {
      console.error("Error loading incidents:", err);
      setError(getIncidentErrorMessage(err));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    void fetchIncidents();
  }, []);

  useEffect(
    () =>
      subscribeToIncidentChanges(() => {
        void fetchIncidents(true);
      }),
    []
  );

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
  const formatLocation = (location: string | null): string => {
    if (!location) return "Unknown";

    return location;
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

  const openCreateForm = (): void => {
    setEditingId(null);
    setFormError("");
    setForm({
      title: "",
      description: "",
      type: "other",
      severity: "medium",
      status: "open",
      location: "",
      latitude: null,
      longitude: null,
    });
    setFormOpen(true);
  };

  const openEditForm = (incident: Incident): void => {
    setEditingId(incident.id);
    setFormError("");
    setForm({
      title: incident.title,
      description: incident.description,
      type: incident.type,
      severity: incident.severity,
      status: incident.status,
      location: incident.location,
      latitude: incident.latitude,
      longitude: incident.longitude,
      assigned_responder: incident.assigned_responder,
    });
    setFormOpen(true);
  };

  const updateForm = <K extends keyof IncidentInput>(
    field: K,
    value: IncidentInput[K]
  ): void => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleFormSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    setSaving(true);
    setFormError("");

    try {
      if (editingId) {
        const updated = await updateIncident(editingId, form);
        setIncidents((current) =>
          current.map((incident) =>
            incident.id === updated.id ? updated : incident
          )
        );
      } else {
        const created = await createIncident(form);
        setIncidents((current) => [created, ...current]);
      }

      setFormOpen(false);
    } catch (err: unknown) {
      setFormError(
        getIncidentErrorMessage(
          err,
          "Unable to save the incident. Please try again."
        )
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (incident: Incident): Promise<void> => {
    if (!window.confirm(`Delete incident "${incident.title}"?`)) return;

    setDeletingId(incident.id);
    setError("");

    try {
      await deleteIncident(incident.id);
      setIncidents((current) =>
        current.filter((currentIncident) => currentIncident.id !== incident.id)
      );
    } catch (err: unknown) {
      setError(
        getIncidentErrorMessage(
          err,
          "Unable to delete the incident. Please try again."
        )
      );
    } finally {
      setDeletingId(null);
    }
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

          <div className="flex items-center gap-2">
            <button
              onClick={openCreateForm}
              className="inline-flex h-9 items-center justify-center gap-2 rounded-md border border-red-500/20 bg-red-500/10 px-3 text-[11px] font-medium text-red-300 transition hover:bg-red-500/15 hover:text-white"
            >
              <Plus size={14} />
              New Incident
            </button>

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

      {formOpen && (
        <form
          onSubmit={(event) => void handleFormSubmit(event)}
          className="rounded-lg border border-red-500/20 bg-[var(--bg-panel)] p-4"
        >
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white">
              {editingId ? "Edit Incident" : "Create Incident"}
            </h2>
            <button
              type="button"
              onClick={() => setFormOpen(false)}
              className="text-[11px] text-slate-500 transition hover:text-white"
            >
              Cancel
            </button>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <label className="text-[10px] font-medium text-slate-300">
              Title
              <input
                required
                value={form.title}
                onChange={(event) => updateForm("title", event.target.value)}
                className="mt-1 h-9 w-full rounded-md border border-[var(--border)] bg-[var(--bg-secondary)] px-3 text-[11px] text-slate-200 focus:border-red-500/40 focus:outline-none"
              />
            </label>

            <label className="text-[10px] font-medium text-slate-300">
              Type
              <input
                required
                value={form.type}
                onChange={(event) => updateForm("type", event.target.value)}
                className="mt-1 h-9 w-full rounded-md border border-[var(--border)] bg-[var(--bg-secondary)] px-3 text-[11px] text-slate-200 focus:border-red-500/40 focus:outline-none"
              />
            </label>

            <label className="text-[10px] font-medium text-slate-300">
              Severity
              <select
                value={form.severity}
                onChange={(event) =>
                  updateForm("severity", event.target.value)
                }
                className="mt-1 h-9 w-full rounded-md border border-[var(--border)] bg-[var(--bg-secondary)] px-3 text-[11px] text-slate-200 focus:border-red-500/40 focus:outline-none"
              >
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </label>

            <label className="text-[10px] font-medium text-slate-300">
              Status
              <select
                value={form.status}
                onChange={(event) => updateForm("status", event.target.value)}
                className="mt-1 h-9 w-full rounded-md border border-[var(--border)] bg-[var(--bg-secondary)] px-3 text-[11px] text-slate-200 focus:border-red-500/40 focus:outline-none"
              >
                <option value="open">Open</option>
                <option value="assigned">Assigned</option>
                <option value="in_progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </select>
            </label>

            <label className="text-[10px] font-medium text-slate-300">
              Location
              <input
                value={form.location ?? ""}
                onChange={(event) => updateForm("location", event.target.value)}
                className="mt-1 h-9 w-full rounded-md border border-[var(--border)] bg-[var(--bg-secondary)] px-3 text-[11px] text-slate-200 focus:border-red-500/40 focus:outline-none"
              />
            </label>

            <label className="text-[10px] font-medium text-slate-300">
              Latitude
              <input
                type="number"
                min="-90"
                max="90"
                step="any"
                value={form.latitude ?? ""}
                onChange={(event) =>
                  updateForm(
                    "latitude",
                    event.target.value ? Number(event.target.value) : null
                  )
                }
                className="mt-1 h-9 w-full rounded-md border border-[var(--border)] bg-[var(--bg-secondary)] px-3 text-[11px] text-slate-200 focus:border-red-500/40 focus:outline-none"
              />
            </label>

            <label className="text-[10px] font-medium text-slate-300">
              Longitude
              <input
                type="number"
                min="-180"
                max="180"
                step="any"
                value={form.longitude ?? ""}
                onChange={(event) =>
                  updateForm(
                    "longitude",
                    event.target.value ? Number(event.target.value) : null
                  )
                }
                className="mt-1 h-9 w-full rounded-md border border-[var(--border)] bg-[var(--bg-secondary)] px-3 text-[11px] text-slate-200 focus:border-red-500/40 focus:outline-none"
              />
            </label>

            <label className="text-[10px] font-medium text-slate-300 md:col-span-2">
              Description
              <textarea
                rows={3}
                value={form.description ?? ""}
                onChange={(event) =>
                  updateForm("description", event.target.value)
                }
                className="mt-1 w-full resize-y rounded-md border border-[var(--border)] bg-[var(--bg-secondary)] px-3 py-2 text-[11px] text-slate-200 focus:border-red-500/40 focus:outline-none"
              />
            </label>
          </div>

          {formError && (
            <p className="mt-3 text-xs text-red-400">{formError}</p>
          )}

          <div className="mt-4 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex h-9 items-center justify-center gap-2 rounded-md bg-red-600 px-4 text-[11px] font-semibold text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving && <Loader2 size={14} className="animate-spin" />}
              {saving ? "Saving..." : editingId ? "Save Changes" : "Create Incident"}
            </button>
          </div>
        </form>
      )}

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

                      <th className="px-4 py-3 text-right text-[10px] font-semibold uppercase tracking-[0.1em] text-slate-400">
                        Actions
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
                              {incident.title || "Untitled Incident"}
                            </p>

                            <p className="mt-1 truncate font-mono text-[9px] text-slate-600">
                              {incident.id}
                            </p>
                          </div>
                        </td>

                        <td className="px-4 py-4">
                          <span className="text-xs capitalize text-slate-400">
                            {incident.type || "Unknown"}
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
                                incident.created_at
                              )}
                            </span>
                          </div>
                        </td>

                        <td className="px-4 py-4">
                          <div className="flex justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={() => openEditForm(incident)}
                              className="inline-flex h-7 items-center gap-1 rounded-md border border-[var(--border)] px-2 text-[10px] text-slate-400 transition hover:border-cyan-500/30 hover:text-cyan-300"
                              aria-label={`Edit ${incident.title}`}
                            >
                              <Pencil size={12} />
                              Edit
                            </button>

                            <button
                              type="button"
                              onClick={() => void handleDelete(incident)}
                              disabled={deletingId === incident.id}
                              className="inline-flex h-7 items-center gap-1 rounded-md border border-red-500/20 px-2 text-[10px] text-red-400 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50"
                              aria-label={`Delete ${incident.title}`}
                            >
                              {deletingId === incident.id ? (
                                <Loader2 size={12} className="animate-spin" />
                              ) : (
                                <Trash2 size={12} />
                              )}
                              Delete
                            </button>
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
