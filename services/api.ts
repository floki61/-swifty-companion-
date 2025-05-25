import { INTRA_API_CONFIG } from "@/config/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Storage key for access token
const ACCESS_TOKEN_KEY = "intra_access_token";

// Base URL for API requests
const BASE_URL = INTRA_API_CONFIG.API_BASE_URL;

/**
 * Get the current user's profile
 */
export const getUserProfile = async () => {
  try {
    const response = await apiRequest("/me");
    return {
      success: true,
      data: response,
    };
  } catch (error) {
    console.error("📊 [API] Error fetching user profile:", error);
    return {
      success: false,
      error: "Failed to fetch user profile",
    };
  }
};

/**
 * Get a user's profile by their login
 */
export const getUserByLogin = async (login: string) => {
  try {
    const response = await apiRequest(`/users/${login}`);
    return {
      success: true,
      data: response,
    };
  } catch (error) {
    console.error(`📊 [API] Error fetching user ${login}:`, error);
    return {
      success: false,
      error: `Failed to fetch user ${login}`,
    };
  }
};

/**
 * Get a user's coalition information
 */
export const getUserCoalition = async (userId: number) => {
  try {
    const response = await apiRequest(`/users/${userId}/coalitions`);
    return {
      success: true,
      data: response,
    };
  } catch (error) {
    console.error(`📊 [API] Error fetching coalitions for user ${userId}:`, error);
    return {
      success: false,
      error: "Failed to fetch coalition information",
    };
  }
};

/**
 * Get a user's projects
 */
export const getUserProjects = async (userId: number) => {
  try {
    const response = await apiRequest(`/users/${userId}/projects_users`);
    return {
      success: true,
      data: response,
    };
  } catch (error) {
    console.error(`📊 [API] Error fetching projects for user ${userId}:`, error);
    return {
      success: false,
      error: "Failed to fetch projects",
    };
  }
};

/**
 * Make an authenticated request to the API
 */
const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const token = await AsyncStorage.getItem(ACCESS_TOKEN_KEY);

  if (!token) {
    console.error("🔌 [API] No access token available");
    throw new Error("No access token available");
  }

  const url = `${BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error("🔌 [API] API error:", response.status, errorData);
    throw new Error(`API request failed: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data;
};
