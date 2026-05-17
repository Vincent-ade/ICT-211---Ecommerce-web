import { Link } from "@tanstack/react-router";
import { useCart, type Product } from "@/context/CartContext";
import { Button } from "@/components/ui/button";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <div className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-shadow hover:shadow-lg">
      <Link
        to="/product/$id"
        params={{ id: product.id }}
        className="relative block aspect-square overflow-hidden bg-muted"
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            {product.category}
          </p>
          <Link
            to="/product/$id"
            params={{ id: product.id }}
            className="mt-1 line-clamp-1 text-sm font-medium text-foreground hover:underline"
          >
            {product.name}
          </Link>
        </div>
        <div className="mt-auto flex items-center justify-between">
          <span className="text-base font-semibold text-foreground">
            ${product.price.toFixed(2)}
          </span>
          <Button
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              addToCart(product);
            }}
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}
