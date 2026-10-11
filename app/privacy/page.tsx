import type { Metadata } from "next";
import { SITE_URL } from "@/data/seo";
export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for PergeOne. This page is being prepared.",
  alternates: { canonical: SITE_URL + "/privacy/" },
  robots: { index: false, follow: true },
};
export default function Page() {
  return (<><section className="phero"><div className="wrap"><p className="eyebrow rise" style={{ "--i": 1 } as any}>LEGAL</p>
    <h1 className="rise" style={{ "--i": 2 } as any}>Privacy Policy</h1></div></section>
    <section className="legal"><div className="wrap"><div className="soon"><span className="dot" aria-hidden="true" /><p>Our Privacy Policy is being updated and will be published here soon.</p></div></div></section></>);
}