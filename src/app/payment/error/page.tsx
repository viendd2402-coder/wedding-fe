import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Thanh toán không thành công | Lumiere",
};

type PageProps = {
  searchParams: Promise<{
    code?: string | string[];
    reason?: string | string[];
    message?: string | string[];
  }>;
};

function firstParam(value: string | string[] | undefined): string | undefined {
  if (value === undefined) return undefined;
  return Array.isArray(value) ? value[0] : value;
}

function ErrorMedallion() {
  return (
    <div
      className="relative mx-auto flex h-[5.5rem] w-[5.5rem] items-center justify-center"
      aria-hidden="true"
    >
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#ecd4d4] via-[#f5e8e8] to-[#dcc4c4] opacity-95 shadow-[0_12px_40px_rgba(158,90,102,0.18)] dark:from-[#2a1f22] dark:via-[#1f1719] dark:to-[#151011] dark:shadow-[0_12px_40px_rgba(0,0,0,0.45)]" />
      <div
        className="absolute inset-[3px] rounded-full border border-[#9e5a66]/45 dark:border-[#b87a82]/35"
        style={{
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.45), 0 0 0 1px rgba(158, 90, 102, 0.1)",
        }}
      />
      <svg
        className="relative z-[1] h-9 w-9 text-[#7a3d45] dark:text-[#e8b4bc]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.65"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 6L6 18" />
        <path d="M6 6l12 12" />
      </svg>
    </div>
  );
}

export default async function PaymentErrorPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const code = firstParam(sp.code)?.trim();
  const reason = firstParam(sp.reason)?.trim();
  const message = firstParam(sp.message)?.trim();

  const detailLine = message || reason;

  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--color-cream)] text-[var(--color-ink)]">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.9] dark:opacity-78"
        style={{
          background:
            "radial-gradient(ellipse 120% 80% at 50% -18%, rgba(158, 90, 102, 0.12), transparent 52%), radial-gradient(ellipse 88% 58% at 100% 100%, rgba(197, 167, 161, 0.1), transparent 48%), radial-gradient(ellipse 72% 48% at 0% 82%, rgba(125, 140, 121, 0.07), transparent 44%)",
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.38)_0%,transparent_36%,transparent_64%,rgba(233,221,209,0.32)_100%)] dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.03)_0%,transparent_40%)]" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-5xl flex-col items-center justify-center px-5 py-20 sm:px-10 lg:px-14">
        <div className="flex w-full max-w-full flex-col items-center translate-y-2 sm:translate-y-3 lg:translate-y-4">
          <article
            className="relative w-full overflow-hidden rounded-[2rem] border border-[var(--color-ink)]/[0.07] bg-[color-mix(in_srgb,var(--color-cream)_88%,transparent)] px-8 py-12 text-center backdrop-blur-md dark:border-white/[0.06] dark:bg-[color-mix(in_srgb,var(--color-cream)_75%,transparent)] sm:px-14 sm:py-16 lg:px-20 lg:py-20"
            style={{
              boxShadow:
                "0 28px 90px rgba(49, 42, 40, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.55), 0 0 0 1px rgba(158, 90, 102, 0.07)",
            }}
          >
            <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#9e5a66]/55 to-transparent dark:via-[#b87a82]/40 sm:inset-x-16 lg:inset-x-24" />
            <div className="pointer-events-none absolute inset-x-10 bottom-0 h-px bg-gradient-to-r from-transparent via-[var(--color-ink)]/[0.08] to-transparent sm:inset-x-20 lg:inset-x-28" />

            <ErrorMedallion />

            <p className="mt-8 text-[0.65rem] font-medium uppercase tracking-[0.42em] text-[#8f5a62] dark:text-[#d4a0a8]/95">
              Thanh toán
            </p>
            <h1 className="mt-3 font-display text-[2.15rem] font-medium leading-tight tracking-tight text-[var(--color-ink)] sm:text-4xl lg:text-5xl">
              Giao dịch chưa hoàn tất
            </h1>
            <p className="mx-auto mt-5 max-w-3xl text-base leading-[1.75] text-[var(--color-ink)]/68 sm:text-lg">
              Cổng thanh toán không ghi nhận thành công. Bạn chưa bị trừ tiền cho lần này — vui lòng thử lại hoặc chọn phương thức khác. Nếu số tiền đã bị trừ, hãy giữ biên lai và liên hệ hỗ trợ kèm mã tham chiếu (nếu có).
            </p>

            {/* {detailLine || code ? (
              <div className="mx-auto mt-8 max-w-2xl rounded-2xl border border-[var(--color-ink)]/[0.08] bg-[color-mix(in_srgb,var(--color-sand)_38%,transparent)] px-5 py-4 text-left dark:border-white/[0.06] dark:bg-white/[0.04] sm:px-8">
                {code ? (
                  <p className="text-[0.65rem] font-medium uppercase tracking-[0.28em] text-[var(--color-ink)]/45">
                    Mã / mã lỗi
                  </p>
                ) : null}
                {code ? (
                  <p className="mt-1.5 font-mono text-sm tracking-wide text-[var(--color-ink)]/88">{code}</p>
                ) : null}
                {detailLine ? (
                  <p
                    className={`text-sm leading-relaxed text-[var(--color-ink)]/72 ${code ? "mt-4 border-t border-[var(--color-ink)]/[0.08] pt-4 dark:border-white/[0.08]" : ""}`}
                  >
                    {detailLine}
                  </p>
                ) : null}
              </div>
            ) : null} */}

            <div className="mt-10 flex w-full flex-col gap-3 sm:flex-row sm:justify-center sm:gap-5 lg:gap-6">
              <Link
                href="/my-invitations"
                className="btn-primary inline-flex min-h-[3.25rem] flex-1 items-center justify-center rounded-full px-8 text-sm font-semibold tracking-wide transition duration-300 hover:-translate-y-0.5 sm:min-h-[3.5rem] sm:flex-none sm:px-12 sm:text-base"
              >
                Mẫu thiệp cưới đã tạo
              </Link>
              <Link
                href="/"
                className="inline-flex min-h-[3.25rem] flex-1 items-center justify-center rounded-full border border-[var(--color-ink)]/[0.12] bg-[color-mix(in_srgb,var(--color-cream)_40%,transparent)] px-8 text-sm font-medium text-[var(--color-ink)]/80 transition duration-300 hover:border-[#9e5a66]/35 hover:bg-[color-mix(in_srgb,#9e5a66_08%,var(--color-cream))] hover:text-[var(--color-ink)] dark:border-white/[0.12] dark:bg-white/[0.04] dark:hover:border-[#b87a82]/35 sm:min-h-[3.5rem] sm:flex-none sm:px-10 sm:text-base"
              >
                Về trang chủ
              </Link>
            </div>
          </article>

          <p className="mt-10 max-w-2xl text-center text-sm leading-relaxed text-[var(--color-ink)]/42">
            Lumiere · Thiệp cưới trực tuyến tinh tế
          </p>
        </div>
      </div>
    </main>
  );
}
