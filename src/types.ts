export enum SocialMediaPlatform {
  DISCORD = "Discord",
  FACEBOOK = "Facebook",
  INSTAGRAM = "Instagram",
  LINKEDIN = "LinkedIn",
  MEDIUM = "Medium",
  TIKTOK = "TikTok",
  TWITTER = "Twitter",
  YOUTUBE = "Youtube",
}

export interface SocialMediaLinkages {
  did: string;
  linkedId: string;
  platform: string;
  proofUrl: string;
  vc: string;
  vcUrl: string;
  vcUrlShortened: string;
}
