import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { buildStaticPageMetadata } from "@/lib/staticPageSeo";

const route = "/study-mbbs-in-russia";
const canonicalUrl = "https://www.mbbsadmissionsinabroad.com/study-mbbs-in-russia";
const metaTitle = "Study MBBS in Russia 2026 - Complete Guide for Indian Students";
const metaDescription =
  "Study MBBS in Russia with guidance on universities, fees, NMC relevance, admissions, hostel life, and India-return planning for Indian students.";

export async function generateMetadata(): Promise<Metadata> {
  return buildStaticPageMetadata({
    route,
    fallbackTitle: metaTitle,
    fallbackDescription: metaDescription,
    fallbackCanonical: canonicalUrl,
  });
}

export default function StudyMbbsInRussiaRedirectPage() {
  redirect("/mbbs-in-russia");
}
