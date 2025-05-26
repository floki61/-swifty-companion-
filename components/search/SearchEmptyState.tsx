import { IconSymbol } from "@/components/ui/IconSymbol";
import React from "react";
import { Text, View } from "react-native";

export function SearchEmptyState() {
  return (
    <View className="flex-1 items-center pt-36">
      <IconSymbol name="person.fill.questionmark" size={60} color="#10b981" />
      <Text className="text-white text-lg mt-4 text-center">Search for a 42 student by login username</Text>
      <Text className="text-gray-400 text-center mt-2">Enter a login name in the search box above</Text>
    </View>
  );
}
