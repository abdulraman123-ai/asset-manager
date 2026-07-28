'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import {
  EmptyState,
  Filters,
  type FilterState,
  Pagination,
  ProductCard,
  SearchBar,
  SortDropdown,
} from '@/components/products';
import {
  categories,
  getCategoryDescription,
  getProductsByCategory,
} from '@/lib/products-data';
import { cn } from '@/lib/utils';

const PRODUCTS_PER_PAGE = 9;

export default function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const [slug, setSlug] = useState<string | null>(null);

  useState(() => {
    params.then((p) => setSlug(p.slug));
  });

  const categoryName = useMemo(() => {
    if (!slug) return null;
    return (
      categories.find((c) => c.toLowerCase().replace(/\s+/g, '-') === slug) ??
      null
    );
  }, [slug]);

  const categoryProducts = useMemo(
    () => (categoryName ? getProductsByCategory(categoryName) : []),
    [categoryName],
  );

  const defaultFilters: FilterState = useMemo(
    () => ({
      selectedCategories: categoryName ? [categoryName] : [],
      priceRange: [0, 200],
      selectedTypes: [],
      onlyNew: false,
      onlyPopular: false,
      minRating: 0,
    }),
    [categoryName],
  );

  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [sort, setSort] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const activeFilterCount =
    filters.selectedCategories.length +
    filters.selectedTypes.length +
    (filters.onlyNew ? 1 : 0) +
    (filters.onlyPopular ? 1 : 0) +
    (filters.minRating > 0 ? 1 : 0) +
    (filters.priceRange[1] < 200 ? 1 : 0);

  const filteredProducts = useMemo(() => {
    if (!categoryName) return [];

    const query = search.trim().toLowerCase();

    const filtered = categoryProducts.filter((product) => {
      if (query) {
        const matchesTitle = product.title.toLowerCase().includes(query);
        const matchesDescription = product.description
          .toLowerCase()
          .includes(query);
        if (!matchesTitle && !matchesDescription) return false;
      }

      if (
        filters.selectedCategories.length > 0 &&
        !filters.selectedCategories.includes(product.category)
      ) {
        return false;
      }

      if (product.price > filters.priceRange[1]) {
        return false;
      }

      if (
        filters.selectedTypes.length > 0 &&
        !filters.selectedTypes.includes(product.type)
      ) {
        return false;
      }

      if (filters.onlyNew && !product.isNew) return false;
      if (filters.onlyPopular && !product.isPopular) return false;
      if (product.rating < filters.minRating) return false;

      return true;
    });

    const sorted = [...filtered].sort((a, b) => {
      switch (sort) {
        case 'oldest':
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'popular':
          return b.downloads - a.downloads;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
        default:
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
      }
    });

    return sorted;
  }, [categoryName, categoryProducts, search, filters, sort]);

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const currentPageClamped = Math.min(currentPage, Math.max(totalPages, 1));
  const paginatedProducts = filteredProducts.slice(
    (currentPageClamped - 1) * PRODUCTS_PER_PAGE,
    currentPageClamped * PRODUCTS_PER_PAGE,
  );

  const handleFiltersChange = (next: FilterState) => {
    setFilters(next);
    setCurrentPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setSearch('');
    setFilters(defaultFilters);
    setSort('newest');
    setCurrentPage(1);
  };

  if (!slug) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-text-secondary">Loading...</p>
      </div>
    );
  }

  if (!categoryName) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 text-center">
        <h1 className="text-3xl font-semibold tracking-tighter text-text-primary">
          Category not found
        </h1>
        <p className="mt-3 text-base text-text-secondary">
          The category you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/products"
          className="mt-6 rounded-xl bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover press-scale"
        >
          Browse all products
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* Category Banner */}
      <section className="relative overflow-hidden border-b border-border bg-surface py-16">
        <div className="absolute inset-0 hero-grid-bg hero-radial-fade" />
        <div className="absolute inset-0 bg-accent/10 blur-[100px] rounded-full" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav
            className="flex items-center gap-2 text-sm"
            aria-label="Breadcrumb"
          >
            <Link
              href="/"
              className="text-text-secondary transition-colors hover:text-text-primary"
            >
              Home
            </Link>
            <span className="text-text-secondary">/</span>
            <Link
              href="/products"
              className="text-text-secondary transition-colors hover:text-text-primary"
            >
              Products
            </Link>
            <span className="text-text-secondary">/</span>
            <span className="text-text-primary">{categoryName}</span>
          </nav>

          {/* Category title */}
          <h1 className="mt-4 text-4xl font-semibold tracking-tighter text-text-primary sm:text-5xl">
            {categoryName}
          </h1>

          {/* Category description */}
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg">
            {getCategoryDescription(categoryName)}
          </p>

          {/* Product count badge */}
          <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-accent-subtle px-3 py-1 text-sm font-medium text-accent">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-3.5 w-3.5"
            >
              <path d="M4 4h16v16H4z" />
              <path d="M4 9h16M9 4v16" />
            </svg>
            {categoryProducts.length}{' '}
            {categoryProducts.length === 1 ? 'product' : 'products'}
          </div>
        </div>
      </section>

      {/* Main content */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Search + Sort bar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <SearchBar
            value={search}
            onChange={handleSearchChange}
            placeholder={`Search in ${categoryName}...`}
            className="sm:max-w-md"
          />
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileFiltersOpen(true)}
              className="relative flex items-center gap-2 rounded-lg border border-border bg-surface px-3.5 py-2.5 text-sm font-medium text-text-primary transition-colors hover:border-accent/50 lg:hidden"
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
                <path d="M4 6h16M7 12h10M10 18h4" />
              </svg>
              Filters
              {activeFilterCount > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1.5 text-xs font-semibold text-white">
                  {activeFilterCount}
                </span>
              )}
            </button>
            <SortDropdown value={sort} onChange={setSort} />
          </div>
        </div>

        <div className="mt-8 flex gap-8">
          {/* Desktop sidebar */}
          <aside className="hidden w-64 shrink-0 lg:block">
            <div className="sticky top-6">
              <Filters filters={filters} onChange={handleFiltersChange} />
            </div>
          </aside>

          {/* Main content */}
          <div className="min-w-0 flex-1">
            {/* Results count */}
            <p className="mb-5 text-sm text-text-secondary">
              Showing{' '}
              <span className="font-medium text-text-primary">
                {paginatedProducts.length}
              </span>{' '}
              of{' '}
              <span className="font-medium text-text-primary">
                {filteredProducts.length}
              </span>{' '}
              {filteredProducts.length === 1 ? 'product' : 'products'} in{' '}
              {categoryName}
            </p>

            {paginatedProducts.length > 0 ? (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {paginatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <EmptyState onReset={handleReset} />
            )}

            {totalPages > 1 && (
              <div className="mt-10 flex justify-center">
                <Pagination
                  currentPage={currentPageClamped}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filters drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-overlay lg:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileFiltersOpen(false)}
            aria-hidden="true"
          />
          <div
            className={cn(
              'absolute left-0 top-0 h-full w-80 max-w-[85vw] overflow-y-auto bg-surface p-5 animate-slide-in-left',
            )}
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-text-primary">
                Filters
              </h2>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                aria-label="Close filters"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface-elevated text-text-secondary transition-colors hover:text-text-primary"
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
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
            <Filters filters={filters} onChange={handleFiltersChange} />
          </div>
        </div>
      )}
    </>
  );
}
