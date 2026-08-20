import { useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AuthGate from "./components/auth/AuthGate";
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import Dashboard from "./pages/Dashboard";
import LiveMap from "./pages/LiveMap";
import Incidents from "./pages/Incidents";
import AIAnalytics from "./pages/AIAnalytics";
import Responders from "./pages/Responders";
import Resources from "./pages/Resources";
import Alerts from "./pages/Alerts";
import Reports from "./pages/Reports";
import Messages from "./pages/Messages";
import Settings from "./pages/Settings";

function AppContent({ session }: { session: Session }) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <Sidebar
        mobileOpen={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
      />

      <Header
        onMenuClick={() => setMobileSidebarOpen(true)}
        session={session}
      />

      <main className="min-h-screen pt-[68px] lg:pl-[248px]">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/live-map" element={<LiveMap />} />
          <Route path="/incidents" element={<Incidents />} />
          <Route path="/ai-analytics" element={<AIAnalytics />} />
          <Route path="/responders" element={<Responders />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthGate>
        {(session) => <AppContent session={session} />}
      </AuthGate>
    </Router>
  );
}

export default App;
