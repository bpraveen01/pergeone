"use client";
import Link from "next/link";
import { useCallback, useState, FormEvent } from "react";
import { Eye, EyeOff, Mail, Lock, ArrowLeft } from "lucide-react";
import Turnstile, { TURNSTILE_KEY } from "@/components/auth/Turnstile";
import { signInWithPassword, signInWithGoogle, requestPasswordReset } from "@/lib/auth";

type View = "login" | "forgot";
const okEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

export default function LoginForm() {
  const [view, setView] = useState<View>("login");
  const [email, setEmail] = useState(""); const [pw, setPw] = useState(""); const [show, setShow] = useState(false); const [remember, setRemember] = useState(true);
  const [token, setToken] = useState(""); const [err, setErr] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false); const [note, setNote] = useState<{ kind: "error" | "info"; text: string } | null>(null);
  const onToken = useCallback((t: string) => setToken(t), []);

  const go = (v: View) => { setView(v); setErr({}); setNote(null); };
  const needCaptcha = () => { if (TURNSTILE_KEY && !token) { setNote({ kind: "error", text: "Please complete the security check first." }); return true; } return false; };

  async function onLogin(e: FormEvent) {
    e.preventDefault(); setNote(null);
    const x: Record<string, string> = {};
    if (!okEmail(email)) x.email = "Enter a valid email, like name@company.com.";
    if (pw.length < 8) x.pw = "Your password has at least 8 characters.";
    setErr(x); if (x.email) return void document.getElementById("l-email")?.focus(); if (x.pw) return void document.getElementById("l-pw")?.focus();
    if (needCaptcha()) return;
    setBusy(true); const r = await signInWithPassword(email.trim(), pw, remember, token); setBusy(false);
    if (!r.ok) setNote({ kind: "error", text: r.error || "We couldn't sign you in. Please try again." });
  }
  async function onForgot(e: FormEvent) {
    e.preventDefault(); setNote(null);
    if (!okEmail(email)) { setErr({ email: "Enter the email you signed up with." }); return void document.getElementById("f-email")?.focus(); }
    setErr({}); if (needCaptcha()) return;
    setBusy(true); const r = await requestPasswordReset(email.trim(), token); setBusy(false);
    setNote(r.ok ? { kind: "info", text: r.message || "If that email has an account, a reset link is on its way." } : { kind: "error", text: r.error || "Something went wrong. Please try again." });
  }
  async function onGoogle() {
    setNote(null); setBusy(true); const r = await signInWithGoogle(); setBusy(false);
    if (!r.ok) setNote({ kind: "error", text: r.error || "Google sign-in is unavailable right now." });
  }

  return (<div className="authcard">
    {view === "login" ? (<form onSubmit={onLogin} noValidate>
      <h1>Welcome back</h1><p className="sub2">Sign in to your PergeOne account.</p>
      <div className="fld"><label htmlFor="l-email">Email</label>
        <div className="inp"><Mail size={18} aria-hidden="true" /><input id="l-email" type="email" autoComplete="email" inputMode="email" placeholder="you@company.com" value={email} aria-invalid={!!err.email} aria-describedby={err.email ? "l-email-e" : undefined} onChange={(e) => setEmail(e.target.value)} /></div>
        {err.email && <span id="l-email-e" className="err">{err.email}</span>}</div>
      <div className="fld"><label htmlFor="l-pw">Password</label>
        <div className="inp"><Lock size={18} aria-hidden="true" /><input id="l-pw" type={show ? "text" : "password"} autoComplete="current-password" placeholder="Your password" value={pw} aria-invalid={!!err.pw} aria-describedby={err.pw ? "l-pw-e" : undefined} onChange={(e) => setPw(e.target.value)} />
          <button type="button" className="eye" aria-label={show ? "Hide password" : "Show password"} aria-pressed={show} onClick={() => setShow(!show)}>{show ? <EyeOff size={18} /> : <Eye size={18} />}</button></div>
        {err.pw && <span id="l-pw-e" className="err">{err.pw}</span>}</div>
      <div className="row"><label className="chk"><input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} /><span>Keep me signed in</span></label>
        <button type="button" className="lnk" onClick={() => go("forgot")}>Forgot password?</button></div>
      <Turnstile onToken={onToken} />
      {note && <p className={"note " + note.kind} role={note.kind === "error" ? "alert" : "status"}>{note.text}</p>}
      <button className="btn" type="submit" disabled={busy}>{busy ? "Signing in…" : "Sign in"}</button>
      <div className="or"><span>or</span></div>
      <button type="button" className="gbtn" onClick={onGoogle} disabled={busy}>
        <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true"><path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.5 17.7 9.5 24 9.5z" /><path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.7 6c4.5-4.2 6.9-10.3 6.9-17.7z" /><path fill="#FBBC05" d="M10.5 28.7c-.5-1.4-.8-3-.8-4.7s.3-3.3.8-4.7l-7.9-6.1C.9 16.5 0 20.1 0 24s.9 7.5 2.6 10.8l7.9-6.1z" /><path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.7-6c-2.1 1.4-4.9 2.3-8.2 2.3-6.3 0-11.6-4-13.5-9.8l-7.9 6.1C6.5 42.6 14.6 48 24 48z" /></svg>
        Continue with Google</button>
      <p className="foot2">New here? Accounts are created by invitation. <Link href="/contact">Contact us</Link> to get started.</p>
    </form>) : (<form onSubmit={onForgot} noValidate>
      <button type="button" className="back" onClick={() => go("login")}><ArrowLeft size={16} aria-hidden="true" /> Back to sign in</button>
      <h1>Reset your password</h1><p className="sub2">Enter your email and we'll send you a link to choose a new password.</p>
      <div className="fld"><label htmlFor="f-email">Email</label>
        <div className="inp"><Mail size={18} aria-hidden="true" /><input id="f-email" type="email" autoComplete="email" inputMode="email" placeholder="you@company.com" value={email} aria-invalid={!!err.email} onChange={(e) => setEmail(e.target.value)} /></div>
        {err.email && <span className="err">{err.email}</span>}</div>
      <Turnstile onToken={onToken} />
      {note && <p className={"note " + note.kind} role={note.kind === "error" ? "alert" : "status"}>{note.text}</p>}
      <button className="btn" type="submit" disabled={busy}>{busy ? "Sending…" : "Send reset link"}</button>
    </form>)}
  </div>);
}