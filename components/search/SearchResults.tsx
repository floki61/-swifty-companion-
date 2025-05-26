import { IconSymbol } from "@/components/ui/IconSymbol";
import { UserProfile } from "@/components/UserProfile";
import { UserInterface } from "@/types/user";
import React from "react";
import { View } from "react-native";

interface SearchResultsProps {
  userData: UserInterface;
  clearSearch: () => void;
}

export function SearchResults({ userData, clearSearch }: SearchResultsProps) {
  return (
    <View className="flex-1">
      <UserProfile user={userData} />
    </View>
  );
}
