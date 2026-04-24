import { buildStaticPageMetadata } from "@/lib/staticPageSeo";
import StaticPageResourceLinks from "@/app/components/StaticPageResourceLinks";
import type { Metadata } from "next";
import Link from "next/link";
import RussiaLeadSection from "./RussiaLeadSection";
import {
  additionalCosts,
  advantages,
  advisoryReferenceDate,
  articleSchema,
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
  universityFmge,
  whatsappHref,
  whatsappNumber,
} from "./pageData";

type Row = Record<string, string | undefined>;

export async function generateMetadata(): Promise<Metadata> {
  return buildStaticPageMetadata({
    route: "/mbbs-in-russia",
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
      <p className={`text-sm font-semibold uppercase tracking-[0.3em] ${dark ? "text-sky-300" : "text-sky-700"}`}>{eyebrow}</p>
      <HeadingTag className={`mt-3 text-3xl font-bold tracking-tight md:text-4xl ${dark ? "text-white" : "text-slate-900"}`}>{title}</HeadingTag>
      {description ? (
        <p className={`mt-4 text-base leading-7 md:text-lg ${dark ? "text-slate-300" : "text-slate-600"}`}>{description}</p>
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
                <th key={header} scope="col" className="whitespace-nowrap px-4 py-4 font-semibold">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((row, index) => (
              <tr key={`${Object.values(row).join("-")}-${index}`} className="align-top odd:bg-white even:bg-slate-50/60" itemScope itemType="https://schema.org/TableRow">
                {headers.map((header) => (
                  <td key={header} className="px-4 py-4 text-slate-700">{row[header]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function RussiaPage() {
  return (
    <main className="bg-[linear-gradient(180deg,#eff6ff_0%,#f8fafc_28%,#ffffff_65%)] text-slate-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <section className="relative overflow-hidden border-b border-sky-100">
        <div className="absolute inset-x-0 top-0 h-[34rem] bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.18),_transparent_35%),radial-gradient(circle_at_top_right,_rgba(14,165,233,0.12),_transparent_30%),linear-gradient(180deg,_rgba(255,255,255,0.96),_rgba(255,255,255,0.86))]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-20">
          <div>
            <div className="inline-flex rounded-full border border-sky-200 bg-white/90 px-4 py-2 text-sm font-medium text-sky-800 shadow-sm">2026-27 Russia admissions guide for Indian medical aspirants</div>
            <h1 className="mt-6 max-w-4xl text-4xl font-black tracking-tight text-slate-950 md:text-6xl">{pageTitle}</h1>
            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Last Updated: {lastUpdated}</p>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700 md:text-xl">Russia remains the largest MBBS-abroad ecosystem for Indian students, but in 2026 the real decision is not just whether to choose Russia. It is which university, which city, which language model and which FMGE-risk level you are choosing.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#quick-summary" className="rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">Start With Summary</a>
              <a href={whatsappHref} target="_blank" rel="noreferrer" className="rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition hover:brightness-95">WhatsApp {whatsappNumber}</a>
              <a href="#fees" className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-500 hover:text-slate-950">See Fees</a>
              <a href="#russia-contact-form" className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-500 hover:text-slate-950">Request Callback</a>
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
                ["#fees", "Fee table"],
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
        <SectionHeading level="h2" eyebrow="Quick Summary" title="A fast Russia snapshot before you go deeper" />
        <div className="mt-10 grid gap-5 lg:grid-cols-5">
          {quickSummary.map((item) => (
            <article key={item.feature} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.05)]">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-700">{item.feature}</p>
              <p className="mt-4 text-base leading-7 text-slate-700">{item.details}</p>
            </article>
          ))}
        </div>
        <div className="mt-8 rounded-[28px] border border-amber-200 bg-amber-50 p-5 text-sm leading-7 text-amber-900">
          Russia is not a one-university market. The difference between a strong FMGE-track option and a weak fee-only option can define your post-graduation outcome.
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <SectionHeading eyebrow="Key Facts" title="At-a-glance Russia MBBS facts for 2026-27" />
        <div className="mt-10"><DataTable rows={keyFacts} caption="Russia MBBS key facts table" /></div>
      </section>

      <section id="timeline" className="bg-slate-950 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading eyebrow="Timeline" title="Admission planning for the September 2026 intake" theme="dark" />
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
        <div className="mt-10"><DataTable rows={eligibility} caption="Russia MBBS eligibility table" /></div>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {eligibilityNotes.map((note) => (
            <div key={note} className="rounded-3xl border border-slate-200 bg-slate-50 p-5 text-sm leading-7 text-slate-700">{note}</div>
          ))}
        </div>
      </section>

      <section id="universities" className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading eyebrow="Top Universities" title="Top 10 NMC-aware Russian medical options to compare first" />
          <div className="mt-10"><DataTable rows={universities} caption="Top 10 Russian medical universities table" /></div>
        </div>
      </section>

      <section id="fees" className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <SectionHeading eyebrow="Fees Breakdown" title="The broadest fee range in MBBS abroad, laid out clearly" />
        <div className="mt-10"><DataTable rows={feeBreakdown} caption="Russia MBBS fee table for 25 universities" /></div>
        <h3 className="mt-10 text-xl font-bold text-slate-900">Other cost layers you should budget for</h3>
        <div className="mt-5"><DataTable rows={additionalCosts} caption="Russia MBBS additional cost table" /></div>
      </section>

      <section id="fmge" className="bg-[linear-gradient(180deg,#f8fafc_0%,#eff6ff_100%)] py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading eyebrow="FMGE / NEXT Context" title="Why university choice matters more in Russia than in most countries" />
          <div className="mt-10 grid gap-8 xl:grid-cols-2">
            <div>
              <h3 className="mb-4 text-xl font-bold text-slate-900">Russia-wide FMGE trend</h3>
              <DataTable rows={fmgeContext} caption="Russia FMGE yearly context table" />
            </div>
            <div>
              <h3 className="mb-4 text-xl font-bold text-slate-900">University-wise FMGE snapshot</h3>
              <DataTable rows={universityFmge} caption="Russia university wise FMGE table" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <SectionHeading eyebrow="Recognition" title="What recognition and accreditation actually matter" />
        <div className="mt-10"><DataTable rows={recognition} caption="Russia recognition table" /></div>
      </section>

      <section className="bg-slate-950 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading eyebrow="Curriculum" title="Year-wise MBBS syllabus / curriculum in Russia" theme="dark" />
          <div className="mt-10"><DataTable rows={syllabus} caption="Russia MBBS syllabus table" /></div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <SectionHeading eyebrow="Licensing" title="Licensing and career path after MBBS in Russia" />
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
          <SectionHeading eyebrow="Living Costs" title="Cost of living in Russia for Indian students in 2026" />
          <div className="mt-10"><DataTable rows={livingCosts} caption="Russia living cost table" /></div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <SectionHeading eyebrow="Pros and Cons" title="The honest Russia trade-off in 2026" />
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
          <SectionHeading eyebrow="Comparison" title="Russia vs other MBBS abroad destinations" />
          <div className="mt-10"><DataTable rows={comparison} caption="Russia comparison table" /></div>
          <p className="mt-6 text-sm leading-7 text-slate-600">
            Compare Russia with <Link href="/mbbs-admission-in-bangladesh-for-indian-students" className="font-semibold text-sky-700 underline underline-offset-4">MBBS in Bangladesh</Link>, <Link href="/mbbs-in-uzbekistan" className="font-semibold text-sky-700 underline underline-offset-4">MBBS in Uzbekistan</Link>, <Link href="/mbbs-admission-in-romania-for-indian-students" className="font-semibold text-sky-700 underline underline-offset-4">MBBS in Romania</Link> and <Link href="/mbbs-without-neet" className="font-semibold text-sky-700 underline underline-offset-4">MBBS without NEET</Link> if you are still deciding which route best fits your budget and India-return plan.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <SectionHeading eyebrow="Scholarships and Loans" title="Scholarships and financial aid for MBBS in Russia" />
        <div className="mt-10"><DataTable rows={scholarships} caption="Russia scholarship table" /></div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading eyebrow="Documents" title="Documents required for MBBS admission in Russia" />
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {documents.map((item) => (
              <div key={item} className="rounded-[24px] border border-slate-200 bg-white p-5 text-sm leading-7 text-slate-700 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">{item}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <SectionHeading eyebrow="Career Paths" title="Career opportunities after MBBS in Russia" />
        <div className="mt-10"><DataTable rows={careerPathways} caption="Russia career pathway table" /></div>
      </section>

      <section className="bg-slate-950 py-12 text-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="rounded-[32px] border border-white/10 bg-white/5 p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-300">Critical Advisory</p>
            <h2 className="mt-4 text-3xl font-bold">Russia 2026 banking and travel planning needs more care than before</h2>
            <p className="mt-4 text-base leading-8 text-slate-300">As of {advisoryReferenceDate}, Russia's geopolitical environment still creates practical friction around SWIFT channels, routine card usability and certain flight routes. Families should confirm live payment channels before transferring funds and review current Indian Embassy in Moscow advisories before travel.</p>
          </div>
        </div>
      </section>
      <StaticPageResourceLinks currentRoute={pageUrl} />


      <RussiaLeadSection />

      <section id="faq" className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <SectionHeading eyebrow="FAQ" title="Most-asked questions about MBBS in Russia" />
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
