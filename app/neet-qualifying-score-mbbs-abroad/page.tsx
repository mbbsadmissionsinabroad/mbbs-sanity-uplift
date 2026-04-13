import type { Metadata } from "next";
import LandingPageClient from "./LandingPageClient";

export const metadata: Metadata = {
  title: "NEET Qualifying Score for MBBS Abroad | New-Lyf",
  description:
    "See the latest official NEET qualifying score guidance and get a free New-Lyf counselling call for MBBS abroad options in Russia, Kazakhstan, Philippines, Georgia, Uzbekistan, and Kyrgyzstan.",
  alternates: {
    canonical:
      "https://www.mbbsadmissionsinabroad.com/neet-qualifying-score-mbbs-abroad",
  },
  openGraph: {
    title: "NEET Qualifying Score for MBBS Abroad | New-Lyf",
    description:
      "Find the right country and university for your NEET score and family budget with a free New-Lyf counselling call.",
    url: "https://www.mbbsadmissionsinabroad.com/neet-qualifying-score-mbbs-abroad",
    type: "website",
  },
};

export default function NeetQualifyingScoreLandingPage() {
  return <LandingPageClient />;
}
