import { NextRequest, NextResponse } from "next/server";

import { submitToGoogleForm } from "@/lib/server/googleFormSubmission";

export const runtime = "nodejs";

const FORM_RESPONSE_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSedKabvmFfKTfpjwsz49wjQAs-cefrE80sH7tBP8TUY-WZUkg/formResponse";

const FIELD_MAP = {
  name: "entry.1406440029",
  email: "entry.2046018092",
  phone: "entry.1592973469",
} as const;

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();

    const name = String(payload.name ?? "").trim();
    const email = String(payload.email ?? "").trim();
    const phone = String(payload.phone ?? "").trim();

    if (!name || !email || !phone) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields" },
        { status: 400 },
      );
    }

    await submitToGoogleForm(FORM_RESPONSE_URL, {
      [FIELD_MAP.name]: name,
      [FIELD_MAP.email]: email,
      [FIELD_MAP.phone]: phone,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Blog popup enquiry failed", error);

    return NextResponse.json(
      { ok: false, error: "Blog popup enquiry failed" },
      { status: 500 },
    );
  }
}
