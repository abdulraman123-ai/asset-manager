'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { products } from '@/lib/products-data';
import type { Product } from '@/lib/products-data';
import { cn } from '@/lib/utils';

type WishlistItem = {
  product: Product;
  addedAt: string;
};

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[0, 1, 2, 3, 4].map((index) => {
        const filled = index < Math.round(rating);
        return (
          <svg
            key={index}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={filled ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn('h-3.5 w-3.5', filled ? 'text-warning' : 'text-border')}
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 20.06 12 17.77 5.82 20.06 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        );
      })}
    </div>
  );
}

export default function WishlistPage() {
  const [items, setItems] = useState<WishlistItem[]>(() =>
    products.slice(0, 4).map((product, index) => ({
      product,
      addedAt: new Date(
        Date.now() - index * 1000 * 60 * 60 * 24 * 5,
      ).toISOString(),
    })),
  );
  const [movedIds, setMovedIds] = useState<Set<string>>(new Set());

  const handleRemove = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
    setMovedIds((prev) => {
      const next = new Set(prev);
      next.delete(productId);
      return next;
    });
  };

  const handleMoveToCart = (productId: string) => {
    setMovedIds((prev) => new Set(prev).add(productId));
  };

  const handleClearAll = () => {
    setItems([]);
    setMovedIds(new Set());
  };

  const handleRestore = (productId: string) => {
    setMovedIds((prev) => {
      const next = new Set(prev);
      next.delete(productId);
      return next;
    });
  };

  const totalValue = useMemo(
    () => items.reduce((sum, item) => sum + item.product.price, 0),
    [items],
  );

  const movedCount = useMemo(
    () => items.filter((item) => movedIds.has(item.product.id)).length,
    [items, movedIds],
  );

  return (
    <>
      {/* Page header */}
      <section className="border-b border-border bg-surface py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm" aria-label="Breadcrumb">
            <Link
              href="/"
              className="text-text-secondary transition-colors hover:text-text-primary"
            >
              Home
            </Link>
            <span className="text-text-secondary">/</span>
            <span className="text-text-primary">Wishlist</span>
          </nav>

          <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-semibold tracking-tighter text-text-primary sm:text-4xl">
                My Wishlist
              </h1>
              <p className="mt-2 text-base text-text-secondary">
                Save items you love and move them to cart when you are ready to
                purchase.
              </p>
            </div>

            {items.length > 0 && (
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm text-text-secondary">
                    {items.length} {items.length === 1 ? 'item' : 'items'} ·{' '}
                    {movedCount} in cart
                  </p>
                  <p className="text-lg font-semibold text-text-primary">
                    ${totalValue.toFixed(2)} total
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleClearAll}
                  className="rounded-lg border border-border bg-surface-elevated px-3.5 py-2 text-sm font-medium text-text-secondary transition-colors hover:border-danger/50 hover:text-danger"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main content */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {items.length === 0 ? (
          /* Empty Wishlist State */
          <div className="mx-auto flex max-w-lg flex-col items-center justify-center py-16 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-surface-elevated">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-10 w-10 text-text-secondary"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </div>
            <h2 className="mt-6 text-xl font-semibold text-text-primary">
              Your wishlist is empty
            </h2>
            <p className="mt-2 text-sm text-text-secondary">
              Browse our collection and tap the heart icon on any product to save
              it here for later.
            </p>
            <Link
              href="/products"
              className="mt-6 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover press-scale"
            >
              Explore Products
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Desktop table header */}
            <div className="hidden border-b border-border pb-3 lg:grid lg:grid-cols-[1fr_140px_120px_100px_180px] lg:gap-4 lg:px-1">
              <span className="text-xs font-medium uppercase tracking-wide text-text-secondary">
                Product
              </span>
              <span className="text-xs font-medium uppercase tracking-wide text-text-secondary">
                Category
              </span>
              <span className="text-xs font-medium uppercase tracking-wide text-text-secondary">
                Rating
              </span>
              <span className="text-xs font-medium uppercase tracking-wide text-text-secondary">
                Price
              </span>
              <span className="text-right text-xs font-medium uppercase tracking-wide text-text-secondary">
                Actions
              </span>
            </div>

            {/* Wishlist items */}
            {items.map(({ product, addedAt }) => {
              const isMoved = movedIds.has(product.id);
              return (
                <div
                  key={product.id}
                  className={cn(
                    'group overflow-hidden rounded-xl border border-border bg-surface transition-all',
                    isMoved && 'border-success/40 bg-success/5',
                  )}
                >
                  <div className="flex flex-col gap-4 p-4 sm:p-5 lg:grid lg:grid-cols-[1fr_140px_120px_100px_180px] lg:items-center lg:gap-4 lg:px-5">
                    {/* Product info */}
                    <div className="flex items-start gap-4">
                      {/* Thumbnail */}
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-surface-elevated sm:h-20 sm:w-20">
                        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 p-3">
                          <div className="h-1.5 w-3/4 rounded bg-border/60" />
                          <div className="h-1.5 w-1/2 rounded bg-border/40" />
                        </div>
                        {product.isNew && (
                          <div className="absolute left-1 top-1">
                            <Badge variant="success" size="sm">
                              New
                            </Badge>
                          </div>
                        )}
                      </div>

                      {/* Details */}
                      <div className="min-w-0 flex-1">
                        <Link
                          href={`/products/${product.id}`}
                          className="text-base font-medium text-text-primary transition-colors hover:text-accent"
                        >
                          {product.title}
                        </Link>
                        <p className="mt-1 line-clamp-2 text-sm text-text-secondary">
                          {product.description}
                        </p>
                        <p className="mt-2 text-xs text-text-secondary">
                          Added on {formatDate(addedAt)}
                        </p>

                        {/* Mobile-only meta row */}
                        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 lg:hidden">
                          <Badge variant="accent" size="sm">
                            {product.category}
                          </Badge>
                          <div className="flex items-center gap-1.5">
                            <StarRating rating={product.rating} />
                            <span className="text-sm font-medium text-text-primary">
                              {product.rating.toFixed(1)}
                            </span>
                          </div>
                          <div className="flex items-baseline gap-2">
                            <span className="text-base font-semibold text-text-primary">
                              ${product.price}
                            </span>
                            {product.originalPrice > product.price && (
                              <span className="text-sm text-text-secondary line-through">
                                ${product.originalPrice}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Category (desktop) */}
                    <div className="hidden lg:block">
                      <Badge variant="accent" size="sm">
                        {product.category}
                      </Badge>
                    </div>

                    {/* Rating (desktop) */}
                    <div className="hidden items-center gap-2 lg:flex">
                      <StarRating rating={product.rating} />
                      <span className="text-sm font-medium text-text-primary">
                        {product.rating.toFixed(1)}
                      </span>
                    </div>

                    {/* Price (desktop) */}
                    <div className="hidden lg:block">
                      <div className="flex items-baseline gap-2">
                        <span className="text-base font-semibold text-text-primary">
                          ${product.price}
                        </span>
                        {product.originalPrice > product.price && (
                          <span className="text-sm text-text-secondary line-through">
                            ${product.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 lg:justify-end">
                      {isMoved ? (
                        <>
                          <span className="flex items-center gap-1.5 rounded-lg bg-success/10 px-3 py-2 text-sm font-medium text-success">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-4 w-4"
                            >
                              <path d="M20 6 9 17l-5-5" />
                            </svg>
                            In Cart
                          </span>
                          <button
                            type="button"
                            onClick={() => handleRestore(product.id)}
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface-elevated text-text-secondary transition-colors hover:text-text-primary"
                            aria-label="Undo move to cart"
                            title="Undo"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-4 w-4"
                            >
                              <path d="M3 7v6h6" />
                              <path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13" />
                            </svg>
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            type="button"
                            onClick={() => handleMoveToCart(product.id)}
                            className="flex items-center gap-1.5 rounded-lg bg-accent px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover press-scale"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-4 w-4"
                            >
                              <circle cx="8" cy="21" r="1" />
                              <circle cx="19" cy="21" r="1" />
                              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                            </svg>
                            <span className="hidden sm:inline">
                              Move to Cart
                            </span>
                            <span className="sm:hidden">Cart</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRemove(product.id)}
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface-elevated text-text-secondary transition-colors hover:border-danger/50 hover:text-danger"
                            aria-label={`Remove ${product.title} from wishlist`}
                            title="Remove"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-4 w-4"
                            >
                              <path d="M3 6h18" />
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                              <line x1="10" y1="11" x2="10" y2="17" />
                              <line x1="14" y1="11" x2="14" y2="17" />
                            </svg>
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Summary bar */}
            <div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-xl border border-border bg-surface p-5 sm:flex-row">
              <div className="flex items-center gap-6">
                <div>
                  <p className="text-xs text-text-secondary">
                    Total items
                  </p>
                  <p className="text-lg font-semibold text-text-primary">
                    {items.length}
                  </p>
                </div>
                <div className="h-8 w-px bg-border" />
                <div>
                  <p className="text-xs text-text-secondary">In cart</p>
                  <p className="text-lg font-semibold text-success">
                    {movedCount}
                  </p>
                </div>
                <div className="h-8 w-px bg-border" />
                <div>
                  <p className="text-xs text-text-secondary">Total value</p>
                  <p className="text-lg font-semibold text-text-primary">
                    ${totalValue.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href="/products"
                  className="rounded-lg border border-border bg-surface-elevated px-4 py-2.5 text-sm font-medium text-text-primary transition-colors hover:border-accent/50 hover:text-accent"
                >
                  Continue Browsing
                </Link>
                <button
                  type="button"
                  className="rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover press-scale disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={movedCount === 0}
                >
                  Proceed to Checkout
                  {movedCount > 0 && ` (${movedCount})`}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
