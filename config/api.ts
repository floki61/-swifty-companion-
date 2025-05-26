export const INTRA_API_CONFIG = {
  CLIENT_ID: process.env.EXPO_PUBLIC_CLIENT_ID,
  CLIENT_SECRET: process.env.EXPO_PUBLIC_CLIENT_SECRET,

  // Mobile configuration
  MOBILE_REDIRECT_URI: "swiftycompanion://(tabs)",
  MOBILE_AUTH_URL: process.env.EXPO_PUBLIC_MOBILE_AUTH_URL,

  // Web configuration
  WEB_REDIRECT_URI: process.env.EXPO_PUBLIC_WEB_REDIRECT_URI,
  WEB_AUTH_URL: process.env.EXPO_PUBLIC_WEB_AUTH_URL,

  // API endpoints
  TOKEN_ENDPOINT: process.env.EXPO_PUBLIC_TOKEN_ENDPOINT,
  API_BASE_URL: process.env.EXPO_PUBLIC_API_BASE_URL,
};
