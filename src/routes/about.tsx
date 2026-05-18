import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Leaf, Package, Users, Sparkles } from "lucide-react";

export default function AboutPage() {
  const values = [
    { icon: Leaf, title: "Sustainable", text: "Responsibly sourced materials with traceable supply chains." },
    { icon: Package, title: "Built to last", text: "Designed and constructed for years of everyday wear." },
    { icon: Users, title: "Fair partners", text: "Long-term relationships with workshops we visit personally." },
    { icon: Sparkles, title: "Honest pricing", text: "Direct-to-you pricing — never marked up to be marked down." },
  ];

  return (
    <div>
      <section className="scroll-reveal border-b border-border bg-secondary">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">Our story</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Essentials made with intention.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            NORTH was founded in 2021 on a simple idea: everyday objects should be beautiful, durable,
            and accessible. We work directly with small workshops to bring you considered pieces — without the markup.
          </p>
        </div>
      </section>

      <section className="scroll-reveal mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="aspect-4/5 overflow-hidden rounded-2xl bg-muted">
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=900&q=80"
              alt="Our workshop"
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold tracking-tight">A different kind of brand.</h2>
            <p className="mt-4 text-muted-foreground">
              We believe in slow design. Each product takes months to develop — refining materials,
              testing prototypes, listening to feedback. The result is a small but considered collection
              you can rely on.
            </p>
            <p className="mt-4 text-muted-foreground">
              We don't chase trends. We don't release new colors every week. We build pieces that earn
              their place in your daily life and stay there for years.
            </p>
            <Button asChild className="mt-6">
              <Link to="/shop">Explore the collection</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="scroll-reveal border-t border-border bg-secondary">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight">What we stand for</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title} className="rounded-xl border border-border bg-background p-6">
                <v.icon className="h-6 w-6 text-primary" />
                <h3 className="mt-4 font-semibold">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="mt-12 border-t border-border bg-background">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="max-w-3xl">
              <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">FAQ</p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight">Questions we hear most often</h2>
            </div>
            <p className="max-w-3xl text-sm text-muted-foreground">
              Answers to our most common questions about shipping, returns, and the NORTH experience.
            </p>
          </div>

          <Accordion type="single" collapsible className="mt-10 mx-auto max-w-3xl space-y-4">
            <AccordionItem value="shipping">
              <AccordionTrigger>Do you offer free shipping?</AccordionTrigger>
              <AccordionContent>
                Yes — we offer free standard shipping on all orders over $50. For smaller orders, shipping is calculated at checkout based on your location.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="returns">
              <AccordionTrigger>What is your return policy?</AccordionTrigger>
              <AccordionContent>
                You can return any full-price item within 30 days for a full refund. We also offer easy exchanges and store credit for sale items.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="production">
              <AccordionTrigger>How long does production take?</AccordionTrigger>
              <AccordionContent>
                Because we partner with small workshops, most orders ship within 3-5 business days. We always communicate updates and tracking details by email.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="materials">
              <AccordionTrigger>Where do your materials come from?</AccordionTrigger>
              <AccordionContent>
                We source materials from trusted partners in Europe and the U.S. whenever possible, focusing on sustainable and durable fibers with transparent traceability.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>    </div>
  );
}
