import { NextRequest, NextResponse } from "next/server";

import {
  appendLeadToGoogleSheet,
  extractPathnameFromUrl,
} from "@/lib/server/googleSheetsLeadLogger";

export const runtime = "nodejs";

type LeadPayload = {
  fields?: Record<string, unknown>;
  actions?: Array<{ type?: string; text?: string }>;
};

function getStringValue(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function getLeadSource(payload: LeadPayload) {
  const note = payload.actions?.find(
    (action) =>
      action?.type === "SYSTEM_NOTE" &&
      typeof action.text === "string" &&
      action.text.includes("Lead Source:"),
  );

  if (!note?.text) {
    return "";
  }

  return note.text.replace(/^Lead Source:\s*/i, "").trim();
}

function normalizeLeadPayload(payload: LeadPayload, referer: string | null) {
  const fields = payload.fields ?? {};
  const phone = getStringValue(fields.Phone);
  const residentCountry = getStringValue(fields.ResidentCountry);
  const studyCountry =
    getStringValue(fields.StudyCountry) || getStringValue(fields.Country);

  return {
    page: extractPathnameFromUrl(referer),
    leadSource: getLeadSource(payload),
    formType: "site_enquiry_form",
    fullName: getStringValue(fields.Name),
    phone,
    whatsapp: getStringValue(fields.WhatsApp) || phone,
    email: getStringValue(fields.Email),
    city: getStringValue(fields.City) || getStringValue(fields.State),
    course: getStringValue(fields.Course),
    studyCountry,
    preferredUniversity:
      getStringValue(fields.College) ||
      getStringValue(fields.PreferredUniversity),
    neetStatus: getStringValue(fields.NEETStatus) || residentCountry,
    neetScoreRange: getStringValue(fields.NEETScoreRange),
    message: getStringValue(fields.Message),
    rawPayloadJson: JSON.stringify(payload),
  };
}

function getForwardingTarget() {
  const serverUrl = process.env.CRM_LEAD_URL?.trim();

  if (serverUrl) {
    return serverUrl;
  }

  const publicUrl = process.env.NEXT_PUBLIC_LEAD_URL?.trim();

  if (!publicUrl || !/^https?:\/\//i.test(publicUrl)) {
    return "";
  }

  if (publicUrl.includes("/api/lead-proxy")) {
    return "";
  }

  return publicUrl;
}

function getForwardingSecret() {
  return (
    process.env.CRM_LEAD_SECRET_KEY?.trim() ||
    process.env.NEXT_PUBLIC_LEAD_SECRET_KEY?.trim() ||
    ""
  );
}

export async function POST(request: NextRequest) {
  try {
    const payload = (await request.json()) as LeadPayload;
    const referer = request.headers.get("referer");

    let sheetError: unknown = null;
    let crmError: unknown = null;

    try {
      await appendLeadToGoogleSheet(normalizeLeadPayload(payload, referer));
    } catch (error) {
      sheetError = error;
      console.error("Lead mirror to Google Sheet failed", error);
    }

    const targetUrl = getForwardingTarget();
    const accessToken = getForwardingSecret();

    if (targetUrl) {
      try {
        const response = await fetch(targetUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(accessToken
              ? { Authorization: `Bearer ${accessToken}` }
              : {}),
          },
          body: JSON.stringify(payload),
          cache: "no-store",
        });

        if (!response.ok) {
          crmError = new Error(`CRM forward failed with status ${response.status}`);
          console.error("Lead forward to CRM failed", {
            status: response.status,
            targetUrl,
          });
        }
      } catch (error) {
        crmError = error;
        console.error("Lead forward to CRM threw an error", error);
      }
    }

    if (sheetError && crmError) {
      return NextResponse.json(
        {
          ok: false,
          error: "Lead processing failed for both Google Sheet and CRM.",
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      ok: true,
      mirroredToSheet: !sheetError,
      forwardedToCrm: targetUrl ? !crmError : false,
      crmForwardSkipped: !targetUrl,
    });
  } catch (error) {
    console.error("Lead proxy failed", error);

    return NextResponse.json(
      { ok: false, error: "Lead proxy failed" },
      { status: 500 },
    );
  }
}
