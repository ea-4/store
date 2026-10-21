export default function ThemePreview() {
  return (
    <div className="mx-auto max-w-sm rounded-2xl border border-shop-border bg-shop-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="rounded bg-shop-crimson-light px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-shop-crimson">
          Save 15%
        </span>
        <span className="text-xs font-normal text-shop-muted">In Stock</span>
      </div>

      <div className="my-4 flex h-44 items-center justify-center rounded-xl bg-shop-surface">
        <span className="text-sm font-medium text-shop-muted">[Product Image]</span>
      </div>

      <p className="text-xs font-medium uppercase tracking-wider text-shop-caramel">Google</p>
      <h3 className="text-base font-semibold text-shop-espresso">Pixel 9 Pro 256GB</h3>
      <p className="mt-1 text-xs font-normal text-shop-muted">Tensor G4 &bull; 16GB RAM &bull; Obsidian</p>

      <div className="mt-4 flex items-center justify-between border-t border-shop-border pt-3">
        <div>
          <span className="text-lg font-bold text-shop-espresso">$999</span>
          <span className="ml-2 text-xs font-normal text-shop-muted line-through">$1,099</span>
        </div>
        <button className="rounded-lg bg-shop-crimson px-4 py-2 text-sm font-semibold text-white transition hover:bg-shop-crimson-hover active:scale-95">
          Add to Cart
        </button>
      </div>
    </div>
  );
}