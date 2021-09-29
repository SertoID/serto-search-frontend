import { config as sertoUiConfig, SertoUiConfig, mergeServerConfig } from "serto-ui";

const domain = window.location.origin;
let apiUrl = "http://localhost:8000";
if (domain.includes("beta")) {
  apiUrl = "https://beta.api.search.serto.id";
} else if (domain.includes("staging")) {
  apiUrl = "http://staging.api.search.serto.id";
}

const defaultConfig: SertoUiConfig = {
  ...sertoUiConfig,
  SEARCH_API_URL: apiUrl,
};

export const config = mergeServerConfig(defaultConfig);
