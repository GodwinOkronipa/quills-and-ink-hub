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
