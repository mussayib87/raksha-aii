import {
  Activity,
  AlertTriangle,
  Bell,
  Bot,
  FileText,
  LayoutDashboard,
  Map,
  MessageSquare,
  Package,
  Settings,
  Shield,
  Users,
  X,
  Phone,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface SidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
}

interface NavItem {
  label: string;
  icon: typeof Activity;
  path: string;
  isActive?: (currentPath: string) => boolean;
}

const navigation: NavItem[] = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/",
    isActive: (path) => path === "/" || path === "/dashboard",
  },
  { label: "Live Map", icon: Map, path: "/live-map" },
  { label: "Incidents", icon: AlertTriangle, path: "/incidents" },
  { label: "AI Analytics", icon: Bot, path: "/ai-analytics" },
  { label: "Responders", icon: Users, path: "/responders" },
  { label: "Resources", icon: Package, path: "/resources" },
  { label: "Alerts", icon: Bell, path: "/alerts" },
  { label: "Reports", icon: FileText, path: "/reports" },
  { label: "Messages", icon: MessageSquare, path: "/messages" },
  { label: "Settings", icon: Settings, path: "/settings" },
];

export default function Sidebar({
  mobileOpen,
  onClose,
}: SidebarProps) {
  const location = useLocation();

  const isNavItemActive = (item: NavItem): boolean => {
    if (item.isActive) {
      return item.isActive(location.pathname);
    }
    return location.pathname === item.path;
  };

  return (
    <>
      {mobileOpen && (
        <button
          aria-label="Close navigation"
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[248px] flex-col border-r border-[var(--border)] bg-[var(--bg-secondary)] transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Brand */}
        <div className="flex h-[68px] items-center justify-between border-b border-[var(--border)] px-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-500/30 bg-red-500/10">
              <Shield
                size={20}
                className="text-red-400"
                strokeWidth={2.2}
              />
            </div>

            <div>
              <div className="text-sm font-bold tracking-[0.18em] text-white">
                RAKSHA-AI
              </div>
              <div className="mt-0.5 text-[9px] font-medium tracking-[0.12em] text-slate-500">
                DISASTER RESPONSE
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-md p-1.5 text-slate-500 hover:bg-white/5 hover:text-white lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <div className="mb-3 px-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-600">
            Command Center
          </div>

          <div className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = isNavItemActive(item);

              return (
                <Link
                  key={item.label}
                  to={item.path}
                  onClick={onClose}
                  className={`group flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-[12px] font-medium transition-all ${
                    isActive
                      ? "border border-red-500/15 bg-red-500/10 text-red-300"
                      : "border border-transparent text-slate-400 hover:bg-white/[0.035] hover:text-slate-100"
                  }`}
                >
                  <Icon
                    size={16}
                    strokeWidth={1.8}
                    className={
                      isActive
                        ? "text-red-400"
                        : "text-slate-500 group-hover:text-slate-300"
                    }
                  />

                  <span>{item.label}</span>

                  {item.label === "Alerts" && (
                    <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500/15 px-1.5 text-[9px] font-bold text-red-400">
                      8
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Emergency Hotline */}
        <div className="border-t border-[var(--border)] p-3">
          <div className="rounded-lg border border-red-500/20 bg-red-500/[0.045] p-3">
            <div className="flex items-center gap-2">
              <Phone size={14} className="text-red-400" />

              <span className="text-[9px] font-semibold uppercase tracking-[0.15em] text-red-300">
                Emergency Hotline
              </span>
            </div>

            <div className="mt-2 text-2xl font-bold tracking-tight text-white">
              112
            </div>

            <button className="mt-2 w-full rounded-md border border-red-500/20 bg-red-500/10 py-1.5 text-[10px] font-semibold text-red-300 transition-colors hover:bg-red-500/20">
              Emergency Contact
            </button>
          </div>

          {/* System Status */}
          <div className="mt-2 flex items-center gap-2 px-2 py-2">
            <Activity size={13} className="text-emerald-400" />

            <div className="flex-1">
              <div className="text-[9px] font-semibold uppercase tracking-wider text-slate-500">
                System Status
              </div>
              <div className="text-[10px] text-emerald-400">
                All Systems Operational
              </div>
            </div>

            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
          </div>
        </div>
      </aside>
    </>
  );
}

