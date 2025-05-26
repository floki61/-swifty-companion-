import { getUserByLogin } from "@/services/api";
import { isLoggedIn } from "@/utils/auth";
import { router } from "expo-router";
import { useState } from "react";

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

export function useUserSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [userData, setUserData] = useState<UserData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const searchUser = async (login: string) => {
    console.log("searchUser", login);
    if (!login.trim()) {
      setError("Please enter a 42 login");
      return;
    }

    try {
      setError(null);
      setUserData(null);

      // Check if user is logged in first
      const loggedIn = await isLoggedIn();
      if (!loggedIn) {
        router.replace("/login");
        return;
      }

      const result = await getUserByLogin(login.trim());

      if (result.success && result.data) {
        setUserData(result.data);
      } else {
        setError(result.error || "User not found");
      }
    } catch (err) {
      setError("An error occurred while searching");
      console.error("Search error:", err);
    }
  };

  return {
    searchTerm,
    setSearchTerm,
    userData,
    error,
    searchUser,
    clearResults: () => {
      setUserData(null);
      setError(null);
    },
  };
}
