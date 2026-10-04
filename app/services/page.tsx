import Link from "next/link";
import type { Metadata } from "next";
import { CONFIG as C } from "@/data/config";
import { PAGES } from "@/data/pages";
import { SERVICES } from "@/data/services";
import PageHero from "@/components/ui/PageHero";
import CtaBand from "@/components/ui/CtaBand";
import Icon from "@/components/ui/Icon";
export const metadata: Metadata = { title: "Services" };
export default function ServicesPage() {
  return (<>
    <PageHero {...PAGES.services} />
    <section className="dark svc"><div className="wrap"><div><p className="eyebrow">WHAT WE DO</p><h2>{C.services.heading}</h2><p className="sub">{C.services.text}</p></div>
      <div className="grid">{SERVICES.map((s) => (<Link key={s.slug} href={`#${s.slug}`} className="card"><span className="go arr"><Icon n="arrow" /></span><span className="ic"><Icon n={s.icon} /></span><h3>{s.title}</h3>
        <ul>{s.offerings.map(([t]) => <li key={t}>{t}</li>)}</ul></Link>))}</div></div></section>
    {SERVICES.map((s, i) => (<section key={s.slug} id={s.slug} className={"sv" + (i % 2 ? " alt" : "")}><div className="wrap sv-grid">
      <div className="sv-head"><span className="ic big"><Icon n={s.icon} size={26} /></span><h2>{s.title}</h2><p>{s.intro}</p></div>
      <ul className="offers">{s.offerings.map(([t, d]) => <li key={t}><h3>{t}</h3><p>{d}</p></li>)}</ul></div></section>))}
    <CtaBand />
  </>);
}
