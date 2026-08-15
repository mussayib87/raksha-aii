import { FileText } from "lucide-react";

export default function Reports() {
  return (
    <div className="space-y-4 p-4 lg:p-6">
      {/* Page heading */}
      <section>
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />

          <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-blue-400">
            Documentation
          </span>
        </div>

        <h1 className="mt-1 text-xl font-bold tracking-tight text-white">
          Reports
        </h1>

        <p className="mt-1 text-[11px] text-slate-500">
          Generate and view incident and operational reports
        </p>
      </section>

      {/* Filters */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-2">
        <input
          type="search"
          placeholder="Search reports..."
          className="flex-1 h-9 rounded-md border border-[var(--border)] bg-[var(--bg-secondary)] px-3 text-[11px] text-slate-200 placeholder:text-slate-600 focus:border-blue-500/40 focus:outline-none"
        />
        <select className="h-9 rounded-md border border-[var(--border)] bg-[var(--bg-secondary)] px-3 text-[11px] text-slate-200 focus:border-blue-500/40 focus:outline-none cursor-pointer">
          <option value="">All Report Types</option>
          <option value="incident">Incident Report</option>
          <option value="daily">Daily Summary</option>
          <option value="response">Response Analysis</option>
          <option value="resource">Resource Usage</option>
        </select>
      </div>

      {/* Empty state */}
      <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-panel)] p-12 text-center">
        <div className="flex justify-center mb-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-lg border border-blue-500/30 bg-blue-500/10">
            <FileText size={32} className="text-blue-400" strokeWidth={1.5} />
          </div>
        </div>
        <h2 className="text-lg font-semibold text-white mb-2">
          No Reports
        </h2>
        <p className="text-slate-400 text-sm mb-4">
          Backend integration required to generate reports
        </p>
        <p className="text-slate-500 text-xs">
          Reports will appear here once connected to the backend
        </p>
      </div>

      {/* Report templates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-panel)] p-4 cursor-pointer hover:bg-[var(--bg-panel-hover)] transition-colors">
          <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-500 mb-3">
            Incident Report Template
          </div>
          <p className="text-xs text-slate-400 mb-3">
            Comprehensive incident documentation and analysis
          </p>
          <button className="w-full px-3 py-2 rounded text-[10px] font-semibold text-blue-300 border border-blue-500/20 bg-blue-500/10 hover:bg-blue-500/20 transition-colors">
            Create Report
          </button>
        </div>

        <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-panel)] p-4 cursor-pointer hover:bg-[var(--bg-panel-hover)] transition-colors">
          <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-500 mb-3">
            Daily Summary Template
          </div>
          <p className="text-xs text-slate-400 mb-3">
            Daily operational summary and statistics
          </p>
          <button className="w-full px-3 py-2 rounded text-[10px] font-semibold text-blue-300 border border-blue-500/20 bg-blue-500/10 hover:bg-blue-500/20 transition-colors">
            Create Report
          </button>
        </div>
      </div>
    </div>
  );
}
