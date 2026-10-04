import LogoLoader from "@/components/ui/LogoLoader";
// Shown by Next.js only while a page is actually being fetched during navigation (appears after ~250ms, so fast navigations never flash it).
export default function Loading() { return (<div className="pl pl-inline" role="status" aria-label="Loading"><LogoLoader size={72} /><span className="sr">Loading…</span></div>); }
