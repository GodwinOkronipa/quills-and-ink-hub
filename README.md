# Quills and Ink Hub

Front-end site for **Quills and Ink Hub** — dignified funeral event planning, consultation, and literary services for Ghanaian families locally and in the diaspora.

Built with **Astro** (static output) for fast loads and simple **Cloudflare Pages** deploy. Backend booking/contact wiring is intentionally deferred.

## Design baseline

Visual language inspired by an elegant catering/event reference (centered script logo, overlapping welcome panel, wood-toned services strip, numbered process). Adapted for a calm, respectful memorial brand.

| Layer | Choice |
| --- | --- |
| Framework | Astro 5 (static) |
| Fonts | Great Vibes (script), Cormorant Garamond (serif), Montserrat (UI) |
| Icons | Inline thin-line SVG |
| Imagery | Unsplash stock (flowers, stationery, venues) — placeholder until client assets |
| Hero | Optimized still + commented `<video>` slot for your final hero film |
| Deploy | Cloudflare Pages via `wrangler` |

## Pages

- `/` — Hero, welcome, services, process, CTA
- `/about` — Story
- `/packages` — Funeral package tiers + inclusions
- `/portfolio` — Gallery of past work (placeholder imagery)
- `/literary` — Literary services + downloadable sample excerpt
- `/book` — Consultation intake (front-end validation only)
- `/contact` — Inquiry form + WhatsApp / phone placeholders

## Local development

```bash
npm install
npm run dev
```

```bash
npm run build
npm run preview
```

## Cloudflare Pages

```bash
npm run pages:deploy
```

Or connect the GitHub repo in the Cloudflare dashboard:

- **Build command:** `npm run build`
- **Output directory:** `dist`
- **Node version:** 22 (or 20+)

## Next (when you are ready)

- Drop optimized hero video into `public/videos/hero.mp4` and uncomment the video block in `src/components/Hero.astro`
- Replace Unsplash URLs with brand photography
- Wire `/book` and `/contact` to a Worker / Formspree / WhatsApp Business API
- Replace placeholder phone and WhatsApp numbers
