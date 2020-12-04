import { config } from "../config";

export class PhonebookService {
  public url = config.API_URL;

  public async addDomain(domain: string): Promise<any> {
    return this.request("/v1/tenant", "POST", { domain });
  }

  public async getIdentifiers(): Promise<any> {
    return this.request("/v1/tenant/agent/dataStoreORMGetVerifiableCredentials", "POST");
  }

  private async request(path: string, method: "GET" | "DELETE" | "POST" = "GET", body?: any): Promise<any> {
    const response = await fetch(`${this.url}${path}`, {
      method,
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
