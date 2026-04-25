import { santoriniDreamMeta } from "./meta";
import { SantoriniDreamPreview } from "./preview";
import { santoriniDreamGallery } from "./data";
import type { TemplateModule } from "@/templates/template-registry";

const santoriniDreamModule: TemplateModule = {
  meta: santoriniDreamMeta,
  PreviewComponent: SantoriniDreamPreview,
  defaultGalleryImages: [...santoriniDreamGallery],
};

export default santoriniDreamModule;
