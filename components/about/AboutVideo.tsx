"use client";
import { useEffect, useState } from "react";
import Icon from "@/components/ui/Icon";
import { asset } from "@/lib/asset";
import { ABOUT } from "@/data/about";

// Drop your film into  public/videos/about.mp4  (and optionally a picture called about-poster.jpg).
// The page notices the file by itself: until it exists, a tidy "coming soon" panel is shown.
export default function AboutVideo() {
  const [has, setHas] = useState(false);
  useEffect(() => {
    let dead = false;
    fetch(asset("/videos/about.mp4"), { method: "HEAD" })
      .then((r) => { if (!dead) setHas(r.ok && (r.headers.get("content-type") || "").includes("video")); })
      .catch(() => {});
    return () => { dead = true; };
  }, []);
  if (has) return (<div className="vidbox"><video controls playsInline preload="metadata" poster={asset("/videos/about-poster.jpg")} src={asset("/videos/about.mp4")}>
    Your browser can't play this video.</video></div>);
  return (<div className="vidbox soonbox" role="img" aria-label={ABOUT.video.soon}>
    <span className="ring"><Icon n="play" size={28} /></span><p>{ABOUT.video.soon}</p></div>);
}