import { execSync } from 'child_process';
import path from 'path';

const chrome = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const htmlPath = 'file:///' + path.resolve('scripts/temp/brand-guide-template.html').replace(/\\/g, '/');
const outPath = path.resolve('scripts/temp/brand-guide-full.png');
execSync(`"${chrome}" --headless=new --disable-gpu --default-background-color=00000000 --screenshot="${outPath}" --window-size=1200,5000 "${htmlPath}"`);
console.log('Full preview saved to', outPath);
