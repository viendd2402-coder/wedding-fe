import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TemplateWorkspace from "@/templates/template-workspace";
import { templateModuleMap, weddingTemplates } from "@/templates/template-registry";

type TemplatePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return weddingTemplates.map((template) => ({
    slug: template.slug,
  }));
}

export async function generateMetadata({
  params,
}: TemplatePageProps): Promise<Metadata> {
  const { slug } = await params;
  const template = weddingTemplates.find((item) => item.slug === slug);

  if (!template) {
    return {
      title: "Không tìm thấy mẫu",
    };
  }

  return {
    title: `Demo ${template.name} | Lumiere Wedding Websites`,
    description: template.description,
  };
}

export default async function TemplateDemoPage({ params }: TemplatePageProps) {
  const { slug } = await params;
  const templateModule = templateModuleMap.get(slug);

  if (!templateModule) {
    notFound();
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
