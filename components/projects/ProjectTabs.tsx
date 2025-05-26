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
  const renderTab = (tabName: TabType, label: string, count: number, active: boolean) => (
    <TouchableOpacity className={`flex-1 py-3 items-center border-b-2 ${active ? "border-green-500" : "border-gray-700"}`} onPress={() => setActiveTab(tabName)}>
      <Text className={`font-medium ${active ? "text-green-500" : "text-gray-400"}`}>
        {label} ({count})
      </Text>
    </TouchableOpacity>
  );

  return (
    <View className="flex-row border-b border-gray-800 mb-4">
      {renderTab("completed", "Completed", completedCount, activeTab === "completed")}
      {renderTab("in_progress", "In Progress", inProgressCount, activeTab === "in_progress")}
      {renderTab("failed", "Failed", failedCount, activeTab === "failed")}
    </View>
  );
}
