import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LayoutShell from "./components/LayoutShell";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.mbbsadmissionsinabroad.com"),
  title: "MBBS Admission Abroad | New-Lyf Overseas Guidance",
  description:
    "MBBS Admission Abroad with New-Lyf Overseas Consultants. Study MBBS in Russia, Ukraine, or the Philippines at MCI-approved universities at low costs.",
  robots: "index, follow",
  alternates: {
    canonical: "https://www.mbbsadmissionsinabroad.com",
    languages: {
      "x-default": "https://www.mbbsadmissionsinabroad.com/",
      en: "https://www.mbbsadmissionsinabroad.com/",
      es: "https://www.mbbsadmissionsinabroad.com/es",
      fr: "https://www.mbbsadmissionsinabroad.com/fr",
    },
  },
  openGraph: {
    title: "MBBS Abroad - Admissions, Guidance, and Information",
    description:
      "Discover valuable insights and tips for MBBS admissions abroad on our official channel.",
    url: "https://www.mbbsadmissionsinabroad.com",
    siteName: "MBBS Abroad",
    images: [
      {
        url: "https://www.mbbsadmissionsinabroad.com/path-to-your-thumbnail.jpg",
        alt: "MBBS Abroad - Admissions and Guidance",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@_mbbsabroad",
    title: "MBBS Abroad - Admissions, Guidance, and Information",
    description:
      "Explore our channel for MBBS admission guidance abroad, updates, and tips for aspiring medical students.",
    images: [
      "https://www.mbbsadmissionsinabroad.com/path-to-your-thumbnail.jpg",
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

        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "MBBS Admissions Abroad",
              url: "https://www.mbbsadmissionsinabroad.com",
              sameAs: [
                "https://www.facebook.com/mbbsadmissions",
                "https://twitter.com/mbbsadmissions",
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "MBBS Abroad Admissions",
              url: "https://www.mbbsadmissionsinabroad.com/",
              logo: "https://www.mbbsadmissionsinabroad.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FNew-Lyf%20Logo.f153ed67.png&w=256&q=75",
              description:
                "Expert guidance on MBBS admissions abroad, including detailed information and updates for aspiring medical students.",
              address: {
                "@type": "PostalAddress",
                streetAddress: "123 Main Street",
                addressLocality: "City Name",
                addressRegion: "State Name",
                postalCode: "123456",
                addressCountry: "Country Name",
              },
              telephone: "+1234567890",
              sameAs: [
                "https://twitter.com/_mbbsabroad",
                "https://www.facebook.com/pg/mbbsadmissionsinabroad/",
                "https://www.youtube.com/channel/UCGdRZ74SghrH9K8BE5U0zVw",
              ],
            }),
          }}
        />
      </head>
      <body className={`${inter.className} dark:bg-[#1A1C29] bg-white`}>
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
