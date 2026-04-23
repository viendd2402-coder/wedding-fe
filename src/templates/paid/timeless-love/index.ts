import { TemplateModule } from "@/templates/template-registry";
import { timelessLoveMeta, defaultGalleryImages } from "./data";
import { TimelessLovePreview } from "./preview";

export const timelessLoveModule: TemplateModule = {
  meta: timelessLoveMeta,
  PreviewComponent: TimelessLovePreview,
  defaultGalleryImages,
};
