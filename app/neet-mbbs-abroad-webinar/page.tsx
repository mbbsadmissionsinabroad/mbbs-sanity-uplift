import type { Metadata } from "next";

import WebinarLandingPage from "./WebinarLandingPage";

const pageUrl =
  "https://www.mbbsadmissionsinabroad.com/neet-mbbs-abroad-webinar";

const eventSchema = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "Free Live Webinar: Secure Your MBBS Future Abroad",
  description:
    "A free live webinar for NEET 2024 and 2025 qualified students who want to secure MBBS abroad admission before the August intake documentation window closes.",
  startDate: "2026-06-07T19:00:00+05:30",
  endDate: "2026-06-07T21:00:00+05:30",
  eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
  eventStatus: "https://schema.org/EventScheduled",
  url: pageUrl,
  image: [
    "https://www.mbbsadmissionsinabroad.com/home-counselling.jpg",
  ],
  organizer: {
    "@type": "Organization",
    name: "New-Lyf Overseas",
    url: "https://www.mbbsadmissionsinabroad.com",
  },
  performer: [
    {
      "@type": "Person",
      name: "Doctor Vinith",
    },
    {
      "@type": "Person",
      name: "Mr. Avinash",
    },
  ],
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "INR",
    availability: "https://schema.org/InStock",
    url: pageUrl,
  },
};

export const metadata: Metadata = {
  title: "Free Live Webinar: Secure Your MBBS Future Abroad | New-Lyf Overseas",
  description:
    "Join New-Lyf Overseas on 7th June at 7 PM for a free MBBS abroad webinar for NEET 2024 and 2025 qualified students. Learn how to secure your August intake seat before the 45-day documentation window closes.",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "Free Live Webinar: Secure Your MBBS Future Abroad",
    description:
      "NEET students waiting for the re-exam are losing time. Join the free 7th June webinar and plan your MBBS abroad admission before August intake seats move.",
    url: pageUrl,
    type: "website",
    siteName: "New-Lyf Overseas",
    images: [
      {
        url: "https://www.mbbsadmissionsinabroad.com/home-counselling.jpg",
        width: 1200,
        height: 630,
        alt: "Free MBBS abroad webinar for NEET students by New-Lyf Overseas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Live Webinar: Secure Your MBBS Future Abroad",
    description:
      "Join the 7th June 7 PM webinar for NEET qualified students and learn how to secure your MBBS abroad seat before the August intake window gets tighter.",
    images: [
      "https://www.mbbsadmissionsinabroad.com/home-counselling.jpg",
    ],
  },
};

export default function NeetMbbsAbroadWebinarPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
      />
      <WebinarLandingPage />
    </>
  );
}
