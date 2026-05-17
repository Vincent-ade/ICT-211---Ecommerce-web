import { useEffect, useMemo, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import productsData from "@/data/products.json";
import type { Product } from "@/context/CartContext";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function loadProducts(): Product[] {
  try {
    const raw = localStorage.getItem("north_products");
    if (raw) return JSON.parse(raw) as Product[];
  } catch {}
  return productsData as Product[];
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function Shop() {
  const all = useMemo(() => loadProducts(), []);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(all.map((p) => p.category)))],
    [all],
  );
  const maxPrice = Math.ceil(Math.max(...all.map((p) => p.price)));

  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<string>("All");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, maxPrice]);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(t);
  }, []);

  const filtered = all.filter((p) => {
    const inCategory = category === "All" || p.category === category;
    const inPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
    return inCategory && inPrice;
  });

  return (
    <div className="scroll-reveal mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="border-b border-border pb-8">
        <h1 className="text-4xl font-bold tracking-tight">Shop</h1>
        <p className="mt-2 text-muted-foreground">{all.length} products available</p>
      </header>

      <div className="mt-8 grid gap-10 lg:grid-cols-[240px_1fr]">
        {/* Filters */}
        <aside className="space-y-8">
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide">Category</h3>
            <div className="flex flex-wrap gap-2 lg:flex-col lg:items-start">
              {categories.map((c) => (
                <Button
                  key={c}
                  variant={category === c ? "default" : "ghost"}
                  size="sm"
                  className="lg:w-full lg:justify-start"
                  onClick={() => setCategory(c)}
                >
                  {c}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide">Price</h3>
            <Slider
              min={0}
              max={maxPrice}
              step={5}
              value={priceRange}
              onValueChange={(v) => setPriceRange([v[0], v[1]] as [number, number])}
            />
            <div className="mt-3 flex justify-between text-sm text-muted-foreground">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
        </aside>

        {/* Products */}
        <div className="scroll-reveal">
          {loading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="aspect-square animate-pulse rounded-lg bg-muted" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex h-64 items-center justify-center rounded-lg border border-dashed border-border text-muted-foreground">
              No products match your filters.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}