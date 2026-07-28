import { createClient } from "@supabase/supabase-js";

// Checks whether an email is in the founder_emails allowlist. Uses the
// service role key deliberately — founder_emails has zero RLS policies for
// regular users, so this is the only way to read it at all.
export async function isFounder(
  email: string | null | undefined
): Promise<boolean> {
  if (!email) return false;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data } = await supabase
    .from("founder_emails")
    .select("email")
    .eq("email", email.toLowerCase())
    .maybeSingle();

  return !!data;
}
