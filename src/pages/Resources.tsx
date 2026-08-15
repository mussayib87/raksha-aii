import { Package } from "lucide-react";

export default function Resources() {
  return (
    <div className="space-y-4 p-4 lg:p-6">
      {/* Page heading */}
      <section>
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />

          <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-emerald-400">
            Asset Management
          </span>
        </div>

        <h1 className="mt-1 text-xl font-bold tracking-tight text-white">
          Resources
        </h1>

        <p className="mt-1 text-[11px] text-slate-500">
          Track and manage emergency response resources
        </p>
      </section>

      {/* Filters */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-2">
        <input
          type="search"
          placeholder="Search resources..."
          className="flex-1 h-9 rounded-md border border-[var(--border)] bg-[var(--bg-secondary)] px-3 text-[11px] text-slate-200 placeholder:text-slate-600 focus:border-emerald-500/40 focus:outline-none"
        />
        <select className="h-9 rounded-md border border-[var(--border)] bg-[var(--bg-secondary)] px-3 text-[11px] text-slate-200 focus:border-emerald-500/40 focus:outline-none cursor-pointer">
          <option value="">All Categories</option>
          <option value="vehicle">Vehicles</option>
          <option value="equipment">Equipment</option>
          <option value="supplies">Medical Supplies</option>
          <option value="facility">Facilities</option>
        </select>
      </div>

      {/* Empty state */}
      <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-panel)] p-12 text-center">
        <div className="flex justify-center mb-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-lg border border-emerald-500/30 bg-emerald-500/10">
            <Package size={32} className="text-emerald-400" strokeWidth={1.5} />
          </div>
        </div>
        <h2 className="text-lg font-semibold text-white mb-2">
          No Resources
        </h2>
        <p className="text-slate-400 text-sm mb-4">
          Backend integration required to display resources
        </p>
        <p className="text-slate-500 text-xs">
          Resources and assets will appear here once connected to the backend
        </p>
      </div>

      {/* Resource categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-panel)] p-4">
          <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-500 mb-3">
            Vehicles
          </div>
          <div className="text-2xl font-bold text-white">0</div>
          <p className="text-[10px] text-slate-500 mt-2">
            Connected to backend data
          </p>
        </div>

        <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-panel)] p-4">
          <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-500 mb-3">
            Equipment
          </div>
          <div className="text-2xl font-bold text-white">0</div>
          <p className="text-[10px] text-slate-500 mt-2">
            Connected to backend data
          </p>
        </div>

        <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-panel)] p-4">
          <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-500 mb-3">
            Medical Supplies
          </div>
          <div className="text-2xl font-bold text-white">0</div>
          <p className="text-[10px] text-slate-500 mt-2">
            Connected to backend data
          </p>
        </div>

        <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-panel)] p-4">
          <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-500 mb-3">
            Facilities
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
