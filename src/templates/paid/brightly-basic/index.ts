import BrightlyBasicPreview from "./preview";
import { brightlyBasicTemplate } from "./meta";
import { brightlyBasicGallery } from "./data";

export const brightlyBasicModule = {
  meta: brightlyBasicTemplate,
  PreviewComponent: BrightlyBasicPreview,
  defaultGalleryImages: brightlyBasicGallery,
};
