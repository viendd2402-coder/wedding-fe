import type { TemplateModule } from "../../template-registry";
import { defaultGalleryImages, meta } from "./data";
import { RadiantBloomPreview } from "./preview";

export const radiantBloomModule: TemplateModule = {
  meta,
  PreviewComponent: RadiantBloomPreview,
  defaultGalleryImages,
};
