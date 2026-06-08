import StaticPageResourceLinks from "@/app/components/StaticPageResourceLinks";
import Link from "next/link";
import RussiaLeadSection from "./RussiaLeadSection";
import {
  additionalCosts,
  advantages,
  articleSchema,
  breadcrumbSchema,
  careerPathways,
  comparison,
  accommodationNotes,
  disadvantages,
  documents,
  eligibility,
  eligibilityNotes,
  faqSchema,
  faqs,
  feeBreakdown,
  fmgeContext,
  gozzSteps,
  highlights,
  ivrNumber,
  keyFacts,
  lastUpdated,
  licensingSteps,
  livingCosts,
  pageTitle,
  pageUrl,
  processSteps,
  quickSummary,
  recognition,
  scholarships,
  syllabus,
  timeline,
  universities,
  universityFmge,
  vacationBreaks,
  whatsappHref,
  whatsappNumber,
} from "../mbbs-admission-in-russia/pageData";

type Row = Record<string, string | undefined>;

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
      <p
        className={`text-sm font-semibold uppercase tracking-[0.3em] ${
          dark ? "text-sky-300" : "text-sky-700"
        }`}
      >
        {eyebrow}
      </p>
      <HeadingTag
        className={`mt-3 text-3xl font-bold tracking-tight md:text-4xl ${
          dark ? "text-white" : "text-slate-900"
        }`}
      >
        {title}
      </HeadingTag>
      {description ? (
        <p
          className={`mt-4 text-base leading-7 md:text-lg ${
            dark ? "text-slate-300" : "text-slate-600"
          }`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

function DataTable({ rows, caption }: { rows: Row[]; caption: string }) {
  const headers = Object.keys(rows[0] ?? {});
  return (
    <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.06)]">
      <div className="overflow-x-auto">
        <table
          className="min-w-full divide-y divide-slate-200 text-left text-sm"
          itemScope
          itemType="https://schema.org/Table"
        >
          <caption className="sr-only">{caption}</caption>
          <thead className="bg-slate-950 text-white">
            <tr itemScope itemType="https://schema.org/TableRow">
              {headers.map((header) => (
                <th
                  key={header}
                  scope="col"
                  className="whitespace-nowrap px-4 py-4 font-semibold"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((row, index) => (
              <tr
                key={`${Object.values(row).join("-")}-${index}`}
                className="align-top odd:bg-white even:bg-slate-50/60"
                itemScope
                itemType="https://schema.org/TableRow"
              >
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

export default function RussiaAdmissionContent() {
  return (
    <main className="bg-[linear-gradient(180deg,#eff6ff_0%,#f8fafc_28%,#ffffff_65%)] text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section className="relative overflow-hidden border-b border-sky-100">
        <div className="absolute inset-x-0 top-0 h-[34rem] bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.18),_transparent_35%),radial-gradient(circle_at_top_right,_rgba(14,165,233,0.12),_transparent_30%),linear-gradient(180deg,_rgba(255,255,255,0.96),_rgba(255,255,255,0.86))]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-20">
          <div>
            <div className="inline-flex rounded-full border border-sky-200 bg-white/90 px-4 py-2 text-sm font-medium text-sky-800 shadow-sm">
              2026-27 Russia admissions guide for Indian medical aspirants
            </div>
            <h1 className="mt-6 max-w-4xl text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
              {pageTitle}
            </h1>
            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
              Last Updated: {lastUpdated}
            </p>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700 md:text-xl">
              Russia continues to stay relevant for Indian MBBS aspirants because it still combines a wide university pool, comparatively manageable fees, and a workable India-return pathway when the shortlist is built carefully.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#quick-summary" className="rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
                Start With Summary
              </a>
              <a href={whatsappHref} target="_blank" rel="noreferrer" className="rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition hover:brightness-95">
                WhatsApp {whatsappNumber}
              </a>
              <a href="#fees" className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-500 hover:text-slate-950">
                See Fees
              </a>
              <a href="#russia-contact-form" className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-500 hover:text-slate-950">
                Request Callback
              </a>
              <a href={`tel:${ivrNumber.replace(/\s+/g, "")}`} className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-500 hover:text-slate-950">
                Call IVR
              </a>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {highlights.map((item) => (
                <div key={item} className="rounded-3xl border border-white/80 bg-white/90 p-5 shadow-[0_10px_35px_rgba(15,23,42,0.07)] backdrop-blur">
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-700">Why Russia still matters</p>
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
                ["#process", "8-step process"],
                ["#universities", "Top universities"],
                ["#fees", "Fees table"],
                ["#fmge", "FMGE context"],
                ["#faq", "FAQ section"],
              ].map(([href, label]) => (
                <a
                  key={href}
                  href={href}
                  className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-sky-300 hover:bg-sky-50 hover:text-sky-900"
                >
                  <span>{label}</span>
                  <span aria-hidden="true">+</span>
                </a>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section id="quick-summary" className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <SectionHeading level="h2" eyebrow="Quick Summary" title="The five things most families should understand first" />
        <div className="mt-10 grid gap-5 lg:grid-cols-5">
          {quickSummary.map((item) => (
            <article key={item.feature} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.05)]">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-700">{item.feature}</p>
              <p className="mt-4 text-base leading-7 text-slate-700">{item.details}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <SectionHeading eyebrow="Key Facts" title="MBBS in Russia key facts at a glance for 2026-27" />
        <div className="mt-10"><DataTable rows={keyFacts} caption="MBBS in Russia key facts table" /></div>
      </section>

      <section id="timeline" className="bg-slate-950 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading eyebrow="Timeline" title="2026-27 MBBS admission timeline in Russia" theme="dark" description="Students who plan each step early usually avoid the invitation, passport, and visa delays that can cost an entire intake year." />
          <div className="mt-10"><DataTable rows={timeline} caption="Russia MBBS admission timeline table" /></div>
          <div className="mt-8 rounded-[28px] border border-amber-400/30 bg-amber-500/10 p-5 text-sm leading-7 text-amber-100">
            Key warning: your passport should ideally have at least 18 months of validity before you apply, so renew it early if needed.
          </div>
        </div>
      </section>

      <section id="process" className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <SectionHeading eyebrow="Step By Step" title="MBBS admission process in Russia in 8 practical steps" />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {processSteps.map((step) => (
            <article key={step.title} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.05)]">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-700">{step.title}</p>
              <p className="mt-3 text-base leading-7 text-slate-700">{step.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading eyebrow="NEET Eligibility" title="NEET eligibility requirements for MBBS in Russia in 2026" />
          <div className="mt-10"><DataTable rows={eligibility} caption="NEET eligibility requirements for MBBS in Russia table" /></div>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {eligibilityNotes.map((note) => (
              <div key={note} className="rounded-3xl border border-slate-200 bg-white p-5 text-sm leading-7 text-slate-700">
                {note}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="universities" className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <SectionHeading eyebrow="Top Universities" title="Top 10 NMC-approved universities for MBBS in Russia in 2026-27" />
        <div className="mt-10"><DataTable rows={universities} caption="Top 10 NMC-approved universities for MBBS in Russia table" /></div>
      </section>

      <section id="fees" className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading eyebrow="Fees Breakdown" title="Complete fees breakdown for major Russian medical universities in 2026" description="The table below adds both USD and Indian rupee columns so families can compare fee pressure in a familiar format before shortlisting." />
          <div className="mt-10"><DataTable rows={feeBreakdown} caption="Complete fee breakdown for Russian medical universities in USD and INR" /></div>
          <div className="mt-8"><DataTable rows={additionalCosts} caption="Monthly living cost breakdown for MBBS in Russia" /></div>
        </div>
      </section>

      <section id="fmge" className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <SectionHeading eyebrow="FMGE / NEXT Context" title="What every student should know about FMGE before choosing Russia" />
        <div className="mt-10 grid gap-8 xl:grid-cols-2">
          <div>
            <h3 className="mb-4 text-xl font-bold text-slate-900">Russia-wide FMGE data</h3>
            <DataTable rows={fmgeContext} caption="Russia FMGE pass rate data table" />
          </div>
          <div>
            <h3 className="mb-4 text-xl font-bold text-slate-900">What those numbers mean in practice</h3>
            <DataTable rows={universityFmge} caption="Russia FMGE strategy and university selection table" />
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading eyebrow="Recognition" title="Recognition of MBBS degree from Russia" theme="dark" />
          <div className="mt-10"><DataTable rows={recognition} caption="Recognition of MBBS degree from Russia table" /></div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <SectionHeading eyebrow="Syllabus" title="MBBS syllabus in Russia year by year" />
        <div className="mt-10"><DataTable rows={syllabus} caption="Year-wise MBBS syllabus in Russia table" /></div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading eyebrow="GOZZ Exam" title="Medical licensing in Russia - GOZZ exam explained" />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {gozzSteps.map((step) => (
              <article key={step.title} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.05)]">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-700">{step.title}</p>
                <p className="mt-3 text-base leading-7 text-slate-700">{step.detail}</p>
              </article>
            ))}
          </div>
          <div className="mt-8 rounded-[28px] border border-sky-200 bg-sky-50 p-5 text-sm leading-7 text-sky-950">
            Passing GOZZ helps complete the Russian graduation side of the journey. After that, Indian students still need to follow the licensing pathway applicable in India before they can practise back home.
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <SectionHeading eyebrow="After Graduation" title="The licensing and career process after MBBS in Russia" />
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {licensingSteps.map((step, index) => (
            <article key={step} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_16px_40px_rgba(15,23,42,0.04)]">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-700">Step {index + 1}</p>
              <p className="mt-4 text-base leading-7 text-slate-700">{step}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading eyebrow="Living Costs" title="Cost of living in Russia for Indian students" />
          <div className="mt-10"><DataTable rows={livingCosts} caption="Cost of living in Russia for Indian students table" /></div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="grid gap-8 xl:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Vacations" title="Vacation pattern during MBBS in Russia" />
            <div className="mt-8 grid gap-4">
              {vacationBreaks.map((item) => (
                <div key={item.title} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_16px_40px_rgba(15,23,42,0.04)]">
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-700">{item.title}</p>
                  <p className="mt-3 text-base leading-7 text-slate-700">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <SectionHeading eyebrow="Food and Accommodation" title="What Indian students should expect day to day" />
            <div className="mt-8 grid gap-4">
              {accommodationNotes.map((item) => (
                <div key={item} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_16px_40px_rgba(15,23,42,0.04)]">
                  <p className="text-base leading-7 text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading eyebrow="Career Pathways" title="Opportunities after MBBS in Russia" theme="dark" />
          <div className="mt-10"><DataTable rows={careerPathways} caption="Career opportunities after MBBS in Russia table" /></div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <SectionHeading eyebrow="Pros and Cons" title="Advantages and disadvantages of MBBS in Russia" />
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

      <section className="bg-[linear-gradient(180deg,#ffffff_0%,#eff6ff_100%)] py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading eyebrow="Comparison" title="Russia vs other MBBS abroad destinations in 2026" />
          <div className="mt-10"><DataTable rows={comparison} caption="Russia versus other MBBS abroad destinations table" /></div>
          <p className="mt-6 text-sm leading-7 text-slate-600">
            For wider comparisons, also review <Link href="/mbbs-in-germany" className="font-semibold text-sky-700 underline underline-offset-4">MBBS in Germany</Link>, <Link href="/mbbs-admission-in-uzbekistan" className="font-semibold text-sky-700 underline underline-offset-4">MBBS admission in Uzbekistan</Link>, <Link href="/mbbs-without-neet" className="font-semibold text-sky-700 underline underline-offset-4">MBBS without NEET</Link>, and <Link href="/bsc-nursing" className="font-semibold text-sky-700 underline underline-offset-4">BSc Nursing abroad</Link> before finalising your shortlist.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <SectionHeading eyebrow="Scholarships" title="Scholarships and financial aid for MBBS in Russia" />
        <div className="mt-10"><DataTable rows={scholarships} caption="Scholarships and financial aid for MBBS in Russia table" /></div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading eyebrow="Documents" title="Documents required for MBBS admission in Russia" />
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {documents.map((item) => (
              <div key={item} className="rounded-[24px] border border-slate-200 bg-white p-5 text-sm leading-7 text-slate-700 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <StaticPageResourceLinks currentRoute={pageUrl} />

      <RussiaLeadSection />

      <section id="faq" className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <SectionHeading eyebrow="FAQ" title="Frequently asked questions about MBBS in Russia in 2026" />
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
