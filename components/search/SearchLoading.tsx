import React from "react";
import { ActivityIndicator, Text, View } from "react-native";

export function SearchLoading() {
  return (
    <View className="flex-1 justify-center items-center">
      <ActivityIndicator size="large" color="#10b981" />
      <Text className="text-green-500 mt-4">Searching...</Text>
    </View>
  );
}
