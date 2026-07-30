import { createClient } from "@/lib/supabase/server";
import { ProductCard } from "@/components/product-card";
import { SiteNav } from "@/components/site-nav";

export default async function ProductsPage() {
  const supabase = await createClient();

  const { data: products } = await supabase
    .from("products")
    .select("id, name, slug, description, price_cents")
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  return (
    <div className="flex flex-1 flex-col">
      <SiteNav />
      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-16 sm:px-12">
        <h1 className="text-4xl font-semibold tracking-tight text-text-primary">
          Products
        </h1>

        {!products || products.length === 0 ? (
          <p className="mt-8 text-text-secondary">
            No products published yet — check back soon.
          </p>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                slug={product.slug}
                name={product.name}
                description={product.description}
                priceCents={product.price_cents}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
