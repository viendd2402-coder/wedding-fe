import RusticBreezePreview from "./preview";
import { rusticBreezeMeta } from "./meta";
import { rusticBreezeDefaultGallery } from "./data";
import { type TemplateModule } from "@/templates/template-registry";

export const rusticBreezeModule: TemplateModule = {
  meta: rusticBreezeMeta,
  PreviewComponent: RusticBreezePreview,
  defaultGalleryImages: rusticBreezeDefaultGallery,
};
