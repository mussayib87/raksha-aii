import {
  Bell,
  ChevronDown,
  Menu,
  Search,
  Shield,
} from "lucide-react";

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
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
        <div className="relative mx-auto w-full max-w-[430px]">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600"
          />

          <input
            type="search"
            placeholder="Search incidents, responders, resources..."
            className="h-9 w-full rounded-md border border-[var(--border)] bg-[var(--bg-secondary)] pl-9 pr-4 text-[11px] text-slate-200 placeholder:text-slate-600 focus:border-cyan-500/40 focus:outline-none"
          />
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          <button
            className="relative rounded-md border border-[var(--border)] p-2 text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
            aria-label="Notifications"
          >
            <Bell size={16} />

            <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[8px] font-bold text-white">
              8
            </span>
          </button>

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
