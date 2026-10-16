import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const desktopPackDir = 'C:\\Users\\gokro\\Desktop\\Quills and Ink Hub - Client Pack';
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const opsDir = path.join(desktopPackDir, '07_Client_Operations_and_Intake_Kit');
fs.mkdirSync(opsDir, { recursive: true });

function toBase64(relPath) {
  const fullPath = path.join(rootDir, relPath);
  if (!fs.existsSync(fullPath)) return '';
  const ext = path.extname(fullPath).toLowerCase().replace('.', '');
  const mime = ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' : ext === 'png' ? 'image/png' : 'image/svg+xml';
  const data = fs.readFileSync(fullPath).toString('base64');
  return `data:${mime};base64,${data}`;
}

const embeddedFontsCssPath = path.join(rootDir, 'scripts', 'temp', 'embedded-fonts.css');
const embeddedFontsCss = fs.readFileSync(embeddedFontsCssPath, 'utf-8');

const logoPrimary = toBase64('public/images/brand/dove_logo_primary.png');
const logoGold = toBase64('public/images/brand/dove_logo_gold.png');

console.log('Generating Executive Rate Card & Client Intake Form PDFs...');

// 1. Executive Rate Card HTML
const rateCardHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
  ${embeddedFontsCss}
  @page { size: A4 portrait; margin: 12mm 14mm; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: 'Montserrat', sans-serif;
    color: #1a1612;
    background: #faf8f5;
    line-height: 1.5;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
    font-size: 8.5pt;
  }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid #c9a892;
    padding-bottom: 12px;
    margin-bottom: 15px;
  }
  .brand-left {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .brand-left img {
    width: 48px;
    height: 48px;
    object-fit: contain;
  }
  .brand-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 18pt;
    font-weight: 600;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #1a1612;
  }
  .brand-sub {
    font-size: 7.5pt;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #5c4a38;
  }
  .contact-meta {
    text-align: right;
    font-size: 7.5pt;
    color: #8a7e72;
    line-height: 1.4;
  }
  .contact-meta strong { color: #1a1612; }
  .script { font-family: 'Great Vibes', cursive; font-size: 20pt; color: #c9a892; }
  
  .intro-strip {
    background: #ffffff;
    border: 1px solid #e8d5c4;
    padding: 10px 14px;
    border-radius: 4px;
    margin-bottom: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .intro-strip p { font-size: 8pt; color: #5c4a38; max-width: 75%; }
  
  .packages-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    margin-bottom: 15px;
  }
  .pkg-card {
    background: #ffffff;
    border: 1px solid #e8d5c4;
    border-radius: 4px;
    padding: 12px 14px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .pkg-card--featured {
    border: 1.5px solid #c9a892;
    box-shadow: 0 4px 15px rgba(201,168,146,0.15);
    background: #ffffff;
    position: relative;
  }
  .featured-tag {
    position: absolute;
    top: -9px;
    right: 12px;
    background: #c9a892;
    color: #ffffff;
    font-size: 6pt;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    padding: 2px 8px;
    border-radius: 10px;
  }
  .pkg-tag {
    font-size: 6.5pt;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    font-weight: 600;
    color: #c9a892;
    margin-bottom: 2px;
  }
  .pkg-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 14pt;
    font-weight: 600;
    color: #1a1612;
    margin-bottom: 6px;
    line-height: 1.15;
  }
  .pkg-desc {
    font-size: 7.2pt;
    color: #5c4a38;
    line-height: 1.4;
    margin-bottom: 10px;
    min-height: 30px;
  }
  .pkg-includes {
    list-style: none;
    font-size: 7.2pt;
    color: #3d3226;
    line-height: 1.55;
    border-top: 1px solid #f0eae1;
    padding-top: 8px;
  }
  .pkg-includes li {
    margin-bottom: 4px;
    position: relative;
    padding-left: 10px;
  }
  .pkg-includes li::before {
    content: '—';
    position: absolute;
    left: 0;
    color: #c9a892;
  }

  .addons-box {
    background: #ffffff;
    border: 1px solid #e8d5c4;
    border-radius: 4px;
    padding: 10px 14px;
    margin-bottom: 12px;
  }
  .addons-box h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 11pt;
    font-weight: 600;
    color: #1a1612;
    margin-bottom: 6px;
    border-bottom: 1px solid #f0eae1;
    padding-bottom: 4px;
  }
  .addons-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    font-size: 7.2pt;
    color: #5c4a38;
  }
  .addon-item strong { color: #1a1612; display: block; font-size: 7.5pt; }

  .footer-strip {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #e6e0d8;
    padding-top: 8px;
    font-size: 7pt;
    color: #8a7e72;
  }
  .footer-strip strong { color: #1a1612; }
</style>
</head>
<body>
  <div class="header">
    <div class="brand-left">
      <img src="${logoPrimary}" alt="Quills & Ink Emblem">
      <div>
        <div class="brand-title">Quills &amp; Ink Hub</div>
        <div class="brand-sub">Event Planning &amp; Coordination · Literary Care</div>
      </div>
    </div>
    <div class="contact-meta">
      <strong>Secretariat &amp; Client Desk</strong><br>
      WhatsApp: +233 53 922 3757 · Accra &amp; London<br>
      Email: hello@quillsandinkhub.com
    </div>
  </div>

  <div class="intro-strip">
    <div>
      <div class="script">Care that listens before it plans...</div>
      <p>Transparent, dignified funeral planning packages crafted for Ghanaian families at home and across the diaspora.</p>
    </div>
    <div style="font-size: 8pt; font-weight: 600; color: #2c2416; text-transform: uppercase; letter-spacing: 0.1em; text-align: right;">
      2026 Rate Card<br><span style="font-weight: 400; color: #8a7e72;">Confidential Client Edition</span>
    </div>
  </div>

  <div class="packages-grid">
    <!-- Tier I -->
    <div class="pkg-card">
      <div>
        <div class="pkg-tag">Tier I · Focused Support</div>
        <div class="pkg-name">Essential Coordination</div>
        <div class="pkg-desc">Logistical structure and liturgical direction for families with active local support.</div>
        <ul class="pkg-includes">
          <li>Initial listening consultation (virtual/Accra)</li>
          <li>Order of service liturgy curation &amp; pacing</li>
          <li>Venue &amp; vendor liaison checklist</li>
          <li>Timeline and procession coordination</li>
          <li>Remote day-of oversight and troubleshooting</li>
        </ul>
      </div>
      <div style="margin-top: 10px; font-size: 7pt; color: #8a7e72; border-top: 1px solid #f0eae1; padding-top: 6px;">
        Ideal for: Chapel services &amp; intimate family ceremonies.
      </div>
    </div>

    <!-- Tier II -->
    <div class="pkg-card pkg-card--featured">
      <div class="featured-tag">Most Chosen</div>
      <div>
        <div class="pkg-tag">Tier II · Full Support</div>
        <div class="pkg-name">Complete Memorial Care</div>
        <div class="pkg-desc">Full-spectrum planning and on-the-ground management for a dignified, stress-free farewell.</div>
        <ul class="pkg-includes">
          <li>Everything in Tier I Essential Coordination</li>
          <li>Dedicated lead coordinator &amp; on-site team</li>
          <li>Direct vendor control (catering, florals, canopy)</li>
          <li>Memorial brochure editorial proofing &amp; layout</li>
          <li>International family briefing call (UK/US/Canada)</li>
          <li>Live-stream coordination &amp; virtual participation</li>
          <li>Protocol desk for dignitaries, chiefs &amp; elders</li>
        </ul>
      </div>
      <div style="margin-top: 10px; font-size: 7pt; color: #8a7e72; border-top: 1px solid #f0eae1; padding-top: 6px;">
        Ideal for: Full church service &amp; outdoor receptions (200–500 guests).
      </div>
    </div>

    <!-- Tier III -->
    <div class="pkg-card">
      <div>
        <div class="pkg-tag">Tier III · Comprehensive</div>
        <div class="pkg-name">Legacy Gathering</div>
        <div class="pkg-desc">Tailored concierge for multi-day, multi-location state or large family celebrations of life.</div>
        <ul class="pkg-includes">
          <li>Everything in Tier II Complete Memorial Care</li>
          <li>Multi-day scheduling (Wake, Burial, Thanksgiving)</li>
          <li>Full literary suite (Eulogy, tributes, 36pg brochure)</li>
          <li>Diaspora airport transfers &amp; accommodation</li>
          <li>Executive floral styling &amp; casket drapery</li>
          <li>Donation protocol desk &amp; Nsawa audit register</li>
          <li>Post-funeral family archive compilation</li>
        </ul>
      </div>
      <div style="margin-top: 10px; font-size: 7pt; color: #8a7e72; border-top: 1px solid #f0eae1; padding-top: 6px;">
        Ideal for: Prominent elders, multi-location rites &amp; high attendance.
      </div>
    </div>
  </div>

  <div class="addons-box">
    <h3>Bespoke Standalone &amp; Literary Add-Ons</h3>
    <div class="addons-grid">
      <div class="addon-item">
        <strong>Spoken Eulogy &amp; Biography Writing</strong>
        Crafted from intimate family interviews into evocative, respectful spoken literature.
      </div>
      <div class="addon-item">
        <strong>Velvet-Touch Memorial Brochures</strong>
        250gsm silk cover with soft-touch matte velvet laminate &amp; metallic gold foil stamping.
      </div>
      <div class="addon-item">
        <strong>Diaspora Voice-Note Synthesis</strong>
        Gathering reflections from siblings abroad into a polished, unified family keepsake.
      </div>
      <div class="addon-item">
        <strong>Nsawa Donation Secretariat</strong>
        Serialized receipting desk, donation ledger, and cashless mobile diaspora transfers.
      </div>
      <div class="addon-item">
        <strong>Ceremonial Welcome Signage Suite</strong>
        Arched ivory welcome easels with fresh white gardenias and monstera floral clusters.
      </div>
      <div class="addon-item">
        <strong>Turnaround Protocol</strong>
        Approximately 3 weeks for complete brochure design and printing after content is confirmed.
      </div>
    </div>
  </div>

  <div class="footer-strip">
    <div><strong>Quills and Ink Hub</strong> · Where Every Story Finds Its Space · quillsandinkhub.com</div>
    <div>Accra Desk: +233 53 922 3757 · London Concierge Desk</div>
  </div>
</body>
</html>`;

// 2. Client Consultation Intake Form HTML
const intakeFormHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
  ${embeddedFontsCss}
  @page { size: A4 portrait; margin: 12mm 14mm; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: 'Montserrat', sans-serif;
    color: #1a1612;
    background: #ffffff;
    line-height: 1.45;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
    font-size: 8pt;
  }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid #c9a892;
    padding-bottom: 10px;
    margin-bottom: 12px;
  }
  .brand-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 16pt;
    font-weight: 600;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #1a1612;
  }
  .form-title {
    font-size: 11pt;
    font-weight: 600;
    color: #2c2416;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: 2px;
  }
  .form-sub { font-size: 7.5pt; color: #8a7e72; }

  .section-box {
    border: 1px solid #d9cebf;
    border-radius: 4px;
    padding: 9px 12px;
    margin-bottom: 10px;
    background: #faf8f5;
  }
  .section-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 11pt;
    font-weight: 600;
    color: #1a1612;
    margin-bottom: 6px;
    border-bottom: 1px solid #e8d5c4;
    padding-bottom: 3px;
    display: flex;
    justify-content: space-between;
  }
  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
  .grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; }
  
  .field { margin-bottom: 5px; }
  .field label {
    display: block;
    font-size: 6.8pt;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #5c4a38;
    margin-bottom: 2px;
  }
  .line-input {
    width: 100%;
    height: 20px;
    border-bottom: 1px solid #a89a8c;
    background: #ffffff;
    border: 1px solid #e2d7cc;
    border-radius: 2px;
    padding: 0 6px;
  }
  .checkbox-group {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 4px;
    font-size: 7.2pt;
    color: #3d3226;
  }
  .checkbox-item { display: flex; align-items: center; gap: 4px; }
  .box { width: 11px; height: 11px; border: 1px solid #7a6e62; border-radius: 2px; background: #ffffff; }

  .footer-note {
    font-size: 6.8pt;
    color: #8a7e72;
    text-align: center;
    border-top: 1px solid #e6e0d8;
    padding-top: 6px;
    margin-top: 8px;
  }
</style>
</head>
<body>
  <div class="header">
    <div style="display: flex; align-items: center; gap: 10px;">
      <img src="${logoPrimary}" style="width: 40px; height: 40px; object-fit: contain;">
      <div>
        <div class="brand-title">Quills &amp; Ink Hub</div>
        <div style="font-size: 7pt; color: #5c4a38; letter-spacing: 0.1em; text-transform: uppercase;">Client Coordination Secretariat</div>
      </div>
    </div>
    <div style="text-align: right;">
      <div class="form-title">Consultation Intake Form</div>
      <div class="form-sub">Confidential Family Planning Record</div>
    </div>
  </div>

  <!-- Section 1 -->
  <div class="section-box">
    <div class="section-title">
      <span>1. Deceased &amp; Family Information</span>
      <span style="font-size: 7pt; font-weight: normal; color: #8a7e72;">Reference ID: QIH-2026-____</span>
    </div>
    <div class="grid-2">
      <div class="field"><label>Full Name of the Late (with titles/ancestral names):</label><div class="line-input"></div></div>
      <div class="field"><label>Sunrise (Date of Birth) &amp; Sunset (Date of Passing):</label><div class="line-input"></div></div>
    </div>
    <div class="grid-3">
      <div class="field"><label>Hometown &amp; Traditional Ancestry:</label><div class="line-input"></div></div>
      <div class="field"><label>Primary Church / Fellowship Affiliation:</label><div class="line-input"></div></div>
      <div class="field"><label>Officiating Clergy / Pastor Name:</label><div class="line-input"></div></div>
    </div>
    <div class="grid-2">
      <div class="field"><label>Primary Family Lead / Spokesperson Name &amp; Role:</label><div class="line-input"></div></div>
      <div class="field"><label>Primary Telephone &amp; WhatsApp Number:</label><div class="line-input"></div></div>
    </div>
  </div>

  <!-- Section 2 -->
  <div class="section-box">
    <div class="section-title">
      <span>2. Schedule of Ceremonial Rites &amp; Venues</span>
    </div>
    <div class="grid-3">
      <div class="field"><label>Laying in State / Pre-Burial Venue:</label><div class="line-input"></div></div>
      <div class="field"><label>Date &amp; Filing-Past Time:</label><div class="line-input"></div></div>
      <div class="field"><label>Expected Attendees:</label><div class="line-input"></div></div>
    </div>
    <div class="grid-3">
      <div class="field"><label>Church Memorial / Burial Service Venue:</label><div class="line-input"></div></div>
      <div class="field"><label>Burial Service Date &amp; Time:</label><div class="line-input"></div></div>
      <div class="field"><label>Cemetery / Committal Location:</label><div class="line-input"></div></div>
    </div>
    <div class="grid-2">
      <div class="field"><label>Final Funeral Rites / Reception Venue:</label><div class="line-input"></div></div>
      <div class="field"><label>Sunday Thanksgiving Service Church &amp; Time:</label><div class="line-input"></div></div>
    </div>
  </div>

  <!-- Section 3 -->
  <div class="section-box">
    <div class="section-title">
      <span>3. Services Requested</span>
    </div>
    <div class="checkbox-group">
      <div class="checkbox-item"><div class="box"></div> Full Event Coordination</div>
      <div class="checkbox-item"><div class="box"></div> Order of Service Liturgy Design</div>
      <div class="checkbox-item"><div class="box"></div> Spoken Eulogy Writing</div>
      <div class="checkbox-item"><div class="box"></div> Family Tribute Synthesis</div>
      <div class="checkbox-item"><div class="box"></div> Memorial Keepsake Brochure Print</div>
      <div class="checkbox-item"><div class="box"></div> Floral Styling &amp; Casket Drapery</div>
      <div class="checkbox-item"><div class="box"></div> Donation Secretariat Desk (Nsawa)</div>
      <div class="checkbox-item"><div class="box"></div> Welcome Signage &amp; Easels</div>
    </div>
  </div>

  <!-- Section 4 -->
  <div class="section-box">
    <div class="section-title">
      <span>4. Diaspora Family Integration</span>
    </div>
    <div class="grid-2">
      <div class="field"><label>Key Family Members Overseas (UK, US, Canada, Europe):</label><div class="line-input"></div></div>
      <div class="field"><label>Preferred Consultation Time Zone (GMT, BST, EST, PST):</label><div class="line-input"></div></div>
    </div>
    <div class="checkbox-group">
      <div class="checkbox-item"><div class="box"></div> High-Quality Ceremony Live-Stream Required</div>
      <div class="checkbox-item"><div class="box"></div> Overseas Voice-Note Tribute Collection Needed</div>
      <div class="checkbox-item"><div class="box"></div> International Brochure Delivery to London / North America</div>
    </div>
  </div>

  <!-- Section 5 -->
  <div class="section-box">
    <div class="section-title">
      <span>5. Memorial Brochure &amp; Keepsake Specifications</span>
    </div>
    <div class="grid-3">
      <div class="field"><label>Estimated Quantity of Copies:</label><div class="line-input"></div></div>
      <div class="field"><label>Estimated Page Count (e.g., 24, 32, 40):</label><div class="line-input"></div></div>
      <div class="field"><label>Finishing (Velvet Matte / Gold Foil):</label><div class="line-input"></div></div>
    </div>
  </div>

  <div class="footer-note">
    Please return completed form via WhatsApp to <strong>+233 53 922 3757</strong> or email to <strong>hello@quillsandinkhub.com</strong>.<br>
    Quills and Ink Hub · East Legon, Accra &amp; London, UK · quillsandinkhub.com
  </div>
</body>
</html>`;

const tempDir = path.join(rootDir, 'scripts', 'temp');
fs.writeFileSync(path.join(tempDir, 'rate-card-render.html'), rateCardHtml);
fs.writeFileSync(path.join(tempDir, 'intake-form-render.html'), intakeFormHtml);

const rateCardPdfDest = path.join(opsDir, 'Quills-and-Ink-Executive-Rate-Card-2026.pdf');
const intakeFormPdfDest = path.join(opsDir, 'Client-Consultation-Intake-Questionnaire.pdf');

const chromeFlags = `--headless=new --disable-gpu --no-first-run --no-default-browser-check --no-pdf-header-footer`;

console.log('Rendering Rate Card PDF...');
execSync(`"${chromePath}" ${chromeFlags} --print-to-pdf="${rateCardPdfDest}" "file:///${path.join(tempDir, 'rate-card-render.html').replace(/\\\\/g, '/')}"`);
console.log('Saved Rate Card PDF:', rateCardPdfDest);

console.log('Rendering Intake Form PDF...');
execSync(`"${chromePath}" ${chromeFlags} --print-to-pdf="${intakeFormPdfDest}" "file:///${path.join(tempDir, 'intake-form-render.html').replace(/\\\\/g, '/')}"`);
console.log('Saved Intake Form PDF:', intakeFormPdfDest);

// 3. WhatsApp Scripts & Client SOPs
const whatsappScriptsMd = `# Quills & Ink Hub · WhatsApp Business Client Care Scripts & SOPs
**Designed For:** Secretariat, Client Care Coordinators & Lead Planners  
**Primary Channel:** WhatsApp Business (+233 53 922 3757)  

---

### 1. Initial Inquiry & Grief Response (Within 15 Minutes)
**When to send:** Immediately upon receiving an inbound inquiry regarding funeral services.

> Good day [Family Name / Elder Name],  
>  
> On behalf of all of us at Quills & Ink Hub, please accept our heartfelt condolences on the passing of your beloved [Papa / Mama / Uncle / Sister]. May God grant your family peace and strength in this tender season.  
>  
> We exist to bring quiet order and reverence to this journey—handling both the ceremonial logistics and the literary craft of tributes and memorial brochures.  
>  
> When you and your family are ready, we would be honored to hold a brief, unhurried listening consultation (in person in East Legon or via WhatsApp/Zoom if family members are joining from abroad).  
>  
> Would tomorrow morning at [Time] or afternoon at [Time] work for a gentle discussion?  
>  
> With warm sympathy,  
> **Client Care Secretariat · Quills and Ink Hub**  
> *Where Every Story Finds Its Space*

---

### 2. WhatsApp Group Broadcast for Family Tribute Collection
**When to send:** To be shared directly into the bereaved family's WhatsApp organizing group.

> Dear Family,  
>  
> As we prepare to celebrate the life and legacy of our beloved [Full Name of the Late], Quills & Ink Hub has been entrusted to compile the official commemorative memorial brochure.  
>  
> To ensure every child, grandchild, sibling, and church fellowship is beautifully represented, please submit your written tributes, reflections, or voice notes by **[Deadline Date]**.  
>  
> **A Few Helpful Guidelines:**  
> 1. **Word Count:**  
>    • Children & Spouse Tributes: 300–500 words  
>    • Grandchildren & In-laws: 150–250 words  
>    • Church / Corporate Fellowships: 200–350 words  
> 2. **Voice Notes Welcome:** If writing feels difficult, feel free to send a WhatsApp voice note speaking freely about your cherished memories. Our editorial team will transcribe and polish it with literary grace.  
> 3. **Photographs:** Please send high-resolution digital photos or clear scans of cherished vintage family pictures.  
>  
> Send all submissions directly to this chat or via email to: **hello@quillsandinkhub.com**.  
>  
> *"A life well lived is a quiet hymn that echoes across generations."*

---

### 3. Diaspora Coordination & Remote Briefing Script
**When to send:** To family heads living in the UK, USA, Canada, or Europe.

> Good day [Name],  
>  
> We recognize that coordinating funeral arrangements in Accra while you are in [London / New York / Toronto] can feel overwhelming across time zones.  
>  
> Please rest assured that our on-the-ground team in Accra will manage every detail with absolute precision and transparency. We have scheduled an executive video briefing with your local family elders for **[Date & Time in your local time zone]**.  
>  
> We will review:  
> • Verified church and reception seating arrangements  
> • Order of service liturgy and hymn selections  
> • Photo proofs of the floral wreaths and casket drapery  
> • High-definition live-stream access links for relatives who cannot travel to Ghana  
>  
> If you have any questions before then, our desk remains on standby.

---

### 4. Brochure Proofing & Final Approval Script
**When to send:** When sending the PDF proof of the memorial brochure for sign-off.

> Dear [Family Lead Name],  
>  
> Our editorial division has completed the full design and typesetting of the commemorative memorial brochure for [Name of the Late].  
>  
> Please find attached the complete proof for your review:  
> 📄 **[Attachment: Brochure_Proof_v1.pdf]**  
>  
> **Please double-check:**  
> 1. Spelling of all family names, chief mourners, and pallbearers  
> 2. Designation of officiating clergy and church banners  
> 3. Order and verse accuracy of liturgical hymns  
> 4. Placement and captions of family photographs  
>  
> Once your family gives formal approval, we will proceed to precision printing (250gsm silk velvet cover with metallic gold foil stamping). Press turnaround is approximately **3 weeks** to delivery.  
>  
> Respectfully submitted,  
> **Editorial Production Desk · Quills & Ink Hub**
`;

fs.writeFileSync(path.join(opsDir, 'WhatsApp_Business_Automations_and_Scripts.md'), whatsappScriptsMd);
console.log('Saved WhatsApp_Business_Automations_and_Scripts.md');

console.log('Client Operations & Intake Kit successfully generated!');
