// Single source of truth for Boxchive pricing.
//
// TODO(operator): pricing is not set yet (confirmed 2026-10-30). While this is
// `null`, every page renders neutral "quoted after a free assessment" copy and
// no price is emitted in structured data. Fill this in to publish prices
// site-wide — do not hard-code prices in page copy.

export interface Pricing {
  /** Lowest monthly subscription, USD. */
  monthlyFrom: number;
  /** Highest typical monthly subscription, USD. */
  monthlyTo: number;
  /** Optional per-page rate for complex material, USD. */
  perPageComplex?: number;
}

export const PRICING: Pricing | null = null;

export const PRICING_FALLBACK =
  "Pricing is quoted per project after a free assessment of your records.";

export function pricingSummary(): string {
  if (!PRICING) return PRICING_FALLBACK;
  return `From $${PRICING.monthlyFrom}–$${PRICING.monthlyTo} per month.`;
}
