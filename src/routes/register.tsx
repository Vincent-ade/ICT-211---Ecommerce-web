import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [{ title: "Create account — NORTH" }] }),
  component: Register,
});

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Name required";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = "Enter a valid email";
    if (form.password.length < 6) errs.password = "Min 6 characters";
    if (form.password !== form.confirm) errs.confirm = "Passwords don't match";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setLoading(true);
    setTimeout(() => navigate({ to: "/" }), 600);
  };

  return (
    <div className="scroll-reveal mx-auto flex min-h-[70vh] max-w-md items-center px-4 py-12">
      <div className="w-full">
        <h1 className="text-3xl font-bold tracking-tight">Create account</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Join us and start shopping today.
        </p>

        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          {(["name", "email", "password", "confirm"] as const).map((field) => (
            <div key={field}>
              <Label htmlFor={field} className="capitalize">
                {field === "confirm" ? "Confirm password" : field}
              </Label>
              <Input
                id={field}
                name={field}
                type={field.includes("password") || field === "confirm" ? "password" : field === "email" ? "email" : "text"}
                value={form[field]}
                onChange={onChange}
                className="mt-1.5"
              />
              {errors[field] && <p className="mt-1 text-xs text-destructive">{errors[field]}</p>}
            </div>
          ))}
          <Button type="submit" className="w-full" size="lg" disabled={loading}>
            {loading ? "Creating account..." : "Create account"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-foreground hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
