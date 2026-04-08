import type { Metadata } from "next";
import { notFound } from "next/navigation";
import InviteSnapshotView from "@/components/invite-snapshot-view";
import {
  getInviteSnapshot,
  INVITE_PUBLIC_CODES,
} from "@/lib/invite-snapshot-data";
import { inviteSnapshotMessages } from "@/i18n/messages/invite-snapshot";

/**
 * Public wedding invite preview — no auth. Anyone with the link can open it.
 * Uniqueness is the `code` segment (server-issued in production), not the couple’s names.
 */
type PageProps = {
  params: Promise<{ code: string }>;
};

export function generateStaticParams() {
  return INVITE_PUBLIC_CODES.map((code) => ({ code }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { code } = await params;
  const snap = getInviteSnapshot(code);
  const suffixVi = inviteSnapshotMessages.vi.pageTitleSuffix;
  if (!snap) {
    return { title: suffixVi };
  }
  const { groom, bride } = snap.preview;
  return {
    title: `${groom} & ${bride} · ${suffixVi}`,
    description: inviteSnapshotMessages.vi.banner,
  };
}

export default async function PublicInvitePage({ params }: PageProps) {
  const { code } = await params;
  const data = getInviteSnapshot(code);
  if (!data) {
    notFound();
  }

  return (
    <InviteSnapshotView
      templateSlug={data.templateSlug}
      preview={data.preview}
      images={data.images}
    />
  );
}
