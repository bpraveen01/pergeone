"use client";
import { useState, useRef, useEffect, FormEvent } from "react";
import { CONFIG as C } from "@/data/config";
import { submitContactForm } from "@/lib/contact";
import Icon from "@/components/ui/Icon";
import LogoLoader from "@/components/ui/LogoLoader";
const V: Record<string, (v: string) => string> = {
  name: (v) => (v.trim().length < 2 ? "Enter your full name." : ""),
  email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? "" : "Enter a valid email, like name@company.com."),
  phone: (v) => (/^\+?[\d\s\-()]{7,20}$/.test(v) && v.replace(/\D/g, "").length >= 7 ? "" : "Enter a valid phone number (7+ digits)."),
  role: (v) => (v ? "" : "Choose the option that fits you best."),
  msg: (v) => (v.trim().length < 10 ? "Tell us a little more (at least 10 characters)." : ""),
};
const F = [["name", "Full Name", "text", "Your name", "full"], ["email", "Email Address", "email", "you@example.com", ""], ["phone", "Phone Number", "tel", "+91 98765 43210", ""], ["role", "Role", "select", "", ""], ["msg", "What are you looking to build?", "textarea", C.contact.placeholder, "full"]];
export default function ContactForm() {
  const [v, setV] = useState<Record<string, string>>({ name: "", email: "", phone: "", role: "", msg: "" });
  const [e, setE] = useState<Record<string, string>>({});
  const [st, setSt] = useState("idle");
  const [failMsg, setFailMsg] = useState("");
  const t0 = useRef(0); const sid = useRef("");
  useEffect(() => { t0.current = Date.now(); sid.current = (crypto as any).randomUUID ? crypto.randomUUID() : String(Date.now()) + Math.random().toString(36).slice(2); }, []);
  const set = (k: string, val: string) => setV((p) => ({ ...p, [k]: val }));
  const blur = (k: string) => v[k] && setE((p) => ({ ...p, [k]: V[k](v[k]) }));
  async function submit(ev: FormEvent) {
    ev.preventDefault();
    const errs: Record<string, string> = {}; Object.keys(V).forEach((k) => (errs[k] = V[k](v[k]))); setE(errs);
    const first = Object.keys(errs).find((k) => errs[k]); if (first) { document.getElementById(first)?.focus(); return; }
    setSt("sending");
    try {
      const hp = String(new FormData(ev.currentTarget as HTMLFormElement).get("website") || "");
      const r = await submitContactForm({ ...v, website: hp, submissionId: sid.current, elapsed: Date.now() - t0.current });
      if (r.ok) setSt("done"); else { setFailMsg(r.error || ""); setSt("fail"); }
    } catch { setFailMsg(""); setSt("fail"); }
  }
  if (st === "done") return (<div className="form"><div className="ok" role="status"><span className="ic" style={{ margin: "auto", background: "#e6faf6", color: "#0a8f7f" }}><Icon n="shield" /></span><h3>Message sent</h3><p>Thanks for sharing your idea. We'll get back to you soon.</p></div></div>);
  return (<form className="form" onSubmit={submit} noValidate>
    {F.map(([id, label, type, ph, full]) => (<div key={id} className={"fld " + full}><label htmlFor={id}>{label} *</label>
      {type === "select" ? <select id={id} value={v[id]} aria-invalid={!!e[id]} onChange={(x) => set(id, x.target.value)}><option value="">Select your role</option>{C.contact.roles.map((r: string) => <option key={r}>{r}</option>)}</select>
        : type === "textarea" ? <><textarea id={id} maxLength={1500} placeholder={ph} value={v[id]} aria-invalid={!!e[id]} onBlur={() => blur(id)} onChange={(x) => set(id, x.target.value)} /><span className="cnt">{v[id].length} / 1500</span></>
        : <input id={id} type={type} maxLength={120} placeholder={ph} value={v[id]} aria-invalid={!!e[id]} onBlur={() => blur(id)} onChange={(x) => set(id, x.target.value)} />}
      <span className="err" role="alert">{e[id]}</span></div>))}
    <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", height: 0, overflow: "hidden" }}><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
    <button className="btn" type="submit" disabled={st === "sending"}>{st === "sending" ? "Sending…" : C.contact.submit}</button>
    {st === "sending" && <div className="form-busy" aria-live="polite"><LogoLoader size={56} /></div>}
    {st === "fail" && <p className="err" role="alert" style={{ gridColumn: "1/-1" }}>{failMsg || "We couldn't send your message. Please try again."}</p>}
  </form>);
}
