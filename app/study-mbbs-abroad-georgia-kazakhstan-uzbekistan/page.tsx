import type { Metadata } from "next";
import LandingPageClient from "./LandingPageClient";

export const metadata: Metadata = {
  title: "Study MBBS Abroad with New-Lyf | Georgia, Kazakhstan, Uzbekistan",
  description:
    "Get a free MBBS abroad consultation with New-Lyf for Georgia, Kazakhstan, and Uzbekistan. Explore NMC-aligned universities, transparent fees, and expert admission guidance.",
  alternates: {
    canonical:
      "https://www.mbbsadmissionsinabroad.com/study-mbbs-abroad-georgia-kazakhstan-uzbekistan",
  },
  openGraph: {
    title:
      "Study MBBS Abroad with New-Lyf | Georgia, Kazakhstan, Uzbekistan",
    description:
      "Join 17,000+ students guided by New-Lyf since 2009 for MBBS abroad admissions in Georgia, Kazakhstan, and Uzbekistan.",
    url: "https://www.mbbsadmissionsinabroad.com/study-mbbs-abroad-georgia-kazakhstan-uzbekistan",
    type: "website",
  },
};

export default function StudyMbbsAbroadLandingPage() {
  return <LandingPageClient />;
}
