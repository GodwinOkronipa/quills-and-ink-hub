import { defineConfig } from 'astro/config';

// Static site — deploy to Cloudflare Pages
export default defineConfig({
  site: 'https://quills-and-ink-hub.pages.dev',
  output: 'static',
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
  },
});
