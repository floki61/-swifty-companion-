import { isLoggedIn } from "@/utils/auth";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const loggedIn = await isLoggedIn();

        if (!loggedIn) {
          router.replace("/login");
          return;
        }

        setIsAuthenticated(true);
        setLoading(false);
      } catch (error) {
        console.error("Error checking authentication:", error);
        router.replace("/login");
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#0000ff" />
        <Text className="mt-2 text-gray-600">Verifying your session...</Text>
      </View>
    );
  }

  return isAuthenticated ? <>{children}</> : null;
}
