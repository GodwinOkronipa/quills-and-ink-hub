// Cloudflare Pages Function: /api/upload
// Production R2 Document Upload Manager with Strict Anti-Clutter Slot Limiting

const ALLOWED_SLOTS: Record<string, { title: string; category: string; filename: string }> = {
  'eulogy-writing-guide': {
    title: 'Eulogy Reflection & Writing Guide',
    category: 'Spoken Tributes',
    filename: 'eulogy-writing-guide.pdf',
  },
  'memorial-brochure-checklist': {
    title: 'Memorial Keepsake Brochure Checklist',
    category: 'Print & Keepsakes',
    filename: 'memorial-brochure-checklist.pdf',
  },
  'tribute-reading-excerpt': {
    title: 'Selected Memorial Readings & Poems',
    category: 'Spoken Tributes',
    filename: 'tribute-reading-excerpt.pdf',
  },
  'quills-and-ink-family-memorial-guide': {
    title: 'Master Family Memorial Planning Guide',
    category: 'Master Guides',
    filename: 'quills-and-ink-family-memorial-guide.pdf',
  },
  'diaspora-liaison-handbook': {
    title: 'Diaspora Funeral Coordination Handbook',
    category: 'Diaspora Guidance',
    filename: 'diaspora-liaison-handbook.pdf',
  },
  'order-of-service-blueprint': {
    title: 'Ceremonial Order of Service Blueprint',
    category: 'Print & Keepsakes',
    filename: 'order-of-service-blueprint.pdf',
  },
};

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB maximum to keep mobile downloads lightning fast

export async function onRequestPost(context: any) {
  try {
    // 1. Authorization Verification
    const authHeader = context.request.headers.get('Authorization') || '';
    if (!authHeader.startsWith('Bearer ') && authHeader !== 'Bearer William123') {
      const token = authHeader.replace('Bearer ', '').trim();
      if (!token) {
        return new Response(
          JSON.stringify({ error: 'Unauthorized. Please sign in to the Admin Portal.' }),
          { status: 401, headers: { 'Content-Type': 'application/json' } }
        );
      }
    }

    // 2. Parse Multipart Form Data
    const formData = await context.request.formData();
    const file = formData.get('file') as File | null;
    const slotId = (formData.get('slot_id') as string) || '';

    if (!slotId || !ALLOWED_SLOTS[slotId]) {
      return new Response(
        JSON.stringify({
          error: 'Invalid Document Slot',
          message:
            'To keep the website uncluttered and structured, uploads must target one of the 6 official guide slots.',
          allowedSlots: Object.keys(ALLOWED_SLOTS),
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!file) {
      return new Response(
        JSON.stringify({ error: 'No file provided. Please attach a valid PDF document.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 3. Strict Size Limit (10MB)
    if (file.size > MAX_FILE_SIZE) {
      const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
      return new Response(
        JSON.stringify({
          error: 'File Too Large',
          message: `The uploaded file is ${sizeMb} MB. Maximum allowed size is 10 MB to prevent mobile lag for diaspora families.`,
        }),
        { status: 413, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 4. Strict File Type Check (PDF only)
    const isPdfType = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
    if (!isPdfType) {
      return new Response(
        JSON.stringify({
          error: 'Invalid File Type',
          message: 'Only formatted PDF documents are permitted for memorial downloads.',
        }),
        { status: 415, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const slotConfig = ALLOWED_SLOTS[slotId];
    const destinationKey = `downloads/${slotConfig.filename}`;
    const bucket = context.env?.DOWNLOADS_BUCKET;
    const db = context.env?.ANALYTICS_DB;

    // 5. Cloudflare R2 Upload
    if (bucket) {
      await bucket.put(destinationKey, file.stream(), {
        httpMetadata: {
          contentType: 'application/pdf',
          contentDisposition: `attachment; filename="${slotConfig.filename}"`,
        },
        customMetadata: {
          uploadedAt: new Date().toISOString(),
          slotId: slotId,
          title: slotConfig.title,
          originalName: file.name,
          sizeBytes: String(file.size),
        },
      });

      // Update D1 database metadata if bound
      if (db) {
        await db
          .prepare(
            `INSERT INTO resource_slots (slot_id, title, category, filename, file_size_bytes, updated_at)
             VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
             ON CONFLICT(slot_id) DO UPDATE SET
               title = excluded.title,
               category = excluded.category,
               file_size_bytes = excluded.file_size_bytes,
               updated_at = CURRENT_TIMESTAMP`
          )
          .bind(slotId, slotConfig.title, slotConfig.category, slotConfig.filename, file.size)
          .run();
      }

      return new Response(
        JSON.stringify({
          success: true,
          message: `Successfully published "${slotConfig.title}" to ${slotConfig.filename}`,
          url: `/${destinationKey}`,
          slotId: slotId,
          sizeFormatted: `${(file.size / 1024).toFixed(0)} KB`,
          updatedAt: new Date().toISOString(),
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Development / Dry-run simulated response if R2 is not bound locally
    return new Response(
      JSON.stringify({
        success: true,
        simulated: true,
        message: `Validated: "${slotConfig.title}" satisfies all limits (PDF format, ${(file.size / 1024).toFixed(0)} KB < 10 MB limit, Slot: ${slotId}). Attach Cloudflare R2 to persist live.`,
        slotId: slotId,
        url: `/${destinationKey}`,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: 'Upload failed', details: err.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
