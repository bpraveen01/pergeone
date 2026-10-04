import Link from "next/link";
import { CONFIG as C } from "@/data/config";
import { asset } from "@/lib/asset";
// Logo files: public/logo/logo.png (light backgrounds) and public/logo/logo-light.png (dark footer). Replace them to change the logo.
export default function Logo({ onDark = false }: { onDark?: boolean }) {
  return (<Link className="logo" href="/" aria-label={C.name}><img src={asset(onDark ? "/logo/logo-light.png" : "/logo/logo.png")} alt={`${C.name} — ${C.tagline}`} /></Link>);
}
