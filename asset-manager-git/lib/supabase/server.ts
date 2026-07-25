import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// A small, self-contained type for cookie options, defined right here
// instead of imported — this avoids depending on an exact type name from
// @supabase/ssr, which can differ slightly between versions. This is what
// the setAll function below needs.
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
        // The fix: cookiesToSet now has an explicit type instead of an
        // inferred (and, to strict mode, unacceptable) implicit one.
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
