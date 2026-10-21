import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const desktopPackDir = 'C:\\Users\\gokro\\Desktop\\Quills and Ink Hub - Client Pack';
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const brainDir = 'C:\\Users\\gokro\\.gemini\\antigravity-ide\\brain\\558d51c0-3dc2-4ed9-a68c-e855d08c8422';

console.log('--- Quills & Ink Hub Expansion Pack Builder ---');

// 1. Copy the 6 new photorealistic AI mockups to 03_High_Fidelity_Mockups
const mockupMap = [
  { src: 'wax_seal_envelope_mockup_1791973639390.jpg', dest: '07_tribute_linen_envelope_and_wax_seal.jpg' },
  { src: 'mourner_reading_keepsake_1791973664488.jpg', dest: '08_family_memorial_reading_chapel.jpg' },
  { src: 'archival_box_mockup_1791973687486.jpg', dest: '09_archival_memorial_box_and_ribbon.jpg' },
  { src: 'thanksgiving_table_mockup_1791973710903.jpg', dest: '10_monochrome_thanksgiving_stationery_flatlay.jpg' },
  { src: 'hands_holding_program_1791973883166.jpg', dest: '11_hands_holding_adinkra_memorial_booklet.jpg' },
  { src: 'archival_literary_desk_1791973935855.jpg', dest: '12_vintage_ghanaian_photo_archive_and_inkwell.jpg' },
];

const mockupsDestDir = path.join(desktopPackDir, '03_High_Fidelity_Mockups');
fs.mkdirSync(mockupsDestDir, { recursive: true });

for (const m of mockupMap) {
  const srcPath = path.join(brainDir, m.src);
  const destPath = path.join(mockupsDestDir, m.dest);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied Mockup: ${m.dest}`);
  } else {
    console.warn(`Source mockup not found: ${srcPath}`);
  }
}

// 2. Load embedded fonts
const embeddedFontsCssPath = path.join(rootDir, 'scripts', 'temp', 'embedded-fonts.css');
const embeddedFontsCss = fs.readFileSync(embeddedFontsCssPath, 'utf-8');

function fileToBase64(filePath) {
  if (!fs.existsSync(filePath)) return '';
  const ext = path.extname(filePath).toLowerCase().replace('.', '');
  const mime = ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' : ext === 'png' ? 'image/png' : 'image/svg+xml';
  const data = fs.readFileSync(filePath).toString('base64');
  return `data:${mime};base64,${data}`;
}

const logoPrimary = fileToBase64(path.join(rootDir, 'public', 'images', 'brand', 'dove_logo_primary.png'));
const logoGold = fileToBase64(path.join(rootDir, 'public', 'images', 'brand', 'dove_logo_gold.png'));
const logoWhite = fileToBase64(path.join(rootDir, 'public', 'images', 'brand', 'dove_logo_white.png'));

// Authentic event photos for William Dowridge Adu-Asare
const wdPortrait = fileToBase64(path.join(rootDir, 'public/images/portfolio/william-dowridge-adu-asare/01-memorial-portrait-registry.jpg'));
const wdInvitation = fileToBase64(path.join(rootDir, 'public/images/portfolio/william-dowridge-adu-asare/02-funeral-invitation-arrangements.jpg'));
const wdGarden = fileToBase64(path.join(rootDir, 'public/images/portfolio/william-dowridge-adu-asare/03-garden-reception-arrival.jpg'));
const wdDonation = fileToBase64(path.join(rootDir, 'public/images/portfolio/william-dowridge-adu-asare/04-donation-registry-protocol.jpg'));
const wdSpokesperson = fileToBase64(path.join(rootDir, 'public/images/portfolio/william-dowridge-adu-asare/05-family-spokesperson-announcements.jpg'));

// New editorial mockups base64
const imgHandsBooklet = fileToBase64(path.join(brainDir, 'hands_holding_program_1791973883166.jpg'));
const imgArchiveDesk = fileToBase64(path.join(brainDir, 'archival_literary_desk_1791973935855.jpg'));
const imgWaxEnvelope = fileToBase64(path.join(brainDir, 'wax_seal_envelope_mockup_1791973639390.jpg'));
const imgBoxRibbon = fileToBase64(path.join(brainDir, 'archival_box_mockup_1791973687486.jpg'));
const imgMournerReading = fileToBase64(path.join(brainDir, 'mourner_reading_keepsake_1791973664488.jpg'));

// Post wrapper
function wrapPostHtml(innerHtml, bg = '#faf8f5', textColor = '#1a1612') {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
  ${embeddedFontsCss}
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body {
    width: 1080px;
    height: 1080px;
    overflow: hidden;
    background: ${bg};
    color: ${textColor};
    font-family: 'Montserrat', sans-serif;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .post-canvas {
    width: 1080px;
    height: 1080px;
    position: relative;
    padding: 75px 80px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
  }
  .frame-border {
    position: absolute;
    inset: 35px;
    border: 1px solid rgba(201, 168, 146, 0.45);
    pointer-events: none;
    z-index: 20;
  }
  .frame-border-inner {
    position: absolute;
    inset: 43px;
    border: 1px solid rgba(230, 224, 216, 0.4);
    pointer-events: none;
    z-index: 20;
  }
  .script { font-family: 'Great Vibes', cursive; }
  .serif { font-family: 'Cormorant Garamond', serif; }
  .gold { color: #c9a892; }
</style>
</head>
<body>
  <div class="post-canvas">
    <div class="frame-border"></div>
    <div class="frame-border-inner"></div>
    ${innerHtml}
  </div>
</body>
</html>`;
}

// 3. Define the new posts to render
const series7Dir = path.join(desktopPackDir, '06_Social_Media_Launch_Pack', 'Series_7_Case_Study_William_Dowridge_Adu_Asare');
const series8Dir = path.join(desktopPackDir, '06_Social_Media_Launch_Pack', 'Series_8_The_Craft_of_Literary_Care');
fs.mkdirSync(series7Dir, { recursive: true });
fs.mkdirSync(series8Dir, { recursive: true });

const newPosts = [
  // ==========================================
  // SERIES 7: CASE STUDY 3 · WILLIAM DOWRIDGE ADU-ASARE SNR
  // ==========================================
  {
    dest: path.join(series7Dir, 'Slide_01_Cover_Memorial_Altar_and_Candlelight.png'),
    bg: '#1a1612',
    text: '#faf8f5',
    html: `
      <div style="display: flex; justify-content: space-between; align-items: center; z-index: 10;">
        <span style="font-size: 10pt; letter-spacing: 0.25em; text-transform: uppercase; color: #c9a892; font-weight: 600;">Case Study · Retrospective 02</span>
        <div style="display: flex; align-items: center; gap: 12px;">
          <img src="${logoGold}" style="width: 38px; height: 38px; object-fit: contain;">
          <span class="serif" style="font-size: 13pt; letter-spacing: 0.15em; text-transform: uppercase; color: #ffffff;">Quills &amp; Ink Hub</span>
        </div>
      </div>

      <div style="display: flex; gap: 45px; align-items: center; z-index: 10;">
        <div style="flex: 1.1; height: 580px; border-radius: 4px; overflow: hidden; border: 1px solid #c9a892; box-shadow: 0 15px 40px rgba(0,0,0,0.4);">
          <img src="${wdPortrait}" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
        <div style="flex: 1;">
          <div class="script gold" style="font-size: 46pt; line-height: 1; margin-bottom: 12px;">Kwame Adu</div>
          <h1 class="serif" style="font-size: 32pt; font-weight: 600; line-height: 1.2; color: #ffffff; margin-bottom: 18px;">
            The Memorial Service of the Late William Dowridge Adu-Asare Snr
          </h1>
          <p style="font-size: 11.5pt; color: #e8d5c4; font-weight: 300; line-height: 1.7; margin-bottom: 20px;">
            A bespoke retrospective honoring a cherished patriarch (1960–2026) across Achimota and Amrahia-Otinibi, seamlessly uniting Christian reverence with authentic Ghanaian customs.
          </p>
          <div style="display: inline-block; padding: 8px 18px; background: rgba(201,168,146,0.2); border: 1px solid #c9a892; border-radius: 20px; font-size: 9pt; letter-spacing: 0.15em; text-transform: uppercase; color: #faf8f5;">
            Swipe to Explore the Rites →
          </div>
        </div>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(201,168,146,0.3); padding-top: 25px; z-index: 10;">
        <span style="font-size: 10pt; color: #8a7e72;">Slide 01 of 05 · Memorial Architecture</span>
        <span style="font-size: 10pt; color: #c9a892;">Achimota · Accra, Ghana</span>
      </div>
    `
  },
  {
    dest: path.join(series7Dir, 'Slide_02_Liturgical_Solemnity_and_Program_Design.png'),
    bg: '#faf8f5',
    text: '#1a1612',
    html: `
      <div style="display: flex; justify-content: space-between; align-items: center; z-index: 10;">
        <span style="font-size: 10pt; letter-spacing: 0.25em; text-transform: uppercase; color: #c9a892; font-weight: 600;">The Printed Order of Service</span>
        <span class="serif" style="font-size: 13pt; letter-spacing: 0.15em; text-transform: uppercase; font-weight: 600;">Quills &amp; Ink</span>
      </div>

      <div style="display: flex; gap: 45px; align-items: center; z-index: 10;">
        <div style="flex: 1;">
          <div style="display: inline-block; padding: 6px 16px; background: rgba(201,168,146,0.2); border: 1px solid #c9a892; border-radius: 20px; font-size: 9pt; text-transform: uppercase; letter-spacing: 0.15em; color: #3d3226; margin-bottom: 16px;">
            Liturgical Precision
          </div>
          <h2 class="serif" style="font-size: 30pt; font-weight: 600; line-height: 1.25; margin-bottom: 18px; color: #1a1612;">
            Harmonizing Hymns, Scripture &amp; Rites
          </h2>
          <p style="font-size: 11.5pt; color: #5c4a38; line-height: 1.7; margin-bottom: 15px;">
            From the pre-burial filing-past to the solemn church committal, our team designed and typeset the commemorative announcement and liturgical order.
          </p>
          <ul style="list-style: none; font-size: 10.5pt; color: #2c2416; line-height: 1.7; margin-bottom: 20px;">
            <li>✓ <strong>Curated Hymnography:</strong> Accurate lyrics and refrain notations</li>
            <li>✓ <strong>Pacing Control:</strong> Smooth transitions between choirs and tributes</li>
            <li>✓ <strong>Clergy Alignment:</strong> Complete liturgical sync with church officiants</li>
          </ul>
        </div>
        <div style="flex: 1.1; height: 560px; border-radius: 4px; overflow: hidden; border: 1px solid #e8d5c4; box-shadow: 0 10px 30px rgba(0,0,0,0.06);">
          <img src="${wdInvitation}" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #e6e0d8; padding-top: 25px; z-index: 10;">
        <span style="font-size: 10pt; color: #8a7e72;">Slide 02 of 05 · Official Announcements</span>
        <span class="serif" style="font-size: 12pt; color: #1a1612;">quillsandinkhub.com</span>
      </div>
    `
  },
  {
    dest: path.join(series7Dir, 'Slide_03_The_Garden_Sanctuary_Dreamz_and_Memoriez.png'),
    bg: '#1a1612',
    text: '#faf8f5',
    html: `
      <div style="position: absolute; inset: 0; opacity: 0.35; z-index: 1;">
        <img src="${wdGarden}" style="width: 100%; height: 100%; object-fit: cover;">
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; z-index: 10;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <img src="${logoGold}" style="width: 38px; height: 38px; object-fit: contain;">
          <span class="serif" style="font-size: 13pt; letter-spacing: 0.15em; text-transform: uppercase; color: #c9a892; font-weight: 600;">Quills and Ink</span>
        </div>
        <span style="font-size: 9.5pt; letter-spacing: 0.2em; text-transform: uppercase; color: #e8d5c4;">Venue Staging &amp; Hospitality</span>
      </div>

      <div style="text-align: center; max-width: 840px; margin: 0 auto; z-index: 10;">
        <div class="script gold" style="font-size: 46pt; margin-bottom: 10px; line-height: 1;">Open Air Elegance</div>
        <h1 class="serif" style="font-size: 40pt; font-weight: 600; line-height: 1.2; color: #ffffff; margin-bottom: 22px;">
          Dreamz &amp; Memoriez Events Garden, Achimota
        </h1>
        <p style="font-size: 13.5pt; color: #e8d5c4; font-weight: 300; line-height: 1.75; margin-bottom: 25px;">
          Following the church service, hundreds of sympathizers gathered under expansive, shaded canopies in the lush open garden. Our floor coordinators ensured unhurried guest movement, comfortable elder seating, and dignified refreshment service.
        </p>
        <div style="display: inline-block; padding: 10px 24px; background: rgba(201,168,146,0.25); border: 1px solid #c9a892; border-radius: 30px; font-size: 10pt; color: #faf8f5; letter-spacing: 0.1em;">
          Canopy Zoning · Floral Artistry · Guest Hospitality
        </div>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(201,168,146,0.3); padding-top: 25px; z-index: 10;">
        <span style="font-size: 10pt; color: #8a7e72;">Slide 03 of 05 · Final Funeral Rites</span>
        <span style="font-size: 10pt; color: #c9a892;">Achimota, Greater Accra</span>
      </div>
    `
  },
  {
    dest: path.join(series7Dir, 'Slide_04_Protocol_Secretariat_and_Nsawa_Registry.png'),
    bg: '#faf8f5',
    text: '#1a1612',
    html: `
      <div style="display: flex; justify-content: space-between; align-items: center; z-index: 10;">
        <span style="font-size: 10pt; letter-spacing: 0.25em; text-transform: uppercase; color: #c9a892; font-weight: 600;">The Protocol Secretariat</span>
        <span class="serif" style="font-size: 13pt; letter-spacing: 0.15em; text-transform: uppercase; font-weight: 600;">Quills &amp; Ink</span>
      </div>

      <div style="display: flex; gap: 45px; align-items: center; z-index: 10;">
        <div style="flex: 1.1; height: 560px; border-radius: 4px; overflow: hidden; border: 1px solid #e8d5c4; box-shadow: 0 10px 30px rgba(0,0,0,0.06);">
          <img src="${wdDonation}" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
        <div style="flex: 1;">
          <div style="display: inline-block; padding: 6px 16px; background: rgba(201,168,146,0.2); border: 1px solid #c9a892; border-radius: 20px; font-size: 9pt; text-transform: uppercase; letter-spacing: 0.15em; color: #3d3226; margin-bottom: 16px;">
            Orderly Administration
          </div>
          <h2 class="serif" style="font-size: 28pt; font-weight: 600; line-height: 1.25; margin-bottom: 18px; color: #1a1612;">
            Transparent Nsawa &amp; Condolence Recording
          </h2>
          <p style="font-size: 11.5pt; color: #5c4a38; line-height: 1.7; margin-bottom: 15px;">
            During peak attendance hours, our secretariat deployed a dedicated protocol desk staffed by trained attendants in coordinated attire.
          </p>
          <div style="background: #ffffff; border-left: 3px solid #c9a892; padding: 14px 18px; font-size: 10.5pt; color: #2c2416; line-height: 1.6; margin-bottom: 15px;">
            Every cash donation (<em>Nsawa</em>), sympathy card, and handwritten prayer was immediately logged, safeguarded, and delivered to the family head with complete financial transparency.
          </div>
        </div>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #e6e0d8; padding-top: 25px; z-index: 10;">
        <span style="font-size: 10pt; color: #8a7e72;">Slide 04 of 05 · Accountability &amp; Trust</span>
        <span class="serif" style="font-size: 12pt; color: #1a1612;">quillsandinkhub.com</span>
      </div>
    `
  },
  {
    dest: path.join(series7Dir, 'Slide_05_Living_Memory_and_Voice_of_Thanks.png'),
    bg: '#1a1612',
    text: '#faf8f5',
    html: `
      <div style="display: flex; justify-content: space-between; align-items: center; z-index: 10;">
        <span style="font-size: 10pt; letter-spacing: 0.25em; text-transform: uppercase; color: #c9a892; font-weight: 600;">The Final Salute</span>
        <div style="display: flex; align-items: center; gap: 12px;">
          <img src="${logoGold}" style="width: 38px; height: 38px; object-fit: contain;">
          <span class="serif" style="font-size: 13pt; letter-spacing: 0.15em; text-transform: uppercase; color: #ffffff;">Quills &amp; Ink Hub</span>
        </div>
      </div>

      <div style="display: flex; gap: 45px; align-items: center; z-index: 10;">
        <div style="flex: 1;">
          <div class="script gold" style="font-size: 46pt; line-height: 1; margin-bottom: 12px;">Words that Endure</div>
          <h2 class="serif" style="font-size: 30pt; font-weight: 600; line-height: 1.25; margin-bottom: 18px; color: #ffffff;">
            A Voice of Gratitude &amp; Lasting Legacy
          </h2>
          <p style="font-size: 11.5pt; color: #e8d5c4; font-weight: 300; line-height: 1.7; margin-bottom: 15px;">
            The gathering concluded with moving spoken tributes from family elders, church brethren, and children, followed by a formal vote of thanks delivered at the microphone.
          </p>
          <p style="font-size: 11pt; color: #c9a892; font-style: italic; line-height: 1.6; margin-bottom: 20px;">
            “A life well lived is not measured solely in years, but in the peace and unity left behind in the hearts of family.”
          </p>
          <div style="display: inline-block; padding: 10px 22px; background: rgba(201,168,146,0.2); border: 1px solid #c9a892; border-radius: 30px; font-size: 9.5pt; text-transform: uppercase; letter-spacing: 0.12em; color: #faf8f5;">
            Plan Your Family Ceremony With Us
          </div>
        </div>
        <div style="flex: 1.1; height: 560px; border-radius: 4px; overflow: hidden; border: 1px solid #c9a892; box-shadow: 0 15px 40px rgba(0,0,0,0.4);">
          <img src="${wdSpokesperson}" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(201,168,146,0.3); padding-top: 25px; z-index: 10;">
        <span style="font-size: 10pt; color: #8a7e72;">Slide 05 of 05 · Full Case Study Archive</span>
        <span style="font-size: 10pt; color: #c9a892;">WhatsApp: +233 53 995 5615</span>
      </div>
    `
  },

  // ==========================================
  // SERIES 8: THE CRAFT OF LITERARY CARE (NEW EDITORIAL POSTS)
  // ==========================================
  {
    dest: path.join(series8Dir, 'Post_01_The_Touch_of_Tangible_Memory.png'),
    bg: '#faf8f5',
    text: '#1a1612',
    html: `
      <div style="display: flex; justify-content: space-between; align-items: center; z-index: 10;">
        <span style="font-size: 10pt; letter-spacing: 0.25em; text-transform: uppercase; color: #c9a892; font-weight: 600;">The Materiality of Memory</span>
        <div style="display: flex; align-items: center; gap: 12px;">
          <img src="${logoPrimary}" style="width: 40px; height: 40px; object-fit: contain;">
          <span class="serif" style="font-size: 13pt; letter-spacing: 0.15em; text-transform: uppercase; font-weight: 600;">Quills &amp; Ink</span>
        </div>
      </div>

      <div style="display: flex; gap: 50px; align-items: center; z-index: 10;">
        <div style="flex: 1.1; height: 580px; border-radius: 4px; overflow: hidden; border: 1px solid #e8d5c4; box-shadow: 0 12px 35px rgba(0,0,0,0.06);">
          <img src="${imgHandsBooklet}" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
        <div style="flex: 1;">
          <div class="script gold" style="font-size: 48pt; line-height: 1; margin-bottom: 12px;">Enduring Touch</div>
          <h1 class="serif" style="font-size: 32pt; font-weight: 600; line-height: 1.25; margin-bottom: 20px; color: #1a1612;">
            Why Physical Memorial Keepsakes Endure
          </h1>
          <p style="font-size: 12pt; color: #5c4a38; line-height: 1.7; margin-bottom: 18px;">
            In a fleeting digital era, hands yearn for tangible weight. When family members sit in church and open an ivory linen keepsake, the tactile texture communicates reverence before a single word is read.
          </p>
          <div style="background: #ffffff; border-left: 3px solid #c9a892; padding: 14px 18px; font-size: 10.5pt; color: #2c2416; line-height: 1.6;">
            Archival 350gsm cotton cardstock, authentic gold leaf foil, and Smyth-sewn binding designed to survive in family living rooms for 50+ years.
          </div>
        </div>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #e6e0d8; padding-top: 25px; z-index: 10;">
        <span style="font-size: 10pt; color: #8a7e72;">Fine Memorial Publishing</span>
        <span class="serif" style="font-size: 12pt; color: #1a1612;">Accra · London</span>
      </div>
    `
  },
  {
    dest: path.join(series8Dir, 'Post_02_Unearthing_Forgotten_Stories.png'),
    bg: '#1a1612',
    text: '#faf8f5',
    html: `
      <div style="display: flex; justify-content: space-between; align-items: center; z-index: 10;">
        <span style="font-size: 10pt; letter-spacing: 0.25em; text-transform: uppercase; color: #c9a892; font-weight: 600;">The Editorial Methodology</span>
        <div style="display: flex; align-items: center; gap: 12px;">
          <img src="${logoGold}" style="width: 38px; height: 38px; object-fit: contain;">
          <span class="serif" style="font-size: 13pt; letter-spacing: 0.15em; text-transform: uppercase; color: #ffffff;">Quills &amp; Ink Hub</span>
        </div>
      </div>

      <div style="display: flex; gap: 50px; align-items: center; z-index: 10;">
        <div style="flex: 1;">
          <div class="script gold" style="font-size: 48pt; line-height: 1; margin-bottom: 12px;">The Archive Desk</div>
          <h1 class="serif" style="font-size: 32pt; font-weight: 600; line-height: 1.25; margin-bottom: 20px; color: #ffffff;">
            Unearthing the Forgotten Chapters of a Well-Lived Life
          </h1>
          <p style="font-size: 12pt; color: #e8d5c4; font-weight: 300; line-height: 1.7; margin-bottom: 18px;">
            A life cannot be summarized in a hurried bulleted timeline. Our literary editors sit with family elders, review vintage photograph albums, and transcribe spoken voice notes from diaspora relatives.
          </p>
          <div style="display: inline-block; padding: 10px 22px; background: rgba(201,168,146,0.2); border: 1px solid #c9a892; border-radius: 30px; font-size: 10pt; color: #faf8f5;">
            Oral History Discovery · Photo Restoration · Bespoke Eulogies
          </div>
        </div>
        <div style="flex: 1.1; height: 580px; border-radius: 4px; overflow: hidden; border: 1px solid #c9a892; box-shadow: 0 15px 40px rgba(0,0,0,0.4);">
          <img src="${imgArchiveDesk}" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(201,168,146,0.3); padding-top: 25px; z-index: 10;">
        <span style="font-size: 10pt; color: #8a7e72;">Bespoke Family Chronicles</span>
        <span style="font-size: 10pt; color: #c9a892;">quillsandinkhub.com</span>
      </div>
    `
  },
  {
    dest: path.join(series8Dir, 'Post_03_Sealed_With_Reverence_The_Wax_Seal.png'),
    bg: '#faf8f5',
    text: '#1a1612',
    html: `
      <div style="display: flex; justify-content: space-between; align-items: center; z-index: 10;">
        <span style="font-size: 10pt; letter-spacing: 0.25em; text-transform: uppercase; color: #c9a892; font-weight: 600;">The Ritual of Presentation</span>
        <span class="serif" style="font-size: 13pt; letter-spacing: 0.15em; text-transform: uppercase; font-weight: 600;">Quills &amp; Ink</span>
      </div>

      <div style="display: flex; gap: 50px; align-items: center; z-index: 10;">
        <div style="flex: 1.1; height: 580px; border-radius: 4px; overflow: hidden; border: 1px solid #e8d5c4; box-shadow: 0 12px 35px rgba(0,0,0,0.06);">
          <img src="${imgWaxEnvelope}" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
        <div style="flex: 1;">
          <div class="script gold" style="font-size: 48pt; line-height: 1; margin-bottom: 12px;">Sealed in Dignity</div>
          <h1 class="serif" style="font-size: 32pt; font-weight: 600; line-height: 1.25; margin-bottom: 20px; color: #1a1612;">
            Every Tribute Deserves A Sacred Enclosure
          </h1>
          <p style="font-size: 12pt; color: #5c4a38; line-height: 1.7; margin-bottom: 18px;">
            For VIP dignitaries, church elders, and immediate children, we seal commemorative eulogy transcripts inside handmade cotton deckled envelopes with an antique brass wax stamp.
          </p>
          <div style="background: #ffffff; border-left: 3px solid #c9a892; padding: 14px 18px; font-size: 10.5pt; color: #2c2416; line-height: 1.6;">
            Because when love is final, the rituals of closing must carry beauty and deliberate care.
          </div>
        </div>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #e6e0d8; padding-top: 25px; z-index: 10;">
        <span style="font-size: 10pt; color: #8a7e72;">VIP Commemorative Suites</span>
        <span class="serif" style="font-size: 12pt; color: #1a1612;">Accra · UK · USA</span>
      </div>
    `
  },
  {
    dest: path.join(series8Dir, 'Post_04_Heirlooms_For_Generations_Unborn.png'),
    bg: '#1a1612',
    text: '#faf8f5',
    html: `
      <div style="display: flex; justify-content: space-between; align-items: center; z-index: 10;">
        <span style="font-size: 10pt; letter-spacing: 0.25em; text-transform: uppercase; color: #c9a892; font-weight: 600;">The Archival Suite</span>
        <div style="display: flex; align-items: center; gap: 12px;">
          <img src="${logoGold}" style="width: 38px; height: 38px; object-fit: contain;">
          <span class="serif" style="font-size: 13pt; letter-spacing: 0.15em; text-transform: uppercase; color: #ffffff;">Quills &amp; Ink Hub</span>
        </div>
      </div>

      <div style="display: flex; gap: 50px; align-items: center; z-index: 10;">
        <div style="flex: 1;">
          <div class="script gold" style="font-size: 48pt; line-height: 1; margin-bottom: 12px;">Generational Treasure</div>
          <h1 class="serif" style="font-size: 32pt; font-weight: 600; line-height: 1.25; margin-bottom: 20px; color: #ffffff;">
            Heirlooms for Children and Grandchildren Yet Unborn
          </h1>
          <p style="font-size: 12pt; color: #e8d5c4; font-weight: 300; line-height: 1.7; margin-bottom: 18px;">
            Our bespoke Archival Estate Suite preserves the complete funeral literature inside a museum-grade bookcloth box: the gilded hardcover tribute album, original handwritten condolences, and ceremonial ribbons.
          </p>
          <div style="display: inline-block; padding: 10px 22px; background: rgba(201,168,146,0.2); border: 1px solid #c9a892; border-radius: 30px; font-size: 10pt; color: #faf8f5;">
            Estate Preservation · Archival Bookcloth · Museum Standards
          </div>
        </div>
        <div style="flex: 1.1; height: 580px; border-radius: 4px; overflow: hidden; border: 1px solid #c9a892; box-shadow: 0 15px 40px rgba(0,0,0,0.4);">
          <img src="${imgBoxRibbon}" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(201,168,146,0.3); padding-top: 25px; z-index: 10;">
        <span style="font-size: 10pt; color: #8a7e72;">The Transatlantic Estate Suite</span>
        <span style="font-size: 10pt; color: #c9a892;">WhatsApp: +233 53 995 5615</span>
      </div>
    `
  }
];

// 4. Batch render the 9 new graphics
const tempPostHtmlPath = path.join(rootDir, 'scripts', 'temp', 'expansion-post-render.html');

for (let i = 0; i < newPosts.length; i++) {
  const p = newPosts[i];
  console.log(`[${i+1}/${newPosts.length}] Rendering: ${path.basename(p.dest)}...`);
  const fullHtml = wrapPostHtml(p.html, p.bg, p.text);
  fs.writeFileSync(tempPostHtmlPath, fullHtml);
  
  const flags = `--headless=new --disable-gpu --no-first-run --no-default-browser-check --window-size=1080,1080 --screenshot="${p.dest}" "file:///${tempPostHtmlPath.replace(/\\\\/g, '/')}"`;
  execSync(`"${chromePath}" ${flags}`);
}

console.log('All 9 new social media graphics rendered successfully!');
