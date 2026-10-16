import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const desktopPackDir = 'C:\\Users\\gokro\\Desktop\\Quills and Ink Hub - Client Pack';
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

console.log('--- Applying Direct Client Feedback to Social Graphics & Copy Deck ---');

// 1. Load embedded fonts
const embeddedFontsCssPath = path.join(rootDir, 'scripts', 'temp', 'embedded-fonts.css');
const embeddedFontsCss = fs.readFileSync(embeddedFontsCssPath, 'utf-8');

function fileToBase64(filePath) {
  if (!fs.existsSync(filePath)) return '';
  const ext = path.extname(filePath).toLowerCase().replace('.', '');
  const mime = ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' : ext === 'png' ? 'image/png' : 'image/svg+xml';
  const data = fs.readFileSync(filePath).toString('base64');
  return `data:${mime};base64,${data}`;
}

const logoPrimary = fileToBase64(path.join(rootDir, 'public/images/brand/dove_logo_primary.png'));
const logoGold = fileToBase64(path.join(rootDir, 'public/images/brand/dove_logo_gold.png'));

// Series 3 assets
const photoKente = fileToBase64(path.join(rootDir, 'public/images/portfolio/nicholas-nii-adamma/01-casket-kente-tribute.jpg'));
const photoCongregation = fileToBase64(path.join(rootDir, 'public/images/portfolio/nicholas-nii-adamma/03-chapel-sanctuary-congregation.jpg'));
const photoElders = fileToBase64(path.join(rootDir, 'public/images/portfolio/nicholas-nii-adamma/05-family-elders-procession.jpg'));

// Series 7 replacement asset (William Dowridge Adu-Asare garden reception)
const photoGardenReplacement = fileToBase64(path.join(rootDir, 'public/images/portfolio/william-dowridge-adu-asare/03-garden-reception-arrival.jpg'));

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

const series3Dir = path.join(desktopPackDir, '06_Social_Media_Launch_Pack', 'Series_3_Case_Study_Nicholas_Nii_Adamma');
const series7Dir = path.join(desktopPackDir, '06_Social_Media_Launch_Pack', 'Series_7_Case_Study_William_Dowridge_Adu_Asare');

const updates = [
  // 1. Series 3, Slide 01: Include surname 'Ammah'
  {
    dest: path.join(series3Dir, 'Slide_01_Cover_Nicholas_Nii_Adamma.png'),
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
        <h1 class="serif" style="font-size: 42pt; font-weight: 600; line-height: 1.15; color: #ffffff; margin-bottom: 15px;">
          Nicholas Nii Adamma Ammah
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

  // 2. Series 3, Slide 02: Update Case Study Header with Ammah
  {
    dest: path.join(series3Dir, 'Slide_02_Woven_Kente_Casket_Floral.png'),
    bg: '#faf8f5',
    text: '#1a1612',
    html: `
      <div style="display: flex; justify-content: space-between; align-items: center; z-index: 10;">
        <span style="font-size: 10pt; letter-spacing: 0.25em; text-transform: uppercase; color: #c9a892; font-weight: 600;">Floral Artistry &amp; Drapery</span>
        <span style="font-size: 10pt; color: #8a7e72;">Case Study · Nicholas Nii Adamma Ammah</span>
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

  // 3. Series 3, Slide 03: Update Case Study Header with Ammah
  {
    dest: path.join(series3Dir, 'Slide_03_All_Souls_Chapel_Service.png'),
    bg: '#faf8f5',
    text: '#1a1612',
    html: `
      <div style="display: flex; justify-content: space-between; align-items: center; z-index: 10;">
        <span style="font-size: 10pt; letter-spacing: 0.25em; text-transform: uppercase; color: #c9a892; font-weight: 600;">Sanctuary Gathering</span>
        <span style="font-size: 10pt; color: #8a7e72;">Case Study · Nicholas Nii Adamma Ammah</span>
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

  // 4. Series 3, Slide 04: Change names to 'Family heads' (family of the widow)
  {
    dest: path.join(series3Dir, 'Slide_04_Honouring_Elders_and_Lineage.png'),
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
            Family Heads in Solemn Remembrance
          </h2>
          <p style="font-size: 12pt; color: #e8d5c4; line-height: 1.7; margin-bottom: 25px; font-weight: 300;">
            Family heads and elders of the widow seated in reverence. When planning a Ghanaian farewell, the guidance and comfort of elders is the bedrock of cultural authenticity.
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

  // 5. Series 7, Slide 03: Replace residence photo with authentic Dreamz & Memoriez garden reception photo
  {
    dest: path.join(series7Dir, 'Slide_03_The_Garden_Sanctuary_Dreamz_and_Memoriez.png'),
    bg: '#1a1612',
    text: '#faf8f5',
    html: `
      <div style="position: absolute; inset: 0; opacity: 0.40; z-index: 1;">
        <img src="${photoGardenReplacement}" style="width: 100%; height: 100%; object-fit: cover;">
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
          Canopy Drapery · Garden Staging · Guest Hospitality
        </div>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(201,168,146,0.3); padding-top: 25px; z-index: 10;">
        <span style="font-size: 10pt; color: #8a7e72;">Slide 03 of 05 · Final Funeral Rites</span>
        <span style="font-size: 10pt; color: #c9a892;">Achimota, Greater Accra</span>
      </div>
    `
  }
];

const tempPostHtmlPath = path.join(rootDir, 'scripts', 'temp', 'feedback-post-render.html');

for (let i = 0; i < updates.length; i++) {
  const u = updates[i];
  console.log(`[${i+1}/${updates.length}] Re-rendering: ${path.basename(u.dest)}...`);
  const fullHtml = wrapPostHtml(u.html, u.bg, u.text);
  fs.writeFileSync(tempPostHtmlPath, fullHtml);
  
  const flags = `--headless=new --disable-gpu --no-first-run --no-default-browser-check --window-size=1080,1080 --screenshot="${u.dest}" "file:///${tempPostHtmlPath.replace(/\\\\/g, '/')}"`;
  execSync(`"${chromePath}" ${flags}`);
}

console.log('All 5 feedback-updated social graphics rendered successfully!');

// Update copy deck markdown
const copyDeckPath = path.join(desktopPackDir, '06_Social_Media_Launch_Pack', 'Social_Media_Copy_Deck_and_Captions.md');
if (fs.existsSync(copyDeckPath)) {
  let deck = fs.readFileSync(copyDeckPath, 'utf-8');
  deck = deck.replace(/Nicholas Nii Adamma(?![a-zA-Z])/g, 'Nicholas Nii Adamma Ammah');
  deck = deck.replace(/The Adamma and Darko family heads seated in reverence/g, 'Family heads and elders of the widow seated in reverence');
  fs.writeFileSync(copyDeckPath, deck);
  console.log('Updated Social_Media_Copy_Deck_and_Captions.md text!');
}
