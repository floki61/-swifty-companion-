export const INTRA_API_CONFIG = {
  CLIENT_ID: "u-s4t2ud-32d0493a98ffbdf528ddb646cf737df859c7c84ef53ff7ee52aa8df4c0b014be",
  CLIENT_SECRET: "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",

  // Mobile configuration
  MOBILE_REDIRECT_URI: "swiftycompanion://(tabs)",
  MOBILE_AUTH_URL:"https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-32d0493a98ffbdf528ddb646cf737df859c7c84ef53ff7ee52aa8df4c0b014be&redirect_uri=swiftycompanion%3A%2F%2F%28tabs%29&response_type=code",

  // Web configuration
  WEB_REDIRECT_URI: "http://localhost:8081/(tabs)",
  WEB_AUTH_URL:"https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-32d0493a98ffbdf528ddb646cf737df859c7c84ef53ff7ee52aa8df4c0b014be&redirect_uri=http%3A%2F%2Flocalhost%3A8081%2F%28tabs%29&response_type=code",

  // API endpoints
  TOKEN_ENDPOINT: "https://api.intra.42.fr/oauth/token",
  API_BASE_URL: "https://api.intra.42.fr/v2",
};
