import HeritageVowsPreview from "@/components/template-previews/heritage-vows-preview";
import { heritageVowsTemplate } from "./meta";
import { heritageVowsGallery } from "./support";

export const heritageVowsModule = {
  meta: heritageVowsTemplate,
  PreviewComponent: HeritageVowsPreview,
  defaultGalleryImages: heritageVowsGallery,
};
