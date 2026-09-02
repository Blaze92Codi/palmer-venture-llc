# Palmer Venture LLC — Base44 dev notes

## What this is
A single static HTML marketing site (`index.html`) for Palmer Venture LLC, plus a logo (`palmer-venture-logo.jpeg`) and a `CNAME` (`palmerventurellc.com`). No build step, no backend, no package manager.

## How it runs here
Served by `nginx:alpine` via `docker-compose.base44.yml`. The repo root is bind-mounted read-only into nginx's docroot, so edits to `index.html` are picked up on browser refresh (or `reload_preview`).

## External services (client-side only, no secrets)
- **Calendly** embed widget (loaded from `assets.calendly.com`).
- **Formspree** form (`https://formspree.io/f/mkoeavrp`) posted via `fetch` in the browser.

No server-side credentials are needed.

## Verify
- `docker compose -f docker-compose.base44.yml up -d --build`
- `curl -sf http://localhost:3000/` returns the HTML page.
- Preview shows the marketing page on port 3000.
