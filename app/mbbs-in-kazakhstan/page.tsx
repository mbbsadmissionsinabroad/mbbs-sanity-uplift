import { buildStaticPageMetadata } from "@/lib/staticPageSeo";
import StaticPageResourceLinks from "@/app/components/StaticPageResourceLinks";
import type { Metadata } from "next";
import Link from "next/link";
import KazakhstanLeadSection from "./KazakhstanLeadSection";
import {
  additionalCosts,
  advantages,
  articleSchema,
  breadcrumbSchema,
  careerPathways,
  comparison,
  disadvantages,
  documents,
  eligibility,
  eligibilityNotes,
  examContext,
  faqSchema,
  faqs,
  feeBreakdown,
  highlights,
  ivrNumber,
  kazakhstanExamNotes,
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
    route: "/mbbs-in-kazakhstan",
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
      <p className={`text-sm font-semibold uppercase tracking-[0.3em] ${dark ? "text-sky-300" : "text-sky-700"}`}>{eyebrow}</p>
      <h2 className={`mt-3 text-3xl font-bold tracking-tight md:text-4xl ${dark ? "text-white" : "text-slate-900"}`}>{title}</h2>
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

export default function KazakhstanPage() {
  return (
    <main className="bg-[linear-gradient(180deg,#eff6ff_0%,#f8fafc_28%,#ffffff_65%)] text-slate-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <section className="relative overflow-hidden border-b border-sky-100">
        <div className="absolute inset-x-0 top-0 h-[34rem] bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.18),_transparent_35%),radial-gradient(circle_at_top_right,_rgba(14,165,233,0.12),_transparent_30%),linear-gradient(180deg,_rgba(255,255,255,0.96),_rgba(255,255,255,0.86))]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-20">
          <div>
            <div className="inline-flex rounded-full border border-sky-200 bg-white/90 px-4 py-2 text-sm font-medium text-sky-800 shadow-sm">2026-27 Kazakhstan admissions guide for Indian medical aspirants</div>
            <h1 className="mt-6 max-w-4xl text-4xl font-black tracking-tight text-slate-950 md:text-6xl">{pageTitle}</h1>
            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Last Updated: {lastUpdated}</p>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700 md:text-xl">Compare FMGE context, university quality, visa process, total budget and India-return practicality before committing to the Kazakhstan route.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#quick-summary" className="rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">Start With Summary</a>
              <a href={whatsappHref} target="_blank" rel="noreferrer" className="rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition hover:brightness-95">WhatsApp {whatsappNumber}</a>
              <a href="#fees" className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-500 hover:text-slate-950">See Fees</a>
              <a href="#kazakhstan-contact-form" className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-500 hover:text-slate-950">Request Callback</a>
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
                ["#exam-context", "NExT context"],
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
        <SectionHeading eyebrow="Quick Summary" title="A fast Kazakhstan snapshot before you go deeper" />
        <div className="mt-10 grid gap-5 lg:grid-cols-5">
          {quickSummary.map((item) => (
            <article key={item.feature} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.05)]">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-700">{item.feature}</p>
              <p className="mt-4 text-base leading-7 text-slate-700">{item.details}</p>
            </article>
          ))}
        </div>
        <div className="mt-8 rounded-[28px] border border-sky-200 bg-sky-50 p-5 text-sm leading-7 text-sky-950">Kazakhstan works best as a cost-aware, outcomes-aware route where university selection matters far more than students first assume.</div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <SectionHeading eyebrow="Key Facts" title="At-a-glance Kazakhstan medicine facts for 2026-27" />
        <div className="mt-10"><DataTable rows={keyFacts} caption="Kazakhstan medicine key facts table" /></div>
      </section>

      <section id="timeline" className="bg-slate-950 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading eyebrow="Timeline" title="Admission planning for the Kazakhstan route" theme="dark" />
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
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
        <SectionHeading eyebrow="Eligibility" title="Minimum criteria Indian students should plan around" />
        <div className="mt-10"><DataTable rows={eligibility} caption="Kazakhstan medicine eligibility table" /></div>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {eligibilityNotes.map((note) => (
            <div key={note} className="rounded-3xl border border-slate-200 bg-slate-50 p-5 text-sm leading-7 text-slate-700">
              {note.includes("MBBS in Georgia") ? (
                <>
                  If you want a higher-FMGE, visa-light alternative, compare Kazakhstan with <Link href="/mbbs-in-georgia" className="font-semibold text-sky-700 underline underline-offset-4">MBBS in Georgia for Indian students</Link> before deciding.
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
          <SectionHeading eyebrow="Top Universities" title="Kazakhstan options students most often compare" />
          <div className="mt-10"><DataTable rows={universities} caption="Kazakhstan top universities table" /></div>
        </div>
      </section>

      <section id="fees" className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <SectionHeading eyebrow="Fees Breakdown" title="Transparent budgeting before you commit to Kazakhstan" />
        <div className="mt-10"><DataTable rows={feeBreakdown} caption="Kazakhstan fee breakdown table" /></div>
        <h3 className="mt-10 text-xl font-bold text-slate-900">Common additional costs students should budget for</h3>
        <div className="mt-5"><DataTable rows={additionalCosts} caption="Kazakhstan additional cost table" /></div>
      </section>

      <section id="exam-context" className="bg-[linear-gradient(180deg,#f8fafc_0%,#eff6ff_100%)] py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading eyebrow="FMGE / NExT Context" title="India licensing context for Kazakhstan graduates" />
          <div className="mt-10 grid gap-8 xl:grid-cols-2">
            <div>
              <h3 className="mb-4 text-xl font-bold text-slate-900">Recent Kazakhstan comparison context</h3>
              <DataTable rows={examContext} caption="Kazakhstan exam context table" />
            </div>
            <div>
              <h3 className="mb-4 text-xl font-bold text-slate-900">What those numbers mean in practice</h3>
              <DataTable rows={kazakhstanExamNotes} caption="Kazakhstan exam notes table" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <SectionHeading eyebrow="Recognition" title="Recognition stack and why it matters" />
        <div className="mt-10"><DataTable rows={recognition} caption="Kazakhstan recognition table" /></div>
      </section>

      <section className="bg-slate-950 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading eyebrow="Curriculum" title="Year-wise curriculum shape in Kazakhstan medicine" theme="dark" />
          <div className="mt-10"><DataTable rows={syllabus} caption="Kazakhstan medicine syllabus table" /></div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <SectionHeading eyebrow="Licensing" title="What happens after graduation" />
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {licensingSteps.map((step) => (
            <div key={step} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.05)]">
              <p className="text-base leading-7 text-slate-700">{step}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading eyebrow="Living Costs" title="Monthly living picture in Kazakhstan" />
          <div className="mt-10"><DataTable rows={livingCosts} caption="Kazakhstan living cost table" /></div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <SectionHeading eyebrow="Pros And Cons" title="Balanced view before you choose Kazakhstan" />
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-[32px] border border-sky-200 bg-sky-50 p-8">
            <h3 className="text-2xl font-bold text-slate-950">Advantages</h3>
            <ul className="mt-6 space-y-3 text-base leading-7 text-slate-700">{advantages.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
          <div className="rounded-[32px] border border-slate-200 bg-white p-8">
            <h3 className="text-2xl font-bold text-slate-950">Disadvantages</h3>
            <ul className="mt-6 space-y-3 text-base leading-7 text-slate-700">{disadvantages.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
        </div>
      </section>

      <section className="bg-[linear-gradient(180deg,#ffffff_0%,#eff6ff_100%)] py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading eyebrow="Alternatives" title="How Kazakhstan compares with other common destinations" />
          <div className="mt-10"><DataTable rows={comparison} caption="Kazakhstan alternatives comparison table" /></div>
          <p className="mt-6 text-sm leading-7 text-slate-600">
            Compare Kazakhstan with <Link href="/mbbs-in-georgia" className="font-semibold text-sky-700 underline underline-offset-4">MBBS in Georgia for Indian students</Link>, <Link href="/mbbs-in-uzbekistan" className="font-semibold text-sky-700 underline underline-offset-4">MBBS in Uzbekistan 2026</Link>, <Link href="/contact" className="font-semibold text-sky-700 underline underline-offset-4">MBBS in Germany for free</Link>, <Link href="/mbbs-without-neet" className="font-semibold text-sky-700 underline underline-offset-4">MBBS without NEET for Indian students</Link> and <Link href="/contact" className="font-semibold text-sky-700 underline underline-offset-4">BSc Nursing abroad</Link>.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <SectionHeading eyebrow="Scholarships" title="Funding and affordability options" />
        <div className="mt-10"><DataTable rows={scholarships} caption="Kazakhstan scholarships table" /></div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading eyebrow="Documents" title="The application file you should prepare early" />
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {documents.map((item) => (
              <div key={item} className="rounded-[28px] border border-slate-200 bg-white p-5 text-base leading-7 text-slate-700 shadow-[0_18px_40px_rgba(15,23,42,0.05)]">{item}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <SectionHeading eyebrow="Career Pathways" title="Where this degree can take you next" />
        <div className="mt-10"><DataTable rows={careerPathways} caption="Kazakhstan career pathways table" /></div>
      </section>
      <StaticPageResourceLinks currentRoute={pageUrl} />


      <KazakhstanLeadSection />

      <section id="faq" className="bg-slate-950 py-16 text-white">
        <div className="mx-auto max-w-5xl px-4 lg:px-8">
          <SectionHeading eyebrow="FAQ" title="Common Kazakhstan medicine questions Indian students ask" theme="dark" />
          <div className="mt-10 space-y-4">
            {faqs.map((faq) => (
              <article key={faq.question} className="rounded-[28px] border border-white/10 bg-white/5 p-6">
                <h3 className="text-lg font-semibold text-white">{faq.question}</h3>
                <p className="mt-3 text-base leading-7 text-slate-300">{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

