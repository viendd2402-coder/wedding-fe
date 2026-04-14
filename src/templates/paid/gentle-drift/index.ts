import GentleDriftPreview from "./preview";
import { gentleDriftGallery } from "./data";
import { gentleDriftTemplate } from "./meta";

export const gentleDriftModule = {
  meta: gentleDriftTemplate,
  PreviewComponent: GentleDriftPreview,
  defaultGalleryImages: [...gentleDriftGallery],
};
