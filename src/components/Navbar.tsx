import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, User, Menu, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Navbar() {
  const { totalItems } = useCart();
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path || (path === "/" && location.pathname === "/");

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="text-xl font-bold tracking-tight text-foreground">
          NORTH<span className="text-primary">.</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            to="/"
            className={`text-sm font-medium transition-colors hover:text-foreground ${
              isActive("/") ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            Home
          </Link>
          <Link
            to="/shop"
            className={`text-sm font-medium transition-colors hover:text-foreground ${
              isActive("/shop") ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            Shop
          </Link>
          <Link
            to="/about"
            className={`text-sm font-medium transition-colors hover:text-foreground ${
              isActive("/about") ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            About
          </Link>
          <Link
            to="/contact"
            className={`text-sm font-medium transition-colors hover:text-foreground ${
              isActive("/contact") ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/login"
            className="h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground inline-flex"
            aria-label="Account"
          >
            <User className="h-5 w-5" />
          </Link>
          <Link
            to="/cart"
            className="relative inline-flex h-9 w-9 items-center justify-center rounded-md text-foreground transition-colors hover:bg-accent"
            aria-label="Cart"
          >
            <ShoppingBag className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground">
                {totalItems}
              </span>
            )}
          </Link>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button className="md:hidden h-9 w-9 inline-flex items-center justify-center rounded-md text-foreground transition-colors hover:bg-accent" aria-label="Menu">
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <div className="mt-6 space-y-4">
                <Link
                  to="/"
                  activeOptions={{ exact: true }}
                  className="block px-4 py-2 text-sm font-medium text-foreground rounded-md hover:bg-accent"
                  onClick={() => setOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/shop"
                  className="block px-4 py-2 text-sm font-medium text-foreground rounded-md hover:bg-accent"
                  onClick={() => setOpen(false)}
                >
                  Shop
                </Link>
                <Link
                  to="/about"
                  className="block px-4 py-2 text-sm font-medium text-foreground rounded-md hover:bg-accent"
                  onClick={() => setOpen(false)}
                >
                  About
                </Link>
                <Link
                  to="/contact"
                  className="block px-4 py-2 text-sm font-medium text-foreground rounded-md hover:bg-accent"
                  onClick={() => setOpen(false)}
                >
                  Contact
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
