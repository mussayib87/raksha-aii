import {
  Activity,
  AlertTriangle,
  BrainCircuit,
  Clock3,
  Package,
  Radio,
  Siren,
  Users,
  TrendingDown,
  TrendingUp,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  fetchIncidents,
  getIncidentErrorMessage,
  isActiveIncident,
} from "../../lib/incidents";

interface KPI {
  title: string;
  value: string;
  subtitle: string;
  status: string;
  trend: "up" | "down" | "neutral";
  icon: typeof Activity;
  iconClass: string;
  glowClass: string;
  progress?: number;
}

const kpis: KPI[] = [
  {
    title: "Active Incidents",
    value: "128",
    subtitle: "Incidents being monitored",
    status: "+22% activity",
    trend: "up",
    icon: AlertTriangle,
    iconClass: "text-red-400",
    glowClass: "bg-red-500/[0.06] border-red-500/20",
    progress: 72,
  },
  {
    title: "Critical Threats",
    value: "18",
    subtitle: "Immediate intervention required",
    status: "7 require dispatch",
    trend: "up",
    icon: Siren,
    iconClass: "text-red-400",
    glowClass: "bg-red-500/[0.045] border-red-500/15",
    progress: 41,
  },
  {
    title: "AI Risk Score",
    value: "—",
    subtitle: "AI provider not configured",
    status: "Unavailable",
    trend: "neutral",
    icon: BrainCircuit,
    iconClass: "text-cyan-400",
    glowClass: "bg-cyan-500/[0.045] border-cyan-500/15",
  },
  {
    title: "Responders Deployed",
    value: "156",
    subtitle: "Units currently operational",
    status: "92% readiness",
    trend: "neutral",
    icon: Users,
    iconClass: "text-blue-400",
    glowClass: "bg-blue-500/[0.045] border-blue-500/15",
    progress: 92,
  },
  {
    title: "Resources Ready",
    value: "82%",
    subtitle: "Emergency resources available",
    status: "Within threshold",
    trend: "down",
    icon: Package,
    iconClass: "text-emerald-400",
    glowClass: "bg-emerald-500/[0.045] border-emerald-500/15",
    progress: 82,
  },
  {
    title: "Response Efficiency",
    value: "8m 42s",
    subtitle: "Average dispatch-to-arrival",
    status: "4% faster",
    trend: "down",
    icon: Clock3,
    iconClass: "text-violet-400",
    glowClass: "bg-violet-500/[0.045] border-violet-500/15",
    progress: 86,
  },
];

export default function KPICards() {
  const [activeIncidents, setActiveIncidents] = useState<number | null>(null);
  const [criticalThreats, setCriticalThreats] = useState<number | null>(null);
  const [dataError, setDataError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    void fetchIncidents()
      .then((incidents) => {
        if (!mounted) return;

        const active = incidents.filter(isActiveIncident);
        setActiveIncidents(active.length);
        setCriticalThreats(
          active.filter(
            (incident) => incident.severity.trim().toLowerCase() === "critical"
          ).length
        );
      })
      .catch((error: unknown) => {
        if (!mounted) return;
        setDataError(
          getIncidentErrorMessage(error, "Unable to load incident metrics.")
        );
      });

    return () => {
      mounted = false;
    };
  }, []);

  const displayValue = (value: number | null): string =>
    value === null ? "—" : String(value);

  const displayStatus = dataError ? "Data unavailable" : "Live from Supabase";

  return (
    <section className="grid grid-cols-2 gap-3 xl:grid-cols-6">
      {kpis.map((kpi) => {
        const value =
          kpi.title === "Active Incidents"
            ? displayValue(activeIncidents)
            : kpi.title === "Critical Threats"
              ? displayValue(criticalThreats)
              : kpi.value;
        const status =
          kpi.title === "Active Incidents" || kpi.title === "Critical Threats"
            ? displayStatus
            : kpi.status;
        const Icon = kpi.icon;

        const TrendIcon =
          kpi.trend === "up"
            ? TrendingUp
            : kpi.trend === "down"
              ? TrendingDown
              : Activity;

        const trendClass =
          kpi.trend === "up"
            ? "text-red-400"
            : kpi.trend === "down"
              ? "text-emerald-400"
              : "text-slate-400";

        return (
          <div
            key={kpi.title}
            className={`group relative overflow-hidden rounded-xl border p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--border-light)] ${kpi.glowClass}`}
          >
            {/* Top row */}
            <div className="flex items-start justify-between">
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                    {kpi.title}
                  </div>

                  {kpi.title === "AI Risk Score" && (
                    <span className="rounded-full border border-cyan-500/20 bg-cyan-500/5 px-1.5 py-0.5 text-[7px] font-bold uppercase tracking-wider text-cyan-300">
                      AI
                    </span>
                  )}
                </div>

                <div className="mt-2 text-xl font-bold tracking-tight text-white">
                  {value}
                </div>
              </div>

              <div className="rounded-lg border border-white/[0.04] bg-black/20 p-2">
                <Icon
                  size={16}
                  strokeWidth={1.8}
                  className={kpi.iconClass}
                />
              </div>
            </div>

            {/* Description */}
            <div className="mt-2 truncate text-[9px] text-slate-500">
              {kpi.subtitle}
            </div>

            {/* Progress */}
            {typeof kpi.progress === "number" && (
              <div className="mt-3">
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-[8px] uppercase tracking-wider text-slate-600">
                    Operational level
                  </span>

                  <span className="text-[8px] font-medium text-slate-500">
                    {kpi.progress}%
                  </span>
                </div>

                <div className="h-1 overflow-hidden rounded-full bg-white/[0.04]">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      kpi.title === "Critical Threats"
                        ? "bg-red-400"
                        : kpi.title === "AI Risk Score"
                          ? "bg-cyan-400"
                          : kpi.title === "Resources Ready"
                            ? "bg-emerald-400"
                            : "bg-blue-400"
                    }`}
                    style={{
                      width: `${kpi.progress}%`,
                    }}
                  />
                </div>
              </div>
            )}

            {/* Status */}
            <div className="mt-3 flex items-center gap-1.5">
              <TrendIcon
                size={10}
                className={trendClass}
              />

              <span
                className={`text-[9px] font-medium ${trendClass}`}
              >
                {status}
              </span>
            </div>

            {/* Live indicator */}
            <div className="absolute right-3 top-3">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/20" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white/30" />
              </span>
            </div>

            {/* Background glow */}
            <div className="pointer-events-none absolute -bottom-10 -right-10 h-24 w-24 rounded-full bg-white/[0.015] blur-2xl transition-all duration-300 group-hover:bg-white/[0.035]" />
          </div>
        );
      })}
    </section>
  );
            }
