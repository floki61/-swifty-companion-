import AsyncStorage from "@react-native-async-storage/async-storage";
import * as WebBrowser from "expo-web-browser";
import { INTRA_API_CONFIG } from "../config/api";

// Storage keys
const ACCESS_TOKEN_KEY = "intra_access_token";
const TOKEN_EXPIRY_KEY = "intra_token_expiry";

// Register for redirect handling
WebBrowser.maybeCompleteAuthSession();

//login
export const login = async () => {
  try {
    const result = await WebBrowser.openAuthSessionAsync(INTRA_API_CONFIG.AUTH_URL, INTRA_API_CONFIG.REDIRECT_URI);

    if (result.type === "success") {
      const { url } = result;
      const code = url.split("code=")[1]?.split("&")[0];

      if (code) {
        // Exchange code for token
        const tokenData = await getTokenFromCode(code);
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
const getTokenFromCode = async (code: string) => {
  try {
    const tokenRequestBody = {
      grant_type: "authorization_code",
      client_id: INTRA_API_CONFIG.CLIENT_ID,
      client_secret: INTRA_API_CONFIG.CLIENT_SECRET,
      code,
      redirect_uri: INTRA_API_CONFIG.REDIRECT_URI,
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
      const expiryTime = Date.now() + (data.expires_in || 7200) * 1000;
      await AsyncStorage.setItem(TOKEN_EXPIRY_KEY, expiryTime.toString());
      return {
        success: true,
        accessToken: data.access_token,
      };
    }
    return {
      success: false,
      error: "Failed to get access token",
    };
  } catch (error) {
    console.error("🔑 [TOKEN] Error getting token:", error);
    return {
      success: false,
      error: "Error during token exchange",
    };
  }
};

//check if user is logged in
export const isLoggedIn = async () => {
  try {
    const token = await AsyncStorage.getItem(ACCESS_TOKEN_KEY);
    const expiryTime = await AsyncStorage.getItem(TOKEN_EXPIRY_KEY);

    if (!token || !expiryTime) {
      console.log("👤 [AUTH] User not logged in: No token found");
      return false;
    }

    // Check if token is expired
    const isValid = Date.now() < parseInt(expiryTime, 10);
    if (!isValid) {
      console.log("👤 [AUTH] Token expired at:", new Date(parseInt(expiryTime, 10)).toLocaleString());
    }
    return isValid;
  } catch (error) {
    console.error("👤 [AUTH] Error checking login status:", error);
    return false;
  }
};

//logout
export const logout = async () => {
  try {
    await AsyncStorage.multiRemove([ACCESS_TOKEN_KEY, TOKEN_EXPIRY_KEY]);
    return true;
  } catch (error) {
    console.error("👋 [AUTH] Error logging out:", error);
    return false;
  }
};
