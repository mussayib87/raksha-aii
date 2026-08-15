import { useState } from "react";
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";

function App() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <Sidebar
        mobileOpen={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
      />

      <Header
        onMenuClick={() => setMobileSidebarOpen(true)}
      />

      <main className="min-h-screen pt-[68px] lg:pl-[248px]">
        <div className="p-4 lg:p-6">
          <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-panel)] p-6">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />

              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-400">
                System Online
              </span>
            </div>

            <h1 className="mt-4 text-2xl font-bold tracking-tight text-white">
              RAKSHA-AI
            </h1>

            <p className="mt-2 max-w-xl text-sm text-slate-400">
              AI-powered disaster response and emergency command center.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-md border border-[var(--border)] bg-black/10 p-4">
                <div className="text-[10px] uppercase tracking-wider text-slate-500">
                  System
                </div>
                <div className="mt-1 text-sm font-semibold text-emerald-400">
                  Operational
                </div>
              </div>

              <div className="rounded-md border border-[var(--border)] bg-black/10 p-4">
                <div className="text-[10px] uppercase tracking-wider text-slate-500">
                  Command Center
                </div>
                <div className="mt-1 text-sm font-semibold text-cyan-400">
                  New Delhi
                </div>
              </div>

              <div className="rounded-md border border-[var(--border)] bg-black/10 p-4">
                <div className="text-[10px] uppercase tracking-wider text-slate-500">
                  Connection
                </div>
                <div className="mt-1 text-sm font-semibold text-emerald-400">
                  Secure
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
