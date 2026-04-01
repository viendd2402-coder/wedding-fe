import AzurePromisePreview from "@/components/template-previews/azure-promise-preview";
import { azurePromiseTemplate } from "./meta";
import { azurePromiseGallery } from "./support";

export const azurePromiseModule = {
  meta: azurePromiseTemplate,
  PreviewComponent: AzurePromisePreview,
  defaultGalleryImages: azurePromiseGallery,
};
