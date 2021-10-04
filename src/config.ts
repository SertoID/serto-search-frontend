import { DEV_ENV, config as sertoUiConfig, SertoUiConfig, mergeServerConfig } from "serto-ui";

const domain = window.location.origin;
let apiUrl = "https://beta.api.search.serto.id";
if (domain.includes("staging")) {
  apiUrl = "http://staging.api.search.serto.id";
} else if (sertoUiConfig.ENVIRONMENT === DEV_ENV || domain.includes("localhost")) {
  apiUrl = "http://localhost:8000";
}

const defaultConfig: SertoUiConfig = {
  ...sertoUiConfig,
  SEARCH_API_URL: apiUrl,
};

export const config = mergeServerConfig(defaultConfig);
