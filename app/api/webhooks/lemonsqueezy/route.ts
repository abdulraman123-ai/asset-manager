// POST /api/webhooks/lemonsqueezy — Lemon Squeezy calls this URL on its
// own, server-to-server, whenever a payment event happens. This is the
// ONLY place in the entire app that's allowed to create an `orders` row —
// never trust a browser redirect alone as proof that someone paid.
//
// Once your Lemon Squeezy account is ready, you'll paste this route's full
// URL (https://yourdomain.com/api/webhooks/lemonsqueezy) into Lemon
// Squeezy's dashboard under Settings > Webhooks, along with a signing
// secret that goes into LEMONSQUEEZY_WEBHOOK_SECRET.

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { paymentProvider } from "@/lib/payments/lemonsqueezy";

export async function POST(request: NextRequest) {
  // Read the RAW body text, not parsed JSON. Signature verification has to
  // check the exact bytes Lemon Squeezy sent — parsing and re-serializing
  // the JSON could subtly change the bytes and break the signature check.
  const rawBody = await request.text();
  const signature = request.headers.get("x-signature");

  if (!paymentProvider.verifyWebhookSignature(rawBody, signature)) {
    console.error("Webhook signature verification failed — rejecting request.");
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const event = paymentProvider.parseWebhookEvent(rawBody);

  if (event.type !== "order_created") {
    // Acknowledge anything else (refunds, etc.) so Lemon Squeezy doesn't
    // keep retrying, but we don't act on it yet — that's a later milestone.
    return NextResponse.json({ received: true });
  }

  if (!event.userId || !event.productId) {
    console.error("Webhook order_created missing custom data:", event);
    return NextResponse.json({ error: "Missing custom data" }, { status: 400 });
  }

  // Service-role client: this code runs only on the server (Lemon Squeezy
  // calls it directly — no customer's browser is involved), and it needs
  // to write an order on the customer's behalf, which requires bypassing
  // RLS. This webhook route and the one place in the checkout route that
  // looks up a product's variant ID are the ONLY places in the app that
  // should ever use this key.
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // Look up the price we're actually charging for this product right now,
  // rather than trusting the webhook's total blindly — gives us something
  // to cross-check against, and a sane fallback if the lookup fails.
  const { data: product } = await supabase
    .from("products")
    .select("price_cents")
    .eq("id", event.productId)
    .single();

  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      user_id: event.userId,
      lemon_squeezy_order_id: event.externalOrderId,
      status: "completed",
      total_cents: event.totalCents,
      currency: event.currency,
    })
    .select()
    .single();

  if (orderError) {
    // Postgres error code 23505 = unique_violation. Lemon Squeezy is
    // allowed to send the same webhook more than once (that's a normal
    // part of how webhooks work) — the unique constraint on
    // lemon_squeezy_order_id means a repeat delivery fails harmlessly here
    // instead of creating a duplicate order.
    if (orderError.code === "23505") {
      return NextResponse.json({ received: true, duplicate: true });
    }
    console.error("Failed to write order:", orderError);
    return NextResponse.json({ error: "Failed to record order" }, { status: 500 });
  }

  const { error: itemError } = await supabase.from("order_items").insert({
    order_id: order.id,
    product_id: event.productId,
    price_cents: product?.price_cents ?? event.totalCents,
  });

  if (itemError) {
    console.error("Failed to write order item:", itemError);
    return NextResponse.json({ error: "Failed to record order item" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
