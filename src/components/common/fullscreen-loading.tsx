"use client";

type FullscreenLoadingProps = {
  show: boolean;
  isDark?: boolean;
  label?: string;
};

export function FullscreenLoading({ show, isDark = false, label = "Loading..." }: FullscreenLoadingProps) {
  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center bg-black/14 backdrop-blur-[1px]"
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label={label}
    >
      <div
        className={`flex min-w-[8.5rem] items-center gap-3 rounded-2xl border px-4 py-3 shadow-lg ${
          isDark
            ? "border-white/15 bg-[#151517]/90 text-white"
            : "border-[var(--color-ink)]/10 bg-white/95 text-[var(--color-ink)]"
        }`}
      >
        <span aria-hidden="true" className="relative inline-flex h-5 w-5 items-center justify-center">
          <span
            className={`h-5 w-5 animate-spin rounded-full border-2 border-transparent border-t-[var(--color-rose)] border-r-[var(--color-sage)]`}
          />
          <span
            className={`absolute h-2.5 w-2.5 rounded-full ${
              isDark ? "bg-white/85" : "bg-[var(--color-ink)]/70"
            }`}
          />
        </span>
        <span className="text-sm font-medium">{label}</span>
      </div>
    </div>
  );
}
