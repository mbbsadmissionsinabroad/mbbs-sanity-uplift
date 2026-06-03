import { NextRequest, NextResponse } from "next/server";

import { submitToGoogleForm } from "@/lib/server/googleFormSubmission";
import {
  appendLeadToGoogleSheet,
  extractPathnameFromUrl,
} from "@/lib/server/googleSheetsLeadLogger";

export const runtime = "nodejs";

const FORM_RESPONSE_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLScN82KEgn2vOP3hWmO_H2qA3agcvCaKWqM44Xqs9H0a6wo-4Q/formResponse";

const FIELD_MAP = {
  fullName: "entry.1998186726",
  email: "entry.760397205",
  phone: "entry.231551245",
  studentType: "entry.486298540",
} as const;

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();

    const fullName = String(payload.fullName ?? "").trim();
    const email = String(payload.email ?? "").trim();
    const phone = String(payload.phone ?? "").trim();
    const studentType = String(payload.studentType ?? "").trim();

    if (!fullName || !email || !phone || !studentType) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields" },
        { status: 400 },
      );
    }

    await submitToGoogleForm(FORM_RESPONSE_URL, {
      [FIELD_MAP.fullName]: fullName,
      [FIELD_MAP.email]: email,
      [FIELD_MAP.phone]: phone,
      [FIELD_MAP.studentType]: studentType,
    });

    await appendLeadToGoogleSheet({
      page: extractPathnameFromUrl(request.headers.get("referer")),
      leadSource: "Blog Sidebar Enquiry",
      formType: "blog_sidebar_enquiry",
      fullName,
      phone,
      whatsapp: phone,
      email,
      neetStatus: studentType,
      rawPayloadJson: JSON.stringify(payload),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Blog sidebar enquiry failed", error);

    return NextResponse.json(
      { ok: false, error: "Blog sidebar enquiry failed" },
      { status: 500 },
    );
  }
}
