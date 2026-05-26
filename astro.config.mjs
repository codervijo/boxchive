// astro.config.mjs
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://boxchive.com',
  integrations: [sitemap()],
  output: 'static',
});
