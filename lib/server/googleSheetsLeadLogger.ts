import { google } from "googleapis";

const HEADER_ROW = [
  "timestamp",
  "page",
  "lead_source",
  "form_type",
  "full_name",
  "phone",
  "whatsapp",
  "email",
  "city",
  "course",
  "study_country",
  "preferred_university",
  "neet_status",
  "neet_score_range",
  "message",
  "raw_payload_json",
] as const;

export type LeadSheetRowData = {
  timestamp?: string;
  page?: string;
  leadSource?: string;
  formType?: string;
  fullName?: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  city?: string;
  course?: string;
  studyCountry?: string;
  preferredUniversity?: string;
  neetStatus?: string;
  neetScoreRange?: string;
  message?: string;
  rawPayloadJson?: string;
};

type SheetsConfig = {
  clientEmail: string;
  privateKey: string;
  spreadsheetId: string;
  sheetName: string;
};

let sheetsConfigCache: SheetsConfig | null | undefined;
let headerEnsured = false;

function normalizePrivateKey(privateKey: string) {
  return privateKey.replace(/\\n/g, "\n");
}

function getSheetsConfig(): SheetsConfig | null {
  if (sheetsConfigCache !== undefined) {
    return sheetsConfigCache;
  }

  const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL?.trim();
  const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY?.trim();
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID?.trim();
  const sheetName =
    process.env.GOOGLE_SHEETS_SHEET_NAME?.trim() || "All Website Leads";

  if (!clientEmail || !privateKey || !spreadsheetId || !sheetName) {
    sheetsConfigCache = null;
    return sheetsConfigCache;
  }

  sheetsConfigCache = {
    clientEmail,
    privateKey: normalizePrivateKey(privateKey),
    spreadsheetId,
    sheetName,
  };

  return sheetsConfigCache;
}

export function isGoogleSheetsLeadLoggingConfigured() {
  return Boolean(getSheetsConfig());
}

function buildRow(row: LeadSheetRowData) {
  return [
    row.timestamp || new Date().toISOString(),
    row.page || "",
    row.leadSource || "",
    row.formType || "",
    row.fullName || "",
    row.phone || "",
    row.whatsapp || "",
    row.email || "",
    row.city || "",
    row.course || "",
    row.studyCountry || "",
    row.preferredUniversity || "",
    row.neetStatus || "",
    row.neetScoreRange || "",
    row.message || "",
    row.rawPayloadJson || "",
  ];
}

function getPathnameFromParsedUrl(url: URL) {
  const pathname = url.pathname.trim();
  return pathname || "/";
}

export function extractPathnameFromUrl(urlValue?: string | null) {
  if (!urlValue) {
    return "";
  }

  try {
    return getPathnameFromParsedUrl(new URL(urlValue));
  } catch {
    return urlValue.startsWith("/") ? urlValue : "";
  }
}

async function getSheetsClient(config: SheetsConfig) {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: config.clientEmail,
      private_key: config.privateKey,
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return google.sheets({ version: "v4", auth });
}

async function ensureHeaderRow(
  sheets: Awaited<ReturnType<typeof getSheetsClient>>,
  config: SheetsConfig,
) {
  if (headerEnsured) {
    return;
  }

  const headerRange = `${config.sheetName}!1:1`;
  const currentHeader = await sheets.spreadsheets.values.get({
    spreadsheetId: config.spreadsheetId,
    range: headerRange,
  });

  const existingValues = currentHeader.data.values?.[0] ?? [];
  const matchesHeader =
    existingValues.length >= HEADER_ROW.length &&
    HEADER_ROW.every((header, index) => existingValues[index] === header);

  if (!matchesHeader) {
    await sheets.spreadsheets.values.update({
      spreadsheetId: config.spreadsheetId,
      range: `${config.sheetName}!A1`,
      valueInputOption: "RAW",
      requestBody: {
        values: [Array.from(HEADER_ROW)],
      },
    });
  }

  headerEnsured = true;
}

export async function appendLeadToGoogleSheet(row: LeadSheetRowData) {
  const config = getSheetsConfig();

  if (!config) {
    throw new Error("Google Sheets lead logging is not configured.");
  }

  const sheets = await getSheetsClient(config);
  await ensureHeaderRow(sheets, config);

  await sheets.spreadsheets.values.append({
    spreadsheetId: config.spreadsheetId,
    range: `${config.sheetName}!A:A`,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [buildRow(row)],
    },
  });
}
