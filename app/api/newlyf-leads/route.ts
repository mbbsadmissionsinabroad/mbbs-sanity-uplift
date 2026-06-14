import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

function buildWebhookBody(payload: Record<string, string>) {
  return new URLSearchParams(payload).toString();
}

export async function POST(request: NextRequest) {
  try {
    const webhookUrl =
      process.env.GOOGLE_APPS_SCRIPT_WEBHOOK_URL ??
      process.env.NEXT_PUBLIC_LANDING_SHEET_WEBHOOK_URL ??
      "";

    if (!webhookUrl) {
      return NextResponse.json(
        { ok: false, error: "Apps Script webhook URL is not configured" },
        { status: 500 },
      );
    }

    const payload = await request.json();

    const body = buildWebhookBody({
      timestamp: payload.timestamp ?? new Date().toISOString(),
      eventType: "form_submission",
      page: "/mbbs-abroad-3-5-lakh-starting",
      source: payload.source ?? "mbbs-abroad-3-5-lakh-starting",
      ctaLabel: "GET MY FREE FEE + COUNTRY ROADMAP",
      ctaDestination: "form_submission",
      fullName: payload.name ?? "",
      mobile: payload.phone ?? "",
      whatsapp: payload.phone ?? "",
      email: "",
      city: payload.city ?? "",
      neetStatus: payload.neetYear ?? "",
      neetScoreRange: "",
      message: payload.country
        ? `Preferred country: ${payload.country}`
        : "",
      userAgent: request.headers.get("user-agent") ?? "",
      referrer: request.headers.get("referer") ?? "",
    });

    const webhookResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body,
      redirect: "follow",
      cache: "no-store",
    });

    if (!webhookResponse.ok) {
      const webhookText = await webhookResponse.text();
      console.error(
        "Newlyf leads webhook failed",
        webhookResponse.status,
        webhookText,
      );

      return NextResponse.json(
        { ok: false, error: "Webhook failed", status: webhookResponse.status },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to log NewLyf lead", error);

    return NextResponse.json(
      { ok: false, error: "Failed to log lead" },
      { status: 500 },
    );
  }
}
