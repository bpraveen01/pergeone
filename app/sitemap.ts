import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/seo";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return ["/", "/about/", "/services/", "/approach/", "/building/", "/contact/"].map((p) => ({ url: SITE_URL + p, lastModified: now, changeFrequency: "monthly" as const, priority: p === "/" ? 1 : 0.7 }));
}