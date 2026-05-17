import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — NORTH" },
      { name: "description", content: "Get in touch with the NORTH team — we typically reply within one business day." },
      { property: "og:title", content: "Contact NORTH" },
      { property: "og:description", content: "Reach our customer care team." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all fields");
      return;
    }
    toast.success("Message sent! We'll get back to you soon.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="scroll-reveal mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">Contact</p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">Let's talk.</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Questions about an order, a product, or just want to say hi? We'd love to hear from you.
        </p>
      </div>

      <div className="mt-12 grid gap-12 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-1">
          <div className="flex gap-4">
            <Mail className="h-5 w-5 shrink-0 text-primary" />
            <div>
              <h3 className="font-semibold">Email</h3>
              <p className="text-sm text-muted-foreground">hello@northgoods.co</p>
            </div>
          </div>
          <div className="flex gap-4">
            <Phone className="h-5 w-5 shrink-0 text-primary" />
            <div>
              <h3 className="font-semibold">Phone</h3>
              <p className="text-sm text-muted-foreground">+1 (415) 555-0142</p>
              <p className="text-xs text-muted-foreground">Mon–Fri, 9am–6pm PT</p>
            </div>
          </div>
          <div className="flex gap-4">
            <MapPin className="h-5 w-5 shrink-0 text-primary" />
            <div>
              <h3 className="font-semibold">Studio</h3>
              <p className="text-sm text-muted-foreground">450 Valencia St<br />San Francisco, CA 94103</p>
            </div>
          </div>
        </div>

        <form onSubmit={onSubmit} className="space-y-4 lg:col-span-2">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-2" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-2" />
            </div>
          </div>
          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" rows={6} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="mt-2" />
          </div>
          <Button type="submit" size="lg">Send message</Button>
        </form>
      </div>
    </div>
  );
}
