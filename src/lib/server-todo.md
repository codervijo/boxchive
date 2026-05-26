# Server-side code dropped during Astro port

The source project (`genai/`) was a TanStack Start app with server entrypoints
and a server-rendered sitemap handler. Astro is configured as `output: 'static'`,
so none of this translates directly. Decisions and TODOs are recorded here.

## TODO: TanStack Start server entry

- `genai/src/server.ts` — Cloudflare `fetch` handler that wraps
  `@tanstack/react-start/server-entry`, normalizes h3-swallowed catastrophic
  SSR errors into a branded 500 page, and renders error HTML via
  `lib/error-page.ts`.
- `genai/src/start.ts` — `createStart()` instance with an `errorMiddleware`
  that catches non-HTTP errors and returns the branded 500 page.

Not ported. Astro builds static HTML at build time; there is no runtime
server entry. If/when the site needs real SSR (e.g. dynamic Cloudflare
Workers handling), revisit by switching `output` to `'server'` or `'hybrid'`
and porting the branded 500 page as `src/pages/500.astro`.

## TODO: branded error page

- `genai/src/lib/error-page.ts` — returns HTML for a branded 500.
- `genai/src/lib/error-capture.ts` — captures last unhandled error so the
  server entry can log it before rendering the branded page.

Not ported. Astro renders its own 404 from `src/pages/404.astro` if present.
For static-only output the runtime error page is moot. If we add SSR later,
port the branded HTML to `src/pages/500.astro` or an error layout.

## TODO: sitemap handler

- `genai/src/routes/sitemap[.]xml.ts` — TanStack server handler emitting
  `/sitemap.xml` with a single `/` entry.

Replaced by the `@astrojs/sitemap` integration already wired into
`astro.config.mjs`, which auto-generates `sitemap-index.xml` from the static
routes at build time. The hand-maintained `public/sitemap.xml` can be kept
as a fallback or removed once the generated one lands.

## TODO: 404 / error route components

- `genai/src/routes/__root.tsx` defined `NotFoundComponent` and `ErrorComponent`
  with their own styled markup using `btn-primary`, serif headings, etc.

Not ported. If a styled 404 is desired, add `src/pages/404.astro` and reuse
the same `btn-primary` / serif classes from `src/styles/styles.css`.

## TODO: TanStack Router / Query glue

- `genai/src/router.tsx`, `genai/src/routeTree.gen.ts` — TanStack Router setup
  with a `QueryClient` context.

Not ported. Astro provides file-based routing; React Query is unnecessary
for the current static landing page. If interactive React islands later
need data fetching, add `@astrojs/react` and re-introduce a per-island
`QueryClientProvider`.

## TODO: Formspree endpoint

`src/pages/index.astro`'s lead form posts to `data-endpoint="TODO_FORMSPREE_ENDPOINT"`.
Replace with a real Formspree (or equivalent) endpoint before going live; the
client-side fallback currently still shows the thank-you state even when no
endpoint is configured.
