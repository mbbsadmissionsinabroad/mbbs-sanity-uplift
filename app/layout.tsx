import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LayoutShell from "./components/LayoutShell";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.mbbsadmissionsinabroad.com"),
  title: "MBBS Abroad Guidance | New-Lyf Overseas",
  description:
    "Compare MBBS abroad countries, fees, NEET rules, scholarships, PG pathways, nursing jobs, and admissions guidance from New-Lyf Overseas.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.mbbsadmissionsinabroad.com",
    languages: {
      "x-default": "https://www.mbbsadmissionsinabroad.com/",
      en: "https://www.mbbsadmissionsinabroad.com/",
    },
  },
  openGraph: {
    title: "MBBS Abroad Guidance | New-Lyf Overseas",
    description:
      "Explore country guides, fees, NEET requirements, visa planning, and trusted MBBS abroad guidance for Indian students.",
    url: "https://www.mbbsadmissionsinabroad.com",
    siteName: "New-Lyf Overseas",
    images: [
      {
        url: "https://www.mbbsadmissionsinabroad.com/new-lyf-logo.webp",
        alt: "New-Lyf Overseas logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@_mbbsabroad",
    title: "MBBS Abroad Guidance | New-Lyf Overseas",
    description:
      "Explore country guides, fees, NEET requirements, and MBBS abroad planning support for Indian students.",
    images: [
      "https://www.mbbsadmissionsinabroad.com/new-lyf-logo.webp",
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Verifications */}
        <meta
          name="ahrefs-site-verification"
          content="22807d65778b510ff96fcf197a3b2e305768c3c37972f2ac7050e3c7dc571725"
        />
        <meta
          name="google-site-verification"
          content="yA8gYXl26PM93Ah-DTbs-lSmLhFolE91oq9mmWU6fvE"
        />
        <meta
          name="google-site-verification"
          content="q3PaxiZB_fbKGHiJuY6EKAd5Z2Egpt7ec4dkG5Hevrw"
        />
      </head>
      <body className={`${inter.className} dark:bg-[#1A1C29] bg-white`}>
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
