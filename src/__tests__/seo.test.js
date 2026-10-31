// src/__tests__/seo.test.js
// Technical-SEO regression check against the BUILT site (run `pnpm build`
// first — `make test` does). Every page in dist/ must carry the baseline tags,
// valid JSON-LD, absolute canonicals, one <h1>, and internal links that resolve.

import { describe, it, expect } from 'vitest';
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const DIST = join(process.cwd(), 'dist');
const ORIGIN = 'https://boxchive.com';

function htmlFiles(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) return htmlFiles(full);
    return name.endsWith('.html') ? [full] : [];
  });
}

function urlPath(file) {
  const rel = '/' + relative(DIST, file).replace(/\\/g, '/');
  return rel.endsWith('/index.html') ? rel.slice(0, -'index.html'.length) : rel.replace(/\.html$/, '');
}

const built = existsSync(DIST);
const pages = built ? htmlFiles(DIST).map((f) => ({ file: f, path: urlPath(f), html: readFileSync(f, 'utf8') })) : [];
const indexable = pages.filter((p) => p.path !== '/404');
const knownPaths = new Set(pages.map((p) => p.path));

describe('build output exists', () => {
  it('dist/ has been built', () => {
    expect(built, 'run `pnpm build` before tests').toBe(true);
    expect(indexable.length).toBeGreaterThanOrEqual(12);
  });
});

describe.each(indexable.map((p) => [p.path, p]))('SEO baseline %s', (_path, page) => {
  const { html, path } = page;

  it('has <title> and meta description', () => {
    expect(html).toMatch(/<title>[^<]{10,}<\/title>/);
    expect(html).toMatch(/<meta name="description" content="[^"]{50,}"/);
  });

  it('has an absolute canonical matching its URL', () => {
    const m = html.match(/<link rel="canonical" href="([^"]+)"/);
    expect(m).not.toBeNull();
    expect(m[1]).toBe(ORIGIN + path);
  });

  it('has Open Graph + Twitter tags with absolute og:url', () => {
    expect(html).toMatch(new RegExp(`property="og:url" content="${ORIGIN}`));
    expect(html).toMatch(/property="og:title"/);
    expect(html).toMatch(/name="twitter:card"/);
  });

  it('has favicon link', () => {
    expect(html).toMatch(/<link rel="icon"[^>]*href="\/favicon\.svg"/);
  });

  it('has exactly one <h1>', () => {
    expect((html.match(/<h1[\s>]/g) || []).length).toBe(1);
  });

  it('has valid JSON-LD including Organization + WebSite', () => {
    const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1]);
    expect(blocks.length).toBeGreaterThanOrEqual(2);
    const types = blocks.map((b) => JSON.parse(b)['@type']);
    expect(types).toContain('Organization');
    expect(types).toContain('WebSite');
  });

  it('internal links resolve to built pages', () => {
    const hrefs = [...html.matchAll(/href="(\/[^"#?]*)/g)].map((m) => m[1]);
    const broken = hrefs.filter((h) => {
      if (/\.(svg|png|jpe?g|webp|css|js|txt|xml)$/.test(h) || h.startsWith('/_astro/')) return false;
      return !knownPaths.has(h);
    });
    expect(broken).toEqual([]);
  });

  it('shows no unpublished prices or placeholder text', () => {
    // Visible text only: strip scripts, then tags (attributes are checked separately).
    const text = html.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<[^>]+>/g, ' ');
    expect(text).not.toMatch(/\$100|\$500|\/ month|\$0\.05 \/ page/);
    expect(text).not.toMatch(/TODO|PLACEHOLDER|lorem ipsum/i);
  });
});

describe('lead capture', () => {
  // Operator-owned: src/pages/index.astro data-endpoint is still TODO_FORMSPREE_ENDPOINT,
  // so every submission is discarded. Flip to a real assertion once it's set.
  it.todo('lead form posts to a real endpoint (currently TODO_FORMSPREE_ENDPOINT)');
});

describe('404 page', () => {
  it('exists and is noindex', () => {
    const p = pages.find((x) => x.path === '/404');
    expect(p).toBeDefined();
    expect(p.html).toMatch(/<meta name="robots" content="noindex"/);
  });
});

describe('sitemap + llms.txt', () => {
  it('sitemap lists every indexable page and not the 404', () => {
    const xml = readFileSync(join(DIST, 'sitemap-0.xml'), 'utf8');
    for (const p of indexable) expect(xml).toContain(`<loc>${ORIGIN}${p.path}</loc>`);
    expect(xml).not.toContain('/404');
  });

  it('llms.txt links every content page', () => {
    const txt = readFileSync(join(DIST, 'llms.txt'), 'utf8');
    for (const p of indexable.filter((x) => x.path !== '/')) expect(txt).toContain(`${ORIGIN}${p.path}`);
  });
});
