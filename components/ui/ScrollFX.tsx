"use client";
import { useEffect, useRef } from "react";

// Site-wide motion: scroll progress line, soft reveal on scroll, glow + gentle tilt on cards,
// and a slight magnetic pull on main buttons. Everything stays visible if JavaScript fails,
// and the movement is skipped for visitors who prefer reduced motion.
export default function ScrollFX() {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(hover:hover) and (pointer:fine)").matches;

    // 1. Scroll progress line
    let raf = 0;
    const draw = () => {
      raf = 0;
      const h = document.documentElement.scrollHeight - window.innerHeight;
      if (bar.current) bar.current.style.transform = `scaleX(${h > 0 ? Math.min(1, window.scrollY / h) : 0})`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(draw); };
    draw();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    // 2. Reveal on scroll
    const stairs: IntersectionObserver[] = [];
    let io: IntersectionObserver | undefined;
    if (!reduce && "IntersectionObserver" in window) {
      const sel = ".about .wrap > *, .steps .st, .bgrid .bc, .founders .wrap > *, .contact .wrap > *, .phero .wrap > *, .svc .sv, .offers > *, .tr, .get > *, .eng > *, .ar, .tile, .pgrid > *, .faq details, .authside > *, .soon, .story .wrap > *, .tm, .mvc, .vgrid li, .remote .wrap > *, .vidbox, .chips li, section > .wrap > h2, section > .wrap > .eyebrow";
      const els = Array.from(document.querySelectorAll<HTMLElement>(sel));
      io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement;
            el.setAttribute("data-r", "in");
            io?.unobserve(el);
            window.setTimeout(() => el.removeAttribute("data-r"), 1300);
          }
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
      els.forEach((el, i) => {
        if (el.closest(".hero")) return;
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight * 0.92) return; // already on screen: leave visible
        el.style.setProperty("--d", `${(i % 4) * 80}ms`);
        el.setAttribute("data-r", "");
        io!.observe(el);
      });
    }

    // 2b. Approach staircase grows up when it scrolls into view
    if (!reduce && "IntersectionObserver" in window) {
      document.querySelectorAll<HTMLElement>(".steps").forEach((st) => {
        if (st.getBoundingClientRect().top < window.innerHeight * 0.6) return;
        st.setAttribute("data-anim", "armed");
        const so = new IntersectionObserver((en) => { if (en[0].isIntersecting) { st.setAttribute("data-anim", "go"); so.disconnect(); } }, { threshold: 0.3 });
        so.observe(st);
        stairs.push(so);
      });
    }

    // 3. Mouse effects (desktop only): glow, tilt, magnetic buttons
    let lastMag: HTMLElement | null = null;
    const onMove = (ev: MouseEvent) => {
      const t = ev.target as HTMLElement | null; if (!t) return;
      const card = t.closest<HTMLElement>(".bc, a.card, .tile, .ar");
      if (card) {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${ev.clientX - r.left}px`);
        card.style.setProperty("--my", `${ev.clientY - r.top}px`);
        if (card.classList.contains("bc")) {
          card.style.setProperty("--ry", `${((ev.clientX - r.left) / r.width - 0.5) * 6}deg`);
          card.style.setProperty("--rx", `${-((ev.clientY - r.top) / r.height - 0.5) * 6}deg`);
        }
      }
      const mag = t.closest<HTMLElement>(".hero .btn:not(.ghost), .sec-cta .btn, .about .btn, .cband .btn");
      if (lastMag && lastMag !== mag) { lastMag.style.removeProperty("--tx"); lastMag.style.removeProperty("--ty"); }
      if (mag) {
        const r = mag.getBoundingClientRect();
        mag.style.setProperty("--tx", `${(ev.clientX - (r.left + r.width / 2)) * 0.14}px`);
        mag.style.setProperty("--ty", `${(ev.clientY - (r.top + r.height / 2)) * 0.22}px`);
      }
      lastMag = mag;
    };
    const onLeave = (ev: MouseEvent) => {
      const t = ev.target as HTMLElement | null;
      if (t?.classList?.contains("bc")) { t.style.removeProperty("--rx"); t.style.removeProperty("--ry"); }
    };
    if (fine && !reduce) { document.addEventListener("mousemove", onMove, { passive: true }); document.addEventListener("mouseout", onLeave); }

    return () => {
      window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll);
      document.removeEventListener("mousemove", onMove); document.removeEventListener("mouseout", onLeave);
      if (raf) cancelAnimationFrame(raf);
      io?.disconnect(); stairs.forEach((x) => x.disconnect());
    };
  }, []);

  return <div className="progress" aria-hidden="true"><div ref={bar} /></div>;
}