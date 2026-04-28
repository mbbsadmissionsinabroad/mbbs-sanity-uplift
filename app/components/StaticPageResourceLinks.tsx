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

const sectionBriefing: Record<
  StaticSeoRegistryEntry["section"],
  { title: string; paragraphs: string[]; practicalSummary: string[] }
> = {
  "mbbs-abroad": {
    title: "What a good MBBS abroad decision usually looks like",
    paragraphs: [
      "A strong MBBS abroad route should stay understandable after you compare tuition, hostel, food, visa cost, language pressure, internship structure, and India-return planning. If the route only sounds attractive in one short headline, it usually needs deeper verification before a family commits money.",
      "Students and parents usually need the same core answers. They want to know whether the degree path is usable, whether the city and university are stable, whether the total cost will stay manageable year after year, and whether the student can realistically adapt to classes, climate, and daily life.",
      "The purpose of these country guides is to reduce emotional guessing. Use the summary, tables, and official links to reach a simple decision frame: this route fits, this route does not fit, or this route needs one final round of checking before you move ahead.",
    ],
    practicalSummary: [
      "In plain words, a country becomes easier to trust when the total cost is visible, the university path is understandable, the student can explain the class language plan, and the return pathway does not remain vague. Families usually feel calmer when those four things stay clear after a second reading.",
      "This is why a short, honest shortlist is better than a long exciting list. The right page should help you remove weak options early. If a route still depends on too many assumptions after you compare costs, recognition, and daily life, it is safer to hold back than to force a decision.",
    ],
  },
  "medical-pg": {
    title: "How doctors can use this page more practically",
    paragraphs: [
      "A PG abroad path becomes easier when the doctor separates image from process. First check licensing, then language, then training entry, then specialty fit, and only after that compare long-term income or migration upside. That order protects you from spending time on an exciting route that is weak in execution.",
      "Many doctors lose time because they compare countries only by salary or popularity. A better comparison looks at recognition, exam load, translation work, employer demand, realistic timeline, and how difficult it is to move from India into the first stable training or work position.",
      "Use the guide as a filter, not as a promise. If the route still feels confusing after you read the key requirements, it usually means one important part is still unclear and should be checked before any payment or major paperwork step.",
    ],
    practicalSummary: [
      "Doctors usually make faster decisions when they stop comparing prestige first and compare process first. The stronger route is usually the one with the clearer exam path, the more stable entry point, the better specialty fit, and the lower chance of document or language confusion after leaving India.",
      "A page like this should help you answer a practical question: if you start now, what happens next month, what happens after that, and what is the first stable checkpoint? If that chain is still blurry, more checking is needed before money, time, or resignation decisions are made.",
    ],
  },
  "nursing-jobs": {
    title: "What nurses and families should confirm early",
    paragraphs: [
      "Nursing jobs abroad are easiest to compare when you look at the full path, not only the job title. Language level, registration, adaptation period, relocation cost, and employer support matter as much as the salary line because they decide how smooth the move will feel in real life.",
      "Families often benefit from one simple rule. Choose the route that stays clear after you compare language, licensing, and total cost. If the route still sounds vague or depends on too many assumptions, it is safer to slow down and verify more before starting training or document spending.",
      "These pages are meant to help Indian nurses remove weak-fit options early. That saves time and protects effort. A good route should feel more practical after reading, not more confusing.",
    ],
    practicalSummary: [
      "For nurses, the best route is not always the route with the biggest salary line. The stronger option is usually the one where language progress, registration, employer support, relocation cost, and the first work milestone all stay understandable at the same time.",
      "If a family can clearly explain the total spending, the likely training or registration sequence, and the support available after arrival, the route is usually worth deeper review. If those points still remain hazy, the safer choice is to verify more before paying for classes or document work.",
    ],
  },
  "learn-german": {
    title: "How to judge a German course page the right way",
    paragraphs: [
      "A German course choice should be based on syllabus clarity, level progression, batch format, trainer support, and whether the course actually helps the student reach the next real-world goal. That goal may be MBBS abroad planning, nursing migration, PG in Germany, or Ausbildung preparation.",
      "Price alone is not enough. A cheap course that leaves the student underprepared creates more delay later. A useful course should make the path clearer, build confidence level by level, and reduce confusion about exams, documents, or professional communication.",
      "Read the page with one question in mind: will this course help the student move to the next real step with less stress? If the answer still feels uncertain, compare the syllabus and support structure more carefully before joining.",
    ],
    practicalSummary: [
      "A good German course should reduce future confusion, not simply fill current time. Families usually benefit when they can explain what level the student needs, how the batches move from one level to the next, and what real goal the course supports after completion.",
      "If a course page makes the path clearer around levels, exams, documents, and communication confidence, it is doing its job. If it stays broad and vague after reading, compare the teaching structure more carefully before you choose it.",
    ],
  },
  ausbildung: {
    title: "How families can read Ausbildung pages more clearly",
    paragraphs: [
      "Ausbildung planning becomes easier when the family separates the route into plain parts: course type, stipend, German level, visa path, living cost, and long-term job outcome. Looking at those parts one by one gives a clearer picture than relying on broad promises about Germany alone.",
      "A good Ausbildung option should feel realistic from both the student side and the family side. The student should be able to handle the language and training routine. The family should be comfortable with the preparation cost, timeline, and the support available before and after arrival.",
      "Use the guide to reduce confusion, not to create excitement without detail. If the route still looks unclear after reading the summary and official links, it deserves another round of checking before any final decision.",
    ],
    practicalSummary: [
      "In simple terms, a strong Ausbildung route is one where the student can handle the language level, the stipend and living cost look balanced, and the training path still makes sense after the first few months in Germany. That is the point where a route starts feeling realistic rather than only attractive.",
      "Families usually move faster when they ask direct questions about language, preparation cost, timeline, support, and long-term job value. If the answers still stay unclear after reading the page once or twice, it is wiser to slow down before making a financial commitment.",
    ],
  },
};

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
  const briefing = sectionBriefing[currentPage.section];
  const comparisonRules = [
    "Write the full annual cost, not only tuition.",
    "Write the main language requirement in one line.",
    "Write the first licensing or recognition checkpoint.",
    "Write the likely timeline from admission to stable study or work.",
    "Keep the option only if all four points stay clear after reading.",
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

          <div className="mt-6 rounded-[24px] border border-slate-200 bg-slate-50 p-5">
            <h3 className="text-lg font-semibold text-slate-900">{briefing.title}</h3>
            <div className="mt-4 space-y-3 text-sm leading-7 text-slate-700">
              {briefing.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="mt-6 rounded-[24px] border border-sky-100 bg-sky-50 p-5">
            <h3 className="text-lg font-semibold text-slate-900">
              A simple comparison method that saves time
            </h3>
            <p className="mt-4 text-sm leading-7 text-slate-700">
              Many families waste energy because they compare too many routes at
              once. A cleaner method is to compare only a few clear factors in
              the same order every time. This reduces noise and makes the next
              discussion easier.
            </p>
            <ul className="mt-4 space-y-3 pl-5 text-sm leading-6 text-slate-700 marker:text-sky-700">
              {comparisonRules.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="mt-4 text-sm leading-7 text-slate-700">
              If two routes still look equal after this, the safer route is
              usually the one with the clearer timeline, the cleaner support
              system, and fewer unknowns around documents or language.
            </p>
          </div>

          <div className="mt-6 rounded-[24px] border border-violet-100 bg-violet-50 p-5">
            <h3 className="text-lg font-semibold text-slate-900">
              What families usually need before they say yes
            </h3>
            <div className="mt-4 space-y-3 text-sm leading-7 text-slate-700">
              {briefing.practicalSummary.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <p>
                A final yes usually comes only when the route feels consistent on
                money, recognition, student comfort, and timing. If one of those
                parts keeps changing every time you read a new page or talk to a
                new person, that inconsistency is a warning sign in itself.
              </p>
              <p>
                Use that as a simple test. Strong routes usually become easier to
                explain. Weak routes usually become harder to explain. The pages
                that support a good decision are the pages that leave the family
                with fewer unknowns, fewer contradictions, and a much cleaner
                next step.
              </p>
            </div>
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
