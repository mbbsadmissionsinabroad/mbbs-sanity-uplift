import type { Metadata } from "next";
import Link from "next/link";
import StaticPageResourceLinks from "@/app/components/StaticPageResourceLinks";
import { buildStaticPageMetadata } from "@/lib/staticPageSeo";
import BosniaNursingLeadSection from "./BosniaNursingLeadSection";
import {
  admissionSteps,
  articleSchema,
  breadcrumbSchema,
  comparison,
  documents,
  eligibility,
  eligibilityNotes,
  faqSchema,
  faqs,
  feeBreakdown,
  globalCareers,
  highlights,
  indiaCareers,
  ivrNumber,
  keyFacts,
  lastUpdated,
  livingCosts,
  metaDescription,
  metaTitle,
  pageTitle,
  pageUrl,
  quickSummary,
  recognition,
  scholarships,
  studentLife,
  syllabus,
  universities,
  whatsappHref,
  whatsappNumber,
  whyChooseReasons,
} from "./pageData";

type Row = Record<string, string | undefined>;

export async function generateMetadata(): Promise<Metadata> {
  return buildStaticPageMetadata({
    route: "/study-nursing-in-bosnia",
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
          dark ? "text-blue-300" : "text-blue-700"
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

export default function StudyNursingInBosniaPage() {
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

      <section className="relative overflow-hidden border-b border-blue-100">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.17),_transparent_35%),radial-gradient(circle_at_top_right,_rgba(16,185,129,0.12),_transparent_30%),linear-gradient(180deg,_rgba(255,255,255,0.96),_rgba(255,255,255,0.86))]" />
        <div className="relative z-10 mx-auto grid max-w-7xl gap-10 px-4 py-12 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-16">
          <div>
            <div className="inline-flex rounded-full border border-blue-200 bg-white/90 px-4 py-2 text-sm font-medium text-blue-800 shadow-sm">
              2026 Bosnia nursing guide for Indian students
            </div>
            <h1 className="mt-6 max-w-4xl text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
              {pageTitle}
            </h1>
            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
              Last Updated: {lastUpdated}
            </p>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700 md:text-xl">
              Bosnia is emerging as one of the most rational low-cost European
              nursing routes for Indian students: no NEET, no IELTS in many
              cases, tuition around Rs 1.2 lakh per semester, and a practical
              Germany pathway after graduation.
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
                See Fees
              </a>
              <a
                href="/contact"
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
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-700">
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
                ["#why-bosnia", "Why Bosnia"],
                ["#eligibility", "Eligibility"],
                ["#admission-process", "Admission process"],
                ["#universities", "Top universities"],
                ["#fees", "Fees breakdown"],
                ["#career-scope", "Career scope"],
                ["#faq", "FAQ section"],
              ].map(([href, label]) => (
                <a
                  key={href}
                  href={href}
                  className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-900"
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
          level="h2"
          eyebrow="Quick Summary"
          title="A fast Bosnia nursing snapshot before you go deeper"
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {quickSummary.map((item) => (
            <article
              key={item.feature}
              className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.05)]"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-700">
                {item.feature}
              </p>
              <p className="mt-4 text-base leading-7 text-slate-700">
                {item.details}
              </p>
            </article>
          ))}
        </div>
        <div className="mt-8 rounded-[28px] border border-emerald-200 bg-emerald-50 p-5 text-sm leading-7 text-emerald-900">
          Key advantage: Bosnia is a nursing route, so students do not need
          NEET. For many Indian families, that is the difference between waiting
          in uncertainty and moving forward with a workable Europe plan.
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <SectionHeading
          eyebrow="Key Facts"
          title="Bosnia nursing at a glance for 2026"
        />
        <div className="mt-10">
          <DataTable rows={keyFacts} caption="Bosnia nursing key facts table" />
        </div>
      </section>

      <section id="why-bosnia" className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading
            eyebrow="Why Bosnia"
            title="Why Indian students are seriously considering Bosnia for nursing"
            description="Bosnia offers a rare combination of Europe-facing degree value, low cost, and lower entry barriers than the UK, Australia, or Canada routes."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {whyChooseReasons.map((item) => (
              <div
                key={item}
                className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.05)]"
              >
                <p className="text-base leading-7 text-slate-700">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <SectionHeading
          eyebrow="Recognition"
          title="Recognition and status points families should understand first"
        />
        <div className="mt-10">
          <DataTable
            rows={recognition}
            caption="Bosnia nursing recognition table"
          />
        </div>
      </section>

      <section id="eligibility" className="bg-slate-950 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading
            eyebrow="Eligibility"
            title="Who fits the Bosnia nursing route best in 2026"
            description="This route is strongest for science-stream students who want an affordable Europe-facing nursing degree and do not want an IELTS-heavy or NEET-based entry barrier."
            theme="dark"
          />
          <div className="mt-10">
            <DataTable rows={eligibility} caption="Bosnia nursing eligibility table" />
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {eligibilityNotes.map((note) => (
              <div
                key={note}
                className="rounded-3xl border border-white/10 bg-white/5 p-5 text-sm leading-7 text-slate-200"
              >
                {note}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="admission-process"
        className="mx-auto max-w-7xl px-4 py-16 lg:px-8"
      >
        <SectionHeading
          eyebrow="Admission Process"
          title="How the Bosnia nursing process usually unfolds step by step"
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {admissionSteps.map((item) => (
            <article
              key={item.step}
              className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.05)]"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-700">
                {item.step}
              </p>
              <h3 className="mt-3 text-xl font-bold tracking-tight text-slate-950">
                {item.title}
              </h3>
              <p className="mt-4 text-base leading-7 text-slate-700">
                {item.details}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading
            eyebrow="Documents"
            title="The document file you should prepare early"
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {documents.map((document) => (
              <div
                key={document}
                className="rounded-[26px] border border-slate-200 bg-white p-5 text-sm leading-7 text-slate-700 shadow-[0_18px_40px_rgba(15,23,42,0.05)]"
              >
                {document}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="universities" className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <SectionHeading
          eyebrow="Top Universities"
          title="Bosnia nursing colleges Indian students should compare first"
          description="The University of East Sarajevo currently has the clearest India-facing Bosnia nursing conversation, but students should still compare city, programme format, and total budget before committing."
        />
        <div className="mt-10">
          <DataTable rows={universities} caption="Bosnia nursing colleges table" />
        </div>
        <p className="mt-6 rounded-3xl border border-blue-100 bg-blue-50 p-5 text-sm leading-7 text-blue-950">
          New Life Overseas recommendation: the University of East Sarajevo,
          especially the Foca campus route, is the most active Bosnia nursing
          option for Indian students in 2026 because it combines public-university
          status, low tuition, and a clearer Germany-facing post-study story.
        </p>
      </section>

      <section className="bg-slate-950 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading
            eyebrow="Curriculum"
            title="How the 4-year Bosnia nursing syllabus is usually structured"
            theme="dark"
          />
          <div className="mt-10">
            <DataTable rows={syllabus} caption="Bosnia nursing syllabus table" />
          </div>
        </div>
      </section>

      <section id="fees" className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <SectionHeading
          eyebrow="Fees Breakdown"
          title="What the Bosnia nursing route really costs from India"
        />
        <div className="mt-10">
          <DataTable rows={feeBreakdown} caption="Bosnia nursing fee breakdown table" />
        </div>
        <p className="mt-6 text-base leading-7 text-slate-700">
          The most useful comparison is not Bosnia versus the cheapest country.
          It is Bosnia versus what Indian families would otherwise spend on a
          private nursing college with weaker Europe mobility. On that comparison,
          Bosnia often looks unusually rational.
        </p>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading
            eyebrow="Living Cost"
            title="Why Bosnia remains manageable on a middle-class budget"
          />
          <div className="mt-10">
            <DataTable rows={livingCosts} caption="Bosnia nursing living cost table" />
          </div>
        </div>
      </section>

      <section id="career-scope" className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <SectionHeading
          eyebrow="Career Scope"
          title="Career value in India and the stronger Germany / EU pathway"
        />
        <div className="mt-10 grid gap-8 xl:grid-cols-2">
          <div>
            <h3 className="mb-4 text-xl font-bold text-slate-900">
              India career prospects
            </h3>
            <DataTable rows={indiaCareers} caption="Bosnia nursing India career table" />
          </div>
          <div>
            <h3 className="mb-4 text-xl font-bold text-slate-900">
              Global career pathways
            </h3>
            <DataTable rows={globalCareers} caption="Bosnia nursing global career table" />
          </div>
        </div>
        <p className="mt-8 rounded-3xl border border-emerald-200 bg-emerald-50 p-5 text-sm leading-7 text-emerald-900">
          Germany is the real strategic upside here. Students who finish a
          Bologna-structured Bosnia nursing degree and build German to B2 are in
          a much better position to enter Germany's recognition pathway than
          students using low-cost but non-European nursing degrees.
        </p>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading
            eyebrow="Support and Funding"
            title="Scholarships, loans, and cost relief options"
          />
          <div className="mt-10">
            <DataTable rows={scholarships} caption="Bosnia nursing scholarships table" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <SectionHeading
          eyebrow="Student Life"
          title="What daily student life in Bosnia usually feels like"
        />
        <div className="mt-10">
          <DataTable rows={studentLife} caption="Bosnia nursing student life table" />
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading
            eyebrow="Comparison"
            title="Bosnia versus other nursing destinations Indian students compare"
          />
          <div className="mt-10">
            <DataTable rows={comparison} caption="Bosnia nursing destination comparison table" />
          </div>
          <p className="mt-6 text-base leading-7 text-slate-700">
            If your long-term target is Germany, compare this page directly with{" "}
            <Link
              href="/nursing-job-in-germany"
              className="font-semibold text-blue-700 hover:text-blue-900"
            >
              nursing jobs in Germany
            </Link>
            . If you want the wider route overview first, start with{" "}
            <Link
              href="/nursing-jobs-in-abroad"
              className="font-semibold text-blue-700 hover:text-blue-900"
            >
              Nursing Jobs Abroad
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="bg-slate-950 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading
            eyebrow="Call To Action"
            title="Begin your Europe nursing plan with a cleaner, lower-cost route"
            description="Bosnia is one of the few paths where average Indian families can still access a European nursing qualification without an IELTS-heavy or private-college-sized budget."
            theme="dark"
          />
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition hover:brightness-95"
            >
              WhatsApp {whatsappNumber}
            </a>
            <a
              href="/contact"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
            >
              Book Free Consultation
            </a>
            <a
              href={`tel:${ivrNumber.replace(/\s+/g, "")}`}
              className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/50"
            >
              Call IVR {ivrNumber}
            </a>
          </div>
        </div>
      </section>

      <BosniaNursingLeadSection />

      <StaticPageResourceLinks currentRoute={pageUrl} />

      <section id="faq" className="mx-auto max-w-5xl px-4 py-16 lg:px-8">
        <SectionHeading
          eyebrow="FAQ"
          title="Common Bosnia nursing questions Indian students ask first"
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
