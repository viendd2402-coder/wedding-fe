import MinimalMusePreview from "@/components/template-previews/minimal-muse-preview";
import { minimalMuseTemplate } from "./meta";
import { minimalMuseGallery } from "./support";

export const minimalMuseModule = {
  meta: minimalMuseTemplate,
  PreviewComponent: MinimalMusePreview,
  defaultGalleryImages: minimalMuseGallery,
};
