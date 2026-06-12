import { buildStaticPageMetadata } from "@/lib/staticPageSeo";
import StaticPageResourceLinks from "@/app/components/StaticPageResourceLinks";
import type { Metadata } from "next";
import Link from "next/link";
import DenmarkNursingLeadSection from "./DenmarkNursingLeadSection";
import {
  advantages,
  allowances,
  articleSchema,
  arrivalSteps,
  breadcrumbSchema,
  careerPathways,
  careerProgression,
  comparison,
  costBreakdown,
  disadvantages,
  documents,
  eligibility,
  eligibilityNotes,
  employers,
  faqSchema,
  faqs,
  highlights,
  ivrNumber,
  keyFacts,
  lastUpdated,
  livingCosts,
  metaDescription,
  metaTitle,
  pageTitle,
  pageUrl,
  processSteps,
  quickSummary,
  recognition,
  salaryByExperience,
  scholarships,
  timeline,
  whatsappHref,
  whatsappNumber,
} from "./pageData";

type Row = Record<string, string | undefined>;

export async function generateMetadata(): Promise<Metadata> {
  return buildStaticPageMetadata({
    route: "/nursing-jobs-in-denmark",
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
      <p className={`text-sm font-semibold uppercase tracking-[0.3em] ${dark ? "text-blue-300" : "text-blue-700"}`}>
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

function DataTable({ rows, caption }: { rows: Row[]; caption: string }) {
  const headers = Object.keys(rows[0] ?? {});
  return (
    <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.06)]">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-left text-sm" itemScope itemType="https://schema.org/Table">
          <caption className="sr-only">{caption}</caption>
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

export default function NursingJobsInDenmarkPage() {
  return (
    <main className="bg-[linear-gradient(180deg,#eff6ff_0%,#f8fafc_28%,#ffffff_65%)] text-slate-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <section className="relative overflow-hidden border-b border-blue-100">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.17),_transparent_35%),radial-gradient(circle_at_top_right,_rgba(16,185,129,0.12),_transparent_30%),linear-gradient(180deg,_rgba(255,255,255,0.96),_rgba(255,255,255,0.86))]" />
        <div className="relative z-10 mx-auto grid max-w-7xl gap-10 px-4 py-12 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-16">
          <div>
            <div className="inline-flex rounded-full border border-blue-200 bg-white/90 px-4 py-2 text-sm font-medium text-blue-800 shadow-sm">
              2026-27 Denmark nursing jobs guide for Indian nurses
            </div>
            <h1 className="mt-6 max-w-4xl text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
              {pageTitle}
            </h1>
            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
              Last Updated: {lastUpdated}
            </p>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700 md:text-xl">
              Understand the zero-quota pause, Danish language reality, STPS path, salary, living costs and why Denmark is more of a 2027 preparation project than a 2026 quick move.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#quick-summary" className="rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">Start With Summary</a>
              <a href={whatsappHref} target="_blank" rel="noreferrer" className="rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition hover:brightness-95">WhatsApp {whatsappNumber}</a>
              <a href="#costs" className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-500 hover:text-slate-950">See Costs</a>
              <a href="#denmark-nursing-contact-form" className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-500 hover:text-slate-950">Request Callback</a>
              <a href={`tel:${ivrNumber.replace(/\s+/g, "")}`} className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-500 hover:text-slate-950">Call IVR</a>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {highlights.map((item) => (
                <div key={item} className="rounded-3xl border border-white/80 bg-white/90 p-5 shadow-[0_10px_35px_rgba(15,23,42,0.07)] backdrop-blur">
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-700">Key reason</p>
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
                ["#timeline", "2027 roadmap"],
                ["#employers", "Top employers"],
                ["#costs", "Costs and fees"],
                ["#salary", "Salary data"],
                ["#faq", "FAQ section"],
              ].map(([href, label]) => (
                <a key={href} href={href} className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-900">
                  <span>{label}</span>
                  <span aria-hidden="true">+</span>
                </a>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section id="quick-summary" className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <SectionHeading level="h2" eyebrow="Quick Summary" title="A fast Denmark nursing snapshot before you go deeper" />
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {quickSummary.map((item) => (
            <article key={item.feature} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.05)]">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-700">{item.feature}</p>
              <p className="mt-4 text-base leading-7 text-slate-700">{item.details}</p>
            </article>
          ))}
        </div>
        <div className="mt-8 rounded-[28px] border border-amber-200 bg-amber-50 p-5 text-sm leading-7 text-amber-900">
          Denmark is currently a preparation-first destination, not a move-immediately destination. The strongest applicants will use 2026 to build Danish, documents and employer alignment.
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <SectionHeading eyebrow="Key Facts" title="At-a-glance Denmark nursing facts for 2026-27" />
        <div className="mt-10"><DataTable rows={keyFacts} caption="Denmark nursing key facts table" /></div>
      </section>

      <section id="timeline" className="bg-slate-950 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading eyebrow="Timeline" title="What 2026 and 2027 should look like for Indian nurses targeting Denmark" theme="dark" />
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {timeline.map((item) => (
              <div key={`${item.Month}-${item.Action}`} className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-300">{item.Month}</p>
                <p className="mt-4 text-base leading-7 text-slate-200">{item.Action}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <SectionHeading eyebrow="Step By Step" title="The real Denmark process once the quota opens" />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {processSteps.map((step, index) => (
            <div key={step} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.05)]">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-700">Step {index + 1}</p>
              <p className="mt-3 text-base leading-7 text-slate-700">{step}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading eyebrow="Eligibility" title="Who actually fits the Denmark route best" />
          <div className="mt-10"><DataTable rows={eligibility} caption="Denmark nursing eligibility table" /></div>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {eligibilityNotes.map((note) => (
              <div key={note} className="rounded-3xl border border-slate-200 bg-white p-5 text-sm leading-7 text-slate-700">{note}</div>
            ))}
          </div>
        </div>
      </section>

      <section id="employers" className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <SectionHeading eyebrow="Top Employers" title="The Denmark employers and settings Indian nurses should actually compare" />
        <div className="mt-10"><DataTable rows={employers} caption="Denmark nursing employers table" /></div>
      </section>

      <section id="costs" className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading eyebrow="Costs and Fees" title="What the Denmark pathway really costs before and after arrival" />
          <div className="mt-10"><DataTable rows={costBreakdown} caption="Denmark nursing fees and costs table" /></div>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={whatsappHref} target="_blank" rel="noreferrer" className="rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition hover:brightness-95">Ask Costs on WhatsApp</a>
            <a href="#denmark-nursing-contact-form" className="rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">Get a Denmark Plan</a>
            <a href={`tel:${ivrNumber.replace(/\s+/g, "")}`} className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-500 hover:text-slate-950">Call IVR</a>
          </div>
        </div>
      </section>

      <section id="salary" className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <SectionHeading eyebrow="Salary Data" title="What Danish nursing pay looks like in reality" />
        <div className="mt-10 grid gap-8 xl:grid-cols-2">
          <div>
            <h3 className="mb-4 text-xl font-bold text-slate-900">Salary by experience</h3>
            <DataTable rows={salaryByExperience} caption="Denmark nursing salary by experience table" />
          </div>
          <div>
            <h3 className="mb-4 text-xl font-bold text-slate-900">Allowances and extras</h3>
            <DataTable rows={allowances} caption="Denmark nursing salary allowances table" />
          </div>
        </div>
        <p className="mt-8 rounded-3xl border border-amber-200 bg-amber-50 p-5 text-sm leading-7 text-amber-900">
          Danish gross salary looks excellent, but you should always translate it into net pay after tax and then compare that against real living costs.
        </p>
      </section>

      <section className="bg-slate-950 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading eyebrow="Recognition" title="The bodies and systems that control your Denmark pathway" theme="dark" />
          <div className="mt-10"><DataTable rows={recognition} caption="Denmark nursing recognition table" /></div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <SectionHeading eyebrow="Career Progression" title="How the Denmark journey usually unfolds over time" />
        <div className="mt-10"><DataTable rows={careerProgression} caption="Denmark nursing career progression table" /></div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading eyebrow="After Landing" title="What happens after you arrive in Denmark" />
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {arrivalSteps.map((step, index) => (
              <div key={step} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.05)]">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-700">Stage {index + 1}</p>
                <p className="mt-3 text-base leading-7 text-slate-700">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <SectionHeading eyebrow="Cost of Living" title="Why city choice matters so much in Denmark" />
        <div className="mt-10"><DataTable rows={livingCosts} caption="Denmark nursing living cost table" /></div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading eyebrow="Pros and Cons" title="A realistic view of Denmark for Indian nurses" />
          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <div className="rounded-[32px] border border-emerald-200 bg-emerald-50 p-8">
              <h3 className="text-2xl font-bold text-slate-950">Advantages</h3>
              <ul className="mt-6 space-y-4">
                {advantages.map((item) => (
                  <li key={item} className="list-none text-base leading-7 text-slate-700">{item}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-[32px] border border-amber-200 bg-amber-50 p-8">
              <h3 className="text-2xl font-bold text-slate-950">Disadvantages</h3>
              <ul className="mt-6 space-y-4">
                {disadvantages.map((item) => (
                  <li key={item} className="list-none text-base leading-7 text-slate-700">{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <SectionHeading eyebrow="Comparison" title="How Denmark compares with other nurse destinations" />
        <div className="mt-10"><DataTable rows={comparison} caption="Denmark nursing comparison table" /></div>
        <p className="mt-6 text-base leading-7 text-slate-700">
            If you want an active route right now instead of a 2027 waiting strategy, compare this with <Link href="/nursing-jobs-in-canada" className="font-semibold text-blue-700 hover:text-blue-900">nursing jobs in Canada</Link>. For broader education-led healthcare routes, explore <Link href="/bsc-nursing" className="font-semibold text-blue-700 hover:text-blue-900">BSc Nursing abroad</Link>, <Link href="/mbbs-admission-in-germany-for-indian-students" className="font-semibold text-blue-700 hover:text-blue-900">MBBS in Germany for free</Link> and <Link href="/mbbs-without-neet" className="font-semibold text-blue-700 hover:text-blue-900">MBBS without NEET for Indian students</Link>.
        </p>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading eyebrow="Support and Funding" title="Where practical support may still exist in the Denmark pathway" />
          <div className="mt-10"><DataTable rows={scholarships} caption="Denmark nursing support options table" /></div>
        </div>
      </section>

      <section className="bg-slate-950 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading eyebrow="Documents" title="What to prepare before the quota reopens" theme="dark" />
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {documents.map((document) => (
              <div key={document} className="rounded-[26px] border border-white/10 bg-white/5 p-5 text-sm leading-7 text-slate-200">
                {document}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <SectionHeading eyebrow="Career Pathways" title="What opens up after Danish authorization" />
        <div className="mt-10"><DataTable rows={careerPathways} caption="Denmark nursing career pathways table" /></div>
      </section>

      <section className="bg-slate-50 py-12">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-700">Need direct guidance?</p>
            <p className="mt-2 text-lg font-semibold text-slate-900">Talk to the Denmark nursing team before you invest time in the language route.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={whatsappHref} target="_blank" rel="noreferrer" className="rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition hover:brightness-95">Chat on WhatsApp</a>
            <a href="#denmark-nursing-contact-form" className="rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">Open Contact Form</a>
            <a href={`tel:${ivrNumber.replace(/\s+/g, "")}`} className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-500 hover:text-slate-950">IVR {ivrNumber}</a>
          </div>
        </div>
      </section>
      <StaticPageResourceLinks currentRoute={pageUrl} />


      <DenmarkNursingLeadSection />

      <section id="faq" className="mx-auto max-w-5xl px-4 py-16 lg:px-8">
        <SectionHeading eyebrow="FAQ" title="15 common Denmark nursing questions Indian nurses ask" />
        <div className="mt-10 space-y-4">
          {faqs.map((faq, index) => (
            <details key={faq.question} className="group rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.04)]">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-lg font-semibold text-slate-900">
                <span>Q{index + 1}. {faq.question}</span>
                <span className="rounded-full border border-slate-300 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Open</span>
              </summary>
              <p className="mt-4 text-base leading-8 text-slate-700">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
