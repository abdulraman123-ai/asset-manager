import { createClient } from "@/lib/supabase/server";
import { createClient as createServiceClient } from "@supabase/supabase-js";
import { isFounder } from "@/lib/founders";
import { redirect } from "next/navigation";
import { AddProductForm } from "@/components/admin/add-product-form";
import { FounderManagement } from "@/components/admin/founder-management";

export default async function AdminNewProductPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Not signed in at all — send to sign-in rather than showing anything
  // about this page existing.
  if (!user) {
    redirect("/sign-in");
  }

  // Signed in, but not a recognized founder — this is the actual access
  // control. Checked here, server-side, before any admin UI renders (not
  // just hidden in the browser, which anyone could bypass).
  const founder = await isFounder(user.email);
  if (!founder) {
    redirect("/products");
  }

  // Fetch the current founder list to show on the page. Uses the service
  // role client directly since founder_emails has no RLS policies at all.
  const serviceClient = createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
  const { data: founders } = await serviceClient
    .from("founder_emails")
    .select("email, created_at")
    .order("created_at", { ascending: true });

  return (
    <main className="mx-auto max-w-2xl flex-1 px-6 py-16 sm:px-12">
      <span className="rounded-full bg-accent-subtle px-3 py-1 text-xs font-medium text-accent">
        Founder access
      </span>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-text-primary">
        Add a product
      </h1>
      <p className="mt-2 text-sm text-text-secondary">
        Signed in as {user.email}. This page is only visible to founders.
      </p>

      <div className="mt-10">
        <AddProductForm />
      </div>

      <div className="mt-16 border-t border-border pt-10">
        <h2 className="text-xl font-semibold tracking-tight text-text-primary">
          Founders
        </h2>
        <p className="mt-2 text-sm text-text-secondary">
          Anyone on this list can add products and manage this list too.
        </p>
        <FounderManagement founders={founders ?? []} />
      </div>
    </main>
  );
}
