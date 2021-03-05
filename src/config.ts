export interface ConfigType {
  ENVIRONMENT: string;
  API_URL: string;
}

const domain = window.location.origin;
let apiUrl = "http://localhost:8000";
if (domain.includes("beta")) {
  apiUrl = "https://beta.api.search.serto.id";
} else if (domain.includes("staging")) {
  apiUrl = "http://staging.api.search.serto.id";
}

const defaultConfig: ConfigType = {
  ENVIRONMENT: process.env.NODE_ENV || "development",
  API_URL: apiUrl,
};

const serverConfigString = (window as any).SERVER_CONFIG;
let serverConfig: ConfigType | undefined;
if (serverConfigString && serverConfigString !== "$ENVIRONMENT") {
  try {
    serverConfig = JSON.parse(serverConfigString);
  } catch (e) {
    console.error("error parsing server config: ", { serverConfigString, defaultConfig, e });
  }
}

const config: ConfigType = { ...defaultConfig, ...serverConfig };
console.log("configuration loaded", { config, defaultConfig, serverConfig });

export { config };
