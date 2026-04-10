import type { Metadata } from "next";
import { client } from "./client";

export type StaticSeoOverride = {
  seoTitle?: string;
  metaDescription?: string;
};

type BuildStaticPageMetadataInput = {
  route: string;
  fallbackTitle: string;
  fallbackDescription: string;
  fallbackCanonical: string;
};

const STATIC_SEO_QUERY = `*[_type == "staticSeoPage" && route == $route][0]{
  seoTitle,
  metaDescription
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
}: BuildStaticPageMetadataInput): Promise<Metadata> {
  const override = await getStaticSeoOverride(route);
  const title = override?.seoTitle?.trim() || fallbackTitle;
  const description = override?.metaDescription?.trim() || fallbackDescription;

  return {
    title,
    description,
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
