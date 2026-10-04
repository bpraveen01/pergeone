import { CONFIG as C } from "@/data/config";
import { asset } from "@/lib/asset";
import Icon from "@/components/ui/Icon";
import Link from "next/link";
import ContactForm from "@/components/contact/ContactForm";
const d = (i: number) => ({ "--i": i } as any);

export function Hero() { const h = C.hero; return (
  <section className="hero" id="home">
    <img className="herobg" src={asset("/images/hero-bg.jpg")} alt="" aria-hidden="true" />
    <div className="herofade" aria-hidden="true" />
    <div className="wrap"><div className="copy">
      <p className="eyebrow rise" style={d(1)}>{h.eyebrow}</p>
      <h1 className="rise" style={d(2)}>{h.pre}<br /><em>{h.em}</em></h1>
      <p className="lead rise" style={d(3)}>{h.text}</p>
      <div className="cta rise" style={d(4)}><Link className="btn" href="/contact">{h.cta1}</Link><Link className="btn ghost" href="/services">{h.cta2}</Link></div></div></div></section>); }

export function Founders() { return (
  <div className="founders"><div className="wrap"><h2>{C.founders.heading}</h2>
    {C.founders.showMembers && <ul className="fl">{C.founders.list.map((f: any) => <li key={f.name} className="f"><div className="av">{f.photo ? <img src={f.photo} alt={f.name} /> : f.name[0]}</div>{f.name}<small>{f.role}</small></li>)}</ul>}</div></div>); }

export function About() { return (
  <section className="about" id="about"><div className="wrap"><div><p className="eyebrow">ABOUT PERGEONE</p><h2>{C.about.heading}</h2><p>{C.about.text}</p><Link className="btn" href="/approach">{C.about.cta}</Link></div>
    <ul className="pr">{C.principles.map(([i, t]: string[]) => <li key={t}><span className="ic"><Icon n={i} /></span>{t}</li>)}</ul></div></section>); }

export function Approach() { return (
  <section id="approach"><div className="wrap"><p className="eyebrow">OUR APPROACH</p><h2>{C.approach.heading}</h2>
    <ol className="steps" style={{ listStyle: "none", padding: 0 }}>{C.approach.steps.map(([t, p]: string[], i: number) => <li key={t} className="st"><span className="n">0{i + 1}</span><h3>{t}</h3><p>{p}</p></li>)}</ol><div style={{ marginTop: 32 }}><Link className="btn" href="/approach">Explore our full approach →</Link></div></div></section>); }

export function Building() { const b = C.building; return (
  <section className="build" id="building"><div className="wrap"><p className="eyebrow">WHAT WE'RE BUILDING</p><h2>{b.heading}</h2><p style={{ color: "var(--text2)", maxWidth: 560 }}>{b.text}</p>
    <div className="bgrid">{b.areas.map(([i, t, p]: string[], k: number) => <div key={t} className="bc"><span className="ic"><Icon n={i} /></span><h3>{t}</h3><p>{p}</p>
      {k === 0 && b.products.length ? b.products.map((x: any) => <div key={x.name} className="prod">{x.link ? <a href={x.link}>{x.name}</a> : x.name}<small>{x.category} {x.status && "· " + x.status}</small></div>) : <span className="tag">Coming soon</span>}</div>)}</div><div style={{ marginTop: 28 }}><Link className="btn" href="/building">See what we're building →</Link></div></div></section>); }

export function Contact() { const real = !C.contactEmail.includes("YOURDOMAIN"); return (
  <section className="contact" id="contact" style={{ color: "#fff" }}><div className="wrap"><div><p className="eyebrow" style={{ color: "var(--cyan)" }}>LET'S TALK</p><h2>{C.contact.heading}</h2><p className="sub">{C.contact.text}</p>
    {real && <p className="mail"><a href={"mailto:" + C.contactEmail}>{C.contactEmail}</a></p>}</div><ContactForm /></div></section>); }
