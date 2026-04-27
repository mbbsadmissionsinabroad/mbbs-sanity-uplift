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
    </main>
  );
}
