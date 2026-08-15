import { Users } from "lucide-react";

export default function Responders() {
  return (
    <div className="space-y-4 p-4 lg:p-6">
      {/* Page heading */}
      <section>
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />

          <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-cyan-400">
            Team Management
          </span>
        </div>

        <h1 className="mt-1 text-xl font-bold tracking-tight text-white">
          Responders
        </h1>

        <p className="mt-1 text-[11px] text-slate-500">
          Manage emergency response teams and personnel
        </p>
      </section>

      {/* Filters */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-2">
        <input
          type="search"
          placeholder="Search responders..."
          className="flex-1 h-9 rounded-md border border-[var(--border)] bg-[var(--bg-secondary)] px-3 text-[11px] text-slate-200 placeholder:text-slate-600 focus:border-cyan-500/40 focus:outline-none"
        />
        <select className="h-9 rounded-md border border-[var(--border)] bg-[var(--bg-secondary)] px-3 text-[11px] text-slate-200 focus:border-cyan-500/40 focus:outline-none cursor-pointer">
          <option value="">All Teams</option>
          <option value="fire">Fire Department</option>
          <option value="police">Police</option>
          <option value="medical">Medical</option>
          <option value="search">Search & Rescue</option>
        </select>
      </div>

      {/* Empty state */}
      <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-panel)] p-12 text-center">
        <div className="flex justify-center mb-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-lg border border-cyan-500/30 bg-cyan-500/10">
            <Users size={32} className="text-cyan-400" strokeWidth={1.5} />
          </div>
        </div>
        <h2 className="text-lg font-semibold text-white mb-2">
          No Responders
        </h2>
        <p className="text-slate-400 text-sm mb-4">
          Backend integration required to display responder data
        </p>
        <p className="text-slate-500 text-xs">
          Responder information will appear here once connected to the backend
        </p>
      </div>

      {/* Stats section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-panel)] p-4">
          <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-500 mb-3">
            Total Responders
          </div>
          <div className="text-2xl font-bold text-white">0</div>
          <p className="text-[10px] text-slate-500 mt-2">
            Connected to backend data
          </p>
        </div>

        <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-panel)] p-4">
          <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-500 mb-3">
            On Duty
          </div>
          <div className="text-2xl font-bold text-white">0</div>
          <p className="text-[10px] text-slate-500 mt-2">
            Connected to backend data
          </p>
        </div>

        <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-panel)] p-4">
          <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-500 mb-3">
            Available
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
