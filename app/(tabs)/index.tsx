import { useUserProfile } from "@/hooks/useUserProfile";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function ProfileScreen() {
  const { userData, error, logout, retry } = useUserProfile();

  // Error state
  if (error) {
    return (
      <View className="flex-1 justify-center items-center p-5">
        <Text className="text-red-500 text-base text-center mb-5">{error}</Text>
        <TouchableOpacity className="bg-blue-500 p-4 rounded w-4/5 items-center mb-2" onPress={retry}>
          <Text className="text-white font-bold">Retry</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-red-500 p-4 rounded w-4/5 items-center" onPress={logout}>
          <Text className="text-white font-bold">Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // No data state
  if (!userData) {
    return (
      <View className="flex-1 justify-center items-center p-5">
        <Text className="text-gray-500 text-base text-center mb-5">Loading your profile...</Text>
      </View>
    );
  }

  // Main profile UI
  return (
    <ScrollView className="flex-1 bg-gray-100">
      {/* User header */}
      <View className="bg-white p-5 items-center border-b border-gray-200">
        {userData.image_url && <Image source={{ uri: userData.image_url }} className="w-24 h-24 rounded-full mb-2" />}
        <Text className="text-2xl font-bold">
          {userData.first_name} {userData.last_name}
        </Text>
        <Text className="text-base text-gray-500 mb-1">@{userData.login}</Text>
        {userData.location && <Text className="text-sm text-gray-500">📍 {userData.location}</Text>}
      </View>

      {/* Stats */}
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

      {/* Contact info */}
      <View className="bg-white p-4 mb-2">
        <Text className="text-lg font-bold mb-2">Contact Information</Text>
        <Text className="text-base mb-1">Email: {userData.email}</Text>
      </View>

      {/* Additional info */}
      <View className="bg-white p-4 mb-2">
        <Text className="text-lg font-bold mb-2">Additional Information</Text>
        <Text className="text-base mb-1">User ID: {userData.id}</Text>
      </View>

      {/* Logout button */}
      <TouchableOpacity className="bg-red-500 p-4 m-5 rounded items-center" onPress={logout}>
        <Text className="text-white font-bold">Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
