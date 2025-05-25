import { login } from "@/utils/auth";
import { router } from "expo-router";
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
        router.replace("/home");
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
    <View className="flex-1 items-center justify-center p-5">
      <View className="w-24 h-24 bg-black rounded-2xl items-center justify-center mb-4">
        <Text className="text-white text-4xl font-bold">42</Text>
      </View>

      <Text className="text-2xl font-bold mb-2">Swifty Companion</Text>
      <Text className="text-sm text-gray-500 text-center mb-6">Access your 42 profile and connect with fellow students</Text>

      {error && (
        <View className="bg-red-500 p-4 rounded-xl mb-4 w-full">
          <Text className="text-white">{error}</Text>
        </View>
      )}

      <TouchableOpacity className="bg-blue-500 p-4 rounded-xl items-center justify-center w-full" onPress={handleLogin} disabled={loading}>
        {loading ? <ActivityIndicator color="#FFFFFF" /> : <Text className="text-white font-bold text-lg">Login with 42 Intra</Text>}
      </TouchableOpacity>
    </View>
  );
}
