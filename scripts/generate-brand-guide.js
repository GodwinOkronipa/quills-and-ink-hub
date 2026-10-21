import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

console.log('Re-building Quills and Ink Hub 6-Page Brand Guide PDF with embedded website fonts and luxury mockups...');

// Helper to convert image file to base64 data URL
function toBase64(relPath) {
  const fullPath = path.join(rootDir, relPath);
  if (!fs.existsSync(fullPath)) {
    console.warn(`File not found: ${fullPath}`);
    return '';
  }
  const ext = path.extname(fullPath).toLowerCase().replace('.', '');
  const mime = ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' : ext === 'png' ? 'image/png' : 'image/svg+xml';
  const data = fs.readFileSync(fullPath).toString('base64');
  return `data:${mime};base64,${data}`;
}

// Read the embedded fonts CSS containing all base64-encoded WOFF2 files
const embeddedFontsCssPath = path.join(rootDir, 'scripts', 'temp', 'embedded-fonts.css');
const embeddedFontsCss = fs.readFileSync(embeddedFontsCssPath, 'utf-8');

// Brand Logos
const logoPrimary = toBase64('public/images/brand/dove_logo_primary.png');
const logoGold = toBase64('public/images/brand/dove_logo_gold.png');
const logoWhite = toBase64('public/images/brand/dove_logo_white.png');

// High-Fidelity Mockups (Travertine, Brass Pen, Gardenias & Gold Foil)
const mockupCover = toBase64('public/images/brand/brand_stationery_mockup.jpg');
const mockupOpen = toBase64('public/images/brand/keepsake_open_spread.jpg');
const mockupFlatlay = toBase64('public/images/brand/stationery_collection_flatlay.jpg');

// Real event photography from portfolio
const photoKente = toBase64('public/images/portfolio/nicholas-nii-adamma/01-casket-kente-tribute.jpg');
const photoChapel = toBase64('public/images/portfolio/nicholas-nii-adamma/02-all-souls-chapel-exterior.jpg');
const photoCongregation = toBase64('public/images/portfolio/nicholas-nii-adamma/03-chapel-sanctuary-congregation.jpg');
const photoElders = toBase64('public/images/portfolio/nicholas-nii-adamma/05-family-elders-procession.jpg');
const photoPortrait = toBase64('public/images/portfolio/william-dowridge-adu-asare/01-memorial-portrait-registry.jpg');
const photoInvitation = toBase64('public/images/portfolio/william-dowridge-adu-asare/02-funeral-invitation-arrangements.jpg');
const photoGarden = toBase64('public/images/portfolio/william-dowridge-adu-asare/03-garden-reception-arrival.jpg');

const brandGuideHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Quills and Ink Hub · Executive Brand Guidelines &amp; Visual Identity</title>
<style>
  /* Base64 Embedded Website Fonts: Cormorant Garamond, Great Vibes, Montserrat */
  ${embeddedFontsCss}

  @page {
    size: 297mm 210mm;
    margin: 0;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }
  
  html, body {
    width: 297mm;
    height: 210mm;
    margin: 0;
    padding: 0;
    font-family: 'Montserrat', system-ui, sans-serif;
    color: #1a1612;
    background: #faf8f5;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  .page {
    width: 297mm;
    height: 210mm;
    position: relative;
    page-break-after: always;
    break-after: page;
    overflow: hidden;
    padding: 13mm 16mm 11mm 16mm;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: #faf8f5;
  }

  /* Decorative Inner Border */
  .page::before {
    content: '';
    position: absolute;
    inset: 7mm 8mm;
    border: 1px solid rgba(201, 168, 146, 0.45);
    pointer-events: none;
    z-index: 10;
  }
  .page::after {
    content: '';
    position: absolute;
    inset: 8.5mm 9.5mm;
    border: 1px solid rgba(230, 224, 216, 0.7);
    pointer-events: none;
    z-index: 10;
  }

  /* Header & Footer Nav on Content Pages */
  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e6e0d8;
    padding-bottom: 3mm;
    margin-bottom: 3.5mm;
    position: relative;
    z-index: 12;
  }
  .page-header__left {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .page-header__num {
    font-size: 8pt;
    font-weight: 600;
    letter-spacing: 0.15em;
    color: #c9a892;
  }
  .page-header__title {
    font-size: 8.5pt;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #2c2416;
  }
  .page-header__right {
    font-size: 7.5pt;
    color: #8a7e72;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .page-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #e6e0d8;
    padding-top: 2.5mm;
    margin-top: 3.5mm;
    font-size: 7.5pt;
    color: #8a7e72;
    position: relative;
    z-index: 12;
  }
  .page-footer strong {
    color: #1a1612;
  }

  /* Page Content Container */
  .page-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 12;
  }

  /* Typography Utilities directly matching website */
  .script {
    font-family: 'Great Vibes', cursive;
  }
  .serif {
    font-family: 'Cormorant Garamond', serif;
  }
  .sans {
    font-family: 'Montserrat', sans-serif;
  }
  .gold-text {
    color: #c9a892;
  }

  /* ========================================================
     PAGE 1: COVER
     ======================================================== */
  .cover-page {
    background: radial-gradient(circle at 50% 38%, #ffffff 0%, #faf8f5 65%, #f4eee7 100%);
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 16mm 25mm;
  }
  .cover-badge {
    display: inline-block;
    font-size: 8pt;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    font-weight: 600;
    color: #3d3226;
    background: rgba(201, 168, 146, 0.18);
    border: 1px solid rgba(201, 168, 146, 0.5);
    padding: 5px 20px;
    border-radius: 20px;
    margin-bottom: 5mm;
  }
  .cover-logo-wrap {
    width: 38mm;
    height: 38mm;
    margin: 0 auto 4.5mm;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #ffffff;
    border-radius: 50%;
    box-shadow: 0 10px 30px rgba(44, 36, 22, 0.08);
    border: 1px solid #e8d5c4;
    padding: 2.5mm;
  }
  .cover-logo-wrap img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .cover-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 34pt;
    font-weight: 600;
    letter-spacing: 0.16em;
    color: #1a1612;
    text-transform: uppercase;
    line-height: 1.1;
    margin-bottom: 1.5mm;
  }
  .cover-sub {
    font-size: 9pt;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    font-weight: 500;
    color: #5c4a38;
    margin-bottom: 3.5mm;
  }
  .cover-script {
    font-family: 'Great Vibes', cursive;
    font-size: 28pt;
    color: #c9a892;
    margin-bottom: 5mm;
    line-height: 1;
  }
  .cover-abstract {
    max-width: 180mm;
    font-size: 9pt;
    line-height: 1.65;
    color: #3d3226;
    font-weight: 300;
    margin-bottom: 7mm;
    padding: 3mm 8mm;
    border-left: 2px solid #c9a892;
    border-right: 2px solid #c9a892;
    background: rgba(255, 255, 255, 0.65);
  }
  .cover-meta {
    display: flex;
    gap: 15mm;
    font-size: 8pt;
    color: #8a7e72;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }
  .cover-meta strong {
    color: #1a1612;
  }

  /* ========================================================
     PAGE 2: LOGO ARCHITECTURE
     ======================================================== */
  .logo-page-grid {
    display: grid;
    grid-template-columns: 1.25fr 1fr;
    gap: 7mm;
    height: 100%;
  }
  .symbol-card {
    background: #ffffff;
    border: 1px solid #e8d5c4;
    padding: 5.5mm 7mm;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .symbol-card h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 16pt;
    font-weight: 600;
    color: #1a1612;
    margin-bottom: 1.5mm;
  }
  .symbol-meanings {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 3.5mm;
    margin: 3mm 0;
  }
  .meaning-box {
    background: #faf8f5;
    border-left: 2px solid #c9a892;
    padding: 3mm 3.5mm;
  }
  .meaning-box h4 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 11pt;
    font-weight: 600;
    color: #2c2416;
    margin-bottom: 1mm;
  }
  .meaning-box p {
    font-size: 7.2pt;
    color: #5c4a38;
    line-height: 1.45;
  }
  .logo-variants-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3.5mm;
  }
  .variant-card {
    border-radius: 4px;
    padding: 3.5mm;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    height: 48mm;
    border: 1px solid #e6e0d8;
  }
  .variant-card--ivory {
    background: #ffffff;
  }
  .variant-card--dark {
    background: #1a1612;
    border-color: #2c2416;
    color: #ffffff;
  }
  .variant-card--wood {
    background: #3d3226;
    color: #ffffff;
  }
  .variant-card img {
    height: 24mm;
    width: auto;
    object-fit: contain;
    margin-bottom: 2mm;
  }
  .variant-label {
    font-size: 7.5pt;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    font-weight: 600;
  }
  .rules-box {
    background: #ffffff;
    border: 1px solid #e8d5c4;
    padding: 4mm 5.5mm;
    border-radius: 4px;
  }
  .rules-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4mm;
    margin-top: 1.5mm;
  }
  .rules-col h5 {
    font-size: 8pt;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-bottom: 1.5mm;
  }
  .rules-col.do h5 { color: #2d5a27; }
  .rules-col.dont h5 { color: #8b261e; }
  .rules-col ul {
    list-style: none;
    font-size: 7.3pt;
    color: #3d3226;
    line-height: 1.45;
  }
  .rules-col li {
    margin-bottom: 1.5mm;
    position: relative;
    padding-left: 12px;
  }
  .rules-col.do li::before {
    content: '✓';
    position: absolute;
    left: 0;
    color: #2d5a27;
    font-weight: bold;
  }
  .rules-col.dont li::before {
    content: '✕';
    position: absolute;
    left: 0;
    color: #8b261e;
    font-weight: bold;
  }

  /* ========================================================
     PAGE 3: COLOR & TYPOGRAPHY
     ======================================================== */
  .color-typo-grid {
    display: grid;
    grid-template-columns: 1.15fr 1fr;
    gap: 7mm;
    height: 100%;
  }
  .palette-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 3.5mm;
  }
  .swatch {
    background: #ffffff;
    border: 1px solid #e6e0d8;
    border-radius: 4px;
    overflow: hidden;
  }
  .swatch__chip {
    height: 18mm;
    width: 100%;
  }
  .swatch__info {
    padding: 3mm;
  }
  .swatch__name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 10.5pt;
    font-weight: 600;
    color: #1a1612;
    margin-bottom: 0.5mm;
  }
  .swatch__hex {
    font-size: 7.5pt;
    font-family: monospace;
    color: #5c4a38;
  }
  .swatch__desc {
    font-size: 6.8pt;
    color: #8a7e72;
    margin-top: 1mm;
    line-height: 1.35;
  }

  .typography-container {
    background: #ffffff;
    border: 1px solid #e8d5c4;
    padding: 5mm 6mm;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .type-item {
    border-bottom: 1px solid #f0eae1;
    padding-bottom: 2.8mm;
    margin-bottom: 2.8mm;
  }
  .type-item:last-child {
    border-bottom: none;
    padding-bottom: 0;
    margin-bottom: 0;
  }
  .type-role {
    font-size: 7pt;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: #c9a892;
    font-weight: 600;
    margin-bottom: 1mm;
  }
  .type-sample--script {
    font-family: 'Great Vibes', cursive;
    font-size: 28pt;
    color: #3d3226;
    line-height: 1;
  }
  .type-sample--serif {
    font-family: 'Cormorant Garamond', serif;
    font-size: 17pt;
    font-weight: 600;
    color: #1a1612;
    line-height: 1.15;
  }
  .type-sample--sans {
    font-family: 'Montserrat', sans-serif;
    font-size: 8.8pt;
    color: #3d3226;
    line-height: 1.45;
  }
  .type-usage {
    font-size: 7pt;
    color: #8a7e72;
    margin-top: 1mm;
  }

  /* ========================================================
     PAGE 4: SOCIAL LANGUAGE & VOICE
     ======================================================== */
  .voice-pillars-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 3.5mm;
    margin-bottom: 3.5mm;
  }
  .pillar-card {
    background: #ffffff;
    border: 1px solid #e8d5c4;
    padding: 3.5mm;
    border-radius: 4px;
    border-top: 3px solid #c9a892;
  }
  .pillar-num {
    font-size: 7.5pt;
    font-weight: 600;
    color: #c9a892;
    letter-spacing: 0.1em;
  }
  .pillar-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 12pt;
    font-weight: 600;
    color: #1a1612;
    margin: 1mm 0 1.5mm;
  }
  .pillar-text {
    font-size: 7.2pt;
    color: #5c4a38;
    line-height: 1.45;
  }

  .captions-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5mm;
    flex: 1;
  }
  .caption-box {
    background: #ffffff;
    border: 1px solid #e8d5c4;
    padding: 4mm 5.5mm;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .caption-box h4 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 11.5pt;
    font-weight: 600;
    color: #1a1612;
    margin-bottom: 1.5mm;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .caption-badge {
    font-family: 'Montserrat', sans-serif;
    font-size: 7pt;
    color: #c9a892;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }
  .caption-sample {
    font-family: 'Cormorant Garamond', serif;
    font-size: 9.5pt;
    color: #2c2416;
    line-height: 1.45;
    background: #faf8f5;
    padding: 3mm 4mm;
    border-left: 2px solid #c9a892;
    margin-bottom: 2mm;
  }
  .caption-formula {
    font-size: 7pt;
    color: #8a7e72;
    line-height: 1.35;
  }
  .hashtags {
    font-size: 6.8pt;
    color: #5c4a38;
    font-family: monospace;
    margin-top: 1mm;
  }

  /* ========================================================
     PAGE 5: VISUAL CONTENT & INSTAGRAM MOCKUP
     ======================================================== */
  .visual-page-layout {
    display: grid;
    grid-template-columns: 1.1fr 1.25fr;
    gap: 7mm;
    height: 100%;
  }
  .event-photos-col {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .event-photos-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3.5mm;
    margin-top: 2mm;
  }
  .event-photo-item {
    position: relative;
    border-radius: 3px;
    overflow: hidden;
    height: 38mm;
    border: 1px solid #e6e0d8;
    background: #2c2416;
  }
  .event-photo-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .event-photo-tag {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(180deg, transparent, rgba(26,22,18,0.88));
    color: #ffffff;
    font-size: 6.5pt;
    padding: 3mm 2.5mm 1.5mm;
    letter-spacing: 0.05em;
  }

  /* Instagram Grid Mockup */
  .insta-mockup-wrapper {
    background: #ffffff;
    border: 1px solid #e8d5c4;
    border-radius: 6px;
    padding: 4mm 5mm;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .insta-header {
    display: flex;
    align-items: center;
    gap: 3.5mm;
    border-bottom: 1px solid #f0eae1;
    padding-bottom: 2mm;
    margin-bottom: 2mm;
  }
  .insta-avatar {
    width: 11mm;
    height: 11mm;
    border-radius: 50%;
    border: 1.5px solid #c9a892;
    padding: 1px;
    background: #faf8f5;
  }
  .insta-avatar img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .insta-meta h5 {
    font-size: 8.5pt;
    font-weight: 600;
    color: #1a1612;
  }
  .insta-meta p {
    font-size: 7pt;
    color: #8a7e72;
  }
  .insta-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2mm;
    flex: 1;
  }
  .insta-tile {
    aspect-ratio: 1 / 1;
    overflow: hidden;
    position: relative;
    background: #faf8f5;
    border: 1px solid #e8d5c4;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
  .insta-tile img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .insta-quote-tile {
    background: #1a1612;
    color: #faf8f5;
    padding: 3mm;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .insta-quote-tile span.script {
    font-size: 17pt;
    color: #c9a892;
    line-height: 1;
  }
  .insta-quote-tile p {
    font-family: 'Cormorant Garamond', serif;
    font-size: 7.5pt;
    margin-top: 1mm;
    letter-spacing: 0.05em;
    line-height: 1.3;
  }

  /* ========================================================
     PAGE 6: MULTI-VIEW HIGH-FIDELITY KEEPSAKE MOCKUPS
     ======================================================== */
  .mockups-trio-page {
    display: flex;
    flex-direction: column;
    gap: 3.5mm;
    height: 100%;
  }
  .mockups-trio-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 4mm;
    flex: 1;
  }
  .mockup-item-card {
    background: #ffffff;
    border: 1px solid #e8d5c4;
    border-radius: 4px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
  .mockup-item-card__img {
    height: 60mm;
    overflow: hidden;
    position: relative;
  }
  .mockup-item-card__img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .mockup-item-card__body {
    padding: 2.5mm 3.5mm;
    background: #ffffff;
    border-top: 1px solid #e8d5c4;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .mockup-item-card__tag {
    font-size: 6.5pt;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    font-weight: 600;
    color: #c9a892;
  }
  .mockup-item-card__title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 11pt;
    font-weight: 600;
    color: #1a1612;
    margin: 0.5mm 0;
  }
  .mockup-item-card__desc {
    font-size: 6.8pt;
    color: #8a7e72;
    line-height: 1.35;
  }

  .production-bottom-strip {
    display: grid;
    grid-template-columns: 1.6fr 1fr;
    gap: 4mm;
    background: #ffffff;
    border: 1px solid #e8d5c4;
    border-radius: 4px;
    padding: 3mm 4.5mm;
  }
  .specs-list-horizontal {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2.5mm 5mm;
    font-size: 7.2pt;
    color: #3d3226;
  }
  .specs-list-horizontal div {
    display: flex;
    justify-content: space-between;
  }
  .specs-list-horizontal strong {
    color: #1a1612;
  }
  .turnaround-pill {
    background: rgba(201, 168, 146, 0.15);
    border: 1px solid #c9a892;
    padding: 2mm 3.5mm;
    border-radius: 3px;
    font-size: 7.2pt;
    color: #2c2416;
    line-height: 1.4;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .turnaround-pill strong {
    color: #1a1612;
    text-transform: uppercase;
    font-size: 6.8pt;
    letter-spacing: 0.08em;
  }

</style>
</head>
<body>

  <!-- ========================================================
       PAGE 1: COVER
       ======================================================== -->
  <section class="page cover-page">
    <div class="cover-badge">Official Brand &amp; Social Voice Manual · 2026 Edition</div>
    
    <div class="cover-logo-wrap">
      <img src="${logoPrimary}" alt="Quills and Ink Hub Emblem">
    </div>

    <h1 class="cover-title">Quills &amp; Ink Hub</h1>
    <div class="cover-sub">Event Planning, Coordination &amp; Consultancy · Literary Hub</div>
    <div class="cover-script">Where Every Story Finds Its Space</div>

    <div class="cover-abstract">
      A comprehensive design architecture, tone of voice framework, and ceremonial standard created to ensure absolute consistency across event coordination, spoken literature, and heirloom keepsake print for Ghanaian families in Ghana and the diaspora.
    </div>

    <div class="cover-meta">
      <div><strong>Document:</strong> Client Brand Standard</div>
      <div><strong>Version:</strong> 1.0 (Executive)</div>
      <div><strong>Regions:</strong> Accra, Ghana &amp; London, UK</div>
      <div><strong>Status:</strong> Approved Standard</div>
    </div>
  </section>

  <!-- ========================================================
       PAGE 2: LOGO ARCHITECTURE & EMBLEM SYSTEM
       ======================================================== -->
  <section class="page">
    <div class="page-header">
      <div class="page-header__left">
        <span class="page-header__num">01</span>
        <span class="page-header__title">Brand Identity · The Dove &amp; The Quill</span>
      </div>
      <div class="page-header__right">Quills and Ink Hub Brand Guidelines</div>
    </div>

    <div class="page-content">
      <div class="logo-page-grid">
        <!-- Left Column: Symbolism & Rules -->
        <div class="symbol-card">
          <div>
            <h3>The Sacred Emblem: Peace, Legacy &amp; Remembrance</h3>
            <p style="font-size: 7.8pt; color: #5c4a38; line-height: 1.5; margin-bottom: 2.5mm;">
              The official Quills &amp; Ink Hub emblem unites the spiritual reverence of the ascending dove with the enduring cultural weight of the literary quill. Designed as an unbroken circle, it symbolizes whole-journey coordination from the first listening consultation to permanent family keepsakes.
            </p>

            <div class="symbol-meanings">
              <div class="meaning-box">
                <h4>The Ascending Dove</h4>
                <p>Spiritual transcendence, peace, quiet grace, and solemn dignity during tender seasons of bereavement.</p>
              </div>
              <div class="meaning-box">
                <h4>The Quill &amp; Gold Nib</h4>
                <p>The power of the written word, personal eulogies, ancestral memory, and meticulous editorial craft.</p>
              </div>
              <div class="meaning-box">
                <h4>The Enclosing Circle</h4>
                <p>Unity of the family across borders (Ghana &amp; Diaspora) and seamless, complete coordination under one hub.</p>
              </div>
            </div>
          </div>

          <!-- Rules -->
          <div class="rules-box">
            <h4 style="font-family: 'Cormorant Garamond', serif; font-size: 11pt; font-weight: 600; color: #1a1612; margin-bottom: 1mm;">Emblem Integrity &amp; Application Guidelines</h4>
            <div class="rules-grid">
              <div class="rules-col do">
                <h5>Approved Practice</h5>
                <ul>
                  <li>Preserve clear space around the circle equal to at least 15% of emblem diameter.</li>
                  <li>Use against curated brand backgrounds: Ivory Linen, Dark Ink, or Warm Travertine.</li>
                  <li>Maintain the warm gold metallic accent on the dipping quill pen tip.</li>
                </ul>
              </div>
              <div class="rules-col dont">
                <h5>Prohibited Misuse</h5>
                <ul>
                  <li>Never combine with cartoon clipart, balloons, or disparate font styles.</li>
                  <li>Never distort the aspect ratio, stretch, or alter the line weight.</li>
                  <li>Never place on high-noise or conflicting multi-colored backgrounds.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column: Logo Colorway Variations -->
        <div class="logo-variants-grid">
          <div class="variant-card variant-card--ivory">
            <img src="${logoPrimary}" alt="Primary Brand Ink Logo">
            <div class="variant-label">Primary Mark · Ink on Ivory</div>
            <div style="font-size: 6.8pt; color: #8a7e72; margin-top: 1mm;">Default for stationery, contracts &amp; brochures</div>
          </div>

          <div class="variant-card variant-card--dark">
            <img src="${logoGold}" alt="Gold on Dark Ink Logo">
            <div class="variant-label" style="color: #c9a892;">Gilded Seal · Gold on Charcoal</div>
            <div style="font-size: 6.8pt; color: #a89a8c; margin-top: 1mm;">Executive dark mode &amp; evening programs</div>
          </div>

          <div class="variant-card variant-card--wood">
            <img src="${logoWhite}" alt="White on Mahogany Wood Logo">
            <div class="variant-label" style="color: #ffffff;">Monochrome · White on Wood</div>
            <div style="font-size: 6.8pt; color: #d0c4b6; margin-top: 1mm;">Engraved timber easels &amp; signage</div>
          </div>

          <div class="variant-card variant-card--ivory" style="border: 1px dashed #c9a892; background: #faf8f5;">
            <div style="font-family: 'Cormorant Garamond', serif; font-size: 14pt; font-weight: 600; text-transform: uppercase; letter-spacing: 0.12em; color: #1a1612; margin-bottom: 1mm;">Clear Space Rules</div>
            <div style="font-size: 7.2pt; color: #5c4a38; line-height: 1.4; padding: 0 4mm;">
              Minimum print diameter: <strong>22mm</strong><br>
              Minimum digital scale: <strong>64px</strong><br>
              Always maintain an uncompromised perimeter safe zone.
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="page-footer">
      <div><strong>Quills &amp; Ink Hub</strong> · Client Brand Guide</div>
      <div>Section 01: Logo Architecture &amp; Emblem System</div>
      <div>Page 02 of 06</div>
    </div>
  </section>

  <!-- ========================================================
       PAGE 3: COLOR PALETTE & TYPOGRAPHY
       ======================================================== -->
  <section class="page">
    <div class="page-header">
      <div class="page-header__left">
        <span class="page-header__num">02</span>
        <span class="page-header__title">Design System · Color Palette &amp; Typographic Scale</span>
      </div>
      <div class="page-header__right">Quills and Ink Hub Brand Guidelines</div>
    </div>

    <div class="page-content">
      <div class="color-typo-grid">
        <!-- Palette Swatches -->
        <div style="display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <h3 class="serif" style="font-size: 15pt; font-weight: 600; color: #1a1612; margin-bottom: 1mm;">The Dignified Ghanaian Palette</h3>
            <p style="font-size: 7.5pt; color: #5c4a38; margin-bottom: 3mm;">
              Rooted in organic tones of natural linen, ceremonial Ghanaian timber, rich charcoal ink, and understated gold foil.
            </p>
          </div>

          <div class="palette-grid">
            <div class="swatch">
              <div class="swatch__chip" style="background: #1a1612;"></div>
              <div class="swatch__info">
                <div class="swatch__name">Charcoal Ink</div>
                <div class="swatch__hex">#1A1612</div>
                <div class="swatch__desc">Primary text, authoritative lines, deep contrast.</div>
              </div>
            </div>

            <div class="swatch">
              <div class="swatch__chip" style="background: #2c2416;"></div>
              <div class="swatch__info">
                <div class="swatch__name">Warm Espresso</div>
                <div class="swatch__hex">#2C2416</div>
                <div class="swatch__desc">Dark cards, header banners, footer grounding.</div>
              </div>
            </div>

            <div class="swatch">
              <div class="swatch__chip" style="background: #3d3226;"></div>
              <div class="swatch__info">
                <div class="swatch__name">Ceremonial Wood</div>
                <div class="swatch__hex">#3D3226</div>
                <div class="swatch__desc">Mahogany accents, heritage timber tones.</div>
              </div>
            </div>

            <div class="swatch">
              <div class="swatch__chip" style="background: #c9a892;"></div>
              <div class="swatch__info">
                <div class="swatch__name">Muted Gold / Peach</div>
                <div class="swatch__hex">#C9A892</div>
                <div class="swatch__desc">Metallic foil stamping, buttons, badge borders.</div>
              </div>
            </div>

            <div class="swatch">
              <div class="swatch__chip" style="background: #e8d5c4;"></div>
              <div class="swatch__info">
                <div class="swatch__name">Blush Parchment</div>
                <div class="swatch__hex">#E8D5C4</div>
                <div class="swatch__desc">Card backgrounds, subtle dividers, highlights.</div>
              </div>
            </div>

            <div class="swatch">
              <div class="swatch__chip" style="background: #faf8f5; border-bottom: 1px solid #e6e0d8;"></div>
              <div class="swatch__info">
                <div class="swatch__name">Ivory Linen</div>
                <div class="swatch__hex">#FAF8F5</div>
                <div class="swatch__desc">Core brand canvas replacing sterile white.</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Typography System -->
        <div class="typography-container">
          <div>
            <h3 class="serif" style="font-size: 15pt; font-weight: 600; color: #1a1612; margin-bottom: 1mm;">The Three-Tier Typographic Scale</h3>
            <p style="font-size: 7.5pt; color: #5c4a38; margin-bottom: 3mm;">
              Carefully balancing poetic emotion, classical literary authority, and modern digital readability.
            </p>
          </div>

          <div class="type-item">
            <div class="type-role">1. Emotive Accent · Great Vibes (Cursive)</div>
            <div class="type-sample--script">Remembrance &amp; Reverence</div>
            <div class="type-usage">Used strictly for single-word evocative accents and decorative section flourishes. Never set in all-caps or long body copy.</div>
          </div>

          <div class="type-item">
            <div class="type-role">2. Primary Display &amp; Literature · Cormorant Garamond</div>
            <div class="type-sample--serif">Honouring a Life Well Lived</div>
            <div class="type-usage">Weights: 400 Regular, 500 Medium, 600 Semi-Bold. Used for all main page headlines, brochure dedications, package names, and pull-quotes.</div>
          </div>

          <div class="type-item">
            <div class="type-role">3. Editorial Body &amp; Protocol · Montserrat (Sans-Serif)</div>
            <div class="type-sample--sans">Dignified funeral coordination and literary care for Ghanaian families locally and abroad.</div>
            <div class="type-usage">Weights: 300 Light, 400 Regular, 500 Medium. Clean, open geometry ensuring high legibility across web, mobile, and print brochures.</div>
          </div>
        </div>
      </div>
    </div>

    <div class="page-footer">
      <div><strong>Quills &amp; Ink Hub</strong> · Client Brand Guide</div>
      <div>Section 02: Color Palette &amp; Typographic Scale</div>
      <div>Page 03 of 06</div>
    </div>
  </section>

  <!-- ========================================================
       PAGE 4: SOCIAL LANGUAGE & EDITORIAL VOICE
       ======================================================== -->
  <section class="page">
    <div class="page-header">
      <div class="page-header__left">
        <span class="page-header__num">03</span>
        <span class="page-header__title">Editorial Direction · Tone of Voice &amp; Social Language</span>
      </div>
      <div class="page-header__right">Quills and Ink Hub Brand Guidelines</div>
    </div>

    <div class="page-content">
      <!-- 4 Pillars -->
      <div class="voice-pillars-grid">
        <div class="pillar-card">
          <div class="pillar-num">Pillar 01</div>
          <div class="pillar-title">Steady &amp; Unhurried</div>
          <div class="pillar-text">
            A comforting, composed presence during seasons of grief. We never rush families or communicate with urgency; our voice brings quiet order and calm assurance.
          </div>
        </div>

        <div class="pillar-card">
          <div class="pillar-num">Pillar 02</div>
          <div class="pillar-title">Culturally Attuned</div>
          <div class="pillar-text">
            Deeply fluent in Ghanaian family hierarchies, traditional rites (Akan, Ga-Dangme, Ewe, Northern), and sacred church liturgies. We honor family elders with respect.
          </div>
        </div>

        <div class="pillar-card">
          <div class="pillar-num">Pillar 03</div>
          <div class="pillar-title">Literary &amp; Elevated</div>
          <div class="pillar-text">
            We reject tacky clichés. Words are treated with sacred precision—each tribute, biography, and spoken eulogy is crafted with poignant, timeless storytelling.
          </div>
        </div>

        <div class="pillar-card">
          <div class="pillar-num">Pillar 04</div>
          <div class="pillar-title">The Diaspora Bridge</div>
          <div class="pillar-text">
            Clear, transparent logistics for families in London, Toronto, or New York. We bridge time zones, virtual guests, and on-the-ground Accra arrangements seamlessly.
          </div>
        </div>
      </div>

      <!-- Caption Formulas -->
      <div class="captions-grid">
        <div class="caption-box">
          <h4>
            <span>Instagram &amp; Social Tribute Formula</span>
            <span class="caption-badge">Editorial Post</span>
          </h4>
          <div class="caption-sample">
            “A life well lived is a quiet hymn that echoes across generations.”<br><br>
            For the family of Papa Nicholas, remembrance was not held in grand speeches alone, but in the ordinary kindnesses that anchored three generations. From serene sanctuary hymns at All Souls’ Chapel to heirloom velvet-touch brochures, we are humbled to hold space for sacred memories.<br><br>
            May his memory remain a gentle blessing to all who walked in his light.
          </div>
          <div class="caption-formula">
            <strong>Formula Structure:</strong> [Evocative Quote Hook] → [Family &amp; Cultural Narrative] → [Ceremonial Detail] → [Reverent Blessing].
          </div>
          <div class="hashtags">#QuillsAndInkHub #GhanaianHeritage #Remembrance #CelebrationOfLife #FuneralPlanningAccra #MemorialBrochure</div>
        </div>

        <div class="caption-box">
          <h4>
            <span>WhatsApp Status &amp; Family Broadcast</span>
            <span class="caption-badge">Direct Care Desk</span>
          </h4>
          <div class="caption-sample">
            “Care that listens before it plans.”<br><br>
            To our diaspora families joining this weekend’s consultation calls from London and the US: our editorial desk has prepared your draft tribute synthesis and liturgical order of service.<br><br>
            We remain reachable daily on WhatsApp: +233 53 995 5615.
          </div>
          <div class="caption-formula">
            <strong>WhatsApp Tone:</strong> Concise, deeply personal, service-oriented, providing active contact numbers and time-zone flexibility.
          </div>
          <div class="hashtags">#DiasporaConcierge #AccraEvents #MemorialCare #QuillsAndInkFamily</div>
        </div>
      </div>
    </div>

    <div class="page-footer">
      <div><strong>Quills &amp; Ink Hub</strong> · Client Brand Guide</div>
      <div>Section 03: Editorial Direction &amp; Social Language</div>
      <div>Page 04 of 06</div>
    </div>
  </section>

  <!-- ========================================================
       PAGE 5: VISUAL CONTENT & INSTAGRAM MOCKUP
       ======================================================== -->
  <section class="page">
    <div class="page-header">
      <div class="page-header__left">
        <span class="page-header__num">04</span>
        <span class="page-header__title">Visual Curation · Real Event Artistry &amp; Social Grid Mockup</span>
      </div>
      <div class="page-header__right">Quills and Ink Hub Brand Guidelines</div>
    </div>

    <div class="page-content">
      <div class="visual-page-layout">
        <!-- Event Photography from Site -->
        <div class="event-photos-col">
          <div>
            <h3 class="serif" style="font-size: 14pt; font-weight: 600; color: #1a1612; margin-bottom: 1mm;">Authentic Memorial Photography Standards</h3>
            <p style="font-size: 7.2pt; color: #5c4a38; line-height: 1.45;">
              Images must honor authentic Ghanaian funeral traditions—pristine white thanksgiving attire, handwoven Kente drapery, lush floral wreaths, and dignified family elders under natural ambient light.
            </p>
          </div>

          <div class="event-photos-grid">
            <div class="event-photo-item">
              <img src="${photoKente}" alt="Kente Casket Drapery">
              <div class="event-photo-tag">Lashibi Chapel · Woven Kente &amp; Floral Artistry</div>
            </div>

            <div class="event-photo-item">
              <img src="${photoCongregation}" alt="Sanctuary Congregation">
              <div class="event-photo-tag">Thanksgiving Rites · Congregation in Ceremonial White</div>
            </div>

            <div class="event-photo-item">
              <img src="${photoPortrait}" alt="Memorial Altar Portrait">
              <div class="event-photo-tag">Adu-Asare Memorial · Candlelight Altar &amp; Register</div>
            </div>

            <div class="event-photo-item">
              <img src="${photoGarden}" alt="Garden Reception">
              <div class="event-photo-tag">Dreamz Gardens · Dignitary Protocol Reception</div>
            </div>
          </div>
        </div>

        <!-- Instagram Feed Mockup -->
        <div class="insta-mockup-wrapper">
          <div class="insta-header">
            <div class="insta-avatar">
              <img src="${logoPrimary}" alt="Profile avatar">
            </div>
            <div class="insta-meta">
              <h5>quillsninkhub</h5>
              <p>Quills &amp; Ink Hub · Funeral Coordination &amp; Literary Care · Accra &amp; Diaspora</p>
            </div>
          </div>

          <!-- 9-Tile Grid -->
          <div class="insta-grid">
            <div class="insta-tile">
              <img src="${photoKente}" alt="Kente tile">
            </div>
            <div class="insta-tile insta-quote-tile">
              <span class="script">Remembrance</span>
              <p>“Where every story finds its space.”</p>
            </div>
            <div class="insta-tile">
              <img src="${photoPortrait}" alt="Portrait tile">
            </div>

            <div class="insta-tile insta-quote-tile" style="background: #2c2416;">
              <p style="font-family: 'Cormorant Garamond', serif; font-size: 9pt; font-weight: 500; font-style: italic;">“Care that listens before it plans.”</p>
            </div>
            <div class="insta-tile">
              <img src="${photoCongregation}" alt="Congregation tile">
            </div>
            <div class="insta-tile">
              <img src="${photoElders}" alt="Family elders tile">
            </div>

            <div class="insta-tile">
              <img src="${photoGarden}" alt="Garden reception tile">
            </div>
            <div class="insta-tile insta-quote-tile" style="background: #3d3226;">
              <span class="script" style="color: #e8d5c4;">Heritage</span>
              <p>Honouring Ghanaian family legacies across borders.</p>
            </div>
            <div class="insta-tile">
              <img src="${photoChapel}" alt="Chapel tile">
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="page-footer">
      <div><strong>Quills &amp; Ink Hub</strong> · Client Brand Guide</div>
      <div>Section 04: Visual Curation &amp; Social Grid Mockup</div>
      <div>Page 05 of 06</div>
    </div>
  </section>

  <!-- ========================================================
     PAGE 6: MULTI-VIEW HIGH-FIDELITY KEEPSAKE MOCKUPS
     ======================================================== -->
  <section class="page">
    <div class="page-header">
      <div class="page-header__left">
        <span class="page-header__num">05</span>
        <span class="page-header__title">Physical Heirlooms · Memorial Keepsake Suite &amp; Production</span>
      </div>
      <div class="page-header__right">Quills and Ink Hub Brand Guidelines</div>
    </div>

    <div class="page-content">
      <div class="mockups-trio-page">
        <!-- Trio of High-Fidelity Mockups -->
        <div class="mockups-trio-grid">
          <!-- Mockup 1: Closed Cover -->
          <div class="mockup-item-card">
            <div class="mockup-item-card__img">
              <img src="${mockupCover}" alt="Memorial Keepsake Booklet Closed Cover">
            </div>
            <div class="mockup-item-card__body">
              <div>
                <div class="mockup-item-card__tag">View 01 · Hardcover Edition</div>
                <div class="mockup-item-card__title">Soft-Touch Velvet Keepsake</div>
                <div class="mockup-item-card__desc">A5 250gsm Silk Cover with Soft-Touch Matte Velvet Laminate, embossed gold foil serif titling, and brass pen on travertine stone.</div>
              </div>
            </div>
          </div>

          <!-- Mockup 2: Opened Spread -->
          <div class="mockup-item-card">
            <div class="mockup-item-card__img">
              <img src="${mockupOpen}" alt="Memorial Keepsake Booklet Open Spread">
            </div>
            <div class="mockup-item-card__body">
              <div>
                <div class="mockup-item-card__tag">View 02 · Interior Layout</div>
                <div class="mockup-item-card__title">Double-Page Memorial Spread</div>
                <div class="mockup-item-card__desc">Archival 130gsm silk inner pages displaying biographical tributes, full-color obituary portrait framing, and delicate gardenia petals.</div>
              </div>
            </div>
          </div>

          <!-- Mockup 3: Full Flat-Lay Suite -->
          <div class="mockup-item-card">
            <div class="mockup-item-card__img">
              <img src="${mockupFlatlay}" alt="Complete Funeral Stationery Suite Flat-Lay">
            </div>
            <div class="mockup-item-card__body">
              <div>
                <div class="mockup-item-card__tag">View 03 · Collateral Suite</div>
                <div class="mockup-item-card__title">Complete Stationery Collection</div>
                <div class="mockup-item-card__desc">Harmonized linen hardbound keepsake book, liturgical order of service card, blind-embossed sympathy card, and vintage brass instruments.</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Technical Specifications & Production Bottom Bar -->
        <div class="production-bottom-strip">
          <div class="specs-list-horizontal">
            <div><span>Cover Paper Stock:</span> <strong>250gsm Silk with Velvet Matte</strong></div>
            <div><span>Binding Protocol:</span> <strong>Saddle Stitched / Square Back</strong></div>
            <div><span>Inner Text Stock:</span> <strong>130gsm Archival Silk Paper</strong></div>
            <div><span>Embellishments:</span> <strong>Metallic Gold Foil Embossing</strong></div>
            <div><span>Collateral Items:</span> <strong>Registers, Hymns, Easel Signs</strong></div>
            <div><span>Secretariat Phone:</span> <strong>+233 53 995 5615 (WhatsApp)</strong></div>
          </div>

          <div class="turnaround-pill">
            <strong>Design &amp; Printing Turnaround:</strong>
            Approximately <strong>3 weeks</strong> after all family tributes, biography, and curated photography are secured. Includes proofing, layout, and press run in Accra or London.
          </div>
        </div>
      </div>
    </div>

    <div class="page-footer">
      <div><strong>Quills &amp; Ink Hub</strong> · Client Brand Guide</div>
      <div>Section 05: Physical Heirlooms &amp; Production Specifications</div>
      <div>Page 06 of 06</div>
    </div>
  </section>

</body>
</html>`;

// Write HTML file temporarily
const tempDir = path.join(rootDir, 'scripts', 'temp');
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

const brandGuideHtmlPath = path.join(tempDir, 'brand-guide-template.html');
fs.writeFileSync(brandGuideHtmlPath, brandGuideHtml);

const outputPathDownloads = path.join(rootDir, 'public', 'downloads', 'quills-and-ink-brand-guide.pdf');
const outputPathSamples = path.join(rootDir, 'public', 'samples', 'quills-and-ink-brand-guide.pdf');

const tempUserData = 'C:\\\\Users\\\\gokro\\\\AppData\\\\Local\\\\Temp\\\\chrome-brand-guide-temp';
const chromeFlags = `--headless=new --disable-gpu --no-first-run --no-default-browser-check --user-data-dir="${tempUserData}"`;

console.log('Rendering 6-page Brand Guide PDF via headless Chrome with embedded fonts & high-fidelity mockups...');
execSync(`"${chromePath}" ${chromeFlags} --print-to-pdf="${outputPathDownloads}" --no-pdf-header-footer "file:///${brandGuideHtmlPath.replace(/\\\\/g, '/')}"`);
console.log('Brand Guide PDF created successfully at:', outputPathDownloads);

fs.copyFileSync(outputPathDownloads, outputPathSamples);
console.log('Copied to public/samples at:', outputPathSamples);

const distDownloads = path.join(rootDir, 'dist', 'downloads');
if (fs.existsSync(distDownloads)) {
  fs.copyFileSync(outputPathDownloads, path.join(distDownloads, 'quills-and-ink-brand-guide.pdf'));
}
const distSamples = path.join(rootDir, 'dist', 'samples');
if (fs.existsSync(distSamples)) {
  fs.copyFileSync(outputPathDownloads, path.join(distSamples, 'quills-and-ink-brand-guide.pdf'));
}

console.log('Done! 6-Page Brand Guide PDF compiled across all download targets.');
