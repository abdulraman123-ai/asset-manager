import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { BuyButton } from "@/components/buy-button";

export default async function ProductPage({
  params,
}: {
  // Next.js 15+ made route params a Promise you await, rather than a
  // plain object — this is intentional, not a typo.
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: product } = await supabase
    .from("products")
    .select("id, name, description, price_cents")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (!product) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-2xl px-6 py-16 sm:px-12">
      <h1 className="font-display text-4xl">{product.name}</h1>
      {product.description && (
        <p className="mt-4 text-ink/70">{product.description}</p>
      )}
      <p className="mt-6 text-2xl text-brand">
        ${(product.price_cents / 100).toFixed(2)}
      </p>
      <div className="mt-8">
        <BuyButton productId={product.id} />
      </div>
    </main>
  );
}
