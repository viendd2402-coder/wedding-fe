import { softSerenityMeta } from "./meta";
import { SoftSerenityPreview } from "./preview";
import { softSerenityGallery } from "./data";
import type { TemplateModule } from "@/templates/template-registry";

export const softSerenityModule: TemplateModule = {
  meta: softSerenityMeta,
  PreviewComponent: SoftSerenityPreview,
  defaultGalleryImages: [...softSerenityGallery],
};
