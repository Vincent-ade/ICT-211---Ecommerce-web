import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/context/CartContext";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — NORTH" }] }),
  component: Checkout,
});

type FormState = {
  name: string;
  email: string;
  address: string;
  city: string;
  zip: string;
  card: string;
  expiry: string;
  cvc: string;
};

function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    card: "",
    expiry: "",
    cvc: "",
  });
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const validate = () => {
    const e: Partial<FormState> = {};
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

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      clearCart();
      setSubmitted(true);
      setLoading(false);
    }, 1000);
  };

  if (items.length === 0 && !submitted) {
    return (
      <div className="mx-auto max-w-md py-24 text-center">
        <h1 className="text-2xl font-bold">Your cart is empty</h1>
        <Button className="mt-6" onClick={() => navigate({ to: "/shop" })}>
          Go to shop
        </Button>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-md px-4 py-24 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Check className="h-8 w-8" />
        </div>
        <h1 className="mt-6 text-3xl font-bold">Order placed!</h1>
        <p className="mt-2 text-muted-foreground">
          Thanks {form.name.split(" ")[0]}, we sent a confirmation to {form.email}.
        </p>
        <Button className="mt-8" onClick={() => navigate({ to: "/" })}>
          Back home
        </Button>
      </div>
    );
  }

  const shipping = totalPrice >= 50 ? 0 : 5.99;
  const tax = totalPrice * 0.08;
  const grandTotal = totalPrice + shipping + tax;

  return (
    <div className="scroll-reveal mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold tracking-tight">Checkout</h1>

      <form onSubmit={onSubmit} className="scroll-reveal mt-10 grid gap-12 lg:grid-cols-[1fr_360px]">
        <div className="space-y-8">
          <section>
            <h2 className="text-lg font-semibold">Contact & shipping</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field label="Full name" name="name" value={form.name} onChange={onChange} error={errors.name} />
              <Field label="Email" name="email" type="email" value={form.email} onChange={onChange} error={errors.email} />
              <div className="sm:col-span-2">
                <Field label="Address" name="address" value={form.address} onChange={onChange} error={errors.address} />
              </div>
              <Field label="City" name="city" value={form.city} onChange={onChange} error={errors.city} />
              <Field label="ZIP / Postal" name="zip" value={form.zip} onChange={onChange} error={errors.zip} />
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold">Payment</h2>
            <p className="text-xs text-muted-foreground">Demo only — no real payment is processed.</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Field label="Card number" name="card" placeholder="1234 5678 9012 3456" value={form.card} onChange={onChange} error={errors.card} />
              </div>
              <Field label="Expiry (MM/YY)" name="expiry" placeholder="08/28" value={form.expiry} onChange={onChange} error={errors.expiry} />
              <Field label="CVC" name="cvc" placeholder="123" value={form.cvc} onChange={onChange} error={errors.cvc} />
            </div>
          </section>
        </div>

        <aside className="h-fit rounded-lg border border-border bg-card p-6">
          <h2 className="text-lg font-semibold">Summary</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {items.map((i) => (
              <li key={i.id} className="flex justify-between">
                <span className="text-muted-foreground">
                  {i.name} × {i.quantity}
                </span>
                <span>${(i.price * i.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <dl className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
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
          <Button type="submit" size="lg" className="mt-6 w-full" disabled={loading}>
            {loading ? "Placing order..." : `Pay $${grandTotal.toFixed(2)}`}
          </Button>
        </aside>
      </form>
    </div>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  error,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <Label htmlFor={name} className="text-sm">{label}</Label>
      <Input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="mt-1.5"
        aria-invalid={!!error}
      />
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}
