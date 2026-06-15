import { NextRequest, NextResponse } from "next/server";
import { submitToGoogleForm } from "@/lib/server/googleFormSubmission";
import {
  appendLeadToGoogleSheet,
  extractPathnameFromUrl,
} from "@/lib/server/googleSheetsLeadLogger";

export const runtime = "nodejs";

const FORM_RESPONSE_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSeK59CaicvkpwHNq5H61ZoWyA7zNXi7jVdM9adwxyuDlu8dpw/formResponse";

const FIELD_MAP = {
  name: "entry.1341938491",
  phone: "entry.683501059",
  neetYear: "entry.1807737664",
  city: "entry.378821943",
  country: "entry.1555844121",
} as const;

const NEET_YEAR_LABELS: Record<string, string> = {
  "2025": "NEET 2025",
  "2024": "NEET 2024",
  "2023": "NEET 2023",
  parent: "I'm a Parent / Guardian",
};

const COUNTRY_LABELS: Record<string, string> = {
  russia: "Russia",
  georgia: "Georgia",
  kazakhstan: "Kazakhstan",
  uzbekistan: "Uzbekistan",
  vietnam: "Vietnam",
  bosnia: "Bosnia",
  bangladesh: "Bangladesh",
  unsure: "Not Sure — Help Me Decide",
};

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();
    const name = String(payload.name ?? "").trim();
    const phone = String(payload.phone ?? "").trim();
    const neetYearKey = String(payload.neetYear ?? "").trim();
    const city = String(payload.city ?? "").trim();
    const countryKey = String(payload.country ?? "").trim();
    const source = String(payload.source ?? "").trim();

    if (!name || !phone || !neetYearKey) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields" },
        { status: 400 },
      );
    }

    const neetYear = NEET_YEAR_LABELS[neetYearKey] ?? neetYearKey;
    const country = countryKey ? COUNTRY_LABELS[countryKey] ?? countryKey : "";

    const googleFormPayload: Record<string, string> = {
      [FIELD_MAP.name]: name,
      [FIELD_MAP.phone]: phone,
      [FIELD_MAP.neetYear]: neetYear,
    };

    if (city) {
      googleFormPayload[FIELD_MAP.city] = city;
    }

    if (country) {
      googleFormPayload[FIELD_MAP.country] = country;
    }

    await submitToGoogleForm(FORM_RESPONSE_URL, googleFormPayload);

    try {
      await appendLeadToGoogleSheet({
        timestamp: payload.timestamp ?? new Date().toISOString(),
        page: "/mbbs-abroad-3-5-lakh-starting",
        leadSource: source || "MBBS 3.5 Lakh Starting Landing Page",
        formType: "fee_country_roadmap",
        fullName: name,
        phone,
        whatsapp: phone,
        city,
        studyCountry: country,
        neetStatus: neetYear,
        message: country ? `Preferred country: ${country}` : "",
        rawPayloadJson: JSON.stringify({
          ...payload,
          page: extractPathnameFromUrl(request.headers.get("referer")),
        }),
      });
    } catch (sheetError) {
      console.error("Google Sheets backup logging failed", sheetError);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to submit NewLyf lead", error);

    return NextResponse.json(
      { ok: false, error: "Failed to submit lead" },
      { status: 500 },
    );
  }
}
