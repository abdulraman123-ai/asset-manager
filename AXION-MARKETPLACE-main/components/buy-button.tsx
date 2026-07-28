"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function BuyButton({ productId }: { productId: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleBuy() {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          window.location.href = "/sign-in";
          return;
        }
        throw new Error(data.error ?? "Something went wrong.");
      }

      window.location.href = data.checkoutUrl;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setLoading(false);
    }
  }

  return (
    <div>
      <Button onClick={handleBuy} disabled={loading} size="lg">
        {loading ? "Starting checkout..." : "Buy Now"}
      </Button>
      {error && <p className="mt-3 max-w-sm text-sm text-danger">{error}</p>}
    </div>
  );
}
