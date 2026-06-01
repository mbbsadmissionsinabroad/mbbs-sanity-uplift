import type { Metadata } from "next";
import Link from "next/link";
import StaticPageResourceLinks from "@/app/components/StaticPageResourceLinks";
import { buildStaticPageMetadata } from "@/lib/staticPageSeo";
import {
  admissionRequirements,
  approbationSteps,
  articleSchema,
  breadcrumbSchema,
  careers,
  comparison,
  eligibility,
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
  privateCosts,
  publicCosts,
  quickSummary,
  roadmap,
  scholarships,
  specializations,
  syllabus,
  universities,
  whatsappHref,
  whatsappNumber,
  whyChooseReasons,
} from "./pageData";

type Row = Record<string, string | undefined>;

export async function generateMetadata(): Promise<Metadata> {
  return buildStaticPageMetadata({
    route: "/pg-in-pharm-d",
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

export default function PgInPharmDPage() {
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
              2026 Germany pharmacy PG guide for Indian Pharm D graduates
            </div>
            <h1 className="mt-6 max-w-4xl text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
              {pageTitle}
            </h1>
            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
              Last Updated: {lastUpdated}
            </p>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700 md:text-xl">
              Germany is one of the strongest long-term routes for Indian Pharm D
              graduates because it combines zero-tuition public universities,
              Approbation potential, real pharmacist demand, and a much cleaner
              return on preparation cost than many English-speaking countries.
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
                ["#why-germany", "Why Germany"],
                ["#eligibility", "Eligibility"],
                ["#roadmap", "Roadmap"],
                ["#universities", "Top universities"],
                ["#fees", "Fees breakdown"],
                ["#approbation", "Approbation"],
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
          title="The Germany Pharm D snapshot Indian students should understand first"
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
        <div className="mt-8 rounded-[28px] border border-amber-200 bg-amber-50 p-5 text-sm leading-7 text-amber-900">
          Language warning: German C1 is not a minor checkbox here. It is one
          of the main practical gates for public-university access, Approbation,
          and employability after study.
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <SectionHeading
          eyebrow="Key Facts"
          title="The numbers and rules that drive this route"
        />
        <div className="mt-10">
          <DataTable rows={keyFacts} caption="Germany Pharm D key facts table" />
        </div>
      </section>

      <section id="why-germany" className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading
            eyebrow="Why Germany"
            title="Why Germany is unusually strong for Indian Pharm D graduates"
            description="Germany stands out because it combines public-university affordability, pharmacist licensing value, industrial depth, and a clearer PR pathway than most other pharmacy destinations."
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

      <section id="eligibility" className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <SectionHeading
          eyebrow="Equivalency And Eligibility"
          title="How Indian pharmacy qualifications are usually viewed"
        />
        <div className="mt-10">
          <DataTable rows={eligibility} caption="Germany Pharm D equivalency table" />
        </div>
        <h3 className="mt-10 text-2xl font-bold text-slate-900">
          Admission requirements for master's applications
        </h3>
        <div className="mt-5">
          <DataTable
            rows={admissionRequirements}
            caption="Germany Pharm D admission requirements table"
          />
        </div>
      </section>

      <section id="roadmap" className="bg-slate-950 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading
            eyebrow="Roadmap"
            title="The step-by-step Germany Pharm D pathway from India"
            theme="dark"
          />
          <div className="mt-10">
            <DataTable rows={roadmap} caption="Germany Pharm D roadmap table" />
          </div>
        </div>
      </section>

      <section id="universities" className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <SectionHeading
          eyebrow="Top Universities"
          title="Germany universities Indian pharmacy students compare most seriously"
        />
        <div className="mt-10">
          <DataTable rows={universities} caption="Germany Pharm D top universities table" />
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading
            eyebrow="Syllabus"
            title="What a 2-year Germany pharmacy master's usually covers"
          />
          <div className="mt-10">
            <DataTable rows={syllabus} caption="Germany pharmacy master's syllabus table" />
          </div>
          <h3 className="mt-10 text-2xl font-bold text-slate-900">
            Major specialisation tracks
          </h3>
          <div className="mt-5">
            <DataTable
              rows={specializations}
              caption="Germany pharmacy specialisation tracks table"
            />
          </div>
        </div>
      </section>

      <section id="fees" className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <SectionHeading
          eyebrow="Fees Breakdown"
          title="What the Germany Pharm D route really costs"
        />
        <h3 className="mt-10 text-2xl font-bold text-slate-900">
          Public universities: zero tuition route
        </h3>
        <div className="mt-5">
          <DataTable rows={publicCosts} caption="Germany Pharm D public university cost table" />
        </div>
        <h3 className="mt-10 text-2xl font-bold text-slate-900">
          Private universities: premium-cost route
        </h3>
        <div className="mt-5">
          <DataTable rows={privateCosts} caption="Germany Pharm D private university cost table" />
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading
            eyebrow="Living Cost"
            title="How expensive daily life in Germany feels for pharmacy students"
          />
          <div className="mt-10">
            <DataTable rows={livingCosts} caption="Germany Pharm D living cost table" />
          </div>
          <p className="mt-6 rounded-[28px] border border-emerald-200 bg-emerald-50 p-5 text-sm leading-7 text-emerald-900">
            German student visa rules allow part-time work up to 20 hours per
            week, which can soften living-cost pressure if the student manages
            time carefully and finds legally compatible work.
          </p>
        </div>
      </section>

      <section id="approbation" className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <SectionHeading
          eyebrow="Approbation"
          title="How the pharmacist licensing process usually unfolds"
        />
        <div className="mt-10">
          <DataTable rows={approbationSteps} caption="Germany Approbation process table" />
        </div>
      </section>

      <section className="bg-slate-950 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading
            eyebrow="Career Scope"
            title="Where the Germany pharmacy route can take you after study"
            theme="dark"
          />
          <div className="mt-10">
            <DataTable rows={careers} caption="Germany Pharm D career scope table" />
          </div>
          <h3 className="mt-10 text-2xl font-bold text-white">
            Major employers in the German pharmacy ecosystem
          </h3>
          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {employers.map((employer) => (
              <div
                key={employer}
                className="rounded-[26px] border border-white/10 bg-white/5 p-5 text-sm leading-7 text-slate-200"
              >
                {employer}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading
            eyebrow="Scholarships"
            title="Funding and support options Indian students should know"
          />
          <div className="mt-10">
            <DataTable rows={scholarships} caption="Germany Pharm D scholarship table" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <SectionHeading
          eyebrow="Compare Destinations"
          title="How Germany compares with other Pharm D PG destinations"
        />
        <div className="mt-10">
          <DataTable rows={comparison} caption="Germany versus other Pharm D destinations table" />
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <Link
            href="/medical-pg-in-germany"
            className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_12px_30px_rgba(15,23,42,0.05)] transition hover:border-blue-200 hover:text-blue-800"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-700">
              Related guide
            </p>
            <p className="mt-3 text-lg font-semibold text-slate-900">
              Medical PG in Germany
            </p>
          </Link>
          <Link
            href="/learn-german-language-course-in-bangalore"
            className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_12px_30px_rgba(15,23,42,0.05)] transition hover:border-blue-200 hover:text-blue-800"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-700">
              Preparation guide
            </p>
            <p className="mt-3 text-lg font-semibold text-slate-900">
              Learn German before Germany applications
            </p>
          </Link>
        </div>
      </section>

      <section className="bg-slate-950 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading
            eyebrow="Call To Action"
            title="Launch your Germany pharmacy pathway with a plan that starts early enough"
            description="For Pharm D students, Germany can be one of the highest-ROI professional routes available, but only when the language, APS, application, and Approbation sequence are handled in the right order."
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

      <StaticPageResourceLinks currentRoute={pageUrl} />

      <section id="faq" className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <SectionHeading
          eyebrow="FAQs"
          title="Straight answers to the questions Pharm D graduates ask most"
        />
        <div className="mt-10 space-y-4">
          {faqs.map((faq, index) => (
            <article
              key={faq.question}
              className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_12px_30px_rgba(15,23,42,0.05)]"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-700">
                Question {index + 1}
              </p>
              <h3 className="mt-3 text-xl font-bold text-slate-900">
                {faq.question}
              </h3>
              <p className="mt-4 text-base leading-7 text-slate-700">
                {faq.answer}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
