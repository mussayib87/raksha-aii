import { Bot } from "lucide-react";

export default function AIAnalytics() {
  return (
    <div className="space-y-4 p-4 lg:p-6">
      {/* Page heading */}
      <section>
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.8)]" />

          <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-purple-400">
            Predictive Intelligence
          </span>
        </div>

        <h1 className="mt-1 text-xl font-bold tracking-tight text-white">
          AI Analytics
        </h1>

        <p className="mt-1 text-[11px] text-slate-500">
          AI-powered insights and predictions for disaster response
        </p>
      </section>

      {/* Analytics grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Chart placeholder 1 */}
        <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-panel)] p-6">
          <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-500 mb-4">
            Incident Prediction
          </div>
          <div className="aspect-[4/3] flex items-center justify-center bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--bg-primary)] rounded">
            <p className="text-slate-500 text-sm">Chart ready for backend data</p>
          </div>
        </div>

        {/* Chart placeholder 2 */}
        <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-panel)] p-6">
          <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-500 mb-4">
            Resource Optimization
          </div>
          <div className="aspect-[4/3] flex items-center justify-center bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--bg-primary)] rounded">
            <p className="text-slate-500 text-sm">Chart ready for backend data</p>
          </div>
        </div>

        {/* Chart placeholder 3 */}
        <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-panel)] p-6">
          <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-500 mb-4">
            Response Time Trends
          </div>
          <div className="aspect-[4/3] flex items-center justify-center bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--bg-primary)] rounded">
            <p className="text-slate-500 text-sm">Chart ready for backend data</p>
          </div>
        </div>

        {/* Chart placeholder 4 */}
        <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-panel)] p-6">
          <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-500 mb-4">
            Risk Assessment
          </div>
          <div className="aspect-[4/3] flex items-center justify-center bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--bg-primary)] rounded">
            <p className="text-slate-500 text-sm">Chart ready for backend data</p>
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="rounded-lg border border-purple-500/20 bg-purple-500/[0.045] p-4">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-purple-500/30 bg-purple-500/10 flex-shrink-0">
            <Bot size={18} className="text-purple-400" strokeWidth={1.5} />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white mb-1">
              AI Insights
            </h3>
            <p className="text-xs text-slate-400">
              Real-time AI analysis and recommendations will appear here once connected to the backend data source.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
