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
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-700">Related Resources</p>
          <h3 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Helpful next pages and official resources
          </h3>
          <p className="mt-4 text-base leading-7 text-slate-600 md:text-lg">
            Use these internal guides to compare your next options, and use the official links to verify rules,
            recognition, exams, and destination requirements.
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
