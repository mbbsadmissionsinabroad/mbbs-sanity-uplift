import Link from "next/link";
import {
  externalLinksBySection,
  type ResourceLink,
  type StaticSeoRegistryEntry,
} from "../data/staticPageResources";
import { staticSeoPages } from "../data/staticSeoRegistry";

function normalizeRoute(currentRoute: string) {
  if (currentRoute.startsWith("http://") || currentRoute.startsWith("https://")) {
    return new URL(currentRoute).pathname;
  }
  return currentRoute;
}

function pickInternalLinks(entry: StaticSeoRegistryEntry) {
  const sameKind = staticSeoPages.filter(
    (page) => page.route !== entry.route && page.kind === entry.kind && page.section === entry.section
  );

  const sameSection = staticSeoPages.filter(
    (page) =>
      page.route !== entry.route &&
      page.section === entry.section &&
      !sameKind.some((candidate) => candidate.route === page.route)
  );

  return [...sameKind, ...sameSection].slice(0, 6);
}

function LinkCard({ link, external = false }: { link: ResourceLink; external?: boolean }) {
  if (external) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="nofollow noopener noreferrer external"
        className="rounded-[24px] border border-slate-200 bg-white p-5 text-sm font-medium text-slate-700 shadow-[0_12px_30px_rgba(15,23,42,0.05)] transition hover:border-sky-300 hover:text-sky-900"
      >
        {link.label}
      </a>
    );
  }

  return (
    <Link
      href={link.href}
      className="rounded-[24px] border border-slate-200 bg-white p-5 text-sm font-medium text-slate-700 shadow-[0_12px_30px_rgba(15,23,42,0.05)] transition hover:border-sky-300 hover:text-sky-900"
    >
      {link.label}
    </Link>
  );
}

export default function StaticPageResourceLinks({
  currentRoute,
  excludeExternalLabels = [],
}: {
  currentRoute: string;
  excludeExternalLabels?: string[];
}) {
  const normalizedRoute = normalizeRoute(currentRoute);
  const currentPage = staticSeoPages.find((page) => page.route === normalizedRoute);

  if (!currentPage) {
    return null;
  }

  const internalLinks = pickInternalLinks(currentPage).map((page) => ({
    label: page.title,
    href: page.route,
  }));
  const externalLinks = (externalLinksBySection[currentPage.section] ?? []).filter(
    (link) => !excludeExternalLabels.includes(link.label)
  );

  return (
    <section className="bg-slate-50 py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="rounded-[32px] border border-sky-200 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.05)] sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-700">
            Simple Guide
          </p>
          <h3 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
            Read this page the easy way
          </h3>
          <div className="mt-5 grid gap-6 lg:grid-cols-2">
            <div className="space-y-3 text-sm leading-7 text-slate-700 md:text-base">
              <p>
                Start with the quick facts. Read that part first.
              </p>
              <p>
                Then check fees, visa steps, and stay cost.
              </p>
              <p>
                Use the tables. They help you compare real facts.
              </p>
              <p>
                Keep one goal in mind. Ask, "Can my family do this?"
              </p>
              <p>
                Do not rush to the last step. Check the full path first.
              </p>
            </div>
            <div className="space-y-3 text-sm leading-7 text-slate-700 md:text-base">
              <p>
                Read the good and bad points with your family.
              </p>
              <p>
                A low fee is not enough. The plan must fit your life.
              </p>
              <p>
                Save the pages that feel right. Drop the rest fast.
              </p>
              <p>
                If one rule feels hard, ask before you pay.
              </p>
              <p>
                A short check now can save time and money later.
              </p>
            </div>
          </div>
          <div className="mt-6 rounded-[24px] border border-slate-200 bg-slate-50 p-5">
            <h4 className="text-lg font-semibold text-slate-900">
              Easy checklist
            </h4>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {[
                "Check the full fee, not just tuition.",
                "Check if all classes are in English.",
                "Check what test comes after the course.",
                "Check how much rent and food will cost.",
                "Check how long the visa steps may take.",
                "If two paths look close, pick the safer one.",
              ].map((item) => (
                <p
                  key={item}
                  className="rounded-2xl border border-white bg-white px-4 py-3 text-sm leading-6 text-slate-700"
                >
                  {item}
                </p>
              ))}
            </div>
          </div>
          <div className="mt-6 rounded-[24px] border border-sky-100 bg-sky-50 p-5">
            <h4 className="text-lg font-semibold text-slate-900">
              In plain words
            </h4>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {[
                "This page helps you sort the route fast.",
                "Read cost first. Then read risk.",
                "Next, check the test path.",
                "Then ask if the life there suits you.",
                "Look at stay, food, and local travel.",
                "Ask what help you get after you land.",
                "See how long the course will take.",
                "See what may slow you down later.",
              ].map((item) => (
                <p
                  key={item}
                  className="rounded-2xl border border-white bg-white px-4 py-3 text-sm leading-6 text-slate-700"
                >
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-3xl">
          <p className="mt-12 text-sm font-semibold uppercase tracking-[0.3em] text-sky-700">Related Resources</p>
          <h3 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Helpful next pages and official resources
          </h3>
          <p className="mt-4 text-base leading-7 text-slate-600 md:text-lg">
            Use these guides to compare your next options. Use the official
            links to verify rules, recognition, exams, and country
            requirements.
          </p>
        </div>

        <div className="mt-10 grid gap-8 xl:grid-cols-2">
          <div>
            <h3 className="text-xl font-bold text-slate-900">Internal links</h3>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {internalLinks.map((link) => (
                <LinkCard key={link.href} link={link} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-slate-900">External links</h3>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {externalLinks.map((link) => (
                <LinkCard key={link.href} link={link} external />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
