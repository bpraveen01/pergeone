import "@fontsource-variable/plus-jakarta-sans";
import "./globals.css";
import type { Metadata } from "next";
import { CONFIG } from "@/data/config";
import { SITE_URL, OG_IMAGE, SITE_DESCRIPTION } from "@/data/seo";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AppLoader from "@/components/ui/AppLoader";
import ScrollFX from "@/components/ui/ScrollFX";
const full = `${CONFIG.name} — ${CONFIG.tagline}`;
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL + "/"),
  title: { default: full, template: `%s | ${CONFIG.name}` },
  description: SITE_DESCRIPTION,
  alternates: { canonical: SITE_URL + "/" },
  robots: { index: true, follow: true },
  openGraph: { title: full, description: SITE_DESCRIPTION, url: SITE_URL + "/", siteName: CONFIG.name, type: "website", locale: "en_IN", images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: full }] },
  twitter: { card: "summary_large_image", title: full, description: SITE_DESCRIPTION, images: [OG_IMAGE] },
};
// Structured data so search engines understand who PergeOne is. Only real, filled-in details are included.
const sameAs = Object.entries(CONFIG.social).filter(([k, v]) => v && k !== "email").map(([, v]) => v);
const jsonLd = { "@context": "https://schema.org", "@type": "Organization", name: CONFIG.name, url: SITE_URL + "/", logo: `${SITE_URL}/logo/logo.png`, slogan: CONFIG.tagline, ...(CONFIG.contactEmail && !CONFIG.contactEmail.includes("YOURDOMAIN") ? { email: CONFIG.contactEmail } : {}), description: SITE_DESCRIPTION, ...(sameAs.length ? { sameAs } : {}) };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><head>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
  </head><body><a className="skip" href="#main">Skip to content</a><AppLoader /><Navbar /><main id="main">{children}</main><Footer /><ScrollFX /></body></html>);
}