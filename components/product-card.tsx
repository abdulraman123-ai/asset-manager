import Link from "next/link";

// Styled after the reference template's product card, but built around
// OUR actual product shape from Supabase (price_cents, slug) instead of
// their mock data's shape (price as a formatted string, numeric id, etc.)

export interface ProductCardProps {
  slug: string;
  name: string;
  description?: string | null;
  priceCents: number;
  badge?: string;
}

export function ProductCard({
  slug,
  name,
  description,
  priceCents,
  badge,
}: ProductCardProps) {
  return (
    <Link
      href={`/products/${slug}`}
      className="hover-lift group block overflow-hidden rounded-2xl border border-border bg-surface"
    >
      <div className="px-6 pt-6">
        <div className="flex items-start justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-surface-elevated text-accent">
            {/* Placeholder mark until real product images exist */}
            <span className="text-lg font-semibold">
              {name.charAt(0).toUpperCase()}
            </span>
          </div>
          {badge && (
            <span className="rounded-full bg-accent-subtle px-2.5 py-1 text-xs font-medium text-accent">
              {badge}
            </span>
          )}
        </div>
      </div>

      <div className="px-6 pb-6 pt-4">
        <h3 className="text-lg font-semibold leading-snug tracking-tight text-text-primary group-hover:text-accent">
          {name}
        </h3>
        {description && (
          <p className="mt-2 line-clamp-2 text-sm leading-normal text-text-secondary">
            {description}
          </p>
        )}
        <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
          <span className="text-lg font-semibold text-text-primary">
            ${(priceCents / 100).toFixed(2)}
          </span>
          <span className="text-sm font-medium text-accent">View →</span>
        </div>
      </div>
    </Link>
  );
}
