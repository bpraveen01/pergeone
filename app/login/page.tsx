import type { Metadata } from "next";
import LoginForm from "@/components/auth/LoginForm";
import { SITE_URL } from "@/data/seo";
export const metadata: Metadata = {
  title: "Enter PergeOne",
  description: "Sign in to your PergeOne account.",
  alternates: { canonical: SITE_URL + "/login/" },
  robots: { index: false, follow: false },
};
export default function LoginPage() {
  return (<section className="auth"><div className="wrap">
    <div className="authside"><p className="eyebrow">CLIENT PORTAL</p>
      <h2>Everything for your project, in one place.</h2>
      <ul className="authpts"><li>Follow progress on what we're building for you</li><li>Share files and feedback with the team</li><li>Reach us any time, without chasing emails</li></ul></div>
    <LoginForm /></div></section>);
}