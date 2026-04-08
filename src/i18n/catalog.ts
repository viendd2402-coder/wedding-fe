import type { AppLanguage } from "@/components/global-preferences-provider";
import { homeEn } from "@/i18n/messages/home.en";
import { homeVi, type HomeMessages } from "@/i18n/messages/home.vi";
import {
  footerMessages,
  type FooterMessages,
} from "@/i18n/messages/footer";
import { navMessages, type NavMessages } from "@/i18n/messages/nav";
import {
  headerAccountMessages,
  type HeaderAccountMessages,
} from "@/i18n/messages/header-account";
import {
  socialCallbackMessages,
  type SocialCallbackMessages,
} from "@/i18n/messages/social-callback";
import {
  homeHeroSpotlightMessages,
  type HomeHeroSpotlightMessages,
} from "@/i18n/messages/home-hero";
import { profileMessages, type ProfileMessages } from "@/i18n/messages/profile";
import {
  templatesGalleryFree,
  templatesGalleryPremium,
  type TemplatesGalleryFreeMessages,
  type TemplatesGalleryPremiumMessages,
} from "@/i18n/messages/templates-gallery";
import { countdownMessages, type CountdownMessages } from "@/i18n/messages/countdown";
import {
  templateWorkspaceMessages,
  type TemplateWorkspaceMessages,
} from "@/i18n/messages/template-workspace-ui";
import {
  myInvitationsMessages,
  type MyInvitationsMessages,
} from "@/i18n/messages/my-invitations";
import {
  inviteSnapshotMessages,
  type InviteSnapshotMessages,
} from "@/i18n/messages/invite-snapshot";

export type Messages = {
  home: HomeMessages;
  footer: FooterMessages;
  nav: NavMessages;
  headerAccount: HeaderAccountMessages;
  socialCallback: SocialCallbackMessages;
  homeHeroSpotlight: HomeHeroSpotlightMessages;
  profile: ProfileMessages;
  templatesFree: TemplatesGalleryFreeMessages;
  templatesPremium: TemplatesGalleryPremiumMessages;
  countdown: CountdownMessages;
  templateWorkspace: TemplateWorkspaceMessages;
  myInvitations: MyInvitationsMessages;
  inviteSnapshot: InviteSnapshotMessages;
};

export const messagesByLocale: Record<AppLanguage, Messages> = {
  vi: {
    home: homeVi,
    footer: footerMessages.vi,
    nav: navMessages.vi,
    headerAccount: headerAccountMessages.vi,
    socialCallback: socialCallbackMessages.vi,
    homeHeroSpotlight: homeHeroSpotlightMessages.vi,
    profile: profileMessages.vi,
    templatesFree: templatesGalleryFree.vi,
    templatesPremium: templatesGalleryPremium.vi,
    countdown: countdownMessages.vi,
    templateWorkspace: templateWorkspaceMessages.vi,
    myInvitations: myInvitationsMessages.vi,
    inviteSnapshot: inviteSnapshotMessages.vi,
  },
  en: {
    home: homeEn,
    footer: footerMessages.en,
    nav: navMessages.en,
    headerAccount: headerAccountMessages.en,
    socialCallback: socialCallbackMessages.en,
    homeHeroSpotlight: homeHeroSpotlightMessages.en,
    profile: profileMessages.en,
    templatesFree: templatesGalleryFree.en,
    templatesPremium: templatesGalleryPremium.en,
    countdown: countdownMessages.en,
    templateWorkspace: templateWorkspaceMessages.en,
    myInvitations: myInvitationsMessages.en,
    inviteSnapshot: inviteSnapshotMessages.en,
  },
};
