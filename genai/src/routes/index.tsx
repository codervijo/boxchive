import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import heroArchive from "@/assets/hero-archive.jpg";
import phoneDocument from "@/assets/phone-document.jpg";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      {
        title:
          "Boxchive — Digitize old paper archives without a $50K vendor quote",
      },
      {
        name: "description",
        content:
          "Boxchive turns phone photos of old paper documents into a searchable, organized digital archive. A practical alternative to enterprise scanning for museums, historical societies, law firms, churches, and libraries — from about $100/month.",
      },
      {
        name: "keywords",
        content:
          "digitize museum archives cost, scan old documents historical society, document digitization without enterprise vendor, archive OCR, church records digitization, law firm file digitization",
      },
      {
        property: "og:title",
        content: "Boxchive — Digitize old paper archives without a $50K vendor quote",
      },
      {
        property: "og:description",
        content:
          "Photograph the pages with a phone. Boxchive reads, sorts, and files them into a searchable archive — from about $100/month.",
      },
      { property: "og:url", content: "/" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: heroArchive },
      { name: "twitter:title", content: "Boxchive — Digitize old paper archives" },
      {
        name: "twitter:description",
        content:
          "A subscription alternative to $50K enterprise scanning. Phone photos in, searchable archive out.",
      },
      { name: "twitter:image", content: heroArchive },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "Document digitization and archival OCR",
          provider: {
            "@type": "Organization",
            name: "Boxchive",
          },
          areaServed: "United States",
          audience: {
            "@type": "Audience",
            audienceType:
              "Museums, historical societies, law firms, churches and religious organizations, libraries",
          },
          description:
            "Boxchive turns phone photos of old paper documents into a searchable, organized digital archive. OCR, date and name extraction, document-type classification, and naming-convention–aware filing.",
          offers: {
            "@type": "AggregateOffer",
            priceCurrency: "USD",
            lowPrice: "100",
            highPrice: "500",
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              billingIncrement: 1,
              unitCode: "MON",
              price: "100-500",
              priceCurrency: "USD",
            },
          },
        }),
      },
    ],
  }),
});

function Index() {
  return (
    <main className="relative">
      <Header />
      <Hero />
      <CostContrast />
      <HowItWorks />
      <WhoFor />
      <HonestNote />
      <LeadForm />
      <Footer />
    </main>
  );
}

function Header() {
  return (
    <header className="container-prose pt-8 pb-6 flex items-center justify-between">
      <a href="/" className="flex items-center gap-2">
        <span className="font-serif text-2xl tracking-tight">Boxchive</span>
        <span className="eyebrow hidden sm:inline">Est. for archives</span>
      </a>
      <a href="#assessment" className="btn-ghost text-sm">
        Free assessment →
      </a>
    </header>
  );
}

function Hero() {
  return (
    <section className="container-prose pt-10 pb-24 md:pt-16 md:pb-32 grid md:grid-cols-12 gap-10 items-center">
      <div className="md:col-span-7">
        <p className="eyebrow mb-6">A digital archive, without the vendor quote</p>
        <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.02] tracking-tight">
          Decades of paper.
          <span className="block italic text-[color:var(--oxblood)]">
            Finally searchable.
          </span>
        </h1>
        <p className="mt-8 text-lg md:text-xl text-[color:var(--ink-soft)] max-w-xl leading-relaxed">
          Boxes of board minutes, donor letters, case files, registries, and church records —
          impossible to search, too expensive to professionally scan. Boxchive turns phone photos of
          those pages into a keyword-searchable, organized archive.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-6">
          <a href="#assessment" className="btn-primary">
            Get a free digitization assessment
          </a>
          <a href="#cost" className="btn-ghost">See how the cost compares</a>
        </div>
      </div>
      <div className="md:col-span-5">
        <figure className="relative">
          <div className="absolute -inset-2 bg-[color:var(--paper-deep)] -rotate-1" aria-hidden />
          <img
            src={heroArchive}
            alt="Stacks of weathered banker's boxes with aged paper documents in an archival storage room"
            width={1600}
            height={1100}
            className="relative w-full h-auto object-cover shadow-[0_30px_60px_-30px_rgba(60,40,20,0.5)]"
          />
          <figcaption className="mt-3 text-xs text-[color:var(--ink-soft)] italic">
            Every organization has boxes like these.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

function CostContrast() {
  return (
    <section id="cost" className="bg-[color:var(--paper-deep)] border-y border-[color:var(--rule)]">
      <div className="container-prose py-20 md:py-28">
        <p className="eyebrow mb-6">The honest cost comparison</p>
        <h2 className="font-serif text-4xl md:text-5xl max-w-3xl leading-tight">
          A $50,000 enterprise scanning quote, or one phone and one subscription.
        </h2>
        <div className="mt-14 grid md:grid-cols-2 gap-px bg-[color:var(--rule)] border border-[color:var(--rule)]">
          <div className="bg-[color:var(--paper-deep)] p-8 md:p-10">
            <p className="eyebrow mb-4">Enterprise scanning vendor</p>
            <p className="font-serif text-5xl md:text-6xl">~$50,000</p>
            <ul className="mt-6 space-y-3 text-[color:var(--ink-soft)]">
              <li>— On-site or shipped-out scanning</li>
              <li>— Capital project, board approval, RFPs</li>
              <li>— Long timelines; records leave the building</li>
              <li>— Quote-based, often opaque pricing</li>
            </ul>
          </div>
          <div className="bg-[color:var(--paper)] p-8 md:p-10">
            <p className="eyebrow mb-4 text-[color:var(--oxblood)]">Boxchive</p>
            <p className="font-serif text-5xl md:text-6xl">
              $100<span className="text-2xl align-top">–</span>$500
              <span className="text-2xl text-[color:var(--ink-soft)]"> / month</span>
            </p>
            <ul className="mt-6 space-y-3 text-[color:var(--ink-soft)]">
              <li>— A volunteer, a phone, and a subscription</li>
              <li>— Records stay on your shelves</li>
              <li>— Complex processing around $0.05 / page</li>
              <li>— Cancel when the boxes are done</li>
            </ul>
          </div>
        </div>
        <p className="mt-8 text-sm text-[color:var(--ink-soft)] italic max-w-2xl">
          Pricing depends on volume and material complexity. We'll give you a real number after a
          free assessment — not a six-figure ballpark.
        </p>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      n: "I",
      title: "Photograph the pages",
      body:
        "A staff member or volunteer photographs documents with any modern phone. No scanners, no shipping, no chain-of-custody paperwork. Records stay where they belong.",
    },
    {
      n: "II",
      title: "Read and extract",
      body:
        "Boxchive runs OCR on every page and extracts dates, names, and other entities — even from imperfect photos and aged paper.",
    },
    {
      n: "III",
      title: "Sort and file",
      body:
        "Pages are classified by document type — minutes, correspondence, registries, case files — and filed using your organization's existing naming convention.",
    },
    {
      n: "IV",
      title: "Search the archive",
      body:
        "Your finished archive is fully keyword-searchable. Find a donor letter from 1962 or every mention of a family name in under a second.",
    },
  ];
  return (
    <section className="container-prose py-24 md:py-32">
      <div className="grid md:grid-cols-12 gap-10 mb-16">
        <div className="md:col-span-5">
          <p className="eyebrow mb-6">How it works</p>
          <h2 className="font-serif text-4xl md:text-5xl leading-tight">
            From a box on the shelf to a searchable archive.
          </h2>
        </div>
        <div className="md:col-span-6 md:col-start-7">
          <img
            src={phoneDocument}
            alt="A phone photographing an aged handwritten ledger page on a wooden desk"
            width={1400}
            height={1000}
            loading="lazy"
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
      <div className="rule mb-12" />
      <ol className="grid md:grid-cols-2 gap-x-12 gap-y-14">
        {steps.map((s) => (
          <li key={s.n} className="grid grid-cols-[auto_1fr] gap-6">
            <span className="font-serif italic text-3xl text-[color:var(--oxblood)] leading-none">
              {s.n}.
            </span>
            <div>
              <h3 className="font-serif text-2xl mb-2">{s.title}</h3>
              <p className="text-[color:var(--ink-soft)] leading-relaxed">{s.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

function WhoFor() {
  const groups = [
    {
      label: "Museums",
      body:
        "Preserve heritage collections, make accession files and curatorial records searchable, and support access projects, grant reporting, and exhibition research.",
    },
    {
      label: "Historical societies",
      body:
        "Rescue local records from boxes, filing cabinets, and back rooms. Make minutes, photographs, registers, and ephemera searchable for members and researchers.",
    },
    {
      label: "Law firms",
      body:
        "Bring old matter archives and closed case files under retention control. Retrieve correspondence, exhibits, and engagement records by client, party, or date.",
    },
    {
      label: "Churches & religious organizations",
      body:
        "Digitize baptism, marriage, and burial registries, council minutes, donor letters, and community history — without sending irreplaceable books off-site.",
    },
    {
      label: "Libraries",
      body:
        "Make local history collections, vertical files, and special collections searchable for patrons doing genealogical, civic, or academic research.",
    },
  ];
  return (
    <section className="bg-[color:var(--paper-deep)] border-y border-[color:var(--rule)]">
      <div className="container-prose py-24 md:py-32">
        <p className="eyebrow mb-6">Who this is for</p>
        <h2 className="font-serif text-4xl md:text-5xl max-w-3xl leading-tight mb-16">
          Different records. Same problem. We speak each of your languages.
        </h2>
        <div className="grid md:grid-cols-2 gap-x-12">
          {groups.map((g, i) => (
            <article
              key={g.label}
              className={`py-8 border-t border-[color:var(--rule)] ${
                i === groups.length - 1 ? "md:border-b" : ""
              }`}
            >
              <h3 className="font-serif text-2xl md:text-3xl mb-3">{g.label}</h3>
              <p className="text-[color:var(--ink-soft)] leading-relaxed max-w-xl">{g.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function HonestNote() {
  return (
    <section className="container-prose py-24 md:py-28">
      <div className="max-w-3xl">
        <p className="eyebrow mb-6">A note on handwritten and fragile material</p>
        <p className="font-serif text-2xl md:text-3xl leading-snug">
          We won't pretend OCR is perfect on a century-old ledger.
        </p>
        <p className="mt-6 text-[color:var(--ink-soft)] leading-relaxed">
          Typed and printed records OCR cleanly. Handwritten, faded, water-damaged, and otherwise
          fragile pages are flagged and human-reviewed for quality before they land in your archive.
          You get an honest record of what was confidently transcribed and what needs a second pair
          of eyes — not a false sense of completeness.
        </p>
      </div>
    </section>
  );
}

function LeadForm() {
  const [submitted, setSubmitted] = useState(false);

  // TODO: Replace with your Formspree (or similar) endpoint, e.g. https://formspree.io/f/xxxxxxx
  const FORM_ENDPOINT = "TODO_FORMSPREE_ENDPOINT";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      if (FORM_ENDPOINT && !FORM_ENDPOINT.startsWith("TODO")) {
        await fetch(FORM_ENDPOINT, {
          method: "POST",
          body: data,
          headers: { Accept: "application/json" },
        });
      }
      setSubmitted(true);
      form.reset();
    } catch {
      setSubmitted(true);
    }
  }

  return (
    <section
      id="assessment"
      className="bg-[color:var(--ink)] text-[color:var(--paper)] relative"
    >
      <div className="container-prose py-24 md:py-32 grid md:grid-cols-12 gap-12">
        <div className="md:col-span-5">
          <p className="eyebrow mb-6" style={{ color: "oklch(0.78 0.04 70)" }}>
            Free digitization assessment
          </p>
          <h2 className="font-serif text-4xl md:text-5xl leading-tight text-[color:var(--paper)]">
            Find out what your archive would actually cost.
          </h2>
          <p className="mt-6 text-[color:var(--paper-deep)] leading-relaxed opacity-90">
            Tell us a little about your boxes. We'll come back with a realistic monthly estimate, a
            sample workflow tailored to your records, and an honest read on whether Boxchive is the
            right fit — or whether you genuinely do need a traditional scanning vendor.
          </p>
          <ul className="mt-8 space-y-3 text-sm opacity-90">
            <li>— No sales call required</li>
            <li>— No six-figure ballpark</li>
            <li>— We'll tell you if we're not the right fit</li>
          </ul>
        </div>

        <div className="md:col-span-7">
          {submitted ? (
            <div className="bg-[color:var(--paper)] text-[color:var(--ink)] p-10">
              <h3 className="font-serif text-3xl mb-3">Thank you.</h3>
              <p className="text-[color:var(--ink-soft)] leading-relaxed">
                We'll review what you sent and reply within two business days with a realistic
                estimate and next steps. If your boxes need a traditional vendor, we'll say so.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-[color:var(--paper)] text-[color:var(--ink)] p-8 md:p-10 grid gap-6"
            >
              <Field label="Organization name" name="organization" required />

              <SelectField
                label="Organization type"
                name="org_type"
                required
                options={[
                  "Museum",
                  "Historical society",
                  "Law firm",
                  "Church or religious org",
                  "Library",
                  "Other",
                ]}
              />

              <SelectField
                label="Approximate volume"
                name="volume"
                required
                options={["Under 5 boxes", "5–20 boxes", "20+ boxes", "Not sure"]}
              />

              <fieldset>
                <legend className="eyebrow mb-3 text-[color:var(--ink-soft)]">
                  Material type
                </legend>
                <div className="flex flex-wrap gap-5">
                  {["Typed/printed", "Handwritten", "Mixed"].map((m) => (
                    <label key={m} className="inline-flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        name="material"
                        value={m}
                        className="accent-[color:var(--oxblood)] h-4 w-4"
                      />
                      {m}
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="grid sm:grid-cols-2 gap-6">
                <Field label="Name" name="name" required />
                <Field label="Email" name="email" type="email" required />
              </div>

              <button type="submit" className="btn-primary justify-self-start mt-2">
                Request my free assessment
              </button>
              <p className="text-xs text-[color:var(--ink-soft)]">
                We use your details only to reply to this inquiry. No newsletters, no resale.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="eyebrow block mb-2 text-[color:var(--ink-soft)]">
        {label} {required && <span className="text-[color:var(--oxblood)]">*</span>}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full border-0 border-b border-[color:var(--rule)] bg-transparent py-2 text-base text-[color:var(--ink)] focus:outline-none focus:border-[color:var(--oxblood)] transition-colors"
      />
    </label>
  );
}

function SelectField({
  label,
  name,
  options,
  required,
}: {
  label: string;
  name: string;
  options: string[];
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="eyebrow block mb-2 text-[color:var(--ink-soft)]">
        {label} {required && <span className="text-[color:var(--oxblood)]">*</span>}
      </span>
      <select
        name={name}
        required={required}
        defaultValue=""
        className="w-full border-0 border-b border-[color:var(--rule)] bg-transparent py-2 text-base text-[color:var(--ink)] focus:outline-none focus:border-[color:var(--oxblood)]"
      >
        <option value="" disabled>
          Select one…
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[color:var(--rule)]">
      <div className="container-prose py-10 flex flex-wrap items-center justify-between gap-4 text-sm text-[color:var(--ink-soft)]">
        <p>
          <span className="font-serif text-base text-[color:var(--ink)]">Boxchive</span> ·
          Searchable archives for institutions with long memories.
        </p>
        <p>© {new Date().getFullYear()} Boxchive.</p>
      </div>
    </footer>
  );
}
