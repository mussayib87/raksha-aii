import { Map } from "lucide-react";

export default function LiveMap() {
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
        <div className="aspect-video w-full flex items-center justify-center bg-gradient-to-br from-[var(--bg-panel)] to-[var(--bg-secondary)]">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-lg border border-cyan-500/30 bg-cyan-500/10">
                <Map size={32} className="text-cyan-400" strokeWidth={1.5} />
              </div>
            </div>
            <p className="text-slate-400 text-sm font-medium">
              Map interface ready for real-time data
            </p>
            <p className="text-slate-500 text-xs mt-2">
              Backend integration required to display incidents and responders
            </p>
          </div>
        </div>
      </div>

      {/* Additional controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-panel)] p-4">
          <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-500 mb-3">
            Active Incidents
          </div>
          <div className="text-2xl font-bold text-white">0</div>
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
