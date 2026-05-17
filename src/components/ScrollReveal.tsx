import { useEffect } from "react";

export function ScrollReveal({ triggerKey }: { triggerKey: string }) {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>(".scroll-reveal"));
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("scroll-reveal-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0, rootMargin: "0px 0px -50px 0px" },
    );

    elements.forEach((el) => {
      if (!el.classList.contains("scroll-reveal-visible")) {
        observer.observe(el);
      }
    });

    // Fallback: force-reveal anything still hidden after 1s
    const fallback = setTimeout(() => {
      document.querySelectorAll<HTMLElement>(".scroll-reveal:not(.scroll-reveal-visible)")
        .forEach(el => el.classList.add("scroll-reveal-visible"));
    }, 1000);

    return () => {
      observer.disconnect();
      clearTimeout(fallback);
    };
  }, [triggerKey]);

  return null;
}