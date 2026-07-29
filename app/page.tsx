import Link from "next/link";
import { SiteNav } from "@/components/site-nav";

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col">
      <SiteNav />

      <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden">
        <div className="hero-grid-bg hero-radial-fade absolute inset-0" />
        <div className="absolute inset-0 rounded-full bg-accent/10 blur-[100px]" />

        <div className="relative z-10 px-4 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent-subtle px-4 py-1.5 text-sm text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Building in public
          </span>

          <h1 className="mt-6 text-4xl font-semibold tracking-tighter text-text-primary sm:text-5xl lg:text-6xl">
            Premium digital products for{" "}
            <span className="text-accent">builders</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary">
            Templates, UI kits, source code, courses, and ebooks — instant
            downloads, built by makers, for makers.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/products"
              className="w-full rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors press-scale hover:bg-accent-hover sm:w-auto"
            >
              Explore Products
            </Link>
            <Link
              href="/sign-up"
              className="w-full rounded-xl border border-border bg-surface px-6 py-3 text-sm font-semibold text-text-primary transition-colors hover:bg-surface-elevated sm:w-auto"
            >
              Create Account
            </Link>
          </div>
        </div>
      </section>

      <footer className="px-6 py-8 text-center text-sm text-text-secondary sm:px-12">
        © {new Date().getFullYear()} Axion Marketplace
      </footer>
    </main>
  );
}
