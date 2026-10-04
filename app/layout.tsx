import "./globals.css";
import type { Metadata } from "next";
import { CONFIG } from "@/data/config";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AppLoader from "@/components/ui/AppLoader";
export const metadata: Metadata = { title: { default: `${CONFIG.name} — ${CONFIG.tagline}`, template: `%s | ${CONFIG.name}` }, description: CONFIG.hero.text };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><head>
    <link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
    <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  </head><body><AppLoader /><Navbar /><main>{children}</main><Footer /></body></html>);
}
