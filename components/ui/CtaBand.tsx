import Link from "next/link";
import { PAGES } from "@/data/pages";
export default function CtaBand() { const c = PAGES.cta; return (<section className="cband"><div className="wrap"><h2>{c.title}</h2><p>{c.text}</p><Link className="btn" href="/contact">{c.button}</Link></div></section>); }
