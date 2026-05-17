import { Outlet, useLocation } from "react-router-dom";
import { Suspense } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";

function PageLoader() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="text-center">
        <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-border border-t-primary mx-auto"></div>
        <p className="text-sm text-muted-foreground">Loading page...</p>
      </div>
    </div>
  );
}

export default function Layout() {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </main>
      <ScrollReveal triggerKey={location.pathname} />
      <Footer />
    </div>
  );
}