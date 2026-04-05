import { NextResponse } from "next/server";
import {
  PAYOS_PREMIUM_DESCRIPTION,
  PREMIUM_AMOUNT_VND,
  appBaseUrlFromRequest,
  createPayOSClient,
} from "@/lib/payos-server";
import { weddingTemplates } from "@/templates/template-registry";

type Body = {
  buyerName?: string;
  buyerPhone?: string;
  templateSlug?: string;
  /** Ghi chú từ form xem thử (tên CD/CR, ngày…) — chỉ để log phía server nếu cần. */
  clientNote?: string;
};

function uniqueOrderCode(): number {
  const suffix = Math.floor(100 + Math.random() * 900);
  return Number.parseInt(`${Date.now()}${suffix}`, 10);
}

export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const buyerNameRaw = typeof body.buyerName === "string" ? body.buyerName.trim() : "";
  const buyerPhoneRaw = typeof body.buyerPhone === "string" ? body.buyerPhone.trim() : "";

  const templateSlug = typeof body.templateSlug === "string" ? body.templateSlug.trim() : "";
  if (!templateSlug) {
    return NextResponse.json({ error: "missing_template" }, { status: 400 });
  }

  const templateMeta = weddingTemplates.find((t) => t.slug === templateSlug);
  if (!templateMeta || templateMeta.tier !== "Trả phí") {
    return NextResponse.json({ error: "not_premium" }, { status: 403 });
  }

  const buyerName = (
    buyerNameRaw || `Khách · ${templateMeta.name}`
  ).slice(0, 100);

  const clientNote = typeof body.clientNote === "string" ? body.clientNote.slice(0, 2000) : "";
  if (clientNote) {
    console.info("[checkout note]", { templateSlug, previewNote: clientNote });
  }

  const payos = createPayOSClient();
  if (!payos) {
    return NextResponse.json({ error: "payment_config" }, { status: 503 });
  }

  const base = appBaseUrlFromRequest(request);
  const orderCode = uniqueOrderCode();
  const itemName = `Premium Lumiere — ${templateMeta.name}`.slice(0, 120);

  try {
    const data = await payos.paymentRequests.create({
      orderCode,
      amount: PREMIUM_AMOUNT_VND,
      description: PAYOS_PREMIUM_DESCRIPTION,
      buyerName,
      ...(buyerPhoneRaw ? { buyerPhone: buyerPhoneRaw.slice(0, 30) } : {}),
      cancelUrl: `${base}/templates/${templateSlug}`,
      returnUrl: `${base}/thanh-toan/thanh-cong`,
      items: [
        {
          name: itemName,
          quantity: 1,
          price: PREMIUM_AMOUNT_VND,
        },
      ],
    });

    if (!data.checkoutUrl) {
      return NextResponse.json({ error: "no_checkout_url" }, { status: 502 });
    }

    return NextResponse.json({
      checkoutUrl: data.checkoutUrl,
      orderCode: data.orderCode,
    });
  } catch (e) {
    console.error("[checkout]", e);
    return NextResponse.json({ error: "checkout_failed" }, { status: 502 });
  }
}
