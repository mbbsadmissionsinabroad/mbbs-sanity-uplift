import Link from "next/link";
import type { Metadata } from "next";

const siteUrl = "https://www.mbbsadmissionsinabroad.com";
const pageUrl = `${siteUrl}/mbbs-without-neet`;
const metaTitle = "MBBS Without NEET Abroad 2026 | What Indian Students Must Know";
const metaDescription =
  "Can Indian students study MBBS abroad without NEET? Learn the NMC rule, no-India-return exceptions, country risks, and safer planning options with New-Lyf.";

const safeRoutes = [
  {
    title: "NEET qualifying score for MBBS abroad",
    href: "/neet-qualifying-score-mbbs-abroad",
    body: "Understand why even a qualifying NEET score can keep India-return options open.",
  },
  {
    title: "MBBS in Russia",
    href: "/mbbs-in-russia",
    body: "Compare a mainstream MBBS abroad route where Indian students still need NEET for India registration.",
  },
  {
    title: "MBBS in Uzbekistan",
    href: "/mbbs-in-uzbekistan",
    body: "Review a budget route while keeping NMC eligibility and future licensing planning in mind.",
  },
];

const facts = [
  {
    label: "If you want to practise in India",
    value:
      "NEET qualification is mandatory before starting MBBS abroad under current NMC rules.",
  },
  {
    label: "If you do not plan to return to India",
    value:
      "Some universities may admit without NEET, but you must verify local licensing and career rules.",
  },
  {
    label: "If an agent says NEET is never needed",
    value:
      "Treat that as a red flag. The answer depends on your future country of practice.",
  },
];

const faqs = [
  {
    question: "Can Indian students study MBBS abroad without NEET?",
    answer:
      "Some foreign universities may allow admission without NEET for students who do not plan to practise in India. However, Indian students who want Indian medical registration must qualify NEET before starting MBBS abroad.",
  },
  {
    question: "Is MBBS without NEET valid in India?",
    answer:
      "For India practice, the safe answer is no. NMC requires NEET qualification for Indian citizens who study medicine abroad and later seek registration in India.",
  },
  {
    question: "What if I only want to work outside India?",
    answer:
      "Then the decision depends on the destination country's licensing rules, language, internship, degree recognition, and work-permit pathway. It still needs careful verification.",
  },
  {
    question: "Can New-Lyf help if my NEET score is low?",
    answer:
      "Yes. A low score and a qualified score are different. New-Lyf can help you check whether your score is enough for compliant MBBS abroad routes and which countries fit your budget.",
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

export default function MbbsWithoutNeetPage() {
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
    headline: "MBBS Without NEET Abroad: What Indian Students Must Know",
    description: metaDescription,
    mainEntityOfPage: pageUrl,
    publisher: {
      "@type": "Organization",
      name: "New-Lyf Overseas",
      url: siteUrl,
    },
  };

  return (
    <main className="bg-[linear-gradient(180deg,#fff7ed_0%,#f8fafc_34%,#ffffff_100%)] text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:grid lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:px-8 lg:py-20">
        <div>
          <p className="inline-flex rounded-full border border-orange-200 bg-white px-4 py-2 text-sm font-semibold uppercase tracking-[0.22em] text-orange-700 shadow-sm">
            NEET And NMC Clarity
          </p>
          <h1 className="mt-6 max-w-4xl text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
            MBBS Without NEET Abroad: The Honest Answer for Indian Students
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700">
            Many students search for MBBS without NEET after a low score or a
            missed attempt. The real answer is not a simple yes or no. It
            depends on whether you want to practise in India later.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contact"
              prefetch={false}
              className="rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Check My Eligibility
            </Link>
            <Link
              href="/neet-qualifying-score-mbbs-abroad"
              prefetch={false}
              className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-orange-300 hover:text-orange-800"
            >
              See NEET Score Guidance
            </Link>
          </div>
        </div>

        <aside className="mt-10 rounded-[32px] border border-orange-100 bg-white p-6 shadow-[0_30px_80px_rgba(15,23,42,0.08)] lg:mt-0">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-700">
            Important First
          </p>
          <h2 className="mt-4 text-3xl font-black text-slate-950">
            Do not confuse admission with medical registration
          </h2>
          <div className="mt-6 space-y-4">
            {facts.map((fact) => (
              <div
                key={fact.label}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-5"
              >
                <p className="text-sm font-bold text-slate-950">{fact.label}</p>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  {fact.value}
                </p>
              </div>
            ))}
          </div>
        </aside>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-20">
        <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm md:p-10">
          <h2 className="text-3xl font-black tracking-tight text-slate-950">
            The rule Indian families should remember
          </h2>
          <div className="mt-6 space-y-5 text-base leading-8 text-slate-700">
            <p>
              If an Indian student wants to return and practise medicine in
              India, NEET qualification is part of the legal pathway. A foreign
              university may issue an admission letter without NEET, but that
              does not automatically make the degree usable for Indian medical
              registration.
            </p>
            <p>
              This is why the phrase "MBBS without NEET" needs careful
              handling. It can describe a no-India-return plan in some
              countries, but it should not be treated as a shortcut for students
              who want an Indian licence after graduation.
            </p>
            <p>
              A safer plan is to check whether your NEET result qualifies under
              the current rule, then compare compliant countries, universities,
              total cost, internship structure, and FMGE or NExT preparation
              support. That keeps future options open.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-20">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          Safer pages to compare next
        </h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {safeRoutes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              prefetch={false}
              className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl"
            >
              <h3 className="text-xl font-black text-slate-950">{route.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {route.body}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-20 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          MBBS without NEET FAQs
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
