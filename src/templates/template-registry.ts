import type { ComponentType } from "react";
import type { WeddingTemplate } from "@/lib/templates/types";
import type { TemplatePreviewProps } from "@/templates/preview-types";
import { brightlyBasicModule } from "@/templates/paid/brightly-basic";
import { slideFlexModule } from "@/templates/paid/slide-flex";
import { gentleDriftModule } from "@/templates/paid/gentle-drift";
import { timelessLoveModule } from "@/templates/paid/timeless-love";
import { radiantBloomModule } from "@/templates/paid/radiant-bloom";
import { etherealWhisperModule } from "@/templates/paid/ethereal-whisper";
import { softSerenityModule } from "@/templates/paid/soft-serenity";
import midnightBloomModule from "@/templates/paid/midnight-bloom";
import retroSoulModule from "@/templates/paid/retro-soul";
import santoriniDreamModule from "@/templates/paid/santorini-dream";
import { gentleHarmonyModule } from "./free/gentle-harmony";
import { rusticBreezeModule } from "./free/rustic-breeze";
import { modernPulseModule } from "./free/modern-pulse";
import { noirEditorialModule } from "./free/noir-editorial";
import { sereneCanvasModule } from "./free/serene-canvas";


export type TemplateModule = {
  meta: WeddingTemplate;
  PreviewComponent: ComponentType<TemplatePreviewProps>;
  defaultGalleryImages: string[];
};

export const templateModules: TemplateModule[] = [
  softSerenityModule,
  gentleDriftModule,
  brightlyBasicModule,
  slideFlexModule,
  timelessLoveModule,
  radiantBloomModule,
  etherealWhisperModule,
  midnightBloomModule,
  retroSoulModule,
  santoriniDreamModule,
  gentleHarmonyModule,
  rusticBreezeModule,
  modernPulseModule,
  noirEditorialModule,
  sereneCanvasModule,
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
