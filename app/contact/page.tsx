import type { Metadata } from "next";
import ContactPageClient, {
  type LocationData,
} from "./components/ContactPageClient";
import { buildStaticPageMetadata } from "@/lib/staticPageSeo";

const route = "/contact";
const canonicalUrl = "https://www.mbbsadmissionsinabroad.com/contact";
const metaTitle = "Contact New-Lyf | MBBS Abroad Counselling and Support";
const metaDescription =
  "Contact New-Lyf for MBBS abroad counselling, nursing jobs guidance, PG abroad support, and branch-level assistance.";

const SANITY_PROJECT_ID =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "xz1irwuo";
const SANITY_DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const SANITY_API_VERSION = "2022-08-18";
const DEFAULT_CONTACT_NUMBER = "+91 8147030030";
const GERMANY_ADDRESS =
  "Unter den Klippen 5, 32676, Lugde, Nordrhein, Westfalen, Germany.";

async function getContactLocations(): Promise<Record<string, LocationData>> {
  const query = encodeURIComponent('*[_type == "contactPage"]');
  const url = `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}?query=${query}`;

  try {
    const response = await fetch(url, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return {};
    }

    const data = await response.json();
    const result = Array.isArray(data?.result) ? data.result : [];

    return result.reduce((acc: Record<string, LocationData>, item: any) => {
      if (!item?.branchName) {
        return acc;
      }

      acc[item.branchName] = {
        address:
          item.branchName === "Germany"
            ? GERMANY_ADDRESS
            : item.branchAddress || "Address unavailable",
        phone: DEFAULT_CONTACT_NUMBER,
        mapUrl: item.branchLocation || "",
      };

      return acc;
    }, {});
  } catch {
    return {};
  }
}

export async function generateMetadata(): Promise<Metadata> {
  return buildStaticPageMetadata({
    route,
    fallbackTitle: metaTitle,
    fallbackDescription: metaDescription,
    fallbackCanonical: canonicalUrl,
  });
}

export default async function ContactPage() {
  const locations = await getContactLocations();

  return <ContactPageClient initialLocations={locations} />;
}
