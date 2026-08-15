import {
  AlertTriangle,
  Bell,
  ChevronDown,
  Menu,
  Search,
  Shield,
  X,
} from "lucide-react";
import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  onMenuClick: () => void;
}

interface SearchItem {
  title: string;
  path: string;
  category: string;
  description: string;
  keywords: string[];
}

const searchIndex: SearchItem[] = [
  {
    title: "Dashboard",
    path: "/dashboard",
    category: "Overview",
    description: "Emergency command center overview",
    keywords: ["overview", "operations", "command center", "status", "live"],
  },
  {
    title: "Live Map",
    path: "/live-map",
    category: "Situational awareness",
    description: "Real-time incident and responder locations",
    keywords: ["map", "location", "coverage", "responders", "incidents"],
  },
  {
    title: "Incidents",
    path: "/incidents",
    category: "Operations",
    description: "Track and manage emergency incidents",
    keywords: ["incident", "alerts", "critical", "high priority", "fire", "flood"],
  },
  {
    title: "AI Analytics",
    path: "/ai-analytics",
    category: "Intelligence",
    description: "Predictive insights and operational analytics",
    keywords: ["ai", "analytics", "prediction", "risk", "forecast"],
  },
  {
    title: "Responders",
    path: "/responders",
    category: "Team management",
    description: "Responder readiness and deployment status",
    keywords: ["rescue team", "teams", "personnel", "deployment", "units"],
  },
  {
    title: "Resources",
    path: "/resources",
    category: "Logistics",
    description: "Inventory, equipment, and resource allocation",
    keywords: ["resources", "supplies", "equipment", "materials", "inventory"],
  },
  {
    title: "Alerts",
    path: "/alerts",
    category: "Notifications",
    description: "Operational alerts and priority updates",
    keywords: ["alert", "warning", "urgent", "monitoring", "notifications"],
  },
  {
    title: "Reports",
    path: "/reports",
    category: "Documentation",
    description: "After-action and operational reports",
    keywords: ["report", "summary", "incident report", "analytics"],
  },
  {
    title: "Messages",
    path: "/messages",
    category: "Communication",
    description: "Team communication and coordination logs",
    keywords: ["messages", "chat", "teams", "communication", "dispatch"],
  },
  {
    title: "Settings",
    path: "/settings",
    category: "Administration",
    description: "System configuration and operator preferences",
    keywords: ["settings", "preferences", "security", "administration", "config"],
  },
];

export default function Header({ onMenuClick }: HeaderProps) {
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement | null>(null);
  const notificationRef = useRef<HTMLDivElement | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [selectedResultIndex, setSelectedResultIndex] = useState(0);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const filteredResults = searchQuery.trim()
    ? searchIndex.filter((item) => {
        const searchText = [
          item.title,
          item.category,
          item.description,
          ...item.keywords,
        ]
          .join(" ")
          .toLowerCase();

        return searchText.includes(searchQuery.trim().toLowerCase());
      })
    : [];

  useEffect(() => {
    setSelectedResultIndex(filteredResults.length > 0 ? 0 : -1);
  }, [filteredResults]);

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchOpen(false);
      }

      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setNotificationsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSearchOpen(false);
        setNotificationsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleDocumentClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleSearchSubmit = (event?: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    const nextResult =
      filteredResults[selectedResultIndex] ?? filteredResults[0] ?? null;

    if (nextResult) {
      navigate(nextResult.path);
      setSearchOpen(false);
      setSearchQuery("");
      return;
    }

    setSearchOpen(true);
  };

  const handleResultSelect = (path: string) => {
    navigate(path);
    setSearchOpen(false);
    setSearchQuery("");
  };

  const handleSearchKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown" && filteredResults.length > 0) {
      event.preventDefault();
      setSelectedResultIndex((current) =>
        current >= filteredResults.length - 1 ? 0 : current + 1
      );
    }

    if (event.key === "ArrowUp" && filteredResults.length > 0) {
      event.preventDefault();
      setSelectedResultIndex((current) =>
        current <= 0 ? filteredResults.length - 1 : current - 1
      );
    }

    if (event.key === "Enter") {
      event.preventDefault();
      handleSearchSubmit();
    }

    if (event.key === "Escape") {
      setSearchOpen(false);
    }
  };

  const notifications: Array<{
    title: string;
    details: string;
    time: string;
    severity: "low" | "medium" | "critical";
  }> = [];

  return (
    <header className="fixed right-0 top-0 z-30 flex h-[68px] left-0 items-center border-b border-[var(--border)] bg-[var(--bg-primary)]/95 px-4 backdrop-blur-md lg:left-[248px] lg:px-6">
      <div className="flex w-full items-center gap-4">
        {/* Mobile menu */}
        <button
          onClick={onMenuClick}
          className="rounded-md border border-[var(--border)] p-2 text-slate-400 hover:bg-white/5 hover:text-white lg:hidden"
          aria-label="Open navigation"
        >
          <Menu size={18} />
        </button>

        {/* Location / status */}
        <div className="hidden min-w-[250px] items-center gap-3 xl:flex">
          <div className="flex h-8 w-8 items-center justify-center rounded-md border border-cyan-500/20 bg-cyan-500/5">
            <Shield size={15} className="text-cyan-400" />
          </div>

          <div>
            <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-200">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_7px_rgba(52,211,153,0.8)]" />
              LIVE COMMAND CENTER
            </div>

            <div className="mt-0.5 text-[9px] text-slate-500">
              Smart City Operations • New Delhi
            </div>
          </div>
        </div>

        {/* Search */}
        <div ref={searchRef} className="relative mx-auto w-full max-w-[430px]">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600"
            />

            <input
              type="search"
              value={searchQuery}
              onChange={(event) => {
                setSearchQuery(event.target.value);
                setSearchOpen(true);
              }}
              onFocus={() => setSearchOpen(true)}
              onKeyDown={handleSearchKeyDown}
              placeholder="Search incidents, responders, resources..."
              aria-label="Search command center"
              aria-expanded={searchOpen}
              aria-controls="header-search-results"
              className="h-9 w-full rounded-md border border-[var(--border)] bg-[var(--bg-secondary)] pl-9 pr-4 text-[11px] text-slate-200 placeholder:text-slate-600 focus:border-cyan-500/40 focus:outline-none"
            />
          </form>

          {searchOpen && (
            <div
              id="header-search-results"
              role="listbox"
              aria-label="Search results"
              className="absolute left-0 right-0 top-[calc(100%+8px)] overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)] shadow-2xl shadow-slate-950/50"
            >
              {filteredResults.length > 0 ? (
                <div className="max-h-[300px] overflow-y-auto p-1">
                  {filteredResults.map((result, index) => (
                    <button
                      key={result.path}
                      type="button"
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={() => handleResultSelect(result.path)}
                      role="option"
                      aria-selected={selectedResultIndex === index}
                      className={`flex w-full items-start gap-3 rounded-md px-3 py-2.5 text-left transition-colors ${
                        selectedResultIndex === index
                          ? "bg-cyan-500/10 text-white"
                          : "text-slate-300 hover:bg-white/5"
                      }`}
                    >
                      <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-md border border-[var(--border)] bg-[var(--bg-primary)] text-[10px] font-semibold text-cyan-300">
                        {result.title.slice(0, 2).toUpperCase()}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="truncate text-[11px] font-medium text-white">
                            {result.title}
                          </span>
                          <span className="text-[9px] uppercase tracking-[0.12em] text-slate-500">
                            {result.category}
                          </span>
                        </div>
                        <p className="mt-0.5 text-[10px] text-slate-400">
                          {result.description}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              ) : searchQuery.trim() ? (
                <div className="p-4 text-center">
                  <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 bg-slate-900/70 text-slate-400">
                    <Search size={16} />
                  </div>
                  <p className="text-sm font-medium text-white">No results found</p>
                  <p className="mt-1 text-[10px] text-slate-500">
                    Try a different keyword or page name.
                  </p>
                </div>
              ) : null}
            </div>
          )}
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          <div ref={notificationRef} className="relative">
            <button
              type="button"
              onClick={() => setNotificationsOpen((open) => !open)}
              className="relative rounded-md border border-[var(--border)] p-2 text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
              aria-label="Notifications"
              aria-haspopup="dialog"
              aria-expanded={notificationsOpen}
              aria-controls="notification-panel"
            >
              <Bell size={16} />

              {notifications.length > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[8px] font-bold text-white">
                  {notifications.length}
                </span>
              )}
            </button>

            {notificationsOpen && (
              <div
                id="notification-panel"
                role="dialog"
                aria-label="Notifications panel"
                className="absolute right-0 top-[calc(100%+8px)] z-50 w-[320px] overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)] shadow-2xl shadow-slate-950/60"
              >
                <div className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--bg-primary)] px-3 py-2.5">
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                      Operations Feed
                    </div>
                    <div className="text-[11px] font-medium text-white">
                      Notifications
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setNotificationsOpen(false)}
                    className="rounded-md p-1 text-slate-400 hover:bg-white/5 hover:text-white"
                    aria-label="Close notifications"
                  >
                    <X size={14} />
                  </button>
                </div>

                {notifications.length > 0 ? (
                  <div className="max-h-[320px] overflow-y-auto p-2">
                    {notifications.map((notification) => (
                      <div
                        key={notification.title + notification.time}
                        className="rounded-md border border-[var(--border)] bg-[var(--bg-primary)] p-3"
                      >
                        <div className="flex items-start gap-2">
                          <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-md border border-slate-700 bg-slate-900/75 text-slate-300">
                            {notification.severity === "critical" ? (
                              <AlertTriangle size={12} className="text-red-400" />
                            ) : (
                              <Bell size={12} className="text-cyan-300" />
                            )}
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-2">
                              <p className="truncate text-[11px] font-medium text-white">
                                {notification.title}
                              </p>
                              <span className="text-[9px] uppercase tracking-[0.1em] text-slate-500">
                                {notification.time}
                              </span>
                            </div>
                            <p className="mt-1 text-[10px] text-slate-400">
                              {notification.details}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-5 text-center">
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-slate-700 bg-slate-900/80 text-slate-400">
                      <Bell size={18} />
                    </div>
                    <p className="text-sm font-semibold text-white">
                      No active notifications
                    </p>
                    <p className="mt-1 text-[10px] leading-5 text-slate-500">
                      This frontend preview has no live notification feed connected.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="hidden h-7 w-px bg-[var(--border)] sm:block" />

          <button className="flex items-center gap-2 rounded-md px-1.5 py-1.5 hover:bg-white/5">
            <div className="flex h-7 w-7 items-center justify-center rounded-full border border-cyan-500/30 bg-cyan-500/10 text-[10px] font-bold text-cyan-300">
              AD
            </div>

            <div className="hidden text-left sm:block">
              <div className="text-[10px] font-semibold text-slate-200">
                Admin
              </div>
              <div className="text-[8px] text-slate-600">
                Super Admin
              </div>
            </div>

            <ChevronDown
              size={13}
              className="hidden text-slate-600 sm:block"
            />
          </button>
        </div>
      </div>
    </header>
  );
}
