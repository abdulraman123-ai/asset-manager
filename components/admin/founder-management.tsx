"use client";

import { useState, type FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Founder {
  email: string;
  created_at: string;
}

export function FounderManagement({ founders }: { founders: Founder[] }) {
  const [email, setEmail] = useState("");
  const [list, setList] = useState(founders);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/admin/founders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "Failed to add founder.");
      }

      setList((current) => [
        ...current,
        { email: email.toLowerCase(), created_at: new Date().toISOString() },
      ]);
      setEmail("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-4">
      <ul className="flex flex-col gap-2">
        {list.map((founder) => (
          <li
            key={founder.email}
            className="rounded-lg border border-border bg-surface px-4 py-2 text-sm text-text-primary"
          >
            {founder.email}
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
        <Input
          required
          type="email"
          placeholder="friend@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button type="submit" disabled={loading} variant="outline">
          {loading ? "Adding..." : "Add founder"}
        </Button>
      </form>
      {error && <p className="mt-2 text-sm text-danger">{error}</p>}
      <p className="mt-2 text-xs text-text-secondary">
        Add a friend&apos;s email here before they can access this page —
        they still need to sign up for an account with that same email
        first.
      </p>
    </div>
  );
}
