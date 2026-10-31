// /llms.txt — plain-text map of canonical pages for AI answer engines.
// Generated from src/data/pages.ts so it never drifts from the site.
import type { APIRoute } from "astro";
import { byFamily, FAMILY_LABELS, type Family } from "../data/pages";

export const GET: APIRoute = ({ site }) => {
  const origin = (site ?? new URL("https://boxchive.com")).origin;
  const families: Family[] = ["solutions", "audiences", "guides"];
  const lines = [
    "# Boxchive",
    "",
    "> Boxchive turns phone photos of old paper documents into a searchable, organized digital archive for small museums, historical societies, churches, libraries and law firms. Staff or volunteers photograph pages; Boxchive runs OCR, extracts dates and names, classifies pages by document type, files them under the organization's naming convention, and flags handwritten or damaged pages for human review. Originals stay on-site.",
    "",
    `- [Home and free assessment](${origin}/)`,
    `- [All guides](${origin}/guides/)`,
  ];
  for (const f of families) {
    lines.push("", `## ${FAMILY_LABELS[f]}`, "");
    for (const p of byFamily(f)) lines.push(`- [${p.label}](${origin}${p.path}): ${p.summary}`);
  }
  return new Response(lines.join("\n") + "\n", {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
