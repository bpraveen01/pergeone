import type { Metadata } from "next";
import { CONFIG as C } from "@/data/config";
import { PAGES } from "@/data/pages";
import PageHero from "@/components/ui/PageHero";
import ContactForm from "@/components/contact/ContactForm";
export const metadata: Metadata = { title: "Contact" };
export default function ContactPage() {
  const real = !C.contactEmail.includes("YOURDOMAIN");
  return (<>
    <PageHero {...PAGES.contact} />
    <section className="contact" style={{ color: "#fff" }}><div className="wrap"><div><p className="eyebrow" style={{ color: "var(--cyan)" }}>WHAT HAPPENS NEXT</p><h2>A simple, friendly start.</h2>
      <ol className="nx">{PAGES.contactSteps.map(([t, d], i) => <li key={t}><span className="n">{i + 1}</span><div><b>{t}</b><p>{d}</p></div></li>)}</ol>
      {real && <p className="mail">Prefer email? <a href={"mailto:" + C.contactEmail}>{C.contactEmail}</a></p>}</div><ContactForm /></div></section>
    <section className="build"><div className="wrap"><p className="eyebrow">HELPFUL TO INCLUDE</p><h2>What helps us help you.</h2>
      <div className="bgrid">{PAGES.contactTips.map(([t, d]) => <div key={t} className="bc"><h3>{t}</h3><p>{d}</p></div>)}</div></div></section>
  </>);
}
