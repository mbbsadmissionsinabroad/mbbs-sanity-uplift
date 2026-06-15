import { buildStaticPageMetadata } from "@/lib/staticPageSeo";
import type { Metadata } from "next";
import RussiaAdmissionContent from "./RussiaAdmissionContent";
import {
  metaDescription,
  metaTitle,
  pageUrl,
  metaKeywords,
} from "../mbbs-admission-in-russia/pageData";

export async function generateMetadata(): Promise<Metadata> {
  return buildStaticPageMetadata({
    route: "/mbbs-in-russia",
    fallbackTitle: metaTitle,
    fallbackDescription: metaDescription,
    fallbackCanonical: pageUrl,
    keywords: metaKeywords,
  });
}

export default function MbbsInRussiaPage() {
  return <RussiaAdmissionContent />;
}
