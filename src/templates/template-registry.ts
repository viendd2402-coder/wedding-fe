import type { ComponentType } from "react";
import type { WeddingTemplate } from "@/lib/templates/types";
import type { TemplatePreviewProps } from "@/templates/preview-types";
import { brightlyBasicModule } from "@/templates/paid/brightly-basic";
import { slideFlexModule } from "@/templates/paid/slide-flex";
import { gentleDriftModule } from "@/templates/paid/gentle-drift";

export type TemplateModule = {
  meta: WeddingTemplate;
  PreviewComponent: ComponentType<TemplatePreviewProps>;
  defaultGalleryImages: string[];
};

export const templateModules: TemplateModule[] = [
  gentleDriftModule,
  brightlyBasicModule,
  slideFlexModule,
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
