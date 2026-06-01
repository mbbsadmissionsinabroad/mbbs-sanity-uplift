import { buildStaticPageMetadata } from "@/lib/staticPageSeo";
import type { Metadata } from "next";
import RussiaAdmissionContent from "./RussiaAdmissionContent";
import {
  metaDescription,
  metaTitle,
  pageUrl,
} from "../mbbs-admission-in-russia/pageData";

export async function generateMetadata(): Promise<Metadata> {
  return buildStaticPageMetadata({
    route: "/mbbs-in-russia",
    fallbackTitle: metaTitle,
    fallbackDescription: metaDescription,
    fallbackCanonical: pageUrl,
  });
}

export default function MbbsInRussiaPage() {
  return <RussiaAdmissionContent />;
}
