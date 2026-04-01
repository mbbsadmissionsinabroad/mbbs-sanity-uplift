import type { Metadata } from "next";
import AusbildungLeadSection from "./AusbildungLeadSection";
import {
  advantages,
  afterAusbildung,
  articleSchema,
  breadcrumbSchema,
  categories,
  criticisms,
  dualSystem,
  eurToInrNote,
  eligibility,
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
  residencyPath,
  salaries,
  stipendTable,
  topCourses,
  visaDocs,
  visaFacts,
  whatsappHref,
  whatsappNumber,
} from "./pageData";

type Row = Record<string, string | undefined>;

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
                  <td key={header} className="px-4 py-4 text-slate-700">{row[header] ?? ""}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function AusbildungPage() {
  return (
    <main className="bg-[linear-gradient(180deg,#eff6ff_0%,#f8fafc_28%,#ffffff_65%)] text-slate-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <section className="relative overflow-hidden border-b border-sky-100">
        <div className="absolute inset-x-0 top-0 h-[34rem] bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.18),_transparent_35%),radial-gradient(circle_at_top_right,_rgba(14,165,233,0.12),_transparent_30%),linear-gradient(180deg,_rgba(255,255,255,0.96),_rgba(255,255,255,0.86))]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-20">
          <div>
            <div className="inline-flex rounded-full border border-sky-200 bg-white/90 px-4 py-2 text-sm font-medium text-sky-800 shadow-sm">2026 Germany vocational training guide for Indian students</div>
            <h1 className="mt-6 max-w-4xl text-4xl font-black tracking-tight text-slate-950 md:text-6xl">{pageTitle}</h1>
            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Last Updated: {lastUpdated}</p>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700 md:text-xl">Understand stipend, language reality, top Ausbildung fields, visa planning, living costs and the real path from vocational training to long-term work in Germany.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#quick-summary" className="rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">Start With Summary</a>
              <a href={whatsappHref} target="_blank" rel="noreferrer" className="rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition hover:brightness-95">WhatsApp {whatsappNumber}</a>
              <a href="#top-courses" className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-500 hover:text-slate-950">See Top Courses</a>
              <a href="#ausbildung-contact-form" className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-500 hover:text-slate-950">Request Callback</a>
              <a href={`tel:${ivrNumber.replace(/\s+/g, "")}`} className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-500 hover:text-slate-950">Call IVR</a>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {highlights.map((item) => (
                <div key={item} className="rounded-3xl border border-white/80 bg-white/90 p-5 shadow-[0_10px_35px_rgba(15,23,42,0.07)] backdrop-blur">
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-700">Key takeaway</p>
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
                ["#top-courses", "Top courses"],
                ["#stipend", "Stipend and salary"],
                ["#eligibility", "Eligibility"],
                ["#visa", "Visa checklist"],
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
        <SectionHeading eyebrow="Quick Summary" title="A fast Ausbildung snapshot before you go deeper" />
        <div className="mt-10 grid gap-5 lg:grid-cols-5">
          {quickSummary.map((item) => (
            <article key={item.feature} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.05)]">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-700">{item.feature}</p>
              <p className="mt-4 text-base leading-7 text-slate-700">{item.details}</p>
            </article>
          ))}
        </div>
        <div className="mt-8 rounded-[28px] border border-sky-200 bg-sky-50 p-5 text-sm leading-7 text-sky-950">Ausbildung is strongest for students who want a practical German career route, not for those expecting an English-only or purely academic experience.</div>
        <div className="mt-4 rounded-[28px] border border-slate-200 bg-white p-5 text-sm leading-7 text-slate-600">{eurToInrNote}</div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <SectionHeading eyebrow="Key Facts" title="At-a-glance Germany Ausbildung facts for 2026" />
        <div className="mt-10"><DataTable rows={keyFacts} caption="Ausbildung key facts table" /></div>
      </section>

      <section className="bg-slate-950 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading eyebrow="How It Works" title="The dual education model in simple terms" theme="dark" description="You split your week between a company and a vocational school, which is why Ausbildung graduates are job-ready from day one." />
          <div className="mt-10"><DataTable rows={dualSystem} caption="Dual education system table" /></div>
        </div>
      </section>

      <section id="top-courses" className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <SectionHeading eyebrow="Top Courses" title="Highest-paid and highest-demand Ausbildung options for 2026" />
        <div className="mt-10"><DataTable rows={topCourses} caption="Top Ausbildung courses table" /></div>
      </section>

      <section id="stipend" className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading eyebrow="Stipend And Salary" title="How stipend grows during training and what you can earn after" />
          <div className="mt-10 grid gap-8 xl:grid-cols-2">
            <div>
              <h3 className="mb-4 text-xl font-bold text-slate-900">Year-wise stipend progression</h3>
              <DataTable rows={stipendTable} caption="Ausbildung stipend table" />
            </div>
            <div>
              <h3 className="mb-4 text-xl font-bold text-slate-900">Post-completion salary by sector</h3>
              <DataTable rows={salaries} caption="Ausbildung salary table" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <SectionHeading eyebrow="Categories" title="The main Ausbildung sectors Indian students usually explore" />
        <div className="mt-10"><DataTable rows={categories} caption="Ausbildung categories table" /></div>
      </section>

      <section id="eligibility" className="bg-[linear-gradient(180deg,#ffffff_0%,#eff6ff_100%)] py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading eyebrow="Eligibility" title="Minimum readiness Indian students should plan around" />
          <div className="mt-10"><DataTable rows={eligibility} caption="Ausbildung eligibility table" /></div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <SectionHeading eyebrow="Process" title="Step-by-step application flow from India to Germany" />
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {processSteps.map((item) => (
            <div key={item} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.05)]">
              <p className="text-base leading-7 text-slate-700">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="visa" className="bg-slate-950 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading eyebrow="Visa" title="National visa checklist for Ausbildung applicants" theme="dark" />
          <div className="mt-10 grid gap-8 xl:grid-cols-[1fr_0.9fr]">
            <div className="grid gap-4 md:grid-cols-2">
              {visaDocs.map((item) => (
                <div key={item} className="rounded-[28px] border border-white/10 bg-white/5 p-5 text-base leading-7 text-slate-200">{item}</div>
              ))}
            </div>
            <div>
              <DataTable rows={visaFacts} caption="Ausbildung visa facts table" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <SectionHeading eyebrow="Living Costs" title="What monthly life in Germany typically costs during Ausbildung" />
        <div className="mt-10"><DataTable rows={livingCosts} caption="Ausbildung living cost table" /></div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading eyebrow="After Completion" title="What you can do once Ausbildung ends" />
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {afterAusbildung.map((item) => (
              <div key={item} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.05)]">
                <p className="text-base leading-7 text-slate-700">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <SectionHeading eyebrow="PR Pathway" title="How Ausbildung can turn into long-term residence in Germany" />
        <div className="mt-10"><DataTable rows={residencyPath} caption="Ausbildung residency pathway table" /></div>
      </section>

      <section className="bg-[linear-gradient(180deg,#ffffff_0%,#eff6ff_100%)] py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading eyebrow="Balanced View" title="Advantages and honest criticism before you choose this route" />
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="rounded-[32px] border border-sky-200 bg-sky-50 p-8">
              <h3 className="text-2xl font-bold text-slate-950">Advantages</h3>
              <ul className="mt-6 space-y-3 text-base leading-7 text-slate-700">{advantages.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
            <div className="rounded-[32px] border border-slate-200 bg-white p-8">
              <h3 className="text-2xl font-bold text-slate-950">Challenges and criticism</h3>
              <ul className="mt-6 space-y-3 text-base leading-7 text-slate-700">{criticisms.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
          </div>
        </div>
      </section>

      <AusbildungLeadSection />

      <section id="faq" className="bg-slate-950 py-16 text-white">
        <div className="mx-auto max-w-5xl px-4 lg:px-8">
          <SectionHeading eyebrow="FAQ" title="Common Ausbildung questions Indian students ask" theme="dark" />
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

