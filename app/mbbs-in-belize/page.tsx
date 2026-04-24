import { buildStaticPageMetadata } from "@/lib/staticPageSeo";
import StaticPageResourceLinks from "@/app/components/StaticPageResourceLinks";
import type { Metadata } from "next";
import Link from "next/link";
import BelizeLeadSection from "./BelizeLeadSection";
import {
  additionalCosts,
  advantages,
  advisoryReferenceDate,
  articleSchema,
  belizeFmge,
  breadcrumbSchema,
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
  medicalWebPageSchema,
  metaDescription,
  metaTitle,
  pageTitle,
  pageUrl,
  quickSummary,
  recognition,
  saferAlternatives,
  scholarships,
  syllabus,
  timeline,
  universities,
  verificationChecklist,
  warningUniversities,
  whatsappHref,
  whatsappNumber,
} from "./pageData";

type Row = Record<string, string | undefined>;

export async function generateMetadata(): Promise<Metadata> {
  return buildStaticPageMetadata({
    route: "/mbbs-in-belize",
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
  level = "h3",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  theme?: "light" | "dark";
  level?: "h2" | "h3";
}) {
  const dark = theme === "dark";
  const HeadingTag = level;

  return (
    <div className="max-w-3xl">
      <p className={`text-sm font-semibold uppercase tracking-[0.3em] ${dark ? "text-orange-300" : "text-orange-700"}`}>
        {eyebrow}
      </p>
      <HeadingTag className={`mt-3 text-3xl font-bold tracking-tight md:text-4xl ${dark ? "text-white" : "text-slate-900"}`}>
        {title}
      </HeadingTag>
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

export default function BelizePage() {
  return (
    <main className="bg-[linear-gradient(180deg,#fff7ed_0%,#fffdf8_30%,#ffffff_65%)] text-slate-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalWebPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="sticky top-0 z-30 border-b border-red-300 bg-[linear-gradient(90deg,#991b1b_0%,#dc2626_100%)] text-white shadow-lg">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-3 text-sm font-medium lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <p>
            NMC Advisory - March 2026 view: major Belize medical universities carry India-return risk.
            Verify your university before applying.
          </p>
          <a href="#nmc-advisory" className="font-semibold underline underline-offset-4">
            See warning details
          </a>
        </div>
      </div>

      <section className="relative overflow-hidden border-b border-orange-100">
        <div className="absolute inset-x-0 top-0 h-[36rem] bg-[radial-gradient(circle_at_top_left,_rgba(249,115,22,0.18),_transparent_35%),radial-gradient(circle_at_top_right,_rgba(220,38,38,0.14),_transparent_32%),linear-gradient(180deg,_rgba(255,255,255,0.97),_rgba(255,255,255,0.88))]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-20">
          <div>
            <div className="inline-flex rounded-full border border-orange-200 bg-white/90 px-4 py-2 text-sm font-medium text-orange-900 shadow-sm">
              Belize 2026-27 risk-aware admissions guide for Indian students
            </div>
            <h1 className="mt-6 max-w-4xl text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
              {pageTitle}
            </h1>
            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
              Last Updated: {lastUpdated}
            </p>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700 md:text-xl">
              Understand the Belize route with full transparency: India-return recognition risk,
              FMGE performance, fees, visa steps, and whether Belize still makes sense compared with safer alternatives.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#quick-summary" className="rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">Start With Summary</a>
              <a href={whatsappHref} target="_blank" rel="noreferrer" className="rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition hover:brightness-95">WhatsApp {whatsappNumber}</a>
              <a href="#fees" className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-500 hover:text-slate-950">See Fees</a>
              <a href="#belize-contact-form" className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-500 hover:text-slate-950">Request Callback</a>
              <a href={`tel:${ivrNumber.replace(/\s+/g, "")}`} className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-500 hover:text-slate-950">Call IVR</a>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {highlights.map((item) => (
                <div key={item} className="rounded-3xl border border-white/80 bg-white/90 p-5 shadow-[0_10px_35px_rgba(15,23,42,0.07)] backdrop-blur">
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-orange-700">Key takeaway</p>
                  <p className="mt-3 text-base leading-7 text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <aside className="self-start rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_30px_80px_rgba(15,23,42,0.08)] lg:sticky lg:top-28">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">On this page</p>
            <div className="mt-5 space-y-3">
              {[
                ["#nmc-advisory", "NMC advisory"],
                ["#quick-summary", "Quick summary"],
                ["#timeline", "2026 timeline"],
                ["#universities", "University status"],
                ["#fees", "Fees breakdown"],
                ["#faq", "FAQ section"],
              ].map(([href, label]) => (
                <a key={href} href={href} className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-orange-300 hover:bg-orange-50 hover:text-orange-900">
                  <span>{label}</span>
                  <span aria-hidden="true">+</span>
                </a>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section id="nmc-advisory" className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="rounded-[32px] border border-red-200 bg-[linear-gradient(180deg,#fff1f2_0%,#fff7ed_100%)] p-8 shadow-[0_20px_60px_rgba(127,29,29,0.10)]">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-red-700">Critical Warning</p>
          <h2 className="mt-3 text-3xl font-bold text-slate-950">
            Read the India-return risk before everything else
          </h2>
          <p className="mt-4 max-w-4xl text-base leading-8 text-slate-700">
            Belize can no longer be treated as a routine India-return MBBS option. Current India-focused
            reporting references an NMC advisory dated <strong>{advisoryReferenceDate}</strong> that publicly
            warned against three major Belize medical universities. Students should verify the exact live status
            of any Belize institution on the official NMC and WDOMS systems on the same day they apply.
          </p>
          <div className="mt-8">
            <DataTable rows={warningUniversities} />
          </div>
        </div>
      </section>

      <section id="quick-summary" className="mx-auto max-w-7xl px-4 py-6 lg:px-8">
        <SectionHeading eyebrow="Quick Summary" title="A fast Belize snapshot before you go deeper" />
        <div className="mt-10 grid gap-5 lg:grid-cols-5">
          {quickSummary.map((item) => (
            <article key={item.feature} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.05)]">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-orange-700">{item.feature}</p>
              <p className="mt-4 text-base leading-7 text-slate-700">{item.details}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
        <SectionHeading eyebrow="Key Facts" title="At-a-glance Belize medicine facts for 2026-27" />
        <div className="mt-10">
          <DataTable rows={keyFacts} />
        </div>
        <div className="mt-8 rounded-[28px] border border-amber-300 bg-amber-50 p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-amber-800">
            Before You Apply - Verify Right Now
          </p>
          <div className="mt-4">
            <DataTable rows={verificationChecklist} />
          </div>
          <p className="mt-5 text-sm leading-7 text-amber-900">
            Print the result, date-stamp it, and keep it permanently in your own records.
          </p>
        </div>
      </section>

      <section id="timeline" className="bg-slate-950 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading eyebrow="Timeline" title="A practical Belize admissions calendar" theme="dark" />
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {timeline.map((item) => (
              <div key={`${item.Month}-${item.Action}`} className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-orange-300">{item.Month}</p>
                <p className="mt-4 text-base leading-7 text-slate-200">{item.Action}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <SectionHeading eyebrow="Eligibility" title="Minimum criteria Indian students should meet" />
        <div className="mt-10">
          <DataTable rows={eligibility} />
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {eligibilityNotes.map((note) => (
            <div key={note} className="rounded-3xl border border-slate-200 bg-slate-50 p-5 text-sm leading-7 text-slate-700">
              {note.includes("/mbbs-without-neet") ? (
                <>
                  Belize does not create a shortcut around India-return rules.{" "}
                  <Link href="/contact" className="font-semibold text-orange-700 underline underline-offset-4">
                    Read why NEET still matters
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
          <SectionHeading eyebrow="Universities" title="Belize medical universities Indian students usually research" />
          <div className="mt-10">
            <DataTable rows={universities} />
          </div>
        </div>
      </section>

      <section id="fees" className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <SectionHeading eyebrow="Fees Breakdown" title="Transparent budgeting before you choose Belize" />
        <div className="mt-10">
          <DataTable rows={feeBreakdown} />
        </div>
        <h3 className="mt-10 text-xl font-bold text-slate-900">Additional first-year and recurring costs</h3>
        <div className="mt-5">
          <DataTable rows={additionalCosts} />
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={whatsappHref} target="_blank" rel="noreferrer" className="rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition hover:brightness-95">Ask Fees on WhatsApp</a>
          <a href="#belize-contact-form" className="rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">Get a Custom Fee Plan</a>
          <a href={`tel:${ivrNumber.replace(/\s+/g, "")}`} className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-500 hover:text-slate-950">Call IVR</a>
        </div>
      </section>

      <section className="bg-[linear-gradient(180deg,#fff7ed_0%,#f8fafc_100%)] py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading eyebrow="FMGE and Recognition" title="India-return performance and recognition reality" />
          <div className="mt-10 grid gap-8 xl:grid-cols-2">
            <div>
              <h3 className="mb-4 text-xl font-bold text-slate-900">India-wide FMGE 2024 context</h3>
              <DataTable rows={fmgeContext} />
            </div>
            <div>
              <h3 className="mb-4 text-xl font-bold text-slate-900">Belize vs other countries</h3>
              <DataTable rows={belizeFmge} />
            </div>
          </div>
          <div className="mt-10">
            <h3 className="mb-4 text-xl font-bold text-slate-900">Recognition and accreditation view</h3>
            <DataTable rows={recognition} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <SectionHeading eyebrow="Curriculum" title="How the Belize MD structure is usually organised" />
        <div className="mt-10">
          <DataTable rows={syllabus} />
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading eyebrow="Licensing" title="Post-graduation licensing pathway after Belize" />
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {licensingSteps.map((step, index) => (
              <article key={step} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_16px_40px_rgba(15,23,42,0.04)]">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-orange-700">Step {index + 1}</p>
                <p className="mt-4 text-base leading-7 text-slate-700">{step}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <SectionHeading eyebrow="Living Costs" title="A practical monthly budget for Belize" />
        <div className="mt-10">
          <DataTable rows={livingCosts} />
        </div>
      </section>

      <section className="bg-[linear-gradient(180deg,#fff7ed_0%,#ffffff_100%)] py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading eyebrow="Pros and Cons" title="The honest Belize trade-off for Indian students" />
          <div className="mt-10 grid gap-8 xl:grid-cols-2">
            <div className="rounded-[32px] border border-emerald-200 bg-emerald-50 p-8">
              <h3 className="text-2xl font-bold text-emerald-900">Advantages</h3>
              <div className="mt-6 space-y-4">
                {advantages.map((item) => (
                  <div key={item} className="rounded-2xl bg-white/80 p-4 text-sm leading-7 text-slate-700">
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[32px] border border-red-200 bg-red-50 p-8">
              <h3 className="text-2xl font-bold text-red-900">Disadvantages</h3>
              <div className="mt-6 space-y-4">
                {disadvantages.map((item) => (
                  <div key={item} className="rounded-2xl bg-white/80 p-4 text-sm leading-7 text-slate-700">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 rounded-[32px] border border-amber-300 bg-amber-50 p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-amber-800">Safer Alternatives</p>
            <h3 className="mt-3 text-2xl font-bold text-slate-950">
              If India-return safety matters, compare these routes before Belize
            </h3>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {saferAlternatives.map((item) => (
                <Link key={item.href} href={item.href} className="rounded-3xl border border-amber-200 bg-white px-5 py-5 text-sm font-semibold text-slate-800 transition hover:border-orange-300 hover:text-orange-800">
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <SectionHeading eyebrow="Comparison" title="How Belize stacks up against stronger alternatives" />
        <div className="mt-10">
          <DataTable rows={comparison} />
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading eyebrow="Scholarships and Funding" title="What support exists if you still consider Belize" />
          <div className="mt-10">
            <DataTable rows={scholarships} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <SectionHeading eyebrow="Documents" title="Core document checklist for Belize admission and visa" />
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {documents.map((item) => (
            <div key={item} className="rounded-[24px] border border-slate-200 bg-white p-5 text-sm leading-7 text-slate-700 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-950 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading eyebrow="Career Pathways" title="Where a Belize MD can still lead after graduation" theme="dark" />
          <div className="mt-10">
            <DataTable rows={careerPathways} />
          </div>
          <p className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-5 text-sm leading-7 text-slate-300">
            Also compare lower-risk healthcare routes like{" "}
            <Link href="/contact" className="font-semibold text-orange-300 underline underline-offset-4">
              BSc Nursing abroad
            </Link>{" "}
            if you are reviewing all possible overseas healthcare pathways.
          </p>
        </div>
      </section>
      <StaticPageResourceLinks currentRoute={pageUrl} />


      <BelizeLeadSection />

      <section id="faq" className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <SectionHeading eyebrow="FAQ" title="The most searched Belize questions from Indian students" />
        <div className="mt-10 grid gap-4">
          {faqs.map((faq, index) => (
            <article key={faq.question} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_12px_30px_rgba(15,23,42,0.04)]">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-orange-700">Q{index + 1}</p>
              <h3 className="mt-3 text-xl font-bold text-slate-950">{faq.question}</h3>
              <p className="mt-4 text-base leading-8 text-slate-700">{faq.answer}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
