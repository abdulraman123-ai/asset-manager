"use client";

import { useState, type FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function AddProductForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "done" | "error">(
    "idle"
  );
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("saving");
    setError(null);

    try {
      const response = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          description,
          // Dollars in the form, cents in the database — same reasoning
          // as everywhere else money is stored in this app.
          priceCents: Math.round(parseFloat(price) * 100),
          imageUrl: imageUrl || null,
          downloadUrl,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error ?? "Failed to add product.");
      }

      setStatus("done");
      setName("");
      setDescription("");
      setPrice("");
      setImageUrl("");
      setDownloadUrl("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        required
        placeholder="Product name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={3}
        className="rounded-xl border border-border bg-surface px-4 py-2 text-sm text-text-primary placeholder:text-text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      />
      <Input
        required
        type="number"
        step="0.01"
        min="0"
        placeholder="Price (e.g. 19.99)"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <Input
        placeholder="Image URL (optional)"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <Input
        required
        placeholder="Download link (Google Drive, Dropbox, etc.)"
        value={downloadUrl}
        onChange={(e) => setDownloadUrl(e.target.value)}
      />
      <p className="-mt-2 text-xs text-text-secondary">
        The download link is only ever shown to customers who&apos;ve
        actually purchased this product — never publicly.
      </p>

      {error && <p className="text-sm text-danger">{error}</p>}
      {status === "done" && (
        <p className="text-sm text-success">Product added.</p>
      )}

      <Button type="submit" disabled={status === "saving"}>
        {status === "saving" ? "Adding..." : "Add product"}
      </Button>
    </form>
  );
}
