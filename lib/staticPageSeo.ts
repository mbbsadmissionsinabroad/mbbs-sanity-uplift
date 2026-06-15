import type { Metadata } from "next";
import { client } from "./client";

export type StaticSeoOverride = {
  seoTitle?: string;
  metaDescription?: string;
  keywords?: string[];
};

type BuildStaticPageMetadataInput = {
  route: string;
  fallbackTitle: string;
  fallbackDescription: string;
  fallbackCanonical: string;
  keywords?: string | string[];
};

const STATIC_SEO_QUERY = `*[_type == "staticSeoPage" && route == $route][0]{
  seoTitle,
  metaDescription,
  keywords
}`;

export async function getStaticSeoOverride(route: string): Promise<StaticSeoOverride | null> {
  try {
    return await client.fetch<StaticSeoOverride | null>(STATIC_SEO_QUERY, { route });
  } catch (error) {
    console.error(`Failed to fetch static SEO override for ${route}`, error);
    return null;
  }
}

export async function buildStaticPageMetadata({
  route,
  fallbackTitle,
  fallbackDescription,
  fallbackCanonical,
  keywords,
}: BuildStaticPageMetadataInput): Promise<Metadata> {
  const override = await getStaticSeoOverride(route);
  const title = override?.seoTitle?.trim() || fallbackTitle;
  const description = override?.metaDescription?.trim() || fallbackDescription;
  const mergedKeywords = override?.keywords || keywords;

  return {
    title,
    description,
    keywords: mergedKeywords,
    alternates: { canonical: fallbackCanonical },
    openGraph: {
      title,
      description,
      url: fallbackCanonical,
      siteName: "MBBS Admissions in Abroad",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
