import fs from 'fs';
import path from 'path';

function findUrlsInDir(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      findUrlsInDir(fullPath, fileList);
    } else if (/\.(astro|html|css|js|ts)$/.test(file)) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

const files = findUrlsInDir(path.resolve('src'));
const urlRegex = /https:\/\/[^"')\s,]+/g;
const found = new Map();

for (const file of files) {
  const content = fs.readFileSync(file, 'utf-8');
  let match;
  while ((match = urlRegex.exec(content)) !== null) {
    const url = match[0];
    if (url.includes('images.unsplash.com') || url.includes('.png') || url.includes('.jpg') || url.includes('.webp')) {
      if (!found.has(url)) {
        found.set(url, []);
      }
      found.get(url).push(path.relative(process.cwd(), file));
    }
  }
}

console.log(`Found ${found.size} unique image URLs across src/`);

async function testUrl(url) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);
    const res = await fetch(url, { method: 'GET', headers: { 'User-Agent': 'Mozilla/5.0' }, signal: controller.signal });
    clearTimeout(timeout);
    return { ok: res.ok, status: res.status, contentType: res.headers.get('content-type') };
  } catch (err) {
    return { ok: false, error: err.message };
  }
}

async function run() {
  for (const [url, locations] of found.entries()) {
    const result = await testUrl(url);
    if (!result.ok || (result.status && result.status >= 400)) {
      console.log(`❌ BROKEN: [${result.status || result.error}] ${url}`);
      console.log(`   Used in: ${locations.join(', ')}`);
    } else {
      console.log(`✅ OK (${result.status}): ${url.slice(0, 70)}...`);
    }
  }
}

run();
