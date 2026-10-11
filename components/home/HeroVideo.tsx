"use client";
import { useEffect, useRef, useState } from "react";
import { asset } from "@/lib/asset";

// Plays the banner video on a loop. Falls back to the still picture when the visitor prefers
// reduced motion or has Data Saver on, and pauses when the banner is off screen to save battery.
export default function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [src, setSrc] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saver = (navigator as any).connection?.saveData === true;
    if (reduce || saver) return;
    setSrc(asset(window.innerWidth <= 760 ? "/videos/hero-720.mp4" : "/videos/hero-1080.mp4"));
  }, []);

  useEffect(() => {
    const v = ref.current; if (!v || !src) return;
    v.muted = true;
    const play = () => { const p = v.play(); if (p && p.catch) p.catch(() => {}); };
    play();
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? play() : v.pause()), { threshold: 0.05 });
    io.observe(v);
    return () => io.disconnect();
  }, [src]);

  return (<>
    <img className="herobg" src={asset("/videos/hero-poster.jpg")} alt="" aria-hidden="true" />
    {src && <video ref={ref} className={"herobg herovid" + (ready ? " on" : "")} src={src} poster={asset("/videos/hero-poster.jpg")}
      autoPlay muted loop playsInline preload="auto" aria-hidden="true" tabIndex={-1} onCanPlay={() => setReady(true)} />}
  </>);
}
