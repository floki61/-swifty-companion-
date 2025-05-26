import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

interface ProjectSearchProps {
  totalProjects: number;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const ProjectSearch = ({ totalProjects, searchQuery, setSearchQuery }: ProjectSearchProps) => {
  return (
    <View className="mb-4">
      <View className="flex-row items-center bg-gray-800 rounded-xl px-3 py-2 mb-2">
        <Ionicons name="search" size={20} color="#a3a3a3" />
        <TextInput className="flex-1 text-white ml-2 h-10" placeholder="Search projects..." placeholderTextColor="#a3a3a3" value={searchQuery} onChangeText={setSearchQuery} />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery("")}>
            <Ionicons name="close-circle" size={20} color="#a3a3a3" />
          </TouchableOpacity>
        )}
      </View>
      <Text className="text-gray-400 text-sm">Total projects: {totalProjects}</Text>
    </View>
  );
};
