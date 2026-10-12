// Simple social glyphs (no extra package needed).
export default function SocialIcon({ n }: { n: string }) {
  const p = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": true } as const;
  if (n === "linkedin") return (<svg {...p}><path d="M4.4 9.2h3.3v10.4H4.4z" /><circle cx="6.05" cy="5.7" r="1.95" /><path d="M10 9.2h3.1v1.5c.5-.9 1.6-1.7 3.2-1.7 3.1 0 3.7 2 3.7 4.7v5.9h-3.3v-5.2c0-1.2 0-2.7-1.7-2.7s-1.9 1.3-1.9 2.6v5.3H10z" /></svg>);
  if (n === "facebook") return (<svg {...p}><path d="M13.6 21v-8.2h2.8l.5-3.3h-3.3V7.6c0-.9.4-1.7 1.8-1.7h1.6V3.1c-.3 0-1.3-.1-2.4-.1-2.5 0-4.1 1.5-4.1 4.2v2.3H7.7v3.3h2.8V21z" /></svg>);
  return (<svg {...p}><path fillRule="evenodd" d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2C2 8.8 2 12 2 12s0 3.2.4 4.8a2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8c.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8zM10 9.2v5.6l4.8-2.8z" /></svg>);
}