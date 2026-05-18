import { useEffect } from "react";

export function ScrollReveal({ triggerKey }: { triggerKey: string }) {
  useEffect(() => {
    // Small delay to ensure DOM is fully painted before observing
    const init = setTimeout(() => {
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
        { threshold: 0, rootMargin: "0px 0px -40px 0px" },
      );

      elements.forEach((el) => {
        if (!el.classList.contains("scroll-reveal-visible")) {
          observer.observe(el);
        }
      });

      // Fallback: force-reveal anything still hidden after 800ms
      const fallback = setTimeout(() => {
        document.querySelectorAll<HTMLElement>(".scroll-reveal:not(.scroll-reveal-visible)")
          .forEach((el) => el.classList.add("scroll-reveal-visible"));
      }, 800);

      return () => {
        observer.disconnect();
        clearTimeout(fallback);
      };
    }, 60);

    return () => clearTimeout(init);
  }, [triggerKey]);

  return null;
}