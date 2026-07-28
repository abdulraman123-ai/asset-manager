import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

export default function HomePage() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute hero-grid-bg hero-radial-fade inset-0" />
      <div className="absolute bg-accent/10 blur-[100px] rounded-full inset-0" />

      {/* Content */}
      <div className="relative z-10 px-4 text-center">
        <Badge variant="accent" size="sm" dot>
          Now with AI-powered search
        </Badge>

        <h1 className="mt-6 text-4xl font-semibold tracking-tighter text-text-primary sm:text-5xl lg:text-6xl">
          Premium digital products for{' '}
          <span className="text-accent">builders</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary">
          Discover a curated marketplace of AI tools, templates, UI kits, source
          code, and courses — crafted by builders, for builders.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/products"
            className="w-full rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover press-scale sm:w-auto"
          >
            Explore Products
          </Link>
          <Link
            href="/products"
            className="w-full rounded-xl border border-border bg-surface px-6 py-3 text-sm font-semibold text-text-primary transition-colors hover:bg-surface-elevated sm:w-auto"
          >
            Learn More
          </Link>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-text-secondary">
          <span className="flex items-center gap-1.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-3.5 w-3.5 text-success"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
            Instant Download
          </span>
          <span className="flex items-center gap-1.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-3.5 w-3.5 text-success"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
            Lifetime Updates
          </span>
          <span className="flex items-center gap-1.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-3.5 w-3.5 text-success"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
            Secure Payments
          </span>
        </div>
      </div>
    </section>
  );
}
