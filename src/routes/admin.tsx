import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Plus,
  Trash2,
  Save,
  LogOut,
  Package,
  Edit3,
  X,
  Check,
  ShieldCheck,
  Eye,
  EyeOff,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import productsData from "@/data/products.json";
import type { Product } from "@/context/CartContext";

// ─── Route ───────────────────────────────────────────────────────────────────

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — NORTH" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

// ─── Constants ───────────────────────────────────────────────────────────────

const ADMIN_USER = import.meta.env.VITE_ADMIN_USER;
const ADMIN_PASS = import.meta.env.VITE_ADMIN_PASS;
const SESSION_KEY = "north_admin_session";

const EMPTY_PRODUCT: Omit<Product, "id"> = {
  name: "",
  category: "",
  price: 0,
  image: "",
  description: "",
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function generateId() {
  return `prod_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

function loadProducts(): Product[] {
  try {
    const raw = localStorage.getItem("north_products");
    if (raw) return JSON.parse(raw) as Product[];
  } catch {}
  return productsData as Product[];
}

function saveProducts(products: Product[]) {
  localStorage.setItem("north_products", JSON.stringify(products));
}

// ─── Login Screen ─────────────────────────────────────────────────────────────

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    // Simulate network delay
    setTimeout(() => {
      if (username === ADMIN_USER && password === ADMIN_PASS) {
        sessionStorage.setItem(SESSION_KEY, "1");
        onLogin();
      } else {
        setError("Invalid credentials. Please try again.");
      }
      setLoading(false);
    }, 600);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        {/* Logo / Header */}
        <div className="mb-10 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-foreground text-background">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Admin Portal</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Sign in to manage your store
          </p>
        </div>

        {/* Form */}
        <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
          <div className="space-y-5">
            <div>
              <label className="mb-1.5 block text-sm font-medium">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none ring-offset-background transition focus:border-foreground focus:ring-2 focus:ring-foreground/20"
                placeholder="admin"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit(e as any)}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2.5 pr-10 text-sm outline-none ring-offset-background transition focus:border-foreground focus:ring-2 focus:ring-foreground/20"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPass((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPass ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2.5 text-sm text-destructive">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {error}
              </div>
            )}

            <Button
              className="w-full"
              onClick={handleSubmit}
              disabled={loading || !username || !password}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Signing in…
                </span>
              ) : (
                "Sign in"
              )}
            </Button>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          This area is restricted to store administrators.
        </p>
      </div>
    </div>
  );
}

// ─── Product Form Drawer ──────────────────────────────────────────────────────

interface ProductFormProps {
  initial: Product | null; // null = new product
  onSave: (p: Product) => void;
  onClose: () => void;
  categories: string[];
}

function ProductFormDrawer({
  initial,
  onSave,
  onClose,
  categories,
}: ProductFormProps) {
  const isNew = !initial;
  const [form, setForm] = useState<Product>(
    initial ?? { id: generateId(), ...EMPTY_PRODUCT },
  );
  const [errors, setErrors] = useState<Partial<Record<keyof Product, string>>>({});
  const [imgError, setImgError] = useState(false);

  function set<K extends keyof Product>(key: K, value: Product[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
    if (key === "image") setImgError(false);
  }

  function validate() {
    const e: typeof errors = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.category.trim()) e.category = "Category is required";
    if (!form.price || form.price <= 0) e.price = "Price must be > 0";
    if (!form.image.trim()) e.image = "Image URL is required";
    if (!form.description.trim()) e.description = "Description is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSave() {
    if (validate()) onSave(form);
  }

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  // Prevent body scroll while drawer is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px]"
        onClick={onClose}
      />

      {/* Drawer panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={isNew ? "Add product" : "Edit product"}
        className="fixed inset-y-0 right-0 z-50 flex h-screen w-full max-w-lg flex-col border-l border-border bg-background shadow-2xl overflow-hidden"
        style={{ animation: "slideInRight 0.22s cubic-bezier(0.25,0.46,0.45,0.94)" }}
      >
        <style>{`
          @keyframes slideInRight {
            from { transform: translateX(100%); }
            to   { transform: translateX(0); }
          }
        `}</style>

        {/* ── Header ── */}
        <div className="flex shrink-0 items-center justify-between border-b border-border px-6 py-5">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              {isNew ? "New product" : "Edit product"}
            </p>
            <h2 className="mt-0.5 text-lg font-semibold">
              {isNew ? "Add to catalogue" : form.name || "Untitled"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-accent hover:text-foreground"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* ── Scrollable body ── */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {/* Image preview hero */}
          <div className="mb-6 overflow-hidden rounded-xl border border-border bg-muted">
            {form.image && !imgError ? (
              <img
                key={form.image}
                src={form.image}
                alt="Preview"
                className="h-56 w-full object-cover"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="flex h-56 flex-col items-center justify-center gap-2 text-muted-foreground/40">
                <Package className="h-10 w-10" />
                <span className="text-xs">Image preview</span>
              </div>
            )}
          </div>

          <div className="space-y-5">
            <Field label="Product Name" error={errors.name}>
              <input
                autoFocus
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                className={inputCls(!!errors.name)}
                placeholder="e.g. Alpine Fleece Jacket"
              />
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Category" error={errors.category}>
                <input
                  list="category-list"
                  value={form.category}
                  onChange={(e) => set("category", e.target.value)}
                  className={inputCls(!!errors.category)}
                  placeholder="e.g. Outerwear"
                />
                <datalist id="category-list">
                  {categories.filter((c) => c !== "All").map((c) => (
                    <option key={c} value={c} />
                  ))}
                </datalist>
              </Field>

              <Field label="Price (USD)" error={errors.price}>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">$</span>
                  <input
                    type="number"
                    min={0}
                    step={0.01}
                    value={form.price || ""}
                    onChange={(e) => set("price", parseFloat(e.target.value) || 0)}
                    className={inputCls(!!errors.price) + " pl-7"}
                    placeholder="0.00"
                  />
                </div>
              </Field>
            </div>

            <Field label="Image URL" error={errors.image}>
              <input
                value={form.image}
                onChange={(e) => set("image", e.target.value)}
                className={inputCls(!!errors.image)}
                placeholder="https://images.unsplash.com/…"
              />
            </Field>

            <Field label="Description" error={errors.description}>
              <textarea
                value={form.description}
                onChange={(e) => set("description", e.target.value)}
                rows={4}
                className={inputCls(!!errors.description) + " resize-none leading-relaxed"}
                placeholder="Describe the product — materials, fit, use case…"
              />
            </Field>
          </div>
        </div>

        {/* ── Footer ── */}
        <div className="flex shrink-0 items-center justify-between gap-3 border-t border-border bg-muted/30 px-6 py-4">
          <Button variant="ghost" onClick={onClose} className="text-muted-foreground">
            Cancel
          </Button>
          <Button onClick={handleSave} className="min-w-35">
            <Check className="mr-1.5 h-4 w-4" />
            {isNew ? "Add Product" : "Save Changes"}
          </Button>
        </div>
      </div>
    </>
  );
}

// ─── Small UI Helpers ─────────────────────────────────────────────────────────

function inputCls(hasError: boolean) {
  return [
    "w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none ring-offset-background transition",
    "focus:ring-2 focus:ring-foreground/20",
    hasError
      ? "border-destructive focus:border-destructive"
      : "border-border focus:border-foreground",
  ].join(" ");
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium">{label}</label>
      {children}
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}

// ─── Delete Confirm ──────────────────────────────

function DeleteConfirm({
  product,
  onConfirm,
  onCancel,
}: {
  product: Product;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-background p-6 shadow-2xl">
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10">
          <Trash2 className="h-5 w-5 text-destructive" />
        </div>
        <h2 className="font-semibold">Delete product?</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          "<span className="font-medium text-foreground">{product.name}</span>"
          will be permanently removed from the store.
        </p>
        <div className="mt-6 flex gap-3">
          <Button variant="ghost" className="flex-1" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            className="flex-1"
            onClick={onConfirm}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Toast ──────────────────────

function Toast({ message }: { message: string }) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-xl border border-border bg-foreground px-4 py-3 text-sm font-medium text-background shadow-lg animate-in fade-in slide-in-from-bottom-2">
      <Check className="h-4 w-4" />
      {message}
    </div>
  );
}

// ─── Dashboard (logged in) ───────────────────────────

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [products, setProducts] = useState<Product[]>(loadProducts);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [editingProduct, setEditingProduct] = useState<Product | null | "new">(
    null,
  );
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [unsaved, setUnsaved] = useState(false);

  const categories = [
    "All",
    ...Array.from(new Set(products.map((p) => p.category))),
  ];

  const filtered = products.filter((p) => {
    const matchSearch =
      !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());
    const matchCat = categoryFilter === "All" || p.category === categoryFilter;
    return matchSearch && matchCat;
  });

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  }

  function handleSaveProduct(product: Product) {
    setProducts((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      return exists
        ? prev.map((p) => (p.id === product.id ? product : p))
        : [...prev, product];
    });
    setEditingProduct(null);
    setUnsaved(true);
    showToast(
      editingProduct === "new" ? "Product added" : "Product updated",
    );
  }

  function handleDelete() {
    if (!deletingProduct) return;
    setProducts((prev) => prev.filter((p) => p.id !== deletingProduct.id));
    setDeletingProduct(null);
    setUnsaved(true);
    showToast("Product deleted");
  }

  function handlePublish() {
    saveProducts(products);
    setUnsaved(false);
    showToast("Changes published to store");
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top Nav */}
      <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground text-background">
              <Package className="h-4 w-4" />
            </div>
            <div>
              <span className="text-sm font-semibold">NORTH</span>
              <span className="ml-2 rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                Admin
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {unsaved && (
              <span className="hidden items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700 sm:flex dark:border-amber-800 dark:bg-amber-950 dark:text-amber-400">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-500" />
                Unpublished changes
              </span>
            )}
            <Button
              size="sm"
              disabled={!unsaved}
              onClick={handlePublish}
            >
              <Save className="mr-1.5 h-3.5 w-3.5" />
              Publish
            </Button>
            <Button size="sm" variant="ghost" onClick={onLogout}>
              <LogOut className="mr-1.5 h-3.5 w-3.5" />
              Sign out
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Products</h1>
            <p className="mt-0.5 text-sm text-muted-foreground">
              {products.length} total · {filtered.length} shown
            </p>
          </div>
          <Button onClick={() => setEditingProduct("new")}>
            <Plus className="mr-1.5 h-4 w-4" />
            Add Product
          </Button>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products…"
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none transition focus:border-foreground focus:ring-2 focus:ring-foreground/20 sm:max-w-xs"
          />
          <div className="flex gap-2 overflow-x-auto">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategoryFilter(c)}
                className={[
                  "shrink-0 rounded-full border px-3 py-1 text-xs font-medium transition",
                  categoryFilter === c
                    ? "border-foreground bg-foreground text-background"
                    : "border-border bg-background text-muted-foreground hover:border-foreground hover:text-foreground",
                ].join(" ")}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Product Table */}
        {filtered.length === 0 ? (
          <div className="flex h-64 flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border text-muted-foreground">
            <Package className="h-8 w-8 opacity-30" />
            <p className="text-sm">No products found.</p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border border-border">
            {/* Header row */}
            <div className="hidden grid-cols-[80px_1fr_140px_100px_80px_80px] gap-4 border-b border-border bg-muted/40 px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground sm:grid">
              <span>Image</span>
              <span>Name</span>
              <span>Category</span>
              <span>Price</span>
              <span className="text-center">Edit</span>
              <span className="text-center">Delete</span>
            </div>

            {/* Rows */}
            <div className="divide-y divide-border">
              {filtered.map((product) => (
                <ProductRow
                  key={product.id}
                  product={product}
                  onEdit={() => setEditingProduct(product)}
                  onDelete={() => setDeletingProduct(product)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Info banner */}
        <p className="mt-6 text-center text-xs text-muted-foreground">
          Changes are saved locally. Click{" "}
          <strong className="text-foreground">Publish</strong> to make them
          live in the shop. Refreshing the page without publishing will keep
          edits in this session.
        </p>
      </main>

      {/* Modals */}
      {editingProduct !== null && (
        <ProductFormDrawer
          initial={editingProduct === "new" ? null : editingProduct}
          onSave={handleSaveProduct}
          onClose={() => setEditingProduct(null)}
          categories={categories}
        />
      )}

      {deletingProduct && (
        <DeleteConfirm
          product={deletingProduct}
          onConfirm={handleDelete}
          onCancel={() => setDeletingProduct(null)}
        />
      )}

      {toast && <Toast message={toast} />}
    </div>
  );
}

// ─── Product Row ──────────────────────────────────────────────────────────────

function ProductRow({
  product,
  onEdit,
  onDelete,
}: {
  product: Product;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="group flex flex-col gap-3 px-4 py-3 transition hover:bg-muted/30 sm:grid sm:grid-cols-[80px_1fr_140px_100px_80px_80px] sm:items-center sm:gap-4">
      {/* Image */}
      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-border bg-muted">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
            onError={(e) =>
              ((e.currentTarget as HTMLImageElement).style.display = "none")
            }
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Package className="h-6 w-6 text-muted-foreground/30" />
          </div>
        )}
      </div>

      {/* Name + description */}
      <div className="min-w-0">
        <p className="truncate font-medium">{product.name}</p>
        <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
          {product.description}
        </p>
      </div>

      {/* Category */}
      <span className="w-fit rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground">
        {product.category}
      </span>

      {/* Price */}
      <span className="text-sm font-semibold">${product.price.toFixed(2)}</span>

      {/* Edit */}
      <div className="sm:text-center">
        <button
          onClick={onEdit}
          className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition hover:bg-accent hover:text-foreground"
          aria-label={`Edit ${product.name}`}
        >
          <Edit3 className="h-4 w-4" />
        </button>
      </div>

      {/* Delete */}
      <div className="sm:text-center">
        <button
          onClick={onDelete}
          className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition hover:bg-destructive/10 hover:text-destructive"
          aria-label={`Delete ${product.name}`}
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

// ─── Page Root ────────────────────────────────────────────────────────────────

function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(
    () => sessionStorage.getItem(SESSION_KEY) === "1",
  );

  function handleLogout() {
    sessionStorage.removeItem(SESSION_KEY);
    setLoggedIn(false);
  }

  if (!loggedIn) {
    return <LoginScreen onLogin={() => setLoggedIn(true)} />;
  }

  return <Dashboard onLogout={handleLogout} />;
}