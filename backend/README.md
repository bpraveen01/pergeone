# Contact form email backend (Cloudflare Worker + Resend)

1. Resend (resend.com): sign up with bpraveenbabu01@gmail.com, then API Keys -> Create API key. Copy it.
2. Cloudflare (dash.cloudflare.com): Workers & Pages -> Create -> Create Worker -> name it `pergeone-contact` -> Deploy -> Edit code -> paste all of `worker.js` -> Deploy.
3. Worker -> Settings -> Variables and Secrets. Add:
   - RESEND_API_KEY  (type: Secret)  = your Resend key
   - ALLOWED_ORIGIN  = https://YOUR-USERNAME.github.io,http://localhost:3000
   - LOGO_URL        = https://YOUR-USERNAME.github.io/pergeone/logo/logo.png
   - TO_EMAIL        = bpraveenbabu01@gmail.com   (optional, this is the default)
4. Copy the Worker URL (https://pergeone-contact.YOUR-SUBDOMAIN.workers.dev).
5. Local test: create `.env.local` in the project root with NEXT_PUBLIC_FORM_ENDPOINT=<Worker URL>, run `npm run dev`.
6. GitHub: repo -> Settings -> Secrets and variables -> Actions -> Variables -> New variable: FORM_ENDPOINT = <Worker URL>. Push to deploy.

Note: the default sender onboarding@resend.dev only delivers to the email you signed up to Resend with. To send from your own domain later, verify the domain in Resend and set FROM_EMAIL.
