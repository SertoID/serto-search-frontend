export const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,63}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/;
export const jwtRegex = /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/;
export const urlRegex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g;

export function getSocialUrl(platform: string, handle: string): string {
  let url = "";

  switch (platform) {
    case "Facebook":
      url = `facebook.com/${handle}`;
      break;
    case "LinkedIn":
      url = `linkedin.com/in/${handle}`;
      break;
    case "Medium":
      url = `${handle}.medium.com`;
      break;
    case "Twitter":
      url = `twitter.com/${handle}`;
      break;
    case "Youtube":
      url = `youtube.com/c/${handle}`;
      break;
  }
  return url;
}
