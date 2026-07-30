import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { SignOutButton } from "@/components/sign-out-button";

// A Server Component so it can check auth state directly — no client-side
// loading flash where the wrong links briefly show before correcting
// themselves.
export async function SiteNav() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="flex items-center justify-between px-6 py-6 sm:px-12">
      <Link
        href="/"
        className="text-lg font-semibold tracking-tight text-text-primary"
      >
        Axion Marketplace
      </Link>
      <nav className="flex items-center gap-6 text-sm text-text-secondary">
        <Link href="/products" className="hover:text-text-primary">
          Products
        </Link>
        {user ? (
          <>
            <Link href="/dashboard" className="hover:text-text-primary">
              Dashboard
            </Link>
            <SignOutButton />
          </>
        ) : (
          <Link href="/sign-in" className="hover:text-text-primary">
            Sign in
          </Link>
        )}
      </nav>
    </header>
  );
}
