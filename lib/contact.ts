import { CONFIG } from "@/data/config";
// Sends the enquiry to the backend (backend/google-apps-script.gs). Success is reported ONLY if the backend confirms the enquiry was saved.
export async function submitContactForm(data: Record<string, any>): Promise<{ ok: boolean; error?: string }> {
  const url = process.env.NEXT_PUBLIC_FORM_ENDPOINT || CONFIG.formEndpoint;
  if (!url) return { ok: false, error: "The contact form isn't connected to our email service yet. Please try again later." };
  const ctl = new AbortController(); const timer = setTimeout(() => ctl.abort(), 25000);
  try {
    const r = await fetch(url, { method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(data), signal: ctl.signal });
    const j = await r.json().catch(() => ({}));
    if (r.ok && j.ok) return { ok: true };
    return { ok: false, error: j.error || "We couldn't send your message. Please try again." };
  } catch { return { ok: false, error: "We couldn't reach our server. Check your connection and try again." }; }
  finally { clearTimeout(timer); }
}