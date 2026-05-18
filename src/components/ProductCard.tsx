import { Link } from "react-router-dom";
import { useCart, type Product } from "@/context/CartContext";
import { Button } from "@/components/ui/button";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <div className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-shadow hover:shadow-lg">
      <Link
        to={`/product/${product.id}`}
        className="relative block aspect-square overflow-hidden bg-muted"
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          onError={(e) => {
            const img = e.currentTarget;
            img.onerror = null;
            img.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 600'%3E%3Crect width='100%25' height='100%25' fill='%23f1f5f9'/%3E%3C/svg%3E";
          }}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            {product.category}
          </p>
          <Link
            to={`/product/${product.id}`}
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
