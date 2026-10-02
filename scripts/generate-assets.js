import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

console.log('Generating updated PDFs with visible editorial imagery & contact update notices...');

// 1. OG Image Template (1200 x 630)
const ogHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,400&family=Great+Vibes&family=Montserrat:wght@300;400;500;600&display=swap');
  
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    width: 1200px;
    height: 630px;
    background: #faf8f5;
    font-family: 'Montserrat', sans-serif;
    color: #1a1612;
    display: flex;
    overflow: hidden;
    position: relative;
  }
  
  .bg-glow {
    position: absolute;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(201, 168, 146, 0.25) 0%, rgba(250, 248, 245, 0) 70%);
    top: -100px;
    left: -100px;
    pointer-events: none;
  }
  
  .border-frame {
    position: absolute;
    inset: 24px;
    border: 1px solid #e2d7cc;
    pointer-events: none;
  }
  .border-frame-inner {
    position: absolute;
    inset: 30px;
    border: 1px solid rgba(201, 168, 146, 0.4);
    pointer-events: none;
  }

  .content-left {
    flex: 1.25;
    padding: 70px 60px 70px 75px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    z-index: 2;
  }

  .brand-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    text-transform: uppercase;
    letter-spacing: 0.16em;
    color: #8a7e72;
    font-weight: 500;
  }
  .brand-badge::before {
    content: '';
    display: inline-block;
    width: 8px;
    height: 8px;
    background: #c9a892;
    border-radius: 50%;
  }

  .script-logo {
    font-family: 'Great Vibes', cursive;
    font-size: 64px;
    color: #2c2416;
    line-height: 1.1;
    margin-top: 6px;
    margin-bottom: 2px;
  }

  .main-heading {
    font-family: 'Cormorant Garamond', serif;
    font-size: 42px;
    font-weight: 500;
    line-height: 1.22;
    color: #1a1612;
    margin-bottom: 16px;
    max-width: 580px;
  }

  .main-heading em {
    font-style: italic;
    color: #a07255;
  }

  .description {
    font-family: 'Cormorant Garamond', serif;
    font-size: 21px;
    line-height: 1.45;
    color: #5c4a38;
    max-width: 540px;
    margin-bottom: 24px;
  }

  .tag-pills {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }

  .pill {
    background: #f3eee8;
    border: 1px solid #e4dacd;
    padding: 8px 16px;
    border-radius: 999px;
    font-size: 13px;
    font-weight: 500;
    color: #3d3226;
    letter-spacing: 0.02em;
  }

  .content-right {
    flex: 0.95;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .image-wrapper {
    position: absolute;
    inset: 34px 34px 34px 0;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 20px 45px rgba(44, 36, 22, 0.12);
    border: 1px solid #e0d5c7;
  }

  .image-wrapper img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .overlay-card {
    position: absolute;
    bottom: 50px;
    left: 20px;
    background: rgba(250, 248, 245, 0.94);
    backdrop-filter: blur(12px);
    border: 1px solid #d8cbbe;
    padding: 16px 22px;
    border-radius: 8px;
    box-shadow: 0 12px 30px rgba(0,0,0,0.08);
  }

  .overlay-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 18px;
    font-weight: 600;
    color: #2c2416;
  }
  .overlay-sub {
    font-size: 12px;
    color: #8a7e72;
    margin-top: 2px;
  }
</style>
</head>
<body>
  <div class="bg-glow"></div>
  <div class="border-frame"></div>
  <div class="border-frame-inner"></div>

  <div class="content-left">
    <div>
      <div class="brand-badge">Accra, Ghana &amp; Global Diaspora</div>
      <div class="script-logo">Quills &amp; Ink Hub</div>
      <h1 class="main-heading">Funeral planning &amp; literary care <em>honouring a life well lived</em>.</h1>
      <p class="description">
        Dignified consultations, personalized eulogies, and full-spectrum funeral coordination crafted with cultural reverence and quiet precision.
      </p>
    </div>
    
    <div class="tag-pills">
      <span class="pill">Event Coordination</span>
      <span class="pill">Spoken Eulogies &amp; Tributes</span>
      <span class="pill">Memorial Brochures</span>
      <span class="pill">Diaspora Concierge</span>
    </div>
  </div>

  <div class="content-right">
    <div class="image-wrapper">
      <img src="https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=1200&q=80" alt="Warm tranquil memory floral" />
      <div class="overlay-card">
        <div class="overlay-title">Honouring Ghanaian Heritage</div>
        <div class="overlay-sub">Serving Families in Ghana · UK · USA · Canada</div>
      </div>
    </div>
  </div>
</body>
</html>`;

// 2. Eulogy Writing Guide PDF Template (A4 with visible images & contact update notice)
const eulogyPdfHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,600&family=Great+Vibes&family=Montserrat:wght@300;400;500;600&display=swap');
  
  @page {
    size: A4 portrait;
    margin: 14mm 12mm 14mm 12mm;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: 'Montserrat', sans-serif;
    color: #1a1612;
    background: #faf8f5;
    line-height: 1.55;
    font-size: 10pt;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  .border-box {
    border: 1px solid #d9cebf;
    padding: 22px 26px;
    background: #ffffff;
    box-shadow: 0 4px 15px rgba(0,0,0,0.02);
  }

  .header-band {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    border-bottom: 2px solid #c9a892;
    padding-bottom: 12px;
    margin-bottom: 18px;
  }

  .logo-group h1 {
    font-family: 'Great Vibes', cursive;
    font-size: 32pt;
    color: #2c2416;
    line-height: 1;
    font-weight: normal;
  }
  .logo-group .sub {
    font-size: 8pt;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: #8a7e72;
    margin-top: 3px;
    font-weight: 500;
  }

  .doc-meta {
    text-align: right;
    font-size: 8pt;
    color: #5c4a38;
    line-height: 1.35;
  }
  .doc-badge {
    display: inline-block;
    background: #f3eee8;
    color: #5c4a38;
    font-weight: 600;
    padding: 3px 8px;
    border-radius: 4px;
    font-size: 7.5pt;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-bottom: 4px;
  }

  .doc-title-block {
    text-align: center;
    margin-bottom: 18px;
  }
  .doc-title-block h2 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 22pt;
    color: #2c2416;
    font-weight: 600;
    line-height: 1.15;
    margin-bottom: 4px;
  }
  .doc-title-block p {
    font-family: 'Cormorant Garamond', serif;
    font-style: italic;
    font-size: 12.5pt;
    color: #705f4e;
  }

  /* Visible Images Hero Grid */
  .intro-visual-grid {
    display: grid;
    grid-template-columns: 1.4fr 1fr;
    gap: 16px;
    margin-bottom: 20px;
    background: #faf8f5;
    border: 1px solid #ebd8c8;
    padding: 14px;
    border-radius: 6px;
  }
  .intro-text p {
    font-size: 9.2pt;
    line-height: 1.55;
    color: #3d3226;
    margin-bottom: 8px;
  }
  .intro-text p:last-child { margin-bottom: 0; }
  
  .intro-image-frame {
    border-radius: 6px;
    overflow: hidden;
    height: 135px;
    box-shadow: 0 4px 12px rgba(44, 36, 22, 0.08);
    border: 1px solid #e4dacd;
    position: relative;
  }
  .intro-image-frame img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .image-caption {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(26, 22, 18, 0.72);
    color: #faf8f5;
    font-size: 6.5pt;
    padding: 3px 6px;
    text-align: center;
    letter-spacing: 0.04em;
  }

  .section-heading {
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 16px 0 10px;
  }
  .section-num {
    background: #c9a892;
    color: white;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 7.5pt;
    font-weight: 600;
  }
  .section-heading h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 14pt;
    font-weight: 600;
    color: #2c2416;
  }

  .cards-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-bottom: 16px;
  }

  .guide-card {
    background: #ffffff;
    border: 1px solid #e6ded4;
    border-top: 3px solid #c9a892;
    padding: 10px 12px;
    border-radius: 3px;
  }
  .guide-card h4 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 11.5pt;
    font-weight: 600;
    color: #2c2416;
    margin-bottom: 4px;
  }
  .guide-card ul {
    list-style: none;
    padding-left: 0;
  }
  .guide-card li {
    font-size: 8.2pt;
    color: #4a3e33;
    margin-bottom: 4px;
    position: relative;
    padding-left: 12px;
    line-height: 1.35;
  }
  .guide-card li::before {
    content: '•';
    position: absolute;
    left: 2px;
    color: #c9a892;
  }

  .quote-and-image-strip {
    display: grid;
    grid-template-columns: 1fr 110px;
    gap: 14px;
    margin: 14px 0;
    background: #fbf9f6;
    border-left: 3px solid #b8927a;
    padding: 10px 14px;
    align-items: center;
  }
  .quote-content {
    font-family: 'Cormorant Garamond', serif;
    font-size: 12pt;
    font-style: italic;
    color: #3d3226;
    line-height: 1.45;
  }
  .quote-author {
    font-family: 'Montserrat', sans-serif;
    font-size: 7pt;
    font-style: normal;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: #8a7e72;
    margin-top: 4px;
  }
  .strip-thumbnail {
    width: 110px;
    height: 75px;
    border-radius: 4px;
    overflow: hidden;
    border: 1px solid #e0d5c7;
  }
  .strip-thumbnail img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  /* Contact and Email Update Notice Callout */
  .contact-update-advisory {
    background: #fef7ee;
    border: 1px dashed #d4a373;
    border-radius: 5px;
    padding: 8px 12px;
    margin-top: 14px;
    font-size: 7.5pt;
    color: #633e14;
    line-height: 1.4;
    display: flex;
    align-items: flex-start;
    gap: 8px;
  }
  .advisory-tag {
    font-weight: 700;
    text-transform: uppercase;
    color: #b85c18;
    white-space: nowrap;
    letter-spacing: 0.05em;
  }

  .attribution-footer {
    margin-top: 16px;
    padding-top: 10px;
    border-top: 1px solid #e0d6cb;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 7pt;
    color: #8a7e72;
  }
</style>
</head>
<body>
  <div class="border-box">
    <div class="header-band">
      <div class="logo-group">
        <h1>Quills &amp; Ink</h1>
        <div class="sub">Literary Archival Department · Accra, Ghana</div>
      </div>
      <div class="doc-meta">
        <span class="doc-badge">Family Resource Edition</span>
        <div>Ref: QI-LIT-EUG-01 · Rev 2.0</div>
        <div>Authorized Free Family Circulation</div>
      </div>
    </div>

    <div class="doc-title-block">
      <h2>The Art of Remembrance: Eulogy &amp; Tribute Guide</h2>
      <p>A quiet framework for families preparing words of honour, faith, and ancestry</p>
    </div>

    <!-- Visible Visual Introduction -->
    <div class="intro-visual-grid">
      <div class="intro-text">
        <p>
          Writing a eulogy or family tribute is an act of love and pastoral care. In Ghanaian tradition, the spoken word at a celebration of life is not a recital of titles alone; it is the weaving together of an elder or loved one's true essence, their generosity, their humor, and the quiet sacrifices that anchored their lineage.
        </p>
        <p>
          This guide is provided by <strong>Quills and Ink Hub</strong> to give your family structure, calm confidence, and cultural dignity when articulating your most tender memories.
        </p>
      </div>
      <div class="intro-image-frame">
        <img src="https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=700&q=80" alt="Pen and memorial study journal" />
        <div class="image-caption">Literary Archival Reflection · Curated Web Asset</div>
      </div>
    </div>

    <div class="section-heading">
      <div class="section-num">1</div>
      <h3>The Four Foundations of a Ghanaian Memorial Reading</h3>
    </div>

    <div class="cards-grid">
      <div class="guide-card">
        <h4>1. The Roots &amp; Lineage</h4>
        <ul>
          <li>Acknowledge their ancestral home, parental roots, and childhood environment.</li>
          <li>Capture early formative values, humility, and family resilience.</li>
          <li>Highlight the community ethos that shaped their worldview.</li>
        </ul>
      </div>
      <div class="guide-card">
        <h4>2. The Living Impact</h4>
        <ul>
          <li>Focus on 2-3 specific personal anecdotes rather than a long chronological resume.</li>
          <li>Describe how they treated strangers, workers, family, and vulnerable persons.</li>
          <li>Recall signature phrases, warm habits, or moments of hearty laughter.</li>
        </ul>
      </div>
      <div class="guide-card">
        <h4>3. Faith &amp; Stewardship</h4>
        <ul>
          <li>Reflect on their moral compass, church fellowships, and mentorship.</li>
          <li>Include cherished hymns, scriptures, or proverbs that guided their decisions.</li>
          <li>Honor their stewardship as a mother, father, sibling, elder, or friend.</li>
        </ul>
      </div>
      <div class="guide-card">
        <h4>4. The Benediction &amp; Release</h4>
        <ul>
          <li>Synthesize feelings of gratitude and peace rather than despair.</li>
          <li>Voice words of blessing on behalf of children and diaspora kin.</li>
          <li>Conclude with a respectful prayer of rest into eternity.</li>
        </ul>
      </div>
    </div>

    <!-- Quote Strip with Visible Thumbnail Image -->
    <div class="quote-and-image-strip">
      <div>
        <div class="quote-content">
          “A life well lived is not measured by the applause it commanded, but by the quiet shade it provided for those who walked beside it.”
        </div>
        <div class="quote-author">— Quills and Ink Hub Literary Synthesis</div>
      </div>
      <div class="strip-thumbnail">
        <img src="https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=400&q=80" alt="White memorial floral tribute" />
      </div>
    </div>

    <!-- Contact & Email Update Notice -->
    <div class="contact-update-advisory">
      <span class="advisory-tag">Communications Update Notice:</span>
      <div>
        Please note: Our official direct phone lines and dedicated diaspora email routing are actively being upgraded for our expanded international services. We will update these contacts in our next scheduled revision. For immediate family inquiries, please connect with our active WhatsApp desk or schedule an online session at <strong>quillsandinkhub.com/book</strong>.
      </div>
    </div>

    <div class="attribution-footer">
      <div>
        <strong>Quills and Ink Hub</strong> · Literary Archive &amp; Funeral Coordination · Accra, Ghana<br>
        Web: quillsandinkhub.com · WhatsApp Support Desk Active Daily
      </div>
      <div style="text-align: right;">
        Attribution: Curated Editorial Asset © 2026 Quills &amp; Ink Hub.<br>
        Photography: Curated via Unsplash Open Editorial License.
      </div>
    </div>
  </div>
</body>
</html>`;

// 3. Memorial Brochure Checklist PDF Template (with visible imagery & contact update notice)
const brochurePdfHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,400&family=Great+Vibes&family=Montserrat:wght@300;400;500;600&display=swap');
  
  @page {
    size: A4 portrait;
    margin: 14mm 12mm 14mm 12mm;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: 'Montserrat', sans-serif;
    color: #1a1612;
    background: #faf8f5;
    line-height: 1.5;
    font-size: 10pt;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  .border-box {
    border: 1px solid #d9cebf;
    padding: 22px 26px;
    background: #ffffff;
  }

  .header-band {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    border-bottom: 2px solid #c9a892;
    padding-bottom: 12px;
    margin-bottom: 16px;
  }

  .logo-group h1 {
    font-family: 'Great Vibes', cursive;
    font-size: 32pt;
    color: #2c2416;
    line-height: 1;
    font-weight: normal;
  }
  .logo-group .sub {
    font-size: 8pt;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: #8a7e72;
    margin-top: 3px;
    font-weight: 500;
  }

  .doc-title-block {
    text-align: center;
    margin-bottom: 16px;
  }
  .doc-title-block h2 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 22pt;
    color: #2c2416;
    font-weight: 600;
    line-height: 1.15;
    margin-bottom: 3px;
  }
  .doc-title-block p {
    font-family: 'Cormorant Garamond', serif;
    font-style: italic;
    font-size: 12pt;
    color: #705f4e;
  }

  /* Two column visual banner */
  .visual-intro-strip {
    display: grid;
    grid-template-columns: 1fr 140px;
    gap: 16px;
    background: #faf8f5;
    border: 1px solid #e4dacd;
    padding: 12px 16px;
    border-radius: 6px;
    margin-bottom: 16px;
    align-items: center;
  }
  .visual-intro-text p {
    font-size: 8.8pt;
    color: #44372c;
    line-height: 1.45;
  }
  .visual-intro-thumb {
    width: 140px;
    height: 85px;
    border-radius: 4px;
    overflow: hidden;
    border: 1px solid #d8cbbe;
  }
  .visual-intro-thumb img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .checklist-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
    margin-bottom: 16px;
  }

  .check-card {
    background: #faf8f5;
    border: 1px solid #e4dacd;
    padding: 12px 14px;
    border-radius: 4px;
  }
  .check-card h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 12.5pt;
    font-weight: 600;
    color: #2c2416;
    border-bottom: 1px solid #ebd8c8;
    padding-bottom: 5px;
    margin-bottom: 8px;
  }

  .check-item {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    margin-bottom: 7px;
    font-size: 8.2pt;
    color: #3d3226;
    line-height: 1.35;
  }
  .checkbox {
    width: 12px;
    height: 12px;
    border: 1.5px solid #b8927a;
    border-radius: 2px;
    flex-shrink: 0;
    margin-top: 2px;
    background: white;
  }

  .specs-box {
    background: #fdfaf6;
    border: 1px dashed #c9a892;
    padding: 10px 16px;
    margin: 14px 0;
    border-radius: 4px;
  }
  .specs-box h4 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 12pt;
    color: #2c2416;
    margin-bottom: 4px;
  }
  .specs-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    font-size: 7.8pt;
    color: #5c4a38;
  }

  /* Contact and Email Update Notice Callout */
  .contact-update-advisory {
    background: #fef7ee;
    border: 1px dashed #d4a373;
    border-radius: 5px;
    padding: 8px 12px;
    margin-top: 12px;
    font-size: 7.5pt;
    color: #633e14;
    line-height: 1.4;
    display: flex;
    align-items: flex-start;
    gap: 8px;
  }
  .advisory-tag {
    font-weight: 700;
    text-transform: uppercase;
    color: #b85c18;
    white-space: nowrap;
    letter-spacing: 0.05em;
  }

  .attribution-footer {
    margin-top: 16px;
    padding-top: 10px;
    border-top: 1px solid #e0d6cb;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 7pt;
    color: #8a7e72;
  }
</style>
</head>
<body>
  <div class="border-box">
    <div class="header-band">
      <div class="logo-group">
        <h1>Quills &amp; Ink</h1>
        <div class="sub">Print Editorial &amp; Production Division</div>
      </div>
      <div style="text-align: right; font-size: 8pt; color: #5c4a38;">
        <span style="background: #f3eee8; padding: 3px 8px; border-radius: 4px; font-weight: 600; text-transform: uppercase;">Planning Blueprint</span>
        <div style="margin-top: 3px;">Ref: QI-PRT-BCH-02 · Rev 2.0</div>
      </div>
    </div>

    <div class="doc-title-block">
      <h2>Memorial Keepsake Brochure Checklist</h2>
      <p>A master blueprint for content compilation, photo curations, and printing</p>
    </div>

    <!-- Visible Visual Introduction -->
    <div class="visual-intro-strip">
      <div class="visual-intro-text">
        <p>
          A funeral brochure is a permanent family archive. This checklist ensures proper collation of biographic facts, order of service liturgy, family tributes from Accra to London and Toronto, and high-resolution photo specifications.
        </p>
      </div>
      <div class="visual-intro-thumb">
        <img src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80" alt="Printed editorial book keepsake" />
      </div>
    </div>

    <div class="checklist-grid">
      <div class="check-card">
        <h3>Section 1: Essential Biographic Text</h3>
        <div class="check-item"><div class="checkbox"></div><span>Full formal names, family aliases, clan and chieftaincy titles</span></div>
        <div class="check-item"><div class="checkbox"></div><span>Comprehensive dates: Sunrise (birth) and Sunset (passing)</span></div>
        <div class="check-item"><div class="checkbox"></div><span>Early life, schooling (elementary, secondary, tertiary &amp; abroad)</span></div>
        <div class="check-item"><div class="checkbox"></div><span>Career milestones, military/state service, and achievements</span></div>
        <div class="check-item"><div class="checkbox"></div><span>Marriage, children, grandchildren, and great-grandchildren tally</span></div>
      </div>

      <div class="check-card">
        <h3>Section 2: Tributes &amp; Diaspora Inputs</h3>
        <div class="check-item"><div class="checkbox"></div><span>Widow / Widower Tribute (written with care and intimacy)</span></div>
        <div class="check-item"><div class="checkbox"></div><span>Children's collective or individual readings</span></div>
        <div class="check-item"><div class="checkbox"></div><span>Grandchildren’s memory tribute &amp; family tree chart</span></div>
        <div class="check-item"><div class="checkbox"></div><span>Church / Parish / Fellowship tribute &amp; favorite scriptures</span></div>
        <div class="check-item"><div class="checkbox"></div><span>Alma Mater &amp; professional association tributes</span></div>
      </div>

      <div class="check-card">
        <h3>Section 3: Photo Curation &amp; Resolution</h3>
        <div class="check-item"><div class="checkbox"></div><span>Front Cover: High-resolution portrait (300 DPI, uncropped)</span></div>
        <div class="check-item"><div class="checkbox"></div><span>Vintage archive scans: Early childhood &amp; wedding photography</span></div>
        <div class="check-item"><div class="checkbox"></div><span>Family collage: 15–25 candid memories across decades</span></div>
        <div class="check-item"><div class="checkbox"></div><span>Diaspora submissions: collected via dedicated cloud folder</span></div>
      </div>

      <div class="check-card">
        <h3>Section 4: Order of Service &amp; Protocol</h3>
        <div class="check-item"><div class="checkbox"></div><span>Complete hymn lyrics (checked for verse accuracy)</span></div>
        <div class="check-item"><div class="checkbox"></div><span>Officiating clergy names, designations, and church banners</span></div>
        <div class="check-item"><div class="checkbox"></div><span>Filing past, scripture readings, and sermon title</span></div>
        <div class="check-item"><div class="checkbox"></div><span>Pallbearers, chief mourners &amp; acknowledgments page</span></div>
      </div>
    </div>

    <div class="specs-box">
      <h4>Recommended Print &amp; Finishing Specifications</h4>
      <div class="specs-list">
        <div><strong>Paper Stock:</strong> 250gsm Silk Cover with Soft-Touch Matte Velvet Laminate; 130gsm Silk Inner Text.</div>
        <div><strong>Binding:</strong> A5 Saddle Stitched (or Square Back Book binding for 28+ pages).</div>
        <div><strong>Editorial Turnaround:</strong> 7 days for text proofing; 4 days for press run in Accra or London.</div>
      </div>
    </div>

    <!-- Contact & Email Update Notice -->
    <div class="contact-update-advisory">
      <span class="advisory-tag">Communications Update Notice:</span>
      <div>
        Notice: Direct telephone numbers and official email addresses are actively being updated to support our dedicated diaspora printing desk. We will update these contacts shortly. In the interim, please reach our active WhatsApp desk or book a consultation at <strong>quillsandinkhub.com/book</strong>.
      </div>
    </div>

    <div class="attribution-footer">
      <div>
        <strong>Quills and Ink Hub</strong> · Comprehensive Memorial Coordination &amp; Design · Accra, Ghana<br>
        Web: quillsandinkhub.com · WhatsApp Support Desk Active Daily
      </div>
      <div style="text-align: right;">
        Attribution: Free Planning Guide © Quills &amp; Ink Hub.<br>
        Photography: Curated via Unsplash Open Editorial License.
      </div>
    </div>
  </div>
</body>
</html>`;

// 4. Tribute Reading Excerpt PDF Template (with visible imagery & contact update notice)
const tributePdfHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Great+Vibes&family=Montserrat:wght@300;400;500;600&display=swap');
  
  @page {
    size: A4 portrait;
    margin: 14mm 12mm 14mm 12mm;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: 'Montserrat', sans-serif;
    color: #1a1612;
    background: #faf8f5;
    line-height: 1.55;
    font-size: 10pt;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  .border-box {
    border: 1px solid #d9cebf;
    padding: 24px 28px;
    background: #ffffff;
  }

  .header-band {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    border-bottom: 2px solid #c9a892;
    padding-bottom: 12px;
    margin-bottom: 18px;
  }

  .logo-group h1 {
    font-family: 'Great Vibes', cursive;
    font-size: 32pt;
    color: #2c2416;
    line-height: 1;
    font-weight: normal;
  }
  .logo-group .sub {
    font-size: 8pt;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: #8a7e72;
    margin-top: 3px;
    font-weight: 500;
  }

  .doc-title-block {
    text-align: center;
    margin-bottom: 18px;
  }
  .doc-title-block h2 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 22pt;
    color: #2c2416;
    font-weight: 600;
    line-height: 1.15;
    margin-bottom: 4px;
  }
  .doc-title-block p {
    font-family: 'Cormorant Garamond', serif;
    font-style: italic;
    font-size: 12pt;
    color: #705f4e;
  }

  /* Visual Banner */
  .tribute-hero-visual {
    width: 100%;
    height: 110px;
    border-radius: 6px;
    overflow: hidden;
    margin-bottom: 16px;
    border: 1px solid #e0d5c7;
    position: relative;
  }
  .tribute-hero-visual img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .tribute-visual-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(44, 36, 22, 0.2) 0%, rgba(44, 36, 22, 0.6) 100%);
    display: flex;
    align-items: flex-end;
    padding: 8px 14px;
    color: #faf8f5;
    font-size: 7.5pt;
    font-style: italic;
  }

  .reading-excerpt {
    background: #faf8f5;
    border: 1px solid #e6ded4;
    border-left: 4px solid #b8927a;
    padding: 16px 20px;
    margin-bottom: 18px;
    border-radius: 4px;
  }

  .reading-excerpt p {
    font-family: 'Cormorant Garamond', serif;
    font-size: 13pt;
    line-height: 1.6;
    color: #2c2416;
    margin-bottom: 10px;
  }
  .reading-excerpt p:last-child { margin-bottom: 0; }

  .two-col-quotes {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
    margin-bottom: 16px;
  }

  .mini-reading {
    background: #ffffff;
    border: 1px solid #e0d5c7;
    padding: 12px 14px;
    border-radius: 4px;
  }
  .mini-reading h4 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 12pt;
    color: #8f654b;
    margin-bottom: 6px;
    font-weight: 600;
  }
  .mini-reading p {
    font-family: 'Cormorant Garamond', serif;
    font-size: 10.5pt;
    color: #44372c;
    line-height: 1.45;
    font-style: italic;
  }

  /* Contact and Email Update Notice Callout */
  .contact-update-advisory {
    background: #fef7ee;
    border: 1px dashed #d4a373;
    border-radius: 5px;
    padding: 8px 12px;
    margin-top: 14px;
    font-size: 7.5pt;
    color: #633e14;
    line-height: 1.4;
    display: flex;
    align-items: flex-start;
    gap: 8px;
  }
  .advisory-tag {
    font-weight: 700;
    text-transform: uppercase;
    color: #b85c18;
    white-space: nowrap;
    letter-spacing: 0.05em;
  }

  .attribution-footer {
    margin-top: 18px;
    padding-top: 10px;
    border-top: 1px solid #e0d6cb;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 7pt;
    color: #8a7e72;
  }
</style>
</head>
<body>
  <div class="border-box">
    <div class="header-band">
      <div class="logo-group">
        <h1>Quills &amp; Ink</h1>
        <div class="sub">Spoken Word &amp; Ceremony Archive</div>
      </div>
      <div style="text-align: right; font-size: 8pt; color: #5c4a38;">
        <span style="background: #f3eee8; padding: 3px 8px; border-radius: 4px; font-weight: 600; text-transform: uppercase;">Sample Excerpt</span>
        <div style="margin-top: 3px;">Ref: QI-SPK-TRB-03 · Rev 2.0</div>
      </div>
    </div>

    <div class="doc-title-block">
      <h2>Memorial Tribute Reading Excerpt</h2>
      <p>Curated ceremonial readings for church celebrations and family gatherings</p>
    </div>

    <!-- Visible Visual Hero Banner -->
    <div class="tribute-hero-visual">
      <img src="https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=900&q=80" alt="Quiet morning light and contemplation" />
      <div class="tribute-visual-overlay">
        “In quiet rooms and crowded courtyards alike, we remember a life that made space for others.”
      </div>
    </div>

    <div class="reading-excerpt">
      <p>
        “In quiet rooms and crowded courtyards alike, we remember a life that made space for others. Not by grand speeches alone, but by the ordinary kindnesses that became our family’s compass — the open door at dusk, the unhurried counsel, the steady reassurance when storms gathered.”
      </p>
      <p>
        “Today we gather not to finish this story, but to place it reverently in our collective keeping — so that love may continue to speak in the warm language of home.”
      </p>
    </div>

    <div class="two-col-quotes">
      <div class="mini-reading">
        <h4>Reading A · On Gratitude for an Elder</h4>
        <p>
          “To stand in your presence was to feel the warmth of ancestral shelter. You taught us that true dignity does not raise its voice; it steadies the ground beneath our feet.”
        </p>
      </div>
      <div class="mini-reading">
        <h4>Reading B · Diaspora Family Synthesis</h4>
        <p>
          “Though miles separated our homes across London, Accra, and New York, your prayers crossed oceans before dawn. Today, the diaspora gathers as one branch of your living vine.”
        </p>
      </div>
    </div>

    <!-- Contact & Email Update Notice -->
    <div class="contact-update-advisory">
      <span class="advisory-tag">Communications Update Notice:</span>
      <div>
        Please note: Our official direct phone lines and primary email routing are undergoing scheduled upgrades to better serve our international families. We will update these contacts in our forthcoming revision. In the interim, WhatsApp messaging is active daily, or you may book a session at <strong>quillsandinkhub.com/book</strong>.
      </div>
    </div>

    <div class="attribution-footer">
      <div>
        <strong>Quills and Ink Hub</strong> · Literary Archives · Accra, Ghana<br>
        Web: quillsandinkhub.com · WhatsApp Support Desk Active Daily
      </div>
      <div style="text-align: right;">
        Attribution: Public Ceremonial Excerpt © Quills &amp; Ink Hub.<br>
        Photography: Curated via Unsplash Open Editorial License.
      </div>
    </div>
  </div>
</body>
</html>`;

// Write HTML files temporarily
const tempDir = path.join(rootDir, 'scripts', 'temp');
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

const ogHtmlPath = path.join(tempDir, 'og-template.html');
const eulogyPdfPath = path.join(tempDir, 'eulogy-template.html');
const brochurePdfPath = path.join(tempDir, 'brochure-template.html');
const tributePdfPath = path.join(tempDir, 'tribute-template.html');

fs.writeFileSync(ogHtmlPath, ogHtml);
fs.writeFileSync(eulogyPdfPath, eulogyPdfHtml);
fs.writeFileSync(brochurePdfPath, brochurePdfHtml);
fs.writeFileSync(tributePdfPath, tributePdfHtml);

// Output destinations
const ogOutputPath = path.join(rootDir, 'public', 'images', 'og-preview.png');
const eulogyOutputPath = path.join(rootDir, 'public', 'downloads', 'eulogy-writing-guide.pdf');
const brochureOutputPath = path.join(rootDir, 'public', 'downloads', 'memorial-brochure-checklist.pdf');
const tributeOutputPath = path.join(rootDir, 'public', 'downloads', 'tribute-reading-excerpt.pdf');
const masterGuideOutputPath = path.join(rootDir, 'public', 'downloads', 'quills-and-ink-family-memorial-guide.pdf');

const tempUserData = 'C:\\\\Users\\\\gokro\\\\AppData\\\\Local\\\\Temp\\\\chrome-pdf-temp';
const chromeFlags = `--headless=new --disable-gpu --no-first-run --no-default-browser-check --user-data-dir="${tempUserData}"`;

console.log('1. Rendering Eulogy PDF with images and contact notice...');
execSync(`"${chromePath}" ${chromeFlags} --print-to-pdf="${eulogyOutputPath}" --no-pdf-header-footer "file:///${eulogyPdfPath.replace(/\\\\/g, '/')}"`);
console.log('Eulogy PDF created:', eulogyOutputPath);

console.log('2. Rendering Brochure Checklist PDF with images and contact notice...');
execSync(`"${chromePath}" ${chromeFlags} --print-to-pdf="${brochureOutputPath}" --no-pdf-header-footer "file:///${brochurePdfPath.replace(/\\\\/g, '/')}"`);
console.log('Brochure PDF created:', brochureOutputPath);

console.log('3. Rendering Tribute Excerpt PDF with images and contact notice...');
execSync(`"${chromePath}" ${chromeFlags} --print-to-pdf="${tributeOutputPath}" --no-pdf-header-footer "file:///${tributePdfPath.replace(/\\\\/g, '/')}"`);
console.log('Tribute PDF created:', tributeOutputPath);

fs.copyFileSync(eulogyOutputPath, masterGuideOutputPath);
console.log('Master guide PDF updated:', masterGuideOutputPath);

console.log('Done generating all assets with visible images and contact notices!');
