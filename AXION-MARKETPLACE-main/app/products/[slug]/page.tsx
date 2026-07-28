import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { BuyButton } from "@/components/buy-button";

export default async function ProductPage({
  params,
}: {
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
    <main className="mx-auto max-w-2xl flex-1 px-6 py-16 sm:px-12">
      <h1 className="text-4xl font-semibold tracking-tight text-text-primary">
        {product.name}
      </h1>
      {product.description && (
        <p className="mt-4 text-text-secondary">{product.description}</p>
      )}
      <p className="mt-6 text-2xl font-semibold text-text-primary">
        ${(product.price_cents / 100).toFixed(2)}
      </p>
      <div className="mt-8">
        <BuyButton productId={product.id} />
      </div>
    </main>
  );
}
