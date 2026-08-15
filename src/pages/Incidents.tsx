import { AlertTriangle } from "lucide-react";

export default function Incidents() {
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

        <h1 className="mt-1 text-xl font-bold tracking-tight text-white">
          Incidents
        </h1>

        <p className="mt-1 text-[11px] text-slate-500">
          Manage and track emergency incidents
        </p>
      </section>

      {/* Filters */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-2">
        <input
          type="search"
          placeholder="Search incidents..."
          className="flex-1 h-9 rounded-md border border-[var(--border)] bg-[var(--bg-secondary)] px-3 text-[11px] text-slate-200 placeholder:text-slate-600 focus:border-red-500/40 focus:outline-none"
        />
        <select className="h-9 rounded-md border border-[var(--border)] bg-[var(--bg-secondary)] px-3 text-[11px] text-slate-200 focus:border-red-500/40 focus:outline-none cursor-pointer">
          <option value="">All Severities</option>
          <option value="critical">Critical</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>

      {/* Empty state */}
      <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-panel)] p-12 text-center">
        <div className="flex justify-center mb-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-lg border border-red-500/30 bg-red-500/10">
            <AlertTriangle size={32} className="text-red-400" strokeWidth={1.5} />
          </div>
        </div>
        <h2 className="text-lg font-semibold text-white mb-2">
          No Incidents
        </h2>
        <p className="text-slate-400 text-sm mb-4">
          Backend integration required to display incidents
        </p>
        <p className="text-slate-500 text-xs">
          Incidents will appear here once connected to the backend data source
        </p>
      </div>

      {/* Table structure for future data */}
      <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-panel)] overflow-hidden">
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
            <tr className="text-center py-8">
              <td colSpan={5} className="py-8 text-slate-500 text-xs">
                Data will load from backend
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
