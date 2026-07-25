// POST /api/checkout — call this from a "Buy" button with { productId }.
// Returns a checkoutUrl to redirect the customer to.

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { paymentProvider } from "@/lib/payments/lemonsqueezy";

export async function POST(request: NextRequest) {
  const supabase = await createClient();

  // Who's asking? Checkout requires being signed in — an anonymous visitor
  // should never be able to start a purchase, since we need a real user_id
  // to attach to the order later.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      { error: "You need to sign in before buying a product." },
      { status: 401 }
    );
  }

  let productId: string | undefined;
  try {
    const body = await request.json();
    productId = body.productId;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!productId) {
    return NextResponse.json({ error: "Missing productId." }, { status: 400 });
  }

  try {
    const session = await paymentProvider.createCheckoutSession({
      productId,
      userId: user.id,
      userEmail: user.email ?? "",
    });
    return NextResponse.json({ checkoutUrl: session.checkoutUrl });
  } catch (err) {
    // Anything that goes wrong here — Lemon Squeezy not configured yet,
    // a product with no linked variant, a network error — lands here.
    // We log the real reason for you, but tell the customer something
    // generic and non-technical.
    console.error("Checkout session creation failed:", err);
    return NextResponse.json(
      { error: "Could not start checkout. Please try again in a moment." },
      { status: 500 }
    );
  }
}
