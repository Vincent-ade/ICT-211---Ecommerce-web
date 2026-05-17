import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import { ScrollToTop } from "@/components/ScrollToTop";
import Layout from "@/routes/Layout";

const Home = lazy(() => import("@/routes/index"));
const Shop = lazy(() => import("@/routes/shop"));
const ProductDetail = lazy(() => import("@/routes/product.$id"));
const Login = lazy(() => import("@/routes/login"));
const Register = lazy(() => import("@/routes/register"));
const Cart = lazy(() => import("@/routes/cart"));
const Checkout = lazy(() => import("@/routes/checkout"));
const Contact = lazy(() => import("@/routes/contact"));
const About = lazy(() => import("@/routes/about"));
const Admin = lazy(() => import("@/routes/admin"));
const NotFound = lazy(() => import("@/routes/404"));

function LoadingSpinner() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-border border-t-primary mx-auto"></div>
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {/* Admin gets no navbar/footer */}
            <Route path="/admin" element={<Admin />} />

            {/* All other routes use the Layout */}
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </CartProvider>
  );
}