"use client";
import { useEffect, useState } from "react";
import LogoLoader from "./LogoLoader";
// Full-page loader for the first load. Appears only if loading takes longer than ~250ms, hides as soon as the page has loaded,
// and always disappears after 5 seconds at the latest (CSS also hides it after 6s even if JavaScript fails).
export default function AppLoader() {
  const [done, setDone] = useState(false); const [gone, setGone] = useState(false);
  useEffect(() => {
    const fin = () => setDone(true);
    if (document.readyState === "complete") fin(); else addEventListener("load", fin, { once: true });
    const t = setTimeout(fin, 5000);
    return () => { clearTimeout(t); removeEventListener("load", fin); };
  }, []);
  useEffect(() => { if (!done) return; const t = setTimeout(() => setGone(true), 350); return () => clearTimeout(t); }, [done]);
  if (gone) return null;
  return (<div className={"pl pl-full" + (done ? " out" : "")} role="status" aria-label="Loading"><LogoLoader size={84} /><span className="sr">Loading…</span></div>);
}
