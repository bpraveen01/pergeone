import Link from "next/link";
import type { Metadata } from "next";
import { CONFIG as C } from "@/data/config";
import { PAGES } from "@/data/pages";
import PageHero from "@/components/ui/PageHero";
import CtaBand from "@/components/ui/CtaBand";
import Icon from "@/components/ui/Icon";
export const metadata: Metadata = { title: "What We're Building" };
export default function BuildingPage() {
  const prods = C.building.products as any[];
  return (<>
    <PageHero {...PAGES.building} />
    <section style={{ paddingTop: 30 }}><div className="wrap">{PAGES.buildingAreas.map((a: any, k: number) => (<div key={a.title} className="ar"><div className="tile"><Icon n={a.icon} size={34} /></div>
      <div><h2>{a.title}</h2><p className="sum">{a.text}</p>
        {a.link && <p style={{ marginTop: 18 }}><Link className="btn" href={a.link[0]}>{a.link[1]}</Link></p>}
        {k === 0 && <div className="pgrid">{prods.length ? prods.map((p) => (<div key={p.name} className="bc"><h3>{p.name}</h3><p>{p.description}</p><span className="tag">{p.status || p.category}</span>{p.link && <p style={{ marginTop: 12 }}><a href={p.link}>Learn more →</a></p>}</div>))
          : <div className="bc"><span className="tag">{PAGES.comingSoon[0]}</span><p style={{ marginTop: 12 }}>{PAGES.comingSoon[1]}</p></div>}</div>}</div></div>))}</div></section>
    <section className="build"><div className="wrap" style={{ maxWidth: 760 }}><h2>{PAGES.whyOwn.title}</h2><p style={{ color: "var(--text2)", fontSize: 18 }}>{PAGES.whyOwn.text}</p></div></section>
    <CtaBand />
  </>);
}
