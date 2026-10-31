// astro.config.mjs
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://boxchive.com',
  integrations: [sitemap({ filter: (page) => !page.includes('/404') })],
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
});
