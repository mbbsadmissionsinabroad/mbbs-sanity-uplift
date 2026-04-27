import { NextResponse } from "next/server";

import { staticSeoPages } from "../data/staticSeoRegistry";

export const revalidate = 3600;

const SITE_URL = "https://www.mbbsadmissionsinabroad.com";

type SitemapEntry = {
  route: string;
  changefreq?: "daily" | "weekly" | "monthly";
  priority?: string;
};

const coreRoutes: SitemapEntry[] = [
  { route: "/", changefreq: "weekly", priority: "1.0" },
  { route: "/blog", changefreq: "weekly", priority: "0.8" },
  { route: "/contact", changefreq: "monthly", priority: "0.7" },
  { route: "/gallery", changefreq: "monthly", priority: "0.7" },
  { route: "/privacy-policy", changefreq: "monthly", priority: "0.4" },
  { route: "/terms-and-conditions", changefreq: "monthly", priority: "0.4" },
  { route: "/nursing-jobs-in-abroad", changefreq: "monthly", priority: "0.7" },
  { route: "/pg-in-abroad", changefreq: "monthly", priority: "0.7" },
  { route: "/neet-qualifying-score-mbbs-abroad", changefreq: "weekly", priority: "0.9" },
  {
    route: "/study-mbbs-abroad-georgia-kazakhstan-uzbekistan",
    changefreq: "weekly",
    priority: "0.9",
  },
  { route: "/es", changefreq: "monthly", priority: "0.5" },
  { route: "/fr", changefreq: "monthly", priority: "0.5" },
];

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function toAbsoluteUrl(route: string) {
  if (route === "/") {
    return SITE_URL;
  }

  return `${SITE_URL}${route}`;
}

function buildEntries() {
  const registryEntries: SitemapEntry[] = staticSeoPages.map((page) => ({
    route: page.route,
    changefreq: "monthly",
    priority: "0.8",
  }));

  const seen = new Set<string>();

  return [...coreRoutes, ...registryEntries].filter((entry) => {
    if (!entry.route || seen.has(entry.route)) {
      return false;
    }

    seen.add(entry.route);
    return true;
  });
}

function generateSiteMap(entries: SitemapEntry[]) {
  const lastmod = new Date().toISOString();

  const urls = entries
    .map((entry) => {
      const loc = escapeXml(toAbsoluteUrl(entry.route));
      const changefreq = entry.changefreq ?? "monthly";
      const priority = entry.priority ?? "0.7";

      return [
        "  <url>",
        `    <loc>${loc}</loc>`,
        `    <lastmod>${lastmod}</lastmod>`,
        `    <changefreq>${changefreq}</changefreq>`,
        `    <priority>${priority}</priority>`,
        "  </url>",
      ].join("\n");
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

export async function GET() {
  const sitemap = generateSiteMap(buildEntries());

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
