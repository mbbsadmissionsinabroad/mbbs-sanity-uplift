import type { Metadata } from "next";
import DecisionMapLandingPage from "./DecisionMapLandingPage";

const pageUrl =
  "https://www.mbbsadmissionsinabroad.com/free-mbbs-decision-roadmap";

export const metadata: Metadata = {
  title: "Free MBBS Decision Roadmap | Know Your Path Before You Choose | New-Lyf Overseas",
  description:
    "Don't choose India or abroad blindly. Get your free MBBS Decision Roadmap from New-Lyf Overseas. We help you check score fit, budget fit, country fit, and document timeline before you decide. August 2026 intake guidance.",
  alternates: {
    canonical: pageUrl,
  },
  keywords:
    "free mbbs decision roadmap, mbbs abroad counselling, mbbs abroad 2026, neet mbbs abroad guidance, mbbs decision map, which country for mbbs, new lyf overseas counselling",
  openGraph: {
    title: "Free MBBS Decision Roadmap | New-Lyf Overseas",
    description:
      "Know your MBBS path before you choose. Score fit, budget fit, country fit — all in one free counselling session with New-Lyf Overseas.",
    url: pageUrl,
    type: "website",
    siteName: "New-Lyf Overseas",
    images: [
      {
        url: "https://www.mbbsadmissionsinabroad.com/home-counselling.jpg",
        width: 1200,
        height: 630,
        alt: "Free MBBS Decision Roadmap by New-Lyf Overseas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free MBBS Decision Roadmap | New-Lyf Overseas",
    description:
      "Don't pick a country blindly. Get your free MBBS Decision Map — score, budget, country and document timeline clarity from New-Lyf Overseas.",
    images: ["https://www.mbbsadmissionsinabroad.com/home-counselling.jpg"],
  },
};

export default function FreeMbbsDecisionRoadmapPage() {
  return <DecisionMapLandingPage />;
}
