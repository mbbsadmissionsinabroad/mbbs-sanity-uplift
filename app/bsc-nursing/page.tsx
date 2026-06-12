import Link from "next/link";
import type { Metadata } from "next";

const siteUrl = "https://www.mbbsadmissionsinabroad.com";
const pageUrl = `${siteUrl}/bsc-nursing`;
const metaTitle = "BSc Nursing Abroad for Indian Students 2026 | New-Lyf";
const metaDescription =
  "Explore BSc Nursing abroad options for Indian students in 2026: eligibility, countries, costs, language needs, documents, career routes, and New-Lyf guidance.";

const routeCards = [
  {
    title: "Study Nursing in Bosnia",
    href: "/study-nursing-in-bosnia",
    body: "A lower-cost European nursing education route for students who want an EU-focused healthcare pathway.",
  },
  {
    title: "Nursing Jobs in Germany",
    href: "/nursing-job-in-germany",
    body: "Best for qualified nurses who want a work-led route with German language preparation and recognition steps.",
  },
  {
    title: "Nursing Jobs in Canada",
    href: "/nursing-jobs-in-canada",
    body: "Useful for nurses comparing English-speaking migration, registration, and long-term PR possibilities.",
  },
];

const checks = [
  "Confirm whether the route is a study pathway, job pathway, or both.",
  "Check language requirements before paying for admission or coaching.",
  "Compare tuition, hostel, living cost, visa cost, and document cost together.",
  "Verify clinical training, internship expectations, and post-study work options.",
  "Ask how the route helps your long-term country goal, not only first-year admission.",
];

const faqs = [
  {
    question: "Is BSc Nursing abroad a good option for Indian students?",
    answer:
      "It can be a good option when the country, cost, language requirement, and licensing path match the student's long-term goal. It should not be chosen only because the first-year fee looks low.",
  },
  {
    question: "Do BSc Nursing abroad routes require NEET?",
    answer:
      "Most nursing routes do not work like MBBS admission, but each country and university can set its own academic and language conditions. Students should verify the current rule before applying.",
  },
  {
    question: "Which country is best for BSc Nursing abroad?",
    answer:
      "There is no single best country. Bosnia can be useful for a low-cost European study route, while Germany, Canada, Denmark, Lithuania, and the Netherlands are stronger as work or migration comparisons for qualified nurses.",
  },
  {
    question: "Can New-Lyf help compare nursing study and nursing job routes?",
    answer:
      "Yes. New-Lyf can help families compare education-led routes, job-led routes, language preparation, documents, and realistic timelines before a student commits.",
  },
];

export const metadata: Metadata = {
  title: metaTitle,
  description: metaDescription,
  alternates: {
    canonical: pageUrl,
  },
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

export default function BscNursingPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "BSc Nursing Abroad for Indian Students in 2026",
    description: metaDescription,
    mainEntityOfPage: pageUrl,
    publisher: {
      "@type": "Organization",
      name: "New-Lyf Overseas",
      url: siteUrl,
    },
  };

  return (
    <main className="bg-[linear-gradient(180deg,#eff6ff_0%,#f8fafc_36%,#ffffff_100%)] text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 lg:px-8 lg:py-20">
        <div>
          <p className="inline-flex rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-semibold uppercase tracking-[0.22em] text-blue-700 shadow-sm">
            Nursing Study Abroad
          </p>
          <h1 className="mt-6 max-w-4xl text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
            BSc Nursing Abroad for Indian Students in 2026
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700">
            BSc Nursing abroad can be a smart healthcare route when the country,
            clinical training, language requirement, and cost are understood
            clearly. This page helps Indian students compare the route before
            committing time or money.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contact"
              prefetch={false}
              className="rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Talk To New-Lyf
            </Link>
            <Link
              href="/study-nursing-in-bosnia"
              prefetch={false}
              className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:text-blue-800"
            >
              Study Nursing In Bosnia
            </Link>
          </div>
        </div>

        <aside className="mt-10 rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_30px_80px_rgba(15,23,42,0.08)] lg:mt-0">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-700">
            Quick Decision Filter
          </p>
          <h2 className="mt-4 text-3xl font-black text-slate-950">
            Do not choose a nursing route from fees alone
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600">
            A nursing pathway must make sense after admission too: classroom
            language, clinical exposure, registration rules, post-study options,
            and settlement support all matter.
          </p>
          <ul className="mt-6 space-y-3 pl-5 text-sm leading-7 text-slate-700 marker:text-blue-700">
            {checks.map((check) => (
              <li key={check}>{check}</li>
            ))}
          </ul>
        </aside>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-20">
        <div className="grid gap-6 md:grid-cols-3">
          {routeCards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              prefetch={false}
              className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
            >
              <h2 className="text-xl font-black text-slate-950">{card.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{card.body}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
        <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm md:p-10">
          <h2 className="text-3xl font-black tracking-tight text-slate-950">
            What Indian students should confirm first
          </h2>
          <div className="mt-6 space-y-5 text-base leading-8 text-slate-700">
            <p>
              Nursing abroad is not one single pathway. Some students are
              looking for a degree route after Class 12. Some qualified nurses
              are looking for a job route. Others want a lower-cost study route
              that can later connect to Europe. The right answer changes with
              your qualification, language readiness, budget, and target
              country.
            </p>
            <p>
              If you are still at the education stage, start by checking
              admission eligibility, course duration, clinical exposure, hostel
              cost, visa requirements, and whether the route offers a realistic
              career path after graduation. If you are already a nurse, compare
              registration, language exams, work experience requirements, and
              employer demand.
            </p>
            <p>
              New-Lyf helps students and families compare these differences
              before they apply. The aim is not to push the fastest-looking
              route. The aim is to choose a route that remains practical after
              admission, during training, and after the student reaches the
              destination country.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-20 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          BSc Nursing abroad FAQs
        </h2>
        <div className="mt-6 divide-y divide-slate-200 rounded-[28px] border border-slate-200 bg-white">
          {faqs.map((faq) => (
            <details key={faq.question} className="group p-6">
              <summary className="cursor-pointer text-lg font-bold text-slate-950">
                {faq.question}
              </summary>
              <p className="mt-3 text-base leading-7 text-slate-600">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
