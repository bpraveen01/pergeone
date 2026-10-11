"use client";
import { useEffect, useRef } from "react";

// Free Cloudflare Turnstile captcha. It stays hidden until you add NEXT_PUBLIC_TURNSTILE_SITEKEY.
export const TURNSTILE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITEKEY || "";

export default function Turnstile({ onToken }: { onToken: (t: string) => void }) {
  const box = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!TURNSTILE_KEY || !box.current) return;
    let id: string | undefined; let dead = false;
    const mount = () => {
      const t = (window as any).turnstile; if (dead || !t || !box.current) return;
      id = t.render(box.current, { sitekey: TURNSTILE_KEY, theme: "light", callback: (x: string) => onToken(x), "expired-callback": () => onToken(""), "error-callback": () => onToken("") });
    };
    if ((window as any).turnstile) mount();
    else {
      let s = document.getElementById("cf-turnstile") as HTMLScriptElement | null;
      if (!s) { s = document.createElement("script"); s.id = "cf-turnstile"; s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"; s.async = true; document.head.appendChild(s); }
      s.addEventListener("load", mount);
    }
    return () => { dead = true; try { if (id) (window as any).turnstile?.remove(id); } catch {} };
  }, [onToken]);
  if (!TURNSTILE_KEY) return null;
  return <div ref={box} className="captcha" />;
}