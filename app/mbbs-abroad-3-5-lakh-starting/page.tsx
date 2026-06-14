import type { Metadata } from "next";

import LandingPageClient from "./LandingPageClient";

const pageUrl =
  "https://www.mbbsadmissionsinabroad.com/mbbs-abroad-3-5-lakh-starting";

export const metadata: Metadata = {
  title: "MBBS Abroad from ₹3.5 Lakh Starting | New-Lyf Overseas",
  description:
    "Compare country fit, total cost, hostel, documents, visa process, and August intake timing for MBBS abroad options starting from around ₹3.5 lakh.",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "MBBS Abroad from ₹3.5 Lakh Starting | New-Lyf Overseas",
    description:
      "Get a personalised fee and country roadmap from New-Lyf before you shortlist MBBS abroad options blindly.",
    url: pageUrl,
    type: "website",
    siteName: "New-Lyf Overseas",
    images: [
      {
        url: "https://www.mbbsadmissionsinabroad.com/home-counselling.jpg",
        width: 1200,
        height: 630,
        alt: "New-Lyf MBBS abroad fee and country roadmap landing page",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MBBS Abroad from ₹3.5 Lakh Starting | New-Lyf Overseas",
    description:
      "See what the fee includes, compare total cost, and get your New-Lyf fee and country roadmap.",
    images: [
      "https://www.mbbsadmissionsinabroad.com/home-counselling.jpg",
    ],
  },
};

export default function MbbsAbroadThreePointFiveLakhStartingPage() {
  return <LandingPageClient />;
}
