// The Supabase client for use in Client Components ("use client" files) —
// anything that runs in the customer's browser. Uses the public anon key,
// which is safe to expose (it's designed to be public; RLS is what
// actually protects your data, not keeping this key secret).

import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
