import { createFileRoute, Link } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartItem } from "@/components/CartItem";
import { useCart } from "@/context/CartContext";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Cart — NORTH" }] }),
  component: CartPage,
});

function CartPage() {
  const { items, totalPrice, totalItems, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center px-4 py-24 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-secondary">
          <ShoppingBag className="h-8 w-8 text-muted-foreground" />
        </div>
        <h1 className="mt-6 text-2xl font-bold">Your cart is empty</h1>
        <p className="mt-2 text-muted-foreground">
          Looks like you haven't added anything yet.
        </p>
        <Button asChild className="mt-6">
          <Link to="/shop">Continue shopping</Link>
        </Button>
      </div>
    );
  }

  const shipping = totalPrice >= 50 ? 0 : 5.99;
  const tax = totalPrice * 0.08;
  const grandTotal = totalPrice + shipping + tax;

  return (
    <div className="scroll-reveal mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold tracking-tight">Your cart</h1>
      <p className="mt-2 text-muted-foreground">{totalItems} item{totalItems !== 1 && "s"}</p>

      <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_360px]">
        <div>
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
          <button
            onClick={clearCart}
            className="mt-4 text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            Clear cart
          </button>
        </div>

        <aside className="h-fit rounded-lg border border-border bg-card p-6">
          <h2 className="text-lg font-semibold">Order summary</h2>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Subtotal</dt>
              <dd>${totalPrice.toFixed(2)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Shipping</dt>
              <dd>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Tax</dt>
              <dd>${tax.toFixed(2)}</dd>
            </div>
          </dl>
          <div className="mt-4 flex justify-between border-t border-border pt-4 text-base font-semibold">
            <span>Total</span>
            <span>${grandTotal.toFixed(2)}</span>
          </div>
          <Button asChild size="lg" className="mt-6 w-full">
            <Link to="/checkout">Checkout</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="mt-2 w-full">
            <Link to="/shop">Continue shopping</Link>
          </Button>
        </aside>
      </div>
    </div>
  );
}
