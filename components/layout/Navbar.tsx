"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { CONFIG as C } from "@/data/config";
import { SERVICES } from "@/data/services";
import Logo from "@/components/ui/Logo";
import Icon from "@/components/ui/Icon";
export default function Navbar() {
  const path = usePathname() || "/";
  const [sc, setSc] = useState(false); const [open, setOpen] = useState(false); const [hide, setHide] = useState(false);
  useEffect(() => { const f = () => setSc(scrollY > 20); f(); addEventListener("scroll", f, { passive: true }); return () => removeEventListener("scroll", f); }, []);
  useEffect(() => { setOpen(false); }, [path]);
  // Mobile menu: lock the page behind it, close with Escape, and close if the screen becomes desktop-size.
  useEffect(() => {
    document.documentElement.classList.toggle("lock", open);
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    const mq = window.matchMedia("(min-width: 1024px)");
    const onMq = () => { if (mq.matches) setOpen(false); };
    addEventListener("keydown", onKey); mq.addEventListener("change", onMq);
    return () => { removeEventListener("keydown", onKey); mq.removeEventListener("change", onMq); document.documentElement.classList.remove("lock"); };
  }, [open]);
  const on = (h: string) => (h === "/" ? path === "/" : path.startsWith(h));
  const close = () => { setHide(true); (document.activeElement as HTMLElement)?.blur(); };
  return (<>
    <header className={(sc ? "sc" : "") + (open ? " open" : "")}><div className="wrap"><div className="nav"><Logo />
      <nav className="links" aria-label="Primary">{C.nav.map(([t, h]: string[]) => h === "/services" ? (
        <div key={h} className={"hasmega" + (hide ? " hide" : "")} onMouseLeave={() => setHide(false)}>
          <Link href={h} className={on(h) ? "on" : ""} onClick={close}>{t}<ChevronDown size={15} aria-hidden="true" /></Link>
          <div className="mega"><div className="mbox"><div className="mgrid">{SERVICES.map((s) => (
            <Link key={s.slug} className="mi" href={`/services#${s.slug}`} onClick={close}><span className="ic"><Icon n={s.icon} /></span><span><b>{s.title}</b><small>{s.tagline}</small></span></Link>))}</div>
            <Link className="mall" href="/services" onClick={close}>View all services →</Link></div></div></div>
      ) : <Link key={h} href={h} className={on(h) ? "on" : ""}>{t}</Link>)}</nav>
      <Link className="btn" href="/contact">{C.navCta}</Link>
      <button className="burger" aria-label="Toggle menu" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 7h16M4 12h16M4 17h16" /></svg></button></div>
      <div id="mobile-menu" className={"drawer" + (open ? " open" : "")}>{C.nav.map(([t, h]: string[]) => (<div key={h}><Link href={h} onClick={() => setOpen(false)}>{t}</Link>
        {h === "/services" && <div className="sub">{SERVICES.map((s) => <Link key={s.slug} href={`/services#${s.slug}`} onClick={() => setOpen(false)}>{s.title}</Link>)}</div>}</div>))}
        <Link className="btn" href="/contact" onClick={() => setOpen(false)}>{C.navCta}</Link></div></div></header>
    {open && <div className="scrim" onClick={() => setOpen(false)} aria-hidden="true" />}
  </>);
}