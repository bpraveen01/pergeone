"use client";
import Link from "next/link";
import { CONFIG as C } from "@/data/config";
import Logo from "@/components/ui/Logo";
import Icon from "@/components/ui/Icon";
export default function Footer() {
  const soc = Object.entries(C.social).filter(([k, v]) => v && k !== "email") as [string, string][];
  const real = C.contactEmail && !C.contactEmail.includes("YOURDOMAIN");
  return (<footer><div className="wrap"><div className="ft"><Logo onDark />
    <nav aria-label="Footer">{C.nav.map(([t, h]: string[]) => <Link key={h} href={h}>{t}</Link>)}</nav>
    <div className="fright">{real && <a className="fmail" href={"mailto:" + C.contactEmail}><Icon n="mail" size={18} />{C.contactEmail}</a>}{soc.map(([k, v]) => <a key={k} aria-label={k} className="ic" style={{ background: "rgba(255,255,255,.08)", color: "#fff" }} href={v}><Icon n="user" /></a>)}</div></div>
    <div className="bt"><span>© {new Date().getFullYear()} {C.name}. All rights reserved.</span><span className="legal-links"><Link href="/terms">Terms and Conditions</Link><Link href="/privacy">Privacy Policy</Link></span><span>{C.footerNote}</span></div></div></footer>);
}