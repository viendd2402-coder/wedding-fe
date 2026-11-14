import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import TemplateWorkspace from "@/templates/template-workspace";
import { templateModuleMap, weddingTemplates } from "@/templates/template-registry";
import {
  getTemplateDisplayName,
  getTemplateHref,
  getTemplatePublicSlug,
  resolveTemplateSlug,
} from "@/lib/templates/display-name";

type TemplatePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

/** URL công khai: /templates/mau-premium-so-01. Slug cũ (vd. /templates/soft-serenity) vẫn vào được và được chuyển hướng. */
export async function generateStaticParams() {
  return weddingTemplates.map((template) => ({
    slug: getTemplatePublicSlug(template),
  }));
}

export async function generateMetadata({
  params,
}: TemplatePageProps): Promise<Metadata> {
  const { slug } = await params;
  const resolved = resolveTemplateSlug(slug);
  const template = resolved ? templateModuleMap.get(resolved.slug)?.meta : undefined;

  if (!template) {
    return {
      title: "Không tìm thấy mẫu",
    };
  }

  return {
    title: `Demo ${getTemplateDisplayName(template)} | Lumiere Wedding Websites`,
    description: `Xem và chỉnh thử ${getTemplateDisplayName(template)} trên Lumiere Wedding Websites.`,
    alternates: { canonical: getTemplateHref(template) },
  };
}

export default async function TemplateDemoPage({ params }: TemplatePageProps) {
  const { slug } = await params;
  const resolved = resolveTemplateSlug(slug);
  const templateModule = resolved ? templateModuleMap.get(resolved.slug) : undefined;

  if (!templateModule) {
    notFound();
  }

  if (resolved?.legacy) {
    permanentRedirect(getTemplateHref(templateModule.meta));
  }

  return (
    <main className="min-h-screen bg-[var(--color-cream)] text-[var(--color-ink)]">
      <TemplateWorkspace
        template={templateModule.meta}
        PreviewComponent={templateModule.PreviewComponent}
        defaultGalleryImages={templateModule.defaultGalleryImages}
      />
    </main>
  );
}
