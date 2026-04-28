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

function LinkList({
  title,
  links,
  external = false,
}: {
  title: string;
  links: ResourceLink[];
  external?: boolean;
}) {
  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-xl font-bold text-slate-900">{title}</h3>
      <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-700">
        {links.map((link) => (
          <li key={link.href} className="border-b border-slate-100 pb-3 last:border-b-0 last:pb-0">
            {external ? (
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer external"
                className="font-medium text-slate-700 transition hover:text-sky-900"
              >
                {link.label}
              </a>
            ) : (
              <Link
                href={link.href}
                className="font-medium text-slate-700 transition hover:text-sky-900"
              >
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
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
  const readingOrder = [
    "Start with the summary. It tells you the route, the fee range, and the main risk points.",
    "Then read the cost notes, visa steps, hostel or living cost, and exam context.",
    "Use the tables to compare facts fast. Do not try to remember every line at once.",
    "Shortlist only the routes that fit your budget, language comfort, and return plan.",
    "If one rule still feels unclear, pause and verify it before paying any fee.",
  ];
  const familyQuestions = [
    "Can the family manage the full cost after tuition, hostel, food, visa, and travel?",
    "Is the language plan realistic, or will it become a stress point after admission?",
    "Is the degree, job route, or training path clear for the country and for the return plan?",
    "How safe is the city, and what support will the student get after landing?",
    "How long can admissions, visa work, and travel preparation realistically take?",
    "If two routes look close, which one feels safer over the long term, not just cheaper today?",
  ];
  const decisionNotes = [
    "A good route should stay clear after you compare cost, recognition, and daily life.",
    "Parents usually need the same four answers: safety, full cost, recognition, and support.",
    "If a page still feels vague after the summary and tables, it is not ready for a payment decision.",
    "Use these guides to reach a clear yes, a clear no, or a short list worth discussing.",
  ];

  return (
    <section className="bg-slate-50 py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="rounded-[32px] border border-sky-200 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.05)] sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-700">
            Simple Guide
          </p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
            Read this page in a simple order
          </h2>
          <div className="mt-5 space-y-4 text-sm leading-7 text-slate-700 md:text-base">
            <p>
              Most students do not need every detail at once. They need a quick way to sort strong
              options from weak ones. Use the summary first. Then check fees, recognition, language,
              visa steps, and daily life. That order gives you a better decision frame.
            </p>
            <p>
              A page like this is useful when it helps you remove confusion. If the route still feels
              unclear after you read the summary, cost notes, and official links, the safe choice is
              to verify facts before moving ahead. Good planning saves time, money, and stress.
            </p>
            <p>
              Families do not need more hype. They need visible cost, clear recognition, realistic
              timelines, and honest next steps. That is why the tables, official links, and decision
              prompts below matter more than sales language.
            </p>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
              <h3 className="text-lg font-semibold text-slate-900">Best reading order</h3>
              <ol className="mt-4 space-y-3 pl-5 text-sm leading-6 text-slate-700 marker:font-semibold marker:text-sky-700">
                {readingOrder.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </div>

            <div className="rounded-[24px] border border-sky-100 bg-sky-50 p-5">
              <h3 className="text-lg font-semibold text-slate-900">
                Ask these questions before you decide
              </h3>
              <ul className="mt-4 space-y-3 pl-5 text-sm leading-6 text-slate-700 marker:text-sky-700">
                {familyQuestions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6 rounded-[24px] border border-emerald-100 bg-emerald-50 p-5">
            <h3 className="text-lg font-semibold text-slate-900">Quick family recap</h3>
            <div className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
              <p>
                Start with total cost. Then check course length, language, recognition, visa time,
                and daily support. If the route still looks strong after that, it deserves deeper
                review. If it still feels vague, do not rush into a payment decision.
              </p>
              <p>
                The goal is not to read everything. The goal is to make a cleaner decision. A useful
                page should help you rule a route in, rule it out, or keep it on a short list for the
                next family discussion.
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-[24px] border border-amber-100 bg-amber-50 p-5">
            <h3 className="text-lg font-semibold text-slate-900">
              Signs a route is worth deeper review
            </h3>
            <ul className="mt-4 space-y-3 pl-5 text-sm leading-6 text-slate-700 marker:text-amber-700">
              {decisionNotes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-700">
            Related Resources
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Helpful next pages and official resources
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600 md:text-lg">
            Use the internal pages for comparisons and the official sources for rules, recognition,
            exams, or country guidance. This keeps your shortlist practical and evidence-based.
          </p>
        </div>

        <div className="mt-10 grid gap-8 xl:grid-cols-2">
          <LinkList title="Internal links" links={internalLinks} />
          <LinkList title="External links" links={externalLinks} external />
        </div>
      </div>
    </section>
  );
}
