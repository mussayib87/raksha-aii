import { useState } from "react";
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import KPICards from "./components/dashboard/KPICards";

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
        <div className="space-y-4 p-4 lg:p-6">

          {/* Page heading */}
          <section>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />

              <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-emerald-400">
                Live Operations
              </span>
            </div>

            <h1 className="mt-1 text-xl font-bold tracking-tight text-white">
              Emergency Command Center
            </h1>

            <p className="mt-1 text-[11px] text-slate-500">
              Real-time disaster response monitoring and coordination
            </p>
          </section>

          {/* KPI overview */}
          <KPICards />

        </div>
      </main>
    </div>
  );
}

export default App;
