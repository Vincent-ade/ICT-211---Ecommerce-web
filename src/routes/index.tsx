import { Link } from "react-router-dom";
import { useState } from "react";
import { ArrowRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { ProductCard } from "@/components/ProductCard";
import productsData from "@/data/products.json";
import type { Product } from "@/context/CartContext";

export default function Home() {
  const featured = (productsData as Product[]).slice(0, 4);
  const [email, setEmail] = useState("");

  const categories = [
    { name: "Clothing", img: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&q=80" },
    { name: "Accessories", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80" },
    { name: "Home", img: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&q=80" },
  ];

  const testimonials = [
    { quote: "The quality is unreal for the price. My new daily carry.", name: "Maya R.", role: "Verified buyer" },
    { quote: "Beautifully made, shipped fast. I'll be back for more.", name: "Daniel K.", role: "Verified buyer" },
    { quote: "Honest brand, honest pricing. A rare find these days.", name: "Sofia L.", role: "Verified buyer" },
  ];

  const onSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success("You're subscribed — welcome to NORTH.");
    setEmail("");
  };

  return (
    <div>
      {/* Hero */}
      <section className="scroll-reveal relative overflow-hidden border-b border-border bg-linear-to-br from-secondary to-background">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-32">
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
              Spring Collection 2026
            </p>
            <h1 className="mt-4 text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              Essentials,
              <br />
              perfected.
            </h1>
            <p className="mt-6 max-w-md text-lg text-muted-foreground">
              Timeless pieces designed for everyday life. Considered materials, honest prices.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/shop">
                  Shop the collection
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/shop">Browse all</Link>
              </Button>
            </div>
          </div>
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-muted">
            <img
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=900&q=80"
              alt="Spring collection hero"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="scroll-reveal mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Featured</h2>
            <p className="mt-2 text-muted-foreground">Hand-picked pieces from our latest drop.</p>
          </div>
          <Link
            to="/shop"
            className="hidden text-sm font-medium text-foreground hover:underline sm:block"
          >
            View all →
          </Link>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="scroll-reveal border-t border-border bg-background">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight">Shop by category</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {categories.map((c) => (
              <Link
                key={c.name}
                to="/shop"
                className="group relative block aspect-4/5 overflow-hidden rounded-2xl bg-muted"
              >
                <img
                  src={c.img}
                  alt={c.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-semibold">{c.name}</h3>
                  <p className="mt-1 text-sm opacity-90">Shop now →</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Story strip */}
      <section className="scroll-reveal border-t border-border">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
          <div className="aspect-4/3 overflow-hidden rounded-2xl bg-muted">
            <img
              src="https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=900&q=80"
              alt="Crafted with care"
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
              Our approach
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Made slowly. Built to last.
            </h2>
            <p className="mt-4 text-muted-foreground">
              We work with a small group of workshops we know personally. Every piece is designed
              to outlast trends — better materials, fewer compromises, fairer prices.
            </p>
            <Button asChild variant="outline" className="mt-6">
              <Link to="/about">Read our story</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="scroll-reveal border-t border-border bg-secondary">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight">Loved by thousands</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.name} className="rounded-2xl border border-border bg-background p-6">
                <Quote className="h-6 w-6 text-primary" />
                <blockquote className="mt-4 text-foreground">"{t.quote}"</blockquote>
                <figcaption className="mt-6 text-sm">
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-muted-foreground">{t.role}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="scroll-reveal border-t border-border">
        <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Join the list</h2>
          <p className="mt-3 text-muted-foreground">
            Early access to new drops, restocks, and subscriber-only offers. No spam, ever.
          </p>
          <form onSubmit={onSubscribe} className="mx-auto mt-8 flex max-w-md gap-2">
            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button type="submit">Subscribe</Button>
          </form>
        </div>
      </section>

      {/* Promo strip */}
      <section className="scroll-reveal border-y border-border bg-secondary">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 text-center sm:grid-cols-3 sm:px-6 lg:px-8">
          <div>
            <h3 className="font-semibold">Free shipping</h3>
            <p className="mt-1 text-sm text-muted-foreground">On orders over $50</p>
          </div>
          <div>
            <h3 className="font-semibold">30-day returns</h3>
            <p className="mt-1 text-sm text-muted-foreground">No questions asked</p>
          </div>
          <div>
            <h3 className="font-semibold">Secure checkout</h3>
            <p className="mt-1 text-sm text-muted-foreground">Encrypted at every step</p>
          </div>
        </div>
      </section>
    </div>
  );
}
