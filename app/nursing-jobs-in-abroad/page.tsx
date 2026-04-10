import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { buildStaticPageMetadata } from "@/lib/staticPageSeo";

const route = "/nursing-jobs-in-abroad";
const canonicalUrl = "https://www.mbbsadmissionsinabroad.com/nursing-jobs-in-abroad";
const metaTitle = "Nursing Jobs Abroad for Indian Nurses - Country Guidance";
const metaDescription =
  "Explore nursing jobs abroad for Indian nurses with country comparisons, eligibility guidance, language requirements, and process support.";

export async function generateMetadata(): Promise<Metadata> {
  return buildStaticPageMetadata({
    route,
    fallbackTitle: metaTitle,
    fallbackDescription: metaDescription,
    fallbackCanonical: canonicalUrl,
  });
}

export default function NursingJobsRedirectPage() {
  redirect("/contact?interest=nursing-jobs-in-abroad");
}
