// PergeOne contact-form backend (Cloudflare Worker). Sends the enquiry email through Resend.
// Secrets/variables are set in the Cloudflare dashboard, never in the website code. See backend/README.md.

const hits = new Map();   // ip -> timestamps (basic rate limit, per Worker instance)
const seen = new Map();   // content hash -> time (blocks identical resubmits)
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const json = (o, status, h) => new Response(JSON.stringify(o), { status, headers: { "Content-Type": "application/json", ...h } });

function validate(d) {
  const s = (k) => (typeof d[k] === "string" ? d[k].trim() : "");
  const out = { name: s("name"), email: s("email"), phone: s("phone"), role: s("role"), msg: s("msg") };
  if (out.name.length < 2 || out.name.length > 80) return ["Please enter your full name."];
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(out.email) || out.email.length > 120) return ["Please enter a valid email address."];
  if (!/^\+?[\d\s\-()]{7,20}$/.test(out.phone) || out.phone.replace(/\D/g, "").length < 7) return ["Please enter a valid phone number."];
  if (!out.role || out.role.length > 40) return ["Please choose your role."];
  if (out.msg.length < 10 || out.msg.length > 1500) return ["Please describe your idea (10 to 1500 characters)."];
  return [null, out];
}

function buildEmail(d, env, when) {
  const logo = env.LOGO_URL
    ? `<img src="${esc(env.LOGO_URL)}" alt="PergeOne" height="46" style="display:block;height:46px;width:auto;border:0">`
    : `<span style="font-size:26px;font-weight:800;color:#071B33">Perge<span style="color:#1267D6">One</span></span>`;
  const field = (label, value) => `<tr><td style="padding:12px 0;border-bottom:1px solid #e6eef7"><div style="font-size:11px;letter-spacing:.08em;font-weight:700;color:#52657A;text-transform:uppercase">${label}</div><div style="font-size:16px;font-weight:600;color:#0B1F3A;margin-top:3px;word-break:break-word">${value}</div></td></tr>`;
  const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>New Project Enquiry</title></head>
<body style="margin:0;padding:0;background:#EAF4FF;font-family:Segoe UI,Helvetica,Arial,sans-serif">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#EAF4FF"><tr><td align="center" style="padding:24px 12px">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #dbe6f2">
<tr><td style="padding:26px 32px 20px">${logo}</td></tr>
<tr><td bgcolor="#1267D6" style="height:5px;line-height:5px;font-size:0;background:linear-gradient(90deg,#1267D6,#16B8E8,#12C9B5)">&nbsp;</td></tr>
<tr><td style="padding:28px 32px 4px"><div style="font-size:12px;letter-spacing:.1em;font-weight:700;color:#1267D6">WEBSITE ENQUIRY</div>
<h1 style="margin:6px 0 6px;font-size:28px;line-height:1.2;color:#071B33">New Project Enquiry</h1>
<p style="margin:0;font-size:15px;line-height:1.5;color:#52657A">Someone has just contacted PergeOne through the website.</p></td></tr>
<tr><td style="padding:22px 32px 0"><div style="font-size:13px;font-weight:800;color:#0B3B78;border-bottom:2px solid #12C9B5;display:inline-block;padding-bottom:4px">Contact details</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
${field("Full name", esc(d.name))}${field("Email address", `<a href="mailto:${esc(d.email)}" style="color:#1267D6;text-decoration:none">${esc(d.email)}</a>`)}${field("Phone number", `<a href="tel:${esc(d.phone.replace(/[^\d+]/g, ""))}" style="color:#1267D6;text-decoration:none">${esc(d.phone)}</a>`)}${field("Role", esc(d.role))}
</table></td></tr>
<tr><td style="padding:26px 32px 0"><div style="font-size:13px;font-weight:800;color:#0B3B78;border-bottom:2px solid #12C9B5;display:inline-block;padding-bottom:4px">Project / requirements</div>
<div style="margin-top:14px;background:#F7FAFD;border-left:4px solid #12C9B5;border-radius:8px;padding:16px 18px;font-size:15px;line-height:1.65;color:#0B1F3A;word-break:break-word">${esc(d.msg).replace(/\n/g, "<br>")}</div></td></tr>
<tr><td style="padding:26px 32px 0"><div style="font-size:13px;font-weight:800;color:#0B3B78;border-bottom:2px solid #12C9B5;display:inline-block;padding-bottom:4px">Submission details</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">${field("Submitted on", esc(when))}</table></td></tr>
<tr><td style="padding:28px 32px 32px"><a href="mailto:${esc(d.email)}?subject=${encodeURIComponent("Re: Your enquiry to PergeOne")}" style="display:inline-block;background:#1267D6;color:#ffffff;text-decoration:none;font-weight:700;font-size:15px;padding:13px 24px;border-radius:999px">Reply to ${esc(d.name.split(" ")[0])}</a></td></tr>
<tr><td style="background:#071B33;padding:20px 32px;text-align:center;font-size:13px;color:#9fb6d0">PergeOne &middot; Started by you. Sustained by us.</td></tr>
</table></td></tr></table></body></html>`;
  const text = `New Project Enquiry | PergeOne\n\nName: ${d.name}\nEmail: ${d.email}\nPhone: ${d.phone}\nRole: ${d.role}\n\nProject / requirements:\n${d.msg}\n\nSubmitted on: ${when}\n`;
  return { html, text };
}

export default {
  async fetch(req, env) {
    const origin = req.headers.get("Origin") || "";
    const allowed = (env.ALLOWED_ORIGIN || "").split(",").map((s) => s.trim()).filter(Boolean);
    const cors = { "Access-Control-Allow-Origin": allowed.includes(origin) ? origin : "null", "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type", Vary: "Origin" };
    if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });
    if (req.method !== "POST") return json({ ok: false, error: "Method not allowed." }, 405, cors);
    if (!allowed.includes(origin)) return json({ ok: false, error: "Request not allowed." }, 403, cors);
    if (!env.RESEND_API_KEY) return json({ ok: false, error: "Email service is not configured." }, 500, cors);

    const ip = req.headers.get("CF-Connecting-IP") || "unknown", now = Date.now();
    const recent = (hits.get(ip) || []).filter((t) => now - t < 10 * 60 * 1000);
    if (recent.length >= 5) return json({ ok: false, error: "Too many requests. Please try again in a few minutes." }, 429, cors);
    hits.set(ip, [...recent, now]);

    let raw; try { const t = await req.text(); if (t.length > 8000) throw 0; raw = JSON.parse(t); } catch { return json({ ok: false, error: "Invalid request." }, 400, cors); }
    if (raw.website) return json({ ok: true }, 200, cors);                      // honeypot: bots fill this hidden field
    if (typeof raw.elapsed === "number" && raw.elapsed < 2500) return json({ ok: false, error: "That was a little fast. Please try again." }, 400, cors);
    const [err, d] = validate(raw); if (err) return json({ ok: false, error: err }, 400, cors);

    const key = `${d.email}|${d.msg}`; if (seen.has(key) && now - seen.get(key) < 10 * 60 * 1000) return json({ ok: true, duplicate: true }, 200, cors);
    const id = /^[\w-]{8,64}$/.test(raw.submissionId || "") ? raw.submissionId : crypto.randomUUID();
    const tz = env.TIMEZONE || "Asia/Kolkata";
    const when = new Intl.DateTimeFormat("en-IN", { dateStyle: "long", timeStyle: "short", timeZone: tz }).format(new Date()) + ` (${tz})`;
    const { html, text } = buildEmail(d, env, when);
    try {
      const r = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json", "Idempotency-Key": id },
        body: JSON.stringify({ from: env.FROM_EMAIL || "PergeOne Website <onboarding@resend.dev>", to: [env.TO_EMAIL || "bpraveenbabu01@gmail.com"], reply_to: d.email, subject: "New Project Enquiry | PergeOne", html, text }),
      });
      if (!r.ok) { console.error("Resend error", r.status, await r.text()); return json({ ok: false, error: "We couldn't send your message right now. Please try again shortly." }, 502, cors); }
      seen.set(key, now); return json({ ok: true }, 200, cors);
    } catch (e) { console.error(e); return json({ ok: false, error: "We couldn't send your message right now. Please try again shortly." }, 502, cors); }
  },
};
export { buildEmail };
