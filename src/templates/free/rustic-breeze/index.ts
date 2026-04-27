import RusticBreezePreview from "./preview";
import { rusticBreezeMeta } from "./meta";
import { rusticBreezeDefaultGallery } from "./data";
import { type TemplateModule } from "@/lib/templates/types";

export const rusticBreezeModule: TemplateModule = {
  meta: rusticBreezeMeta,
  PreviewComponent: RusticBreezePreview,
  defaultGalleryImages: rusticBreezeDefaultGallery,
};
