import { buildStaticPageMetadata } from "@/lib/staticPageSeo";
import StaticPageResourceLinks from "@/app/components/StaticPageResourceLinks";
import type { Metadata } from "next";
import Link from "next/link";
import MedicalPgGermanyLeadSection from "./MedicalPgGermanyLeadSection";
import {
  advantages,
  articleSchema,
  breadcrumbSchema,
  careerPathways,
  comparison,
  costBreakdown,
  documents,
  eligibility,
  faqs,
  faqSchema,
  highlights,
  hospitals,
  ivrNumber,
  keyFacts,
  lastUpdated,
  livingCosts,
  metaDescription,
  metaTitle,
  pageTitle,
  pageUrl,
  postPgSteps,
  processSteps,
  quickSummary,
  recognition,
  salaryStages,
  scholarships,
  specialtyDuration,
  specialtySalaries,
  timeline,
  trainingYears,
  disadvantages,
  whatsappHref,
  whatsappNumber,
} from "./pageData";

type Row = Record<string, string | undefined>;

export async function generateMetadata(): Promise<Metadata> {
  return buildStaticPageMetadata({
    route: "/medical-pg-in-germany",
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

export default function MedicalPgInGermanyPage() {
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
              2026-27 Germany medical PG guide for Indian doctors
            </div>
            <h1 className="mt-6 max-w-4xl text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
              {pageTitle}
            </h1>
            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
              Last Updated: {lastUpdated}
            </p>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700 md:text-xl">
              Germany PG is a paid doctor employment pathway, not a tuition-driven university course. You prepare for Approbation, secure an Assistenzarzt contract, and earn while you complete specialist training.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#quick-summary" className="rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">Start With Summary</a>
              <a href={whatsappHref} target="_blank" rel="noreferrer" className="rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition hover:brightness-95">WhatsApp {whatsappNumber}</a>
              <a href="#costs" className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-500 hover:text-slate-950">See Costs</a>
              <a href="#medical-pg-germany-contact-form" className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-500 hover:text-slate-950">Request Callback</a>
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
                ["#timeline", "2026-27 timeline"],
                ["#hospitals", "Top hospitals"],
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
        <SectionHeading level="h2" eyebrow="Quick Summary" title="The Germany PG snapshot doctors should understand first" />
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {quickSummary.map((item) => (
            <article key={item.detail} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.05)]">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-700">{item.detail}</p>
              <p className="mt-4 text-base leading-7 text-slate-700">{item.fact}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <SectionHeading eyebrow="Key Facts" title="The numbers and rules that drive this route" />
        <div className="mt-10">
          <DataTable rows={keyFacts} caption="Medical PG Germany key facts table" />
        </div>
      </section>

      <section id="timeline" className="bg-slate-950 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading eyebrow="Timeline" title="What the Germany PG path usually looks like from India to residency start" theme="dark" />
          <div className="mt-10">
            <DataTable rows={timeline} caption="Medical PG Germany timeline table" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <SectionHeading eyebrow="Step By Step" title="The Germany PG sequence that keeps your timeline efficient" />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {processSteps.map((step) => (
            <div key={step.title} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.05)]">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-700">{step.title}</p>
              <p className="mt-3 text-base leading-7 text-slate-700">{step.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading eyebrow="Eligibility" title="Who actually fits the Germany PG route" />
          <div className="mt-10">
            <DataTable rows={eligibility} caption="Medical PG Germany eligibility table" />
          </div>
        </div>
      </section>

      <section id="hospitals" className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <SectionHeading eyebrow="Top Hospitals" title="Hospitals and medical centers Indian doctors compare most often" />
        <div className="mt-10">
          <DataTable rows={hospitals} caption="Medical PG Germany top hospitals table" />
        </div>
      </section>

      <section id="costs" className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading eyebrow="Costs and Fees" title="What you spend before Germany starts paying you back" />
          <div className="mt-10">
            <DataTable rows={costBreakdown} caption="Medical PG Germany pre-residency cost table" />
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={whatsappHref} target="_blank" rel="noreferrer" className="rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition hover:brightness-95">Ask Costs on WhatsApp</a>
            <a href="#medical-pg-germany-contact-form" className="rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">Get a Germany Plan</a>
            <a href={`tel:${ivrNumber.replace(/\s+/g, "")}`} className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-500 hover:text-slate-950">Call IVR</a>
          </div>
        </div>
      </section>

      <section id="salary" className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <SectionHeading eyebrow="Salary Data" title="How German doctor income scales during and after residency" />
        <div className="mt-10 grid gap-8 xl:grid-cols-2">
          <DataTable rows={salaryStages} caption="Medical PG Germany career-stage salary table" />
          <DataTable rows={specialtySalaries} caption="Medical PG Germany specialty salary table" />
        </div>
      </section>

      <section className="bg-slate-950 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading eyebrow="Recognition" title="How Germany PG is viewed by licensing and career systems" theme="dark" />
          <div className="mt-10">
            <DataTable rows={recognition} caption="Medical PG Germany recognition table" />
          </div>
          <div className="mt-8 rounded-[28px] border border-rose-400/30 bg-rose-500/10 p-5 text-sm leading-7 text-rose-100">
            The India-return caveat is critical: German Facharzt is globally useful, but it is not a direct substitute for Indian MD/MS recognition.
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <SectionHeading eyebrow="Training Structure" title="How Weiterbildung unfolds year by year" />
        <div className="mt-10 grid gap-8 xl:grid-cols-2">
          <DataTable rows={trainingYears} caption="Medical PG Germany training-year table" />
          <DataTable rows={specialtyDuration} caption="Medical PG Germany specialty-duration table" />
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading eyebrow="After PG" title="What opens up once you finish Facharzt" />
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {postPgSteps.map((step, index) => (
              <div key={step} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.05)]">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-700">Next step {index + 1}</p>
                <p className="mt-3 text-base leading-7 text-slate-700">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <SectionHeading eyebrow="Living Costs" title="How city choice changes your savings during residency" />
        <div className="mt-10">
          <DataTable rows={livingCosts} caption="Medical PG Germany living-cost table" />
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading eyebrow="Pros and Cons" title="The honest Germany trade-off for Indian doctors" />
          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <div className="rounded-[32px] border border-emerald-200 bg-emerald-50 p-8">
              <h3 className="text-2xl font-bold text-emerald-950">Advantages</h3>
              <div className="mt-6 space-y-4">
                {advantages.map((item) => (
                  <div key={item} className="rounded-2xl bg-white/80 px-4 py-4 text-sm leading-7 text-emerald-950">
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[32px] border border-rose-200 bg-rose-50 p-8">
              <h3 className="text-2xl font-bold text-rose-950">Disadvantages</h3>
              <div className="mt-6 space-y-4">
                {disadvantages.map((item) => (
                  <div key={item} className="rounded-2xl bg-white/80 px-4 py-4 text-sm leading-7 text-rose-950">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <SectionHeading eyebrow="Compare Options" title="How Germany stacks up against other PG destinations" />
        <div className="mt-10">
          <DataTable rows={comparison} caption="Medical PG destination comparison table" />
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
            <Link href="/mbbs-admission-in-germany-for-indian-students" className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_12px_30px_rgba(15,23,42,0.05)] transition hover:border-blue-200 hover:text-blue-800">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-700">Related guide</p>
            <p className="mt-3 text-lg font-semibold text-slate-900">MBBS in Germany for free</p>
          </Link>
          <Link href="/contact" className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_12px_30px_rgba(15,23,42,0.05)] transition hover:border-blue-200 hover:text-blue-800">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-700">Alternative guide</p>
            <p className="mt-3 text-lg font-semibold text-slate-900">MBBS without NEET for Indian students</p>
          </Link>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading eyebrow="Support and Funding" title="What financial support exists around this route" />
          <div className="mt-10">
            <DataTable rows={scholarships} caption="Medical PG Germany support table" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <SectionHeading eyebrow="Documents" title="The file set that decides whether your process moves smoothly" />
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {documents.map((item) => (
            <div key={item} className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.05)]">
              <p className="text-sm leading-7 text-slate-700">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-950 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading eyebrow="Career Pathways" title="What a German specialist qualification can open next" theme="dark" />
          <div className="mt-10">
            <DataTable rows={careerPathways} caption="Medical PG Germany career-pathways table" />
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading
            eyebrow="Plain Language Review"
            title="How to decide if Germany PG is actually the right doctor route for you"
          />
          <div className="mt-8 rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.05)]">
            <div className="space-y-4 text-sm leading-7 text-slate-700 md:text-base">
              <p>
                Germany works well for doctors who want a structured long-term
                specialist path and are ready for the language and licensing
                work needed before the route becomes stable. It is usually not
                the best option for someone who wants the shortest route, the
                lightest document burden, or a fast shortcut to an India-ready
                postgraduate label.
              </p>
              <p>
                The safest way to judge the route is to compare four things in a
                fixed order. First check language readiness. Then check
                Approbation and document work. Then check the likely timeline to
                the first stable hospital contract. Only after that should you
                compare salary and long-term migration value. That order keeps
                the decision practical.
              </p>
              <p>
                A family should also test whether the process still makes sense
                after a second reading. If the language plan, total cost,
                licensing path, and first employment checkpoint all remain
                understandable, the route is worth deeper review. If one of
                those parts still feels vague, more checking is needed before
                fees, resignations, or major document spending.
              </p>
              <p>
                In simple terms, Germany PG is strong when the doctor wants a
                serious long-game route and can handle the build-up phase with
                patience. The page should help you decide that clearly. It
                should not leave you dependent on guesswork.
              </p>
            </div>
          </div>
        </div>
      </section>
      <StaticPageResourceLinks
        currentRoute={pageUrl}
        excludeExternalLabels={["Make it in Germany"]}
      />


      <MedicalPgGermanyLeadSection />

      <section id="faq" className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <SectionHeading eyebrow="FAQs" title="Straight answers to the questions doctors ask most" />
        <div className="mt-10 space-y-4">
          {faqs.map((faq, index) => (
            <article key={faq.question} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_12px_30px_rgba(15,23,42,0.05)]">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-700">Question {index + 1}</p>
              <h3 className="mt-3 text-xl font-bold text-slate-900">{faq.question}</h3>
              <p className="mt-4 text-base leading-7 text-slate-700">{faq.answer}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
