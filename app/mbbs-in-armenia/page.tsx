import { buildStaticPageMetadata } from "@/lib/staticPageSeo";
import StaticPageResourceLinks from "@/app/components/StaticPageResourceLinks";
import type { Metadata } from "next";
import Link from "next/link";
import ArmeniaLeadSection from "../mbbs-admission-in-armenia/ArmeniaLeadSection";
import {
  advantages,
  articleSchema,
  careerPathways,
  comparison,
  disadvantages,
  documents,
  eligibility,
  eligibilityNotes,
  faqSchema,
  faqs,
  feeBreakdown,
  fmgeUniversityWise,
  fmgeYearWise,
  highlights,
  ivrNumber,
  keyFacts,
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
} from "../mbbs-admission-in-armenia/pageData";

type Row = Record<string, string | undefined>;

export async function generateMetadata(): Promise<Metadata> {
  return buildStaticPageMetadata({
    route: "/mbbs-in-armenia",
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
      <p
        className={`text-sm font-semibold uppercase tracking-[0.3em] ${
          dark ? "text-emerald-300" : "text-emerald-700"
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

function DataTable({ rows }: { rows: Row[] }) {
  const headers = Object.keys(rows[0] ?? {});

  return (
    <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.06)]">
      <div className="overflow-x-auto">
        <table
          className="min-w-full divide-y divide-slate-200 text-left text-sm"
          itemScope
          itemType="https://schema.org/Table"
        >
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

export default function ArmeniaPage() {
  return (
    <main className="bg-[linear-gradient(180deg,#f6fffb_0%,#fff7ef_28%,#ffffff_65%)] text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="relative overflow-hidden border-b border-emerald-100">
        <div className="absolute inset-x-0 top-0 h-[34rem] bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.18),_transparent_35%),radial-gradient(circle_at_top_right,_rgba(249,115,22,0.18),_transparent_30%),linear-gradient(180deg,_rgba(255,255,255,0.96),_rgba(255,255,255,0.86))]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-20">
          <div>
            <div className="inline-flex rounded-full border border-emerald-200 bg-white/90 px-4 py-2 text-sm font-medium text-emerald-800 shadow-sm">
              2026-27 Armenia admissions guide for Indian medical aspirants
            </div>
            <h1 className="mt-6 max-w-4xl text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
              {pageTitle}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700 md:text-xl">
              Compare NMC-approved universities, six-year fee ranges, NEET
              eligibility, FMGE trends, student life and the full application
              path before you shortlist Armenia for MBBS abroad.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#quick-summary"
                className="rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Start With Summary
              </a>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition hover:brightness-95"
              >
                WhatsApp {whatsappNumber}
              </a>
              <a
                href="#fees"
                className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-500 hover:text-slate-950"
              >
                See Fees Breakdown
              </a>
              <a
                href="#armenia-contact-form"
                className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-500 hover:text-slate-950"
              >
                Request Callback
              </a>
              <a
                href={`tel:${ivrNumber.replace(/\s+/g, "")}`}
                className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-500 hover:text-slate-950"
              >
                Call IVR
              </a>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {highlights.map((item) => (
                <div
                  key={item}
                  className="rounded-3xl border border-white/80 bg-white/90 p-5 shadow-[0_10px_35px_rgba(15,23,42,0.07)] backdrop-blur"
                >
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-orange-600">
                    Key reason
                  </p>
                  <p className="mt-3 text-base leading-7 text-slate-700">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <aside className="self-start rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_30px_80px_rgba(15,23,42,0.08)] lg:sticky lg:top-28">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
              On this page
            </p>
            <div className="mt-5 space-y-3">
              {[
                ["#quick-summary", "Quick summary"],
                ["#timeline", "2026 timeline"],
                ["#universities", "Top universities"],
                ["#fees", "Fees breakdown"],
                ["#fmge", "FMGE and NEXT data"],
                ["#faq", "FAQ section"],
              ].map(([href, label]) => (
                <a
                  key={href}
                  href={href}
                  className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-900"
                >
                  <span>{label}</span>
                  <span aria-hidden="true">+</span>
                </a>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section
        id="quick-summary"
        className="mx-auto max-w-7xl px-4 py-16 lg:px-8"
      >
        <SectionHeading
          eyebrow="Quick Summary"
          title="A fast snapshot before you go deeper"
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-5">
          {quickSummary.map((item) => (
            <article
              key={item.feature}
              className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.05)]"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-700">
                {item.feature}
              </p>
              <p className="mt-4 text-base leading-7 text-slate-700">
                {item.details}
              </p>
            </article>
          ))}
        </div>
        <div className="mt-8 rounded-[28px] border border-orange-200 bg-orange-50 p-5 text-sm leading-7 text-orange-900">
          Armenia is a separate country in the South Caucasus, not part of
          Russia or Georgia. Most of the major medical universities popular with
          Indian students are located in Yerevan.
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-4 lg:px-8">
        <SectionHeading
          eyebrow="Why Armenia"
          title="Why Indian students are seriously considering Armenia in 2026"
          description="Armenia stands out because it blends affordability, English-medium instruction and practical recognition pathways without the donation-heavy admission model seen elsewhere."
        />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <SectionHeading
          eyebrow="Key Facts"
          title="At-a-glance Armenia MBBS facts for 2026-27"
        />
        <div className="mt-10">
          <DataTable rows={keyFacts} />
        </div>
      </section>

      <section id="timeline" className="bg-slate-950 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading
            eyebrow="Timeline"
            title="Admission calendar for the 2026-27 session"
            theme="dark"
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {timeline.map((item) => (
              <div
                key={`${item.Month}-${item.Action}`}
                className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-300">
                  {item.Month}
                </p>
                <p className="mt-4 text-base leading-7 text-slate-200">
                  {item.Action}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <SectionHeading
          eyebrow="Eligibility"
          title="Minimum criteria Indian students should meet"
        />
        <div className="mt-10">
          <DataTable rows={eligibility} />
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {eligibilityNotes.map((note) => (
            <div
              key={note}
              className="rounded-3xl border border-slate-200 bg-slate-50 p-5 text-sm leading-7 text-slate-700"
            >
              {note}
            </div>
          ))}
        </div>
      </section>

      <section id="universities" className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading
            eyebrow="Universities"
            title="Top NMC-approved medical universities in Armenia"
          />
          <div className="mt-10">
            <DataTable rows={universities} />
          </div>
        </div>
      </section>

      <section id="fees" className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <SectionHeading
          eyebrow="Fees Breakdown"
          title="Year-wise fee picture for major Armenian universities"
        />
        <div className="mt-10">
          <DataTable rows={feeBreakdown} />
        </div>
        <p className="mt-6 rounded-3xl border border-orange-200 bg-orange-50 p-5 text-sm leading-7 text-orange-900">
          These fee figures are indicative for 2026-27 and should always be
          confirmed in writing before payment.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition hover:brightness-95"
          >
            Ask Fees on WhatsApp
          </a>
          <a
            href="#armenia-contact-form"
            className="rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Get a Custom Fee Plan
          </a>
          <a
            href={`tel:${ivrNumber.replace(/\s+/g, "")}`}
            className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-500 hover:text-slate-950"
          >
            Call IVR
          </a>
        </div>
      </section>

      <section
        id="fmge"
        className="bg-[linear-gradient(180deg,#f8fafc_0%,#ecfeff_100%)] py-16"
      >
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading
            eyebrow="FMGE and NEXT"
            title="Armenia pass-rate trends and what they mean"
          />
          <div className="mt-10 grid gap-8 xl:grid-cols-2">
            <div>
              <h3 className="mb-4 text-xl font-bold text-slate-900">
                Year-wise Armenia FMGE data
              </h3>
              <DataTable rows={fmgeYearWise} />
            </div>
            <div>
              <h3 className="mb-4 text-xl font-bold text-slate-900">
                University-wise FMGE 2024 performance
              </h3>
              <DataTable rows={fmgeUniversityWise} />
            </div>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-[28px] bg-slate-950 p-6 text-white">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">
                2024 national rate
              </p>
              <p className="mt-3 text-4xl font-black">17.67%</p>
            </div>
            <div className="rounded-[28px] border border-emerald-200 bg-emerald-50 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-800">
                Top reported performer
              </p>
              <p className="mt-3 text-4xl font-black text-slate-950">
                32.76%
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-700">
                YSMU led the group in 2024.
              </p>
            </div>
            <div className="rounded-[28px] border border-orange-200 bg-orange-50 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-800">
                Practical takeaway
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-700">
                Compare universities on outcomes, not price alone, and begin
                licensing prep early.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <SectionHeading
          eyebrow="Recognition"
          title="How accreditation affects your degree after graduation"
        />
        <div className="mt-10">
          <DataTable rows={recognition} />
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading
            eyebrow="Curriculum"
            title="Year-wise MBBS syllabus structure in Armenia"
          />
          <div className="mt-10">
            <DataTable rows={syllabus} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <SectionHeading
          eyebrow="After Graduation"
          title="Licensing steps to practise in India after MBBS in Armenia"
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {licensingSteps.map((step, index) => (
            <div
              key={step}
              className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.05)]"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-700">
                Step {index + 1}
              </p>
              <p className="mt-3 text-base leading-7 text-slate-700">
                {step}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-950 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading
            eyebrow="Student Life"
            title="What living in Yerevan usually costs each month"
            theme="dark"
          />
          <div className="mt-10">
            <DataTable rows={livingCosts} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <SectionHeading
          eyebrow="Pros and Cons"
          title="A realistic view of Armenia as an MBBS destination"
        />
        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <div className="rounded-[32px] border border-emerald-200 bg-emerald-50 p-8">
            <h3 className="text-2xl font-bold text-slate-950">Advantages</h3>
            <ul className="mt-6 space-y-4">
              {advantages.map((item) => (
                <li
                  key={item}
                  className="ml-0 list-none text-base leading-7 text-slate-700"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[32px] border border-orange-200 bg-orange-50 p-8">
            <h3 className="text-2xl font-bold text-slate-950">
              Disadvantages
            </h3>
            <ul className="mt-6 space-y-4">
              {disadvantages.map((item) => (
                <li
                  key={item}
                  className="ml-0 list-none text-base leading-7 text-slate-700"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading
            eyebrow="Comparison"
            title="How Armenia compares with other MBBS abroad options"
          />
          <div className="mt-10">
            <DataTable rows={comparison} />
          </div>
          <p className="mt-6 text-base leading-7 text-slate-700">
            You can also explore{" "}
            <Link
              href="/mbbs-in-georgia"
              className="font-semibold text-emerald-700 hover:text-emerald-900"
            >
              MBBS in Georgia for Indian students
            </Link>
            ,{" "}
            <Link
              href="/mbbs-in-uzbekistan"
              className="font-semibold text-emerald-700 hover:text-emerald-900"
            >
              MBBS in Uzbekistan 2026
            </Link>
            ,{" "}
            <Link
              href="/mbbs-without-neet"
              className="font-semibold text-emerald-700 hover:text-emerald-900"
            >
              MBBS without NEET for Indian students
            </Link>{" "}
            and{" "}
            <Link
              href="/bsc-nursing"
              className="font-semibold text-emerald-700 hover:text-emerald-900"
            >
              BSc Nursing abroad
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <SectionHeading
          eyebrow="Funding"
          title="Scholarships, financial aid and practical funding routes"
        />
        <div className="mt-10">
          <DataTable rows={scholarships} />
        </div>
      </section>

      <section className="bg-slate-950 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading
            eyebrow="Documents"
            title="The checklist to keep ready before you apply"
            theme="dark"
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {documents.map((document) => (
              <div
                key={document}
                className="rounded-[26px] border border-white/10 bg-white/5 p-5 text-sm leading-7 text-slate-200"
              >
                {document}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <SectionHeading
          eyebrow="Career Pathways"
          title="What you can do after an Armenian MBBS degree"
        />
        <div className="mt-10">
          <DataTable rows={careerPathways} />
        </div>
      </section>

      <section className="bg-slate-50 py-12">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-700">
              Need direct guidance?
            </p>
            <p className="mt-2 text-lg font-semibold text-slate-900">
              Talk to the Armenia team before you shortlist a university.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition hover:brightness-95"
            >
              Chat on WhatsApp
            </a>
            <a
              href="#armenia-contact-form"
              className="rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Open Contact Form
            </a>
            <a
              href={`tel:${ivrNumber.replace(/\s+/g, "")}`}
              className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-500 hover:text-slate-950"
            >
              IVR {ivrNumber}
            </a>
          </div>
        </div>
      </section>
      <StaticPageResourceLinks currentRoute={pageUrl} />


      <ArmeniaLeadSection />

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading
            eyebrow="Without NEET?"
            title="Why that route does not solve the India-licensing question"
            description="Students often search for MBBS without NEET, but for an India-focused medical career, NEET remains the safer foundation."
          />
          <p className="mt-8 max-w-4xl text-base leading-8 text-slate-700 md:text-lg">
            If NEET is your main concern, read the broader guidance on{" "}
            <Link
              href="/mbbs-without-neet"
              className="font-semibold text-emerald-700 hover:text-emerald-900"
            >
              MBBS without NEET for Indian students
            </Link>
            . Armenia may be affordable, but the India-side licensing pathway
            still depends on proper eligibility from the start.
          </p>
        </div>
      </section>

      <section id="faq" className="mx-auto max-w-5xl px-4 py-16 lg:px-8">
        <SectionHeading
          eyebrow="FAQ"
          title="15 common questions students and parents ask"
        />
        <div className="mt-10 space-y-4">
          {faqs.map((faq, index) => (
            <details
              key={faq.question}
              className="group rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.04)]"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-lg font-semibold text-slate-900">
                <span>
                  Q{index + 1}. {faq.question}
                </span>
                <span className="rounded-full border border-slate-300 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Open
                </span>
              </summary>
              <p className="mt-4 text-base leading-8 text-slate-700">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
