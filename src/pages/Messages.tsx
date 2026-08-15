import { MessageSquare } from "lucide-react";

export default function Messages() {
  return (
    <div className="space-y-4 p-4 lg:p-6">
      {/* Page heading */}
      <section>
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(99,102,241,0.8)]" />

          <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-indigo-400">
            Communications
          </span>
        </div>

        <h1 className="mt-1 text-xl font-bold tracking-tight text-white">
          Messages
        </h1>

        <p className="mt-1 text-[11px] text-slate-500">
          Send and receive messages with response teams
        </p>
      </section>

      {/* Message interface layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 min-h-[600px]">
        {/* Conversations list */}
        <div className="lg:col-span-1 rounded-lg border border-[var(--border)] bg-[var(--bg-panel)] flex flex-col">
          <div className="p-3 border-b border-[var(--border)]">
            <input
              type="search"
              placeholder="Search conversations..."
              className="w-full h-8 rounded-md border border-[var(--border)] bg-[var(--bg-secondary)] px-3 text-[10px] text-slate-200 placeholder:text-slate-600 focus:border-indigo-500/40 focus:outline-none"
            />
          </div>
          <div className="flex-1 flex items-center justify-center text-slate-500">
            <p className="text-sm">No conversations</p>
          </div>
        </div>

        {/* Chat area */}
        <div className="lg:col-span-3 rounded-lg border border-[var(--border)] bg-[var(--bg-panel)] flex flex-col">
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-lg border border-indigo-500/30 bg-indigo-500/10">
                  <MessageSquare size={32} className="text-indigo-400" strokeWidth={1.5} />
                </div>
              </div>
              <p className="text-slate-400 text-sm font-medium">
                Select a conversation to start messaging
              </p>
              <p className="text-slate-500 text-xs mt-2">
                Backend integration required for messaging functionality
              </p>
            </div>
          </div>

          {/* Message input area */}
          <div className="border-t border-[var(--border)] p-4">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type a message..."
                disabled
                className="flex-1 h-9 rounded-md border border-[var(--border)] bg-[var(--bg-secondary)] px-3 text-[11px] text-slate-200 placeholder:text-slate-600 focus:border-indigo-500/40 focus:outline-none disabled:opacity-50"
              />
              <button
                disabled
                className="px-4 h-9 rounded-md bg-indigo-600/50 text-[10px] font-semibold text-indigo-300 disabled:opacity-50"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
