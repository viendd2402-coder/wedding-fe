import type { Metadata } from "next";
import { notFound } from "next/navigation";
import InviteSnapshotView from "@/components/invite-snapshot-view";
import { loadPublicInvitePageData } from "@/lib/public-invite";
import { inviteSnapshotMessages } from "@/i18n/messages/invite-snapshot";

/**
 * Public wedding invite preview — no auth. Anyone with the link can open it.
 * Uniqueness is the `code` segment (server-issued), not the couple’s names.
 */
type PageProps = {
  params: Promise<{ code: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { code } = await params;
  const result = await loadPublicInvitePageData(code);
  const suffixVi = inviteSnapshotMessages.vi.pageTitleSuffix;
  if (result.kind !== "ok") {
    return { title: suffixVi };
  }
  const { groom, bride } = result.parsed.snapshot.preview;
  return {
    title: `${groom} & ${bride} · ${suffixVi}`,
    description: inviteSnapshotMessages.vi.banner,
  };
}

export default async function PublicInvitePage({ params }: PageProps) {
  const { code } = await params;
  const result = await loadPublicInvitePageData(code);

  if (result.kind === "not_found" || result.kind === "bad_body") {
    notFound();
  }
  if (result.kind === "no_api") {
    throw new Error("NEXT_PUBLIC_API_URL is not configured");
  }
  if (result.kind === "network" || result.kind === "upstream") {
    notFound();
  }

  const { snapshot, personalization } = result.parsed;

  return (
    <InviteSnapshotView
      templateSlug={snapshot.templateSlug}
      preview={snapshot.preview}
      images={snapshot.images}
      personalization={personalization}
    />
  );
}
