import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ productId: string }> }
) {
  const { productId } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // Deliberately using the REGULAR client here, not the service role one.
  // The product_files RLS policy from Milestone 4 already only returns a
  // row if this exact signed-in user has a completed order for this exact
  // product. If they haven't paid, this query comes back empty — not
  // because this route checked and said no, but because the database
  // itself won't show it to them. That's the actual security boundary;
  // this route is just acting on whatever it's allowed to see.
  const { data: file } = await supabase
    .from("product_files")
    .select("storage_path, file_name")
    .eq("product_id", productId)
    .maybeSingle();

  if (!file) {
    return NextResponse.json(
      {
        error:
          "You don't have access to this file. Have you purchased this product?",
      },
      { status: 403 }
    );
  }

  // storage_path currently holds an external link (Google Drive, Dropbox,
  // etc.) rather than a Supabase Storage path — that's the pragmatic
  // shortcut taken when the admin panel was built, since real file
  // uploads (Milestone 7) haven't been implemented yet. This route just
  // sends the customer straight there. If storage moves to Supabase
  // Storage later, only this one line changes — to generate a signed URL
  // instead of redirecting directly.
  return NextResponse.redirect(file.storage_path);
}
