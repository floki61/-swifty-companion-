import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export type TabType = "completed" | "in_progress" | "failed";

interface ProjectTabsProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  completedCount: number;
  inProgressCount: number;
  failedCount: number;
}

export function ProjectTabs({ activeTab, setActiveTab, completedCount, inProgressCount, failedCount }: ProjectTabsProps) {
  return (
    <View className="flex-row border-b border-gray-800 mb-4">
      <TouchableOpacity className={`flex-1 py-3 items-center border-b-2 ${activeTab === "completed" ? "border-green-500" : "border-gray-700"}`} onPress={() => setActiveTab("completed")}>
        <Text className={`font-medium ${activeTab === "completed" ? "text-green-500" : "text-gray-400"}`}>Completed ({completedCount})</Text>
      </TouchableOpacity>

      <TouchableOpacity className={`flex-1 py-3 items-center border-b-2 ${activeTab === "in_progress" ? "border-green-500" : "border-gray-700"}`} onPress={() => setActiveTab("in_progress")}>
        <Text className={`font-medium ${activeTab === "in_progress" ? "text-green-500" : "text-gray-400"}`}>In Progress ({inProgressCount})</Text>
      </TouchableOpacity>

      <TouchableOpacity className={`flex-1 py-3 items-center border-b-2 ${activeTab === "failed" ? "border-green-500" : "border-gray-700"}`} onPress={() => setActiveTab("failed")}>
        <Text className={`font-medium ${activeTab === "failed" ? "text-green-500" : "text-gray-400"}`}>Failed ({failedCount})</Text>
      </TouchableOpacity>
    </View>
  );
}
