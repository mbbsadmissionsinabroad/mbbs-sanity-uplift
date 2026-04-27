import Link from "next/link";
import type { Metadata } from "next";
import { buildStaticPageMetadata } from "@/lib/staticPageSeo";

const route = "/nursing-jobs-in-abroad";
const canonicalUrl =
  "https://www.mbbsadmissionsinabroad.com/nursing-jobs-in-abroad";
const metaTitle = "Nursing Jobs Abroad for Indian Nurses | New-Lyf";
const metaDescription =
  "Explore nursing jobs abroad for Indian nurses with country guidance, eligibility help, language steps, and support from New-Lyf.";

const highlights = [
  "Compare countries that match your profile and budget.",
  "Understand language, licensing, and document requirements.",
  "Speak with our team before you start applications.",
];

export async function generateMetadata(): Promise<Metadata> {
  return buildStaticPageMetadata({
    route,
    fallbackTitle: metaTitle,
    fallbackDescription: metaDescription,
    fallbackCanonical: canonicalUrl,
  });
}

export default function NursingJobsAbroadPage() {
  return (
    <main className="bg-slate-50">
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <div className="space-y-6">
            <p className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold uppercase tracking-[0.25em] text-blue-700">
              Nursing Career Pathways
            </p>
            <h1 className="max-w-3xl text-4xl font-black tracking-tight text-slate-900 md:text-6xl">
              Nursing Jobs Abroad with clear guidance from New-Lyf
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-600">
              This page is the right starting point if you want to explore
              nursing jobs abroad. We help you understand country fit, document
              needs, and the next practical step before you apply.
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              {highlights.map((item) => (
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
              Get Expert Help
            </p>
            <h2 className="mt-4 text-3xl font-black text-slate-900">
              Talk to our team about nursing jobs abroad
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Share your profile, target country, and timeline. We will help
              you understand the best next step before you spend time or money.
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
                href="/nursing-job-in-germany"
                className="rounded-full border border-slate-300 px-6 py-4 text-center text-base font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
                prefetch={false}
              >
                View Nursing In Germany
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16 md:pb-24">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-black text-slate-900">
              How to use this page before you choose a country
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Nursing jobs abroad can look similar at first, but the real path changes a lot from country to country. Some
              routes depend more on language. Some depend more on licensing. Others depend on employer demand, document speed,
              or whether you already have work experience.
            </p>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Use this section as a planning filter. Compare the country fit, the language barrier, the licensing path, and
              the true relocation effort before you start paying for exams, translations, coaching, or paperwork.
            </p>
          </div>
          <div className="rounded-[2rem] border border-blue-100 bg-blue-50 p-8">
            <h2 className="text-2xl font-black text-slate-900">
              Quick checks for Indian nurses
            </h2>
            <ul className="mt-4 space-y-3 pl-5 text-sm leading-7 text-slate-700 marker:text-blue-700">
              <li>Check which countries want your exact qualification and experience level.</li>
              <li>Check the target language level before you start the job search.</li>
              <li>Check the full relocation cost, not just the salary headline.</li>
              <li>Check what happens after arrival, registration, and adaptation steps.</li>
              <li>Choose the route that is clearer and safer, not only the one that sounds faster.</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
