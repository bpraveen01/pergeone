import type { Metadata } from "next";
import { CONFIG as C } from "@/data/config";
import { PAGES } from "@/data/pages";
import { STEPS } from "@/data/approach";
import PageHero from "@/components/ui/PageHero";
import CtaBand from "@/components/ui/CtaBand";
import Icon from "@/components/ui/Icon";
export const metadata: Metadata = { title: "Our Approach" };
export default function ApproachPage() {
  return (<>
    <PageHero {...PAGES.approach} />
    <section style={{ paddingBottom: 40 }}><div className="wrap">{STEPS.map((s, i) => (<div key={s.title} className="tr"><div className="big">0{i + 1}</div>
      <div><h2>{s.title}</h2><p className="sum">{s.summary}</p><ul>{s.actions.map((a) => <li key={a}>{a}</li>)}</ul><div className="get"><span>WHAT YOU GET</span>{s.outcome}</div></div></div>))}</div></section>
    <section className="build"><div className="wrap"><p className="eyebrow">OUR PRINCIPLES</p><h2>The principles behind every step.</h2>
      <ul className="pr two">{C.principles.map(([i, t]: string[]) => <li key={t}><span className="ic"><Icon n={i} /></span>{t}</li>)}</ul></div></section>
    <CtaBand />
  </>);
}
