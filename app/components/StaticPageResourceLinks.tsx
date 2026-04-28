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
  const readingOrder = [
    "Start with the summary so you know the route, the fee range, and the main risk points.",
    "Move to fees, visa steps, hostel or living cost, and exam context before you compare colleges.",
    "Use the tables to compare facts fast instead of reading every line in one sitting.",
    "Shortlist only the pages that fit your budget, your language comfort, and your return plan.",
    "Ask for help before paying any fee if one rule, city, university, or exam step still feels unclear.",
  ];
  const familyQuestions = [
    "Does the full cost fit our family budget after tuition, hostel, food, visa, and travel?",
    "Is the course fully in English, and what happens if the student struggles after the first year?",
    "What is the India return path or local licensing path after the course is complete?",
    "How safe is the city, and what daily support will the student actually get after landing?",
    "How long can admissions, visa, and travel preparation realistically take from this point?",
    "If two options look close, which one gives the safer long-term outcome instead of the cheapest first impression?",
  ];
  const decisionNotes = [
    "Students often lose time when they compare ten countries at once. It is better to compare three realistic options properly.",
    "Parents usually care about the same core points. They want safe cities, visible total cost, recognition clarity, and support after landing.",
    "If one route still feels confusing after reading the summary, that route is not ready for a payment decision yet.",
    "A strong page should make the next step easier. It should not force you to guess about fees, documents, timelines, or recognition.",
  ];

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
          <div className="mt-5 space-y-4 text-sm leading-7 text-slate-700 md:text-base">
            <p>
              Most students do not need every line on the page at once. They need a fast way to sort good options from weak
              ones. Use this guide as a filter first, then go deeper only on the parts that affect fees, recognition, language,
              exams, and long-term safety.
            </p>
            <p>
              A page like this works best when you read it with one clear question in mind. Ask whether the route matches your
              budget, your study comfort, your family support, and your return plan. If the answer is still unclear, that is a
              sign to pause and verify facts before you move further.
            </p>
            <p>
              The goal is not to read more than everyone else. The goal is to make a cleaner decision. That is why the summary,
              tables, cost notes, and official links matter more than long sales talk or flashy claims.
            </p>
          </div>
          <div className="mt-6 rounded-[24px] border border-slate-200 bg-slate-50 p-5">
            <h4 className="text-lg font-semibold text-slate-900">
              Best reading order
            </h4>
            <ol className="mt-4 space-y-3 pl-5 text-sm leading-6 text-slate-700 marker:font-semibold marker:text-sky-700">
              {readingOrder.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </div>
          <div className="mt-6 rounded-[24px] border border-sky-100 bg-sky-50 p-5">
            <h4 className="text-lg font-semibold text-slate-900">
              Ask these six questions before you decide
            </h4>
            <ul className="mt-4 space-y-3 pl-5 text-sm leading-6 text-slate-700 marker:text-sky-700">
              {familyQuestions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="mt-6 rounded-[24px] border border-emerald-100 bg-emerald-50 p-5">
            <h4 className="text-lg font-semibold text-slate-900">
              Quick family recap
            </h4>
            <div className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
              <p>
                This page is here to help you rule options in or out. Start with cost. Then check course length, language,
                recognition, visa time, and daily life. If the route still looks strong after that, it deserves more time.
              </p>
              <p>
                Do not trust hype alone. Trust clear facts, full cost visibility, and a realistic picture of what happens after
                the degree, training, or job placement step is complete.
              </p>
              <p>
                Good pages make the next step easy. Weak pages create confusion. Use this guide to get to a clear yes, a clear
                no, or a short list worth discussing with your family.
              </p>
            </div>
          </div>
          <div className="mt-6 rounded-[24px] border border-slate-200 bg-white p-5">
            <h4 className="text-lg font-semibold text-slate-900">
              What this page should help you decide
            </h4>
            <div className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
              <p>
                By the time you finish this page, you should know whether the route belongs in your shortlist, whether it needs
                deeper verification, or whether it should be dropped. That is a better outcome than reading a long guide and
                still feeling unsure about the next step.
              </p>
              <p>
                Use the facts here to build a family discussion. Focus on total cost, recognition, study or training pressure,
                language load, visa speed, and daily life. Those are the points that usually shape a good decision more than
                promotional phrases do.
              </p>
              <p>
                If this page helps you narrow the choice, it has already done useful work. You do not need perfect certainty on
                the first read. You need a cleaner decision frame and a better set of questions for the next conversation.
              </p>
            </div>
          </div>
          <div className="mt-6 rounded-[24px] border border-amber-100 bg-amber-50 p-5">
            <h4 className="text-lg font-semibold text-slate-900">
              Four signs a route is worth deeper review
            </h4>
            <ul className="mt-4 space-y-3 pl-5 text-sm leading-6 text-slate-700 marker:text-amber-700">
              {decisionNotes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
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
