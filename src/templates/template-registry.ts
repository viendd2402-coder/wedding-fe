import type { ComponentType } from "react";
import type { WeddingTemplate } from "@/lib/templates/types";
import type { TemplatePreviewProps } from "@/templates/preview-types";
import { minimalMuseModule } from "@/templates/free/minimal-muse";
import { azurePromiseModule } from "@/templates/free/azure-promise";
import { brightlyBasicModule } from "@/templates/free/brightly-basic";
import { slideFlexModule } from "@/templates/free/slide-flex";
import { editorialBloomModule } from "@/templates/premium/editorial-bloom";
import { heritageVowsModule } from "@/templates/premium/heritage-vows";

export type TemplateModule = {
  meta: WeddingTemplate;
  PreviewComponent: ComponentType<TemplatePreviewProps>;
  defaultGalleryImages: string[];
};

export const templateModules: TemplateModule[] = [
  minimalMuseModule,
  azurePromiseModule,
  brightlyBasicModule,
  slideFlexModule,
  editorialBloomModule,
  heritageVowsModule,
];

export const weddingTemplates = templateModules.map((module) => module.meta);
export const freeTemplates = weddingTemplates.filter(
  (template) => template.tier === "Miễn phí",
);
export const premiumTemplates = weddingTemplates.filter(
  (template) => template.tier === "Trả phí",
);

export const templateModuleMap = new Map(
  templateModules.map((module) => [module.meta.slug, module]),
);
