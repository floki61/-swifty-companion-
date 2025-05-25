import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function ExploreScreen() {
  return (
    <View className="flex-1 bg-black pt-20 px-4 items-center">
      <Text className="text-2xl font-bold mb-4 text-white">Explore 42 Students</Text>
      <Text className="mb-6 text-white">Search for other 42 students to view their profiles and projects.</Text>

      <View className="flex-row items-center justify-center mb-6">
        <TouchableOpacity className="bg-blue-500 p-4 rounded-lg">
          <Text className="text-white font-bold">Search Students</Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1">
        <View className="rounded-lg p-4 mb-4 bg-gray-800">
          <Text className="font-bold text-lg text-white">Coming Soon</Text>
          <Text className="mt-2 text-white">This feature is under development. Soon you'll be able to search for other 42 students and view their profiles, projects, and progress.</Text>
        </View>

        <View className="rounded-lg p-4 mb-4 bg-gray-800">
          <Text className="font-bold text-lg text-white">Feature Suggestions</Text>
          <Text className="mt-2 text-white">What would you like to see in the explore section? We're open to suggestions!</Text>
        </View>
      </ScrollView>
    </View>
  );
}
