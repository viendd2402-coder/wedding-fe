import Link from "next/link";

export const metadata = {
  title: "Thanh toán thành công | Lumiere",
};

export default function PaymentSuccessPage() {
  return (
    <main className="min-h-screen bg-[var(--color-cream)] px-6 py-16 text-[var(--color-ink)]">
      <div className="mx-auto max-w-lg text-center">
        <p className="text-sm uppercase tracking-[0.35em] text-[var(--color-sage)]">Thanh toán</p>
        <h1 className="mt-4 font-display text-4xl">Cảm ơn bạn</h1>
        <p className="mt-4 text-sm leading-7 text-[var(--color-ink)]/72">
          Giao dịch đã được ghi nhận. Đội ngũ Lumiere sẽ liên hệ để xác nhận và triển khai theo thông tin bạn đã cung cấp.
        </p>
        <Link
          href="/"
          className="btn-primary mt-10 inline-flex rounded-full px-8 py-3 text-sm font-medium transition hover:-translate-y-0.5"
        >
          Về trang chủ
        </Link>
      </div>
    </main>
  );
}
