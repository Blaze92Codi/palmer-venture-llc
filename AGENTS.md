# Palmer Venture LLC — Base44 dev notes

## What this is
A single static HTML marketing site (`index.html`) for Palmer Venture LLC, plus a logo (`palmer-venture-logo.jpeg`) and a `CNAME` (`palmerventurellc.com`). No build step, no backend, no package manager.

## How it runs here
Served by `nginx:alpine` via `docker-compose.base44.yml`. The repo root is bind-mounted read-only into nginx's docroot, so edits to `index.html` are picked up on browser refresh (or `reload_preview`).

## External services (client-side only, no secrets)
- **Calendly** embed widget (loaded from `assets.calendly.com`).
- **Formspree** form (`https://formspree.io/f/mkoeavrp`) posted via `fetch` in the browser.

No server-side credentials are needed.

## JARVIS Executive Agent (segregated layer)
A separate app at `/jarvis` (`jarvis.html` + `jarvis/` directory) — an owner-only executive agent for PVLLC. It does NOT touch the marketing page's code or data.

### Architecture
- Static ES module app (no build step, no backend, no framework)
- `jarvis.html` — app shell; loads `jarvis/app.js` as a module
- `jarvis/core/` — `seed.js` (synthetic data), `store.js` (state + audit), `ui.js` (HTML helpers), `agent.js` (triage/recommendations), `policy.js` (handoff validation + tests)
- `jarvis/screens/` — 10 screen renderers (command, opportunities, decisions, people, calendar, tasks, documents, audit, integrations, gateway)
- `jarvis/styles.css` — dark command-center theme matching PVLLC branding
- Hash-based routing (`#/command`, `#/decisions`, etc.)

### Key constraints (by design)
- TEST MODE / DISCONNECTED banner on every screen
- No live APIs, no secrets, no external connectors — all data is synthetic
- JARVIS recommends; Palmer decides. All outbound messages, calendar commits, purchases, contracts, and handoffs require approval
- Drafts are never auto-sent (prototype marks them "approved-not-sent")
- Quarantine never permanently deletes
- Personal JARVIS gateway is a disconnected placeholder; County is fully blocked
- 17 policy tests validate handoff safety (all pass on seed data)

### Entry point
A "JARVIS" gold link was added to the marketing page's nav (desktop + mobile) pointing to `/jarvis`.

## Verify
- `docker compose -f docker-compose.base44.yml up -d --build`
- `curl -sf http://localhost:3000/` returns the marketing page.
- `curl -sf http://localhost:3000/jarvis` returns the JARVIS app shell.
- Preview: marketing page at `/`, JARVIS at `/jarvis`.
