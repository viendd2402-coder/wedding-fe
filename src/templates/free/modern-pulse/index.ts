import ModernPulsePreview from "./preview";
import { modernPulseMeta } from "./meta";
import { modernPulseDefaultGallery } from "./data";
import { type TemplateModule } from "@/templates/template-registry";

export const modernPulseModule: TemplateModule = {
  meta: modernPulseMeta,
  PreviewComponent: ModernPulsePreview,
  defaultGalleryImages: modernPulseDefaultGallery,
};
