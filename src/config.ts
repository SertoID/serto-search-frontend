export interface ConfigType {
  ENVIRONMENT: string;
  API_URL: string;
}

const defaultConfig: ConfigType = {
  ENVIRONMENT: process.env.NODE_ENV || "development",
  // API_URL: "https://consensys-id-phonebook.herokuapp.com",
  API_URL: "http://localhost:8000",
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
