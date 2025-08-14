import AsyncStorage from "@react-native-async-storage/async-storage";
import * as WebBrowser from "expo-web-browser";
import { Platform } from "react-native";
import { INTRA_API_CONFIG } from "../config/api";

// Storage keys
const ACCESS_TOKEN_KEY = "intra_access_token";
const REFRESH_TOKEN_KEY = "intra_refresh_token";
const TOKEN_EXPIRY_KEY = "intra_token_expiry";

// Register for redirect handling
WebBrowser.maybeCompleteAuthSession();

/**
 * Check if token has valid format and is not expired
 */
const isTokenValid = (token: string, expiryTime?: string) => {
  // First check expiry if provided
  if (expiryTime) {
    const isNotExpired = Date.now() < parseInt(expiryTime, 10);
    if (!isNotExpired) {
      console.log("🔍 [TOKEN] Token expired at:", new Date(parseInt(expiryTime, 10)).toLocaleString());
      return false;
    }
    console.log("🔍 [TOKEN] Token not expired, checking format...");
  }

  // Then check format validation for 42 API tokens
  if (!token || token.length !== 64) {
    console.log("🔍 [TOKEN] Token is invalid format - expected 64 character hex string");
    return false;
  }

  // Check if it's a valid hex string
  const hexPattern = /^[a-f0-9]{64}$/i;
  if (!hexPattern.test(token)) {
    console.log("🔍 [TOKEN] Token is not a valid hex string");
    return false;
  }

  console.log("🔍 [TOKEN] Token is valid and not expired");
  return true;
};

//login
export const login = async () => {
  try {
    const isWeb = Platform.OS === "web";
    const authUrl = isWeb ? INTRA_API_CONFIG.WEB_AUTH_URL : INTRA_API_CONFIG.MOBILE_AUTH_URL;
    const redirectUri = isWeb ? INTRA_API_CONFIG.WEB_REDIRECT_URI : INTRA_API_CONFIG.MOBILE_REDIRECT_URI;

    if (!authUrl || !redirectUri) {
      console.error("🔐 [AUTH] Missing auth URL or redirect URI configuration");
      return { success: false, error: "Missing authentication configuration" };
    }

    const result = await WebBrowser.openAuthSessionAsync(authUrl, redirectUri, {
      // Force a fresh browser session
      preferEphemeralSession: true,
    });

    if (result.type === "success") {
      const { url } = result;
      const code = url.split("code=")[1]?.split("&")[0];

      if (code) {
        // Exchange code for token, passing the platform-specific redirect URI
        const tokenData = await getTokenFromCode(code, redirectUri);
        return tokenData;
      } else {
        console.log("🔐 [AUTH] No code found in redirect URL");
      }
    } else {
      console.log("🔐 [AUTH] Browser session was not successful");
    }
    return { success: false, error: "Authorization cancelled or failed" };
  } catch (error) {
    console.error("🔐 [AUTH] Login error:", error);
    return { success: false, error: "An error occurred during login" };
  }
};

//get token from code
const getTokenFromCode = async (code: string, redirectUri: string) => {
  try {
    if (!INTRA_API_CONFIG.TOKEN_ENDPOINT || !INTRA_API_CONFIG.CLIENT_ID || !INTRA_API_CONFIG.CLIENT_SECRET) {
      console.error("🔑 [TOKEN] Missing required API configuration");
      return {
        success: false,
        error: "Missing API configuration",
      };
    }

    const tokenRequestBody = {
      grant_type: "authorization_code",
      client_id: INTRA_API_CONFIG.CLIENT_ID,
      client_secret: INTRA_API_CONFIG.CLIENT_SECRET,
      code,
      redirect_uri: redirectUri,
    };

    const response = await fetch(INTRA_API_CONFIG.TOKEN_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tokenRequestBody),
    });

    const data = await response.json();

    if (data.access_token) {
      await AsyncStorage.setItem(ACCESS_TOKEN_KEY, data.access_token);

      // Store refresh token if provided
      if (data.refresh_token) {
        await AsyncStorage.setItem(REFRESH_TOKEN_KEY, data.refresh_token);
      }

      // Store token expiry time if provided
      if (data.expires_in) {
        const expiryTime = new Date().getTime() + data.expires_in * 1000;
        await AsyncStorage.setItem(TOKEN_EXPIRY_KEY, expiryTime.toString());
      }

      return {
        success: true,
        accessToken: data.access_token,
      };
    }
    return {
      success: false,
      error: data.error_description || data.error || "Failed to get access token",
    };
  } catch (error) {
    console.error("🔑 [TOKEN] Error getting token:", error);
    return {
      success: false,
      error: "Error during token exchange",
    };
  }
};

//refresh access token using refresh token
const refreshAccessToken = async () => {
  try {
    const refreshToken = await AsyncStorage.getItem(REFRESH_TOKEN_KEY);

    if (!refreshToken) {
      console.log("🔄 [TOKEN] No refresh token available");
      return { success: false, error: "No refresh token available" };
    }

    if (!INTRA_API_CONFIG.TOKEN_ENDPOINT || !INTRA_API_CONFIG.CLIENT_ID || !INTRA_API_CONFIG.CLIENT_SECRET) {
      console.error("🔄 [TOKEN] Missing required API configuration");
      return { success: false, error: "Missing API configuration" };
    }

    const tokenRequestBody = {
      grant_type: "refresh_token",
      client_id: INTRA_API_CONFIG.CLIENT_ID,
      client_secret: INTRA_API_CONFIG.CLIENT_SECRET,
      refresh_token: refreshToken,
    };

    const response = await fetch(INTRA_API_CONFIG.TOKEN_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tokenRequestBody),
    });

    const data = await response.json();

    if (data.access_token) {
      console.log("🔄 [TOKEN] Successfully refreshed access token");
      await AsyncStorage.setItem(ACCESS_TOKEN_KEY, data.access_token);

      // Update refresh token if provided
      if (data.refresh_token) {
        await AsyncStorage.setItem(REFRESH_TOKEN_KEY, data.refresh_token);
      }

      // Update token expiry time if provided
      if (data.expires_in) {
        const expiryTime = new Date().getTime() + data.expires_in * 1000;
        await AsyncStorage.setItem(TOKEN_EXPIRY_KEY, expiryTime.toString());
      }

      return { success: true };
    } else {
      console.log("🔄 [TOKEN] Failed to refresh token:", data);
      return { success: false, error: data.error_description || data.error || "Failed to refresh token" };
    }
  } catch (error) {
    console.error("🔄 [TOKEN] Error refreshing token:", error);
    return { success: false, error: "Error during token refresh" };
  }
};

//check if user is logged in
export const isLoggedIn = async () => {
  try {
    const accessToken = await AsyncStorage.getItem(ACCESS_TOKEN_KEY);
    const expiryTime = await AsyncStorage.getItem(TOKEN_EXPIRY_KEY);
    const refreshToken = await AsyncStorage.getItem(REFRESH_TOKEN_KEY);

    if (accessToken) {
      if (isTokenValid(accessToken, expiryTime || undefined)) {
        console.log("👤 [AUTH] Access token is valid and not expired, user is logged in");
        return true;
      } else {
        console.log("👤 [AUTH] Access token is expired or invalid");
      }
    } else {
      console.log("👤 [AUTH] No access token found");
    }

    // Step 2: Access token not found, expired, or invalid - try refresh token
    if (refreshToken) {
      console.log("👤 [AUTH] Attempting to refresh token...");
      const refreshResult = await refreshAccessToken();
      if (refreshResult.success) {
        console.log("👤 [AUTH] Token refreshed successfully, user is logged in");
        return true;
      } else {
        console.log("👤 [AUTH] Token refresh failed");
      }
    } else {
      console.log("👤 [AUTH] No refresh token available");
    }

    // Step 3: No valid tokens available, logout and return false
    console.log("👤 [AUTH] No valid tokens found, logging out user");
    await logout();
    return false;
  } catch (error) {
    console.error("👤 [AUTH] Error checking login status:", error);
    return false;
  }
};

//logout
export const logout = async () => {
  try {
    await AsyncStorage.multiRemove([ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, TOKEN_EXPIRY_KEY]);
    return true;
  } catch (error) {
    console.error("👋 [AUTH] Error logging out:", error);
    return false;
  }
};
