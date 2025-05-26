import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { TextInput, TouchableOpacity, View } from "react-native";

interface SearchInputProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: () => void;
  error: string | null;
}

export function SearchInput({ searchQuery, setSearchQuery, handleSearch, error }: SearchInputProps) {
  return (
    <View className="px-4 pb-2">
      <View className="flex-row items-center bg-gray-800 rounded-xl px-3 py-2">
        <Ionicons name="search" size={20} color="#a3a3a3" />
        <TextInput
          className="flex-1 text-white ml-2 h-10"
          placeholder="Search users..."
          placeholderTextColor="#a3a3a3"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery("")}>
            <Ionicons name="close-circle" size={20} color="#a3a3a3" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
