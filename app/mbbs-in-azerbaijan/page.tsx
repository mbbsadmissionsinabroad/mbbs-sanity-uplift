import { buildStaticPageMetadata } from "@/lib/staticPageSeo";
import StaticPageResourceLinks from "@/app/components/StaticPageResourceLinks";
import type { Metadata } from "next";
import Link from "next/link";
import AzerbaijanLeadSection from "./AzerbaijanLeadSection";
import {
  additionalCosts,
  advantages,
  articleSchema,
  azerbaijanFmgeNotes,
  careerPathways,
  comparison,
  disadvantages,
  documents,
  eligibility,
  eligibilityNotes,
  faqSchema,
  faqs,
  feeBreakdown,
  fmgeContext,
  highlights,
  ivrNumber,
  keyFacts,
  lastUpdated,
  licensingSteps,
  livingCosts,
  metaDescription,
  metaTitle,
  pageTitle,
  pageUrl,
  quickSummary,
  recognition,
  scholarships,
  syllabus,
  timeline,
  universities,
  whatsappHref,
  whatsappNumber,
} from "./pageData";

type Row = Record<string, string | undefined>;

export async function generateMetadata(): Promise<Metadata> {
  return buildStaticPageMetadata({
    route: "/mbbs-in-azerbaijan",
    fallbackTitle: metaTitle,
    fallbackDescription: metaDescription,
    fallbackCanonical: pageUrl,
  });
}


function SectionHeading({
  eyebrow,
  title,
  description,
  theme = "light",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  theme?: "light" | "dark";
}) {
  const dark = theme === "dark";
  return (
    <div className="max-w-3xl">
      <p className={`text-sm font-semibold uppercase tracking-[0.3em] ${dark ? "text-sky-300" : "text-sky-700"}`}>
        {eyebrow}
      </p>
      <h2 className={`mt-3 text-3xl font-bold tracking-tight md:text-4xl ${dark ? "text-white" : "text-slate-900"}`}>
        {title}
      </h2>
      {description ? (
        <p className={`mt-4 text-base leading-7 md:text-lg ${dark ? "text-slate-300" : "text-slate-600"}`}>
          {description}
        </p>
      ) : null}
    </div>
  );
}

function DataTable({ rows }: { rows: Row[] }) {
  const headers = Object.keys(rows[0] ?? {});
  return (
    <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.06)]">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-left text-sm" itemScope itemType="https://schema.org/Table">
          <caption className="sr-only">Azerbaijan medicine data table</caption>
          <thead className="bg-slate-950 text-white">
            <tr itemScope itemType="https://schema.org/TableRow">
              {headers.map((header) => (
                <th key={header} scope="col" className="whitespace-nowrap px-4 py-4 font-semibold">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((row, index) => (
              <tr key={`${Object.values(row).join("-")}-${index}`} className="align-top odd:bg-white even:bg-slate-50/60" itemScope itemType="https://schema.org/TableRow">
                {headers.map((header) => (
                  <td key={header} className="px-4 py-4 text-slate-700">
                    {row[header]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function AzerbaijanPage() {
  return (
    <main className="bg-[linear-gradient(180deg,#eff6ff_0%,#f8fafc_28%,#ffffff_65%)] text-slate-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className="relative overflow-hidden border-b border-sky-100">
        <div className="absolute inset-x-0 top-0 h-[34rem] bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.18),_transparent_35%),radial-gradient(circle_at_top_right,_rgba(14,165,233,0.12),_transparent_30%),linear-gradient(180deg,_rgba(255,255,255,0.96),_rgba(255,255,255,0.86))]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-20">
          <div>
            <div className="inline-flex rounded-full border border-sky-200 bg-white/90 px-4 py-2 text-sm font-medium text-sky-900 shadow-sm">
              Azerbaijan 2026-27 medical admissions guide for Indian students
            </div>
            <h1 className="mt-6 max-w-4xl text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
              {pageTitle}
            </h1>
            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
              Last Updated: {lastUpdated}
            </p>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700 md:text-xl">
              Azerbaijan is often shortlisted by Indian students who want an English-medium, cost-conscious medicine route. The smart choice here is not just the cheapest option, but the one that still works for your final licensing plan.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#quick-summary" className="rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">Start With Summary</a>
              <a href={whatsappHref} target="_blank" rel="noreferrer" className="rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition hover:brightness-95">WhatsApp {whatsappNumber}</a>
              <a href="#fees" className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-500 hover:text-slate-950">See Fees</a>
              <a href="#azerbaijan-contact-form" className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-500 hover:text-slate-950">Request Callback</a>
              <a href={`tel:${ivrNumber.replace(/\s+/g, "")}`} className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-500 hover:text-slate-950">Call IVR</a>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {highlights.map((item) => (
                <div key={item} className="rounded-3xl border border-white/80 bg-white/90 p-5 shadow-[0_10px_35px_rgba(15,23,42,0.07)] backdrop-blur">
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-700">Key reason</p>
                  <p className="mt-3 text-base leading-7 text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <aside className="self-start rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_30px_80px_rgba(15,23,42,0.08)] lg:sticky lg:top-28">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">On this page</p>
            <div className="mt-5 space-y-3">
              {[
                ["#quick-summary", "Quick summary"],
                ["#timeline", "2026 timeline"],
                ["#universities", "Top universities"],
                ["#fees", "Fees breakdown"],
                ["#fmge", "FMGE context"],
                ["#faq", "FAQ section"],
              ].map(([href, label]) => (
                <a key={href} href={href} className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-sky-300 hover:bg-sky-50 hover:text-sky-900">
                  <span>{label}</span>
                  <span aria-hidden="true">+</span>
                </a>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section id="quick-summary" className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <SectionHeading eyebrow="Quick Summary" title="A fast Azerbaijan snapshot before you go deeper" />
        <div className="mt-10 grid gap-5 lg:grid-cols-5">
          {quickSummary.map((item) => (
            <article key={item.feature} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.05)]">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-700">{item.feature}</p>
              <p className="mt-4 text-base leading-7 text-slate-700">{item.details}</p>
            </article>
          ))}
        </div>
        <div className="mt-8 rounded-[28px] border border-sky-200 bg-sky-50 p-5 text-sm leading-7 text-sky-950">
          In Azerbaijan, Indian students usually refer to the General Medicine or MD route as MBBS for convenience. The important question is not the label, but the degree's real licensing usability for your target country.
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <SectionHeading eyebrow="Key Facts" title="At-a-glance Azerbaijan medicine facts for 2026-27" />
        <div className="mt-10"><DataTable rows={keyFacts} /></div>
      </section>

      <section id="timeline" className="bg-slate-950 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading eyebrow="Timeline" title="Admission planning for the Azerbaijan route" theme="dark" />
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {timeline.map((item) => (
              <div key={`${item.Month}-${item.Action}`} className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-300">{item.Month}</p>
                <p className="mt-4 text-base leading-7 text-slate-200">{item.Action}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <SectionHeading eyebrow="Eligibility" title="Minimum criteria Indian students should meet" />
        <div className="mt-10"><DataTable rows={eligibility} /></div>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {eligibilityNotes.map((note) => (
            <div key={note} className="rounded-3xl border border-slate-200 bg-slate-50 p-5 text-sm leading-7 text-slate-700">
              {note.includes("/mbbs-without-neet") ? (
                <>
                  The India-return rule context matters here too.{" "}
                  <Link href="/mbbs-without-neet" className="font-semibold text-sky-700 underline underline-offset-4">
                    Read the full explanation
                  </Link>.
                </>
              ) : (
                note
              )}
            </div>
          ))}
        </div>
      </section>

      <section id="universities" className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading eyebrow="Universities" title="Azerbaijan options Indian students usually research" />
          <div className="mt-10"><DataTable rows={universities} /></div>
          <p className="mt-6 rounded-3xl border border-amber-200 bg-amber-50 p-5 text-sm leading-7 text-amber-900">
            Do not treat every low-cost private option as equally safe. Recognition confidence is the real differentiator in Azerbaijan, not just annual tuition.
          </p>
        </div>
      </section>

      <section id="fees" className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <SectionHeading eyebrow="Fees Breakdown" title="Transparent budgeting before you choose Azerbaijan" />
        <div className="mt-10"><DataTable rows={feeBreakdown} /></div>
        <h3 className="mt-10 text-xl font-bold text-slate-900">Other major yearly costs</h3>
        <div className="mt-5"><DataTable rows={additionalCosts} /></div>
      </section>

      <section id="fmge" className="bg-[linear-gradient(180deg,#f8fafc_0%,#eff6ff_100%)] py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading eyebrow="FMGE Context" title="India licensing context for Azerbaijan graduates" />
          <div className="mt-10 grid gap-8 xl:grid-cols-2">
            <div>
              <h3 className="mb-4 text-xl font-bold text-slate-900">Recent India-wide FMGE context</h3>
              <DataTable rows={fmgeContext} />
            </div>
            <div>
              <h3 className="mb-4 text-xl font-bold text-slate-900">How to interpret Azerbaijan for India return</h3>
              <DataTable rows={azerbaijanFmgeNotes} />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <SectionHeading eyebrow="Recognition" title="Which bodies matter for an Azerbaijan medical degree" />
        <div className="mt-10"><DataTable rows={recognition} /></div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading eyebrow="Curriculum" title="Year-wise Azerbaijan medicine structure" />
          <div className="mt-10"><DataTable rows={syllabus} /></div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <SectionHeading eyebrow="Licensing" title="What happens after graduation" />
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {licensingSteps.map((step, index) => (
            <article key={step} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_16px_40px_rgba(15,23,42,0.04)]">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-700">Step {index + 1}</p>
              <p className="mt-4 text-base leading-7 text-slate-700">{step}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading eyebrow="Living Costs" title="A realistic monthly budget for Azerbaijan" />
          <div className="mt-10"><DataTable rows={livingCosts} /></div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <SectionHeading eyebrow="Pros and Cons" title="The honest Azerbaijan trade-off for Indian students" />
        <div className="mt-10 grid gap-8 xl:grid-cols-2">
          <div className="rounded-[32px] border border-emerald-200 bg-emerald-50 p-8">
            <h3 className="text-2xl font-bold text-emerald-900">Advantages</h3>
            <div className="mt-6 space-y-4">
              {advantages.map((item) => (
                <div key={item} className="rounded-2xl bg-white/80 p-4 text-sm leading-7 text-slate-700">{item}</div>
              ))}
            </div>
          </div>
          <div className="rounded-[32px] border border-red-200 bg-red-50 p-8">
            <h3 className="text-2xl font-bold text-red-900">Disadvantages</h3>
            <div className="mt-6 space-y-4">
              {disadvantages.map((item) => (
                <div key={item} className="rounded-2xl bg-white/80 p-4 text-sm leading-7 text-slate-700">{item}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading eyebrow="Comparison" title="How Azerbaijan compares with common alternatives" theme="dark" />
          <div className="mt-10"><DataTable rows={comparison} /></div>
          <p className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-5 text-sm leading-7 text-slate-300">
            If low total cost is your main filter, also compare{" "}
            <Link href="/mbbs-in-uzbekistan" className="font-semibold text-sky-300 underline underline-offset-4">
              MBBS in Uzbekistan 2026
            </Link>. For an EU-oriented route, review{" "}
            <Link href="/mbbs-in-germany" className="font-semibold text-sky-300 underline underline-offset-4">
              MBBS in Germany for free
            </Link>.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <SectionHeading eyebrow="Scholarships and Loans" title="Funding options worth checking" />
        <div className="mt-10"><DataTable rows={scholarships} /></div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading eyebrow="Documents" title="What you usually need for admission and visa processing" />
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {documents.map((item) => (
              <div key={item} className="rounded-[24px] border border-slate-200 bg-white p-5 text-sm leading-7 text-slate-700 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <SectionHeading eyebrow="Career Paths" title="What an Azerbaijan medical degree can lead to" />
        <div className="mt-10"><DataTable rows={careerPathways} /></div>
        <p className="mt-6 rounded-3xl border border-sky-200 bg-sky-50 p-5 text-sm leading-7 text-sky-950">
          Also consider{" "}
          <Link href="/bsc-nursing" className="font-semibold underline underline-offset-4">
            BSc Nursing abroad
          </Link>{" "}
          if you are comparing healthcare careers beyond MBBS.
        </p>
      </section>
      <StaticPageResourceLinks currentRoute={pageUrl} />


      <AzerbaijanLeadSection />

      <section id="faq" className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <SectionHeading eyebrow="FAQ" title="The most searched Azerbaijan questions from Indian students" />
        <div className="mt-10 grid gap-4">
          {faqs.map((faq, index) => (
            <article key={faq.question} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_12px_30px_rgba(15,23,42,0.04)]">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-700">Q{index + 1}</p>
              <h3 className="mt-3 text-xl font-bold text-slate-950">{faq.question}</h3>
              <p className="mt-4 text-base leading-8 text-slate-700">{faq.answer}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

