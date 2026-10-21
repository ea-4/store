import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[80vh] flex-col items-center justify-center px-4 py-16 text-center">
      {/* Visual Indicator */}
      <div className="relative mb-6 flex items-center justify-center">
        <span className="text-8xl font-extrabold tracking-tighter text-shop-border sm:text-9xl">
          404
        </span>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="rounded-full bg-shop-crimson-light px-3 py-1 text-xs font-bold uppercase tracking-wider text-shop-crimson">
            Device Not Found
          </span>
        </div>
      </div>

      {/* Main Copy */}
      <h1 className="text-2xl font-bold text-shop-espresso sm:text-3xl"> 
        This page seems to have disconnected
      </h1>
      <p className="mt-3 max-w-md text-sm font-normal text-shop-muted sm:text-base">
        The phone, accessory, or category page you are looking for might have been
        relocated, renamed, or is currently out of stock.
      </p>

      {/* Primary Action Buttons */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="rounded-lg bg-shop-crimson px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-shop-crimson-hover active:scale-95"
        >
          Return Home
        </Link>
        <Link
          href="/phones"
          className="rounded-lg border border-shop-border bg-shop-white px-5 py-2.5 text-sm font-semibold text-shop-espresso transition hover:bg-shop-surface active:scale-95"
        >
          Browse All Phones
        </Link>
      </div>

      {/* Quick Navigation Links */}
      <div className="mt-12 border-t border-shop-border pt-6">
        <p className="text-xs font-medium uppercase tracking-wider text-shop-muted">
          Popular Destinations
        </p>
        <div className="mt-3 flex flex-wrap justify-center gap-6 text-sm">
          <Link
            href="/phones?brand=apple"
            className="font-medium text-shop-mocha hover:text-shop-crimson"
          >
            iPhones
          </Link>
          <Link
            href="/phones?brand=samsung"
            className="font-medium text-shop-mocha hover:text-shop-crimson"
          >
            Samsung Galaxy
          </Link>
          <Link
            href="/accessories"
            className="font-medium text-shop-mocha hover:text-shop-crimson"
          >
            Cases & Chargers
          </Link>
          <Link
            href="/deals"
            className="font-medium text-shop-crimson hover:underline"
          >
            Clearance Deals
          </Link>
        </div>
      </div>
    </main>
  );
}