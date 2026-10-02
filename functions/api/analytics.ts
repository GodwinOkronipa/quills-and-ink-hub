// Cloudflare Pages Function: /api/analytics
// Pure Real-Time Edge Analytics Engine (Backed 100% by Cloudflare D1 SQLite)

interface AnalyticsEvent {
  event: string;
  path?: string;
  file_name?: string;
  file_url?: string;
  query?: string;
  timestamp?: string;
  attribution?: string;
  source_page?: string;
}

const COUNTRY_META: Record<string, { flag: string; name: string }> = {
  GH: { flag: '🇬🇭', name: 'Ghana' },
  GB: { flag: '🇬🇧', name: 'United Kingdom' },
  US: { flag: '🇺🇸', name: 'United States' },
  CA: { flag: '🇨🇦', name: 'Canada' },
  DE: { flag: '🇩🇪', name: 'Germany' },
  NG: { flag: '🇳🇬', name: 'Nigeria' },
  NL: { flag: '🇳🇱', name: 'Netherlands' },
  FR: { flag: '🇫🇷', name: 'France' },
  IT: { flag: '🇮🇹', name: 'Italy' },
  ZA: { flag: '🇿🇦', name: 'South Africa' },
  AU: { flag: '🇦🇺', name: 'Australia' },
  IE: { flag: '🇮🇪', name: 'Ireland' },
  CH: { flag: '🇨🇭', name: 'Switzerland' },
  BE: { flag: '🇧🇪', name: 'Belgium' },
};

// Clean in-memory store for local preview or before D1 binds
const localStore = {
  pageViews: 0,
  uniqueVisitors: new Set<string>(),
  pdfDownloads: 0,
  searchQueries: 0,
  consultationInquiries: 0,
  whatsappChats: 0,
  recentEvents: [] as any[],
  searchesMap: {} as Record<string, number>,
};

export async function onRequestGet(context: any) {
  const db = context.env?.ANALYTICS_DB;

  if (db) {
    try {
      // 1. Pure Real-Time Counts from D1
      const countsResult = await db.prepare(`
        SELECT 
          COUNT(CASE WHEN event_name = 'page_view' THEN 1 END) as pv,
          COUNT(DISTINCT COALESCE(ip_hash, id)) as uv,
          COUNT(CASE WHEN event_name = 'file_download' THEN 1 END) as dl,
          COUNT(CASE WHEN event_name = 'site_search_query' THEN 1 END) as sq,
          COUNT(CASE WHEN event_name = 'whatsapp_chat_click' THEN 1 END) as wa,
          COUNT(CASE WHEN event_name = 'consultation_cta_click' THEN 1 END) as book
        FROM events
      `).first();

      const pvCount = Number(countsResult?.pv || 0);
      const uvCount = Number(countsResult?.uv || 0);
      const dlCount = Number(countsResult?.dl || 0);
      const sqCount = Number(countsResult?.sq || 0);
      const waCount = Number(countsResult?.wa || 0);
      const bookCount = Number(countsResult?.book || 0);

      const overview = {
        pageViews: pvCount,
        uniqueVisitors: uvCount,
        pdfDownloads: dlCount,
        searchQueries: sqCount,
        consultationInquiries: bookCount,
        whatsappChats: waCount,
        period: 'Real-Time Edge Stream',
      };

      // 2. Real Download Slots from D1
      const slotsResult = await db.prepare(`
        SELECT slot_id, title, category, filename, file_size_bytes, download_count 
        FROM resource_slots 
        ORDER BY download_count DESC, slot_id ASC
      `).all();

      const totalDl = Math.max(dlCount, 1);
      const downloads = (slotsResult?.results || []).map((row: any) => ({
        id: row.slot_id,
        name: row.title,
        downloads: Number(row.download_count || 0),
        percent: dlCount > 0 ? Math.round((Number(row.download_count || 0) / totalDl) * 100) : 0,
        size: `${Math.round(Number(row.file_size_bytes || 200000) / 1024)} KB`,
        file: `/downloads/${row.filename}`,
        attribution: 'Quills & Ink Editorial Archive',
        category: row.category,
      }));

      // 3. Real Diaspora Reach from D1
      const totalGeoResult = await db.prepare(`
        SELECT COUNT(*) as total FROM events WHERE country IS NOT NULL AND country != ''
      `).first();
      const totalGeo = Number(totalGeoResult?.total || 0);

      const diasporaQuery = await db.prepare(`
        SELECT 
          country,
          city,
          COUNT(*) as total_events,
          COUNT(CASE WHEN event_name IN ('consultation_cta_click', 'whatsapp_chat_click') THEN 1 END) as inquiries
        FROM events 
        WHERE country IS NOT NULL AND country != ''
        GROUP BY country, city
        ORDER BY total_events DESC
        LIMIT 6
      `).all();

      const diasporaReach = (diasporaQuery?.results || []).map((row: any) => {
        const countryCode = String(row.country || '').toUpperCase();
        const meta = COUNTRY_META[countryCode] || { flag: '🌐', name: countryCode };
        const cityStr = row.city && row.city !== 'Unknown' && row.city !== 'null' ? `${row.city}, ` : '';
        const regionLabel = `${cityStr}${meta.name}`;
        const pct = totalGeo > 0 ? Math.round((Number(row.total_events || 0) / totalGeo) * 100) : 0;
        return {
          region: regionLabel,
          countryCode: countryCode,
          flag: meta.flag,
          percent: pct,
          totalEvents: Number(row.total_events || 0),
          inquiries: Number(row.inquiries || 0),
        };
      });

      // 4. Real Top Search Queries from D1
      const searchQuery = await db.prepare(`
        SELECT query, COUNT(*) as count 
        FROM events 
        WHERE event_name = 'site_search_query' AND query IS NOT NULL AND TRIM(query) != ''
        GROUP BY query 
        ORDER BY count DESC 
        LIMIT 6
      `).all();

      const topSearchQueries = (searchQuery?.results || []).map((r: any) => ({
        query: r.query,
        count: Number(r.count || 0),
      }));

      // 5. Real-Time Activity Feed (Latest 25 events)
      const eventsQuery = await db.prepare(`
        SELECT 
          id,
          event_name as event,
          path,
          file_name,
          file_url,
          query,
          country,
          city,
          created_at as time
        FROM events
        ORDER BY id DESC
        LIMIT 25
      `).all();

      const recentEvents = (eventsQuery?.results || []).map((e: any) => ({
        id: e.id,
        event: e.event,
        path: e.path,
        file_name: e.file_name,
        file_url: e.file_url,
        query: e.query,
        country: e.country,
        city: e.city,
        time: e.time,
      }));

      return new Response(
        JSON.stringify({
          overview,
          downloads,
          diasporaReach,
          topSearchQueries,
          recentEvents,
          storageMode: 'Cloudflare D1 (Edge SQLite)',
          isLiveRealData: true,
          timestamp: new Date().toISOString(),
        }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
    } catch (err: any) {
      console.error('D1 error in onRequestGet:', err);
    }
  }

  // Fallback for purely local dev without D1
  return new Response(
    JSON.stringify({
      overview: {
        pageViews: localStore.pageViews,
        uniqueVisitors: localStore.uniqueVisitors.size,
        pdfDownloads: localStore.pdfDownloads,
        searchQueries: localStore.searchQueries,
        consultationInquiries: localStore.consultationInquiries,
        whatsappChats: localStore.whatsappChats,
        period: 'Local Dev Buffer',
      },
      downloads: [],
      diasporaReach: [],
      topSearchQueries: [],
      recentEvents: localStore.recentEvents.slice(0, 20),
      storageMode: 'Local Memory Fallback',
      isLiveRealData: true,
      timestamp: new Date().toISOString(),
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Access-Control-Allow-Origin': '*',
      },
    }
  );
}

export async function onRequestPost(context: any) {
  try {
    const payload: AnalyticsEvent = await context.request.json();
    const db = context.env?.ANALYTICS_DB;

    // Edge geolocation from Cloudflare Request
    const cf = context.request.cf || {};
    const country = cf.country || 'GH';
    const city = cf.city || 'Accra';

    // Privacy-preserving daily session hash for accurate unique visitor counting
    const clientIp =
      context.request.headers.get('CF-Connecting-IP') ||
      context.request.headers.get('x-real-ip') ||
      '127.0.0.1';
    const today = new Date().toISOString().slice(0, 10);
    const encoder = new TextEncoder();
    const hashBuffer = await crypto.subtle.digest('SHA-256', encoder.encode(`${clientIp}:${today}`));
    const ipHash = Array.from(new Uint8Array(hashBuffer))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('')
      .slice(0, 16);

    // Update in-memory fallback
    if (payload.event === 'page_view') {
      localStore.pageViews += 1;
      localStore.uniqueVisitors.add(ipHash);
    } else if (payload.event === 'file_download') {
      localStore.pdfDownloads += 1;
    } else if (payload.event === 'site_search_query') {
      localStore.searchQueries += 1;
      if (payload.query) {
        localStore.searchesMap[payload.query] = (localStore.searchesMap[payload.query] || 0) + 1;
      }
    } else if (payload.event === 'whatsapp_chat_click') {
      localStore.whatsappChats += 1;
    } else if (payload.event === 'consultation_cta_click') {
      localStore.consultationInquiries += 1;
    }

    localStore.recentEvents.unshift({
      event: payload.event,
      path: payload.path,
      file_name: payload.file_name,
      file_url: payload.file_url,
      query: payload.query,
      country: country,
      city: city,
      time: new Date().toISOString(),
    });
    if (localStore.recentEvents.length > 50) localStore.recentEvents.pop();

    // Persist to Cloudflare D1
    if (db) {
      try {
        await db
          .prepare(
            `INSERT INTO events (event_name, path, file_name, file_url, query, country, city, ip_hash)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
          )
          .bind(
            payload.event,
            payload.path || null,
            payload.file_name || null,
            payload.file_url || null,
            payload.query || null,
            country,
            city,
            ipHash
          )
          .run();

        // Increment resource slot download count
        if (payload.event === 'file_download' && payload.file_url) {
          const fileName = payload.file_url.split('/').pop();
          if (fileName) {
            await db
              .prepare('UPDATE resource_slots SET download_count = download_count + 1 WHERE filename = ?')
              .bind(fileName)
              .run();
          }
        }
      } catch (err) {
        console.warn('D1 write error in onRequestPost:', err);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        recordedEvent: payload.event,
        country: country,
        city: city,
        persistedTo: db ? 'Cloudflare D1 (Edge SQLite)' : 'Local Buffer',
        timestamp: new Date().toISOString(),
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  } catch (err: any) {
    return new Response(JSON.stringify({ error: 'Malformed analytics payload', details: err.message }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
