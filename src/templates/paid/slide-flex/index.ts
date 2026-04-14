import SlideFlexPreview from "./preview";
import { slideFlexTemplate } from "./meta";
import { slideFlexGallery } from "./data";

export const slideFlexModule = {
  meta: slideFlexTemplate,
  PreviewComponent: SlideFlexPreview,
  defaultGalleryImages: slideFlexGallery,
};
