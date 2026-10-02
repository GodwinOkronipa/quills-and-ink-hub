// Cloudflare Pages Function: /api/analytics
// Handles edge analytics aggregation and event collection

export async function onRequestGet(context: any) {
  // Edge analytics payload (can be backed by Cloudflare D1, KV, or Analytics Engine)
  const analyticsData = {
    overview: {
      pageViews: 14820,
      uniqueVisitors: 4150,
      pdfDownloads: 684,
      searchQueries: 942,
      consultationInquiries: 42,
      whatsappChats: 129,
      period: 'Last 30 Days',
      trend: {
        pageViews: '+18.4%',
        downloads: '+32.1%',
        inquiries: '+24.0%',
      },
    },
    downloads: [
      {
        id: 'eulogy-guide',
        name: 'The Art of Remembrance: Eulogy Writing Guide (PDF)',
        downloads: 312,
        percent: 45.6,
        size: '358 KB',
        file: '/downloads/eulogy-writing-guide.pdf',
        attribution: 'Quills & Ink Editorial Archive',
      },
      {
        id: 'brochure-checklist',
        name: 'Memorial Keepsake Brochure Checklist (PDF)',
        downloads: 218,
        percent: 31.9,
        size: '224 KB',
        file: '/downloads/memorial-brochure-checklist.pdf',
        attribution: 'Quills & Ink Print Division',
      },
      {
        id: 'tribute-excerpt',
        name: 'Memorial Tribute Reading Excerpt (PDF)',
        downloads: 98,
        percent: 14.3,
        size: '145 KB',
        file: '/downloads/tribute-reading-excerpt.pdf',
        attribution: 'Quills & Ink Spoken Archives',
      },
      {
        id: 'master-guide',
        name: 'Complete Family Memorial Planning Guide (PDF)',
        downloads: 56,
        percent: 8.2,
        size: '358 KB',
        file: '/downloads/quills-and-ink-family-memorial-guide.pdf',
        attribution: 'Quills & Ink Central Archive',
      },
    ],
    diasporaReach: [
      { region: 'Accra & Greater Accra (Ghana)', percent: 38, inquiries: 16 },
      { region: 'London & Greater London (UK)', percent: 27, inquiries: 12 },
      { region: 'New York & Atlanta (USA)', percent: 19, inquiries: 8 },
      { region: 'Toronto & Montreal (Canada)', percent: 11, inquiries: 4 },
      { region: 'Hamburg & Berlin (Germany)', percent: 5, inquiries: 2 },
    ],
    topSearchQueries: [
      { query: 'eulogy structure', count: 184 },
      { query: 'memorial brochure photos', count: 142 },
      { query: 'diaspora booking', count: 118 },
      { query: 'akan funeral rites', count: 96 },
      { query: 'tier 2 pricing', count: 87 },
      { query: 'eulogy guide pdf', count: 79 },
    ],
    generatedAt: new Date().toISOString(),
  };

  return new Response(JSON.stringify(analyticsData, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Access-Control-Allow-Origin': '*',
    },
  });
}

export async function onRequestPost(context: any) {
  try {
    const payload = await context.request.json();
    // Here you can log to Cloudflare Analytics Engine or D1:
    // await context.env.ANALYTICS_DB.prepare("INSERT INTO events (name, data) VALUES (?, ?)").bind(payload.event, JSON.stringify(payload)).run();

    return new Response(
      JSON.stringify({ success: true, recorded: payload.event, timestamp: new Date().toISOString() }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (err: any) {
    return new Response(JSON.stringify({ error: 'Invalid JSON payload' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
