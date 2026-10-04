import { asset } from "@/lib/asset";
// Animated PergeOne logo symbol (uses public/logo/mark.png): gentle pulse + flowing light across the original blue/turquoise colours.
export default function LogoLoader({ size = 72 }: { size?: number }) {
  return (<span className="lg" style={{ width: size, height: size, ["--m" as any]: `url(${asset("/logo/mark.png")})` }} aria-hidden="true"><img src={asset("/logo/mark.png")} alt="" /><i /></span>);
}
