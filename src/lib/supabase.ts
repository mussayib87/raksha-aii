import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim()
const supabasePublishableKey =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY?.trim()

export let supabaseConfigError =
  !supabaseUrl || !supabasePublishableKey
    ? "Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY in the deployment environment."
    : null

let supabase: SupabaseClient | null = null

if (!supabaseConfigError) {
  try {
    const parsedUrl = new URL(supabaseUrl)

    if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
      throw new Error("VITE_SUPABASE_URL must use http or https.")
    }

    supabase = createClient(supabaseUrl, supabasePublishableKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  } catch (error) {
    supabaseConfigError =
      error instanceof Error
        ? error.message
        : "The Supabase configuration is invalid."
  }
}

export { supabase }
