import { retroSoulMeta } from "./meta";
import { RetroSoulPreview } from "./preview";
import { retroSoulGallery } from "./data";
import type { TemplateModule } from "@/templates/template-registry";

const retroSoulModule: TemplateModule = {
  meta: retroSoulMeta,
  PreviewComponent: RetroSoulPreview,
  defaultGalleryImages: [...retroSoulGallery],
};

export default retroSoulModule;
