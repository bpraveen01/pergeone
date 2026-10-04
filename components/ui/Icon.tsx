import { Code2, Sparkles, ShieldCheck, Cloud, Settings, Heart, Ear, Infinity as Inf, MessageSquare, TrendingUp, ArrowRight, Mail, User } from "lucide-react";
const M: any = { code: Code2, spark: Sparkles, shield: ShieldCheck, cloud: Cloud, gear: Settings, heart: Heart, ear: Ear, inf: Inf, chat: MessageSquare, up: TrendingUp, arrow: ArrowRight, mail: Mail, user: User };
export default function Icon({ n, size = 20 }: { n: string; size?: number }) { const I = M[n] || User; return <I size={size} strokeWidth={1.8} aria-hidden="true" />; }
