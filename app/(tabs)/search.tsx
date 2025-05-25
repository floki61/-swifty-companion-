import { useUserSearch } from "@/hooks/useUserSearch";
import React from "react";
import { Image, Keyboard, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function SearchScreen() {
  const { searchTerm, setSearchTerm, userData, error, searchUser } = useUserSearch();

  const handleSearch = () => {
    Keyboard.dismiss();
    searchUser(searchTerm);
  };

  return (
    <View className="flex-1 p-4 bg-gray-100">
      <View className="flex-row mb-4">
        <TextInput
          className="flex-1 bg-white p-3 rounded-l-lg border border-gray-300"
          placeholder="Enter 42 login"
          value={searchTerm}
          onChangeText={setSearchTerm}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="search"
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity className="bg-blue-500 px-4 justify-center rounded-r-lg" onPress={handleSearch}>
          <Text className="text-white font-bold">Search</Text>
        </TouchableOpacity>
      </View>

      {error && (
        <View className="bg-red-100 p-4 rounded-lg mb-4">
          <Text className="text-red-500">{error}</Text>
        </View>
      )}

      {!userData && !error && (
        <View className="flex-1 justify-center items-center">
          <Text className="text-gray-500 text-center">Enter a 42 student login to search for their profile</Text>
        </View>
      )}

      {userData && (
        <View className="bg-white rounded-lg p-4">
          <View className="items-center mb-4">
            {userData.image_url && <Image source={{ uri: userData.image_url }} className="w-24 h-24 rounded-full mb-2" />}
            <Text className="text-xl font-bold">
              {userData.first_name} {userData.last_name}
            </Text>
            <Text className="text-base text-gray-500 mb-1">@{userData.login}</Text>
            {userData.location && <Text className="text-sm text-gray-500">📍 {userData.location}</Text>}
          </View>

          <View className="flex-row justify-around p-2 bg-gray-100 rounded-lg mb-4">
            <View className="items-center">
              <Text className="text-lg font-bold">{userData.correction_point}</Text>
              <Text className="text-xs text-gray-500">Points</Text>
            </View>
            <View className="items-center">
              <Text className="text-lg font-bold">{userData.wallet}</Text>
              <Text className="text-xs text-gray-500">Wallet</Text>
            </View>
          </View>

          <TouchableOpacity
            className="bg-blue-500 p-3 rounded-lg items-center"
            onPress={() => {
              // Navigate to detailed profile view if needed
              console.log("View detailed profile:", userData.login);
            }}
          >
            <Text className="text-white font-bold">View Full Profile</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
