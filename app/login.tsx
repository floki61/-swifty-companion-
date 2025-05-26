import { login } from "@/utils/auth";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

export default function LoginScreen() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await login();

      if (result && result.success) {
        console.log("Login successful, redirecting to tabs");
        router.replace("/(tabs)");
      } else {
        setError(result?.error || "Login failed. Please try again.");
      }
    } catch (err) {
      console.error("📱 [LOGIN] Login error:", err);
      setError("An error occurred during login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-black items-center justify-center p-5">
      <StatusBar style="light" />

      <View className="w-24 h-24 bg-gray-900 rounded-2xl items-center justify-center mb-6 border border-gray-800">
        <Text className="text-green-500 text-4xl font-bold">42</Text>
      </View>

      <Text className="text-2xl font-bold mb-2 text-white">Swifty Companion</Text>
      <Text className="text-sm text-gray-400 text-center mb-8">Access your 42 profile and connect with fellow students</Text>

      {error && (
        <View className="bg-red-500/20 border border-red-500 p-4 rounded-xl mb-6 w-full">
          <Text className="text-red-500">{error}</Text>
        </View>
      )}

      <TouchableOpacity className={`bg-green-500 p-4 rounded-xl items-center justify-center w-full ${loading ? "opacity-70" : ""}`} onPress={handleLogin} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <View className="flex-row items-center">
            <Text className="text-white font-bold text-lg">Login with 42 Intra</Text>
          </View>
        )}
      </TouchableOpacity>

      <Text className="text-gray-500 mt-8 text-center text-xs">This app allows you to access your 42 profile information and search for other students.</Text>
    </View>
  );
}
