import { cache } from "react";

import { localBlogs } from "./localBlogs";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "xz1irwuo";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = "2021-10-21";
const queryUrl = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?query=`;

const remoteBlogSummaryQuery = encodeURIComponent(`*[_type == "pages" && isBlog == true]{
  title,
  cardTitle,
  metaDescription,
  blogCategory,
  publishedAt,
  _updatedAt,
  bannerImage,
  bannerImageUrl,
  slug,
  publicSlug
}`);

const fetchRemoteBlogSummaries = cache(async () => {
  const response = await fetch(`${queryUrl}${remoteBlogSummaryQuery}`, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch blog summaries: ${response.status}`);
  }

  const payload = await response.json();
  return Array.isArray(payload?.result) ? payload.result : [];
});

export const getBlogSummaries = cache(async () => {
  try {
    const remoteBlogs = await fetchRemoteBlogSummaries();
    return [...localBlogs, ...remoteBlogs];
  } catch (error) {
    console.error("Failed to fetch remote blog summaries", error);
    return localBlogs;
  }
});
