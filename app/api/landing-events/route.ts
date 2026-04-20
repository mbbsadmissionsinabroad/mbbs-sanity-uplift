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
        { status: 500 }
      );
    }

    const payload = await request.json();

    const body = buildWebhookBody({
      timestamp: new Date().toISOString(),
      eventType: payload.type ?? payload.eventType ?? "",
      page: payload.page ?? "",
      source: payload.source ?? "",
      ctaLabel: payload.ctaLabel ?? "",
      ctaDestination: payload.ctaDestination ?? "",
      fullName: payload.fullName ?? "",
      mobile: payload.mobile ?? "",
      whatsapp: payload.whatsapp ?? "",
      email: payload.email ?? "",
      city: payload.city ?? "",
      neetStatus: payload.neetStatus ?? "",
      neetScoreRange: payload.neetScoreRange ?? "",
      message: payload.message ?? "",
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
        "Apps Script webhook failed",
        webhookResponse.status,
        webhookText
      );

      return NextResponse.json(
        {
          ok: false,
          error: "Apps Script webhook failed",
          status: webhookResponse.status,
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to log landing event", error);

    return NextResponse.json(
      { ok: false, error: "Failed to log landing event" },
      { status: 500 }
    );
  }
}
