import { UserProfile } from "@/components/profile/UserProfile";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useUserProfile } from "@/hooks/useUserProfile";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function ProfileScreen() {
  const { userData, error, logout, retry } = useUserProfile();

  return (
    <>
      {error ? (
        <View className="flex-1 justify-center items-center bg-black p-5">
          <Text className="text-red-500 text-base text-center mb-5">{error}</Text>
          <TouchableOpacity className="bg-green-500 p-4 rounded-xl w-4/5 items-center mb-2" onPress={retry}>
            <Text className="text-white font-bold">Retry</Text>
          </TouchableOpacity>
        </View>
      ) : !userData ? (
        <View className="flex-1 justify-center items-center bg-black p-5">
          <Text className="text-gray-400 text-base text-center mb-5">Loading your profile...</Text>
        </View>
      ) : (
        <View className="flex-1 bg-black relative">
          <UserProfile user={userData} />
          <TouchableOpacity className="absolute bottom-32 right-8 bg-red-500 w-14 h-14 rounded-full items-center justify-center shadow-lg" onPress={logout}>
            <IconSymbol name="rectangle.portrait.and.arrow.right" size={22} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}
