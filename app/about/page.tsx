import Link from "next/link";
import type { Metadata } from "next";
import { pageMeta } from "@/data/seo";
import { CONFIG as C } from "@/data/config";
import { PAGES } from "@/data/pages";
import { ABOUT as A } from "@/data/about";
import { SERVICES } from "@/data/services";
import PageHero from "@/components/ui/PageHero";
import CtaBand from "@/components/ui/CtaBand";
import Icon from "@/components/ui/Icon";
import AboutVideo from "@/components/about/AboutVideo";
export const metadata: Metadata = pageMeta("about");
export default function AboutPage() {
  const real = !C.contactEmail.includes("YOURDOMAIN");
  return (<>
    <PageHero {...PAGES.about} />

    <section className="story"><div className="wrap">
      <div><p className="eyebrow">{A.story.eyebrow}</p><h2>{A.story.heading}</h2>{A.story.paras.map((p) => <p key={p}>{p}</p>)}</div>
      <aside className="glance" aria-label="PergeOne at a glance"><h3>At a glance</h3>
        <dl>{A.glance.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
          {real && <div><dt>Email</dt><dd><a href={"mailto:" + C.contactEmail}>{C.contactEmail}</a></dd></div>}</dl></aside>
    </div></section>

    <section className="team"><div className="wrap"><p className="eyebrow">{A.team.eyebrow}</p><h2>{A.team.heading}</h2><p className="sum">{A.team.text}</p>
      <ul className="tgrid">{A.team.members.map((m) => <li key={m.code} className="tm">
        <div className="tav">{m.photo ? <img src={m.photo} alt={m.code} /> : <span>{m.code.replace("Mr. ", "")}</span>}</div>
        <h3>{m.code}</h3><p className="trole">{m.role}</p><p className="tline">{m.line}</p></li>)}</ul></div></section>

    <section className="dark mv"><div className="wrap"><p className="eyebrow">{A.purpose.eyebrow}</p><h2>{A.purpose.heading}</h2>
      <div className="mvgrid">{A.purpose.items.map(([k, v]) => <div key={k} className="mvc"><span className="mvk">{k}</span><p>{v}</p></div>)}</div></div></section>

    <section className="vals"><div className="wrap"><p className="eyebrow">{A.beliefs.eyebrow}</p><h2>{A.beliefs.heading}</h2>
      <ul className="vgrid">{A.beliefs.items.map(([i, t, d]) => <li key={t}><span className="ic"><Icon n={i} /></span><h3>{t}</h3><p>{d}</p></li>)}</ul></div></section>

    <section className="remote"><div className="wrap">
      <div><p className="eyebrow">{A.remote.eyebrow}</p><h2>{A.remote.heading}</h2><p className="sum">{A.remote.text}</p></div>
      <ul className="rlist">{A.remote.points.map(([i, t, d]) => <li key={t}><span className="ic"><Icon n={i} /></span><div><h3>{t}</h3><p>{d}</p></div></li>)}</ul>
    </div></section>

    <section className="build vsec"><div className="wrap"><p className="eyebrow">{A.video.eyebrow}</p><h2>{A.video.heading}</h2><p className="sum">{A.video.text}</p>
      <AboutVideo /></div></section>

    <section className="chipsec"><div className="wrap"><p className="eyebrow">WHERE WE CAN HELP</p><h2>One team, seven ways to help.</h2>
      <ul className="chips">{SERVICES.map((s) => <li key={s.slug}><Link href={`/services#${s.slug}`}><Icon n={s.icon} size={18} />{s.title}</Link></li>)}</ul></div></section>

    <CtaBand />
  </>);
}