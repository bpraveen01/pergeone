import type { Metadata } from "next";
import { CONFIG } from "@/data/config";
// When you get your own domain, change this ONE line (or set NEXT_PUBLIC_SITE_URL). No trailing slash.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://bpraveen01.github.io/pergeone").replace(/\/$/, "");
export const OG_IMAGE = `${SITE_URL}/og.jpg`;   // sharing preview picture: public/og.jpg (1200 x 630)
export const SITE_DESCRIPTION = "PergeOne turns ideas into reality: websites, apps, AI, testing, cloud and long-term support. Started by you. Sustained by us.";

// Search + sharing text for every page. Edit the sentences here.
export const PAGE_SEO = {
  services: { title: "Services", description: "Websites, web and mobile apps, AI solutions, QA testing, cloud and DevOps, business automation and ongoing support from PergeOne.", path: "/services/" },
  approach: { title: "Our Approach", description: "How PergeOne works: understand, plan, build, test, launch and sustain, with clear communication and long-term support.", path: "/approach/" },
  building: { title: "What We're Building", description: "PergeOne is a service company and also a product builder. See what we are creating and where we are heading.", path: "/building/" },
  contact: { title: "Contact", description: "Tell PergeOne about your idea, product, website, application or automation. We'll get back to you and understand what you want to build.", path: "/contact/" },
};

export function pageMeta(key: keyof typeof PAGE_SEO): Metadata {
  const p = PAGE_SEO[key]; const url = `${SITE_URL}${p.path}`; const full = `${p.title} | ${CONFIG.name}`;
  return {
    title: p.title, description: p.description, alternates: { canonical: url },
    openGraph: { title: full, description: p.description, url, siteName: CONFIG.name, type: "website", images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: `${CONFIG.name} — ${CONFIG.tagline}` }] },
    twitter: { card: "summary_large_image", title: full, description: p.description, images: [OG_IMAGE] },
  };
}