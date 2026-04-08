"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { useGlobalPreferences } from "@/components/global-preferences-provider";
import { useMessages } from "@/i18n/use-messages";
import { templateModuleMap } from "@/templates/template-registry";
import type { PreviewData, PreviewImages, LightboxImage } from "@/templates/preview-types";

function SnapshotLightbox({
  image,
  onClose,
  closeLabel,
}: {
  image: LightboxImage | null;
  onClose: () => void;
  closeLabel: string;
}) {
  const { theme } = useGlobalPreferences();
  const isDark = theme === "dark";

  if (!image) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/82 p-3 pt-[max(0.75rem,env(safe-area-inset-top))] pb-[max(0.75rem,env(safe-area-inset-bottom))] pl-[max(0.75rem,env(safe-area-inset-left))] pr-[max(0.75rem,env(safe-area-inset-right))] sm:p-4"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="relative w-full max-w-5xl min-w-0"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={image.alt}
      >
        <button
          type="button"
          onClick={onClose}
          className={`absolute right-2 top-[max(0.5rem,env(safe-area-inset-top))] z-10 inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full shadow transition sm:right-3 sm:top-3 ${
            isDark
              ? "bg-white/12 text-white hover:bg-white/18"
              : "bg-white/90 text-[var(--color-ink)] hover:bg-white"
          }`}
          aria-label={closeLabel}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
            aria-hidden
          >
            <path d="M18 6L6 18" />
            <path d="M6 6l12 12" />
          </svg>
        </button>
        <div className="relative h-[min(85dvh,calc(100dvh-env(safe-area-inset-top)-env(safe-area-inset-bottom)-1.5rem))] max-h-[85vh] w-full overflow-hidden rounded-[1.4rem] bg-white/10 sm:rounded-[1.8rem]">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="100vw"
            className="object-contain"
            unoptimized
          />
        </div>
      </div>
    </div>
  );
}

type InviteSnapshotViewProps = {
  templateSlug: string;
  preview: PreviewData;
  images: PreviewImages;
};

export default function InviteSnapshotView({
  templateSlug,
  preview,
  images,
}: InviteSnapshotViewProps) {
  const { inviteSnapshot: copy } = useMessages();
  const [lightboxImage, setLightboxImage] = useState<LightboxImage | null>(null);
  const onPreviewImage = useCallback((image: LightboxImage) => {
    setLightboxImage(image);
  }, []);

  const templateMod = useMemo(() => templateModuleMap.get(templateSlug), [templateSlug]);
  const Preview = templateMod?.PreviewComponent;

  return (
    <main className="relative min-h-screen bg-[var(--color-cream)] text-[var(--color-ink)]">
      <header className="sticky top-0 z-[90] border-b border-[var(--color-ink)]/10 bg-[var(--color-cream)]/93 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl flex-col gap-2.5 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <Link
            href="/"
            className="shrink-0 text-sm font-semibold text-[var(--color-rose)] transition hover:opacity-85"
          >
            {copy.homeLink}
          </Link>
          <p className="text-center text-xs leading-relaxed text-[var(--color-ink)]/70 sm:flex-1 sm:text-left sm:text-sm">
            {copy.banner}
          </p>
        </div>
      </header>

      {Preview && templateMod ? (
        <Preview
          template={templateMod.meta}
          preview={preview}
          images={images}
          onPreviewImage={onPreviewImage}
        />
      ) : (
        <div className="mx-auto max-w-lg px-6 py-20 text-center">
          <p className="text-sm text-[var(--color-ink)]/75">{copy.unknownTemplate}</p>
          <Link
            href="/"
            className="btn-primary mt-8 inline-flex rounded-full px-8 py-3 text-sm font-medium"
          >
            {copy.homeLink}
          </Link>
        </div>
      )}

      <SnapshotLightbox
        image={lightboxImage}
        onClose={() => setLightboxImage(null)}
        closeLabel={copy.closeLightbox}
      />
    </main>
  );
}
