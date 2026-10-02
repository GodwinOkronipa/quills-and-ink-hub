-- =====================================================================
-- Quills and Ink Hub — Cloudflare D1 Edge Analytics & Resources Schema
-- =====================================================================

-- 1. Real-time Event Ingestion Table (No Cookies, Edge Stored)
CREATE TABLE IF NOT EXISTS events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  event_name TEXT NOT NULL,         -- file_download, site_search_query, page_view, whatsapp_chat_click, consultation_cta_click
  path TEXT,                        -- Page path (e.g., /literary, /packages)
  file_name TEXT,                   -- Downloaded file name
  file_url TEXT,                    -- Downloaded file URL
  query TEXT,                       -- Search query from site modal
  referrer TEXT,                    -- Referrer string
  country TEXT,                     -- ISO Country (from CF Edge: cf.country)
  city TEXT,                        -- City (from CF Edge: cf.city)
  ip_hash TEXT,                     -- One-way anonymized daily session hash (privacy-safe, no raw IP)
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_events_name ON events (event_name);
CREATE INDEX IF NOT EXISTS idx_events_created ON events (created_at);
CREATE INDEX IF NOT EXISTS idx_events_country ON events (country);

-- 2. Core Download Resource Slots (Strict 6-Slot Clutter Prevention)
CREATE TABLE IF NOT EXISTS resource_slots (
  slot_id TEXT PRIMARY KEY,         -- eulogy-writing-guide, memorial-brochure-checklist, etc.
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  filename TEXT NOT NULL,
  file_size_bytes INTEGER DEFAULT 0,
  download_count INTEGER DEFAULT 0,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_by TEXT DEFAULT 'admin'
);

-- Seed Initial 6 Curated Slots
INSERT OR IGNORE INTO resource_slots (slot_id, title, category, filename, file_size_bytes, download_count)
VALUES
  ('eulogy-writing-guide', 'Eulogy Reflection & Writing Guide', 'Spoken Tributes', 'eulogy-writing-guide.pdf', 366592, 312),
  ('memorial-brochure-checklist', 'Memorial Keepsake Brochure Checklist', 'Print & Keepsakes', 'memorial-brochure-checklist.pdf', 229376, 218),
  ('tribute-reading-excerpt', 'Selected Memorial Readings & Poems', 'Spoken Tributes', 'tribute-reading-excerpt.pdf', 148480, 98),
  ('quills-and-ink-family-memorial-guide', 'Master Family Memorial Planning Guide', 'Master Guides', 'quills-and-ink-family-memorial-guide.pdf', 366592, 56),
  ('diaspora-liaison-handbook', 'Diaspora Funeral Coordination Handbook', 'Diaspora Guidance', 'diaspora-liaison-handbook.pdf', 194560, 41),
  ('order-of-service-blueprint', 'Ceremonial Order of Service Blueprint', 'Print & Keepsakes', 'order-of-service-blueprint.pdf', 178176, 29);

-- 3. Daily Aggregates Cache (Fast Dashboard Lookups)
CREATE TABLE IF NOT EXISTS daily_aggregates (
  date_str TEXT PRIMARY KEY,        -- YYYY-MM-DD
  page_views INTEGER DEFAULT 0,
  downloads INTEGER DEFAULT 0,
  searches INTEGER DEFAULT 0,
  whatsapp_clicks INTEGER DEFAULT 0,
  consultations INTEGER DEFAULT 0
);
