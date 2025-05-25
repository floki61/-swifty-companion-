import { getUserProfile } from "@/services/api";
import { isLoggedIn, logout } from "@/utils/auth";
import { router } from "expo-router";
import { useEffect, useState } from "react";

interface UserData {
  id: number;
  login: string;
  email: string;
  first_name: string;
  last_name: string;
  image_url: string;
  location: string | null;
  correction_point: number;
  wallet: number;
  [key: string]: any;
}

export function useUserProfile() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchUserData = async () => {
    try {
      setError(null);

      const loggedIn = await isLoggedIn();
      if (!loggedIn) {
        router.replace("/login");
        return;
      }

      const result = await getUserProfile();

      if (result.success && result.data) {
        setUserData(result.data);
      } else {
        setError(result.error || "Failed to load profile");
      }
    } catch (err) {
      setError("An error occurred while fetching data");
      console.error("Profile fetch error:", err);
    }
  };

  const handleLogout = async () => {
    try {
      const success = await logout();
      if (success) {
        router.replace("/login");
      } else {
        setError("Failed to log out");
      }
    } catch (err) {
      console.error("Logout error:", err);
      setError("An error occurred during logout");
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchUserData();
  }, []);

  return {
    userData,
    error,
    logout: handleLogout,
    retry: fetchUserData,
  };
}
