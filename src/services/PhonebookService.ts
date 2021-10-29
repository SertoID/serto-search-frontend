import { config } from "../config";

export class PhonebookService {
  public url = config.SEARCH_API_URL;

  public async registerDomain(domain: string): Promise<any> {
    return this.request("/v1/register", "POST", { domain });
  }

  public async registerSocial(url: string): Promise<any> {
    return this.request("/v1/add-social-media-linkage", "POST", { url });
  }

  public async processVc(raw: string): Promise<any> {
    return this.request("/v1/process-vc", "POST", { raw });
  }

  public async getEntries(vars: any): Promise<any> {
    const { filter, page } = vars;
    return this.request("/v1/search", "POST", { domain: filter, page });
  }

  public async getDomainListing(domain: string): Promise<any> {
    return this.request("/v1/domain-listing", "POST", { domain });
  }

  public async getSocialListing(platform: string, handle: string): Promise<any> {
    return this.request("/v1/social-listing", "POST", { platform, handle });
  }

  public async getDidListings(dids: string[]): Promise<any> {
    return this.request("/v1/did-listings", "POST", { dids });
  }

  public async getNftData(contractAddress: string, tokenId: string): Promise<any> {
    return this.request("/v1/eth-nft-creator", "POST", { contractAddress, tokenId });
  }

  private async request(path: string, method: "GET" | "DELETE" | "POST" = "GET", body?: any): Promise<any> {
    const headers: any = {};
    if (body) {
      headers["Content-Type"] = "application/json";
    }
    const response = await fetch(`${this.url}${path}`, {
      method,
      headers,
      body: JSON.stringify(body),
    });
    const responseIsJson = response.headers.get("content-type")?.indexOf("application/json") === 0;

    if (!response.ok) {
      let errorMessage;
      if (responseIsJson) {
        const errorJson = await response.json();
        if (errorJson?.error?.message) {
          errorMessage = errorJson.error.message;
          if (errorJson.error.code) {
            errorMessage += ` (${errorJson.error.code})`;
          }
        } else {
          errorMessage = JSON.stringify(errorJson);
        }
      } else {
        errorMessage = await response.text();
      }
      console.error("API error", response.status, errorMessage);
      throw new Error("API error: " + errorMessage);
    }

    if (responseIsJson) {
      try {
        return await response.json();
      } catch (err) {
        if (response.headers.get("content-length") === "0") {
          throw new Error('API error: API returned invalid JSON: ""');
        }
        throw err;
      }
    } else {
      return await response.text();
    }
  }
}
