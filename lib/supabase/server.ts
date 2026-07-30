// The Supabase client for use in Server Components and Route Handlers —
// anything that runs on the server, per-request. This version is
// cookie-aware, so it can read the logged-in user's session from the
// incoming request and stays in sync with what the browser client sees.
//
// Still uses the public anon key here, not the service role key — this
// client respects RLS just like the browser one does. Only the checkout
// and webhook routes use the service role key directly, and only for the
// specific operations that genuinely need to bypass RLS (see those files).

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// A small, self-contained type for cookie options, defined right here
// instead of imported — this avoids depending on an exact type name from
// @supabase/ssr, which can differ slightly between versions.
type CookieOptions = {
  domain?: string;
  expires?: Date;
  httpOnly?: boolean;
  maxAge?: number;
  path?: string;
  sameSite?: boolean | "lax" | "strict" | "none";
  secure?: boolean;
};

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        // Explicit type here — this is the exact fix that was missing.
        setAll(
          cookiesToSet: {
            name: string;
            value: string;
            options?: CookieOptions;
          }[]
        ) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Server Components can't set cookies directly — this is
            // expected and safe to ignore as long as middleware.ts (added
            // in Milestone 6) is refreshing sessions on every request.
          }
        },
      },
    }
  );
}
