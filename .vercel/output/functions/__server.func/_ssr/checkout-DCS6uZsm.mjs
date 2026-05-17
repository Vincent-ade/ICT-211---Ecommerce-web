import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { B as Button } from "./button-D6WrmDmR.mjs";
import { I as Input } from "./input-DKfHaLFt.mjs";
import { L as Label } from "./label-C3mh4Jzc.mjs";
import { u as useCart } from "./router-CGgALqAa.mjs";
import { C as Check } from "../_libs/lucide-react.mjs";
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
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
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
function Checkout() {
  const {
    items,
    totalPrice,
    clearCart
  } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = reactExports.useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    card: "",
    expiry: "",
    cvc: ""
  });
  const [errors, setErrors] = reactExports.useState({});
  const [submitted, setSubmitted] = reactExports.useState(false);
  const [loading, setLoading] = reactExports.useState(false);
  const onChange = (e) => setForm((f) => ({
    ...f,
    [e.target.name]: e.target.value
  }));
  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Valid email required";
    if (!form.address.trim()) e.address = "Address required";
    if (!form.city.trim()) e.city = "City required";
    if (!/^\d{4,10}$/.test(form.zip)) e.zip = "Valid ZIP code required";
    if (!/^\d{12,19}$/.test(form.card.replace(/\s/g, ""))) e.card = "Valid card number required";
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(form.expiry)) e.expiry = "MM/YY";
    if (!/^\d{3,4}$/.test(form.cvc)) e.cvc = "CVC required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      clearCart();
      setSubmitted(true);
      setLoading(false);
    }, 1e3);
  };
  if (items.length === 0 && !submitted) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-md py-24 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold", children: "Your cart is empty" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "mt-6", onClick: () => navigate({
        to: "/shop"
      }), children: "Go to shop" })
    ] });
  }
  if (submitted) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-md px-4 py-24 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-8 w-8" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-6 text-3xl font-bold", children: "Order placed!" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-muted-foreground", children: [
        "Thanks ",
        form.name.split(" ")[0],
        ", we sent a confirmation to ",
        form.email,
        "."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "mt-8", onClick: () => navigate({
        to: "/"
      }), children: "Back home" })
    ] });
  }
  const shipping = totalPrice >= 50 ? 0 : 5.99;
  const tax = totalPrice * 0.08;
  const grandTotal = totalPrice + shipping + tax;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "scroll-reveal mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-bold tracking-tight", children: "Checkout" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit, className: "scroll-reveal mt-10 grid gap-12 lg:grid-cols-[1fr_360px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold", children: "Contact & shipping" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid gap-4 sm:grid-cols-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Full name", name: "name", value: form.name, onChange, error: errors.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Email", name: "email", type: "email", value: form.email, onChange, error: errors.email }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sm:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Address", name: "address", value: form.address, onChange, error: errors.address }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "City", name: "city", value: form.city, onChange, error: errors.city }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "ZIP / Postal", name: "zip", value: form.zip, onChange, error: errors.zip })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold", children: "Payment" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Demo only — no real payment is processed." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid gap-4 sm:grid-cols-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sm:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Card number", name: "card", placeholder: "1234 5678 9012 3456", value: form.card, onChange, error: errors.card }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Expiry (MM/YY)", name: "expiry", placeholder: "08/28", value: form.expiry, onChange, error: errors.expiry }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "CVC", name: "cvc", placeholder: "123", value: form.cvc, onChange, error: errors.cvc })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "h-fit rounded-lg border border-border bg-card p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold", children: "Summary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-4 space-y-3 text-sm", children: items.map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
            i.name,
            " × ",
            i.quantity
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "$",
            (i.price * i.quantity).toFixed(2)
          ] })
        ] }, i.id)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("dl", { className: "mt-4 space-y-2 border-t border-border pt-4 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-muted-foreground", children: "Shipping" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { children: shipping === 0 ? "Free" : `$${shipping.toFixed(2)}` })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-muted-foreground", children: "Tax" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("dd", { children: [
              "$",
              tax.toFixed(2)
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex justify-between border-t border-border pt-4 text-base font-semibold", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "$",
            grandTotal.toFixed(2)
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", size: "lg", className: "mt-6 w-full", disabled: loading, children: loading ? "Placing order..." : `Pay $${grandTotal.toFixed(2)}` })
      ] })
    ] })
  ] });
}
function Field({
  label,
  name,
  value,
  onChange,
  error,
  type = "text",
  placeholder
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: name, className: "text-sm", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: name, name, type, value, onChange, placeholder, className: "mt-1.5", "aria-invalid": !!error }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-destructive", children: error })
  ] });
}
export {
  Checkout as component
};
