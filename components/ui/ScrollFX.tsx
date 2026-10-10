"use client";
import { useEffect } from "react";

// Adds a soft reveal to content as it scrolls into view, and a light glow that follows the mouse on cards.
// Everything stays visible if JavaScript fails or the visitor prefers reduced motion.
export default function ScrollFX() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let io: IntersectionObserver | undefined;
    if (!reduce && "IntersectionObserver" in window) {
      const sel = ".about .wrap > *, .steps .st, .bgrid .bc, .founders .wrap > *, .contact .wrap > *, .phero .wrap > *, .svc .sv, .offers > *, .tr, .get > *, .eng > *, .ar, .tile, .pgrid > *, .faq details, section > .wrap > h2, section > .wrap > .eyebrow";
      const els = Array.from(document.querySelectorAll<HTMLElement>(sel));
      io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement;
            el.setAttribute("data-r", "in");
            io?.unobserve(el);
            window.setTimeout(() => el.removeAttribute("data-r"), 1200);
          }
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
      els.forEach((el, i) => {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight * 0.92) return; // already on screen: leave visible
        el.style.setProperty("--d", `${(i % 4) * 70}ms`);
        el.setAttribute("data-r", "");
        io!.observe(el);
      });
    }

    // Cursor glow on cards (mouse only)
    const fine = window.matchMedia("(hover:hover) and (pointer:fine)").matches;
    const onMove = (ev: MouseEvent) => {
      const t = (ev.target as HTMLElement | null)?.closest<HTMLElement>(".bc, a.card, .tile, .ar");
      if (!t) return;
      const r = t.getBoundingClientRect();
      t.style.setProperty("--mx", `${ev.clientX - r.left}px`);
      t.style.setProperty("--my", `${ev.clientY - r.top}px`);
    };
    if (fine && !reduce) document.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      document.removeEventListener("mousemove", onMove);
      io?.disconnect();
    };
  }, []);
  return null;
}