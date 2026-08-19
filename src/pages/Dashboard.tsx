import {
  AlertTriangle,
  ArrowUpRight,
  BrainCircuit,
  Clock3,
  MapPin,
  Radio,
  ShieldAlert,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";

import KPICards from "../components/dashboard/KPICards";

export default function Dashboard() {
  return (
    <div className="space-y-5 p-4 lg:p-6">
      {/* =========================================================
          PAGE HEADER
      ========================================================= */}
      <section>
        <div className="flex items-center gap-2">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </span>

          <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-emerald-400">
            Live Operations
          </span>

          <span className="text-[9px] text-slate-700">•</span>

          <span className="text-[9px] uppercase tracking-[0.14em] text-slate-600">
            National Emergency Operations
          </span>
        </div>

        <div className="mt-1 flex flex-col justify-between gap-3 lg:flex-row lg:items-end">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white">
              Emergency Command Center
            </h1>

            <p className="mt-1 text-[11px] text-slate-500">
              Real-time disaster intelligence, response coordination and
              AI-assisted decision support.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 rounded-md border border-[var(--border)] bg-[var(--bg-secondary)] px-3 py-2">
              <Radio size={12} className="text-emerald-400" />

              <span className="text-[9px] font-semibold uppercase tracking-wider text-slate-400">
                Systems Online
              </span>

              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </div>

            <div className="hidden items-center gap-2 rounded-md border border-[var(--border)] bg-[var(--bg-secondary)] px-3 py-2 sm:flex">
              <Clock3 size={12} className="text-slate-500" />

              <span className="text-[9px] font-medium text-slate-400">
                Live monitoring
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          KPI OVERVIEW
      ========================================================= */}
      <KPICards />

      {/* =========================================================
          INTELLIGENCE + LIVE SITUATION
      ========================================================= */}
      <section className="grid gap-4 xl:grid-cols-[1.7fr_1fr]">
        {/* LIVE SITUATION MAP */}
        <div className="relative min-h-[390px] overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)]">
          {/* Header */}
          <div className="absolute left-0 right-0 top-0 z-10 flex items-center justify-between border-b border-white/[0.05] bg-[var(--bg-secondary)]/90 px-4 py-3 backdrop-blur-md">
            <div>
              <div className="flex items-center gap-2">
                <MapPin size={13} className="text-cyan-400" />

                <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-300">
                  Live Situation Map
                </span>
              </div>

              <div className="mt-0.5 text-[9px] text-slate-600">
                Incidents • responders • risk zones
              </div>
            </div>

            <button
              type="button"
              className="flex items-center gap-1.5 rounded-md border border-[var(--border)] bg-black/20 px-2.5 py-1.5 text-[9px] font-medium text-slate-400 hover:bg-white/5 hover:text-white"
            >
              Open Full Map
              <ArrowUpRight size={11} />
            </button>
          </div>

          {/* Map simulation area */}
          <div className="absolute inset-0 pt-[65px]">
            <div className="relative h-full overflow-hidden bg-[#071016]">
              {/* Grid */}
              <div
                className="absolute inset-0 opacity-[0.18]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(148,163,184,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.12) 1px, transparent 1px)",
                  backgroundSize: "42px 42px",
                }}
              />

              {/* Simulated terrain */}
              <div className="absolute left-[12%] top-[20%] h-[190px] w-[300px] rotate-12 rounded-[45%] border border-cyan-500/10 bg-cyan-500/[0.025]" />

              <div className="absolute right-[10%] top-[28%] h-[150px] w-[240px] -rotate-12 rounded-[45%] border border-emerald-500/10 bg-emerald-500/[0.02]" />

              {/* Risk zone */}
              <div className="absolute left-[25%] top-[32%] h-[135px] w-[135px] rounded-full bg-red-500/[0.08] blur-xl" />

              <div className="absolute left-[25%] top-[32%] h-[135px] w-[135px] rounded-full border border-red-500/20" />

              {/* Incident marker 1 */}
              <div className="absolute left-[32%] top-[40%]">
                <div className="absolute -inset-3 animate-ping rounded-full bg-red-500/10" />

                <div className="relative flex h-7 w-7 items-center justify-center rounded-full border border-red-400/40 bg-red-500/15">
                  <AlertTriangle
                    size={13}
                    className="text-red-400"
                  />
                </div>
              </div>

              {/* Incident marker 2 */}
              <div className="absolute right-[27%] top-[48%]">
                <div className="relative flex h-6 w-6 items-center justify-center rounded-full border border-orange-400/40 bg-orange-500/10">
                  <AlertTriangle
                    size={12}
                    className="text-orange-400"
                  />
                </div>
              </div>

              {/* Responder marker */}
              <div className="absolute left-[52%] bottom-[25%]">
                <div className="relative flex h-6 w-6 items-center justify-center rounded-full border border-cyan-400/40 bg-cyan-500/10">
                  <Users size={11} className="text-cyan-400" />
                </div>
              </div>

              {/* AI prediction zone */}
              <div className="absolute right-[19%] bottom-[18%] h-[90px] w-[150px] rounded-[50%] border border-dashed border-cyan-400/20 bg-cyan-400/[0.025]" />

              {/* Map legend */}
              <div className="absolute bottom-4 left-4 rounded-lg border border-white/[0.06] bg-black/50 p-3 backdrop-blur-md">
                <div className="mb-2 text-[8px] font-semibold uppercase tracking-[0.15em] text-slate-500">
                  Situation
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-red-400" />
                    <span className="text-[8px] text-slate-400">
                      Critical
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-orange-400" />
                    <span className="text-[8px] text-slate-400">
                      High Priority
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-cyan-400" />
                    <span className="text-[8px] text-slate-400">
                      Responders
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full border border-cyan-400/50" />
                    <span className="text-[8px] text-slate-400">
                      AI Risk Zone
                    </span>
                  </div>
                </div>
              </div>

              {/* Live badge */}
              <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-md border border-emerald-500/15 bg-emerald-500/5 px-2 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

                <span className="text-[8px] font-semibold uppercase tracking-wider text-emerald-400">
                  Live
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* AI SITUATION INTELLIGENCE */}
        <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)]">
          <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3">
            <div>
              <div className="flex items-center gap-2">
                <BrainCircuit
                  size={14}
                  className="text-cyan-400"
                />

                <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-300">
                  AI Situation Intelligence
                </span>
              </div>

              <div className="mt-0.5 text-[9px] text-slate-600">
                Continuous threat assessment
              </div>
            </div>

            <span className="rounded-full border border-cyan-500/15 bg-cyan-500/5 px-2 py-1 text-[8px] font-semibold text-cyan-300">
              ANALYZING
            </span>
          </div>

          <div className="space-y-4 p-4">
            {/* Risk score */}
            <div className="rounded-lg border border-cyan-500/10 bg-cyan-500/[0.025] p-4">
              <div className="flex items-center justify-between">
                <span className="text-[9px] uppercase tracking-[0.14em] text-slate-500">
                  Current Risk Score
                </span>

                <span className="text-[9px] font-semibold text-cyan-400">
                  ELEVATED
                </span>
              </div>

              <div className="mt-2 flex items-end gap-2">
                <span className="text-3xl font-bold tracking-tight text-white">
                  78
                </span>

                <span className="mb-1 text-[10px] text-slate-600">
                  / 100
                </span>
              </div>

              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/[0.04]">
                <div className="h-full w-[78%] rounded-full bg-cyan-400" />
              </div>
            </div>

            {/* AI finding */}
            <div>
              <div className="mb-2 flex items-center gap-2">
                <ShieldAlert
                  size={13}
                  className="text-orange-400"
                />

                <span className="text-[9px] font-semibold uppercase tracking-[0.13em] text-slate-400">
                  AI Assessment
                </span>
              </div>

              <p className="text-[11px] leading-5 text-slate-400">
                Flood conditions in Zone F04 show a rising
                escalation probability. Current responder
                availability is sufficient, but medical
                resources may become constrained if the
                situation deteriorates.
              </p>
            </div>

            {/* Factors */}
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-md border border-[var(--border)] bg-black/10 p-2.5">
                <div className="text-[8px] uppercase tracking-wider text-slate-600">
                  Escalation
                </div>

                <div className="mt-1 text-sm font-semibold text-orange-400">
                  72%
                </div>
              </div>

              <div className="rounded-md border border-[var(--border)] bg-black/10 p-2.5">
                <div className="text-[8px] uppercase tracking-wider text-slate-600">
                  Confidence
                </div>

                <div className="mt-1 text-sm font-semibold text-cyan-400">
                  91%
                </div>
              </div>
            </div>

            {/* Recommendation */}
            <div className="rounded-lg border border-amber-500/15 bg-amber-500/[0.035] p-3">
              <div className="flex items-start gap-2">
                <Sparkles
                  size={13}
                  className="mt-0.5 text-amber-400"
                />

                <div>
                  <div className="text-[9px] font-semibold uppercase tracking-wider text-amber-300">
                    Recommended Action
                  </div>

                  <p className="mt-1 text-[10px] leading-4 text-slate-400">
                    Prepare additional rescue capacity
                    near Zone F04 and stage medical
                    resources within the next 20 minutes.
                  </p>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-md border border-cyan-500/20 bg-cyan-500/5 py-2 text-[9px] font-semibold uppercase tracking-wider text-cyan-300 transition-colors hover:bg-cyan-500/10"
            >
              <BrainCircuit size={12} />
              Open AI Intelligence
              <ArrowUpRight size={11} />
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================
          ACTIVE INCIDENTS + AI RECOMMENDATIONS
      ========================================================= */}
      <section className="grid gap-4 lg:grid-cols-2">
        {/* ACTIVE INCIDENTS */}
        <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)]">
          <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3">
            <div>
              <div className="flex items-center gap-2">
                <AlertTriangle
                  size={14}
                  className="text-red-400"
                />

                <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-300">
                  Priority Incidents
                </span>
              </div>

              <div className="mt-0.5 text-[9px] text-slate-600">
                Requiring operational attention
              </div>
            </div>

            <button
              type="button"
              className="text-[9px] font-medium text-cyan-400 hover:text-cyan-300"
            >
              View all
            </button>
          </div>

          <div className="divide-y divide-white/[0.04]">
            {/* Incident */}
            <div className="flex items-center gap-3 px-4 py-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-md border border-red-500/20 bg-red-500/5">
                <AlertTriangle
                  size={14}
                  className="text-red-400"
                />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-semibold text-white">
                    Flood • Zone F04
                  </span>

                  <span className="rounded-full bg-red-500/10 px-1.5 py-0.5 text-[7px] font-bold uppercase text-red-400">
                    Critical
                  </span>
                </div>

                <div className="mt-1 text-[9px] text-slate-600">
                  Escalation probability 72% • 6 min ago
                </div>
              </div>

              <div className="text-right">
                <div className="text-[9px] font-semibold text-cyan-400">
                  12 units
                </div>

                <div className="text-[8px] text-slate-600">
                  deployed
                </div>
              </div>
            </div>

            {/* Incident */}
            <div className="flex items-center gap-3 px-4 py-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-md border border-orange-500/20 bg-orange-500/5">
                <AlertTriangle
                  size={14}
                  className="text-orange-400"
                />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-semibold text-white">
                    Fire • Sector B12
                  </span>

                  <span className="rounded-full bg-orange-500/10 px-1.5 py-0.5 text-[7px] font-bold uppercase text-orange-400">
                    High
                  </span>
                </div>

                <div className="mt-1 text-[9px] text-slate-600">
                  Structural risk detected • 14 min ago
                </div>
              </div>

              <div className="text-right">
                <div className="text-[9px] font-semibold text-cyan-400">
                  7 units
                </div>

                <div className="text-[8px] text-slate-600">
                  deployed
                </div>
              </div>
            </div>

            {/* Incident */}
            <div className="flex items-center gap-3 px-4 py-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-md border border-yellow-500/20 bg-yellow-500/5">
                <AlertTriangle
                  size={14}
                  className="text-yellow-400"
                />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-semibold text-white">
                    Landslide • Zone K07
                  </span>

                  <span className="rounded-full bg-yellow-500/10 px-1.5 py-0.5 text-[7px] font-bold uppercase text-yellow-400">
                    Medium
                  </span>
                </div>

                <div className="mt-1 text-[9px] text-slate-600">
                  Road access partially restricted • 21 min ago
                </div>
              </div>

              <div className="text-right">
                <div className="text-[9px] font-semibold text-cyan-400">
                  3 units
                </div>

                <div className="text-[8px] text-slate-600">
                  monitoring
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI RECOMMENDATIONS */}
        <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)]">
          <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles
                  size={14}
                  className="text-cyan-400"
                />

                <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-300">
                  AI Recommendations
                </span>
              </div>

              <div className="mt-0.5 text-[9px] text-slate-600">
                Suggested operational actions
              </div>
            </div>

            <span className="rounded-full bg-cyan-500/10 px-2 py-1 text-[8px] font-bold text-cyan-300">
              3 NEW
            </span>
          </div>

          <div className="space-y-2 p-3">
            <Recommendation
              priority="HIGH"
              title="Stage rescue team near Zone F04"
              reason="Flood escalation probability increased to 72%."
            />

            <Recommendation
              priority="MEDIUM"
              title="Move medical resources closer"
              reason="Projected demand may exceed current local capacity."
            />

            <Recommendation
              priority="MEDIUM"
              title="Monitor access route K07"
              reason="AI detected increasing landslide-related obstruction risk."
            />
          </div>

          <div className="border-t border-[var(--border)] p-3">
            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-md border border-cyan-500/15 bg-cyan-500/5 py-2 text-[9px] font-semibold uppercase tracking-wider text-cyan-300 hover:bg-cyan-500/10"
            >
              <Sparkles size={12} />
              Review All Recommendations
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

/* =============================================================
   AI RECOMMENDATION COMPONENT
============================================================= */
interface RecommendationProps {
  priority: "HIGH" | "MEDIUM";
  title: string;
  reason: string;
}

function Recommendation({
  priority,
  title,
  reason,
}: RecommendationProps) {
  const isHigh = priority === "HIGH";

  return (
    <div
  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border ${
    isHigh
      ? "border-red-500/20 bg-red-500/5"
      : "border-orange-500/20 bg-orange-500/5"
  }`}
>
  <Zap
    size={12}
    className={
      isHigh
        ? "text-red-400"
        : "text-orange-400"
    }
  />
</div>

<div className="min-w-0 flex-1">
  <div className="flex items-center justify-between gap-2">
    <span className="text-[10px] font-semibold text-white">
      {title}
    </span>

    <span
      className={`rounded-full px-1.5 py-0.5 text-[7px] font-bold ${
        isHigh
          ? "bg-red-500/10 text-red-400"
          : "bg-orange-500/10 text-orange-400"
      }`}
    >
      {priority}
    </span>
  </div>

  <p className="mt-1 text-[9px] leading-4 text-slate-500">
    {reason}
  </p>
</div>
    
