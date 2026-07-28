import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createClient as createServiceClient } from "@supabase/supabase-js";
import { isFounder } from "@/lib/founders";

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Only an existing founder can add another one — otherwise anyone who
  // discovered this URL could grant themselves admin access.
  if (!(await isFounder(user?.email))) {
    return NextResponse.json({ error: "Not authorized." }, { status: 403 });
  }

  const { email } = await request.json();
  if (!email) {
    return NextResponse.json({ error: "Email is required." }, { status: 400 });
  }

  const serviceClient = createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { error } = await serviceClient
    .from("founder_emails")
    .insert({ email: email.toLowerCase() });

  if (error) {
    // 23505 = unique_violation — this email is already a founder.
    if (error.code === "23505") {
      return NextResponse.json(
        { error: "That email is already a founder." },
        { status: 409 }
      );
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
