import type { Metadata } from "next";
import LearnGermanLeadSection from "./LearnGermanLeadSection";
import {
  articleSchema,
  benefits,
  breadcrumbSchema,
  exams,
  faqSchema,
  faqs,
  fees,
  highlights,
  ivrNumber,
  keyFacts,
  lastUpdated,
  levelCards,
  levelsOverview,
  livingCosts,
  metaDescription,
  metaTitle,
  pageTitle,
  pageUrl,
  profiles,
  quickSummary,
  reasons,
  schedules,
  syllabus,
  whatsappHref,
  whatsappNumber,
} from "./pageData";

type Row = Record<string, string>;

export const metadata: Metadata = {
  title: metaTitle,
  description: metaDescription,
  alternates: { canonical: pageUrl },
  openGraph: {
    title: metaTitle,
    description: metaDescription,
    url: pageUrl,
    siteName: "MBBS Admissions in Abroad",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: metaTitle,
    description: metaDescription,
  },
};

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

export default function LearnGermanPage() {
  return (
    <main className="bg-[linear-gradient(180deg,#eff6ff_0%,#f8fafc_28%,#ffffff_65%)] text-slate-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <section className="relative overflow-hidden border-b border-sky-100">
        <div className="absolute inset-x-0 top-0 h-[34rem] bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.18),_transparent_35%),radial-gradient(circle_at_top_right,_rgba(14,165,233,0.12),_transparent_30%),linear-gradient(180deg,_rgba(255,255,255,0.96),_rgba(255,255,255,0.86))]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-20">
          <div>
            <div className="inline-flex rounded-full border border-sky-200 bg-white/90 px-4 py-2 text-sm font-medium text-sky-800 shadow-sm">2026 Bangalore German course guide for students and professionals</div>
            <h1 className="mt-6 max-w-4xl text-4xl font-black tracking-tight text-slate-950 md:text-6xl">{pageTitle}</h1>
            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Last Updated: {lastUpdated}</p>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700 md:text-xl">Compare A1 to C2 levels, course fees, schedules, exam pathways and Germany-linked career use cases before you choose your next German-learning step in Bangalore.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#quick-summary" className="rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">Start With Summary</a>
              <a href={whatsappHref} target="_blank" rel="noreferrer" className="rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition hover:brightness-95">WhatsApp {whatsappNumber}</a>
              <a href="#fees" className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-500 hover:text-slate-950">See Fees</a>
              <a href="#learn-german-contact-form" className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-500 hover:text-slate-950">Request Callback</a>
              <a href={`tel:${ivrNumber.replace(/\s+/g, "")}`} className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-500 hover:text-slate-950">Call IVR</a>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {highlights.map((item) => (
                <div key={item} className="rounded-3xl border border-white/80 bg-white/90 p-5 shadow-[0_10px_35px_rgba(15,23,42,0.07)] backdrop-blur">
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-700">Why it matters</p>
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
                ["#levels", "A1 to C2 levels"],
                ["#fees", "Fees"],
                ["#exams", "Exam paths"],
                ["#schedules", "Batch schedules"],
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
        <SectionHeading eyebrow="Quick Summary" title="A fast Bangalore German-course snapshot before you go deeper" />
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
        <SectionHeading eyebrow="Key Facts" title="At-a-glance facts for German language learning in Bangalore" />
        <div className="mt-10"><DataTable rows={keyFacts} caption="German course key facts table" /></div>
      </section>

      <section className="bg-slate-950 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading eyebrow="Why Learn German" title="Why German matters so much in Bangalore and beyond" theme="dark" />
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {reasons.map((item) => (
              <div key={item} className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur">
                <p className="text-base leading-7 text-slate-200">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="levels" className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <SectionHeading eyebrow="Levels" title="A1 to C2 breakdown and what each level unlocks" />
        <div className="mt-10"><DataTable rows={levelsOverview} caption="German levels overview table" /></div>
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {levelCards.map((card) => (
            <article key={card.level} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.05)]">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-700">{card.level}</p>
              <h3 className="mt-3 text-xl font-bold text-slate-950">{card.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-700">{card.summary}</p>
              <p className="mt-4 text-sm leading-7 text-slate-500">{card.audience}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading eyebrow="Who Needs What" title="Recommended level by profile and goal" />
          <div className="mt-10"><DataTable rows={profiles} caption="Profile versus level table" /></div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <SectionHeading eyebrow="Syllabus" title="What a structured German syllabus should cover level by level" />
        <div className="mt-10"><DataTable rows={syllabus} caption="German syllabus table" /></div>
      </section>

      <section id="exams" className="bg-[linear-gradient(180deg,#ffffff_0%,#eff6ff_100%)] py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading eyebrow="Certification Exams" title="Which German exams matter and when" />
          <div className="mt-10"><DataTable rows={exams} caption="German certification exams table" /></div>
        </div>
      </section>

      <section id="fees" className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <SectionHeading eyebrow="Course Fees" title="German language course fees in Bangalore for 2026" />
        <div className="mt-10"><DataTable rows={fees} caption="German course fees table" /></div>
        <div className="mt-6 rounded-[28px] border border-slate-200 bg-white p-5 text-sm leading-7 text-slate-600">Fee figures are positioned as practical planning ranges and can vary by batch type, live trainer access, materials, mock tests and one-to-one support.</div>
      </section>

      <section id="schedules" className="bg-slate-950 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading eyebrow="Schedules" title="Online and offline batch formats students usually choose" theme="dark" />
          <div className="mt-10"><DataTable rows={schedules} caption="German batch schedule table" /></div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <SectionHeading eyebrow="Benefits" title="Why learners in Bangalore choose German beyond the classroom" />
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {benefits.map((item) => (
            <div key={item} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.05)]">
              <p className="text-base leading-7 text-slate-700">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <LearnGermanLeadSection />

      <section id="faq" className="bg-slate-950 py-16 text-white">
        <div className="mx-auto max-w-5xl px-4 lg:px-8">
          <SectionHeading eyebrow="FAQ" title="Common German-course questions learners ask" theme="dark" />
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
