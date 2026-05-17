import { Minus, Plus, X } from "lucide-react";
import { useCart, type CartItem as CartItemType } from "@/context/CartContext";

export function CartItem({ item }: { item: CartItemType }) {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex gap-4 border-b border-border py-4">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md bg-muted">
        <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
      </div>
      <div className="flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              {item.category}
            </p>
            <h3 className="mt-1 text-sm font-medium text-foreground">{item.name}</h3>
          </div>
          <button
            onClick={() => removeFromCart(item.id)}
            className="text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Remove item"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center rounded-md border border-border">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="flex h-8 w-8 items-center justify-center text-muted-foreground hover:text-foreground"
              aria-label="Decrease quantity"
            >
              <Minus className="h-3 w-3" />
            </button>
            <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="flex h-8 w-8 items-center justify-center text-muted-foreground hover:text-foreground"
              aria-label="Increase quantity"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>
          <span className="text-sm font-semibold">
            ${(item.price * item.quantity).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
