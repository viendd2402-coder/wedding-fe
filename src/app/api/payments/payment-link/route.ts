import { NextResponse } from "next/server";
import { getPublicApiBaseUrl } from "@/lib/api-base";
import { extractPaymentRedirectUrl } from "@/lib/payment-redirect-url";
import { PREMIUM_AMOUNT_VND, buildPremiumPaymentDescription } from "@/lib/premium-checkout";
import { weddingTemplates } from "@/templates/template-registry";

type Body = {
  templateSlug?: string;
  /** Ghi chú xem thử — chỉ log server, không gửi sang Nest. */
  clientNote?: string;
};

/**
 * POST — tạo link thanh toán VNPay qua backend Nest (`POST …/payments/payment-link`).
 * Body gửi BE: `{ amount, description }` (class-validator trên server).
 */
export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const templateSlug = typeof body.templateSlug === "string" ? body.templateSlug.trim() : "";
  if (!templateSlug) {
    return NextResponse.json({ error: "missing_template" }, { status: 400 });
  }

  const templateMeta = weddingTemplates.find((t) => t.slug === templateSlug);
  if (!templateMeta || templateMeta.tier !== "Trả phí") {
    return NextResponse.json({ error: "not_premium" }, { status: 403 });
  }

  const clientNote = typeof body.clientNote === "string" ? body.clientNote.slice(0, 2000) : "";
  if (clientNote) {
    console.info("[payment-link note]", { templateSlug, previewNote: clientNote });
  }

  const apiBase = getPublicApiBaseUrl();
  if (!apiBase) {
    return NextResponse.json({ error: "payment_config" }, { status: 503 });
  }

  const amount = Math.floor(Number(PREMIUM_AMOUNT_VND));
  if (!Number.isFinite(amount) || amount < 1000) {
    return NextResponse.json({ error: "invalid_amount" }, { status: 500 });
  }
  const description = buildPremiumPaymentDescription(templateMeta.name, templateMeta.slug);

  const upstreamUrl = `${apiBase}/payments/payment-link`;
  const cookie = request.headers.get("cookie");
  const authorization = request.headers.get("authorization");

  let upstreamRes: Response;
  try {
    upstreamRes = await fetch(upstreamUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...(cookie ? { Cookie: cookie } : {}),
        ...(authorization?.trim() ? { Authorization: authorization.trim() } : {}),
      },
      body: JSON.stringify({ amount, description }),
      cache: "no-store",
    });
  } catch (e) {
    console.error("[payment-link] fetch", e);
    return NextResponse.json({ error: "checkout_failed" }, { status: 502 });
  }

  const text = await upstreamRes.text();
  let parsed: unknown = null;
  if (text.trim()) {
    try {
      parsed = JSON.parse(text) as unknown;
    } catch {
      parsed = null;
    }
  }

  if (!upstreamRes.ok) {
    console.error("[payment-link] upstream", upstreamRes.status, text.slice(0, 500));
    return NextResponse.json({ error: "checkout_failed" }, { status: 502 });
  }

  const redirectUrl = extractPaymentRedirectUrl(parsed);
  if (!redirectUrl) {
    console.error("[payment-link] no redirect url in body", text.slice(0, 500));
    return NextResponse.json({ error: "no_checkout_url" }, { status: 502 });
  }

  return NextResponse.json({ checkoutUrl: redirectUrl });
}
