
import {
  AlertTriangle,
  Bell,
  Bot,
  ChevronDown,
  Menu,
  Search,
  Shield,
  X,
} from "lucide-react";
import type { Session } from "@supabase/supabase-js";
import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

interface HeaderProps {
  onMenuClick: () => void;
  session: Session;
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
    title: "Command Center",
    path: "/dashboard",
    category: "Operations",
    description: "Live disaster command center overview",
    keywords: ["dashboard", "overview", "operations", "command", "live"],
  },
  {
    title: "Live Operations",
    path: "/live-map",
    category: "Situational Awareness",
    description: "Real-time incidents, responders and risk zones",
    keywords: ["map", "location", "responders", "incidents", "risk"],
  },
  {
    title: "Incidents",
    path: "/incidents",
    category: "Operations",
    description: "Track and manage emergency incidents",
    keywords: [
      "incident",
      "critical",
      "high priority",
      "fire",
      "flood",
      "emergency",
    ],
  },
  {
    title: "AI Intelligence",
    path: "/ai-analytics",
    category: "Intelligence",
    description: "Risk prediction and disaster intelligence",
    keywords: [
      "ai",
      "analytics",
      "prediction",
      "risk",
      "forecast",
      "intelligence",
    ],
  },
  {
    title: "AI Recommendations",
    path: "/recommendations",
    category: "Decision Intelligence",
    description: "AI-generated response recommendations",
    keywords: [
      "recommendations",
      "decision",
      "deployment",
      "priority",
      "actions",
      "ai",
    ],
  },
  {
    title: "RAKSHA Copilot",
    path: "/copilot",
    category: "AI Assistant",
    description: "Ask RAKSHA about incidents, risks and operations",
    keywords: [
      "copilot",
      "assistant",
      "chat",
      "ask",
      "ai",
      "help",
    ],
  },
  {
    title: "Responders",
    path: "/responders",
    category: "Response Operations",
    description: "Responder readiness and deployment status",
    keywords: [
      "responders",
      "rescue",
      "teams",
      "personnel",
      "deployment",
      "units",
    ],
  },
  {
    title: "Resources",
    path: "/resources",
    category: "Logistics",
    description: "Inventory, equipment and resource allocation",
    keywords: [
      "resources",
      "supplies",
      "equipment",
      "inventory",
      "boats",
      "ambulance",
    ],
  },
  {
    title: "Alerts",
    path: "/alerts",
    category: "Notifications",
    description: "Critical warnings and operational alerts",
    keywords: ["alerts", "warning", "urgent", "notifications", "critical"],
  },
  {
    title: "Simulation",
    path: "/simulation",
    category: "Decision Intelligence",
    description: "Simulate disaster scenarios and projected impact",
    keywords: [
      "simulation",
      "scenario",
      "what if",
      "forecast",
      "impact",
      "prediction",
    ],
  },
  {
    title: "Reports",
    path: "/reports",
    category: "Documentation",
    description: "Operational and after-action reports",
    keywords: ["reports", "summary", "incident report", "documentation"],
  },
  {
    title: "Messages",
    path: "/messages",
    category: "Communication",
    description: "Emergency team communication and coordination",
    keywords: ["messages", "chat", "communication", "dispatch", "teams"],
  },
  {
    title: "Settings",
    path: "/settings",
    category: "Administration",
    description: "System configuration and security",
    keywords: ["settings", "security", "administration", "configuration"],
  },
];

export default function Header({ onMenuClick, session }: HeaderProps) {
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
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
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
    } else {
      setSearchOpen(true);
    }
  };

  const handleResultSelect = (path: string) => {
    navigate(path);
    setSearchOpen(false);
    setSearchQuery("");
  };

  const handleSearchKeyDown = (
    event: ReactKeyboardEvent<HTMLInputElement>
  ) => {
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

  /*
   * Temporary frontend notification data.
   *
   * Later this should come from Supabase Realtime.
   */
  const notifications: Array<{
    title: string;
    details: string;
    time: string;
    severity: "low" | "medium" | "critical";
  }> = [
    {
      title: "Flood risk increased",
      details:
        "Zone F04 has entered a high-risk state. AI assessment requires review.",
      time: "2m",
      severity: "critical",
    },
    {
      title: "Responder availability changed",
      details:
        "Rescue Team R-17 is now available for emergency deployment.",
      time: "6m",
      severity: "medium",
    },
    {
      title: "Resource warning",
      details:
        "Medical supplies in Zone F04 are below the recommended operational level.",
      time: "11m",
      severity: "medium",
    },
  ];

  return (
    <header className="fixed left-0 right-0 top-0 z-30 flex h-[68px] items-center border-b border-[var(--border)] bg-[var(--bg-primary)]/95 px-4 backdrop-blur-md lg:left-[248px] lg:px-6">
      <div className="flex w-full items-center gap-3">
        {/* Mobile menu */}
        <button
          onClick={onMenuClick}
          className="rounded-md border border-[var(--border)] p-2 text-slate-400 hover:bg-white/5 hover:text-white lg:hidden"
          aria-label="Open navigation"
        >
          <Menu size={18} />
        </button>

        {/* Command center identity */}
        <div className="hidden min-w-[270px] items-center gap-3 xl:flex">
          <div className="flex h-8 w-8 items-center justify-center rounded-md border border-cyan-500/20 bg-cyan-500/5">
            <Shield
              size={15}
              className="text-cyan-400"
              strokeWidth={2}
            />
          </div>

          <div>
            <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-200">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_7px_rgba(52,211,153,0.8)]" />
              LIVE COMMAND CENTER
            </div>

            <div className="mt-0.5 text-[9px] text-slate-500">
              National Emergency Operations • India
            </div>
          </div>
        </div>

        {/* Search */}
        <div
          ref={searchRef}
          className="relative mx-auto w-full max-w-[430px]"
        >
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
                <div className="max-h-[320px] overflow-y-auto p-1">
                  {filteredResults.map((result, index) => (
                    <button
                      key={result.path}
                      type="button"
                      onMouseDown={(event) =>
                        event.preventDefault()
                      }
                      onClick={() =>
                        handleResultSelect(result.path)
                      }
                      role="option"
                      aria-selected={
                        selectedResultIndex === index
                      }
                      className={`flex w-full items-start gap-3 rounded-md px-3 py-2.5 text-left transition-colors ${
                        selectedResultIndex === index
                          ? "bg-cyan-500/10 text-white"
                          : "text-slate-300 hover:bg-white/5"
                      }`}
                    >
                      <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-md border border-[var(--border)] bg-[var(--bg-primary)] text-[10px] font-semibold text-cyan-300">
                        {result.title
                          .slice(0, 2)
                          .toUpperCase()}
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

                  <p className="text-sm font-medium text-white">
                    No results found
                  </p>

                  <p className="mt-1 text-[10px] text-slate-500">
                    Try a different keyword or operation.
                  </p>
                </div>
              ) : null}
            </div>
          )}
        </div>

        {/* RAKSHA Copilot */}
        <button
          type="button"
          onClick={() => navigate("/copilot")}
          className="hidden items-center gap-2 rounded-md border border-cyan-500/20 bg-cyan-500/5 px-3 py-2 text-[10px] font-semibold text-cyan-300 transition-all hover:border-cyan-400/40 hover:bg-cyan-500/10 md:flex"
          aria-label="Open RAKSHA Copilot"
        >
          <Bot size={14} />
          <span>RAKSHA COPILOT</span>
        </button>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          {/* Notifications */}
          <div ref={notificationRef} className="relative">
            <button
              type="button"
              onClick={() =>
                setNotificationsOpen((open) => !open)
              }
              className="relative rounded-md border border-[var(--border)] p-2 text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
              aria-label="Notifications"
              aria-haspopup="dialog"
              aria-expanded={notificationsOpen}
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
                role="dialog"
                aria-label="Notifications panel"
                className="absolute right-0 top-[calc(100%+8px)] z-50 w-[330px] overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)] shadow-2xl shadow-slate-950/60"
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
                    onClick={() =>
                      setNotificationsOpen(false)
                    }
                    className="rounded-md p-1 text-slate-400 hover:bg-white/5 hover:text-white"
                    aria-label="Close notifications"
                  >
                    <X size={14} />
                  </button>
                </div>

                <div className="max-h-[340px] overflow-y-auto p-2">
                  {notifications.map((notification) => (
                    <div
                      key={
                        notification.title +
                        notification.time
                      }
                      className="mb-2 rounded-md border border-[var(--border)] bg-[var(--bg-primary)] p-3 last:mb-0"
                    >
                      <div className="flex items-start gap-2">
                        <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-md border border-slate-700 bg-slate-900/75">
                          {notification.severity ===
                          "critical" ? (
                            <AlertTriangle
                              size={12}
                              className="text-red-400"
                            />
                          ) : (
                            <Bell
                              size={12}
                              className="text-cyan-300"
                            />
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

                          <p className="mt-1 text-[10px] leading-4 text-slate-400">
                            {notification.details}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="hidden h-7 w-px bg-[var(--border)] sm:block" />

          {/* Admin */}
          <button
            type="button"
            onClick={() => void supabase?.auth.signOut()}
            className="flex items-center gap-2 rounded-md px-1.5 py-1.5 hover:bg-white/5"
            aria-label="Sign out"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-full border border-cyan-500/30 bg-cyan-500/10 text-[10px] font-bold text-cyan-300">
              AD
            </div>

            <div className="hidden text-left sm:block">
              <div className="text-[10px] font-semibold text-slate-200">
                {session.user.email?.split("@")[0] ?? "Operator"}
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
                          
