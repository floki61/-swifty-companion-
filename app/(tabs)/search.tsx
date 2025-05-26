import { UserProfile } from "@/components/profile/UserProfile";
import { SearchInput } from "@/components/search/SearchInput";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useUserSearch } from "@/hooks/useUserSearch";
import React, { useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [lastSearchedQuery, setLastSearchedQuery] = useState("");
  const { searchUser, userData, error } = useUserSearch();
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      setIsLoading(true);
      setTimeout(async () => {
        setLastSearchedQuery(searchQuery.trim().toLowerCase());
        await searchUser(searchQuery.trim().toLowerCase());
        setIsLoading(false);
      }, 500);
    }
  };

  return (
    <View className="flex-1 bg-black px-4">
      <SearchInput searchQuery={searchQuery} setSearchQuery={setSearchQuery} handleSearch={handleSearch} error={error} />
      <ScrollView className="flex-1 pb-20" showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
        {
        isLoading ? (
          <View className="flex-1 justify-center items-center pt-36">
            <ActivityIndicator size="large" color="#10b981" />
            <Text className="text-green-500 mt-4">Searching...</Text>
          </View>
        ) : 
        userData ? (
          <View className="flex-1">
            <UserProfile user={userData} />
          </View>
        ) : error ? (
          <View className="flex-1 items-center pt-36">
            <IconSymbol name="exclamationmark.circle" size={60} color="#ef4444" />
            <Text className="text-white text-lg mt-4 text-center">No user found with the name {lastSearchedQuery}</Text>
            <Text className="text-gray-400 text-center mt-2">Try searching with a different username</Text>
          </View>
        ) : (
          <View className="flex-1 items-center pt-36">
            <IconSymbol name="person.fill.questionmark" size={60} color="#10b981" />
            <Text className="text-white text-lg mt-4 text-center">Search for a 42 student by login username</Text>
            <Text className="text-gray-400 text-center mt-2">Enter a login name in the search box above</Text>
          </View>
        )}
        <View className="h-24" />
      </ScrollView>
    </View>
  );
}
