import { buildStaticPageMetadata } from "@/lib/staticPageSeo";
import StaticPageResourceLinks from "@/app/components/StaticPageResourceLinks";
import type { Metadata } from "next";
import Link from "next/link";
import KrasnoyarskLeadSection from "./KrasnoyarskLeadSection";
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
  russiaComparison,
  scholarships,
  syllabus,
  timeline,
  whatsappHref,
  whatsappNumber,
} from "./pageData";

type Row = Record<string, string | undefined>;

export async function generateMetadata(): Promise<Metadata> {
  return buildStaticPageMetadata({
    route: "/krasnoyarsk-state-medical-university-russia",
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
      <p className={`text-sm font-semibold uppercase tracking-[0.3em] ${dark ? "text-sky-300" : "text-sky-700"}`}>
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

export default function KrasnoyarskPage() {
  return (
    <main className="bg-[linear-gradient(180deg,#eff6ff_0%,#f8fafc_28%,#ffffff_65%)] text-slate-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <section className="relative overflow-hidden border-b border-sky-100">
        <div className="absolute inset-x-0 top-0 h-[34rem] bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.18),_transparent_35%),radial-gradient(circle_at_top_right,_rgba(14,165,233,0.12),_transparent_30%),linear-gradient(180deg,_rgba(255,255,255,0.96),_rgba(255,255,255,0.86))]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-20">
          <div>
            <div className="inline-flex rounded-full border border-sky-200 bg-white/90 px-4 py-2 text-sm font-medium text-sky-800 shadow-sm">
              2026-27 KSMU guide for Indian medical aspirants
            </div>
            <h1 className="mt-6 max-w-4xl text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
              {pageTitle}
            </h1>
            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
              Last Updated: {lastUpdated}
            </p>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700 md:text-xl">
              Compare KSMU fees, FMGE context, Russia living realities, documentation steps and India-return planning before you commit to the Siberia route.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#quick-summary" className="rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">Start With Summary</a>
              <a href={whatsappHref} target="_blank" rel="noreferrer" className="rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition hover:brightness-95">WhatsApp {whatsappNumber}</a>
              <a href="#fees" className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-500 hover:text-slate-950">See Fees</a>
              <a href="#krasnoyarsk-contact-form" className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-500 hover:text-slate-950">Request Callback</a>
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
                ["#fees", "Fees breakdown"],
                ["#fmge", "FMGE context"],
                ["#comparison", "Russia comparison"],
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
        <SectionHeading level="h2" eyebrow="Quick Summary" title="A fast KSMU snapshot before you go deeper" />
        <div className="mt-10 grid gap-5 lg:grid-cols-5">
          {quickSummary.map((item) => (
            <article key={item.feature} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.05)]">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-700">{item.feature}</p>
              <p className="mt-4 text-base leading-7 text-slate-700">{item.details}</p>
            </article>
          ))}
        </div>
        <div className="mt-8 rounded-[28px] border border-sky-200 bg-sky-50 p-5 text-sm leading-7 text-sky-950">
          Russia awards a physician or general-medicine degree rather than a degree titled MBBS. Indian students usually use the MBBS label for convenience, but licensing usability is what actually matters.
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <SectionHeading eyebrow="Key Facts" title="At-a-glance KSMU facts for 2026-27" />
        <div className="mt-10"><DataTable rows={keyFacts} caption="KSMU key facts table" /></div>
      </section>

      <section id="timeline" className="bg-slate-950 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading eyebrow="Timeline" title="Admission planning for the KSMU route" theme="dark" />
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
        <SectionHeading eyebrow="Eligibility" title="Minimum criteria Indian students should meet" />
        <div className="mt-10"><DataTable rows={eligibility} caption="KSMU eligibility table" /></div>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {eligibilityNotes.map((note) => (
            <div key={note} className="rounded-3xl border border-slate-200 bg-slate-50 p-5 text-sm leading-7 text-slate-700">
              {note.includes("/mbbs-without-neet") ? (
                <>
                  Licensing rules matter here too.{" "}
                  <Link href="/contact" className="font-semibold text-sky-700 underline underline-offset-4">
                    Read the full explanation
                  </Link>.
                </>
              ) : (
                note
              )}
            </div>
          ))}
        </div>
      </section>

      <section id="comparison" className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading eyebrow="Russia Comparison" title="How KSMU stacks up against other Russia shortlists" />
          <div className="mt-10"><DataTable rows={russiaComparison} caption="KSMU versus other Russia universities table" /></div>
          <p className="mt-6 rounded-3xl border border-sky-200 bg-sky-50 p-5 text-sm leading-7 text-sky-900">
            KSMU is often chosen by students who want a more serious Russia pick than the cheapest end of the market, especially when India-return confidence matters.
          </p>
        </div>
      </section>

      <section id="fees" className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <SectionHeading eyebrow="Fees Breakdown" title="Transparent budgeting before you commit to KSMU" />
        <div className="mt-10"><DataTable rows={feeBreakdown} caption="KSMU fee breakdown table" /></div>
        <h3 className="mt-10 text-xl font-bold text-slate-900">Other major yearly or one-time costs</h3>
        <div className="mt-5"><DataTable rows={additionalCosts} caption="KSMU additional costs table" /></div>
      </section>

      <section id="fmge" className="bg-[linear-gradient(180deg,#f8fafc_0%,#eff6ff_100%)] py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading eyebrow="FMGE Context" title="India licensing context for KSMU graduates" />
          <div className="mt-10 grid gap-8 xl:grid-cols-2">
            <div>
              <h3 className="mb-4 text-xl font-bold text-slate-900">What the FMGE reputation really means</h3>
              <DataTable rows={fmgeContext} caption="KSMU FMGE context table" />
            </div>
            <div className="rounded-[32px] border border-sky-200 bg-white p-8 shadow-[0_18px_40px_rgba(15,23,42,0.05)]">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-700">Practical view</p>
              <h3 className="mt-4 text-2xl font-bold text-slate-950">Treat the 60%+ figure as directional, not automatic</h3>
              <p className="mt-4 text-base leading-7 text-slate-700">
                KSMU is regularly promoted as one of the better Russia options for FMGE outcomes. That is useful as a shortlist signal, but students should still ask what that means in practice: how many candidates, which batch, and how much coaching support those students used.
              </p>
              <p className="mt-4 text-base leading-7 text-slate-700">
                The smart reading is this: KSMU may offer a better starting position than the Russia average, but personal exam preparation still decides whether you convert that advantage into a licence in India.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <SectionHeading eyebrow="Recognition" title="Recognition stack and why it matters" />
        <div className="mt-10"><DataTable rows={recognition} caption="KSMU recognition table" /></div>
      </section>

      <section className="bg-slate-950 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading eyebrow="Curriculum" title="Year-wise curriculum shape at KSMU" theme="dark" />
          <div className="mt-10"><DataTable rows={syllabus} caption="KSMU year-wise curriculum table" /></div>
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
          <SectionHeading eyebrow="Living Costs" title="Monthly living picture in Krasnoyarsk" />
          <div className="mt-10"><DataTable rows={livingCosts} caption="Krasnoyarsk living cost table" /></div>
          <p className="mt-6 rounded-3xl border border-sky-200 bg-sky-50 p-5 text-sm leading-7 text-sky-900">
            The real hidden budget item here is winter adjustment. Good boots, coats and thermal basics are not optional in Siberia, so first-year planning should account for them honestly.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <SectionHeading eyebrow="Pros And Cons" title="Balanced view before you choose KSMU" />
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-[32px] border border-sky-200 bg-sky-50 p-8">
            <h3 className="text-2xl font-bold text-slate-950">Advantages</h3>
            <ul className="mt-6 space-y-3 text-base leading-7 text-slate-700">
              {advantages.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-[32px] border border-slate-200 bg-white p-8">
            <h3 className="text-2xl font-bold text-slate-950">Disadvantages</h3>
            <ul className="mt-6 space-y-3 text-base leading-7 text-slate-700">
              {disadvantages.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-[linear-gradient(180deg,#ffffff_0%,#eff6ff_100%)] py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading eyebrow="Alternatives" title="How KSMU compares with other common options" />
          <div className="mt-10"><DataTable rows={comparison} caption="KSMU alternatives comparison table" /></div>
          <p className="mt-6 text-sm leading-7 text-slate-600">
            If cost is the first filter, also compare with{" "}
            <Link href="/mbbs-in-uzbekistan" className="font-semibold text-sky-700 underline underline-offset-4">
              MBBS in Uzbekistan 2026
            </Link>
            . If you want the broader country-level Russia picture, review{" "}
                <Link href="/mbbs-in-russia" className="font-semibold text-sky-700 underline underline-offset-4">
              MBBS in Russia for Indian students
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <SectionHeading eyebrow="Scholarships" title="Funding and affordability options" />
        <div className="mt-10"><DataTable rows={scholarships} caption="KSMU scholarships table" /></div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading eyebrow="Documents" title="The application file you should prepare early" />
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {documents.map((item) => (
              <div key={item} className="rounded-[28px] border border-slate-200 bg-white p-5 text-base leading-7 text-slate-700 shadow-[0_18px_40px_rgba(15,23,42,0.05)]">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <SectionHeading eyebrow="Career Pathways" title="Where this degree can take you next" />
        <div className="mt-10"><DataTable rows={careerPathways} caption="KSMU career pathways table" /></div>
        <p className="mt-6 text-sm leading-7 text-slate-600">
          If your family is also comparing allied healthcare routes, explore{" "}
          <Link href="/contact" className="font-semibold text-sky-700 underline underline-offset-4">
            BSc Nursing abroad
          </Link>
          {" "}for a shorter and often lower-cost healthcare path.
        </p>
      </section>
      <StaticPageResourceLinks currentRoute={pageUrl} />


      <KrasnoyarskLeadSection />

      <section id="faq" className="bg-slate-950 py-16 text-white">
        <div className="mx-auto max-w-5xl px-4 lg:px-8">
          <SectionHeading eyebrow="FAQ" title="Common KSMU questions Indian students ask" theme="dark" />
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
