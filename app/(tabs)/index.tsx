import { getUserProfile } from "@/services/api";
import { isLoggedIn, logout } from "@/utils/auth";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, RefreshControl, ScrollView, Text, TouchableOpacity, View } from "react-native";

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

export default function HomeScreen() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
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
      console.error("🏠 [HOME] Error fetching data:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchUserData();
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
      console.error("🏠 [HOME] Logout error:", err);
      setError("An error occurred during logout");
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
        <Text className="mt-2 text-base">Loading profile...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center p-5">
        <Text className="text-red-500 text-base text-center mb-5">{error}</Text>
        <TouchableOpacity className="bg-blue-500 p-4 rounded w-4/5 items-center mb-2" onPress={fetchUserData}>
          <Text className="text-white font-bold">Retry</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-red-500 p-4 rounded w-4/5 items-center" onPress={handleLogout}>
          <Text className="text-white font-bold">Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!userData) {
    return (
      <View className="flex-1 justify-center items-center p-5">
        <Text className="text-red-500 text-base text-center mb-5">No user data available</Text>
        <TouchableOpacity className="bg-blue-500 p-4 rounded w-4/5 items-center" onPress={fetchUserData}>
          <Text className="text-white font-bold">Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-gray-100" refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      <View className="bg-white p-5 items-center border-b border-gray-200">
        {userData.image_url && <Image source={{ uri: userData.image_url }} className="w-24 h-24 rounded-full mb-2" />}
        <Text className="text-2xl font-bold">
          {userData.first_name} {userData.last_name}
        </Text>
        <Text className="text-base text-gray-500 mb-1">@{userData.login}</Text>
        {userData.location && <Text className="text-sm text-gray-500">📍 {userData.location}</Text>}
      </View>

      <View className="flex-row bg-white p-4 mt-2 mb-2 justify-around">
        <View className="items-center">
          <Text className="text-xl font-bold">{userData.correction_point}</Text>
          <Text className="text-sm text-gray-500">Correction Points</Text>
        </View>
        <View className="items-center">
          <Text className="text-xl font-bold">{userData.wallet}</Text>
          <Text className="text-sm text-gray-500">Wallet</Text>
        </View>
      </View>

      <View className="bg-white p-4 mb-2">
        <Text className="text-lg font-bold mb-2">Contact Information</Text>
        <Text className="text-base mb-1">Email: {userData.email}</Text>
      </View>

      <View className="bg-white p-4 mb-2">
        <Text className="text-lg font-bold mb-2">Additional Information</Text>
        <Text className="text-base mb-1">User ID: {userData.id}</Text>
      </View>

      <TouchableOpacity className="bg-red-500 p-4 m-5 rounded items-center" onPress={handleLogout}>
        <Text className="text-white font-bold">Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
