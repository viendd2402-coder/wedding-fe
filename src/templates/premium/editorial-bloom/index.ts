import EditorialBloomPreview from "@/components/template-previews/editorial-bloom-preview";
import { editorialBloomTemplate } from "./meta";
import { editorialBloomGallery } from "./support";

export const editorialBloomModule = {
  meta: editorialBloomTemplate,
  PreviewComponent: EditorialBloomPreview,
  defaultGalleryImages: editorialBloomGallery,
};
