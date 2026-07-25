// The actual Lemon Squeezy implementation of the PaymentProvider interface
// from ./types.ts. This is the ONLY file in the app that knows anything
// about Lemon Squeezy's specific API shape.
//
// NOTE ON ENV VARS: none of these have real values yet, on purpose — you
// said you're finishing your Lemon Squeezy account registration later.
// That's fine. This file reads them from process.env at request time, not
// at build time, so the app will build and deploy successfully right now.
// It just won't be ABLE to actually process a payment until real values
// exist in your environment variables. Trying to buy something before then
// will fail with a clear error message (see below) instead of a confusing
// crash.

import { createClient } from "@supabase/supabase-js";
import crypto from "node:crypto";
import type {
  PaymentProvider,
  CheckoutSessionInput,
  CheckoutSessionResult,
  WebhookEvent,
} from "./types";

const LEMON_SQUEEZY_API_URL = "https://api.lemonsqueezy.com/v1/checkouts";

class LemonSqueezyProvider implements PaymentProvider {
  async createCheckoutSession(
    input: CheckoutSessionInput
  ): Promise<CheckoutSessionResult> {
    const apiKey = process.env.LEMONSQUEEZY_API_KEY;
    const storeId = process.env.LEMONSQUEEZY_STORE_ID;

    if (!apiKey || !storeId) {
      throw new Error(
        "Lemon Squeezy isn't configured yet. Set LEMONSQUEEZY_API_KEY and " +
          "LEMONSQUEEZY_STORE_ID in your environment once your account is ready."
      );
    }

    // Every product you plan to sell needs a matching "variant" created in
    // your Lemon Squeezy store dashboard. We look up which variant belongs
    // to this product using the lemon_squeezy_variant_id column added to
    // your `products` table (see the migration alongside this file).
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data: product, error } = await supabase
      .from("products")
      .select("lemon_squeezy_variant_id")
      .eq("id", input.productId)
      .single();

    if (error || !product?.lemon_squeezy_variant_id) {
      throw new Error(
        `Product ${input.productId} isn't linked to a Lemon Squeezy variant yet. ` +
          "Create it in your Lemon Squeezy store, then set lemon_squeezy_variant_id " +
          "on this product's row."
      );
    }

    const response = await fetch(LEMON_SQUEEZY_API_URL, {
      method: "POST",
      headers: {
        Accept: "application/vnd.api+json",
        "Content-Type": "application/vnd.api+json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        data: {
          type: "checkouts",
          attributes: {
            checkout_data: {
              email: input.userEmail,
              // This "custom" object is the whole trick: Lemon Squeezy
              // stores it with the order and echoes it back, unchanged, in
              // the webhook event later. It's how we know WHO bought WHAT
              // without keeping any other state around in the meantime.
              custom: {
                user_id: input.userId,
                product_id: input.productId,
              },
            },
          },
          relationships: {
            store: {
              data: { type: "stores", id: storeId },
            },
            variant: {
              data: {
                type: "variants",
                id: product.lemon_squeezy_variant_id,
              },
            },
          },
        },
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`Lemon Squeezy checkout creation failed: ${errorBody}`);
    }

    const json = await response.json();
    return { checkoutUrl: json.data.attributes.url as string };
  }

  verifyWebhookSignature(
    rawBody: string,
    signatureHeader: string | null
  ): boolean {
    const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;
    if (!secret || !signatureHeader) return false;

    // Recompute the signature ourselves, the same way Lemon Squeezy did,
    // using our shared secret — then compare. If someone forged this
    // request without knowing the secret, the signatures won't match.
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(rawBody)
      .digest("hex");

    const expected = Buffer.from(expectedSignature, "utf8");
    const received = Buffer.from(signatureHeader, "utf8");

    // Lengths must match before timingSafeEqual — it throws if they don't,
    // rather than just returning false, so we check first.
    if (expected.length !== received.length) return false;

    // timingSafeEqual (not `===`) matters here: a plain string comparison
    // exits early on the first mismatched character, and a determined
    // attacker can measure those tiny timing differences to guess the
    // correct signature one character at a time. timingSafeEqual always
    // takes the same amount of time regardless of where a mismatch is.
    return crypto.timingSafeEqual(expected, received);
  }

  parseWebhookEvent(rawBody: string): WebhookEvent {
    const payload = JSON.parse(rawBody);
    const eventName = payload?.meta?.event_name;
    const custom = payload?.meta?.custom_data ?? {};
    const attributes = payload?.data?.attributes ?? {};

    const type: WebhookEvent["type"] =
      eventName === "order_created"
        ? "order_created"
        : eventName === "order_refunded"
          ? "order_refunded"
          : "unknown";

    return {
      type,
      externalOrderId: String(payload?.data?.id ?? ""),
      userId: custom.user_id ?? null,
      productId: custom.product_id ?? null,
      totalCents: attributes.total ?? 0,
      currency: (attributes.currency ?? "usd").toLowerCase(),
    };
  }
}

// A single shared instance, imported by the checkout and webhook routes.
export const paymentProvider: PaymentProvider = new LemonSqueezyProvider();
