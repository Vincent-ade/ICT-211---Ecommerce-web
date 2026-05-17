import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { B as Button } from "./button-D6WrmDmR.mjs";
import { p as productsData } from "./products-DdBZ0WOP.mjs";
import { e as ShieldCheck, E as EyeOff, f as Eye, g as CircleAlert, h as Package, i as Save, L as LogOut, d as Plus, j as PenLine, T as Trash2, X, C as Check } from "../_libs/lucide-react.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "./router-CGgALqAa.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/tailwind-merge.mjs";
const ADMIN_USER = "admin";
const ADMIN_PASS = "north2025";
const SESSION_KEY = "north_admin_session";
const EMPTY_PRODUCT = {
  name: "",
  category: "",
  price: 0,
  image: "",
  description: ""
};
function generateId() {
  return `prod_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}
function loadProducts() {
  try {
    const raw = localStorage.getItem("north_products");
    if (raw) return JSON.parse(raw);
  } catch {
  }
  return productsData;
}
function saveProducts(products) {
  localStorage.setItem("north_products", JSON.stringify(products));
}
function LoginScreen({
  onLogin
}) {
  const [username, setUsername] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [showPass, setShowPass] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-10 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-foreground text-background", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-6 w-6" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold tracking-tight", children: "Admin Portal" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Sign in to manage your store" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl border border-border bg-card p-8 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1.5 block text-sm font-medium", children: "Username" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: username, onChange: (e) => setUsername(e.target.value), autoComplete: "username", className: "w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none ring-offset-background transition focus:border-foreground focus:ring-2 focus:ring-foreground/20", placeholder: "admin" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1.5 block text-sm font-medium", children: "Password" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: showPass ? "text" : "password", value: password, onChange: (e) => setPassword(e.target.value), autoComplete: "current-password", onKeyDown: (e) => e.key === "Enter" && handleSubmit(e), className: "w-full rounded-lg border border-border bg-background px-3 py-2.5 pr-10 text-sm outline-none ring-offset-background transition focus:border-foreground focus:ring-2 focus:ring-foreground/20", placeholder: "••••••••" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setShowPass((v) => !v), className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground", children: showPass ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" }) })
        ] })
      ] }),
      error && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2.5 text-sm text-destructive", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-4 w-4 shrink-0" }),
        error
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "w-full", onClick: handleSubmit, disabled: loading || !username || !password, children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" }),
        "Signing in…"
      ] }) : "Sign in" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-center text-xs text-muted-foreground", children: "This area is restricted to store administrators." })
  ] }) });
}
function ProductFormDrawer({
  initial,
  onSave,
  onClose,
  categories
}) {
  const isNew = !initial;
  const [form, setForm] = reactExports.useState(initial ?? {
    id: generateId(),
    ...EMPTY_PRODUCT
  });
  const [errors, setErrors] = reactExports.useState({});
  const [imgError, setImgError] = reactExports.useState(false);
  function set(key, value) {
    setForm((f) => ({
      ...f,
      [key]: value
    }));
    setErrors((e) => ({
      ...e,
      [key]: void 0
    }));
    if (key === "image") setImgError(false);
  }
  function validate() {
    const e = {};
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
  reactExports.useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);
  reactExports.useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px]", onClick: onClose }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { role: "dialog", "aria-modal": "true", "aria-label": isNew ? "Add product" : "Edit product", className: "fixed inset-y-0 right-0 z-50 flex h-screen w-full max-w-lg flex-col border-l border-border bg-background shadow-2xl overflow-hidden", style: {
      animation: "slideInRight 0.22s cubic-bezier(0.25,0.46,0.45,0.94)"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
          @keyframes slideInRight {
            from { transform: translateX(100%); }
            to   { transform: translateX(0); }
          }
        ` }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex shrink-0 items-center justify-between border-b border-border px-6 py-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium uppercase tracking-widest text-muted-foreground", children: isNew ? "New product" : "Edit product" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-0.5 text-lg font-semibold", children: isNew ? "Add to catalogue" : form.name || "Untitled" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, className: "flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-accent hover:text-foreground", "aria-label": "Close", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto px-6 py-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6 overflow-hidden rounded-xl border border-border bg-muted", children: form.image && !imgError ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: form.image, alt: "Preview", className: "h-56 w-full object-cover", onError: () => setImgError(true) }, form.image) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-56 flex-col items-center justify-center gap-2 text-muted-foreground/40", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-10 w-10" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: "Image preview" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Product Name", error: errors.name, children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { autoFocus: true, value: form.name, onChange: (e) => set("name", e.target.value), className: inputCls(!!errors.name), placeholder: "e.g. Alpine Fleece Jacket" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { label: "Category", error: errors.category, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { list: "category-list", value: form.category, onChange: (e) => set("category", e.target.value), className: inputCls(!!errors.category), placeholder: "e.g. Outerwear" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("datalist", { id: "category-list", children: categories.filter((c) => c !== "All").map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: c }, c)) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Price (USD)", error: errors.price, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground", children: "$" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", min: 0, step: 0.01, value: form.price || "", onChange: (e) => set("price", parseFloat(e.target.value) || 0), className: inputCls(!!errors.price) + " pl-7", placeholder: "0.00" })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Image URL", error: errors.image, children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: form.image, onChange: (e) => set("image", e.target.value), className: inputCls(!!errors.image), placeholder: "https://images.unsplash.com/…" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Description", error: errors.description, children: /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: form.description, onChange: (e) => set("description", e.target.value), rows: 4, className: inputCls(!!errors.description) + " resize-none leading-relaxed", placeholder: "Describe the product — materials, fit, use case…" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex shrink-0 items-center justify-between gap-3 border-t border-border bg-muted/30 px-6 py-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", onClick: onClose, className: "text-muted-foreground", children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: handleSave, className: "min-w-35", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "mr-1.5 h-4 w-4" }),
          isNew ? "Add Product" : "Save Changes"
        ] })
      ] })
    ] })
  ] });
}
function inputCls(hasError) {
  return ["w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none ring-offset-background transition", "focus:ring-2 focus:ring-foreground/20", hasError ? "border-destructive focus:border-destructive" : "border-border focus:border-foreground"].join(" ");
}
function Field({
  label,
  error,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1.5 block text-sm font-medium", children: label }),
    children,
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-destructive", children: error })
  ] });
}
function DeleteConfirm({
  product,
  onConfirm,
  onCancel
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-sm rounded-2xl border border-border bg-background p-6 shadow-2xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-5 w-5 text-destructive" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold", children: "Delete product?" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-sm text-muted-foreground", children: [
      '"',
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: product.name }),
      '" will be permanently removed from the store.'
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", className: "flex-1", onClick: onCancel, children: "Cancel" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "destructive", className: "flex-1", onClick: onConfirm, children: "Delete" })
    ] })
  ] }) });
}
function Toast({
  message
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-xl border border-border bg-foreground px-4 py-3 text-sm font-medium text-background shadow-lg animate-in fade-in slide-in-from-bottom-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" }),
    message
  ] });
}
function Dashboard({
  onLogout
}) {
  const [products, setProducts] = reactExports.useState(loadProducts);
  const [search, setSearch] = reactExports.useState("");
  const [categoryFilter, setCategoryFilter] = reactExports.useState("All");
  const [editingProduct, setEditingProduct] = reactExports.useState(null);
  const [deletingProduct, setDeletingProduct] = reactExports.useState(null);
  const [toast, setToast] = reactExports.useState(null);
  const [unsaved, setUnsaved] = reactExports.useState(false);
  const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))];
  const filtered = products.filter((p) => {
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase());
    const matchCat = categoryFilter === "All" || p.category === categoryFilter;
    return matchSearch && matchCat;
  });
  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  }
  function handleSaveProduct(product) {
    setProducts((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      return exists ? prev.map((p) => p.id === product.id ? product : p) : [...prev, product];
    });
    setEditingProduct(null);
    setUnsaved(true);
    showToast(editingProduct === "new" ? "Product added" : "Product updated");
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-8 w-8 items-center justify-center rounded-lg bg-foreground text-background", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-4 w-4" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold", children: "NORTH" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground", children: "Admin" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        unsaved && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "hidden items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700 sm:flex dark:border-amber-800 dark:bg-amber-950 dark:text-amber-400", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 animate-pulse rounded-full bg-amber-500" }),
          "Unpublished changes"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", disabled: !unsaved, onClick: handlePublish, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "mr-1.5 h-3.5 w-3.5" }),
          "Publish"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "ghost", onClick: onLogout, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "mr-1.5 h-3.5 w-3.5" }),
          "Sign out"
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold tracking-tight", children: "Products" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-0.5 text-sm text-muted-foreground", children: [
            products.length,
            " total · ",
            filtered.length,
            " shown"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => setEditingProduct("new"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-1.5 h-4 w-4" }),
          "Add Product"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 flex flex-col gap-3 sm:flex-row sm:items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: search, onChange: (e) => setSearch(e.target.value), placeholder: "Search products…", className: "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none transition focus:border-foreground focus:ring-2 focus:ring-foreground/20 sm:max-w-xs" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 overflow-x-auto", children: categories.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setCategoryFilter(c), className: ["shrink-0 rounded-full border px-3 py-1 text-xs font-medium transition", categoryFilter === c ? "border-foreground bg-foreground text-background" : "border-border bg-background text-muted-foreground hover:border-foreground hover:text-foreground"].join(" "), children: c }, c)) })
      ] }),
      filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-64 flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-8 w-8 opacity-30" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "No products found." })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden rounded-xl border border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden grid-cols-[80px_1fr_140px_100px_80px_80px] gap-4 border-b border-border bg-muted/40 px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground sm:grid", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Image" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Category" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Price" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-center", children: "Edit" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-center", children: "Delete" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", children: filtered.map((product) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProductRow, { product, onEdit: () => setEditingProduct(product), onDelete: () => setDeletingProduct(product) }, product.id)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-6 text-center text-xs text-muted-foreground", children: [
        "Changes are saved locally. Click",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Publish" }),
        " to make them live in the shop. Refreshing the page without publishing will keep edits in this session."
      ] })
    ] }),
    editingProduct !== null && /* @__PURE__ */ jsxRuntimeExports.jsx(ProductFormDrawer, { initial: editingProduct === "new" ? null : editingProduct, onSave: handleSaveProduct, onClose: () => setEditingProduct(null), categories }),
    deletingProduct && /* @__PURE__ */ jsxRuntimeExports.jsx(DeleteConfirm, { product: deletingProduct, onConfirm: handleDelete, onCancel: () => setDeletingProduct(null) }),
    toast && /* @__PURE__ */ jsxRuntimeExports.jsx(Toast, { message: toast })
  ] });
}
function ProductRow({
  product,
  onEdit,
  onDelete
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group flex flex-col gap-3 px-4 py-3 transition hover:bg-muted/30 sm:grid sm:grid-cols-[80px_1fr_140px_100px_80px_80px] sm:items-center sm:gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-border bg-muted", children: product.image ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: product.image, alt: product.name, className: "h-full w-full object-cover", onError: (e) => e.currentTarget.style.display = "none" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-full w-full items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-6 w-6 text-muted-foreground/30" }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate font-medium", children: product.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 line-clamp-1 text-xs text-muted-foreground", children: product.description })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-fit rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground", children: product.category }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-semibold", children: [
      "$",
      product.price.toFixed(2)
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sm:text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onEdit, className: "inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition hover:bg-accent hover:text-foreground", "aria-label": `Edit ${product.name}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(PenLine, { className: "h-4 w-4" }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sm:text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onDelete, className: "inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition hover:bg-destructive/10 hover:text-destructive", "aria-label": `Delete ${product.name}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) }) })
  ] });
}
function AdminPage() {
  const [loggedIn, setLoggedIn] = reactExports.useState(() => sessionStorage.getItem(SESSION_KEY) === "1");
  function handleLogout() {
    sessionStorage.removeItem(SESSION_KEY);
    setLoggedIn(false);
  }
  if (!loggedIn) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(LoginScreen, { onLogin: () => setLoggedIn(true) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dashboard, { onLogout: handleLogout });
}
export {
  AdminPage as component
};
