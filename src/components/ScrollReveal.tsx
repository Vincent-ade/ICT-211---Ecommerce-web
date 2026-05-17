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
      { threshold: 0.18 },
    );

    elements.forEach((el) => {
      if (!el.classList.contains("scroll-reveal-visible")) {
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, [triggerKey]);

  return null;
}
