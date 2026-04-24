import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { buildStaticPageMetadata } from "@/lib/staticPageSeo";

const route = "/pg-in-abroad";
const canonicalUrl = "https://www.mbbsadmissionsinabroad.com/pg-in-abroad";
const metaTitle = "PG Abroad for Indian Doctors - Guidance and Counselling";
const metaDescription =
  "Explore PG abroad options for Indian doctors with guidance on eligibility, country options, licensing pathways, and counselling support.";

export async function generateMetadata(): Promise<Metadata> {
  return buildStaticPageMetadata({
    route,
    fallbackTitle: metaTitle,
    fallbackDescription: metaDescription,
    fallbackCanonical: canonicalUrl,
  });
}

export default function PgAbroadRedirectPage() {
  redirect("/contact");
}
