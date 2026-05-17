import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useCart } from "./router-CGgALqAa.mjs";
import { B as Button } from "./button-D6WrmDmR.mjs";
function ProductCard({ product }) {
  const { addToCart } = useCart();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-shadow hover:shadow-lg", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/product/$id",
        params: { id: product.id },
        className: "relative block aspect-square overflow-hidden bg-muted",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: product.image,
            alt: product.name,
            loading: "lazy",
            className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 flex-col gap-3 p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-wide text-muted-foreground", children: product.category }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/product/$id",
            params: { id: product.id },
            className: "mt-1 line-clamp-1 text-sm font-medium text-foreground hover:underline",
            children: product.name
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-auto flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-base font-semibold text-foreground", children: [
          "$",
          product.price.toFixed(2)
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            size: "sm",
            onClick: (e) => {
              e.preventDefault();
              addToCart(product);
            },
            children: "Add"
          }
        )
      ] })
    ] })
  ] });
}
export {
  ProductCard as P
};
