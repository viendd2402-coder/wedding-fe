import { NextResponse } from "next/server";
import { getPublicApiBaseUrl } from "@/lib/api-base";

/**
 * GET — danh sách thanh toán / thiệp của user qua backend Nest (`GET …/payments`).
 */
export async function GET(request: Request) {
  const apiBase = getPublicApiBaseUrl();
  if (!apiBase) {
    return NextResponse.json({ error: "payment_config" }, { status: 503 });
  }

  const upstreamUrl = `${apiBase}/payments`;
  const cookie = request.headers.get("cookie");
  const authorization = request.headers.get("authorization");

  let upstreamRes: Response;
  try {
    upstreamRes = await fetch(upstreamUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
        ...(cookie ? { Cookie: cookie } : {}),
        ...(authorization?.trim() ? { Authorization: authorization.trim() } : {}),
      },
      cache: "no-store",
    });
  } catch (e) {
    console.error("[payments] fetch", e);
    return NextResponse.json({ error: "upstream_failed" }, { status: 502 });
  }

  const text = await upstreamRes.text();
  let parsed: unknown = null;
  if (text.trim()) {
    try {
      parsed = JSON.parse(text) as unknown;
    } catch {
      parsed = { error: "invalid_upstream_json", raw: text.slice(0, 200) };
    }
  }

  // 200 không có body — nhiều framework trả vậy cho danh sách rỗng; `{}` làm FE parse lỗi.
  if (parsed === null && upstreamRes.ok && !text.trim()) {
    parsed = [];
  }

  return NextResponse.json(parsed ?? {}, { status: upstreamRes.status });
}
