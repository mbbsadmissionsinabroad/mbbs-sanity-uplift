import HomeLanding from "./components/HomeLanding";
import { faq } from "./utilities/HomePageStaticData";

const siteUrl = "https://www.mbbsadmissionsinabroad.com";
const logoUrl = `${siteUrl}/new-lyf-logo.webp`;

function stripHtml(value: string) {
  return value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "New-Lyf Overseas",
  alternateName: "MBBS Admissions in Abroad",
  url: siteUrl,
  logo: logoUrl,
  description:
    "New-Lyf Overseas helps Indian students compare MBBS abroad, PG abroad, nursing, and study-abroad pathways across multiple countries.",
  telephone: "+918050575767",
  address: {
    "@type": "PostalAddress",
    streetAddress: "404, 1st floor, 4th A Cross Rd, HRBR Layout 2nd Block, HRBR Layout",
    addressLocality: "Kalyan Nagar",
    addressRegion: "Karnataka",
    postalCode: "560043",
    addressCountry: "IN",
  },
  sameAs: [
    "https://www.facebook.com/mbbsadmissionsinabroad",
    "https://www.instagram.com/mbbsadmissionsinabroad/",
    "https://www.linkedin.com/in/new-lyf/",
    "https://www.youtube.com/@mbbsadmissionsinabroad",
    "https://x.com/_mbbsabroad",
  ],
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "New-Lyf Overseas",
  alternateName: "MBBS Admissions in Abroad",
  image: logoUrl,
  url: siteUrl,
  telephone: "+918050575767",
  priceRange: "₹₹",
  address: {
    "@type": "PostalAddress",
    streetAddress: "404, 1st floor, 4th A Cross Rd, HRBR Layout 2nd Block, HRBR Layout",
    addressLocality: "Kalyan Nagar",
    addressRegion: "Karnataka",
    postalCode: "560043",
    addressCountry: "IN",
  },
  sameAs: [
    "https://www.facebook.com/mbbsadmissionsinabroad",
    "https://www.instagram.com/mbbsadmissionsinabroad/",
    "https://www.linkedin.com/in/new-lyf/",
    "https://www.youtube.com/@mbbsadmissionsinabroad",
    "https://x.com/_mbbsabroad",
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: stripHtml(item.answer),
    },
  })),
};

export default function LandingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <HomeLanding />
    </>
  );
}
