import { SearchEmptyState } from "@/components/search/SearchEmptyState";
import { SearchInput } from "@/components/search/SearchInput";
import { SearchLoading } from "@/components/search/SearchLoading";
import { SearchResults } from "@/components/search/SearchResults";
import { useUserSearch } from "@/hooks/useUserSearch";
import React, { useState } from "react";
import { View } from "react-native";


export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const { searchUser, userData, error, clearResults } = useUserSearch();
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      setIsLoading(true);
      await searchUser(searchQuery.trim());
      setIsLoading(false);
    }
  };

  const clearSearch = () => {
    clearResults();
    setSearchQuery("");
  };

  return (
    <View className="flex-1 bg-black px-4">
      <SearchInput searchQuery={searchQuery} setSearchQuery={setSearchQuery} handleSearch={handleSearch} error={error} />
      {isLoading && <SearchLoading />}
      {!isLoading && userData && <SearchResults userData={userData} clearSearch={clearSearch} />}
      {!isLoading && !userData && !error && <SearchEmptyState />}
      <View className="h-24" />
    </View>
  );
}
