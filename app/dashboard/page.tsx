import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

// Defined explicitly rather than relying on inferred types from the
// nested query below — same lesson as the cookies bug from earlier:
// don't leave TypeScript guessing the shape of something this specific.
interface OrderWithItems {
  id: string;
  created_at: string;
  order_items: {
    product_id: string;
    price_cents: number;
    products: { name: string; slug: string } | null;
  }[];
}

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in");
  }

  // RLS already restricts this to the signed-in user's own orders — no
  // extra filtering needed here beyond what the query itself asks for.
  const { data } = await supabase
    .from("orders")
    .select(
      `
      id,
      created_at,
      order_items (
        product_id,
        price_cents,
        products ( name, slug )
      )
    `
    )
    .eq("status", "completed")
    .order("created_at", { ascending: false });

  const orders = (data ?? []) as unknown as OrderWithItems[];

  return (
    <main className="mx-auto max-w-3xl flex-1 px-6 py-16 sm:px-12">
      <h1 className="text-4xl font-semibold tracking-tight text-text-primary">
        My Purchases
      </h1>
      <p className="mt-2 text-sm text-text-secondary">
        Signed in as {user.email}
      </p>

      {orders.length === 0 ? (
        <p className="mt-10 text-text-secondary">
          You haven&apos;t purchased anything yet.{" "}
          <Link href="/products" className="text-accent underline">
            Browse products
          </Link>
        </p>
      ) : (
        <div className="mt-10 flex flex-col gap-4">
          {orders.map((order) =>
            order.order_items.map((item) => (
              <div
                key={item.product_id}
                className="flex items-center justify-between rounded-xl border border-border bg-surface px-6 py-4"
              >
                <div>
                  <p className="font-medium text-text-primary">
                    {item.products?.name ?? "Product"}
                  </p>
                  <p className="text-sm text-text-secondary">
                    Purchased{" "}
                    {new Date(order.created_at).toLocaleDateString()} · $
                    {(item.price_cents / 100).toFixed(2)}
                  </p>
                </div>
                <a
                  href={`/api/downloads/${item.product_id}`}
                  className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
                >
                  Download
                </a>
              </div>
            ))
          )}
        </div>
      )}
    </main>
  );
}
