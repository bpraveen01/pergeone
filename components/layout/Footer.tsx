"use client";
import Link from "next/link";
import { CONFIG as C } from "@/data/config";
import Logo from "@/components/ui/Logo";
import Icon from "@/components/ui/Icon";
import SocialIcon from "@/components/ui/SocialIcon";
const SOCIAL: [string, string][] = [["linkedin", "LinkedIn"], ["facebook", "Facebook"], ["youtube", "YouTube"]];
export default function Footer() {
  const real = C.contactEmail && !C.contactEmail.includes("YOURDOMAIN");
  return (<footer><div className="wrap"><div className="ft"><Logo onDark />
    <nav aria-label="Footer">{C.nav.map(([t, h]: string[]) => <Link key={h} href={h}>{t}</Link>)}</nav>
    <div className="fright">{real && <a className="fmail" href={"mailto:" + C.contactEmail}><Icon n="mail" size={18} />{C.contactEmail}</a>}{SOCIAL.map(([k, label]) => { const url = (C.social as Record<string, string>)[k]; return (<a key={k} aria-label={label} className="ic soc" href={url || "#"} {...(url ? { target: "_blank", rel: "noopener noreferrer" } : { onClick: (e: React.MouseEvent) => e.preventDefault() })}><SocialIcon n={k} /></a>); })}</div></div>
    <div className="bt"><span>© {new Date().getFullYear()} {C.name}. All rights reserved.</span><span className="legal-links"><Link href="/terms">Terms and Conditions</Link><Link href="/privacy">Privacy Policy</Link></span><span>{C.footerNote}</span></div></div></footer>);
}