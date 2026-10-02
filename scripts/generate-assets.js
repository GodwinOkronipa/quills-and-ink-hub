import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

console.log('Generating OG image and PDF downloads for Quills & Ink Hub...');

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

// 2. Eulogy Writing Guide PDF Template (A4 Multi-page / Comprehensive)
const eulogyPdfHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,600&family=Great+Vibes&family=Montserrat:wght@300;400;500;600&display=swap');
  
  @page {
    size: A4 portrait;
    margin: 16mm 14mm 16mm 14mm;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: 'Montserrat', sans-serif;
    color: #1a1612;
    background: #faf8f5;
    line-height: 1.6;
    font-size: 10.5pt;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  .page-container {
    padding: 10px;
    background: #faf8f5;
  }

  .border-box {
    border: 1px solid #d9cebf;
    padding: 24px 28px;
    background: #ffffff;
    position: relative;
    box-shadow: 0 4px 15px rgba(0,0,0,0.02);
  }

  .header-band {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    border-bottom: 2px solid #c9a892;
    padding-bottom: 14px;
    margin-bottom: 20px;
  }

  .logo-group h1 {
    font-family: 'Great Vibes', cursive;
    font-size: 34pt;
    color: #2c2416;
    line-height: 1;
    font-weight: normal;
  }
  .logo-group .sub {
    font-size: 8pt;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: #8a7e72;
    margin-top: 4px;
    font-weight: 500;
  }

  .doc-meta {
    text-align: right;
    font-size: 8pt;
    color: #5c4a38;
    line-height: 1.4;
  }
  .doc-badge {
    display: inline-block;
    background: #f3eee8;
    color: #5c4a38;
    font-weight: 600;
    padding: 4px 10px;
    border-radius: 4px;
    font-size: 7.5pt;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-bottom: 4px;
  }

  .doc-title-block {
    text-align: center;
    margin-bottom: 22px;
  }
  .doc-title-block h2 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 24pt;
    color: #2c2416;
    font-weight: 600;
    line-height: 1.15;
    margin-bottom: 6px;
  }
  .doc-title-block p {
    font-family: 'Cormorant Garamond', serif;
    font-style: italic;
    font-size: 13pt;
    color: #705f4e;
  }

  .intro-grid {
    display: grid;
    grid-template-columns: 1.4fr 1fr;
    gap: 20px;
    margin-bottom: 24px;
    background: #faf8f5;
    border: 1px solid #ebd8c8;
    padding: 16px;
    border-radius: 4px;
  }
  .intro-text p {
    font-size: 9.5pt;
    line-height: 1.55;
    color: #3d3226;
    margin-bottom: 8px;
  }
  .intro-text p:last-child { margin-bottom: 0; }
  
  .intro-image {
    border-radius: 4px;
    overflow: hidden;
    height: 130px;
  }
  .intro-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .section-heading {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 20px 0 12px;
  }
  .section-num {
    background: #c9a892;
    color: white;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 8pt;
    font-weight: 600;
  }
  .section-heading h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 15pt;
    font-weight: 600;
    color: #2c2416;
  }

  .cards-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
    margin-bottom: 18px;
  }

  .guide-card {
    background: #ffffff;
    border: 1px solid #e6ded4;
    border-top: 3px solid #c9a892;
    padding: 12px 14px;
    border-radius: 3px;
  }
  .guide-card h4 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 12pt;
    font-weight: 600;
    color: #2c2416;
    margin-bottom: 6px;
  }
  .guide-card ul {
    list-style: none;
    padding-left: 0;
  }
  .guide-card li {
    font-size: 8.5pt;
    color: #4a3e33;
    margin-bottom: 5px;
    position: relative;
    padding-left: 14px;
    line-height: 1.4;
  }
  .guide-card li::before {
    content: '•';
    position: absolute;
    left: 2px;
    color: #c9a892;
    font-size: 11pt;
  }

  .quote-box {
    margin: 18px 0;
    padding: 14px 20px;
    background: #fbf9f6;
    border-left: 3px solid #b8927a;
    font-family: 'Cormorant Garamond', serif;
    font-size: 12.5pt;
    font-style: italic;
    color: #3d3226;
    line-height: 1.5;
  }
  .quote-author {
    font-family: 'Montserrat', sans-serif;
    font-size: 7.5pt;
    font-style: normal;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: #8a7e72;
    margin-top: 6px;
  }

  .attribution-footer {
    margin-top: 24px;
    padding-top: 14px;
    border-top: 1px solid #e0d6cb;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 7.5pt;
    color: #8a7e72;
  }
  .attribution-left strong {
    color: #2c2416;
  }
</style>
</head>
<body>
  <div class="page-container">
    <div class="border-box">
      <div class="header-band">
        <div class="logo-group">
          <h1>Quills &amp; Ink</h1>
          <div class="sub">Literary Archival Department · Accra, Ghana</div>
        </div>
        <div class="doc-meta">
          <span class="doc-badge">Family Resource Edition</span>
          <div>Document Ref: QI-LIT-EUG-01</div>
          <div>Authorized Free Circulation</div>
        </div>
      </div>

      <div class="doc-title-block">
        <h2>The Art of Remembrance: Eulogy &amp; Tribute Guide</h2>
        <p>A quiet framework for families preparing words of honour, faith, and ancestry</p>
      </div>

      <div class="intro-grid">
        <div class="intro-text">
          <p>
            Writing a eulogy or family tribute is an act of love and pastoral care. In Ghanaian tradition, the spoken word at a celebration of life is not a recital of titles alone; it is the weaving together of an elder or loved one's true essence, their generosity, their humor, and the quiet sacrifices that anchored their lineage.
          </p>
          <p>
            This guide is provided by <strong>Quills and Ink Hub</strong> to give your family structure, calm confidence, and cultural dignity when articulating your most tender memories.
          </p>
        </div>
        <div class="intro-image">
          <img src="https://images.unsplash.com/photo-1456513080080-7e87bb4f3d4d?auto=format&fit=crop&w=700&q=80" alt="Quiet study and pen" />
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
            <li>Reflect on their moral compass, church or community fellowships, and mentorship.</li>
            <li>Include cherished hymns, scriptures, or proverbs that guided their decisions.</li>
            <li>Honor their stewardship as a mother, father, sibling, elder, or friend.</li>
          </ul>
        </div>
        <div class="guide-card">
          <h4>4. The Benediction &amp; Release</h4>
          <ul>
            <li>Synthesize feelings of gratitude and peace rather than despair.</li>
            <li>Voice words of blessing on behalf of children, grandchildren, and diaspora kin.</li>
            <li>Conclude with a respectful prayer of rest into eternity.</li>
          </ul>
        </div>
      </div>

      <div class="quote-box">
        “A life well lived is not measured by the applause it commanded, but by the quiet shade it provided for those who walked beside it.”
        <div class="quote-author">— Quills and Ink Hub Literary Synthesis</div>
      </div>

      <div class="section-heading">
        <div class="section-num">2</div>
        <h3>Delivery &amp; Podium Guidance</h3>
      </div>

      <div class="cards-grid">
        <div class="guide-card">
          <h4>Pacing &amp; Emotion</h4>
          <ul>
            <li>Read slowly: 120 words per minute allows the congregation to absorb every thought.</li>
            <li>If overcome by grief, pause, take a breath, or have a standing family member step up beside you.</li>
          </ul>
        </div>
        <div class="guide-card">
          <h4>Preparation &amp; Print</h4>
          <ul>
            <li>Print on heavy paper with 14pt double-spaced text. Avoid reading from tiny mobile screens.</li>
            <li>Our literary team offers full ghostwriting, diaspora synthesis, and podium coaching.</li>
          </ul>
        </div>
      </div>

      <div class="attribution-footer">
        <div class="attribution-left">
          <strong>Quills and Ink Hub</strong> · Literary Archive &amp; Funeral Coordination · Accra, Ghana<br>
          Web: quillsandinkhub.com · Inquiries: hello@quillsandinkhub.com · WhatsApp Support: +233 (0) XX XXX XXXX
        </div>
        <div class="attribution-right">
          Attribution: Curated Editorial Asset © 2026 Quills &amp; Ink Hub.<br>
          Photography: Unsplash Open Collection (Editorial).
        </div>
      </div>
    </div>
  </div>
</body>
</html>`;

// 3. Memorial Brochure Checklist PDF Template
const brochurePdfHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,400&family=Great+Vibes&family=Montserrat:wght@300;400;500;600&display=swap');
  
  @page {
    size: A4 portrait;
    margin: 16mm 14mm 16mm 14mm;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: 'Montserrat', sans-serif;
    color: #1a1612;
    background: #faf8f5;
    line-height: 1.55;
    font-size: 10.5pt;
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
    padding-bottom: 14px;
    margin-bottom: 20px;
  }

  .logo-group h1 {
    font-family: 'Great Vibes', cursive;
    font-size: 34pt;
    color: #2c2416;
    line-height: 1;
    font-weight: normal;
  }
  .logo-group .sub {
    font-size: 8pt;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: #8a7e72;
    margin-top: 4px;
    font-weight: 500;
  }

  .doc-title-block {
    text-align: center;
    margin-bottom: 20px;
  }
  .doc-title-block h2 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 23pt;
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

  .checklist-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 18px;
  }

  .check-card {
    background: #faf8f5;
    border: 1px solid #e4dacd;
    padding: 14px 16px;
    border-radius: 4px;
  }
  .check-card h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 13pt;
    font-weight: 600;
    color: #2c2416;
    border-bottom: 1px solid #ebd8c8;
    padding-bottom: 6px;
    margin-bottom: 10px;
  }

  .check-item {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    margin-bottom: 8px;
    font-size: 8.5pt;
    color: #3d3226;
  }
  .checkbox {
    width: 13px;
    height: 13px;
    border: 1.5px solid #b8927a;
    border-radius: 2px;
    flex-shrink: 0;
    margin-top: 2px;
    background: white;
  }

  .specs-box {
    background: #fdfaf6;
    border: 1px dashed #c9a892;
    padding: 12px 18px;
    margin: 16px 0;
    border-radius: 4px;
  }
  .specs-box h4 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 12.5pt;
    color: #2c2416;
    margin-bottom: 6px;
  }
  .specs-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    font-size: 8pt;
    color: #5c4a38;
  }

  .attribution-footer {
    margin-top: 22px;
    padding-top: 14px;
    border-top: 1px solid #e0d6cb;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 7.5pt;
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
        <span style="background: #f3eee8; padding: 4px 8px; border-radius: 4px; font-weight: 600; text-transform: uppercase;">Planning Blueprint</span>
        <div style="margin-top: 4px;">Ref: QI-PRT-BCH-02</div>
      </div>
    </div>

    <div class="doc-title-block">
      <h2>Memorial Keepsake Brochure Checklist</h2>
      <p>A master blueprint for content compilation, photo curations, and printing</p>
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

    <div class="attribution-footer">
      <div>
        <strong>Quills and Ink Hub</strong> · Comprehensive Memorial Coordination &amp; Design · Accra, Ghana<br>
        Web: quillsandinkhub.com · Email: hello@quillsandinkhub.com
      </div>
      <div style="text-align: right;">
        Attribution: Free Planning Guide © Quills &amp; Ink Hub.<br>
        Printed &amp; digital brochure design services available on request.
      </div>
    </div>
  </div>
</body>
</html>`;

// 4. Tribute Reading Excerpt PDF Template
const tributePdfHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Great+Vibes&family=Montserrat:wght@300;400;500;600&display=swap');
  
  @page {
    size: A4 portrait;
    margin: 16mm 14mm 16mm 14mm;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: 'Montserrat', sans-serif;
    color: #1a1612;
    background: #faf8f5;
    line-height: 1.6;
    font-size: 10.5pt;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  .border-box {
    border: 1px solid #d9cebf;
    padding: 28px 32px;
    background: #ffffff;
  }

  .header-band {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    border-bottom: 2px solid #c9a892;
    padding-bottom: 14px;
    margin-bottom: 24px;
  }

  .logo-group h1 {
    font-family: 'Great Vibes', cursive;
    font-size: 34pt;
    color: #2c2416;
    line-height: 1;
    font-weight: normal;
  }
  .logo-group .sub {
    font-size: 8pt;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: #8a7e72;
    margin-top: 4px;
    font-weight: 500;
  }

  .doc-title-block {
    text-align: center;
    margin-bottom: 26px;
  }
  .doc-title-block h2 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 24pt;
    color: #2c2416;
    font-weight: 600;
    line-height: 1.15;
    margin-bottom: 6px;
  }
  .doc-title-block p {
    font-family: 'Cormorant Garamond', serif;
    font-style: italic;
    font-size: 13pt;
    color: #705f4e;
  }

  .reading-excerpt {
    background: #faf8f5;
    border: 1px solid #e6ded4;
    border-left: 4px solid #b8927a;
    padding: 20px 24px;
    margin-bottom: 24px;
    border-radius: 4px;
  }

  .reading-excerpt p {
    font-family: 'Cormorant Garamond', serif;
    font-size: 13.5pt;
    line-height: 1.65;
    color: #2c2416;
    margin-bottom: 14px;
  }
  .reading-excerpt p:last-child { margin-bottom: 0; }

  .two-col-quotes {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 18px;
    margin-bottom: 20px;
  }

  .mini-reading {
    background: #ffffff;
    border: 1px solid #e0d5c7;
    padding: 16px;
    border-radius: 4px;
  }
  .mini-reading h4 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 13pt;
    color: #8f654b;
    margin-bottom: 8px;
    font-weight: 600;
  }
  .mini-reading p {
    font-family: 'Cormorant Garamond', serif;
    font-size: 11.5pt;
    color: #44372c;
    line-height: 1.5;
    font-style: italic;
  }

  .attribution-footer {
    margin-top: 30px;
    padding-top: 14px;
    border-top: 1px solid #e0d6cb;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 7.5pt;
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
        <span style="background: #f3eee8; padding: 4px 8px; border-radius: 4px; font-weight: 600; text-transform: uppercase;">Sample Excerpt</span>
        <div style="margin-top: 4px;">Ref: QI-SPK-TRB-03</div>
      </div>
    </div>

    <div class="doc-title-block">
      <h2>Memorial Tribute Reading Excerpt</h2>
      <p>Curated ceremonial readings for church celebrations and family gatherings</p>
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

    <div class="attribution-footer">
      <div>
        <strong>Quills and Ink Hub</strong> · Literary Archives · Accra, Ghana<br>
        Web: quillsandinkhub.com · Commission bespoke tributes: hello@quillsandinkhub.com
      </div>
      <div style="text-align: right;">
        Attribution: Public Ceremonial Excerpt © Quills &amp; Ink Hub.<br>
        Free to read and adapt for private memorial services.
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

console.log('1. Rendering OG image...');
if (!fs.existsSync(ogOutputPath)) {
  execSync(`"${chromePath}" ${chromeFlags} --window-size=1200,630 --hide-scrollbars --screenshot="${ogOutputPath}" "file:///${ogHtmlPath.replace(/\\\\/g, '/')}"`);
  console.log('OG image created:', ogOutputPath);
} else {
  console.log('OG image already exists, skipping.');
}

console.log('2. Rendering Eulogy PDF...');
if (!fs.existsSync(eulogyOutputPath)) {
  execSync(`"${chromePath}" ${chromeFlags} --print-to-pdf="${eulogyOutputPath}" --no-pdf-header-footer "file:///${eulogyPdfPath.replace(/\\\\/g, '/')}"`);
  console.log('Eulogy PDF created:', eulogyOutputPath);
} else {
  console.log('Eulogy PDF already exists, skipping.');
}

console.log('3. Rendering Brochure Checklist PDF...');
if (!fs.existsSync(brochureOutputPath)) {
  execSync(`"${chromePath}" ${chromeFlags} --print-to-pdf="${brochureOutputPath}" --no-pdf-header-footer "file:///${brochurePdfPath.replace(/\\\\/g, '/')}"`);
  console.log('Brochure PDF created:', brochureOutputPath);
} else {
  console.log('Brochure PDF already exists, skipping.');
}

console.log('4. Rendering Tribute Excerpt PDF...');
if (!fs.existsSync(tributeOutputPath)) {
  execSync(`"${chromePath}" ${chromeFlags} --print-to-pdf="${tributeOutputPath}" --no-pdf-header-footer "file:///${tributePdfPath.replace(/\\\\/g, '/')}"`);
  console.log('Tribute PDF created:', tributeOutputPath);
} else {
  console.log('Tribute PDF already exists, skipping.');
}

if (!fs.existsSync(masterGuideOutputPath)) {
  fs.copyFileSync(eulogyOutputPath, masterGuideOutputPath);
  console.log('Master guide PDF created:', masterGuideOutputPath);
}

console.log('Done generating all assets!');
