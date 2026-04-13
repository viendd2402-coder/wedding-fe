import { NextResponse } from "next/server";
import { getPublicApiBaseUrl } from "@/lib/api-base";
import { sanitizePaymentInvitation } from "@/lib/create-payment-invitation";
import { extractPaymentRedirectUrl } from "@/lib/payment-redirect-url";
import { weddingTemplates } from "@/templates/template-registry";

type Body = {
  invitation?: unknown;
};

/**
 * POST — tạo thiệp miễn phí qua backend Nest (`POST …/free-invitation`).
 * Body gửi BE giống thanh toán: `{ invitation }` — `CreatePaymentInvitationDto` (sanitize giống payment-link).
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
  if (!templateMeta || templateMeta.tier !== "Miễn phí") {
    return NextResponse.json({ error: "not_free" }, { status: 403 });
  }

  const apiBase = getPublicApiBaseUrl();
  if (!apiBase) {
    return NextResponse.json({ error: "payment_config" }, { status: 503 });
  }

  const upstreamUrl = `${apiBase}/payments/free-invitation`;
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
    console.error("[free-invitation] fetch", e);
    return NextResponse.json({ error: "free_invitation_failed" }, { status: 502 });
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
    console.error("[free-invitation] upstream", upstreamRes.status, text.slice(0, 500));
    return NextResponse.json(
      parsed && typeof parsed === "object" && !Array.isArray(parsed)
        ? parsed
        : { error: "free_invitation_failed" },
      { status: upstreamRes.status },
    );
  }

  const redirectUrl = extractPaymentRedirectUrl(parsed);
  const base =
    parsed && typeof parsed === "object" && !Array.isArray(parsed)
      ? (parsed as Record<string, unknown>)
      : {};

  return NextResponse.json({
    ...base,
    ...(redirectUrl ? { checkoutUrl: redirectUrl } : {}),
  });
}
