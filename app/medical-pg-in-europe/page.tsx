import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { buildStaticPageMetadata } from "@/lib/staticPageSeo";

const route = "/medical-pg-in-europe";
const canonicalUrl = "https://www.mbbsadmissionsinabroad.com/medical-pg-in-europe";
const metaTitle = "Medical PG in Europe for Indian Doctors - Complete Guide";
const metaDescription =
  "Explore medical PG in Europe for Indian doctors with country comparisons, licensing pathways, salary outlook, and residency planning support.";

export async function generateMetadata(): Promise<Metadata> {
  return buildStaticPageMetadata({
    route,
    fallbackTitle: metaTitle,
    fallbackDescription: metaDescription,
    fallbackCanonical: canonicalUrl,
  });
}

export default function MedicalPgInEuropeRedirectPage() {
  redirect("/medical-pg-in-europe-for-indian-students");
}
