import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const FORM_RESPONSE_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfoDsOcyVwtdfqrq33g4yn3iA_JQhLiycLzE_ku9lcjRcvTag/formResponse";

const FIELD_MAP = {
  fullName: "entry.1998186726",
  email: "entry.760397205",
  phone: "entry.231551245",
  studentType: "entry.486298540",
} as const;

function buildFormBody(payload: Record<string, string>) {
  const params = new URLSearchParams();

  Object.entries(payload).forEach(([key, value]) => {
    params.set(key, value);
  });

  return params.toString();
}

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

    const body = buildFormBody({
      [FIELD_MAP.fullName]: fullName,
      [FIELD_MAP.email]: email,
      [FIELD_MAP.phone]: phone,
      [FIELD_MAP.studentType]: studentType,
    });

    const formResponse = await fetch(FORM_RESPONSE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body,
      redirect: "follow",
      cache: "no-store",
    });

    const responseText = await formResponse.text();

    if (
      !formResponse.ok ||
      !responseText.includes("Your response has been recorded.")
    ) {
      console.error(
        "Google Form submission failed",
        formResponse.status,
        responseText,
      );

      return NextResponse.json(
        { ok: false, error: "Google Form submission failed" },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Webinar registration failed", error);

    return NextResponse.json(
      { ok: false, error: "Webinar registration failed" },
      { status: 500 },
    );
  }
}
