import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const desktopPackDir = 'C:\\Users\\gokro\\Desktop\\Quills and Ink Hub - Client Pack';
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

console.log('Starting Batch Production of 19 Social Media Graphics & Copy Deck...');

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

// Asset data URIs
const logoPrimary = toBase64('public/images/brand/dove_logo_primary.png');
const logoGold = toBase64('public/images/brand/dove_logo_gold.png');
const logoWhite = toBase64('public/images/brand/dove_logo_white.png');

const mockupCover = toBase64('public/images/brand/brand_stationery_mockup.jpg');
const mockupOpen = toBase64('public/images/brand/keepsake_open_spread.jpg');
const mockupFlatlay = toBase64('public/images/brand/stationery_collection_flatlay.jpg');

const photoKente = toBase64('public/images/portfolio/nicholas-nii-adamma/01-casket-kente-tribute.jpg');
const photoChapel = toBase64('public/images/portfolio/nicholas-nii-adamma/02-all-souls-chapel-exterior.jpg');
const photoCongregation = toBase64('public/images/portfolio/nicholas-nii-adamma/03-chapel-sanctuary-congregation.jpg');
const photoElders = toBase64('public/images/portfolio/nicholas-nii-adamma/05-family-elders-procession.jpg');
const photoPortrait = toBase64('public/images/portfolio/william-dowridge-adu-asare/01-memorial-portrait-registry.jpg');
const photoInvitation = toBase64('public/images/portfolio/william-dowridge-adu-asare/02-funeral-invitation-arrangements.jpg');
const photoGarden = toBase64('public/images/portfolio/william-dowridge-adu-asare/03-garden-reception-arrival.jpg');
const photoDonation = toBase64('public/images/portfolio/william-dowridge-adu-asare/04-donation-registry-protocol.jpg');
const photoSpokesperson = toBase64('public/images/portfolio/william-dowridge-adu-asare/05-family-spokesperson-announcements.jpg');

// Common HTML wrapper generator
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

// Definition of all 19 posts
const posts = [
  // ==========================================
  // SERIES 1: BRAND TEASERS & ANTICIPATION
  // ==========================================
  {
    filename: 'Series_1_Brand_Teasers/Post_01_Something_Sacred_Is_Coming.png',
    bg: '#1a1612',
    text: '#faf8f5',
    html: `
      <div style="display: flex; justify-content: space-between; align-items: center; z-index: 10;">
        <div style="display: flex; align-items: center; gap: 14px;">
          <img src="${logoGold}" style="width: 44px; height: 44px; object-fit: contain;">
          <span class="serif" style="font-size: 14pt; letter-spacing: 0.18em; text-transform: uppercase; color: #c9a892; font-weight: 600;">Quills &amp; Ink Hub</span>
        </div>
        <span style="font-size: 10pt; letter-spacing: 0.2em; text-transform: uppercase; color: #8a7e72;">Accra · London</span>
      </div>

      <div style="text-align: center; max-width: 860px; margin: 0 auto; z-index: 10;">
        <div class="script gold" style="font-size: 58pt; margin-bottom: 20px; line-height: 1;">A quiet promise...</div>
        <h1 class="serif" style="font-size: 42pt; font-weight: 500; line-height: 1.25; color: #ffffff; letter-spacing: 0.02em; margin-bottom: 30px;">
          Every life carries a sacred weight.<br>
          <em style="color: #c9a892; font-weight: 400;">We are preparing to hold it with reverence.</em>
        </h1>
        <p style="font-size: 14pt; color: #e8d5c4; font-weight: 300; line-height: 1.7; max-width: 700px; margin: 0 auto;">
          A new standard in dignified funeral coordination and spoken literary care is preparing to arrive for Ghanaian families locally and across the diaspora.
        </p>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(201,168,146,0.3); padding-top: 25px; z-index: 10;">
        <span style="font-size: 10pt; letter-spacing: 0.25em; text-transform: uppercase; color: #c9a892;">Two Worlds · One Hub</span>
        <span style="font-size: 10pt; letter-spacing: 0.15em; color: #8a7e72;">quillsandinkhub.com</span>
      </div>
    `
  },
  {
    filename: 'Series_1_Brand_Teasers/Post_02_Where_Every_Story_Finds_Its_Space.png',
    bg: '#faf8f5',
    text: '#1a1612',
    html: `
      <div style="display: flex; justify-content: space-between; align-items: center; z-index: 10;">
        <span style="font-size: 10pt; letter-spacing: 0.25em; text-transform: uppercase; color: #c9a892; font-weight: 600;">The Arrival</span>
        <div style="display: flex; align-items: center; gap: 12px;">
          <img src="${logoPrimary}" style="width: 40px; height: 40px; object-fit: contain;">
          <span class="serif" style="font-size: 13pt; letter-spacing: 0.15em; text-transform: uppercase; font-weight: 600;">Quills &amp; Ink</span>
        </div>
      </div>

      <div style="display: flex; gap: 50px; align-items: center; z-index: 10;">
        <div style="flex: 1.1;">
          <div class="script gold" style="font-size: 52pt; margin-bottom: 12px; line-height: 1;">Remembrance</div>
          <h1 class="serif" style="font-size: 38pt; font-weight: 600; line-height: 1.2; margin-bottom: 24px; color: #1a1612;">
            Where Every Story Finds Its Space.
          </h1>
          <p style="font-size: 13pt; color: #5c4a38; font-weight: 300; line-height: 1.7; margin-bottom: 25px;">
            Between the logistics of ceremony and the tender search for the right words, we stand beside you. Thoughtful coordination. Poetic eulogies. Enduring heirlooms.
          </p>
          <div style="display: inline-block; padding: 10px 24px; background: rgba(201,168,146,0.2); border: 1px solid #c9a892; border-radius: 30px; font-size: 10pt; letter-spacing: 0.15em; text-transform: uppercase; font-weight: 600; color: #2c2416;">
            Coming Soon · 2026
          </div>
        </div>
        <div style="flex: 1; height: 500px; border-radius: 6px; overflow: hidden; border: 1px solid #e8d5c4; box-shadow: 0 15px 40px rgba(0,0,0,0.06);">
          <img src="${mockupCover}" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #e6e0d8; padding-top: 25px; z-index: 10;">
        <span style="font-size: 10pt; letter-spacing: 0.12em; color: #8a7e72;">Funeral Planning &amp; Literary Care</span>
        <span style="font-size: 10pt; letter-spacing: 0.15em; font-weight: 600; color: #1a1612;">Accra · UK · USA · Canada</span>
      </div>
    `
  },

  // ==========================================
  // SERIES 2: BRAND & SERVICES INTRODUCTION
  // ==========================================
  {
    filename: 'Series_2_Brand_Introduction/Post_03_Two_Worlds_One_Hub.png',
    bg: '#ffffff',
    text: '#1a1612',
    html: `
      <div style="text-align: center; z-index: 10;">
        <span style="font-size: 10pt; letter-spacing: 0.25em; text-transform: uppercase; color: #c9a892; font-weight: 600;">Core Proposition</span>
        <h1 class="serif" style="font-size: 34pt; font-weight: 600; margin-top: 6px; color: #1a1612;">Two Worlds. One Sacred Hub.</h1>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 35px; z-index: 10; margin: 20px 0;">
        <div style="background: #faf8f5; border: 1px solid #e8d5c4; padding: 40px 35px; border-radius: 6px; border-top: 4px solid #c9a892;">
          <div style="font-size: 11pt; letter-spacing: 0.15em; text-transform: uppercase; color: #c9a892; font-weight: 600;">World 01</div>
          <h2 class="serif" style="font-size: 24pt; font-weight: 600; margin: 10px 0 15px; color: #1a1612;">Event Coordination</h2>
          <ul style="list-style: none; font-size: 11pt; color: #5c4a38; line-height: 1.8;">
            <li>— Order of Service &amp; Liturgical Pacing</li>
            <li>— Church &amp; Chapel Coordination</li>
            <li>— Canopy, Reception &amp; Floral Artistry</li>
            <li>— Protocol for Dignitaries &amp; Elders</li>
            <li>— Virtual Live-Stream Participation</li>
          </ul>
        </div>

        <div style="background: #1a1612; color: #faf8f5; border: 1px solid #2c2416; padding: 40px 35px; border-radius: 6px; border-top: 4px solid #c9a892;">
          <div style="font-size: 11pt; letter-spacing: 0.15em; text-transform: uppercase; color: #c9a892; font-weight: 600;">World 02</div>
          <h2 class="serif" style="font-size: 24pt; font-weight: 600; margin: 10px 0 15px; color: #ffffff;">Literary &amp; Keepsake Print</h2>
          <ul style="list-style: none; font-size: 11pt; color: #e8d5c4; line-height: 1.8;">
            <li>— Intimate Family Eulogy Writing</li>
            <li>— Tributes for Children &amp; Fellowships</li>
            <li>— 28–36pg Velvet-Touch Brochures</li>
            <li>— Gold Foil Stamped Keepsakes</li>
            <li>— Diaspora Voice-Note Synthesis</li>
          </ul>
        </div>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #e6e0d8; padding-top: 25px; z-index: 10;">
        <span style="font-size: 10pt; color: #8a7e72;">WhatsApp Consultation: <strong>+233 53 995 5615</strong></span>
        <span class="serif" style="font-size: 13pt; font-weight: 600; letter-spacing: 0.1em; color: #1a1612;">Quills &amp; Ink Hub</span>
      </div>
    `
  },
  {
    filename: 'Series_2_Brand_Introduction/Post_04_Care_That_Listens.png',
    bg: '#1a1612',
    text: '#faf8f5',
    html: `
      <div style="position: absolute; inset: 0; opacity: 0.32; z-index: 1;">
        <img src="${photoChapel}" style="width: 100%; height: 100%; object-fit: cover;">
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; z-index: 10;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <img src="${logoGold}" style="width: 38px; height: 38px; object-fit: contain;">
          <span class="serif" style="font-size: 13pt; letter-spacing: 0.15em; text-transform: uppercase; color: #c9a892; font-weight: 600;">Quills and Ink</span>
        </div>
        <span style="font-size: 9.5pt; letter-spacing: 0.2em; text-transform: uppercase; color: #e8d5c4;">Our Guiding Ethos</span>
      </div>

      <div style="text-align: center; max-width: 820px; margin: 0 auto; z-index: 10;">
        <div class="script gold" style="font-size: 48pt; margin-bottom: 12px; line-height: 1;">A steady presence...</div>
        <h1 class="serif" style="font-size: 44pt; font-weight: 600; line-height: 1.2; color: #ffffff; margin-bottom: 25px;">
          “Care that listens before it plans.”
        </h1>
        <p style="font-size: 13.5pt; color: #e8d5c4; font-weight: 300; line-height: 1.75;">
          Families often need two things at once: someone who can calmly shoulder the weight of logistics, and someone who understands how to find the right words. We honor Ghanaian heritage while bringing quiet relief to every generation.
        </p>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(201,168,146,0.3); padding-top: 25px; z-index: 10;">
        <span style="font-size: 10pt; color: #c9a892; letter-spacing: 0.1em;">Listen · Craft · Coordinate · Preserve</span>
        <span style="font-size: 10pt; color: #8a7e72;">East Legon, Accra</span>
      </div>
    `
  },
  {
    filename: 'Series_2_Brand_Introduction/Post_05_The_Diaspora_Bridge.png',
    bg: '#faf8f5',
    text: '#1a1612',
    html: `
      <div style="display: flex; justify-content: space-between; align-items: center; z-index: 10;">
        <span style="font-size: 10pt; letter-spacing: 0.25em; text-transform: uppercase; color: #c9a892; font-weight: 600;">Global Coordination</span>
        <span class="serif" style="font-size: 13pt; letter-spacing: 0.15em; text-transform: uppercase; font-weight: 600;">Quills &amp; Ink Hub</span>
      </div>

      <div style="z-index: 10; margin: auto 0;">
        <div class="script gold" style="font-size: 42pt; line-height: 1; margin-bottom: 10px;">Across continents...</div>
        <h1 class="serif" style="font-size: 38pt; font-weight: 600; line-height: 1.2; color: #1a1612; margin-bottom: 24px;">
          The Diaspora Bridge: Distance should never compromise reverence.
        </h1>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-top: 30px;">
          <div style="background: #ffffff; border: 1px solid #e8d5c4; padding: 25px; border-radius: 4px;">
            <h3 class="serif" style="font-size: 16pt; color: #1a1612; font-weight: 600; margin-bottom: 8px;">Time-Zone Consultations</h3>
            <p style="font-size: 10.5pt; color: #5c4a38; line-height: 1.6;">Unhurried Zoom &amp; WhatsApp briefing calls scheduled across GMT, BST, EST, and PST time zones.</p>
          </div>
          <div style="background: #ffffff; border: 1px solid #e8d5c4; padding: 25px; border-radius: 4px;">
            <h3 class="serif" style="font-size: 16pt; color: #1a1612; font-weight: 600; margin-bottom: 8px;">Tribute Voice-Note Synthesis</h3>
            <p style="font-size: 10.5pt; color: #5c4a38; line-height: 1.6;">Collecting spoken thoughts and reflections from siblings abroad and editing them into cohesive keepsake literature.</p>
          </div>
        </div>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #e6e0d8; padding-top: 25px; z-index: 10;">
        <span style="font-size: 10pt; color: #8a7e72;">Serving Families in: <strong>Ghana · UK · USA · Canada · Europe</strong></span>
        <span style="font-size: 10pt; color: #c9a892; font-weight: 600;">hello@quillsandinkhub.com</span>
      </div>
    `
  },

  // ==========================================
  // SERIES 3: CASE STUDY 1 - NICHOLAS NII ADAMMA
  // ==========================================
  {
    filename: 'Series_3_Case_Study_Nicholas_Nii_Adamma/Slide_01_Cover_Nicholas_Nii_Adamma.png',
    bg: '#1a1612',
    text: '#faf8f5',
    html: `
      <div style="position: absolute; inset: 0; opacity: 0.42; z-index: 1;">
        <img src="${photoKente}" style="width: 100%; height: 100%; object-fit: cover;">
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; z-index: 10;">
        <span style="font-size: 10pt; letter-spacing: 0.25em; text-transform: uppercase; color: #c9a892; font-weight: 600;">Ceremonial Archive · Case Study</span>
        <span class="serif" style="font-size: 13pt; letter-spacing: 0.15em; text-transform: uppercase; color: #faf8f5;">Quills &amp; Ink Hub</span>
      </div>

      <div style="z-index: 10; margin-top: auto; margin-bottom: 40px;">
        <div class="script gold" style="font-size: 46pt; line-height: 1; margin-bottom: 10px;">Celebration of Life</div>
        <h1 class="serif" style="font-size: 44pt; font-weight: 600; line-height: 1.15; color: #ffffff; margin-bottom: 15px;">
          Nicholas Nii Adamma
        </h1>
        <p style="font-size: 14pt; color: #e8d5c4; font-weight: 300; max-width: 750px; line-height: 1.6;">
          All Souls’ Chapel, Lashibi Funeral Home · A complete coordination blending royal Ga heritage with solemn Christian thanksgiving rites.
        </p>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(201,168,146,0.4); padding-top: 25px; z-index: 10;">
        <span style="font-size: 10pt; color: #c9a892;">Slide 01 of 04 · Swipe to explore ceremony</span>
        <span style="font-size: 10pt; color: #8a7e72;">Ceremonial Portfolio Series</span>
      </div>
    `
  },
  {
    filename: 'Series_3_Case_Study_Nicholas_Nii_Adamma/Slide_02_Woven_Kente_Casket_Floral.png',
    bg: '#faf8f5',
    text: '#1a1612',
    html: `
      <div style="display: flex; justify-content: space-between; align-items: center; z-index: 10;">
        <span style="font-size: 10pt; letter-spacing: 0.25em; text-transform: uppercase; color: #c9a892; font-weight: 600;">Floral Artistry &amp; Drapery</span>
        <span style="font-size: 10pt; color: #8a7e72;">Case Study · Nicholas Nii Adamma</span>
      </div>

      <div style="display: flex; gap: 45px; align-items: center; z-index: 10;">
        <div style="flex: 1.1; height: 520px; border-radius: 4px; overflow: hidden; border: 1px solid #e6e0d8;">
          <img src="${photoKente}" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
        <div style="flex: 1;">
          <div class="script gold" style="font-size: 42pt; line-height: 1; margin-bottom: 12px;">Cultural Royalty</div>
          <h2 class="serif" style="font-size: 28pt; font-weight: 600; line-height: 1.25; margin-bottom: 20px; color: #1a1612;">
            Woven Kente &amp; Pristine Altar Florals
          </h2>
          <p style="font-size: 12pt; color: #5c4a38; line-height: 1.7; margin-bottom: 20px;">
            The casket was draped in authentic ceremonial Ghanaian Kente, crowned with an asymmetrical wreath of white lilies, ivory roses, and lush tropical monstera foliage.
          </p>
          <div style="font-size: 10pt; color: #8a7e72; font-style: italic; border-left: 2px solid #c9a892; padding-left: 14px;">
            “Honoring an elder means allowing their dignity to be felt before a single word is read.”
          </div>
        </div>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #e6e0d8; padding-top: 25px; z-index: 10;">
        <span style="font-size: 10pt; color: #8a7e72;">Slide 02 of 04</span>
        <span class="serif" style="font-size: 12pt; letter-spacing: 0.1em; color: #1a1612;">Quills &amp; Ink Hub</span>
      </div>
    `
  },
  {
    filename: 'Series_3_Case_Study_Nicholas_Nii_Adamma/Slide_03_All_Souls_Chapel_Service.png',
    bg: '#faf8f5',
    text: '#1a1612',
    html: `
      <div style="display: flex; justify-content: space-between; align-items: center; z-index: 10;">
        <span style="font-size: 10pt; letter-spacing: 0.25em; text-transform: uppercase; color: #c9a892; font-weight: 600;">Sanctuary Gathering</span>
        <span style="font-size: 10pt; color: #8a7e72;">Case Study · Nicholas Nii Adamma</span>
      </div>

      <div style="display: flex; gap: 45px; align-items: center; z-index: 10;">
        <div style="flex: 1;">
          <div class="script gold" style="font-size: 42pt; line-height: 1; margin-bottom: 12px;">Order &amp; Grace</div>
          <h2 class="serif" style="font-size: 28pt; font-weight: 600; line-height: 1.25; margin-bottom: 20px; color: #1a1612;">
            Sanctuary Pacing &amp; Clergy Coordination
          </h2>
          <p style="font-size: 12pt; color: #5c4a38; line-height: 1.7; margin-bottom: 20px;">
            Over 400 family members and dignitaries gathered in traditional ceremonial white funeral attire. Our team coordinated seating flow, order of worship liturgy, and seamless hymn transitions with officiating pastors.
          </p>
          <div style="background: #ffffff; border: 1px solid #e8d5c4; padding: 18px 22px; border-radius: 4px; font-size: 10pt; color: #2c2416;">
            <strong>Lashibi All Souls’ Chapel:</strong> Managed procession, clergy liaison, and family tribute readings without unhurried delays.
          </div>
        </div>
        <div style="flex: 1.1; height: 520px; border-radius: 4px; overflow: hidden; border: 1px solid #e6e0d8;">
          <img src="${photoCongregation}" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #e6e0d8; padding-top: 25px; z-index: 10;">
        <span style="font-size: 10pt; color: #8a7e72;">Slide 03 of 04</span>
        <span class="serif" style="font-size: 12pt; letter-spacing: 0.1em; color: #1a1612;">Quills &amp; Ink Hub</span>
      </div>
    `
  },
  {
    filename: 'Series_3_Case_Study_Nicholas_Nii_Adamma/Slide_04_Honouring_Elders_and_Lineage.png',
    bg: '#1a1612',
    text: '#faf8f5',
    html: `
      <div style="display: flex; justify-content: space-between; align-items: center; z-index: 10;">
        <span style="font-size: 10pt; letter-spacing: 0.25em; text-transform: uppercase; color: #c9a892; font-weight: 600;">Family Protocol</span>
        <span class="serif" style="font-size: 13pt; letter-spacing: 0.15em; text-transform: uppercase; color: #c9a892;">Quills &amp; Ink</span>
      </div>

      <div style="display: flex; gap: 45px; align-items: center; z-index: 10;">
        <div style="flex: 1.1; height: 520px; border-radius: 4px; overflow: hidden; border: 1px solid #2c2416;">
          <img src="${photoElders}" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
        <div style="flex: 1;">
          <div class="script gold" style="font-size: 42pt; line-height: 1; margin-bottom: 12px;">Ancestral Legacy</div>
          <h2 class="serif" style="font-size: 28pt; font-weight: 600; line-height: 1.25; margin-bottom: 20px; color: #ffffff;">
            Family Elders in Solemn Remembrance
          </h2>
          <p style="font-size: 12pt; color: #e8d5c4; line-height: 1.7; margin-bottom: 25px; font-weight: 300;">
            The Adamma and Darko family heads seated in reverence. When planning a Ghanaian farewell, the guidance and comfort of elders is the bedrock of cultural authenticity.
          </p>
          <div style="display: inline-block; padding: 12px 26px; background: rgba(201,168,146,0.15); border: 1px solid #c9a892; border-radius: 30px; font-size: 10pt; color: #faf8f5;">
            Book an Initial Family Consultation
          </div>
        </div>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(201,168,146,0.3); padding-top: 25px; z-index: 10;">
        <span style="font-size: 10pt; color: #8a7e72;">Slide 04 of 04 · Complete Case Study</span>
        <span style="font-size: 10pt; color: #c9a892;">quillsandinkhub.com</span>
      </div>
    `
  },

  // ==========================================
  // SERIES 4: CASE STUDY 2 - GHANAIAN FUNERAL HERITAGE
  // ==========================================
  {
    filename: 'Series_4_Case_Study_Ghanaian_Funeral_Heritage/Slide_01_Cover_The_Language_of_Mourning_Cloth.png',
    bg: '#faf8f5',
    text: '#1a1612',
    html: `
      <div style="display: flex; justify-content: space-between; align-items: center; z-index: 10;">
        <span style="font-size: 10pt; letter-spacing: 0.25em; text-transform: uppercase; color: #c9a892; font-weight: 600;">Ghanaian Funeral Heritage</span>
        <span class="serif" style="font-size: 13pt; letter-spacing: 0.15em; text-transform: uppercase; font-weight: 600;">Quills &amp; Ink Hub</span>
      </div>

      <div style="text-align: center; max-width: 820px; margin: auto auto; z-index: 10;">
        <div class="script gold" style="font-size: 50pt; margin-bottom: 12px; line-height: 1;">Cultural Wisdom</div>
        <h1 class="serif" style="font-size: 46pt; font-weight: 600; line-height: 1.15; color: #1a1612; margin-bottom: 25px;">
          The Silent Language of Mourning Cloth.
        </h1>
        <p style="font-size: 14pt; color: #5c4a38; font-weight: 300; line-height: 1.7; max-width: 680px; margin: 0 auto;">
          In Ghanaian funerals, fabrics speak before lips part. Discover the profound emotional meanings behind Kuntunkuni, Kobene, and Ceremonial White.
        </p>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #e6e0d8; padding-top: 25px; z-index: 10;">
        <span style="font-size: 10pt; color: #c9a892; font-weight: 600;">Slide 01 of 04 · Swipe to decode cloth colors</span>
        <span style="font-size: 10pt; color: #8a7e72;">Educational Heritage Series</span>
      </div>
    `
  },
  {
    filename: 'Series_4_Case_Study_Ghanaian_Funeral_Heritage/Slide_02_Kuntunkuni_The_Dark_Cloth_of_Sorrow.png',
    bg: '#1a1612',
    text: '#faf8f5',
    html: `
      <div style="display: flex; justify-content: space-between; align-items: center; z-index: 10;">
        <span style="font-size: 10pt; letter-spacing: 0.2em; text-transform: uppercase; color: #c9a892;">Fabric Symbolism · 01</span>
        <span style="font-size: 10pt; color: #8a7e72;">Ghanaian Heritage Series</span>
      </div>

      <div style="max-width: 780px; margin: auto 0; z-index: 10;">
        <div style="display: inline-block; padding: 6px 18px; background: rgba(201,168,146,0.2); border: 1px solid #c9a892; border-radius: 20px; font-size: 9.5pt; text-transform: uppercase; letter-spacing: 0.15em; color: #c9a892; margin-bottom: 20px;">
          Deep Brown &amp; Charcoal Black
        </div>
        <h1 class="serif" style="font-size: 42pt; font-weight: 600; line-height: 1.15; color: #ffffff; margin-bottom: 20px;">
          Kuntunkuni:<br>The Dark Cloth of Sorrow
        </h1>
        <p style="font-size: 14pt; color: #e8d5c4; font-weight: 300; line-height: 1.75; margin-bottom: 25px;">
          Dyed with natural tree bark extract into deep earthy brown and dark tones, <em>Kuntunkuni</em> is worn during initial burial rites. It signifies solemn mourning, quiet meditation, and the heavy sorrow of departure felt by immediate family heads.
        </p>
        <div style="font-size: 11pt; color: #c9a892; font-style: italic;">
          Traditional Context: Worn during the wake-keeping and Saturday morning burial rites.
        </div>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(201,168,146,0.3); padding-top: 25px; z-index: 10;">
        <span style="font-size: 10pt; color: #8a7e72;">Slide 02 of 04</span>
        <span class="serif" style="font-size: 12pt; letter-spacing: 0.1em; color: #ffffff;">Quills &amp; Ink Hub</span>
      </div>
    `
  },
  {
    filename: 'Series_4_Case_Study_Ghanaian_Funeral_Heritage/Slide_03_Kobene_Red_Cloth_of_Heartbreak.png',
    bg: '#2c1616',
    text: '#faf8f5',
    html: `
      <div style="display: flex; justify-content: space-between; align-items: center; z-index: 10;">
        <span style="font-size: 10pt; letter-spacing: 0.2em; text-transform: uppercase; color: #e8a8a8;">Fabric Symbolism · 02</span>
        <span style="font-size: 10pt; color: #8a7e72;">Ghanaian Heritage Series</span>
      </div>

      <div style="max-width: 780px; margin: auto 0; z-index: 10;">
        <div style="display: inline-block; padding: 6px 18px; background: rgba(220,100,100,0.25); border: 1px solid #d46b6b; border-radius: 20px; font-size: 9.5pt; text-transform: uppercase; letter-spacing: 0.15em; color: #ffb8b8; margin-bottom: 20px;">
          Fiery Vermilion &amp; Crimson Red
        </div>
        <h1 class="serif" style="font-size: 42pt; font-weight: 600; line-height: 1.15; color: #ffffff; margin-bottom: 20px;">
          Kobene:<br>The Red Cloth of Heartbreak
        </h1>
        <p style="font-size: 14pt; color: #e8d5c4; font-weight: 300; line-height: 1.75; margin-bottom: 25px;">
          Bright, stark crimson red is reserved for the closest blood relatives—children, spouses, and parents—particularly when a loss is sudden or an untimely passing occurs. <em>Kobene</em> symbolizes eyes that have wept tears of blood and profound agony.
        </p>
        <div style="font-size: 11pt; color: #ffb8b8; font-style: italic;">
          Traditional Context: Reserved exclusively for immediate lineage carrying the deepest grief.
        </div>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(220,100,100,0.3); padding-top: 25px; z-index: 10;">
        <span style="font-size: 10pt; color: #8a7e72;">Slide 03 of 04</span>
        <span class="serif" style="font-size: 12pt; letter-spacing: 0.1em; color: #ffffff;">Quills &amp; Ink Hub</span>
      </div>
    `
  },
  {
    filename: 'Series_4_Case_Study_Ghanaian_Funeral_Heritage/Slide_04_Ceremonial_White_Thanksgiving_and_Victory.png',
    bg: '#ffffff',
    text: '#1a1612',
    html: `
      <div style="display: flex; justify-content: space-between; align-items: center; z-index: 10;">
        <span style="font-size: 10pt; letter-spacing: 0.2em; text-transform: uppercase; color: #c9a892; font-weight: 600;">Fabric Symbolism · 03</span>
        <span style="font-size: 10pt; color: #8a7e72;">Ghanaian Heritage Series</span>
      </div>

      <div style="max-width: 820px; margin: auto 0; z-index: 10;">
        <div style="display: inline-block; padding: 6px 18px; background: rgba(201,168,146,0.2); border: 1px solid #c9a892; border-radius: 20px; font-size: 9.5pt; text-transform: uppercase; letter-spacing: 0.15em; color: #3d3226; margin-bottom: 20px;">
          Pristine White Brocade &amp; Kente
        </div>
        <h1 class="serif" style="font-size: 42pt; font-weight: 600; line-height: 1.15; color: #1a1612; margin-bottom: 20px;">
          Ceremonial White:<br>Victory, Gratitude &amp; Peace
        </h1>
        <p style="font-size: 14pt; color: #5c4a38; font-weight: 300; line-height: 1.75; margin-bottom: 25px;">
          Worn on Sunday morning memorial thanksgiving, white proclaims that death has not triumphed. When an elder reaches 70, 80, or 90 years, white reflects a full life, ancestral blessings, and joyful celebration.
        </p>
        <div style="background: #faf8f5; border-left: 3px solid #c9a892; padding: 15px 20px; font-size: 11pt; color: #2c2416;">
          At Quills and Ink Hub, we harmonize brochure covers, floral wreaths, and sanctuary drapery to reflect the precise phase of ceremonial colors.
        </div>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #e6e0d8; padding-top: 25px; z-index: 10;">
        <span style="font-size: 10pt; color: #8a7e72;">Slide 04 of 04 · Complete Heritage Guide</span>
        <span class="serif" style="font-size: 12pt; letter-spacing: 0.1em; color: #1a1612;">quillsandinkhub.com</span>
      </div>
    `
  },

  // ==========================================
  // SERIES 5: FUNERAL TRIVIA & WISDOM
  // ==========================================
  {
    filename: 'Series_5_Funeral_Trivia_and_Wisdom/Post_06_Trivia_The_Origins_of_Memorial_Brochures.png',
    bg: '#faf8f5',
    text: '#1a1612',
    html: `
      <div style="display: flex; justify-content: space-between; align-items: center; z-index: 10;">
        <span style="font-size: 10pt; letter-spacing: 0.25em; text-transform: uppercase; color: #c9a892; font-weight: 600;">Funeral Trivia · Did You Know?</span>
        <span class="serif" style="font-size: 13pt; letter-spacing: 0.15em; text-transform: uppercase; font-weight: 600;">Quills &amp; Ink</span>
      </div>

      <div style="display: flex; gap: 45px; align-items: center; z-index: 10;">
        <div style="flex: 1.1; height: 500px; border-radius: 4px; overflow: hidden; border: 1px solid #e8d5c4; box-shadow: 0 10px 30px rgba(0,0,0,0.05);">
          <img src="${mockupOpen}" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
        <div style="flex: 1;">
          <h2 class="serif" style="font-size: 26pt; font-weight: 600; line-height: 1.25; margin-bottom: 18px; color: #1a1612;">
            Why Ghanaian Memorial Brochures Are 30+ Pages Long
          </h2>
          <p style="font-size: 11.5pt; color: #5c4a38; line-height: 1.7; margin-bottom: 20px;">
            What began in the early 20th century as a modest one-sheet hymn program has evolved in Ghana into an archival heirloom book.
          </p>
          <p style="font-size: 11.5pt; color: #5c4a38; line-height: 1.7;">
            Because Ghanaian families extend across continents, the brochure serves as an authoritative historical document—recording matrilineal ancestry, children’s reflections from overseas, and full-color photo archives kept in family homes for decades.
          </p>
        </div>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #e6e0d8; padding-top: 25px; z-index: 10;">
        <span style="font-size: 10pt; color: #8a7e72;">Editorial Heirlooms · Soft-Touch &amp; Gold Foil</span>
        <span style="font-size: 10pt; color: #c9a892; font-weight: 600;">Quills &amp; Ink Keepsakes</span>
      </div>
    `
  },
  {
    filename: 'Series_5_Funeral_Trivia_and_Wisdom/Post_07_Trivia_The_Voice_of_The_Okyeame.png',
    bg: '#faf8f5',
    text: '#1a1612',
    html: `
      <div style="display: flex; justify-content: space-between; align-items: center; z-index: 10;">
        <span style="font-size: 10pt; letter-spacing: 0.25em; text-transform: uppercase; color: #c9a892; font-weight: 600;">Ceremonial Protocol</span>
        <span class="serif" style="font-size: 13pt; letter-spacing: 0.15em; text-transform: uppercase; font-weight: 600;">Quills &amp; Ink Hub</span>
      </div>

      <div style="display: flex; gap: 45px; align-items: center; z-index: 10;">
        <div style="flex: 1;">
          <div class="script gold" style="font-size: 38pt; line-height: 1; margin-bottom: 10px;">The Eloquent Voice</div>
          <h2 class="serif" style="font-size: 26pt; font-weight: 600; line-height: 1.25; margin-bottom: 18px; color: #1a1612;">
            The Sacred Role of the Okyeame (Family Spokesperson)
          </h2>
          <p style="font-size: 11.5pt; color: #5c4a38; line-height: 1.7; margin-bottom: 18px;">
            In traditional Akan and Ghanaian gatherings, grief is never blurted out hastily. An appointed family spokesperson or linguist filters emotions through proverbs and measured speech.
          </p>
          <div style="background: #ffffff; border-left: 3px solid #c9a892; padding: 15px; font-size: 10.5pt; color: #2c2416; line-height: 1.6;">
            We work directly beside family elders to script their announcements, votes of thanks, and committal itineraries with dignity and poise.
          </div>
        </div>
        <div style="flex: 1.1; height: 500px; border-radius: 4px; overflow: hidden; border: 1px solid #e6e0d8;">
          <img src="${photoSpokesperson}" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #e6e0d8; padding-top: 25px; z-index: 10;">
        <span style="font-size: 10pt; color: #8a7e72;">Protocol Management &amp; Secretariat</span>
        <span style="font-size: 10pt; color: #1a1612; font-weight: 600;">William Dowridge Adu-Asare Memorial</span>
      </div>
    `
  },
  {
    filename: 'Series_5_Funeral_Trivia_and_Wisdom/Post_08_Trivia_Nsawa_The_Sacred_Donation_Rite.png',
    bg: '#faf8f5',
    text: '#1a1612',
    html: `
      <div style="display: flex; justify-content: space-between; align-items: center; z-index: 10;">
        <span style="font-size: 10pt; letter-spacing: 0.25em; text-transform: uppercase; color: #c9a892; font-weight: 600;">Communal Solidarity</span>
        <span class="serif" style="font-size: 13pt; letter-spacing: 0.15em; text-transform: uppercase; font-weight: 600;">Quills &amp; Ink</span>
      </div>

      <div style="display: flex; gap: 45px; align-items: center; z-index: 10;">
        <div style="flex: 1.1; height: 500px; border-radius: 4px; overflow: hidden; border: 1px solid #e6e0d8;">
          <img src="${photoDonation}" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
        <div style="flex: 1;">
          <div class="script gold" style="font-size: 38pt; line-height: 1; margin-bottom: 10px;">Burden Sharing</div>
          <h2 class="serif" style="font-size: 26pt; font-weight: 600; line-height: 1.25; margin-bottom: 18px; color: #1a1612;">
            Nsawa: The Ancient Ghanaian Contract of Mutual Care
          </h2>
          <p style="font-size: 11.5pt; color: #5c4a38; line-height: 1.7; margin-bottom: 18px;">
            The funeral donation desk is not a commercial exercise—it is <em>Nsawa</em>, an ancestral social insurance policy. Friends, colleagues, and distant relatives step forward to publicly record donations, signifying that no bereaved family walks through sorrow alone.
          </p>
          <p style="font-size: 10.5pt; color: #8a7e72; line-height: 1.6;">
            Quills &amp; Ink Hub coordinates professional donation logging desks with serialized receipting, condolence registries, and cashless diaspora transfers.
          </p>
        </div>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #e6e0d8; padding-top: 25px; z-index: 10;">
        <span style="font-size: 10pt; color: #8a7e72;">Professional Protocol &amp; Secretariat Desk</span>
        <span style="font-size: 10pt; color: #c9a892; font-weight: 600;">quillsandinkhub.com</span>
      </div>
    `
  },

  // ==========================================
  // SERIES 6: GLOBAL & CROSS-CULTURAL FUNERAL CUSTOMS
  // ==========================================
  {
    filename: 'Series_6_Cross_Cultural_Customs/Post_09_Customs_The_Celebration_of_Life_Ghana.png',
    bg: '#1a1612',
    text: '#faf8f5',
    html: `
      <div style="display: flex; justify-content: space-between; align-items: center; z-index: 10;">
        <span style="font-size: 10pt; letter-spacing: 0.25em; text-transform: uppercase; color: #c9a892; font-weight: 600;">Global Traditions · Ghana</span>
        <span class="serif" style="font-size: 13pt; letter-spacing: 0.15em; text-transform: uppercase; color: #ffffff;">Quills &amp; Ink Hub</span>
      </div>

      <div style="max-width: 820px; margin: auto 0; z-index: 10;">
        <div class="script gold" style="font-size: 46pt; line-height: 1; margin-bottom: 12px;">West African Rites</div>
        <h1 class="serif" style="font-size: 40pt; font-weight: 600; line-height: 1.2; color: #ffffff; margin-bottom: 22px;">
          When Mourning Becomes A Royal Homegoing
        </h1>
        <p style="font-size: 13.5pt; color: #e8d5c4; font-weight: 300; line-height: 1.75; margin-bottom: 25px;">
          In Ghana, when an elder passes after seven or eight decades of life, sorrow yields to triumphant celebration. Families don woven white cloths, live brass and highlife bands play, and generations dance in thanksgiving. Death does not extinguish the bond—it welcomes a new ancestor into eternal vigilance.
        </p>
        <div style="display: inline-block; padding: 10px 24px; background: rgba(201,168,146,0.2); border: 1px solid #c9a892; border-radius: 30px; font-size: 10pt; color: #faf8f5;">
          Celebration of Life Protocol &amp; Logistics
        </div>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(201,168,146,0.3); padding-top: 25px; z-index: 10;">
        <span style="font-size: 10pt; color: #8a7e72;">Part 01 of 03 · Cross-Cultural Remembrance</span>
        <span style="font-size: 10pt; color: #c9a892;">quillsandinkhub.com</span>
      </div>
    `
  },
  {
    filename: 'Series_6_Cross_Cultural_Customs/Post_10_Customs_The_Irish_Keening_and_Wake.png',
    bg: '#faf8f5',
    text: '#1a1612',
    html: `
      <div style="display: flex; justify-content: space-between; align-items: center; z-index: 10;">
        <span style="font-size: 10pt; letter-spacing: 0.25em; text-transform: uppercase; color: #c9a892; font-weight: 600;">Global Traditions · Ireland</span>
        <span class="serif" style="font-size: 13pt; letter-spacing: 0.15em; text-transform: uppercase; font-weight: 600;">Quills &amp; Ink Hub</span>
      </div>

      <div style="max-width: 820px; margin: auto 0; z-index: 10;">
        <div class="script gold" style="font-size: 46pt; line-height: 1; margin-bottom: 12px;">Celtic Heritage</div>
        <h1 class="serif" style="font-size: 40pt; font-weight: 600; line-height: 1.2; color: #1a1612; margin-bottom: 22px;">
          The Irish Wake: Unhurried Storytelling by Night
        </h1>
        <p style="font-size: 13.5pt; color: #5c4a38; font-weight: 300; line-height: 1.75; margin-bottom: 25px;">
          Long before burial, Irish families gather in the home throughout the night for the traditional wake. Neighbours arrive with food, candles are lit, and poetic laments (<em>caoineadh</em> or keening) are sung. Like Ghanaian night vigils, Celtic wakes remind us that grief is softened when surrounded by community and shared memory.
        </p>
        <div style="background: #ffffff; border-left: 3px solid #c9a892; padding: 16px 22px; font-size: 11pt; color: #2c2416;">
          “A story spoken in love keeps the flame of the departed warm across the centuries.”
        </div>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #e6e0d8; padding-top: 25px; z-index: 10;">
        <span style="font-size: 10pt; color: #8a7e72;">Part 02 of 03 · Cross-Cultural Remembrance</span>
        <span style="font-size: 10pt; color: #c9a892; font-weight: 600;">quillsandinkhub.com</span>
      </div>
    `
  },
  {
    filename: 'Series_6_Cross_Cultural_Customs/Post_11_Customs_New_Orleans_Jazz_Funeral_Procession.png',
    bg: '#1a1612',
    text: '#faf8f5',
    html: `
      <div style="display: flex; justify-content: space-between; align-items: center; z-index: 10;">
        <span style="font-size: 10pt; letter-spacing: 0.25em; text-transform: uppercase; color: #c9a892; font-weight: 600;">Global Traditions · New Orleans</span>
        <span class="serif" style="font-size: 13pt; letter-spacing: 0.15em; text-transform: uppercase; color: #ffffff;">Quills &amp; Ink Hub</span>
      </div>

      <div style="max-width: 820px; margin: auto 0; z-index: 10;">
        <div class="script gold" style="font-size: 46pt; line-height: 1; margin-bottom: 12px;">African Diaspora Rhythms</div>
        <h1 class="serif" style="font-size: 40pt; font-weight: 600; line-height: 1.2; color: #ffffff; margin-bottom: 22px;">
          From Dirge to Dance: The New Orleans Jazz Funeral
        </h1>
        <p style="font-size: 13.5pt; color: #e8d5c4; font-weight: 300; line-height: 1.75; margin-bottom: 25px;">
          Born from West African Yoruba and Dahomey spiritual traditions fused with French brass bands, the New Orleans jazz funeral marches with a solemn hymn to the cemetery. Once the body is interred, the snare drums roll into a joyful 'Second Line'—rejoicing that a weary soul has finally returned home to rest.
        </p>
        <div style="background: rgba(201,168,146,0.15); border-left: 3px solid #c9a892; padding: 16px 22px; font-size: 11pt; color: #faf8f5;">
          Different continents, one shared truth: farewell gatherings exist not merely to bury the body, but to elevate the enduring spirit.
        </div>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(201,168,146,0.3); padding-top: 25px; z-index: 10;">
        <span style="font-size: 10pt; color: #8a7e72;">Part 03 of 03 · Cross-Cultural Remembrance</span>
        <span style="font-size: 10pt; color: #c9a892;">quillsandinkhub.com</span>
      </div>
    `
  }
];

// 3. Batch render each post using headless Chrome
const tempPostHtmlPath = path.join(rootDir, 'scripts', 'temp', 'social-post-render.html');

for (let i = 0; i < posts.length; i++) {
  const p = posts[i];
  const fullDest = path.join(desktopPackDir, '06_Social_Media_Launch_Pack', p.filename);
  console.log(`[${i+1}/${posts.length}] Rendering: ${p.filename}...`);
  
  const fullHtml = wrapPostHtml(p.html, p.bg, p.text);
  fs.writeFileSync(tempPostHtmlPath, fullHtml);
  
  const flags = `--headless=new --disable-gpu --no-first-run --no-default-browser-check --window-size=1080,1080 --screenshot="${fullDest}" "file:///${tempPostHtmlPath.replace(/\\\\/g, '/')}"`;
  execSync(`"${chromePath}" ${flags}`);
}

console.log('All 19 high-resolution social media graphics rendered successfully!');

// 4. Generate the complete Social Media Copy Deck & Captions Markdown file
const copyDeckMarkdown = `# Quills & Ink Hub · Social Media Copy Deck & Editorial Caption Guide
**Version:** 1.0 (Official Client Pack)  
**Target Channels:** Instagram Feed, LinkedIn, Facebook, WhatsApp Status  
**Visual Brand Guidelines:** Quills & Ink Hub Executive Brand Guide 2026  

---

## Content Strategy & Voice Overview
- **Tone:** Steady, unhurried, deeply reverent, literary, culturally attuned.
- **Visual Style:** 1080x1080px high-resolution editorial graphics using Obsidian Ink (#1A1612), Linen Ivory (#FAF8F5), Warm Gold (#C9A892), and authentic ceremony photography.
- **Hashtag Bank:** \`#QuillsAndInkHub #GhanaianHeritage #Remembrance #CelebrationOfLife #FuneralPlanningAccra #MemorialBrochures #DiasporaCare #AccraEvents #MemorialKeepsake\`

---

## Series 1: Brand Teasers & Launch Anticipation

### Post 01: Something Sacred Is Being Written
- **Graphic:** \`Series_1_Brand_Teasers/Post_01_Something_Sacred_Is_Coming.png\`
- **Type:** Single Post (Teaser)
- **Suggested Schedule:** Week 1 · Monday 10:00 AM
- **Hook:** Every life carries a sacred weight.
- **Caption:**
  > In the quiet hours when a family gathers to remember, words matter. The way a church is entered matters. The dignity with which a life is chronicled matters.
  >
  > For too long, families have had to navigate stressful logistics on one side and scramble for written tributes on the other. 
  >
  > Something new is taking shape. A home where funeral event coordination and high literary craft meet under one roof.
  >
  > For families in Ghana and across the global diaspora: peace of mind is on the horizon.
  >
  > 🕊️ Launching soon.
- **Hashtags:** \`#QuillsAndInkHub #Remembrance #CareThatListens #GhanaianFunerals #DignityInFarewells #Accra\`

---

### Post 02: Where Every Story Finds Its Space
- **Graphic:** \`Series_1_Brand_Teasers/Post_02_Where_Every_Story_Finds_Its_Space.png\`
- **Type:** Single Post (Manifesto Teaser)
- **Suggested Schedule:** Week 1 · Thursday 4:00 PM
- **Hook:** Where every story finds its space.
- **Caption:**
  > Every person who walked this earth left footprints of kindness, sacrifice, and character that deserve to be held with care.
  >
  > At Quills & Ink Hub, we believe memorial planning shouldn't feel rushed or overwhelming. It should feel like stepping into a sanctuary of calm order.
  >
  > From heirloom soft-touch keepsake brochures stamped in gold foil to dignified chapel and garden coordination—we bring order to logistics and poetry to memory.
  >
  > Follow our journey as we prepare to welcome families across Accra, London, New York, and Toronto.
- **Hashtags:** \`#WhereEveryStoryFindsItsSpace #QuillsAndInkHub #CelebrationOfLife #MemorialKeepsakes #GhanaianDiaspora\`

---

## Series 2: Brand & Services Introduction

### Post 03: Two Worlds. One Sacred Hub.
- **Graphic:** \`Series_2_Brand_Introduction/Post_03_Two_Worlds_One_Hub.png\`
- **Type:** Core Proposition Post
- **Suggested Schedule:** Week 2 · Tuesday 11:00 AM
- **Hook:** Why choose between event coordination and tribute writing?
- **Caption:**
  > When a loved one passes, families are immediately faced with two distinct demands:
  >
  > 1️⃣ The Physical Logistics: Church venues, clergy protocol, seating layouts, floral wreaths, catering, canopies, and reception coordination.
  >
  > 2️⃣ The Literary Legacy: Finding the right words for spoken eulogies, coordinating sibling tributes across three continents, selecting hymns, and designing a keepsake brochure that honors their name.
  >
  > Quills and Ink Hub brings both worlds together under one seamless coordination team. One phone call, one listening ear, and complete peace of mind.
  >
  > 📞 Reach our desk daily on WhatsApp: +233 53 995 5615.
- **Hashtags:** \`#TwoWorldsOneHub #FuneralPlanningAccra #EventCoordination #EulogyWriting #QuillsAndInkHub\`

---

### Post 04: Care That Listens Before It Plans
- **Graphic:** \`Series_2_Brand_Introduction/Post_04_Care_That_Listens.png\`
- **Type:** Philosophy & Ethos Post
- **Suggested Schedule:** Week 2 · Friday 1:00 PM
- **Hook:** Care that listens before it plans.
- **Caption:**
  > Before we draft an order of service, we listen. Before we recommend a venue or floral palette, we want to know what made your Papa laugh, what scriptures anchored your Mama, and what traditions your family holds sacred.
  >
  > In a season of grief, advice shouldn’t feel like a sales pitch. It should feel like unhurried counsel.
  >
  > Learn how we work with families across Ghana, the UK, the US, and Canada at quillsandinkhub.com.
- **Hashtags:** \`#CareThatListens #CompassionatePlanning #GhanaianHeritage #AccraFuneralPlanners #Remembrance\`

---

### Post 05: The Diaspora Bridge: Connecting Across Continents
- **Graphic:** \`Series_2_Brand_Introduction/Post_05_The_Diaspora_Bridge.png\`
- **Type:** Diaspora Service Spotlight
- **Suggested Schedule:** Week 3 · Wednesday 3:00 PM
- **Hook:** Distance should never compromise reverence.
- **Caption:**
  > Living in London, Washington, or Toronto while coordinating funeral rites in Accra can feel intensely stressful. Time-zone barriers, miscommunication, and anxiety about on-the-ground execution often weigh heavily on diaspora families.
  >
  > Our Diaspora Concierge was built specifically for this:
  > • Scheduled Zoom & WhatsApp consultations tailored to your local time zone (GMT, BST, EST, PST)
  > • Synthesis of family tributes recorded as voice notes from relatives overseas
  > • Video updates of venue, seating, and floral preparations in Accra
  > • High-quality live-streaming coordination for guests who cannot travel
  >
  > We keep every family member aligned, honored, and close to heart.
- **Hashtags:** \`#DiasporaCare #GhanaianDiaspora #AccraToLondon #DiasporaFunerals #QuillsAndInkHub\`

---

## Series 3: Case Study Carousel 1 · The Nicholas Nii Adamma Memorial

### Carousel Slide Deck (4 Slides)
- **Slide 01:** \`Series_3_Case_Study_Nicholas_Nii_Adamma/Slide_01_Cover_Nicholas_Nii_Adamma.png\`
- **Slide 02:** \`Series_3_Case_Study_Nicholas_Nii_Adamma/Slide_02_Woven_Kente_Casket_Floral.png\`
- **Slide 03:** \`Series_3_Case_Study_Nicholas_Nii_Adamma/Slide_03_All_Souls_Chapel_Service.png\`
- **Slide 04:** \`Series_3_Case_Study_Nicholas_Nii_Adamma/Slide_04_Honouring_Elders_and_Lineage.png\`
- **Suggested Schedule:** Week 4 · Sunday 12:00 PM
- **Hook:** In the sanctuary of All Souls’ Chapel: A celebration of life and heritage.
- **Caption:**
  > [SWIPE TO EXPLORE ➡️]
  >
  > A life of faith and dignity leaves an imprint that time cannot fade.
  >
  > For the late Nicholas Nii Adamma, Quills and Ink Hub had the solemn honor of coordinating the thanksgiving rites at All Souls’ Chapel, Lashibi Funeral Home.
  >
  > 🕊️ Slide 1: The ceremonial presence of royal Ga heritage.
  > 🌸 Slide 2: The casket draped in authentic woven Kente cloth, crowned with an asymmetrical wreath of monstera foliage, white roses, and calla lilies.
  > 🏛️ Slide 3: The sanctuary gathering—managing seating, liturgical timing, and order of service hymns for over 400 attendees in ceremonial white attire.
  > 👥 Slide 4: Family elders of the Adamma and Darko lineages held in deep reverence and unhurried protocol.
  >
  > “To honor an elder is to place their life gently into the collective memory of generations.”
  >
  > Explore our full portfolio of ceremonies at quillsandinkhub.com/portfolio.
- **Hashtags:** \`#CaseStudy #NicholasNiiAdamma #LashibiFuneralHome #AllSoulsChapel #GhanaianFunerals #KenteDrapery #QuillsAndInkHub\`

---

## Series 4: Case Study Carousel 2 · The Language of Ghanaian Mourning Cloth

### Carousel Slide Deck (4 Slides)
- **Slide 01:** \`Series_4_Case_Study_Ghanaian_Funeral_Heritage/Slide_01_Cover_The_Language_of_Mourning_Cloth.png\`
- **Slide 02:** \`Series_4_Case_Study_Ghanaian_Funeral_Heritage/Slide_02_Kuntunkuni_The_Dark_Cloth_of_Sorrow.png\`
- **Slide 03:** \`Series_4_Case_Study_Ghanaian_Funeral_Heritage/Slide_03_Kobene_Red_Cloth_of_Heartbreak.png\`
- **Slide 04:** \`Series_4_Case_Study_Ghanaian_Funeral_Heritage/Slide_04_Ceremonial_White_Thanksgiving_and_Victory.png\`
- **Suggested Schedule:** Week 5 · Saturday 10:00 AM
- **Hook:** In Ghanaian funerals, the cloth speaks before a word is uttered.
- **Caption:**
  > [SWIPE TO LEARN ➡️]
  >
  > When attending a Ghanaian funeral, the choice of textile is never merely decorative. It is an ancient emotional code.
  >
  > 🤎 Slide 2 · KUNTUNKUNI (Deep Brown & Black): Worn during initial wake-keeping and Saturday burial rites. Dyed with tree bark, it signifies solemn contemplation, respect, and deep mourning.
  >
  > ❤️ Slide 3 · KOBENE (Fiery Vermilion Red): Reserved exclusively for the closest blood relatives—children, spouse, or parents. It signals profound heartbreak and raw personal grief.
  >
  > 🤍 Slide 4 · CEREMONIAL WHITE (White Brocade & Kente): Worn on Sunday thanksgiving to proclaim that death has not triumphed. When an elder reaches a ripe old age, white celebrates a completed race and peaceful transition to the ancestors.
  >
  > At Quills & Ink Hub, we ensure that every brochure cover, floral accent, and protocol guideline harmonizes with these sacred cultural colors.
- **Hashtags:** \`#GhanaianCulture #Kuntunkuni #Kobene #AkanHeritage #GhanaianTraditions #AfricanMemorialRites #QuillsAndInk\`

---

## Series 5: Funeral Trivia & Cultural Wisdom

### Post 06: Did You Know? The History of Ghanaian Memorial Brochures
- **Graphic:** \`Series_5_Funeral_Trivia_and_Wisdom/Post_06_Trivia_The_Origins_of_Memorial_Brochures.png\`
- **Suggested Schedule:** Week 6 · Tuesday 2:00 PM
- **Caption:**
  > DID YOU KNOW? 📖
  >
  > In many Western countries, a funeral brochure is a 2-page or 4-page folded leaflet. In Ghana, it is frequently a 30 to 48-page bound heirloom book.
  >
  > Why?
  >
  > Historically, because Ghanaian families are matrilineal and expansive across the globe, the memorial brochure evolved into a permanent historical archive. It registers:
  > • The complete biographical chronology
  > • Lineage trees and chief mourners
  > • Spoken tributes from siblings, grandchildren, and fellowships
  > • Decades of family photographs
  >
  > Years later, grandchildren in London or Toronto reach for that brochure to learn where their roots began.
  >
  > That’s why our brochures are printed on 250gsm silk covers with soft-touch velvet lamination and gold foil embossing—crafted to last 100 years.
- **Hashtags:** \`#FuneralTrivia #MemorialBrochure #FamilyHeritage #AfricanGenealogy #KeepsakePrint #QuillsAndInkHub\`

---

### Post 07: The Sacred Role of the Okyeame (Spokesperson)
- **Graphic:** \`Series_5_Funeral_Trivia_and_Wisdom/Post_07_Trivia_The_Voice_of_The_Okyeame.png\`
- **Suggested Schedule:** Week 6 · Friday 11:00 AM
- **Caption:**
  > In traditional Akan protocol, grief is never spoken recklessly.
  >
  > The designated Okyeame (linguist or family spokesperson) stands as the dignified conduit between the bereaved lineage and arriving sympathizers. They filter deep sorrow through proverbs, announcements of committal rites, and measured votes of thanks.
  >
  > At Quills & Ink Hub, our editorial desk works directly with family spokespersons to script order-of-service itineraries and acknowledgments so that every elder feels supported at the podium.
- **Hashtags:** \`#Okyeame #CulturalProtocol #GhanaianFunerals #CeremonialElegance #TraditionAndGrace\`

---

### Post 08: Nsawa: The Sacred Practice of Mutual Care
- **Graphic:** \`Series_5_Funeral_Trivia_and_Wisdom/Post_08_Trivia_Nsawa_The_Sacred_Donation_Rite.png\`
- **Suggested Schedule:** Week 7 · Wednesday 1:00 PM
- **Caption:**
  > When arriving at a Ghanaian memorial reception, one of the first sights is the donation desk and condolence register.
  >
  > This is *Nsawa*—not a fee, but an ancient communal insurance system. In Ghanaian culture, it ensures that no single household bears the financial or emotional weight of a homegoing alone.
  >
  > Quills & Ink Hub coordinates dignified, professional donation secretariat desks with serialized registers, receipting protocols, and seamless cashless transfer support for diaspora families.
- **Hashtags:** \`#Nsawa #CommunalSolidarity #GhanaianTradition #FuneralSecretariat #QuillsAndInkCare\`

---

## Series 6: Global & Cross-Cultural Funeral Customs

### Post 09: Ghana · When Mourning Becomes A Royal Homegoing
- **Graphic:** \`Series_6_Cross_Cultural_Customs/Post_09_Customs_The_Celebration_of_Life_Ghana.png\`
- **Suggested Schedule:** Week 8 · Monday 10:00 AM
- **Caption:**
  > Around the world, different cultures meet grief in extraordinary ways.
  >
  > In Ghana, when an elder passes after 70, 80, or 90 years of honorable life, the sorrow of parting transforms into a royal homegoing. Brass bands play, hymns ring out in full chorus, and family members dance in ceremonial white cloth.
  >
  > Death does not sever the connection—it elevates a beloved parent to an ancestor whose wisdom remains forever woven into the family fabric.
- **Hashtags:** \`#CelebrationOfLife #GhanaFunerals #AncestralHonor #GlobalRemembrance #QuillsAndInk\`

---

### Post 10: Ireland · The Celtic Wake & The Art of Keening
- **Graphic:** \`Series_6_Cross_Cultural_Customs/Post_10_Customs_The_Irish_Keening_and_Wake.png\`
- **Suggested Schedule:** Week 8 · Thursday 2:00 PM
- **Caption:**
  > Across the ocean in Ireland, traditional wakes echo a remarkably similar truth: grief must be held collectively.
  >
  > Before burial, Irish families keep unhurried vigil throughout the night in the family parlor. Candles are kept lit, stories of the departed are exchanged, and ancient poetic laments (keening) are sung.
  >
  > Whether in East Legon or County Cork, humans heal best when they gather together to speak the name of the departed.
- **Hashtags:** \`#IrishWake #CelticTradition #CrossCulturalGrief #GlobalStorytelling #QuillsAndInkHub\`

---

### Post 11: New Orleans · From Dirge to Dance: The Jazz Funeral
- **Graphic:** \`Series_6_Cross_Cultural_Customs/Post_11_Customs_New_Orleans_Jazz_Funeral_Procession.png\`
- **Suggested Schedule:** Week 9 · Tuesday 12:00 PM
- **Caption:**
  > Carried from West Africa to Louisiana through the transatlantic diaspora, the New Orleans jazz funeral holds a powerful lesson about mortality.
  >
  > On the way to the cemetery, the brass band plays a slow, solemn dirge. Heads are bowed, trumpets weep, and the cortege walks in quiet mourning.
  >
  > But once the committal is complete and the deceased is laid to rest, the snare drums roll, umbrellas spin, and the band breaks into an ecstatic, joyful 'Second Line' dance.
  >
  > The sorrow is real, but the triumph is greater: rejoicing that a weary soul has finally returned home to freedom.
- **Hashtags:** \`#JazzFuneral #NewOrleansTraditions #AfricanDiaspora #HomegoingCelebration #QuillsAndInkHub\`

---

## Client Deliverable Checklist & Next Steps
1. Share graphics and copy deck with client social media manager.
2. Schedule launch teasers 2 weeks prior to public marketing campaign.
3. Ensure WhatsApp direct link (\`https://wa.me/233539955615\`) is placed in social media bio link.
`;

fs.writeFileSync(path.join(desktopPackDir, '06_Social_Media_Launch_Pack', 'Social_Media_Copy_Deck_and_Captions.md'), copyDeckMarkdown);
console.log('Generated Social_Media_Copy_Deck_and_Captions.md successfully!');

// 5. Generate Root Readme for Client
const rootReadme = `# Quills & Ink Hub · Official Client Master Deliverable Pack
**Prepared For:** Quills & Ink Hub Leadership  
**Production Date:** October 2026  
**Operational Hubs:** Accra, Ghana & London, United Kingdom  

---

### 📁 Package Directory Index

#### \`01_Brand_Guidelines_PDF/\`
- **Quills-and-Ink-Hub-Executive-Brand-Guide-2026.pdf**: The comprehensive 6-page A4 Landscape master brand book. Contains logo architecture, symbolism of the dove & quill, color tokens, typography scales, social tone of voice, authentic ceremony photography standards, and technical print production specifications.

#### \`02_Brand_Identity_Logos/\`
- **Vector_SVG/**: Scalable vector files for web, apps, print, and signage (\`dove-logo-primary.svg\`, \`dove-logo-gold.svg\`, \`dove-logo-white.svg\`, \`quills-and-ink-favicon.svg\`).
- **HighRes_PNG/**: Ultra high-resolution transparent background PNGs (\`dove-logo-primary-transparent.png\`, \`dove-logo-gold-transparent.png\`, \`dove-logo-white-transparent.png\`).

#### \`03_High_Fidelity_Mockups/\`
- **01_keepsake_cover_hardcover.jpg**: Luxury A5 Soft-Touch Matte Velvet Laminate Cover with gold foil embossing on travertine stone.
- **02_keepsake_interior_spread.jpg**: Open double-page memorial spread showing portrait framing and typography.
- **03_stationery_collection_flatlay.jpg**: Top-down flat-lay showing complete harmonized ceremony stationery suite.

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
- **19 High-Resolution Social Media Graphics (1080x1080px)** categorized into 6 strategic series:
  1. *Series 1: Brand Teasers & Launch Anticipation* (2 posts)
  2. *Series 2: Brand & Services Introduction* (3 posts)
  3. *Series 3: Case Study Carousel 1 · Nicholas Nii Adamma Memorial* (4 slides)
  4. *Series 4: Case Study Carousel 2 · The Language of Ghanaian Mourning Cloth* (4 slides)
  5. *Series 5: Funeral Trivia & Cultural Wisdom* (3 posts)
  6. *Series 6: Global & Cross-Cultural Funeral Customs* (3 posts)
- **Social_Media_Copy_Deck_and_Captions.md**: Ready-to-copy captions, headlines, hashtags, and posting schedule for all 19 posts.

---
**Desk Contact:** Telephone & WhatsApp: +233 53 995 5615 · Email: hello@quillsandinkhub.com · Web: quillsandinkhub.com
`;

fs.writeFileSync(path.join(desktopPackDir, 'README_CLIENT_DELIVERY.md'), rootReadme);
console.log('Master Desktop Client Deliverable Pack complete!');
