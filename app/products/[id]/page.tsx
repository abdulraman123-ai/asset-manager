'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import {
  FaqSection,
  ImageGallery,
  PurchasePanel,
  RelatedProducts,
  ReviewsSection,
} from '@/components/product-details';
import {
  getReviewsForProduct,
  getProductById,
  getRelatedProducts,
  productFaqs,
  type Product,
} from '@/lib/products-data';
import { cn } from '@/lib/utils';

type TabId =
  'description' | 'features' | 'requirements' | 'files' | 'compatibility';

const TABS: { id: TabId; label: string }[] = [
  { id: 'description', label: 'Description' },
  { id: 'features', label: 'Features' },
  { id: 'requirements', label: 'Requirements' },
  { id: 'files', label: 'Files' },
  { id: 'compatibility', label: 'Compatibility' },
];

function StarRow({ filledCount }: { filledCount: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${filledCount} out of 5 stars`}>
      {[0, 1, 2, 3, 4].map((index) => {
        const filled = index < filledCount;
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
            className={cn('h-4 w-4', filled ? 'text-warning' : 'text-border')}
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 20.06 12 17.77 5.82 20.06 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        );
      })}
    </div>
  );
}

function DescriptionTab({ product }: { product: Product }) {
  const paragraphs = product.longDescription.split(/\.\s+/).filter(Boolean);
  return (
    <div className="flex flex-col gap-4">
      {paragraphs.map((paragraph, index) => (
        <p key={index} className="text-sm leading-relaxed text-text-secondary">
          {paragraph}
          {index < paragraphs.length - 1 ? '.' : ''}
        </p>
      ))}
    </div>
  );
}

function FeaturesTab({ product }: { product: Product }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {product.features.map((feature) => (
        <div key={feature} className="flex items-start gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mt-0.5 h-4 w-4 shrink-0 text-success"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
          <span className="text-sm text-text-secondary">{feature}</span>
        </div>
      ))}
    </div>
  );
}

function RequirementsTab({ product }: { product: Product }) {
  return (
    <ul className="flex flex-col gap-3">
      {product.requirements.map((requirement) => (
        <li key={requirement} className="flex items-start gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mt-0.5 h-4 w-4 shrink-0 text-text-secondary"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
          <span className="text-sm text-text-secondary">{requirement}</span>
        </li>
      ))}
    </ul>
  );
}

function FilesTab({ product }: { product: Product }) {
  return (
    <ul className="flex flex-col gap-3">
      {product.includedFiles.map((file) => (
        <li key={file} className="flex items-start gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mt-0.5 h-4 w-4 shrink-0 text-accent"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <path d="M14 2v6h6" />
          </svg>
          <span className="text-sm text-text-primary">{file}</span>
        </li>
      ))}
    </ul>
  );
}

function CompatibilityTab({ product }: { product: Product }) {
  return (
    <div className="flex flex-wrap gap-2">
      {product.compatibility.map((item) => (
        <Badge key={item} variant="default" size="md">
          {item}
        </Badge>
      ))}
    </div>
  );
}

export default function ProductDetailsPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const [activeTab, setActiveTab] = useState<TabId>('description');

  const product = id ? getProductById(id) : undefined;

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <h1 className="text-2xl font-semibold text-text-primary">
            Product not found
          </h1>
          <p className="text-sm text-text-secondary">
            The product you are looking for does not exist or has been removed.
          </p>
          <Link
            href="/products"
            className="rounded-xl bg-accent px-4 py-2.5 text-sm font-medium text-white transition-colors duration-fast hover:bg-accent-hover"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const related = getRelatedProducts(product.id, product.category);
  const productReviews = getReviewsForProduct(product.id);
  const filledCount = Math.round(product.rating);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-sm">
          <li className="flex items-center gap-2">
            <Link
              href="/"
              className="text-text-secondary transition-colors hover:text-accent"
            >
              Home
            </Link>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4 text-text-secondary"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </li>
          <li className="flex items-center gap-2">
            <Link
              href="/products"
              className="text-text-secondary transition-colors hover:text-accent"
            >
              Products
            </Link>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4 text-text-secondary"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </li>
          <li>
            <span className="text-text-primary">{product.title}</span>
          </li>
        </ol>
      </nav>

      {/* Top section: gallery + info */}
      <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Left: gallery */}
        <ImageGallery images={product.galleryImages} title={product.title} />

        {/* Right: product info */}
        <div>
          <Badge variant="default" size="sm">
            {product.category}
          </Badge>

          <h1 className="mt-3 text-3xl font-semibold tracking-tighter text-text-primary sm:text-4xl">
            {product.title}
          </h1>

          {/* Rating row */}
          <div className="mt-3 flex items-center gap-2">
            <StarRow filledCount={filledCount} />
            <span className="text-sm font-medium text-text-primary">
              {product.rating.toFixed(1)}
            </span>
            <span className="text-sm text-text-secondary">
              ({product.reviewCount.toLocaleString()} reviews)
            </span>
            <span className="text-text-secondary">·</span>
            <span className="text-sm text-text-secondary">
              {product.downloads.toLocaleString()} downloads
            </span>
          </div>

          {/* Short description */}
          <p className="mt-4 text-base leading-relaxed text-text-secondary">
            {product.description}
          </p>

          {/* Mobile price row */}
          <div className="mt-6 flex items-baseline gap-2 lg:hidden">
            <span className="text-2xl font-semibold text-text-primary">
              ${product.price}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-base text-text-secondary line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>

          {/* Mobile purchase buttons */}
          <div className="mt-4 flex flex-col gap-3 lg:hidden">
            <button
              type="button"
              className="w-full rounded-xl bg-accent py-3 text-sm font-medium text-white transition-colors duration-fast hover:bg-accent-hover press-scale"
            >
              Add to Cart
            </button>
            <button
              type="button"
              className="w-full rounded-xl border border-border bg-surface-elevated py-3 text-sm font-medium text-text-primary transition-colors duration-fast hover:bg-surface"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Tabs + purchase panel */}
      <div className="mt-12 grid gap-8 lg:grid-cols-3">
        {/* Left: tabs */}
        <div className="lg:col-span-2">
          <div className="flex gap-1 border-b border-border">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    '-mb-px border-b-2 px-4 py-2.5 text-sm font-medium transition-colors duration-fast',
                    isActive
                      ? 'border-accent text-text-primary'
                      : 'border-transparent text-text-secondary hover:text-text-primary',
                  )}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="mt-6">
            {activeTab === 'description' && (
              <DescriptionTab product={product} />
            )}
            {activeTab === 'features' && <FeaturesTab product={product} />}
            {activeTab === 'requirements' && (
              <RequirementsTab product={product} />
            )}
            {activeTab === 'files' && <FilesTab product={product} />}
            {activeTab === 'compatibility' && (
              <CompatibilityTab product={product} />
            )}
          </div>
        </div>

        {/* Right: purchase panel */}
        <div className="lg:col-span-1">
          <PurchasePanel product={product} />
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-16">
        <ReviewsSection
          reviews={productReviews}
          averageRating={product.rating}
          totalReviews={product.reviewCount}
        />
      </div>

      {/* FAQ */}
      <div className="mt-16">
        <FaqSection faqs={productFaqs} />
      </div>

      {/* Related products */}
      <div className="mt-16">
        <RelatedProducts products={related} />
      </div>
    </div>
  );
}
