import { Bell } from "lucide-react";

export default function Alerts() {
  return (
    <div className="space-y-4 p-4 lg:p-6">
      {/* Page heading */}
      <section>
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-orange-400 shadow-[0_0_8px_rgba(249,115,22,0.8)]" />

          <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-orange-400">
            Alert Management
          </span>
        </div>

        <h1 className="mt-1 text-xl font-bold tracking-tight text-white">
          Alerts
        </h1>

        <p className="mt-1 text-[11px] text-slate-500">
          View and manage system and incident alerts
        </p>
      </section>

      {/* Filters */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-2">
        <input
          type="search"
          placeholder="Search alerts..."
          className="flex-1 h-9 rounded-md border border-[var(--border)] bg-[var(--bg-secondary)] px-3 text-[11px] text-slate-200 placeholder:text-slate-600 focus:border-orange-500/40 focus:outline-none"
        />
        <select className="h-9 rounded-md border border-[var(--border)] bg-[var(--bg-secondary)] px-3 text-[11px] text-slate-200 focus:border-orange-500/40 focus:outline-none cursor-pointer">
          <option value="">All Types</option>
          <option value="critical">Critical</option>
          <option value="warning">Warning</option>
          <option value="info">Info</option>
        </select>
      </div>

      {/* Empty state */}
      <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-panel)] p-12 text-center">
        <div className="flex justify-center mb-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-lg border border-orange-500/30 bg-orange-500/10">
            <Bell size={32} className="text-orange-400" strokeWidth={1.5} />
          </div>
        </div>
        <h2 className="text-lg font-semibold text-white mb-2">
          No Alerts
        </h2>
        <p className="text-slate-400 text-sm mb-4">
          Backend integration required to display alerts
        </p>
        <p className="text-slate-500 text-xs">
          System and incident alerts will appear here once connected to the backend
        </p>
      </div>

      {/* Alert stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="rounded-lg border border-red-500/20 bg-red-500/[0.07] p-4">
          <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-red-400 mb-3">
            Critical Alerts
          </div>
          <div className="text-2xl font-bold text-white">0</div>
          <p className="text-[10px] text-slate-500 mt-2">
            Requires immediate action
          </p>
        </div>

        <div className="rounded-lg border border-orange-500/20 bg-orange-500/[0.07] p-4">
          <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-orange-400 mb-3">
            Warning Alerts
          </div>
          <div className="text-2xl font-bold text-white">0</div>
          <p className="text-[10px] text-slate-500 mt-2">
            Connected to backend data
          </p>
        </div>

        <div className="rounded-lg border border-cyan-500/20 bg-cyan-500/[0.07] p-4">
          <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-cyan-400 mb-3">
            Info Alerts
          </div>
          <div className="text-2xl font-bold text-white">0</div>
          <p className="text-[10px] text-slate-500 mt-2">
            Connected to backend data
          </p>
        </div>
      </div>
    </div>
  );
}
