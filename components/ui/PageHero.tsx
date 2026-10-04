export default function PageHero({ eyebrow, title, em, text }: { eyebrow: string; title: string; em?: string; text: string }) {
  const d = (i: number) => ({ "--i": i } as any);
  return (<section className="phero"><div className="wrap"><p className="eyebrow rise" style={d(1)}>{eyebrow}</p>
    <h1 className="rise" style={d(2)}>{title} {em && <em>{em}</em>}</h1><p className="lead rise" style={d(3)}>{text}</p></div></section>);
}
