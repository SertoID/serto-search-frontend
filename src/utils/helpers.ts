import { SocialMediaPlatform } from "../types";

export const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,63}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/;
export const jwtRegex = /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/;
export const urlRegex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g;

export function getSocialUrl(platform: string, handle: string): string {
  let url = "";

  switch (platform) {
    case SocialMediaPlatform.FACEBOOK:
      url = `facebook.com/${handle}`;
      break;
    case SocialMediaPlatform.INSTAGRAM:
      url = `instagram.com/${handle}`;
      break;
    case SocialMediaPlatform.LINKEDIN:
      url = `linkedin.com/in/${handle}`;
      break;
    case SocialMediaPlatform.MEDIUM:
      url = `${handle}.medium.com`;
      break;
    case SocialMediaPlatform.TIKTOK:
      url = `tiktok.com/@${handle}`;
      break;
    case SocialMediaPlatform.TWITTER:
      url = `twitter.com/${handle}`;
      break;
    case SocialMediaPlatform.YOUTUBE:
      url = `youtube.com/user/${handle}`;
      break;
  }
  return url;
}

export function getFormattedPlatform(platform: string): string {
  let formattedPlatform = platform.toLowerCase();

  switch (formattedPlatform) {
    case "facebook":
      formattedPlatform = SocialMediaPlatform.FACEBOOK;
      break;
    case "instagram":
      formattedPlatform = SocialMediaPlatform.INSTAGRAM;
      break;
    case "linkedin":
      formattedPlatform = SocialMediaPlatform.LINKEDIN;
      break;
    case "medium":
      formattedPlatform = SocialMediaPlatform.MEDIUM;
      break;
    case "tiktok":
      formattedPlatform = SocialMediaPlatform.TIKTOK;
      break;
    case "twitter":
      formattedPlatform = SocialMediaPlatform.TWITTER;
      break;
    case "youtube":
      formattedPlatform = SocialMediaPlatform.YOUTUBE;
      break;
  }
  return formattedPlatform;
}
