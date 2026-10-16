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

console.log('Generating Print QA Checklist PDF & Operational SOPs...');

// 1. Generate Print Production QA Checklist PDF
const checklistHtml = `<!DOCTYPE html>
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
    width: 46px;
    height: 46px;
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
  .doc-badge {
    text-align: right;
    font-size: 8pt;
    color: #8a7e72;
  }
  .doc-badge strong {
    font-size: 11pt;
    color: #1a1612;
    display: block;
    font-family: 'Cormorant Garamond', serif;
    letter-spacing: 0.05em;
  }
  .meta-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
    background: #ffffff;
    border: 1px solid #e8d5c4;
    padding: 10px 14px;
    border-radius: 4px;
    margin-bottom: 16px;
  }
  .meta-item span {
    display: block;
    font-size: 7pt;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #8a7e72;
    margin-bottom: 2px;
  }
  .meta-item strong {
    font-size: 8.5pt;
    color: #1a1612;
  }
  .section-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 12pt;
    font-weight: 600;
    color: #1a1612;
    border-bottom: 1px solid #c9a892;
    padding-bottom: 4px;
    margin: 14px 0 8px 0;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    display: flex;
    justify-content: space-between;
  }
  .table {
    width: 100%;
    border-collapse: collapse;
    background: #ffffff;
    border: 1px solid #e8d5c4;
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 14px;
  }
  .table th {
    background: #f4ede6;
    font-size: 7.5pt;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #2c2416;
    padding: 6px 10px;
    text-align: left;
    border-bottom: 1px solid #e8d5c4;
  }
  .table td {
    padding: 6px 10px;
    font-size: 8pt;
    border-bottom: 1px solid #f0e6dc;
    vertical-align: middle;
  }
  .table tr:last-child td { border-bottom: none; }
  .table td.check-box {
    width: 30px;
    text-align: center;
    font-size: 10pt;
  }
  .box-square {
    width: 12px;
    height: 12px;
    border: 1px solid #8a7e72;
    display: inline-block;
    border-radius: 2px;
  }
  .sign-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-top: 15px;
    background: #ffffff;
    border: 1px solid #e8d5c4;
    padding: 14px;
    border-radius: 4px;
  }
  .sign-box {
    font-size: 8pt;
  }
  .sign-line {
    border-bottom: 1px solid #8a7e72;
    margin-top: 35px;
    margin-bottom: 4px;
  }
  .footer {
    margin-top: 15px;
    border-top: 1px solid #e8d5c4;
    padding-top: 8px;
    display: flex;
    justify-content: space-between;
    font-size: 7.5pt;
    color: #8a7e72;
  }
</style>
</head>
<body>
  <div class="header">
    <div class="brand-left">
      <img src="${logoPrimary}" alt="Quills and Ink Emblem">
      <div>
        <div class="brand-title">Quills &amp; Ink Hub</div>
        <div class="brand-sub">Executive Editorial &amp; Print Production Department</div>
      </div>
    </div>
    <div class="doc-badge">
      <strong>QA / Pre-Flight Sign-Off</strong>
      Form REF: QIH-PRN-2026-V1
    </div>
  </div>

  <div class="meta-grid">
    <div class="meta-item">
      <span>Honoree Memorial:</span>
      <strong>Late William Dowridge Adu-Asare</strong>
    </div>
    <div class="meta-item">
      <span>Print Run Quantity:</span>
      <strong>350 Copies (Velvet Foil Edition)</strong>
    </div>
    <div class="meta-item">
      <span>Assigned Press Partner:</span>
      <strong>Type Company / Buck Press Ltd</strong>
    </div>
    <div class="meta-item">
      <span>Dispatch Deadline:</span>
      <strong>Friday 14:00 GMT (Pre-Vigil)</strong>
    </div>
  </div>

  <div class="section-title">
    <span>Phase 1: Pre-Press Typography &amp; Content Certification</span>
    <span style="font-size: 8pt; color: #8a7e72; font-family: 'Montserrat';">Mandatory Prior to Platemaking</span>
  </div>
  <table class="table">
    <thead>
      <tr>
        <th style="width: 35px;">Status</th>
        <th style="width: 180px;">Inspection Item</th>
        <th>Tolerance &amp; Verification Protocol</th>
        <th style="width: 80px;">Verified By</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="check-box"><span class="box-square"></span></td>
        <td><strong>Family Sign-Off Signature</strong></td>
        <td>Final digital PDF proof signed &amp; dated by designated Family Spokesperson.</td>
        <td>Literary Dir.</td>
      </tr>
      <tr>
        <td class="check-box"><span class="box-square"></span></td>
        <td><strong>Orthography &amp; Twi / Ga Spelling</strong></td>
        <td>Verified correct spelling of traditional titles, stool names, clan lineages &amp; hymns.</td>
        <td>Editor</td>
      </tr>
      <tr>
        <td class="check-box"><span class="box-square"></span></td>
        <td><strong>Photo Resolution (300 DPI+)</strong></td>
        <td>No interpolated web screenshots; all archival portraiture sharpened and retouched.</td>
        <td>Art Director</td>
      </tr>
      <tr>
        <td class="check-box"><span class="box-square"></span></td>
        <td><strong>Bleed &amp; Creep Tolerances</strong></td>
        <td>Minimum 3.5mm outer bleed; inner creep allowance calculated for 32pp+ signatures.</td>
        <td>Pre-Press Lead</td>
      </tr>
    </tbody>
  </table>

  <div class="section-title">
    <span>Phase 2: Press &amp; Material Quality Inspection</span>
    <span style="font-size: 8pt; color: #8a7e72; font-family: 'Montserrat';">Substrate &amp; Finishing Verification</span>
  </div>
  <table class="table">
    <thead>
      <tr>
        <th style="width: 35px;">Status</th>
        <th style="width: 180px;">Inspection Item</th>
        <th>Standard Specifications</th>
        <th style="width: 80px;">Verified By</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="check-box"><span class="box-square"></span></td>
        <td><strong>Cover Stock Weight</strong></td>
        <td>350 GSM Silk Coated Art Card with Soft-Touch Velvet Anti-Scuff Lamination.</td>
        <td>Press Lead</td>
      </tr>
      <tr>
        <td class="check-box"><span class="box-square"></span></td>
        <td><strong>Interior Page Stock</strong></td>
        <td>170 GSM Munken Polar Rough or Premium Silk Art Paper (FSC Certified).</td>
        <td>Press Lead</td>
      </tr>
      <tr>
        <td class="check-box"><span class="box-square"></span></td>
        <td><strong>Gold Foil Stamping</strong></td>
        <td>Kurz Luxor 220 Warm Gold; clean edges with zero foil flaking or haloing.</td>
        <td>Finishing Lead</td>
      </tr>
      <tr>
        <td class="check-box"><span class="box-square"></span></td>
        <td><strong>Spine Creasing &amp; Binding</strong></td>
        <td>Square back PUR bind or precise saddle stitch; no cracking along spine crease.</td>
        <td>Bindery Head</td>
      </tr>
      <tr>
        <td class="check-box"><span class="box-square"></span></td>
        <td><strong>Color Balance (CMYK Density)</strong></td>
        <td>Skin tones balanced natural warm; rich black density (C60 M40 Y40 K100).</td>
        <td>Press Operator</td>
      </tr>
    </tbody>
  </table>

  <div class="section-title">
    <span>Phase 3: Dispatch &amp; Sanctuary Protocol</span>
    <span style="font-size: 8pt; color: #8a7e72; font-family: 'Montserrat';">Logistics to Venue</span>
  </div>
  <table class="table">
    <thead>
      <tr>
        <th style="width: 35px;">Status</th>
        <th style="width: 180px;">Inspection Item</th>
        <th>Ceremony Delivery Requirement</th>
        <th style="width: 80px;">Verified By</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="check-box"><span class="box-square"></span></td>
        <td><strong>Moisture-Sealed Shrinkwrap</strong></td>
        <td>Bundled in protective moisture-proof packs of 25 to prevent tropical humidity curling.</td>
        <td>Logistics Lead</td>
      </tr>
      <tr>
        <td class="check-box"><span class="box-square"></span></td>
        <td><strong>VIP Keepsake Boxed Copies</strong></td>
        <td>10 Archival Hardcover copies boxed with satin ribbon for immediate family and clergy.</td>
        <td>Concierge</td>
      </tr>
      <tr>
        <td class="check-box"><span class="box-square"></span></td>
        <td><strong>On-Site Delivery Protocol</strong></td>
        <td>Direct handover to Quills &amp; Ink Head of Secretariat at venue 2 hours prior to filing-past.</td>
        <td>Coordinator</td>
      </tr>
    </tbody>
  </table>

  <div class="sign-grid">
    <div class="sign-box">
      <strong>Press Production Manager Sign-Off:</strong>
      <div class="sign-line"></div>
      Name &amp; Date: _________________________________________
    </div>
    <div class="sign-box">
      <strong>Quills &amp; Ink Hub Quality Director Sign-Off:</strong>
      <div class="sign-line"></div>
      Name &amp; Date: _________________________________________
    </div>
  </div>

  <div class="footer">
    <span>Quills &amp; Ink Hub · Accra &amp; London · quillsandinkhub.com</span>
    <span>Quality Assurance SOP · Ref 2026-PRN-QA</span>
  </div>
</body>
</html>`;

const tempChecklistHtml = path.join(rootDir, 'scripts', 'temp', 'qa-checklist-render.html');
fs.writeFileSync(tempChecklistHtml, checklistHtml);

const checklistPdfDest = path.join(opsDir, 'Print-Production-and-Vendor-Sign-Off-Checklist.pdf');
console.log('Rendering QA Checklist PDF to:', checklistPdfDest);
execSync(`"${chromePath}" --headless=new --disable-gpu --no-first-run --no-default-browser-check --print-to-pdf="${checklistPdfDest}" "file:///${tempChecklistHtml.replace(/\\\\/g, '/')}"`);
console.log('Saved QA Checklist PDF successfully!');

// 2. Generate Transatlantic Diaspora Coordination SOP
const diasporaSopMarkdown = `# Quills & Ink Hub · Transatlantic Diaspora Family Coordination Protocol
**Standard Operating Procedure (SOP):** QIH-OPS-DIA-04  
**Target Audiences:** Families based in the United Kingdom, United States, Canada, Europe, and UAE planning ceremonies in Accra, Kumasi, Cape Coast, or Akropong.  
**Operational Offices:** Accra, Ghana & London, United Kingdom  

---

## 1. Executive Summary & Philosophy
When a family loses a loved one while living abroad, the grief is compounded by physical distance, conflicting time zones, cultural anxiety, and the logistical burden of coordinating an elaborate Ghanaian ceremony from 5,000 miles away.

Quills & Ink Hub serves as the family's trusted literary and event concierge on the ground in Accra. Our protocol ensures:
1. Complete transparency and reassurance through virtual planning.
2. Effortless contribution of tributes and photos from relatives scattered globally.
3. Culturally authentic, dignified execution in Ghana without family burn-out.

---

## 2. Seven-Stage Diaspora Journey Map

### Stage 1: The Compassionate Discovery Call (Day 1–2)
- **Format:** 45-minute private Google Meet or WhatsApp Video consultation.
- **Participants:** Family Head (Ghana), Diaspora Coordinator (UK/US), and Quills & Ink Client Partner.
- **Objectives:**
  - Understand the life story, religious affiliation, and tribal heritage (Akan, Ga, Ewe, Northern).
  - Clarify ceremonial scope: Church lying-in-state, private burial, reception grounds, and thanksgiving.
  - Establish a single designated Diaspora Liaison to prevent conflicting decisions across siblings.

### Stage 2: Asynchronous Tribute Collection & Digital Vault (Days 3–10)
- **The Challenge:** Relatives across London, Toronto, and Atlanta struggle to submit written tributes on time.
- **The Quills & Ink Solution:**
  - Dedicated **Encrypted WhatsApp Tribute Line**: Relatives who cannot find time to type can simply send 3 to 5-minute voice notes.
  - Our literary editors transcribe, polish, and synthesize these spoken memories into poetic, publishable tributes while preserving each child’s distinct voice.
  - Cloud Upload Portal for high-resolution archival family photos, certificates, and diplomas.

### Stage 3: Virtual Editorial Review & Proof Sign-Off (Days 11–16)
- Digital Flipbook proof delivered via private password-protected link.
- Collaborative review session where family members verify name order, clan titles, and photo captions simultaneously.
- Formal sign-off on the *QA Pre-Flight Checklist* before the presses roll.

### Stage 4: Transatlantic Advance Copies via Air Courier (Days 17–20)
- For VIP family members traveling from Heathrow (LHR), Gatwick (LGW), JFK, Dulles (IAD), or Pearson (YYZ):
  - 10 advance soft-touch keepsake copies can be couriered directly to the London or US residence via DHL Express before the family boards their flight to Kotoka International Airport (ACC).
  - Gives traveling mourners peace of mind to hold the completed heirloom before traveling.

### Stage 5: Financial Transparency & Multi-Currency Settlement
- We eliminate the hassle of informal currency transfers:
  - Invoices payable in GBP (£), USD ($), CAD ($), EUR (€), or GHS (₵).
  - Transparent itemized invoices with no hidden line items.
  - Integrated corporate payment gateways: Wise, Stripe, Bank of Ghana Swift, and MTN MoMo Merchant.

### Stage 6: The On-Site Ceremony Concierge in Accra (Ceremony Weekend)
- Our protocol secretariat arrives at the chapel and reception grounds 3 hours before start time:
  - Ushers in coordinated commemorative uniforms manage guest flow.
  - Altar sanctuary with framed portrait, condolence register, and memorial candles prepared.
  - High-definition live-stream integration for elderly and international relatives unable to travel.
  - Dedicated *Nsawa* donation desk systematically recording sympathy gifts with auditable receipts.

### Stage 7: The Post-Ceremony Archival Box & Delivery (Week 2 Post-Ceremony)
- Handover of the master archival presentation box:
  - 5 to 10 pristine hardcover keepsake volumes.
  - The leather-bound Condolence Guest Register.
  - Financial ledger recording all sympathy donations (*Nsawa*).
  - Digital USB archive with all retouched photographs, eulogy audio, and live-stream recording.

---

## 3. Dedicated Diaspora Communication Protocol
- **Guaranteed Response Window:** Under 2 hours during GMT / BST / EST waking hours.
- **Emergency WhatsApp Concierge:** +233 53 922 3757 (Available 24/7 during ceremony week).
`;

fs.writeFileSync(path.join(opsDir, 'Transatlantic_Diaspora_Coordination_SOP.md'), diasporaSopMarkdown);
console.log('Saved Transatlantic_Diaspora_Coordination_SOP.md successfully!');

// 3. Generate 30-Day Social Media Content Calendar
const calendarMarkdown = `# Quills & Ink Hub · 30-Day Social Media Editorial Calendar
**Strategic Focus:** Establishing brand authority, cultural reverence, and diaspora peace of mind.  
**Target Channels:** Instagram (Primary), Facebook, LinkedIn (High-Net-Worth Diaspora), WhatsApp Status.  
**Optimized Posting Time:**
- **Morning Slot:** 07:30 GMT (Accra Commute & Morning Reflection)
- **Evening Slot:** 18:00 GMT / 19:00 BST / 14:00 EST (Peak Diaspora Overlap)

---

## Content Pillars & Ratio
- 🏛️ **Pillar 1: Cultural Heritage & Wisdom (30%)** — Ghanaian funeral traditions, Adinkra cloth meanings, Ga/Akan rites.
- 🖋️ **Pillar 2: The Craft of Literary Care (25%)** — Tangible papers, foil stamping, vintage photo restoration, eulogy writing.
- 🕊️ **Pillar 3: Solemn Retrospectives & Case Studies (25%)** — Real-world family celebrations of life (Nicholas Nii Adamma & William Dowridge Adu-Asare).
- 🤝 **Pillar 4: Compassionate Protocol & Diaspora Care (20%)** — Etiquette for guests, diaspora logistics, Nsawa recording, live-streaming.

---

## Month 1 Day-by-Day Matrix

| Day | Date | Pillar | Series / Asset | Format | Hook / Headline | Target Time |
|---|---|---|---|---|---|---|
| **Day 01** | Mon | Teaser | Series 1 · Post 01 | Single Image | "Every life carries a sacred weight. We are preparing to hold it." | 07:30 GMT |
| **Day 03** | Wed | Teaser | Series 1 · Post 02 | Single Image | "Where Every Story Finds Its Space." | 18:00 GMT |
| **Day 05** | Fri | Heritage | Series 5 · Post 08 | Single Image | "Wisdom from the Elders: What Adinkra Teaches Us About Passing." | 07:30 GMT |
| **Day 08** | Mon | Brand Intro | Series 2 · Post 03 | Single Image | "Two Worlds. One Sacred Hub: Event Coordination & Fine Literary Care." | 07:30 GMT |
| **Day 10** | Wed | Craft | Series 8 · Post 01 | Single Image | "The Materiality of Memory: Why Physical Keepsakes Outlive Digital Feeds." | 18:00 GMT |
| **Day 12** | Fri | Etiquette | Series 5 · Post 07 | Single Image | "Ghanaian Funeral Etiquette: How to Greet Chief Mourners at the Altar." | 07:30 GMT |
| **Day 15** | Mon | **Case Study 1** | **Series 3 · Slide 01–04** | **Carousel (4)** | **"Retrospective: The Memorial of Nicholas Nii Adamma at All Souls."** | **18:00 GMT** |
| **Day 17** | Wed | Brand Ethos | Series 2 · Post 04 | Single Image | "Care That Listens Before It Plans." | 07:30 GMT |
| **Day 19** | Fri | Heritage | Series 6 · Post 09 | Single Image | "When Mourning Becomes A Royal Homegoing: West African Celebrations of Life." | 18:00 GMT |
| **Day 22** | Mon | **Heritage Study**| **Series 4 · Slide 01–04** | **Carousel (4)** | **"The Secret Language of Ghanaian Mourning Cloth (Kuntunkuni, Kobene, White)."** | **18:00 GMT** |
| **Day 24** | Wed | Craft | Series 8 · Post 02 | Single Image | "The Archive Desk: How We Unearth the Forgotten Chapters of an Elder's Life." | 07:30 GMT |
| **Day 26** | Fri | Diaspora Care | Series 2 · Post 05 | Single Image | "A Bridge Across Oceans: How We Relieve Families in London, NY & Toronto." | 18:00 GMT |
| **Day 28** | Sun | Global Custom | Series 6 · Post 10 | Single Image | "The Irish Wake: Unhurried Storytelling by Candlelight." | 14:00 GMT |
| **Day 29** | Mon | **Case Study 2** | **Series 7 · Slide 01–05** | **Carousel (5)** | **"Retrospective: The Life & Service of William Dowridge Adu-Asare Snr."** | **18:00 GMT** |
| **Day 30** | Wed | Craft | Series 8 · Post 04 | Single Image | "Heirlooms for Children and Grandchildren Yet Unborn: The Estate Suite." | 07:30 GMT |

---

## Strategic Community Management Rules
1. **Never Sell in Comments:** If someone asks about price or availability, respond publicly with condolences and invite them to a private conversation:
   > *"Our deepest sympathies for your loss. We have sent you a quiet direct message with our brochure and WhatsApp concierge link. May peace be with your family."*
2. **Reverent Imagery Only:** Never post unfiltered graphic scenes or casket distress. Only post dignified portraits, architectural beauty, floral sanctuaries, and fine print art.
3. **Diaspora Pacing:** Ensure direct WhatsApp link (\`https://wa.me/233539223757\`) is in the bio link at all times.
`;

fs.writeFileSync(path.join(desktopPackDir, '06_Social_Media_Launch_Pack', '30_Day_Social_Media_Content_Calendar.md'), calendarMarkdown);
console.log('Saved 30_Day_Social_Media_Content_Calendar.md successfully!');

// 4. Update Social_Media_Copy_Deck_and_Captions.md with Series 7 & Series 8
let existingDeck = fs.readFileSync(path.join(desktopPackDir, '06_Social_Media_Launch_Pack', 'Social_Media_Copy_Deck_and_Captions.md'), 'utf-8');

const series7And8Copy = `
---

## Series 7: Case Study Carousel 2 · William Dowridge Adu-Asare Snr (Kwame Adu)

### Overview
- **Honoree:** Late William Dowridge Adu-Asare Snr (Kwame Adu, 1960–2026)
- **Venues:** The Church in Accra & Dreamz and Memoriez Events Garden, Achimota
- **Scope:** Full Funeral Secretariat, Floral Altar Staging, Nsawa Donation Desk, Memorial Announcements & Tributes.
- **Format:** 5-Slide Carousel (1080x1080px)

### Slide 01: Cover · Memorial Altar & Candlelight
- **Graphic:** \`Series_7_Case_Study_William_Dowridge_Adu_Asare/Slide_01_Cover_Memorial_Altar_and_Candlelight.png\`
- **Slide Headline:** The Memorial Service of the Late William Dowridge Adu-Asare Snr (Kwame Adu)
- **Caption Hook:** How do you honor a patriarch whose warmth touched hundreds of lives across generations?

### Slide 02: Liturgical Solemnity & Program Design
- **Graphic:** \`Series_7_Case_Study_William_Dowridge_Adu_Asare/Slide_02_Liturgical_Solemnity_and_Program_Design.png\`
- **Slide Headline:** Harmonizing Hymns, Scripture & Rites

### Slide 03: The Garden Sanctuary & Canopy Reception
- **Graphic:** \`Series_7_Case_Study_William_Dowridge_Adu_Asare/Slide_03_The_Garden_Sanctuary_Dreamz_and_Memoriez.png\`
- **Slide Headline:** Dreamz & Memoriez Events Garden, Achimota

### Slide 04: The Protocol Secretariat & Nsawa Registry
- **Graphic:** \`Series_7_Case_Study_William_Dowridge_Adu_Asare/Slide_04_Protocol_Secretariat_and_Nsawa_Registry.png\`
- **Slide Headline:** Transparent Nsawa & Condolence Recording

### Slide 05: A Voice of Gratitude & Lasting Legacy
- **Graphic:** \`Series_7_Case_Study_William_Dowridge_Adu_Asare/Slide_05_Living_Memory_and_Voice_of_Thanks.png\`
- **Slide Headline:** Words that Endure

### Complete Carousel Caption (Post as One Carousel):
> When family and community gathered in Achimota and Amrahia-Otinibi to celebrate the life of the late William Dowridge Adu-Asare Snr (affectionately known to all as Kwame Adu), the mandate was clear: honor his memory with quiet elegance, deep Christian reverence, and seamless hospitality.
>
> From the early morning lying-in-state at The Church in Accra near Kingsby Roundabout to the expansive garden reception at Dreamz & Memoriez Events Garden, every touchpoint was handled with care:
>
> 🕯️ A commemorative altar draped in ceremonial crimson, illuminated with candles for quiet prayer.  
> 📜 Typeset memorial announcements and order of service harmonized with church officiants.  
> 🌿 Open-air garden canopy zoning ensuring comfortable seating for elders and dignified hospitality for hundreds of mourners.  
> 📝 A dedicated protocol secretariat and Nsawa donation desk logging condolences and sympathy gifts with complete transparency.  
> 🎙️ Moving eulogies and a heartfelt vote of thanks celebrating a patriarch whose legacy lives on.
>
> A life well lived leaves an indelible mark. It was our sacred honor to walk beside the Adu-Asare family throughout this homegoing.
>
> 🕊️ Swipe through the retrospective above to explore the rites.
- **Hashtags:** \`#WilliamDowridgeAduAsare #KwameAdu #GhanaianFuneral #Achimota #CelebrationOfLife #QuillsAndInkHub #FuneralProtocol #Nsawa #Accra\`

---

## Series 8: The Craft of Literary Care & Archival Remembrance

### Post 01: The Touch of Tangible Memory
- **Graphic:** \`Series_8_The_Craft_of_Literary_Care/Post_01_The_Touch_of_Tangible_Memory.png\`
- **Suggested Schedule:** Week 4 · Wednesday 18:00 GMT
- **Caption:**
  > In an age of fleeting screens, grief demands weight.
  >
  > When a daughter or grandson sits in the chapel pew and opens an ivory keepsake booklet, the hands register something profound before the eyes read a single line:
  >
  > The heavy 350gsm textured cotton cardstock.  
  > The subtle indent of blind debossed lettering.  
  > The quiet gleam of genuine gold leaf.  
  >
  > Digital tributes disappear in social feeds. Physical keepsakes rest on living room tables and bedside nightstands for fifty years—reminding every generation who they came from.
- **Hashtags:** \`#MaterialityOfMemory #PrintCraft #MemorialKeepsake #ArchivalPaper #QuillsAndInkHub #GhanaianHeritage\`

---

### Post 02: The Archive Desk: Unearthing Forgotten Chapters
- **Graphic:** \`Series_8_The_Craft_of_Literary_Care/Post_02_Unearthing_Forgotten_Stories.png\`
- **Suggested Schedule:** Week 6 · Wednesday 07:30 GMT
- **Caption:**
  > An elder’s life cannot be compressed into a hurried list of dates and schools.
  >
  > At our literary desk, we look deeper. We examine 1960s black-and-white family albums, listen to voice recordings sent by cousins in London and Toronto, and interview church elders about the quiet generosity that never made the newspapers.
  >
  > Writing a eulogy is not merely about reciting facts—it is about restoring memory to poetry.
- **Hashtags:** \`#EulogyWriting #OralHistory #FamilyArchives #Storytelling #LiteraryCare #QuillsAndInkHub\`

---

### Post 03: Sealed in Dignity: The Wax Seal Tribute Envelope
- **Graphic:** \`Series_8_The_Craft_of_Literary_Care/Post_03_Sealed_With_Reverence_The_Wax_Seal.png\`
- **Suggested Schedule:** Week 7 · Friday 18:00 GMT
- **Caption:**
  > Some words are too tender to be left loose on a table.
  >
  > For immediate children, spouses, and honored dignitaries, we enclose bespoke spoken tributes in handmade deckled cotton envelopes, sealed by hand with warm gold sealing wax.
  >
  > Because when love reaches its final earthbound chapter, the rituals of closing should be unhurried and beautiful.
- **Hashtags:** \`#WaxSeal #TributeLetter #BespokeStationery #DignityInFarewells #QuillsAndInkHub\`

---

### Post 04: Heirlooms for Generations Yet Unborn: The Estate Suite
- **Graphic:** \`Series_8_The_Craft_of_Literary_Care/Post_04_Heirlooms_For_Generations_Unborn.png\`
- **Suggested Schedule:** Week 8 · Wednesday 07:30 GMT
- **Caption:**
  > When the last hymn has been sung and the garden reception quietly empties, what remains?
  >
  > Our Archival Estate Suite gathers every ceremonial artifact into a handcrafted linen presentation box: the gilded hardcover tribute book, the leather-bound guest registry, and the archival recordings.
  >
  > Created not only for those who wept on the day, but for great-grandchildren who will one day ask: 'Tell me about the patriarch who started our family.'
- **Hashtags:** \`#FamilyHeirloom #EstateSuite #ArchivalPreservation #MemorialBook #QuillsAndInkHub\`
`;

fs.writeFileSync(path.join(desktopPackDir, '06_Social_Media_Launch_Pack', 'Social_Media_Copy_Deck_and_Captions.md'), existingDeck + series7And8Copy);
console.log('Updated Social_Media_Copy_Deck_and_Captions.md with Series 7 & 8!');

// 5. Update Root README
const updatedRootReadme = `# Quills & Ink Hub · Official Client Master Deliverable Pack
**Prepared For:** Quills & Ink Hub Leadership  
**Production Date:** October 2026  
**Operational Hubs:** Accra, Ghana & London, United Kingdom  
**Package Version:** 2.0 (Executive Production & Operations Suite)

---

### 📁 Comprehensive Directory Index

#### \`01_Brand_Guidelines_PDF/\`
- **Quills-and-Ink-Hub-Executive-Brand-Guide-2026.pdf**: The comprehensive 6-page A4 Landscape master brand book. Contains logo architecture, symbolism of the dove & quill, color tokens, typography scales (Cormorant Garamond, Great Vibes, Montserrat), social tone of voice, authentic ceremony photography standards, and technical print production specifications.

#### \`02_Brand_Identity_Logos/\`
- **Vector_SVG/**: Scalable vector files for web, apps, print, and signage (\`dove-logo-primary.svg\`, \`dove-logo-gold.svg\`, \`dove-logo-white.svg\`, \`quills-and-ink-favicon.svg\`).
- **HighRes_PNG/**: Ultra high-resolution transparent background PNGs (\`dove-logo-primary-transparent.png\`, \`dove-logo-gold-transparent.png\`, \`dove-logo-white-transparent.png\`).

#### \`03_High_Fidelity_Mockups/\`
- **12 Photorealistic Editorial & Product Mockups** (Zero AI giveaways; authentic natural lighting, travertine stone, raw deckled linen, brass pen, gardenias):
  - \`01_keepsake_cover_hardcover.jpg\`: Soft-Touch Matte Velvet Laminate Cover with gold foil embossing on travertine stone.
  - \`02_keepsake_interior_spread.jpg\`: Open double-page memorial spread showing portrait framing and typography.
  - \`03_stationery_collection_flatlay.jpg\`: Top-down flat-lay showing complete harmonized ceremony stationery suite.
  - \`04_ceremony_welcome_easel_signage.jpg\`: Arched ivory entrance easel in stone courtyard with calla lilies.
  - \`05_condolence_registry_and_candle.jpg\`: Leather-bound guest register with warm amber hurricane lamp and pen.
  - \`06_diaspora_editorial_planning_desk.jpg\`: Laptop with chapel blueprint, proof draft, coffee & notebook.
  - \`07_tribute_linen_envelope_and_wax_seal.jpg\`: Macro shot of deckled cotton envelope with champagne gold wax seal and brass fountain pen.
  - \`08_family_memorial_reading_chapel.jpg\`: Candid documentary photograph of Ghanaian mourner reading keepsake in church cloister.
  - \`09_archival_memorial_box_and_ribbon.jpg\`: Espresso linen bookcloth presentation box with gilded album and sage ribbon.
  - \`10_monochrome_thanksgiving_stationery_flatlay.jpg\`: Memorial thanksgiving garden terrace tablescape with deckled prayer card and crystal goblet.
  - \`11_hands_holding_adinkra_memorial_booklet.jpg\`: Elder's hands in authentic black Adinkra cloth holding ivory memorial booklet.
  - \`12_vintage_ghanaian_photo_archive_and_inkwell.jpg\`: Archival desk with 1967 Accra family photo album, brass magnifying glass, dip pen & inkwell.

#### \`04_Event_Photography_Archive/\`
- Real-world authentic funeral ceremony photography from coordinated events:
  - **Nicholas_Nii_Adamma_Service/**: Kente casket drapery, All Souls' Chapel exterior, sanctuary congregation, family elders.
  - **William_Dowridge_Adu_Asare_Service/**: Altar portrait registry, commemorative invitation, garden reception, donation protocol desk.

#### \`05_Print_Guides_and_Literature/\`
- **Eulogy-Writing-Guide.pdf**: Editorial guide for crafting intimate spoken eulogies.
- **Memorial-Brochure-Checklist.pdf**: Family checklist for gathering biography, hymns, and photo selections.
- **Tribute-Reading-Excerpt.pdf**: Ceremonial spoken reading excerpt.
- **Family-Memorial-Master-Guide.pdf**: Full master planning guide.

#### \`06_Social_Media_Launch_Pack/\`
- **28 High-Resolution Social Media Graphics (1080x1080px)** across 8 strategic series:
  1. *Series 1: Brand Teasers & Launch Anticipation* (2 posts)
  2. *Series 2: Brand & Services Introduction* (3 posts)
  3. *Series 3: Case Study Carousel 1 · Nicholas Nii Adamma Memorial* (4 slides)
  4. *Series 4: Case Study Carousel 2 · The Language of Ghanaian Mourning Cloth* (4 slides)
  5. *Series 5: Funeral Trivia & Cultural Wisdom* (3 posts)
  6. *Series 6: Global & Cross-Cultural Funeral Customs* (3 posts)
  7. *Series 7: Case Study Carousel 3 · William Dowridge Adu-Asare Memorial* (5 slides)
  8. *Series 8: The Craft of Literary Care & Archival Remembrance* (4 posts)
- **Social_Media_Copy_Deck_and_Captions.md**: Ready-to-copy captions, headlines, hashtags, and schedule for all 28 posts and carousel slides.
- **30_Day_Social_Media_Content_Calendar.md**: Day-by-day 30-day posting matrix mapping every single asset to specific dates, times (GMT, BST, EST), content pillars, and engagement actions.

#### \`07_Client_Operations_and_Intake_Kit/\`
- **Quills-and-Ink-Executive-Rate-Card-2026.pdf**: Executive pricing matrix across 3 tiers (Private Family, Estate Suite, Transatlantic Commemoration) with transparent inclusions and add-ons.
- **Client-Consultation-Intake-Questionnaire.pdf**: Complete family intake questionnaire for gathering lineage, biography, photo curation, and logistical requirements.
- **Print-Production-and-Vendor-Sign-Off-Checklist.pdf**: 10-point rigorous physical pre-flight inspection checklist for bindery, foil temperature, spine creasing, paper grain, and family head sign-off.
- **WhatsApp_Business_Automations_and_Scripts.md**: Complete suite of empathy-first auto-replies, consultation booking scripts, proof delivery protocols, and bereavement etiquette.
- **Transatlantic_Diaspora_Coordination_SOP.md**: 7-stage standard operating procedure for guiding diaspora families in London, New York, Atlanta, Toronto, and Washington DC.

---
**Desk Contact:** Telephone & WhatsApp: +233 53 922 3757 · Email: hello@quillsandinkhub.com · Web: quillsandinkhub.com
`;

fs.writeFileSync(path.join(desktopPackDir, 'README_CLIENT_DELIVERY.md'), updatedRootReadme);
console.log('Master Desktop Client Deliverable Pack README updated successfully!');
