import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <header className="flex items-center justify-between px-6 py-8 sm:px-12">
        <span className="font-display text-lg tracking-tight">
          Your Platform Name
        </span>
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/products" className="hover:text-brand">
            Products
          </Link>
          <Link href="/sign-in" className="hover:text-brand">
            Sign in
          </Link>
        </nav>
      </header>

      <section className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/5 px-4 py-1.5 text-sm text-brand">
          <span className="h-1.5 w-1.5 rounded-full bg-brand" />
          Building in public
        </span>
        <h1 className="font-display max-w-2xl text-4xl leading-tight sm:text-6xl">
          A home for the things you make.
        </h1>
        <p className="mt-6 max-w-md text-base text-ink/70 sm:text-lg">
          Browse what&apos;s available so far.
        </p>
        <Link
          href="/products"
          className="mt-8 inline-flex items-center justify-center rounded-lg bg-brand px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-brand-light"
        >
          Browse Products
        </Link>
      </section>

      <footer className="px-6 py-8 text-center text-sm text-ink/50 sm:px-12">
        © {new Date().getFullYear()} — built with Next.js
      </footer>
    </main>
  );
}
