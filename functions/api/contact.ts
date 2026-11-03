// Cloudflare Pages Function: /api/contact
// Worker Edge endpoint that receives form submissions, logs to Cloudflare D1,
// and sends formatted emails directly to quillsninkhub@gmail.com using Cloudflare Email Service

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

function escapeHtml(str: string): string {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export async function onRequestPost(context: any) {
  const jsonHeaders = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  };

  try {
    let payload: Record<string, any> = {};

    const contentType = context.request.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      payload = await context.request.json();
    } else if (contentType.includes('form')) {
      const formData = await context.request.formData();
      formData.forEach((value: any, key: string) => {
        payload[key] = value;
      });
    } else {
      payload = await context.request.json().catch(() => ({}));
    }

    const name = (payload.name || '').trim();
    const email = (payload.email || '').trim();
    const phone = (payload.phone || '').trim();
    const message = (payload.message || '').trim();

    if (!name || !email) {
      return new Response(
        JSON.stringify({ success: false, error: 'Full name and email address are required.' }),
        { status: 400, headers: jsonHeaders }
      );
    }

    const isBooking = Boolean(payload.date || payload.time || payload.meetingMode || payload.interest);

    // Build subject and details based on form type
    let subject = '';
    let htmlContent = '';
    let textContent = '';

    if (isBooking) {
      const date = payload.date || 'To be scheduled';
      const time = payload.time || 'Flexible';
      const timezone = payload.timezone || 'GMT';
      const location = payload.location || 'Not specified';
      const meetingMode = payload.meetingMode || 'WhatsApp Video / Audio';
      const interest = payload.interest || 'General Consultation';

      subject = `[Consultation Request] ${name} — ${interest} (${date} at ${time})`;

      textContent = `
NEW MEMORIAL CONSULTATION REQUEST
Quills & Ink Hub Website Desk

Client Details:
- Name: ${name}
- Email: ${email}
- Phone/WhatsApp: ${phone}
- Location: ${location}
- Time Zone: ${timezone}

Appointment Preferences:
- Preferred Date: ${date}
- Preferred Time: ${time}
- Preferred Channel: ${meetingMode}
- Service Needed: ${interest}

Family Notes / Cultural Considerations:
${message || 'None provided.'}

Timestamp: ${new Date().toUTCString()}
      `.trim();

      htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #faf8f5; color: #1a1612; margin: 0; padding: 24px; }
    .card { max-width: 620px; margin: 0 auto; background: #ffffff; border: 1px solid #e6e0d8; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 18px rgba(44, 36, 22, 0.05); }
    .header { background: #221c16; color: #ffffff; padding: 24px; border-bottom: 3px solid #c9a892; }
    .header h1 { margin: 0; font-size: 20px; font-weight: 600; letter-spacing: 0.02em; }
    .header p { margin: 6px 0 0 0; font-size: 13px; color: #c9a892; text-transform: uppercase; letter-spacing: 0.1em; }
    .content { padding: 28px 24px; }
    .badge { display: inline-block; background: #fdf2e9; color: #b8927a; font-weight: 700; font-size: 11px; padding: 4px 10px; border-radius: 999px; margin-bottom: 16px; border: 1px solid #e8d5c4; }
    table { width: 100%; border-collapse: collapse; margin-top: 12px; margin-bottom: 20px; }
    th { text-align: left; padding: 10px 12px; background: #fbf9f6; font-size: 12px; text-transform: uppercase; letter-spacing: 0.06em; color: #8a7e72; border-bottom: 1px solid #e6e0d8; width: 35%; }
    td { padding: 10px 12px; font-size: 14px; border-bottom: 1px solid #f3eee8; color: #2c2416; }
    .notes-box { background: #fbf9f6; border: 1px solid #e6e0d8; border-radius: 8px; padding: 16px; font-size: 14px; line-height: 1.6; color: #3d3226; margin-top: 8px; white-space: pre-wrap; }
    .reply-box { margin-top: 24px; padding: 16px; background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 8px; font-size: 13px; color: #065f46; }
    .footer { background: #fbf9f6; padding: 16px 24px; text-align: center; font-size: 12px; color: #8a7e72; border-top: 1px solid #e6e0d8; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <p>Quills &amp; Ink Hub · Editorial Desk</p>
      <h1>New Memorial Consultation Booking</h1>
    </div>
    <div class="content">
      <span class="badge">CONSULTATION REQUEST</span>
      <table>
        <tr><th>Full Name</th><td><strong>${escapeHtml(name)}</strong></td></tr>
        <tr><th>Email Address</th><td><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
        <tr><th>Phone / WhatsApp</th><td><strong>${escapeHtml(phone || 'Not provided')}</strong></td></tr>
        <tr><th>Client Location</th><td>${escapeHtml(location)}</td></tr>
        <tr><th>Client Time Zone</th><td>${escapeHtml(timezone)}</td></tr>
        <tr><th>Preferred Date</th><td><strong>${escapeHtml(date)}</strong></td></tr>
        <tr><th>Preferred Time</th><td><strong>${escapeHtml(time)} (${escapeHtml(timezone)})</strong></td></tr>
        <tr><th>Meeting Channel</th><td>${escapeHtml(meetingMode)}</td></tr>
        <tr><th>Requested Service</th><td><strong>${escapeHtml(interest)}</strong></td></tr>
      </table>

      <h3 style="font-size: 14px; text-transform: uppercase; letter-spacing: 0.06em; color: #8a7e72; margin: 18px 0 6px;">Family Notes &amp; Cultural Considerations</h3>
      <div class="notes-box">${escapeHtml(message || 'No additional notes provided.')}</div>

      <div class="reply-box">
        💡 <strong>Quick Reply:</strong> You can hit "Reply" in your email client to respond directly to <strong>${escapeHtml(name)}</strong> at <code>${escapeHtml(email)}</code>.
      </div>
    </div>
    <div class="footer">
      Quills &amp; Ink Hub — Sent via Cloudflare Edge Worker to quillsninkhub@gmail.com
    </div>
  </div>
</body>
</html>
      `.trim();
    } else {
      const formSubject = payload.subject || 'Website General Inquiry';
      subject = `[Website Inquiry] ${name}: ${formSubject}`;

      textContent = `
NEW WEBSITE INQUIRY
Quills & Ink Hub Website Desk

Sender Details:
- Name: ${name}
- Email: ${email}
- Phone/WhatsApp: ${phone}
- Subject: ${formSubject}

Message:
${message || 'No message content.'}

Timestamp: ${new Date().toUTCString()}
      `.trim();

      htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #faf8f5; color: #1a1612; margin: 0; padding: 24px; }
    .card { max-width: 620px; margin: 0 auto; background: #ffffff; border: 1px solid #e6e0d8; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 18px rgba(44, 36, 22, 0.05); }
    .header { background: #221c16; color: #ffffff; padding: 24px; border-bottom: 3px solid #c9a892; }
    .header h1 { margin: 0; font-size: 20px; font-weight: 600; letter-spacing: 0.02em; }
    .header p { margin: 6px 0 0 0; font-size: 13px; color: #c9a892; text-transform: uppercase; letter-spacing: 0.1em; }
    .content { padding: 28px 24px; }
    .badge { display: inline-block; background: #fdf2e9; color: #b8927a; font-weight: 700; font-size: 11px; padding: 4px 10px; border-radius: 999px; margin-bottom: 16px; border: 1px solid #e8d5c4; }
    table { width: 100%; border-collapse: collapse; margin-top: 12px; margin-bottom: 20px; }
    th { text-align: left; padding: 10px 12px; background: #fbf9f6; font-size: 12px; text-transform: uppercase; letter-spacing: 0.06em; color: #8a7e72; border-bottom: 1px solid #e6e0d8; width: 35%; }
    td { padding: 10px 12px; font-size: 14px; border-bottom: 1px solid #f3eee8; color: #2c2416; }
    .notes-box { background: #fbf9f6; border: 1px solid #e6e0d8; border-radius: 8px; padding: 16px; font-size: 14px; line-height: 1.6; color: #3d3226; margin-top: 8px; white-space: pre-wrap; }
    .reply-box { margin-top: 24px; padding: 16px; background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 8px; font-size: 13px; color: #065f46; }
    .footer { background: #fbf9f6; padding: 16px 24px; text-align: center; font-size: 12px; color: #8a7e72; border-top: 1px solid #e6e0d8; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <p>Quills &amp; Ink Hub · Editorial Desk</p>
      <h1>New Memorial Inquiry</h1>
    </div>
    <div class="content">
      <span class="badge">GENERAL INQUIRY</span>
      <table>
        <tr><th>Full Name</th><td><strong>${escapeHtml(name)}</strong></td></tr>
        <tr><th>Email Address</th><td><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
        <tr><th>Phone / WhatsApp</th><td><strong>${escapeHtml(phone || 'Not provided')}</strong></td></tr>
        <tr><th>Subject</th><td><strong>${escapeHtml(formSubject)}</strong></td></tr>
      </table>

      <h3 style="font-size: 14px; text-transform: uppercase; letter-spacing: 0.06em; color: #8a7e72; margin: 18px 0 6px;">Client Message</h3>
      <div class="notes-box">${escapeHtml(message || 'No message content provided.')}</div>

      <div class="reply-box">
        💡 <strong>Quick Reply:</strong> You can hit "Reply" in your email client to respond directly to <strong>${escapeHtml(name)}</strong> at <code>${escapeHtml(email)}</code>.
      </div>
    </div>
    <div class="footer">
      Quills &amp; Ink Hub — Sent via Cloudflare Edge Worker to quillsninkhub@gmail.com
    </div>
  </div>
</body>
</html>
      `.trim();
    }

    // -------------------------------------------------------------------------
    // 1. Dispatch Email via Cloudflare Email Service (`send_email` binding)
    // -------------------------------------------------------------------------
    const emailBinding = context.env?.EMAIL || context.env?.SEND_EMAIL;
    const TO_EMAIL = 'quillsninkhub@gmail.com';
    const FROM_EMAIL = context.env?.FROM_EMAIL || 'inquiries@quillsandinkhub.com';
    const FROM_NAME = 'Quills & Ink Hub';

    let emailSent = false;
    let emailError = null;

    if (emailBinding && typeof emailBinding.send === 'function') {
      try {
        // 1. Try modern Cloudflare Email Service format
        await emailBinding.send({
          to: TO_EMAIL,
          from: { email: FROM_EMAIL, name: FROM_NAME },
          replyTo: email,
          subject: subject,
          html: htmlContent,
          text: textContent,
        });
        emailSent = true;
      } catch (err: any) {
        console.warn('Modern object email send failed, attempting EmailMessage MIME format:', err);
        try {
          // 2. Fallback to classic Cloudflare EmailMessage MIME format
          // @ts-ignore - Internal Cloudflare workerd runtime module
          const { EmailMessage } = await import('cloudflare:email');
          const rawMime = [
            `From: "${FROM_NAME}" <${FROM_EMAIL}>`,
            `To: <${TO_EMAIL}>`,
            `Reply-To: <${email}>`,
            `Subject: ${subject}`,
            'MIME-Version: 1.0',
            'Content-Type: multipart/alternative; boundary="quills_mime_boundary"',
            '',
            '--quills_mime_boundary',
            'Content-Type: text/plain; charset="UTF-8"',
            'Content-Transfer-Encoding: 7bit',
            '',
            textContent,
            '',
            '--quills_mime_boundary',
            'Content-Type: text/html; charset="UTF-8"',
            'Content-Transfer-Encoding: 7bit',
            '',
            htmlContent,
            '',
            '--quills_mime_boundary--',
          ].join('\r\n');

          const mimeMsg = new EmailMessage(FROM_EMAIL, TO_EMAIL, rawMime);
          await emailBinding.send(mimeMsg);
          emailSent = true;
        } catch (mimeErr: any) {
          console.error('All Cloudflare email sending methods failed:', mimeErr);
          emailError = mimeErr.message || err.message;
        }
      }
    } else {
      console.warn(
        'Cloudflare EMAIL binding not found in environment. Ensure "send_email" binding is enabled in Cloudflare Dashboard.'
      );
    }

    // -------------------------------------------------------------------------
    // 2. Persist Touchpoint to Cloudflare D1 Database (for real-time Admin Desk)
    // -------------------------------------------------------------------------
    const db = context.env?.ANALYTICS_DB;
    if (db) {
      try {
        const cf = context.request.cf || {};
        const country = cf.country || 'GH';
        const city = cf.city || 'Accra';

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

        await db
          .prepare(
            `INSERT INTO events (event_name, path, query, country, city, ip_hash)
             VALUES (?, ?, ?, ?, ?, ?)`
          )
          .bind(
            'consultation_cta_click',
            isBooking ? '/book' : '/contact',
            isBooking ? `Booking: ${payload.interest || 'Consultation'} by ${name}` : `Inquiry: ${name}`,
            country,
            city,
            ipHash
          )
          .run();
      } catch (dbErr) {
        console.warn('Could not record event in D1:', dbErr);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        emailSent: emailSent,
        warning: emailSent ? null : 'Inquiry stored. Email binding awaiting Cloudflare dashboard activation.',
        recipient: TO_EMAIL,
      }),
      { status: 200, headers: jsonHeaders }
    );
  } catch (err: any) {
    console.error('Contact Worker error:', err);
    return new Response(
      JSON.stringify({ success: false, error: 'Internal processing error: ' + err.message }),
      { status: 500, headers: jsonHeaders }
    );
  }
}

