import { createClient } from "@supabase/supabase-js";

/**
 * Creates a Supabase client authenticated with the caller's JWT so that
 * Row-Level Security policies see auth.uid() = the real user's id.
 */
export function supabaseForUser(token: string) {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        headers: { Authorization: `Bearer ${token}` },
      },
    },
  );
}
