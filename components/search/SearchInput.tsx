import { IconSymbol } from "@/components/ui/IconSymbol";
import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

interface SearchInputProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: () => void;
  error?: string | null;
}

export function SearchInput({ searchQuery, setSearchQuery, handleSearch, error }: SearchInputProps) {
  return (
    <View className="mb-6">
      <View className="flex-row mb-2">
        <TextInput
          className="flex-1 w-full bg-gray-900 text-white px-4 py-3 rounded-l-xl border border-gray-800"
          placeholder="search ..."
          placeholderTextColor="#6b7280"
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoCapitalize="none"
          returnKeyType="search"
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity className="bg-green-500 px-4 rounded-r-xl items-center justify-center" onPress={handleSearch}>
          <IconSymbol name="magnifyingglass" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Error message */}
      {error && <Text className="text-red-500 mt-2">{error}</Text>}
    </View>
  );
}
