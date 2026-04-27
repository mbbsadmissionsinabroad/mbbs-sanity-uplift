import Link from "next/link";
import type { Metadata } from "next";
import { buildStaticPageMetadata } from "@/lib/staticPageSeo";

const route = "/pg-in-abroad";
const canonicalUrl = "https://www.mbbsadmissionsinabroad.com/pg-in-abroad";
const metaTitle = "PG Abroad for Indian Doctors | New-Lyf";
const metaDescription =
  "Explore PG abroad options for Indian doctors with guidance on eligibility, country fit, licensing pathways, and counselling support.";

const checklist = [
  "Know which PG path matches your profile and long-term plan.",
  "Understand eligibility, paperwork, and country-specific steps.",
  "Get direct guidance before you begin the process.",
];

export async function generateMetadata(): Promise<Metadata> {
  return buildStaticPageMetadata({
    route,
    fallbackTitle: metaTitle,
    fallbackDescription: metaDescription,
    fallbackCanonical: canonicalUrl,
  });
}

export default function PgAbroadPage() {
  return (
    <main className="bg-slate-50">
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <div className="space-y-6">
            <p className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold uppercase tracking-[0.25em] text-blue-700">
              Postgraduate Guidance
            </p>
            <h1 className="max-w-3xl text-4xl font-black tracking-tight text-slate-900 md:text-6xl">
              PG Abroad planning made simpler with New-Lyf
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-600">
              Use this page as your starting point for PG abroad guidance. We
              help doctors and families understand eligibility, destination
              options, and the practical next steps before applying.
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              {checklist.map((item) => (
                <div
                  key={item}
                  className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <p className="text-sm font-medium leading-7 text-slate-700">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl shadow-blue-100/60">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-700">
              Speak With Us
            </p>
            <h2 className="mt-4 text-3xl font-black text-slate-900">
              Get help for your PG abroad plan
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Share your specialty interest, present status, and preferred
              destination so our team can guide you on the most useful next
              step.
            </p>
            <div className="mt-8 flex flex-col gap-4">
              <Link
                href="/contact"
                className="rounded-full bg-blue-700 px-6 py-4 text-center text-base font-semibold text-white transition hover:bg-blue-800"
                prefetch={false}
              >
                Contact New-Lyf
              </Link>
              <Link
                href="/medical-pg-in-europe-for-indian-students"
                className="rounded-full border border-slate-300 px-6 py-4 text-center text-base font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
                prefetch={false}
              >
                View Medical PG Guidance
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16 md:pb-24">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-black text-slate-900">
              What doctors should compare first
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              PG abroad is not one single route. It can mean exam-led entry, hospital-led training, university-led study, or a
              mixed pathway where licensing, language, and specialty fit all matter at the same time.
            </p>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Before you choose a country, compare the recognition path, the licensing steps, the training structure, and the
              amount of preparation needed from India. This helps you avoid spending months on a route that looks attractive on
              paper but does not fit your long-term plan.
            </p>
          </div>
          <div className="rounded-[2rem] border border-blue-100 bg-blue-50 p-8">
            <h2 className="text-2xl font-black text-slate-900">
              Practical PG abroad checklist
            </h2>
            <ul className="mt-4 space-y-3 pl-5 text-sm leading-7 text-slate-700 marker:text-blue-700">
              <li>Check whether the path is exam heavy, language heavy, or hospital application heavy.</li>
              <li>Check the true time to start training, not only the final salary potential.</li>
              <li>Check whether your specialty interest is realistic in that country.</li>
              <li>Check how much paperwork, translation, and verification will be needed.</li>
              <li>Choose the route that gives a stable training path, not just a popular headline.</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
