"use client";

import { useMessages } from "@/i18n/use-messages";

/**
 * Gợi ý cách xem trước mẫu, đổi theo thiết bị bằng media query (không cần JS → không nháy khi tải):
 * - có chuột (hover): "Rê chuột vào từng mẫu để xem trước toàn bộ thiệp"
 * - cảm ứng: "Chạm vào mẫu để xem demo đầy đủ"
 */
export default function TemplatePreviewHint({ className = "" }: { className?: string }) {
  const { home: copy } = useMessages();
  const pill =
    "items-center gap-2.5 rounded-full border border-[color-mix(in_srgb,var(--color-gold)_35%,transparent)] bg-[var(--color-gold-soft)] px-4 py-2 text-[0.8rem] font-medium text-[var(--color-ink)]";

  return (
    <div className={`flex justify-center ${className}`}>
      {/* Thiết bị có chuột */}
      <p className={`hidden [@media(hover:hover)]:inline-flex ${pill}`}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" className="h-4 w-4 shrink-0 text-[var(--color-gold)]" aria-hidden="true">
          <rect x="6.5" y="3" width="11" height="18" rx="5.5" />
          <path d="M12 7v3" className="motion-safe:animate-bounce" />
        </svg>
        {copy.galleryHoverHint}
      </p>
      {/* Thiết bị cảm ứng */}
      <p className={`inline-flex [@media(hover:hover)]:hidden ${pill}`}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0 text-[var(--color-gold)]" aria-hidden="true">
          <path d="M9 11V5.5a1.5 1.5 0 0 1 3 0V10m0-1.5a1.5 1.5 0 0 1 3 0V11m0-1a1.5 1.5 0 0 1 3 0v4.5a6.5 6.5 0 0 1-6.5 6.5h-.6a6 6 0 0 1-4.6-2.1L4.6 15a1.5 1.5 0 0 1 2.3-1.9L9 15" />
        </svg>
        {copy.galleryTapHint}
      </p>
    </div>
  );
}
