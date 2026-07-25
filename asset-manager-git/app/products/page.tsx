import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function ProductsPage() {
  const supabase = await createClient();

  // The RLS policy from Milestone 4 only lets this query see products
  // where is_published is true — no need to filter for that again here,
  // the database already won't return anything else. We still add the
  // filter explicitly below anyway, since being explicit about intent in
  // the query makes the code easier to read even though it's redundant
  // with what RLS already guarantees.
  const { data: products } = await supabase
    .from("products")
    .select("id, name, slug, description, price_cents")
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  return (
    <main className="mx-auto max-w-5xl px-6 py-16 sm:px-12">
      <h1 className="font-display text-4xl">Products</h1>

      {!products || products.length === 0 ? (
        <p className="mt-8 text-ink/60">
          No products published yet — check back soon.
        </p>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className="rounded-lg border border-ink/10 p-5 transition-colors hover:border-brand/40"
            >
              <h2 className="font-display text-lg">{product.name}</h2>
              {product.description && (
                <p className="mt-2 line-clamp-2 text-sm text-ink/60">
                  {product.description}
                </p>
              )}
              <p className="mt-4 text-brand">
                ${(product.price_cents / 100).toFixed(2)}
              </p>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
