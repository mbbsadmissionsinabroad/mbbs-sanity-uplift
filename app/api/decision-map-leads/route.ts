import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

export const runtime = "nodejs";

const SPREADSHEET_ID = "1bPwl-wbhKiYsoproJLpmLt8FYMCm1V49_Q3hQ7DQ6uA";
const SHEET_NAME = "Sheet1";

const HEADER_ROW = [
  "Timestamp",
  "Source",
  "Name",
  "Phone",
  "NEET Status",
  "State",
  "City",
  "Email",
  "Countries Interested",
  "Message",
];

function normalizePrivateKey(key: string) {
  return key.replace(/\\n/g, "\n");
}

async function getSheetsClient() {
  const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL?.trim();
  const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY?.trim();

  if (!clientEmail || !privateKey) {
    throw new Error("Google Sheets credentials not configured");
  }

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: clientEmail,
      private_key: normalizePrivateKey(privateKey),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return google.sheets({ version: "v4", auth });
}

async function ensureHeader(
  sheets: Awaited<ReturnType<typeof getSheetsClient>>
) {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: `${SHEET_NAME}!1:1`,
  });

  const existing = res.data.values?.[0] ?? [];
  const ok =
    existing.length >= HEADER_ROW.length &&
    HEADER_ROW.every((h, i) => existing[i] === h);

  if (!ok) {
    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A1`,
      valueInputOption: "RAW",
      requestBody: { values: [HEADER_ROW] },
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();

    const name = String(payload.name ?? "").trim();
    const phone = String(payload.phone ?? "").trim();

    if (!name || !phone) {
      return NextResponse.json(
        { ok: false, error: "Name and phone are required" },
        { status: 400 }
      );
    }

    const row = [
      payload.timestamp ?? new Date().toISOString(),
      String(payload.source ?? "").trim(),
      name,
      phone,
      String(payload.neetStatus ?? "").trim(),
      String(payload.state ?? "").trim(),
      String(payload.city ?? "").trim(),
      String(payload.email ?? "").trim(),
      String(payload.countries ?? "").trim(),
      String(payload.message ?? "").trim(),
    ];

    try {
      const sheets = await getSheetsClient();
      await ensureHeader(sheets);
      await sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: `${SHEET_NAME}!A:A`,
        valueInputOption: "USER_ENTERED",
        insertDataOption: "INSERT_ROWS",
        requestBody: { values: [row] },
      });
    } catch (sheetErr) {
      // Log but don't block the user — form still succeeds
      console.error("[decision-map-leads] Google Sheets error:", sheetErr);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[decision-map-leads] Unexpected error:", err);
    return NextResponse.json(
      { ok: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
