import { AlertTriangle, Loader2, Map } from "lucide-react";
import { useEffect, useState } from "react";
import {
  fetchIncidents,
  getIncidentMapPosition,
  isActiveIncident,
  type Incident,
} from "../lib/incidents";

export default function LiveMap() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void fetchIncidents()
      .then(setIncidents)
      .catch((loadError: unknown) => {
        setError(
          loadError instanceof Error
            ? loadError.message
            : "Unable to load incident locations."
        );
      })
      .finally(() => setLoading(false));
  }, []);

  const locatedIncidents = incidents.filter(
    (incident) => incident.latitude !== null && incident.longitude !== null
  );

  return (
    <div className="space-y-4 p-4 lg:p-6">
      {/* Page heading */}
      <section>
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />

          <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-cyan-400">
            Situational Awareness
          </span>
        </div>

        <h1 className="mt-1 text-xl font-bold tracking-tight text-white">
          Live Map
        </h1>

        <p className="mt-1 text-[11px] text-slate-500">
          Real-time incident and responder locations
        </p>
      </section>

      {/* Map container */}
      <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-panel)] overflow-hidden">
        <div className="relative aspect-video w-full overflow-hidden bg-gradient-to-br from-[var(--bg-panel)] to-[var(--bg-secondary)]">
          <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "linear-gradient(rgba(148,163,184,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.12) 1px, transparent 1px)", backgroundSize: "42px 42px" }} />
          {locatedIncidents.map((incident, index) => {
            const position = getIncidentMapPosition(incident, locatedIncidents);
            const isCritical = incident.severity.trim().toLowerCase() === "critical";

            return (
              <div key={incident.id} className="absolute" style={position} title={`${incident.title} (${incident.latitude}, ${incident.longitude})`}>
                {index === 0 && <div className="absolute -inset-3 animate-ping rounded-full bg-red-500/10" />}
                <div className={`relative flex h-7 w-7 items-center justify-center rounded-full border ${isCritical ? "border-red-400/40 bg-red-500/15" : "border-orange-400/40 bg-orange-500/10"}`}>
                  <AlertTriangle size={13} className={isCritical ? "text-red-400" : "text-orange-400"} />
                </div>
              </div>
            );
          })}
          <div className="absolute inset-0 flex items-center justify-center">
            {loading ? <Loader2 size={28} className="animate-spin text-cyan-400" /> : locatedIncidents.length === 0 && <div className="text-center"><Map size={32} className="mx-auto mb-3 text-cyan-400" strokeWidth={1.5} /><p className="text-sm font-medium text-slate-400">No incident coordinates available</p></div>}
          </div>
          {error && <p className="absolute bottom-3 left-3 right-3 rounded-md border border-red-500/20 bg-black/60 px-3 py-2 text-xs text-red-300">{error}</p>}
        </div>
      </div>

      {/* Additional controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-panel)] p-4">
          <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-500 mb-3">
            Active Incidents
          </div>
          <div className="text-2xl font-bold text-white">{incidents.filter(isActiveIncident).length}</div>
          <p className="text-[10px] text-slate-500 mt-2">
            Connected to backend data
          </p>
        </div>

        <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-panel)] p-4">
          <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-500 mb-3">
            Active Responders
          </div>
          <div className="text-2xl font-bold text-white">0</div>
          <p className="text-[10px] text-slate-500 mt-2">
            Connected to backend data
          </p>
        </div>

        <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-panel)] p-4">
          <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-500 mb-3">
            Coverage Area
          </div>
          <div className="text-2xl font-bold text-white">0 km²</div>
          <p className="text-[10px] text-slate-500 mt-2">
            Connected to backend data
          </p>
        </div>
      </div>
    </div>
  );
}
