import { NextResponse } from "next/server";
import { getPublicApiBaseUrl } from "@/lib/api-base";
import { sanitizePaymentInvitation } from "@/lib/create-payment-invitation";
import { extractPaymentRedirectUrl } from "@/lib/payment-redirect-url";
import { weddingTemplates } from "@/templates/template-registry";

type Body = {
  invitation?: unknown;
};

/**
 * POST — tạo link thanh toán VNPay qua backend Nest (`POST …/payments/payment-link`).
 * Body gửi BE: `{ invitation }` — amount/description do Nest quyết định.
 */
export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const invitation = sanitizePaymentInvitation(body.invitation);
  if (!invitation) {
    return NextResponse.json({ error: "invalid_invitation" }, { status: 400 });
  }

  const templateMeta = weddingTemplates.find((t) => t.slug === invitation.templateSlug);
  if (!templateMeta || templateMeta.tier !== "Trả phí") {
    return NextResponse.json({ error: "not_premium" }, { status: 403 });
  }

  const apiBase = getPublicApiBaseUrl();
  if (!apiBase) {
    return NextResponse.json({ error: "payment_config" }, { status: 503 });
  }

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
      body: JSON.stringify({ invitation }),
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
