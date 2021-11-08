export enum routes {
  DOMAIN_PAGE = "/domain/:domain",
  HOMEPAGE = "/",
  HOW_IT_WORKS = "/how-it-works",
  PRE_REGISTRATION = "/pre-registration",
  REGISTER_DOMAIN = "/register-domain",
  REGISTER_SOCIAL = "/register-social",
  SEARCH = "/search",
  SOCIAL_PAGE = "/social/:platform/:handle",
  NFT_SERACH = "/nft-search",
  VC_EMBED = "/vc-embed",
  VC_VALIDATOR = "/vc-validator",
  ADD_ORG_PROFILE = "/add-org-profile/:domain?",
}

export const links = {
  BLOG: "https://serto.medium.com/",
  FEEDBACK: "https://forms.gle/Kgw6bUGASZCp1GG26",
  PRIVACY: "https://consensys.net/privacy-policy/",
  SERTO: "https://serto.id",
  SUPPORT_EMAIL: "support@serto.id",
  TERMS: "https://consensys.net/terms-of-use/",
  TWITTER: "https://twitter.com/serto_id",
};

export enum SocialMediaPlatform {
  TWITTER = "Twitter", // https://twitter.com/(\w+)                https://twitter.com/<profile>/status/<post-id>
  LINKEDIN = "LinkedIn", // https://www.linkedin.com/in/(\w+)/     https://www.linkedin.com/company/sertoidentity    https://www.linkedin.com/posts/<profile>_<post-slug>-activity-<post id>-cpz1/
  FACEBOOK = "Facebook", // https://web.facebook.com/(\w+)/          https://<subdomain>.facebook.com/<profile>/posts/<post-id>
  TIKTOK = "TikTok", // https://www.tiktok.com/@(\w+)            https://www.tiktok.com/@<profile>/video/<post-id>
  INSTAGRAM = "Instagram", // https://www.instagram.com/(\w+)/         https://www.instagram.com/p/<post id>/   !!!! profile not in the URL !!!!
  YOUTUBE = "Youtube", // https://www.youtube.com/user/(\w+)       https://youtu.be/<post id>   !!!! profile not in the URL !!!!
  DISCORD = "Discord", // https://discord.com/api/v9/guilds/363985050578190336/preview return a json with details look VC URL in the description field
  MEDIUM = "Medium", // https://(\w+).medium.com/(.+)
  DOMAIN = "Domain",
}
