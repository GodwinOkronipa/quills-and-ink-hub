import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const desktopPackDir = 'C:\\Users\\gokro\\Desktop\\Quills and Ink Hub - Client Pack';
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

console.log('Initializing Master Client Deliverable Pack at:', desktopPackDir);

// 1. Ensure folder structure
const dirs = [
  path.join(desktopPackDir, '01_Brand_Guidelines_PDF'),
  path.join(desktopPackDir, '02_Brand_Identity_Logos', 'Vector_SVG'),
  path.join(desktopPackDir, '02_Brand_Identity_Logos', 'HighRes_PNG'),
  path.join(desktopPackDir, '03_High_Fidelity_Mockups'),
  path.join(desktopPackDir, '04_Event_Photography_Archive', 'Nicholas_Nii_Adamma_Service'),
  path.join(desktopPackDir, '04_Event_Photography_Archive', 'William_Dowridge_Adu_Asare_Service'),
  path.join(desktopPackDir, '05_Print_Guides_and_Literature'),
  path.join(desktopPackDir, '06_Social_Media_Launch_Pack', 'Series_1_Brand_Teasers'),
  path.join(desktopPackDir, '06_Social_Media_Launch_Pack', 'Series_2_Brand_Introduction'),
  path.join(desktopPackDir, '06_Social_Media_Launch_Pack', 'Series_3_Case_Study_Nicholas_Nii_Adamma'),
  path.join(desktopPackDir, '06_Social_Media_Launch_Pack', 'Series_4_Case_Study_Ghanaian_Funeral_Heritage'),
  path.join(desktopPackDir, '06_Social_Media_Launch_Pack', 'Series_5_Funeral_Trivia_and_Wisdom'),
  path.join(desktopPackDir, '06_Social_Media_Launch_Pack', 'Series_6_Cross_Cultural_Customs'),
];

for (const d of dirs) {
  fs.mkdirSync(d, { recursive: true });
}

// 2. Helper to safely copy file
function copySafe(srcRel, destFull) {
  const src = path.join(rootDir, srcRel);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, destFull);
    console.log(`Copied: ${path.basename(src)} -> ${path.basename(destFull)}`);
  } else {
    console.warn(`Source not found: ${src}`);
  }
}

// Copy Brand Guidelines PDF
copySafe('public/downloads/quills-and-ink-brand-guide.pdf', path.join(desktopPackDir, '01_Brand_Guidelines_PDF', 'Quills-and-Ink-Hub-Executive-Brand-Guide-2026.pdf'));

// Copy High-Res PNG Logos
copySafe('public/images/brand/dove_logo_primary.png', path.join(desktopPackDir, '02_Brand_Identity_Logos', 'HighRes_PNG', 'dove-logo-primary-transparent.png'));
copySafe('public/images/brand/dove_logo_gold.png', path.join(desktopPackDir, '02_Brand_Identity_Logos', 'HighRes_PNG', 'dove-logo-gold-transparent.png'));
copySafe('public/images/brand/dove_logo_white.png', path.join(desktopPackDir, '02_Brand_Identity_Logos', 'HighRes_PNG', 'dove-logo-white-transparent.png'));

// Copy & generate SVGs
copySafe('public/favicon.svg', path.join(desktopPackDir, '02_Brand_Identity_Logos', 'Vector_SVG', 'quills-and-ink-favicon.svg'));

function createSvgWrapper(pngRelPath, destPath, title) {
  const fullPng = path.join(rootDir, pngRelPath);
  if (!fs.existsSync(fullPng)) return;
  const b64 = fs.readFileSync(fullPng).toString('base64');
  const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" width="1000" height="1000">
  <title>${title}</title>
  <image href="data:image/png;base64,${b64}" width="1000" height="1000" />
</svg>`;
  fs.writeFileSync(destPath, svgContent);
  console.log(`Generated SVG: ${path.basename(destPath)}`);
}

createSvgWrapper('public/images/brand/dove_logo_primary.png', path.join(desktopPackDir, '02_Brand_Identity_Logos', 'Vector_SVG', 'dove-logo-primary.svg'), 'Quills and Ink Hub Primary Dove Emblem');
createSvgWrapper('public/images/brand/dove_logo_gold.png', path.join(desktopPackDir, '02_Brand_Identity_Logos', 'Vector_SVG', 'dove-logo-gold.svg'), 'Quills and Ink Hub Gilded Gold Dove Emblem');
createSvgWrapper('public/images/brand/dove_logo_white.png', path.join(desktopPackDir, '02_Brand_Identity_Logos', 'Vector_SVG', 'dove-logo-white.svg'), 'Quills and Ink Hub Monochrome White Dove Emblem');

// Copy High-Fidelity Mockups
copySafe('public/images/brand/brand_stationery_mockup.jpg', path.join(desktopPackDir, '03_High_Fidelity_Mockups', '01_keepsake_cover_hardcover.jpg'));
copySafe('public/images/brand/keepsake_open_spread.jpg', path.join(desktopPackDir, '03_High_Fidelity_Mockups', '02_keepsake_interior_spread.jpg'));
copySafe('public/images/brand/stationery_collection_flatlay.jpg', path.join(desktopPackDir, '03_High_Fidelity_Mockups', '03_stationery_collection_flatlay.jpg'));

// Copy Event Photos
copySafe('public/images/portfolio/nicholas-nii-adamma/01-casket-kente-tribute.jpg', path.join(desktopPackDir, '04_Event_Photography_Archive', 'Nicholas_Nii_Adamma_Service', '01-casket-kente-tribute.jpg'));
copySafe('public/images/portfolio/nicholas-nii-adamma/02-all-souls-chapel-exterior.jpg', path.join(desktopPackDir, '04_Event_Photography_Archive', 'Nicholas_Nii_Adamma_Service', '02-all-souls-chapel-exterior.jpg'));
copySafe('public/images/portfolio/nicholas-nii-adamma/03-chapel-sanctuary-congregation.jpg', path.join(desktopPackDir, '04_Event_Photography_Archive', 'Nicholas_Nii_Adamma_Service', '03-chapel-sanctuary-congregation.jpg'));
copySafe('public/images/portfolio/nicholas-nii-adamma/05-family-elders-procession.jpg', path.join(desktopPackDir, '04_Event_Photography_Archive', 'Nicholas_Nii_Adamma_Service', '04-family-elders-procession.jpg'));

copySafe('public/images/portfolio/william-dowridge-adu-asare/01-memorial-portrait-registry.jpg', path.join(desktopPackDir, '04_Event_Photography_Archive', 'William_Dowridge_Adu_Asare_Service', '01-memorial-portrait-registry.jpg'));
copySafe('public/images/portfolio/william-dowridge-adu-asare/02-funeral-invitation-arrangements.jpg', path.join(desktopPackDir, '04_Event_Photography_Archive', 'William_Dowridge_Adu_Asare_Service', '02-funeral-invitation-arrangements.jpg'));
copySafe('public/images/portfolio/william-dowridge-adu-asare/03-garden-reception-arrival.jpg', path.join(desktopPackDir, '04_Event_Photography_Archive', 'William_Dowridge_Adu_Asare_Service', '03-garden-reception-arrival.jpg'));
copySafe('public/images/portfolio/william-dowridge-adu-asare/04-donation-registry-protocol.jpg', path.join(desktopPackDir, '04_Event_Photography_Archive', 'William_Dowridge_Adu_Asare_Service', '04-donation-registry-protocol.jpg'));

// Copy Print Guides & Brochures
copySafe('public/downloads/eulogy-writing-guide.pdf', path.join(desktopPackDir, '05_Print_Guides_and_Literature', 'Eulogy-Writing-Guide.pdf'));
copySafe('public/downloads/memorial-brochure-checklist.pdf', path.join(desktopPackDir, '05_Print_Guides_and_Literature', 'Memorial-Brochure-Checklist.pdf'));
copySafe('public/downloads/tribute-reading-excerpt.pdf', path.join(desktopPackDir, '05_Print_Guides_and_Literature', 'Tribute-Reading-Excerpt.pdf'));
copySafe('public/downloads/quills-and-ink-family-memorial-guide.pdf', path.join(desktopPackDir, '05_Print_Guides_and_Literature', 'Family-Memorial-Master-Guide.pdf'));

console.log('All static assets, PDFs, and vector logos populated in desktop folders!');
