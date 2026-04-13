import type { Metadata } from "next";
import LandingPageClient from "./LandingPageClient";

export const metadata: Metadata = {
  title: "Qualifying NEET Score? Explore MBBS Abroad Options | Ney Lyf",
  description:
    "Get a free Ney Lyf counselling call to explore NMC-approved MBBS abroad options in Russia, Kazakhstan, Philippines, Georgia, and more based on your NEET score and budget.",
  alternates: {
    canonical:
      "https://www.mbbsadmissionsinabroad.com/neet-qualifying-score-mbbs-abroad",
  },
  openGraph: {
    title: "Qualifying NEET Score? Explore MBBS Abroad Options",
    description:
      "Find the right country and university for your NEET score and family budget with a free Ney Lyf counselling call.",
    url: "https://www.mbbsadmissionsinabroad.com/neet-qualifying-score-mbbs-abroad",
    type: "website",
  },
};

export default function NeetQualifyingScoreLandingPage() {
  return <LandingPageClient />;
}
