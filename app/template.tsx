// Re-runs on every page change, so each page fades in softly.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="pg">{children}</div>;
}