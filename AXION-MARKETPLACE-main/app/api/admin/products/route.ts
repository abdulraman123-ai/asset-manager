import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createClient as createServiceClient } from "@supabase/supabase-js";
import { isFounder } from "@/lib/founders";

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Re-check founder status here too, not just on the page. The page check
  // stops someone from SEEING the form; this check stops someone from
  // calling this API route directly and skipping the page entirely.
  if (!(await isFounder(user?.email))) {
    return NextResponse.json({ error: "Not authorized." }, { status: 403 });
  }

  const { name, description, priceCents, imageUrl, downloadUrl } =
    await request.json();

  if (!name || !priceCents || !downloadUrl) {
    return NextResponse.json(
      { error: "Name, price, and a download link are required." },
      { status: 400 }
    );
  }

  const slug = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const serviceClient = createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data: product, error: productError } = await serviceClient
    .from("products")
    .insert({
      name,
      slug,
      description: description || null,
      price_cents: priceCents,
      image_url: imageUrl,
      is_published: true,
    })
    .select()
    .single();

  if (productError) {
    return NextResponse.json({ error: productError.message }, { status: 500 });
  }

  // The download link lives in product_files, not on the product itself —
  // that table already has the correct security rule (Milestone 4): only
  // visible to someone who's actually purchased this exact product.
  const { error: fileError } = await serviceClient
    .from("product_files")
    .insert({
      product_id: product.id,
      storage_path: downloadUrl,
      file_name: name,
    });

  if (fileError) {
    return NextResponse.json({ error: fileError.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, product });
}
