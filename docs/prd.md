---
project: boxchive.com
prd_version: 2
project_version: v2.B
status: in-progress
owner: Vijo
last_updated: 2026-10-30
---

# boxchive.com — PRD

## 1. Problem

Small organizations (museums, historical societies, churches, small law firms,
libraries) hold decades of irreplaceable paper they cannot search, and the
enterprise scanning route is priced and scoped for institutions far larger
than they are. *(Source: `AI_AGENTS.md` § Summary / ICP.)*

## 2. Users

Director or archivist of a small regional museum or historical society — no
dedicated IT, records in boxes and filing cabinets, needs searchable access for
grants, exhibits and board requests. Secondary: small law firms, churches,
libraries. *(Source: `AI_AGENTS.md` § ICP.)*

## 3. Goals & non-goals

**Goals:**
- Capture qualified free-assessment leads (demand validation).
- Build an SEO surface that ranks for buyer-intent queries and earns citations
  from AI search, measured in GSC.

**Non-goals:**
- Publishing prices before the operator sets them (pricing is a placeholder —
  `src/data/pricing.ts`).
- City / "near me" programmatic pages (Boxchive is not a local scanning bureau;
  see `docs/seo-content-plan.md` § Rejected).
- Claiming capabilities beyond the approved list in
  `docs/seo-content-plan.md` § Claims guardrails.

## 4. Versions

Two-level versioning convention (canonical: `sites/portfolio/AI_AGENTS.md`):

- `vN` = major capability tier; SemVer-MAJOR semantics.
- `vN.X` = phase letter within a tier; `vN.A` is always planning / decisions lock.

| Version | Theme | Acceptance |
|---|---|---|
| v0 | scaffold | local builds, CF wrangler.jsonc + public/_headers in place, repo initialized |
| v1 | landing page | single conversion page live at boxchive.com with free-assessment form, sitemap, IndexNow |
| v2 | SEO surface | ~40 evidence-backed pages in reusable families, internal linking, structured data; GSC shows impressions on non-home URLs |

## 5. Phases

| Phase | Theme | Features | Status |
|---|---|---|---|
| **v0.A** | scaffolded | `portfolio new bootstrap` ran; standard files written; git initialized | ✅ |
| **v1.A** | Kickoff / decisions lock (backfill) | positioning, ICP, single-page lead-capture scope (recorded in `AI_AGENTS.md`) | ✅ |
| **v1.B** | Landing page (backfill) | Astro port, homepage, assessment form UI, `@astrojs/sitemap`, IndexNow key | ✅ (form endpoint still `TODO_FORMSPREE_ENDPOINT`) |
| **v2.A** | SEO decisions lock | site audit, treg keyword + SERP research, page families, ranked roadmap, claims guardrails — `docs/seo-content-plan.md` | ✅ |
| **v2.B** | SEO fixes + cluster 1 | audit fixes (absolute canonicals, WebSite schema, real 404 / no soft-404, shared nav/footer, test suite repaired) + 10 pages (cost, scanning-service alternative, archive digitization, searchable archive, 4 guides, historical societies, museums) | in progress |
| **v2.C** | Cluster 2 | churches, law firms, libraries, phone-capture guide, preservation, digital-archive how-to, newspapers, letters, books/ledgers, archive-software comparison | planned |
| **v2.D** | Cluster 3 | grants, museum documentation, OCR accuracy, digital preservation, church retention, going paperless, scrapbooks, registers, accession records, nonprofits | planned |
| **v2.E** | Cluster 4 (re-validate first) | lower-evidence pages; re-check volume + GSC before building | planned |

## 6. Open questions

- *(append-only log; mark answered with date but never delete)*
- 2026-10-30 — Where does SEO expansion go? **Answered 2026-10-30:** v1 = landing page (backfill), v2 = SEO surface.
- 2026-10-30 — What is Boxchive's real pricing? **Open.** Not set; all pages read from `src/data/pricing.ts` (null → neutral "quoted after assessment" copy).
- 2026-10-30 — Lead form endpoint (`TODO_FORMSPREE_ENDPOINT`) — every submission is currently dropped while the thank-you state still shows. **Open; blocks lead capture.**
- 2026-10-30 — Is `@boxchive` (twitter:site) an account the operator controls? **Open.**
