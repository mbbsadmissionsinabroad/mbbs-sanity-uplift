import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { buildStaticPageMetadata } from "@/lib/staticPageSeo";

const route = "/nursing-jobs-in-germany";
const canonicalUrl = "https://www.mbbsadmissionsinabroad.com/nursing-jobs-in-germany";
const metaTitle = "Nursing Jobs in Germany for Indian Nurses - Complete Guide";
const metaDescription =
  "Explore nursing jobs in Germany for Indian nurses with salary, recognition, language requirements, documentation, and relocation guidance.";

export async function generateMetadata(): Promise<Metadata> {
  return buildStaticPageMetadata({
    route,
    fallbackTitle: metaTitle,
    fallbackDescription: metaDescription,
    fallbackCanonical: canonicalUrl,
  });
}

export default function NursingJobsInGermanyRedirectPage() {
  redirect("/nursing-job-in-germany");
}
