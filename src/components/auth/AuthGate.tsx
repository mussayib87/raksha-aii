import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import type { Session } from "@supabase/supabase-js";
import { Loader2, Shield } from "lucide-react";
import { supabase, supabaseConfigError } from "../../lib/supabase";

interface AuthGateProps {
  children: (session: Session) => ReactNode;
}

export default function AuthGate({ children }: AuthGateProps) {
  const [session, setSession] = useState<Session | null>(null);
  const [checkingSession, setCheckingSession] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!supabase) {
      setCheckingSession(false);
      return;
    }

    let mounted = true;

    void supabase.auth.getSession().then(({ data, error: sessionError }) => {
      if (!mounted) return;

      if (sessionError) {
        setError("Unable to restore your session. Please sign in again.");
      }

      setSession(data.session);
      setCheckingSession(false);
    });

    const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (mounted) {
        setSession(nextSession);
      }
    });

    return () => {
      mounted = false;
      data.subscription.unsubscribe();
    };
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!supabase) return;

    setSubmitting(true);
    setError("");

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (signInError) {
      setError("Sign-in failed. Check your credentials and try again.");
    }

    setSubmitting(false);
  };

  if (checkingSession) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--bg-primary)] text-slate-300">
        <Loader2 size={24} className="animate-spin text-cyan-400" />
      </div>
    );
  }

  if (!supabase || supabaseConfigError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--bg-primary)] px-4 text-slate-300">
        <div className="w-full max-w-md rounded-lg border border-red-500/20 bg-[var(--bg-panel)] p-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-red-400">
            Configuration required
          </p>
          <h1 className="mt-2 text-lg font-semibold text-white">
            Supabase is not connected
          </h1>
          <p className="mt-2 text-xs leading-5 text-slate-400">
            {supabaseConfigError ?? "Set the Supabase environment variables and reload."}
          </p>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[var(--bg-primary)] px-4">
        <section className="w-full max-w-md rounded-lg border border-[var(--border)] bg-[var(--bg-panel)] p-6 shadow-2xl shadow-slate-950/30">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md border border-cyan-500/20 bg-cyan-500/5">
              <Shield size={19} className="text-cyan-400" />
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-cyan-400">
                RAKSHA-AI
              </p>
              <h1 className="mt-1 text-lg font-semibold text-white">
                Command center sign-in
              </h1>
            </div>
          </div>

          <p className="mt-5 text-xs leading-5 text-slate-400">
            Sign in with your authorized operations account to access emergency data.
          </p>

          <form onSubmit={(event) => void handleSubmit(event)} className="mt-5 space-y-3">
            <label className="block text-[10px] font-medium text-slate-300">
              Email
              <input
                required
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="mt-1 h-9 w-full rounded-md border border-[var(--border)] bg-[var(--bg-secondary)] px-3 text-[11px] text-slate-200 focus:border-cyan-500/40 focus:outline-none"
              />
            </label>

            <label className="block text-[10px] font-medium text-slate-300">
              Password
              <input
                required
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="mt-1 h-9 w-full rounded-md border border-[var(--border)] bg-[var(--bg-secondary)] px-3 text-[11px] text-slate-200 focus:border-cyan-500/40 focus:outline-none"
              />
            </label>

            {error && <p className="text-xs text-red-400">{error}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex h-9 w-full items-center justify-center gap-2 rounded-md bg-cyan-600 px-4 text-[11px] font-semibold text-white transition hover:bg-cyan-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting && <Loader2 size={14} className="animate-spin" />}
              {submitting ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </section>
      </main>
    );
  }

  return <>{children(session)}</>;
}
