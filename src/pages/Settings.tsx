import { Settings as SettingsIcon, Bell, Lock, Users, Database } from "lucide-react";

export default function Settings() {
  return (
    <div className="space-y-4 p-4 lg:p-6">
      {/* Page heading */}
      <section>
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-slate-400 shadow-[0_0_8px_rgba(148,163,184,0.8)]" />

          <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-400">
            Configuration
          </span>
        </div>

        <h1 className="mt-1 text-xl font-bold tracking-tight text-white">
          Settings
        </h1>

        <p className="mt-1 text-[11px] text-slate-500">
          Manage application settings and preferences
        </p>
      </section>

      {/* Settings sections */}
      <div className="space-y-4 max-w-2xl">
        {/* General Settings */}
        <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-panel)] p-4">
          <div className="flex items-start gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-500/30 bg-slate-500/10 flex-shrink-0">
              <SettingsIcon size={18} className="text-slate-400" strokeWidth={1.5} />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-white">General Settings</h2>
              <p className="text-[10px] text-slate-500">System configuration and preferences</p>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-[10px] font-medium text-slate-300">System Name</label>
              <input
                type="text"
                value="RAKSHA-AI"
                disabled
                className="mt-1 w-full h-9 rounded-md border border-[var(--border)] bg-[var(--bg-secondary)] px-3 text-[11px] text-slate-200 disabled:opacity-50"
              />
            </div>

            <div>
              <label className="text-[10px] font-medium text-slate-300">Organization</label>
              <input
                type="text"
                value="Smart City Operations"
                disabled
                className="mt-1 w-full h-9 rounded-md border border-[var(--border)] bg-[var(--bg-secondary)] px-3 text-[11px] text-slate-200 disabled:opacity-50"
              />
            </div>

            <div>
              <label className="text-[10px] font-medium text-slate-300">Location</label>
              <input
                type="text"
                value="New Delhi"
                disabled
                className="mt-1 w-full h-9 rounded-md border border-[var(--border)] bg-[var(--bg-secondary)] px-3 text-[11px] text-slate-200 disabled:opacity-50"
              />
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-panel)] p-4">
          <div className="flex items-start gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-orange-500/30 bg-orange-500/10 flex-shrink-0">
              <Bell size={18} className="text-orange-400" strokeWidth={1.5} />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-white">Notifications</h2>
              <p className="text-[10px] text-slate-500">Configure alert and notification preferences</p>
            </div>
          </div>

          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" defaultChecked disabled className="rounded" />
              <span className="text-[11px] text-slate-300">Critical alerts</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" defaultChecked disabled className="rounded" />
              <span className="text-[11px] text-slate-300">Incident notifications</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" defaultChecked disabled className="rounded" />
              <span className="text-[11px] text-slate-300">Team updates</span>
            </label>
          </div>
        </div>

        {/* Security Settings */}
        <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-panel)] p-4">
          <div className="flex items-start gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-red-500/30 bg-red-500/10 flex-shrink-0">
              <Lock size={18} className="text-red-400" strokeWidth={1.5} />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-white">Security</h2>
              <p className="text-[10px] text-slate-500">Manage security and access control</p>
            </div>
          </div>

          <div className="space-y-3">
            <button className="w-full px-3 py-2 rounded text-[10px] font-semibold text-red-300 border border-red-500/20 bg-red-500/10 hover:bg-red-500/20 transition-colors disabled:opacity-50" disabled>
              Change Password
            </button>
            <button className="w-full px-3 py-2 rounded text-[10px] font-semibold text-red-300 border border-red-500/20 bg-red-500/10 hover:bg-red-500/20 transition-colors disabled:opacity-50" disabled>
              Two-Factor Authentication
            </button>
          </div>
        </div>

        {/* Team Management */}
        <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-panel)] p-4">
          <div className="flex items-start gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-cyan-500/30 bg-cyan-500/10 flex-shrink-0">
              <Users size={18} className="text-cyan-400" strokeWidth={1.5} />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-white">Team Management</h2>
              <p className="text-[10px] text-slate-500">Manage users and team members</p>
            </div>
          </div>

          <button className="w-full px-3 py-2 rounded text-[10px] font-semibold text-cyan-300 border border-cyan-500/20 bg-cyan-500/10 hover:bg-cyan-500/20 transition-colors disabled:opacity-50" disabled>
            Manage Users
          </button>
        </div>

        {/* Data Management */}
        <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-panel)] p-4">
          <div className="flex items-start gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-purple-500/30 bg-purple-500/10 flex-shrink-0">
              <Database size={18} className="text-purple-400" strokeWidth={1.5} />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-white">Data Management</h2>
              <p className="text-[10px] text-slate-500">Manage data and exports</p>
            </div>
          </div>

          <div className="space-y-3">
            <button className="w-full px-3 py-2 rounded text-[10px] font-semibold text-purple-300 border border-purple-500/20 bg-purple-500/10 hover:bg-purple-500/20 transition-colors disabled:opacity-50" disabled>
              Export Data
            </button>
            <button className="w-full px-3 py-2 rounded text-[10px] font-semibold text-purple-300 border border-purple-500/20 bg-purple-500/10 hover:bg-purple-500/20 transition-colors disabled:opacity-50" disabled>
              Backup Settings
            </button>
          </div>
        </div>
      </div>

      <p className="text-xs text-slate-500 mt-4">
        Most settings require backend integration to save changes.
      </p>
    </div>
  );
}
