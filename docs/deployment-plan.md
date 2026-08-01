# Deployment Plan — shubhbuilds.com

Researched 2026-08-01 via Codex, with live DNS/HTTP verification (not guessed).

## Key finding

`shubhbuilds.com` is **already served by Vercel** — this is a Vercel-to-Vercel
project handoff, not a fresh domain connection. Do not change DNS unless the
new project's verification step explicitly asks for different records.

Live-verified state (2026-08-01):

```
shubhbuilds.com       A       216.198.79.1
www.shubhbuilds.com   CNAME   a7ab366f2b444034.vercel-dns-017.com
Apex behavior          308 redirect to www
Current hosting        Vercel
Nameservers             dns1/dns2.registrar-servers.com (registrar-managed, not Vercel nameservers)
```

`curl -I https://www.shubhbuilds.com` returned a real `200 OK` from a Next.js
site (`X-Nextjs-Prerender`, `X-Vercel-Cache: HIT`) — the old site is live and
healthy right now, so cutover must be zero-downtime.

## Plan

GitHub is not required — a local Vercel CLI deployment is sufficient.

1. **Snapshot the local project**: `git status --short`, `npm ci`, `npm run lint`, `npm run build`. Commit before deploying (recommended, not required — CLI uploads the working directory, not a git ref).
2. **Install + authenticate**: `npm install --global vercel@latest`, `vercel login`, `vercel whoami`.
3. **First deploy = Preview, not production**: run `vercel` from repo root, answer prompts (new project, name `portfolio-v2`, don't link to existing project). Test the resulting `*.vercel.app` preview URL thoroughly before touching the domain.
4. **Promote to Production URL (still no custom domain)**: `vercel --prod`, test that URL fully (nav, images, fonts, mobile, 404, contact links, metadata/OG images).
5. **Zero-downtime domain cutover** (only once step 4 is fully verified):
   - If you have access to whichever Vercel account/project currently serves the old site: `vercel alias set <newDeployment> www.shubhbuilds.com` and same for apex, then remove the domains from the old project and add them to `portfolio-v2`, set `www` as primary, apex redirects 308 to `www`.
   - If the old project is on an inaccessible account: claim the domain via Vercel Dashboard → Domains → Add Existing, add the generated `_vercel` TXT record at the registrar, verify, then attach.
6. **Do not switch nameservers** during this cutover — unnecessary here and risks breaking existing MX/SPF email-forwarding records already in place.
7. **Verify after cutover**: `vercel domains verify`, `vercel certs ls`, DNS resolution, and `curl -I` on both apex and `www` — expect apex 308 → www, www 200 from the new deployment, valid SSL covering both hosts.
8. **Keep the old project alive 48h** for rollback via `vercel alias set <old-deployment-url> www.shubhbuilds.com`.

## Gotchas to check before declaring done

- Adding a domain's DNS to Vercel does **not** attach it to a project — must explicitly add the domain under Project → Settings → Domains.
- Don't add an apex CNAME; use `@` for apex host, `www` (not `www.shubhbuilds.com`) for the www host at the registrar.
- Watch for stale `_acme-challenge` records if SSL issuance stalls; never rewrite/proxy `/.well-known/acme-challenge/*`.
- Confirm correct Vercel personal/team scope at login.

## Status

Researched and ready — **not yet executed**. Blocked on Phase 3 (voxel hero) completing first. Execute once the site is feature-complete and locally verified.
