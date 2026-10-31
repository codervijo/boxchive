// Registry of published content pages. Header, footer, the /guides/ hub,
// related-page blocks and /llms.txt all read from here — add a page here when
// it ships. Plan + keyword data: docs/seo-content-plan.md.

export type Family = "solutions" | "audiences" | "guides";

export interface PageEntry {
  path: string;
  /** Short label for nav, footer and related cards. */
  label: string;
  family: Family;
  /** One-line summary for related cards, the hub and llms.txt. */
  summary: string;
}

export const PAGES: PageEntry[] = [
  {
    path: "/archive-digitization/",
    label: "Archive digitization",
    family: "solutions",
    summary:
      "How small organizations turn boxes of records into a searchable digital archive — phases, choices, and limits.",
  },
  {
    path: "/searchable-archive/",
    label: "Searchable archives",
    family: "solutions",
    summary:
      "What actually makes an archive searchable: OCR text, extracted dates and names, and consistent filing.",
  },
  {
    path: "/document-scanning-cost/",
    label: "Document scanning cost",
    family: "solutions",
    summary:
      "Published per-page and per-box scanning prices, what drives them, and a calculator for your boxes.",
  },
  {
    path: "/document-scanning-services-alternative/",
    label: "Scanning-service alternative",
    family: "solutions",
    summary:
      "Scanning vendor, in-house scanner, or phone capture — when each is the right call.",
  },
  {
    path: "/for/historical-societies/",
    label: "Historical societies",
    family: "audiences",
    summary:
      "A volunteer-friendly way to make minutes, rolls, scrapbooks and clippings searchable without sending them away.",
  },
  {
    path: "/for/museums/",
    label: "Museums",
    family: "audiences",
    summary:
      "Making accession files, deeds of gift, loan agreements and institutional records searchable.",
  },
  {
    path: "/guides/digitizing-historical-documents/",
    label: "Digitizing historical documents",
    family: "guides",
    summary:
      "A seven-step guide to digitizing old and fragile records, from inventory to backup.",
  },
  {
    path: "/guides/handwriting-ocr/",
    label: "Handwriting OCR for old records",
    family: "guides",
    summary:
      "Why handwriting defeats ordinary OCR, what your options are, and how to get usable text from old pages.",
  },
  {
    path: "/guides/file-naming-conventions/",
    label: "File naming conventions",
    family: "guides",
    summary:
      "Rules, examples and a file-name builder for scanned and photographed records.",
  },
  {
    path: "/guides/nonprofit-document-retention-policy/",
    label: "Nonprofit document retention policy",
    family: "guides",
    summary:
      "What a retention policy covers, what to keep permanently, and how to decide what to digitize.",
  },
];

export const FAMILY_LABELS: Record<Family, string> = {
  solutions: "Solutions",
  audiences: "Who it's for",
  guides: "Guides",
};

export function byFamily(family: Family): PageEntry[] {
  return PAGES.filter((p) => p.family === family);
}

export function findPages(paths: string[]): PageEntry[] {
  return paths
    .map((path) => PAGES.find((p) => p.path === path))
    .filter((p): p is PageEntry => Boolean(p));
}
