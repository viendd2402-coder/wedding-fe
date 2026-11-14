"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { useAuthSession } from "@/components/auth-session";
import { useGlobalPreferences } from "@/components/global-preferences-provider";
import { useMessages } from "@/i18n/use-messages";
import { getStoredAuthToken } from "@/lib/auth-client";
import AccountPageShell, {
  AccountEmptyState,
  AccountHelpCard,
  TemplateSuggestions,
} from "@/components/account-page-shell";
import {
  getTemplateCardImage,
  getTemplateDisplayName,
  getTemplateHref,
  getTemplateScrollPreview,
  resolveTemplateSlug,
  weddingTemplates,
} from "@/lib/templates";
import {
  isPaymentCheckoutOfferExpired,
  isPremiumPaymentProductType,
  isPublishedInvitationStatus,
  parseUserPaymentsListResponse,
  shouldOfferCheckoutResume,
  type UserPaymentListItemResponse,
} from "@/lib/user-payments-api";

/** Tìm mẫu từ slug API (slug nội bộ hoặc công khai). */
function findTemplate(templateSlug: string) {
  const resolved = resolveTemplateSlug(templateSlug);
  return resolved ? weddingTemplates.find((t) => t.slug === resolved.slug) : undefined;
}

/** API lưu slug nội bộ (vd. `gentle-drift`) — đổi sang URL công khai (`/templates/mau-premium-so-02`). */
function templateDemoHref(templateSlug: string): string {
  const template = findTemplate(templateSlug);
  return template ? getTemplateHref(template) : `/templates/${encodeURIComponent(templateSlug)}`;
}

const INVITATION_CARD_PLACEHOLDER_IMAGE =
  "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=70";

function InvitationsGlyph({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.65"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M4 7.5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-10Z" />
      <path d="M8 5.5V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v1.5" />
      <path d="M4 9.5h16" />
      <path d="M9 14h.01M12 14h.01M15 14h.01" />
    </svg>
  );
}

function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

function formatUpdatedAt(iso: string, locale: string): string {
  try {
    const d = new Date(iso);
    return new Intl.DateTimeFormat(locale === "vi" ? "vi-VN" : "en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(d);
  } catch {
    return iso;
  }
}

function formatEventDateFromIso(iso: string | null, locale: string): string | null {
  if (!iso?.trim()) return null;
  try {
    const d = new Date(iso);
    return new Intl.DateTimeFormat(locale === "vi" ? "vi-VN" : "en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(d);
  } catch {
    return null;
  }
}

export default function MyInvitationsScreen() {
  const router = useRouter();
  const { signedIn } = useAuthSession();
  const { language } = useGlobalPreferences();
  const { myInvitations: copy, account } = useMessages();
  const isClient = useIsClient();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  /** Web Share API (mở Zalo, Messenger… trên điện thoại). Chỉ hiện nút khi trình duyệt hỗ trợ. */
  const canShare = isClient && typeof navigator !== "undefined" && typeof navigator.share === "function";
  const [items, setItems] = useState<UserPaymentListItemResponse[]>([]);
  const [listPhase, setListPhase] = useState<"loading" | "ready">("loading");
  const [listError, setListError] = useState(false);
  const [listRefresh, setListRefresh] = useState(0);

  const copyPublicUrl = useCallback(async (id: string, url: string) => {
    try {
      const absolute =
        url.startsWith("/") && typeof window !== "undefined"
          ? `${window.location.origin}${url}`
          : url;
      await navigator.clipboard.writeText(absolute);
      setCopiedId(id);
      window.setTimeout(() => setCopiedId(null), 2000);
    } catch {
      setCopiedId(null);
    }
  }, []);

  const shareInvite = useCallback(
    async (id: string, url: string, title: string) => {
      const absolute = url.startsWith("/") ? `${window.location.origin}${url}` : url;
      try {
        await navigator.share({ title, url: absolute });
      } catch (e) {
        // Người dùng huỷ chia sẻ → bỏ qua; lỗi khác → sao chép link thay thế
        if (!(e instanceof DOMException && e.name === "AbortError")) void copyPublicUrl(id, url);
      }
    },
    [copyPublicUrl],
  );

  useEffect(() => {
    if (!isClient) return;
    if (!signedIn) router.replace("/login");
  }, [isClient, signedIn, router]);

  useEffect(() => {
    if (!isClient || !signedIn) return;

    const ac = new AbortController();
    let cancelled = false;

    const run = async () => {
      setListPhase("loading");
      setListError(false);
      try {
        const token = getStoredAuthToken();
        const headers: Record<string, string> = { Accept: "application/json" };
        if (token) headers.Authorization = `Bearer ${token}`;

        const res = await fetch("/api/payments", {
          method: "GET",
          credentials: "include",
          headers,
          signal: ac.signal,
        });

        const raw: unknown = await res.json().catch(() => null);
        if (cancelled) return;

        if (!res.ok) {
          setListError(true);
          setItems([]);
          setListPhase("ready");
          return;
        }

        const parsed = parseUserPaymentsListResponse(raw);
        if (!parsed) {
          setListError(true);
          setItems([]);
          setListPhase("ready");
          return;
        }

        setItems(parsed);
        setListPhase("ready");
      } catch (e) {
        if (e instanceof DOMException && e.name === "AbortError") return;
        if (!cancelled) {
          setListError(true);
          setItems([]);
          setListPhase("ready");
        }
      }
    };

    void run();
    return () => {
      cancelled = true;
      ac.abort();
    };
  }, [isClient, signedIn, listRefresh]);

  if (!isClient) {
    return (
      <main className="lux-page-bg min-h-screen flex-1">
        <p className="lux-muted px-6 py-28 text-center text-sm font-medium">{copy.loading}</p>
      </main>
    );
  }

  if (!signedIn) {
    return (
      <main className="lux-page-bg min-h-screen flex-1 px-4 py-24">
        <AccountEmptyState
          icon={<InvitationsGlyph className="h-7 w-7" />}
          title={copy.needLogin}
          body=""
          action={
            <Link href="/login" className="btn-primary inline-flex rounded-full px-8 py-3.5 text-sm font-medium">
              {copy.goLogin}
            </Link>
          }
        />
      </main>
    );
  }

  const fieldLabel = "text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-[var(--color-muted)]";
  const secondaryBtn =
    "btn-secondary inline-flex flex-1 cursor-pointer items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium sm:flex-none disabled:cursor-not-allowed disabled:opacity-45";
  const primaryBtn =
    "btn-primary inline-flex flex-1 items-center justify-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-medium sm:flex-none";

  const publishedCount = items.filter((i) => isPublishedInvitationStatus(i.publicationStatus)).length;
  const stats = [
    { label: account.statTotal, value: items.length },
    { label: account.statPublished, value: publishedCount, dot: "bg-[var(--color-sage)]" },
    { label: account.statDraft, value: items.length - publishedCount, dot: "bg-[var(--color-gold)]" },
  ];

  return (
    <AccountPageShell
      backLabel={copy.backHome}
      title={copy.title}
      subtitle={account.invitationsSubtitle}
      aside={
        <Link href="/#templates" className="btn-primary inline-flex rounded-full px-6 py-3 text-sm font-medium">
          + {copy.ctaBrowse}
        </Link>
      }
    >
      {/* Thông báo đã sao chép link */}
      <div
        className={`pointer-events-none fixed inset-x-0 bottom-8 z-[80] flex justify-center px-4 transition duration-300 ${
          copiedId ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
        role="status"
        aria-live="polite"
      >
        <span className="inline-flex items-center gap-2 rounded-full bg-[#17130f] px-5 py-3 text-sm font-medium text-white shadow-[var(--shadow-lift)]">
          <span className="text-[#e8cf9f]" aria-hidden="true">✓</span>
          {account.copiedToast}
        </span>
      </div>

      {listPhase === "ready" && !listError && items.length > 0 ? (
        <dl className="mb-8 grid grid-cols-3 gap-3 sm:gap-5">
          {stats.map((s) => (
            <div key={s.label} className="lux-card rounded-2xl px-4 py-4 sm:px-6 sm:py-5">
              <dt className="flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-[var(--color-muted)] sm:text-xs">
                {s.dot ? <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} aria-hidden="true" /> : null}
                {s.label}
              </dt>
              <dd className="mt-2 font-display text-3xl font-medium leading-none sm:text-4xl">{s.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}
      {listError ? (
        <div
          className="mb-8 flex flex-col gap-3 rounded-2xl border border-[color-mix(in_srgb,var(--color-rose)_45%,transparent)] bg-[color-mix(in_srgb,var(--color-rose)_10%,var(--color-surface))] px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
          role="alert"
        >
          <p className="text-sm leading-relaxed">{copy.listLoadError}</p>
          <button
            type="button"
            onClick={() => setListRefresh((n) => n + 1)}
            className="btn-secondary shrink-0 cursor-pointer rounded-full px-5 py-2 text-sm font-medium"
          >
            {copy.retryList}
          </button>
        </div>
      ) : null}

      {listPhase === "loading" ? (
        <ul className="flex flex-col gap-5" aria-busy="true" aria-label={copy.loading}>
          {[0, 1].map((i) => (
            <li key={i} className="lux-card h-56 animate-pulse rounded-[1.5rem] opacity-60" />
          ))}
        </ul>
      ) : null}

      {listPhase === "ready" && !listError && items.length === 0 ? (
        <AccountEmptyState
          icon={<InvitationsGlyph className="h-7 w-7" />}
          title={copy.emptyTitle}
          body={copy.emptyBody}
          action={
            <Link href="/#templates" className="btn-primary inline-flex rounded-full px-8 py-3.5 text-sm font-medium">
              {copy.ctaBrowse}
            </Link>
          }
        />
      ) : null}

      {listPhase === "ready" && !listError && items.length === 0 ? <TemplateSuggestions /> : null}

      {listPhase === "ready" && !listError && items.length > 0 ? (
        <ul className="flex flex-col gap-5">
          {items.map((item, index) => {
            const couple = item.eventTitle?.trim() || copy.eventUntitled;
            const published = isPublishedInvitationStatus(item.publicationStatus);
            const statusLabel = published ? copy.statusPublished : copy.statusDraft;
            const premium = isPremiumPaymentProductType(item.paymentType);
            const tierLabel = premium ? copy.tierPremium : copy.tierFree;
            const templateSlug = item.templateSlug?.trim() ?? null;
            const template = templateSlug ? findTemplate(templateSlug) : undefined;
            const templateLabel = template ? getTemplateDisplayName(template, language) : item.templateName;
            const templateDemoPath = templateSlug ? templateDemoHref(templateSlug) : null;
            const previewSrc =
              item.thumbnailUrl?.trim() || (template ? getTemplateCardImage(template) : INVITATION_CARD_PLACEHOLDER_IMAGE);
            const scrollPreview = template ? getTemplateScrollPreview(template) : null;
            const eventSummaryText =
              item.eventDateLabel?.trim() || formatEventDateFromIso(item.eventDateIso, language) || copy.eventTbd;
            const venueText = item.venueDetail?.trim() || copy.venueTbd;
            const invitePath = item.invitePath?.trim() || null;
            const checkoutUrl = item.checkoutUrl?.trim() || null;
            const offerCheckout = shouldOfferCheckoutResume(item);
            const checkoutExpired = Boolean(offerCheckout && checkoutUrl) && isPaymentCheckoutOfferExpired(item);
            const showPayButton = Boolean(offerCheckout && checkoutUrl && !checkoutExpired);
            const rowKey = String(item.id);

            return (
              <li key={rowKey}>
                <article className="lux-card lux-card-hover group overflow-hidden rounded-[1.5rem]">
                  <div className="flex flex-col md:flex-row md:items-stretch">
                    {/* Sân khấu: ảnh nền mờ + khung điện thoại — rê chuột vào thẻ để cuộn bản xem trước */}
                    <div
                      className="relative h-[20rem] w-full shrink-0 overflow-hidden bg-[var(--color-surface-2)] md:h-auto md:min-h-[20rem] md:w-60 lg:w-64"
                      style={template ? { backgroundColor: `color-mix(in srgb, ${template.accent} 22%, var(--color-surface-2))` } : undefined}
                    >
                      <Image
                        src={previewSrc}
                        alt=""
                        fill
                        unoptimized
                        className="scale-125 object-cover opacity-45 blur-2xl"
                        aria-hidden
                      />
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,color-mix(in_srgb,var(--color-surface-2)_55%,transparent))]" aria-hidden="true" />
                      <div className="absolute left-1/2 top-1/2 aspect-[9/18.5] h-[86%] -translate-x-1/2 -translate-y-1/2 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-[calc(50%+0.5rem)]">
                        <div className="relative h-full overflow-hidden rounded-[1.8rem] border-[6px] border-[#151311] bg-[#151311] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.5)]">
                          <Image
                            src={scrollPreview ?? previewSrc}
                            alt={`${templateLabel} — ${couple}`}
                            fill
                            unoptimized
                            className={scrollPreview ? "animate-lux-phone-scroll object-cover object-top" : "object-cover object-center"}
                            priority={index === 0}
                          />
                          <span className="absolute left-1/2 top-2 z-[1] h-[1rem] w-[34%] -translate-x-1/2 rounded-full bg-[#151311]" aria-hidden="true" />
                        </div>
                      </div>
                      <span
                        className={`absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.16em] backdrop-blur-md ${
                          premium ? "bg-[#17130f]/85 text-[#e8cf9f]" : "bg-white/90 text-[#1c1917]"
                        }`}
                      >
                        {premium ? <span aria-hidden="true">✦</span> : null}
                        {tierLabel}
                      </span>
                    </div>

                    <div className="flex min-w-0 flex-1 flex-col gap-6 p-5 sm:p-7">
                      {/* Tiêu đề + trạng thái */}
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span
                              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.14em] ${
                                published
                                  ? "bg-[color-mix(in_srgb,var(--color-sage)_16%,transparent)] text-[var(--color-sage)]"
                                  : "bg-[var(--color-gold-soft)] text-[var(--color-gold)]"
                              }`}
                            >
                              <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
                              {statusLabel}
                            </span>
                            {templateDemoPath ? (
                              <Link
                                href={templateDemoPath}
                                className="text-xs font-medium text-[var(--color-muted)] underline-offset-4 transition hover:text-[var(--color-ink)] hover:underline"
                              >
                                {templateLabel}
                              </Link>
                            ) : (
                              <span className="text-xs font-medium text-[var(--color-muted)]">{templateLabel}</span>
                            )}
                          </div>
                          <h3 className="mt-3 truncate font-display text-[1.75rem] font-medium leading-tight">{couple}</h3>
                          {/* Gợi ý bước tiếp theo */}
                          <p className="mt-2 flex items-start gap-2 text-sm text-[var(--color-muted)]">
                            <span className="mt-0.5 text-[var(--color-gold)]" aria-hidden="true">
                              {showPayButton ? "◆" : published ? "✓" : "✎"}
                            </span>
                            {showPayButton
                              ? account.nextStepPayment
                              : published
                                ? account.nextStepPublished
                                : account.nextStepDraft}
                          </p>
                        </div>
                        <p className="shrink-0 text-xs tabular-nums text-[var(--color-muted)]">
                          {copy.updatedPrefix}{" "}
                          <time dateTime={item.updatedAt}>{formatUpdatedAt(item.updatedAt, language)}</time>
                        </p>
                      </div>

                      {/* Ngày & địa điểm */}
                      <dl className="grid gap-4 border-y border-[var(--color-line)] py-4 sm:grid-cols-2">
                        <div>
                          <dt className={fieldLabel}>{copy.eventSummaryLabel}</dt>
                          <dd className="mt-1.5 text-sm font-medium leading-snug">{eventSummaryText}</dd>
                        </div>
                        <div>
                          <dt className={fieldLabel}>{copy.venueLabel}</dt>
                          <dd className="lux-muted mt-1.5 text-sm leading-snug">{venueText}</dd>
                        </div>
                      </dl>

                      {/* Link thiệp + hành động */}
                      <div className="flex flex-col gap-3">
                        <p className={fieldLabel}>{copy.inviteLinkLabel}</p>
                        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
                          <div
                            className="min-h-[2.75rem] flex-1 rounded-xl border border-[var(--color-line)] bg-[var(--color-surface-2)] px-4 py-2.5 font-mono text-xs leading-relaxed lg:min-w-0"
                            title={invitePath ?? undefined}
                          >
                            <span className={invitePath ? "break-all" : "lux-muted italic"}>
                              {invitePath ?? copy.noPublicLinkYet}
                            </span>
                          </div>
                          <div className="flex flex-col gap-2 sm:flex-row lg:shrink-0">
                            {showPayButton ? (
                              <a href={checkoutUrl!} className={`${primaryBtn} sm:min-w-[12rem]`}>
                                {copy.completePayment}
                                <span className="text-xs" aria-hidden>
                                  ↗
                                </span>
                              </a>
                            ) : null}
                            {checkoutExpired ? (
                              <>
                                <span
                                  className="inline-flex min-h-[2.75rem] flex-1 items-center justify-center gap-2 rounded-full bg-[var(--color-gold-soft)] px-5 py-2.5 text-center text-sm font-medium text-[var(--color-gold)]"
                                  role="status"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.75"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-4 w-4 shrink-0"
                                    aria-hidden
                                  >
                                    <circle cx="12" cy="12" r="9" />
                                    <path d="M12 7v5l3 2" />
                                  </svg>
                                  {copy.checkoutExpired}
                                </span>
                                {templateDemoPath ? (
                                  <Link href={templateDemoPath} className={secondaryBtn}>
                                    {copy.openThisTemplate}
                                  </Link>
                                ) : null}
                              </>
                            ) : null}
                            {!showPayButton && !checkoutExpired ? (
                              <>
                                {invitePath?.startsWith("/") ? (
                                  <Link href={invitePath} className={primaryBtn}>
                                    {copy.openInvite}
                                  </Link>
                                ) : invitePath?.startsWith("http") ? (
                                  <a href={invitePath} target="_blank" rel="noopener noreferrer" className={primaryBtn}>
                                    {copy.openInvite}
                                    <span className="text-xs" aria-hidden>
                                      ↗
                                    </span>
                                  </a>
                                ) : (
                                  <span className={`${secondaryBtn} cursor-not-allowed opacity-45`}>{copy.openInvite}</span>
                                )}
                                <button
                                  type="button"
                                  disabled={!invitePath}
                                  onClick={() => {
                                    if (!invitePath) return;
                                    void copyPublicUrl(rowKey, invitePath);
                                  }}
                                  className={secondaryBtn}
                                >
                                  {copiedId === rowKey ? `✓ ${copy.copied}` : copy.copyLink}
                                </button>
                                {canShare && invitePath ? (
                                  <button
                                    type="button"
                                    onClick={() => void shareInvite(rowKey, invitePath, couple)}
                                    className={secondaryBtn}
                                  >
                                    {account.share}
                                    <span className="ml-1.5 text-xs" aria-hidden="true">↗</span>
                                  </button>
                                ) : null}
                              </>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      ) : null}

      {listPhase === "ready" ? <AccountHelpCard className="mt-12" /> : null}
    </AccountPageShell>
  );
}
