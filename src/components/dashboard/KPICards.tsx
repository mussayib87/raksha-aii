import {
  Activity,
  AlertTriangle,
  Clock3,
  Package,
  Siren,
  Users,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

interface KPI {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: typeof Activity;
  iconClass: string;
  glowClass: string;
}

const kpis: KPI[] = [
  {
    title: "Total Incidents",
    value: "128",
    change: "22% vs yesterday",
    trend: "up",
    icon: AlertTriangle,
    iconClass: "text-red-400",
    glowClass: "bg-red-500/10 border-red-500/20",
  },
  {
    title: "Critical",
    value: "18",
    change: "13% vs yesterday",
    trend: "up",
    icon: Siren,
    iconClass: "text-red-400",
    glowClass: "bg-red-500/[0.07] border-red-500/15",
  },
  {
    title: "High Priority",
    value: "34",
    change: "8% vs yesterday",
    trend: "up",
    icon: AlertTriangle,
    iconClass: "text-orange-400",
    glowClass: "bg-orange-500/[0.07] border-orange-500/15",
  },
  {
    title: "Responders Active",
    value: "156",
    change: "10% vs yesterday",
    trend: "up",
    icon: Users,
    iconClass: "text-cyan-400",
    glowClass: "bg-cyan-500/[0.07] border-cyan-500/15",
  },
  {
    title: "Resources Available",
    value: "82",
    change: "7% vs yesterday",
    trend: "up",
    icon: Package,
    iconClass: "text-emerald-400",
    glowClass: "bg-emerald-500/[0.07] border-emerald-500/15",
  },
  {
    title: "Avg. Response Time",
    value: "8m 42s",
    change: "4% vs yesterday",
    trend: "down",
    icon: Clock3,
    iconClass: "text-blue-400",
    glowClass: "bg-blue-500/[0.07] border-blue-500/15",
  },
];

export default function KPICards() {
  return (
    <section className="grid grid-cols-2 gap-3 xl:grid-cols-6">
      {kpis.map((kpi) => {
        const Icon = kpi.icon;
        const TrendIcon =
          kpi.trend === "up" ? TrendingUp : TrendingDown;

        return (
          <div
            key={kpi.title}
            className={`group relative overflow-hidden rounded-lg border p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--border-light)] ${kpi.glowClass}`}
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                  {kpi.title}
                </div>

                <div className="mt-2 text-xl font-bold tracking-tight text-white">
                  {kpi.value}
                </div>
              </div>

              <div className="rounded-md bg-black/20 p-2">
                <Icon
                  size={16}
                  strokeWidth={1.8}
                  className={kpi.iconClass}
                />
              </div>
            </div>

            <div className="mt-3 flex items-center gap-1.5 text-[9px]">
              <TrendIcon
                size={11}
                className={
                  kpi.trend === "down"
                    ? "text-emerald-400"
                    : "text-red-400"
                }
              />

              <span
                className={
                  kpi.trend === "down"
                    ? "text-emerald-400"
                    : "text-red-400"
                }
              >
                {kpi.change}
              </span>
            </div>

            <div className="pointer-events-none absolute -bottom-8 -right-8 h-20 w-20 rounded-full bg-white/[0.015] blur-2xl transition-all group-hover:bg-white/[0.035]" />
          </div>
        );
      })}
    </section>
  );
      }
