"use client";
import Link from "next/link";
import { CONFIG as C } from "@/data/config";
import Logo from "@/components/ui/Logo";
import Icon from "@/components/ui/Icon";
export default function Footer() {
  const soc = Object.entries(C.social).filter(([, v]) => v) as [string, string][];
  return (<footer><div className="wrap"><div className="ft"><Logo onDark />
    <nav aria-label="Footer">{C.nav.map(([t, h]: string[]) => <Link key={h} href={h}>{t}</Link>)}</nav>
    <div style={{ display: "flex", gap: 14 }}>{soc.map(([k, v]) => <a key={k} aria-label={k} className="ic" style={{ background: "rgba(255,255,255,.08)", color: "#fff" }} href={k === "email" ? "mailto:" + v : v}><Icon n={k === "email" ? "mail" : "user"} /></a>)}</div></div>
    <div className="bt"><span>© {new Date().getFullYear()} {C.name}. All rights reserved.</span><span>{C.footerNote}</span></div></div></footer>);
}
