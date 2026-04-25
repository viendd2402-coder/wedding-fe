import { midnightBloomMeta } from "./meta";
import { MidnightBloomPreview } from "./preview";
import { midnightBloomGallery } from "./data";
import type { TemplateModule } from "@/templates/template-registry";

const midnightBloomModule: TemplateModule = {
  meta: midnightBloomMeta,
  PreviewComponent: MidnightBloomPreview,
  defaultGalleryImages: [...midnightBloomGallery],
};

export default midnightBloomModule;
