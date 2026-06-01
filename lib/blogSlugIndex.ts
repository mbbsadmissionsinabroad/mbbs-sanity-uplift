import { cache } from "react";
import { buildBlogSlugAliasMap } from "./blogSlugUtils";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "xz1irwuo";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = "2021-10-21";
const queryUrl = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?query=`;

type BlogSlugRecord = {
  slug?: string;
};

const fetchBlogSlugRecords = cache(async (): Promise<BlogSlugRecord[]> => {
  const query = encodeURIComponent(
    `*[_type == "pages" && isBlog == true && defined(slug.current)]{
      "slug": slug.current
    }`
  );

  const response = await fetch(`${queryUrl}${query}`, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch blog slug records: ${response.status}`);
  }

  const payload = await response.json();
  return Array.isArray(payload?.result) ? payload.result : [];
});

export const getBlogSlugIndex = cache(async () => {
  const records = await fetchBlogSlugRecords();
  return buildBlogSlugAliasMap(records);
});

export async function resolveBlogRoute(routeParam: string) {
  if (!routeParam) {
    return null;
  }

  const { oldToPublic, publicToOld } = await getBlogSlugIndex();
  const normalizedParam = routeParam.toLowerCase();
  const sourceSlug = publicToOld.get(normalizedParam) ?? normalizedParam;
  const canonicalSlug = oldToPublic.get(sourceSlug) ?? sourceSlug;

  return {
    sourceSlug,
    canonicalSlug,
    shouldRedirect: normalizedParam !== canonicalSlug,
  };
}
