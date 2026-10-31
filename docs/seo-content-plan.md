# SEO content plan — boxchive.com

> **Resume here.** Single source of truth for boxchive.com SEO pages: research
> data, page families, roadmap, per-page specs, and implementation status.
> Separate from `lamill.toml` by design. PRD phases: `v2.A` (this plan) →
> `v2.B` (cluster 1) → `v2.C` / `v2.D` / `v2.E`. Update the **Status** column
> in § 6 and the log in § 10 whenever a page ships or changes.

- **Last updated:** 2026-10-30
- **Phase:** v2.B in progress (cluster 1 built, not yet deployed)
- **Open blockers (operator):** pricing (`src/data/pricing.ts` = `null`), lead-form
  endpoint (`TODO_FORMSPREE_ENDPOINT` in `src/pages/index.astro`). Neither page
  family should be pushed live as "done" while these are open — see § 9.

---

## 1. Audit (2026-10-30, pre-v2.B)

Live site = one page (`/`). Findings, in priority order:

| # | Finding | Severity | Fix | Status |
|---|---|---|---|---|
| A1 | Lead form posts to `TODO_FORMSPREE_ENDPOINT`; the script shows the thank-you state even though nothing is sent. **Every lead is dropped.** | Critical (customer acquisition) | Operator supplies endpoint | ✗ open — operator |
| A2 | Soft-404: `wrangler.jsonc` `not_found_handling: "single-page-application"` returns the homepage with HTTP 200 for any URL (verified `curl /nonexistent-page-xyz` → 200). Duplicate-content / crawl-waste risk once more pages exist. | High | `"404-page"` + `src/pages/404.astro` | ✓ v2.B |
| A3 | Pricing on the homepage (`$100–$500/month`, `~$0.05/page`, `from about $100/month` in meta description, JSON-LD `AggregateOffer`) — operator confirmed 2026-10-30 that pricing is **not set**. | High (accuracy) | Centralize in `src/data/pricing.ts` (null → neutral copy); drop `offers` from JSON-LD | ✓ v2.B |
| A4 | Canonical / `og:url` / `og:image` are relative (`/`, `/_astro/…`). | Medium | Absolute URLs via `Astro.site` | ✓ v2.B |
| A5 | No `WebSite` JSON-LD (the SEO test asserted it; test was also broken). | Low | Added in `BaseLayout` | ✓ v2.B |
| A6 | Test suite broken: `vitest.config.js` uses `jsdom` (not installed); `seo.test.js` greps `index.astro` for tags that live in the layout. `make test` swallows the unit failure (`|| true`). | Medium | `environment: 'node'`; tests read built `dist/` HTML for every page | ✓ v2.B |
| A7 | No navigation, no internal links, single URL — nothing for crawlers to discover. | High | Shared header/footer, hub, related-links blocks | ✓ v2.B |
| A8 | `twitter:site = @boxchive` — unverified whether the operator owns it. | Low | Operator to confirm | ✗ open — operator |
| A9 | Homepage cites a "~$50,000 enterprise quote" as the comparison anchor. It is the ICP narrative from `AI_AGENTS.md`, not a sourced figure. New pages use **cited per-page vendor rates** instead (§ 3.3). | Low (positioning) | Left on homepage; operator call | ↷ flagged |
| A10 | GSC verification / sitemap submission unchecked in `AI_AGENTS.md` post-deploy checklist; growth.md review (2026-06-22) overdue. | Medium (measurement) | Operator: verify `sc-domain:boxchive.com` | ✗ open — operator |

## 2. Research method and sources

All metrics were pulled through **treg** on 2026-10-30. Total spend ≈ $0.68.

| Purpose | Endpoint | Call ID(s) |
|---|---|---|
| Discovery (phrase-match ideas) | `serpstat.google.keywords.ideas` (`getKeywords`, `g_us`) | `a889980e…`, `aab040af…`, `71b3a634…`, `86d31687…`, `a03b4427…` |
| **Validation (SV / KD / CPC / intent)** | `seranking.google.keywords.volume` (`source=us`) | `e9413de29e584352a2eed1d98154091d`, `a9b116d05075436e801d0b813f3164f0` |
| SERP / competitor check | `treg.google.serp.organic` (served by crawl4ai) | `e89a9b21…`, `ffab3b1c…`, `4dbbde40…`, `d8dece3c…`, `205ccafb…`, `fa689dd0…`, `095f8506…` |

**Rules used:**
- **Every SV/KD figure in this doc is SE Ranking, US, Oct-2026 monthly volume** unless marked otherwise. Serpstat was used only to find candidates — its volumes disagreed badly with SE Ranking (e.g. "personal digital archiving" 110,000 in Serpstat) and were not trusted.
- KD = SE Ranking difficulty, 0–100. CPC in USD.
- "n/d" = SE Ranking returned `is_data_found: false` → **no measurable demand**. Not the same as zero, but we don't build a page on it alone.
- Volumes ≤ 30 are noise-level; treat as "exists", not as a number to optimize for.

## 3. Findings

### 3.1 Where the demand is (validated)

| Cluster | Keyword | SV | KD | CPC | Intent |
|---|---|---|---|---|---|
| **Cost** | document scanning cost | 390 | 5 | 1.41 | I |
| | cost to scan documents | 390 | 14 | 1.41 | I |
| | price to scan documents | 390 | 10 | 1.41 | I |
| | document scanning pricing | 390 | 6 | 1.41 | I |
| | document scanning price per page | 50 | 5 | 1.74 | I |
| | how much does document scanning cost | 50 | 11 | 1.34 | I |
| | cost to digitize documents | 20 | 11 | 1.60 | I |
| | scanning cost per page | 20 | 10 | — | I |
| | scanning services cost | 20 | 11 | 1.68 | I |
| **Services** | document scanning services | 590 | 7 | 3.67 | L,C (volatile 220–1,600) |
| | scanning services / scanning service | 540 / 540 | 6 / 4 | 2.67 / 2.86 | I / I,N |
| | document digitization services | 390 | 20 | 4.94 | L,C |
| | document digitizing service | 390 | 12 | 4.38 | L,C |
| | document scanning companies | 210 | 14 | 5.32 | L,C |
| | bulk document scanning | 140 | 10 | 2.42 | L,C |
| | document imaging services | 70 | 11 | 3.86 | L,C |
| | legal document scanning | 70 | 6 | 1.13 | I |
| | archival / archive scanning services | 40 / 40 | 13 / 5 | 3.98 | L,C |
| | iron mountain scanning / document scanning | 50 / 50 | 26 / 24 | 4.99 / 3.46 | L,N |
| | iron mountain alternative | 10 | 10 | 10.38 | L,C |
| | staples document scanning / ups store scanning | 210 / 170 | 16 / 16 | 0.60 / 0.23 | L,C |
| | book scanning service | 390 | 8 | 1.60 | L,C |
| **Archive** | archive scanning / archival scanning | 210 / 210 | 4 / 8 | 1.97 | L,C |
| | archive digitization | 170 | 16 | 3.82 | I |
| | library digitization | 110 | 13 | 4.34 | I |
| | searchable archive | 210 | 0 | 0.89 | I |
| | digital archive software | 140 | 7 | 6.90 | I |
| | archive management software | 70 | 15 | 5.65 | I |
| | archiving documents | 320 | 5 | 1.57 | L,C |
| | digital archiving | 990 | 13 | 2.38 | I (trend jumped 70→990 in 2026 — treat cautiously) |
| | digital archive | 1,600 | 63 | 2.38 | I (too hard now) |
| | digital preservation | 260 | 11 | 2.54 | I |
| | how to create a digital archive | 30 | 22 | 2.97 | I |
| **How-to** | digitize documents / digitizing documents | 260 / 260 | 13 / 7 | 2.73 | I |
| | how to digitize documents | 110 | 10 | 1.24 | I |
| | digitize paper documents | 90 | 15 | 2.69 | I |
| | digitize records / digitizing records | 90 / 90 | 7 / 7 | 2.60 | I |
| | how to digitize paper documents | 50 | 26 | 1.57 | I |
| | digitizing historical documents | 50 | 6 | 4.06 | I |
| | scanning historical documents | 30 | 15 | 1.86 | L,C |
| | digitizing / digitize old documents | 20 / 20 | 18 / 20 | 4.45 | L,C |
| | how to scan without a scanner | 50 | 13 | 0.98 | I |
| | what dpi to scan documents | 50 | 6 | — | I |
| | how to digitize a book / how to scan a book | 140 / 390 | 19 / 27 | 0.47 / 0.79 | I |
| **Preservation** | how to preserve old newspapers | 390 | 6 | 0.16 | I |
| | how to preserve old letters | 260 | 17 | 0.15 | I |
| | how to preserve newspaper clippings | 140 | 7 | 0.19 | I |
| | archival quality | 140 | 11 | — | I |
| | how to store old documents / how to preserve old documents | 90 / 90 | 6 / 19 | 0.26 | I |
| | digitize scrapbooks | 40 | 5 | 1.31 | I |
| | digitize newspapers | 30 | 12 | 2.42 | I |
| **Handwriting / OCR** | convert handwriting to text | 760 | 6 | 0.86 | I |
| | handwritten text recognition | 480 | 32 | 2.16 | I |
| | handwriting recognition | 480 | 43 | 1.04 | I |
| | handwriting to text app | 480 | 8 | 0.62 | I (app intent) |
| | ocr handwriting | 320 | 17 | 2.52 | I |
| | handwriting recognition software | 260 | 23 | 1.40 | I |
| | ai handwriting recognition | 210 | 25 | 0.97 | I |
| | best handwriting ocr | 90 | 11 | 3.03 | I |
| | ocr accuracy | 90 | 13 | — | I |
| | convert cursive to text | 70 | 15 | 0.68 | I |
| | ocr cursive | 40 | 14 | 1.24 | I |
| | transkribus | 1,800 | 65 | 2.00 | I,N (brand) |
| **Naming** | file naming conventions | 660 | 12 | 2.43 | I |
| | naming convention for files | 170 | 31 | — | I |
| | file naming convention examples | 110 | 12 | — | I |
| | folder naming conventions | 90 | 16 | — | I |
| | naming conventions for documents | 70 | 29 | — | I |
| **Retention** | records retention schedule | 720 | 7 | 3.13 | I |
| | document retention policy | 480 | 18 | 2.48 | I |
| | records retention policy | 480 | 5 | 2.40 | I |
| | how long to keep business records | 480 | 37 | 0.12 | I |
| | nonprofit document retention policy | 210 | 20 | 2.81 | I |
| | document retention policy template | 70 | 9 | 2.40 | I |
| | file retention policy | 50 | 31 | 3.65 | I |
| | church document retention policy | 20 | 12 | — | I |
| | law firm document retention policy | 10 | 8 | — | I |
| **Software** | collection management software | 210 | 19 | 6.51 | I |
| | records management software | 180 | 6 | 16.76 | I (trend volatile) |
| | electronic records management | 390 | 6 | 7.25 | I,N |
| | document management for small business | 210 | 29 | 7.84 | I |
| | archivesspace | 760 | 19 | — | I (brand) |
| | pastperfect | 360 | 14 | 1.22 | I (brand) |
| | collectiveaccess | 170 | 11 | — | I,N (brand) |
| | museum collection management software | 50 | 36 | 3.80 | I |
| **Org / doc types** | museum documentation | 320 | 11 | — | I |
| | museum collections management | 70 | 13 | 1.74 | I |
| | accession records | 50 | 7 | — | I |
| | church records | 260 | 17 | 0.68 | I |
| | church archives | 70 | 12 | — | L,C |
| | parish records / baptism records | 390 / 590 | 6 / 6 | — | I (genealogy-seeker intent, not buyer) |
| | historical society grants | 50 | 13 | 0.61 | I |
| | digitization grants | 30 | 15 | — | I |
| | historical society archives | 20 | 25 | — | I |
| | board minutes | 590 | 15 | 3.61 | I (definitional) |
| | going paperless / how to go paperless | 480 / 110 | 11 / 14 | 2.37 / — | I |

### 3.2 Where the demand is NOT (n/d or ≤10 in SE Ranking)

church records digitization, digitize church records, scanning church records,
digitize parish registers, digitize baptism records, historical society
digitization, museum collection digitization, museum archive digitization,
museum digitization (10), digitizing museum collections (10), law firm file
digitization, law firm document scanning, scanning service for law firms,
records digitization services, archive digitization services, school records
digitization, municipal / county records digitization, digitize old letters,
digitize meeting minutes, digitize ledgers, digitize deeds, transcribe
handwritten documents, transcription of historical documents, handwriting
transcription service, how to photograph documents, phone vs scanner,
pastperfect alternative (0), transkribus alternative, small museum software,
how much does it cost to digitize documents, how long to keep board minutes /
church records / nonprofit records.

**Implication:** "digitization for [org type]" is not how buyers search. They
search the *task* (cost, scanning, OCR, naming, retention) and the *artifact*
(newspapers, letters, books). Org-type pages are still built — they are where
direct outreach and referrals land and they answer AI-assistant questions
("how should a small historical society digitize its records?") — but they
are scoped as conversion pages, not traffic bets, and limited to the five
ICP segments. This is why the roadmap is ~40 pages, not 60: padding the list
with org × doc-type permutations would be thin content against no measured
demand.

### 3.3 SERP / competitor observations

- **"document scanning cost per page"** — vendor blogs: Ricoh/PFU, ScansAmerica,
  Record Nations, RecordsForce, vdocs, ScanNmore. Published figures in snippets:
  standard B&W 300 dpi **$0.07–$0.12/page**, ≈ **$140–$300 per Bankers Box**
  (RecordsForce, 2024-09-18); "7–12 cents per page" (Record Nations, 2017-10-19);
  "$0.07 to $0.12 per page" (ScanNmore, 2025-06-20); vdocs box price $149,
  $0.069/page, custom $0.05–$0.15 (vdocs, undated); archive boxes "can hold
  2,000–3,250" pages (Ricoh/PFU blog, 2024-06-27). These are the only cost
  figures pages may use, always attributed. No vendor writes for the
  small-archive buyer → **gap**.
- **"document scanning services" / "archival scanning services"** — local-pack +
  city pages (Record Nations ×6, regional bureaus, Yelp, Iron Mountain ad).
  Local intent dominates; Boxchive can't win the local pack. Compete with an
  *honest alternative* page, not a fake-local page.
- **"how to digitize documents"** — Adobe, Ricoh, DocuWare, IBML, Hackaday:
  office-paper framing. Nobody covers fragile/historical material with a phone
  workflow → **gap** for the archival pillar.
- **"convert handwriting to text"** — tools (handwritingocr.com, Pen to Print,
  Transkribus, Evernote) with an AI Overview. Buyer of a *service* for
  century-old ledgers is under-served; honest guide on HTR limits + human
  review fits.
- **"nonprofit document retention policy"** — Stanford Law nonprofit documents,
  Public Counsel, DC Bar, AICPA sample, CPA firms. Authoritative/legal; KD 20.
  Our angle: retention *plus* what to digitize vs keep on paper. Must cite, not
  advise.
- **"file naming conventions"** — Harvard Medical, NNLM, RI State Archives,
  Columbia, Purdue: research-data framing. Gap: naming for *scanned archival
  records* with a working builder tool.
- **AI search:** AI Overviews present on handwriting and retention SERPs. Pages
  are written answer-first (definition / direct answer in the first 2
  sentences, then specifics), with clear headings, tables, and attributed
  facts — the shape LLM answer engines quote. `public/llms.txt` lists the
  canonical pages.

## 4. Claims guardrails (read before writing any page)

**Approved capability statements** — the only things pages may say Boxchive
does (source: live homepage copy + `AI_AGENTS.md` § Summary):

1. Staff or volunteers photograph pages with a modern phone; records stay on-site.
2. OCR on every page.
3. Extracts dates, names and other entities.
4. Classifies pages by document type (minutes, correspondence, registries, case files…).
5. Files pages using the organization's existing naming convention.
6. Produces a keyword-searchable archive.
7. Handwritten, faded, water-damaged or fragile pages are flagged and human-reviewed; the archive records what was confidently transcribed vs. needs review.
8. Free assessment: realistic estimate, sample workflow, honest fit read (including "you need a traditional vendor").

**Not approved — do not claim:** prices or price ranges; turnaround times;
accuracy percentages; export formats (PDF/A, CSV…); integrations (PastPerfect,
ArchivesSpace…); security certifications / HIPAA; hosting / storage location;
preservation-master (FADGI) quality; photo/object recognition; number of
customers, testimonials, case studies.

**Third-party facts** must carry a source on the page (name + year). If a fact
can't be sourced, cut it.

**Pricing:** read `PRICING` from `src/data/pricing.ts`. While `null`, pages say
pricing is quoted after a free assessment. `TODO(operator)` lives there only.

## 5. Page families (reusable structures)

| Family | URL pattern | Template | Schema | Job |
|---|---|---|---|---|
| **F1 Cost & comparison** | `/document-scanning-cost/`, `/…-alternative/`, `/compare/…` | answer-first → cited figures table → calculator/decision table → when the alternative wins → CTA | `Article` + `BreadcrumbList` (+ `FAQPage`) | commercial investigation |
| **F2 Solutions** | `/archive-digitization/`, `/searchable-archive/` | problem → approaches compared → how Boxchive does it (approved claims only) → limits → CTA | `Service`/`WebPage` + `BreadcrumbList` | commercial |
| **F3 Who it's for** | `/for/<segment>/` | their records inventory → their constraints → workflow → what to digitize first → FAQs → CTA | `WebPage` + `BreadcrumbList` + `FAQPage` | conversion (outreach + AI answers) |
| **F4 Document types** | `/documents/<artifact>/` | handling/preservation → capture tips → making it searchable → CTA | `Article` | top/mid funnel |
| **F5 Guides** | `/guides/<topic>/` | answer-first → steps/tables → original tool where possible → related → CTA | `Article` + `BreadcrumbList` (+ `FAQPage`) | top/mid funnel, AI citations |
| **F6 Tools** | embedded in host page (no standalone URL until it earns one) | input → computed output (no invented defaults) | — | links / dwell / utility |

**Cannibalization rule:** one primary keyword cluster per URL. The four
near-identical cost queries (cost / pricing / price / cost to scan — same
volume, same intent) map to **one** page. Calculator is embedded there, not a
second URL.

## 6. Roadmap (40 pages + 2 utility)

Priority: **P1** = build now, **P2** = next, **P3** = after GSC signal, **P4** = re-validate before building.
Score basis: SV × (1 − KD/100) × business fit (1–3) × conversion proximity (1–3), qualitative.

### Cluster 1 — v2.B (10 pages)

| # | URL | Family | Primary KW (SV/KD) | Secondary | Pri | Status |
|---|---|---|---|---|---|---|
| 1 | `/document-scanning-cost/` | F1 | document scanning cost (390/5) | cost to scan documents 390/14, price to scan documents 390/10, document scanning pricing 390/6, price per page 50/5 | P1 | ✓ built |
| 2 | `/document-scanning-services-alternative/` | F1 | document scanning services (590/7) | document digitization services 390/20, document digitizing service 390/12, document scanning companies 210/14, bulk document scanning 140/10 | P1 | ✓ built |
| 3 | `/archive-digitization/` | F2 | archive digitization (170/16) | archival scanning 210/8, archive scanning 210/4, archival scanning services 40/13 | P1 | ✓ built |
| 4 | `/searchable-archive/` | F2 | searchable archive (210/0) | full text search 590/6 (partial fit), archiving documents 320/5 | P1 | ✓ built |
| 5 | `/guides/digitizing-historical-documents/` | F5 pillar | digitizing historical documents (50/6) | how to digitize documents 110/10, digitizing documents 260/7, digitize records 90/7, scanning historical documents 30/15 | P1 | ✓ built |
| 6 | `/guides/handwriting-ocr/` | F5 | ocr handwriting (320/17) | convert handwriting to text 760/6, handwritten text recognition 480/32, best handwriting ocr 90/11, convert cursive to text 70/15, ocr cursive 40/14 | P1 | ✓ built |
| 7 | `/guides/file-naming-conventions/` | F5 + F6 tool | file naming conventions (660/12) | file naming convention examples 110/12, folder naming conventions 90/16, naming conventions for documents 70/29 | P1 | ✓ built |
| 8 | `/guides/nonprofit-document-retention-policy/` | F5 | nonprofit document retention policy (210/20) | records retention policy 480/5, document retention policy template 70/9, records retention schedule 720/7 (secondary only) | P1 | ✓ built |
| 9 | `/for/historical-societies/` | F3 | historical society archives (20/25) | historical society grants 50/13 | P1 (ICP) | ✓ built |
| 10 | `/for/museums/` | F3 | museum documentation (320/11) | museum collections management 70/13, accession records 50/7 | P1 (ICP) | ✓ built |
| u1 | `/guides/` | hub | — | — | utility | ✓ built |
| u2 | `/404` | utility | — | — | utility | ✓ built |

### Cluster 2 — v2.C (10 pages)

| # | URL | Family | Primary KW (SV/KD) | Secondary | Pri | Status |
|---|---|---|---|---|---|---|
| 11 | `/for/churches/` | F3 | church records (260/17) | church archives 70/12, church document retention policy 20/12 | P2 | planned |
| 12 | `/for/law-firms/` | F3 | legal document scanning (70/6) | law firm records management 10/7, law firm document retention policy 10/8 | P2 | planned |
| 13 | `/for/libraries/` | F3 | library digitization (110/13) | library digitization projects 10/13 | P2 | planned |
| 14 | `/guides/photographing-documents/` | F5 | how to scan without a scanner (50/13) | what dpi to scan documents 50/6 | P2 (product education) | planned |
| 15 | `/guides/how-to-preserve-old-documents/` | F5 | how to store old documents (90/6) | how to preserve old documents 90/19, archival quality 140/11, preserving old documents 30/19 | P2 | planned |
| 16 | `/guides/how-to-create-a-digital-archive/` | F5 | archiving documents (320/5) | how to create a digital archive 30/22, digital archiving 990/13 (verify trend) | P2 | planned |
| 17 | `/documents/newspaper-clippings/` | F4 | how to preserve old newspapers (390/6) | how to preserve newspaper clippings 140/7, digitize newspapers 30/12 | P2 | planned |
| 18 | `/documents/old-letters/` | F4 | how to preserve old letters (260/17) | — | P2 | planned |
| 19 | `/book-and-ledger-digitization/` | F2 | book scanning service (390/8) | how to digitize a book 140/19, how to scan a book 390/27 | P2 | planned |
| 20 | `/compare/digital-archive-software/` | F1 | digital archive software (140/7) | collection management software 210/19, archive management software 70/15, museum collection management software 50/36 | P2 | planned |

### Cluster 3 — v2.D (10 pages)

| # | URL | Family | Primary KW (SV/KD) | Pri | Status |
|---|---|---|---|---|---|
| 21 | `/guides/digitization-grants/` | F5 | historical society grants (50/13); digitization grants 30/15 | P3 (verify every program fact) | planned |
| 22 | `/guides/museum-collections-records/` | F5 | museum collections management (70/13) | P3 (avoid cannibalizing #10) | planned |
| 23 | `/guides/ocr-accuracy/` | F5 | ocr accuracy (90/13) | P3 | planned |
| 24 | `/guides/digital-preservation-basics/` | F5 | digital preservation (260/11) | P3 | planned |
| 25 | `/guides/church-records-retention/` | F5 | church document retention policy (20/12) | P3 | planned |
| 26 | `/guides/going-paperless-small-office/` | F5 | going paperless (480/11); how to go paperless 110/14 | P3 (law-firm angle) | planned |
| 27 | `/documents/scrapbooks/` | F4 | digitize scrapbooks (40/5) | P3 | planned |
| 28 | `/documents/church-registers/` | F4 | church records (secondary), baptism records (intent mismatch — don't target as primary) | P3 | planned |
| 29 | `/documents/accession-records/` | F4 | accession records (50/7) | P3 | planned |
| 30 | `/for/nonprofits/` | F3 | nonprofit document management (10/23, CPC 16.06) | P3 | planned |

### Cluster 4 — v2.E (10 pages, re-validate first)

| # | URL | Primary KW | Note | Status |
|---|---|---|---|---|
| 31 | `/guides/records-retention-schedule/` | records retention schedule (720/7) | build only if #8 ranks; SERP likely government schedules | planned |
| 32 | `/guides/law-firm-file-retention/` | law firm document retention policy (10/8) | needs state-bar sourcing | planned |
| 33 | `/guides/digitization-project-plan/` | digitization project (20/6) | | planned |
| 34 | `/guides/metadata-for-archives/` | n/d | AI-answer play only | planned |
| 35 | `/documents/board-minutes/` | board minutes (590/15, definitional) | intent mismatch risk | planned |
| 36 | `/documents/ledgers-and-account-books/` | n/d | | planned |
| 37 | `/documents/case-files/` | n/d | law-firm segment support | planned |
| 38 | `/compare/iron-mountain-alternative/` | iron mountain scanning (50/26), alternative (10/10, CPC 10.38) | needs sourced facts about the competitor | planned |
| 39 | `/compare/print-shop-scanning/` | staples document scanning (210/16), ups store scanning (170/16) | consumer intent — low fit | planned |
| 40 | `/compare/transkribus/` | transkribus (1,800/65, brand) | hard; only after #6 ranks | planned |

### Rejected / held

- **City / "near me" pages** (`scan documents near me` 1,500/45, `document scanning near me` 110/15): Boxchive is not a local bureau; SERPs are local-pack. Fake-local pages = spam. **Rejected.**
- **Medical records** (`medical records scanning` 170/9, `digitizing medical records` 90/17): implies HIPAA claims not approved. **Held.**
- **Document restoration** (260/6): physical conservation, not offered. **Rejected.**
- **Consumer phone-scanning** (`how to scan documents on iphone` 47,500/91, `document scanner app` 2,900/75): wrong buyer, KD too high. **Rejected.**
- **School / HOA / municipal / genealogy-society pages:** n/d. **Held** until GSC or outreach shows interest.

## 7. Per-page specs — cluster 1

Each spec: intent → outline → internal links. All pages end with the shared
assessment CTA (`/#assessment`) and a related-pages block.

### #1 `/document-scanning-cost/` — "How much does document scanning cost?"
- **Intent:** commercial investigation — buyer sizing a project / sanity-checking a quote.
- **Priority rationale:** four ~390-SV queries with KD 5–14 collapse into one SERP intent; closest informational query to a purchase decision; vendor-only SERP with no small-archive angle.
- **Outline:** direct answer with cited per-page range → table of published vendor figures (source + date) → what drives price (prep, staples, fragile/bound, color/dpi, OCR, indexing, pickup, return/shred) → box-to-pages math → **calculator** (boxes × pages/box × $/page low/high; all defaults are the cited figures, editable) → hidden costs for small archives (staff prep time, records leaving the building, re-boxing) → the phone-capture alternative (approved claims; pricing from `PRICING`) → FAQs.
- **Links out:** #2, #3, #5, #9. **Links in:** home (cost section), #2, #3, #9, #10, hub.

### #2 `/document-scanning-services-alternative/` — "An alternative to document scanning services"
- **Intent:** commercial — evaluating vendors.
- **Rationale:** highest commercial SV in the set (590, KD 7) plus 390/390/210 variants; local-pack SERP means we compete on honesty, not geography.
- **Outline:** what a scanning service does (pickup, prep, scan, index, QC, return/destroy) → the three ways to get there (vendor, in-house scanner, phone + Boxchive) comparison table (qualitative) → when a vendor is the right call → questions to ask any vendor → how Boxchive works (approved claims) → FAQs.
- **Links out:** #1, #3, #4, #6. **Links in:** home, #1, #3, hub.

### #3 `/archive-digitization/` — "Archive digitization for small organizations"
- **Intent:** commercial / solution.
- **Rationale:** archival + archive scanning (210 + 210, KD 4–8) + archive digitization (170) — the most on-brand commercial cluster.
- **Outline:** what archive digitization means (capture, text, description, access) → access copies vs preservation masters (FADGI; phone = access copy) → project phases → what to digitize first (use-driven triage) → how Boxchive handles each phase → limits → FAQs.
- **Links out:** #1, #4, #5, #7, #9, #10. **Links in:** home, #1, #2, #5, #9, #10.

### #4 `/searchable-archive/` — "What makes an archive searchable"
- **Intent:** solution / explainer.
- **Rationale:** 210 SV at KD 0 — the cheapest ranking opportunity found; directly describes the product outcome.
- **Outline:** answer-first definition → the three layers (text via OCR, structured fields — dates/names/types, consistent filing) → what searching looks like in practice (examples) → why handwriting breaks search and how review flags help → checklist to evaluate any "searchable" claim → FAQs.
- **Links out:** #3, #6, #7. **Links in:** #2, #3, #5, #6, #7, #10.

### #5 `/guides/digitizing-historical-documents/` — pillar
- **Intent:** informational, high-fit researcher (the ICP before they know Boxchive).
- **Rationale:** KD 6 primary + generic how-to cluster (110/260/90); SERP is office-paper focused → archival gap.
- **Outline:** answer-first 7-step summary → 1 inventory → 2 prioritize by use → 3 handle safely → 4 capture (flatbed vs overhead vs phone; resolution notes) → 5 name files (link #7) → 6 make text searchable (link #4, #6) → 7 store & back up (3-2-1) → common mistakes → FAQs.
- **Links out:** #3, #4, #6, #7, #8. **Links in:** hub, #3, #9, #10.

### #6 `/guides/handwriting-ocr/` — "Handwriting OCR for old records"
- **Intent:** informational / tool-evaluation.
- **Rationale:** largest low-KD informational demand (760 at KD 6 + 320 + 480 cluster); handwritten ledgers are the ICP's hardest pages.
- **Outline:** answer-first (OCR vs handwritten text recognition) → why historical handwriting is hard (scripts, ink fade, abbreviations, layouts) → your options (free phone/OCR tools, dedicated HTR platforms e.g. Transkribus, human transcription/volunteers, service with review) → how to get the best results from photos → how Boxchive treats handwriting (flag + human review — approved claim 7) → FAQs.
- **Links out:** #4, #5, #9. **Links in:** #2, #4, #5, #9, #10.

### #7 `/guides/file-naming-conventions/` — "File naming conventions for scanned records"
- **Intent:** informational (how-to + examples).
- **Rationale:** 660 SV at KD 12; ties to approved claim 5 (files into your convention).
- **Outline:** answer-first rules → the rules explained (ISO 8601 dates, no spaces/special chars, leading zeros, fixed element order, short controlled vocabulary) → patterns for minutes / correspondence / registers / case files → **file-name builder tool** → folder structure → documenting your convention → FAQs.
- **Links out:** #4, #5, #3. **Links in:** #3, #4, #5.

### #8 `/guides/nonprofit-document-retention-policy/` — "Nonprofit document retention policy: what to keep, digitize, or destroy"
- **Intent:** informational (governance).
- **Rationale:** 210 at KD 20 + 480 at KD 5 (records retention policy); the decision that precedes "what do we digitize".
- **Outline:** answer-first (what it is; Form 990 Part VI asks about it) → why it matters (Form 990, federal document-destruction law) → what a policy contains → categories table (permanent governance docs; tax-related per IRS general guidance; set-with-counsel others) → digitize-vs-keep-paper decision → template structure → FAQs. **Not legal advice** banner; every period cited or marked "set with counsel".
- **Links out:** #5, #7, #9. **Links in:** #5, #9, hub.

### #9 `/for/historical-societies/`
- **Intent:** conversion (outreach / referral / AI answers).
- **Outline:** records typically held (minutes, membership rolls, newsletters, scrapbooks, clippings, registers, correspondence) → constraints (volunteers, no IT, records can't leave) → volunteer phone workflow → what to digitize first → grants note (link #5/#21 later) → FAQs → CTA.
- **Links out:** #1, #3, #5, #6, #8. **Links in:** home (who it's for), #1, #3, #6, #8.

### #10 `/for/museums/`
- **Intent:** conversion.
- **Outline:** institutional records vs collection objects (Boxchive does paper records, not object imaging) → records typically held (accession files, deeds of gift, loan agreements, board minutes, curatorial correspondence, exhibition files) → relationship to collection management software (Boxchive doesn't replace it; no integration claimed) → workflow → FAQs → CTA.
- **Links out:** #1, #3, #4, #6. **Links in:** home, #1, #3.

## 8. Internal linking map

- **Header nav (all pages):** Archive digitization · Cost · Who it's for (Historical societies, Museums) · Guides · Free assessment (CTA).
- **Footer (all pages):** every published page, grouped by family. Generated from `src/data/pages.ts` — add new pages there and they appear in the footer, hub, `llms.txt` and related blocks.
- **Homepage → inner:** cost section → #1; who-it's-for cards → #9 / #10; how-it-works → #3; handwritten note → #6.
- **Related block:** each page declares 3–5 related paths in its frontmatter; specs in § 7 list them.
- **CTA:** every inner page ends with the assessment block linking `/#assessment` (single form, no duplicate forms).

## 9. Placeholders and blockers

| Item | Where | Effect while open |
|---|---|---|
| Pricing | `src/data/pricing.ts` (`PRICING = null`, `TODO(operator)`) | Pages render "quoted after a free assessment"; no price in JSON-LD |
| Lead form endpoint | `src/pages/index.astro` `data-endpoint="TODO_FORMSPREE_ENDPOINT"` | **Submissions are discarded** — the SEO pages drive traffic to a form that loses leads |
| `@boxchive` handle | `src/layouts/BaseLayout.astro` | Possibly points to an account the operator doesn't own |

**Not ready to deploy as "lead capture works"** until the form endpoint is
real. The pages themselves contain no visible placeholder text.

## 10. Status log

- **2026-10-30 — v2.A ✓** audit + research + plan (this doc). treg spend ≈ $0.68.
- **2026-10-30 — v2.B (in progress)** audit fixes A2–A7 and cluster 1 (#1–#10 + hub + 404) built; build + tests green locally in the sites1 image. Not committed/deployed. Next: operator review → fill A1 (form) → deploy → verify GSC (A10) → log growth.md baseline → 28-day review before starting v2.C.

## 11. Next priorities

1. **Operator:** form endpoint (A1), pricing decision, GSC verification (A10).
2. After deploy: submit sitemap, IndexNow ping for the 12 new URLs, add growth.md baseline.
3. 28-day review against § 6 cluster-1 KWs in GSC; promote/demote cluster 2 by what gets impressions.
4. v2.C build order: #14 (product education, supports conversions) → #11 → #17 → #19 → #20 → rest.
