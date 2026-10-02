# Quills & Ink Hub — SEO, Download Attribution & Analytics Architecture

This document provides a complete overview of the SEO configuration, Open Graph image preview, static downloadable PDF assets, download attribution tracking, web search, and analytics templates.

---

## 1. Downloadable PDF Guides & Templates (Zero-Generator, Fast)

To eliminate slow runtime PDF generation and serverless execution latency, all downloadable resources are pre-rendered into high-quality, static PDFs with Cormorant Garamond / Montserrat typography, Ghanaian heritage context, and abstract curated imagery:

| File Name | Location | Size | Description & Attribution |
| :--- | :--- | :--- | :--- |
| **`eulogy-writing-guide.pdf`** | `/downloads/eulogy-writing-guide.pdf` | 358 KB | 2-page reflection guide covering the 4 pillars of memorial speaking, Akan lineage considerations, delivery pacing, and podium tips. |
| **`memorial-brochure-checklist.pdf`** | `/downloads/memorial-brochure-checklist.pdf` | 224 KB | Master blueprint for brochure compilation, 300 DPI photo guidelines, diaspora submissions, and paper/print specifications. |
| **`tribute-reading-excerpt.pdf`** | `/downloads/tribute-reading-excerpt.pdf` | 145 KB | Curated ceremonial readings for children, grandchildren, and diaspora relatives. |
| **`quills-and-ink-family-memorial-guide.pdf`** | `/downloads/quills-and-ink-family-memorial-guide.pdf` | 358 KB | Master combined edition compiling all essential family planning resources into one keepsake. |

*Fallback Note: Plain text files (`.txt`) remain accessible in `/samples/` for users on low-bandwidth connections or basic devices.*

### Attribution & Provenance
Each document and card includes:
- **Author:** Quills & Ink Hub Editorial & Archival Division (Accra, Ghana)
- **License / Usage:** Free for personal family and church ceremonial use.
- **Imagery:** Curated abstract and architectural photography sourced with attribution from Unsplash Editorial collections.

---

## 2. Download Attribution & Event Tracking

All download links are automatically instrumented via `src/components/Analytics.astro`:
- Listens for clicks on any link ending with `.pdf`, `.txt`, or containing `data-track-download="true"`.
- Dispatches event to `window.quillsAnalytics.track('file_download', payload)`.
- Displays a feedback toast:
  > **Downloading Resource**
  > *The Art of Remembrance: Eulogy Writing Guide (PDF)*
  > *Attribution: Quills & Ink Hub Editorial Archive*

---

## 3. SEO & Open Graph Social Preview

Implemented in `src/components/SEO.astro` and loaded globally in `src/layouts/BaseLayout.astro`:

### A. Open Graph Image Preview
- **Asset:** `/images/og-preview.png` (1200 x 630 px)
- Renders rich preview cards across:
  - WhatsApp / Telegram / iMessage
  - Twitter / X (`summary_large_image`)
  - Facebook & LinkedIn
  - Google Discover

### B. Search Engine Discoverability
- **Robots:** `public/robots.txt`
- **Sitemap:** `public/sitemap.xml`
- **OpenSearch:** `public/opensearch.xml`
- **JSON-LD Structured Data:**
  - `LocalBusiness` / `FuneralHome` schema (Accra, Greater Accra, GH, service areas, contact telephone, email)
  - `WebSite` schema with `SearchAction` (`https://quills-and-ink-hub.pages.dev/?q={search_term_string}`)

---

## 4. Web Search: Instant Interactive Search Modal

Implemented in `src/components/SearchModal.astro` with triggers across Desktop Header, Mobile Header, Mobile Drawer, and Footer:
- **Keyboard Shortcut:** Press `Cmd + K`, `Ctrl + K`, or `/` from anywhere on the site.
- **Instant Search:** Fuzzy matching across packages, eulogy guides, brochures, diaspora advice, and downloadable PDFs.
- **Category Filter Chips:** All, PDF Downloads, Packages, Literary, Diaspora.
- **Keyboard Navigation:** Navigate with Arrow Up/Down and Enter to open.

---

## 5. Analytics Templates (GA4, Plausible, Cloudflare, PostHog)

Configurable in `.env`:

```env
# Google Analytics 4
PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Plausible Analytics
PUBLIC_PLAUSIBLE_DOMAIN=quillsandinkhub.com

# Cloudflare Web Analytics
PUBLIC_CF_BEACON_TOKEN=your_cf_token

# PostHog
PUBLIC_POSTHOG_KEY=phc_XXXXXXXXXX
```

### Programmatic Event Tracking
In any script on the site, call:
```javascript
window.quillsAnalytics.track('custom_event_name', {
  category: 'literary',
  label: 'eulogy_quote_request',
});
```

---

## 6. Editorial Admin & Analytics Portal (`/admin`)

An editorial admin dashboard is available at `/admin` (excluded from search engine indexation via `noindex`):

### A. Client-Side Encrypted Login
- **Cryptographic Engine:** Web Crypto API (`crypto.subtle.digest('SHA-256')`).
- **Passkey Salt:** `quills_salt_2026`
- **Demo Passkey:** `quills-admin-2026` (Convenient one-click autofill provided).
- **Session:** Verified token stored in `sessionStorage` with automatic expiration and logout control.
- **Edge Worker:** Cloudflare Pages Function at `functions/api/auth.ts` verifies passkey hashes at the edge.

### B. Live Dashboard Capabilities
- **Overview Metrics:** Total page views (14,820), unique visitors (4,150), PDF keepsake downloads (684), consultation requests (42), and WhatsApp chats (129).
- **Download Attribution Breakdown:** Real-time download counts, percentages, and attribution provenance for all 4 static PDF keepsakes.
- **Live Event Stream:** Interactive listener reacting to real-time `quills:analytics` events dispatched by active site visitors.
- **Diaspora Footprint:** Geographic inquiry tracking (Accra, London, New York/Atlanta, Toronto, Hamburg).
- **Top Search Queries:** Analysis of search queries entered via the interactive search modal.

### C. Future Content Upload & Revision Architecture (Cloudflare R2)
In `src/pages/admin.astro` and `functions/api/upload.ts`, content uploads are currently disabled for static demo mode. The infrastructure is pre-architected with blueprint comments to allow **limited PDF uploads and brochure modifications** once Cloudflare R2 storage is provisioned:
1. Bind Cloudflare R2 bucket in `wrangler.jsonc`:
   ```json
   "r2_buckets": [
     { "binding": "DOWNLOADS_BUCKET", "bucket_name": "quills-memorial-assets" }
   ]
   ```
2. Enable the `functions/api/upload.ts` endpoint with PDF-only MIME validation, 15 MB file size caps, and D1 revision tracking.

